import { firestoreService } from "../../services/firestoreService";
import { Client, Deal, EmployeeInfo, AccountsReceivable, SalesFunnel, NotificationPreferences } from "../../types";

const CLIENTS_COLLECTION = 'clients';
const DEALS_COLLECTION = 'deals'; // Объединенная коллекция для договоров и продаж
const EMPLOYEES_COLLECTION = 'employeeInfos';
const ACCOUNTS_RECEIVABLE_COLLECTION = 'accountsReceivable';

// Интерфейс для заявки с сайта
interface WebsiteLead {
  id: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  phoneCountryCode?: string;
  sourceSection?: string;
  status?: string;
  createdAt?: string;
  [key: string]: any; // Другие поля
}

// Проверка, является ли объект заявкой с сайта
const isWebsiteLead = (item: any): item is WebsiteLead => {
  return item && 
    (item.firstName !== undefined || item.lastName !== undefined || item.phone !== undefined) &&
    !item.title && // Если есть title, это уже Deal
    !item.stage; // Если есть stage, это уже Deal
};

// Преобразование заявки с сайта в Deal
const convertWebsiteLeadToDeal = async (lead: WebsiteLead): Promise<Deal> => {
  // Получаем основную воронку из настроек напрямую из Firestore
  const notificationPrefsItems = await firestoreService.getAll('notificationPrefs');
  const notificationPrefs = notificationPrefsItems.length > 0 
    ? (notificationPrefsItems[0] as NotificationPreferences)
    : null;
  const defaultFunnelId = notificationPrefs?.defaultFunnelId;
  
  // Получаем воронки для определения первого этапа напрямую из Firestore
  const funnels = await firestoreService.getAll('salesFunnels') as SalesFunnel[];
  const defaultFunnel = defaultFunnelId ? funnels.find(f => f.id === defaultFunnelId) : null;
  const firstFunnel = funnels.length > 0 ? funnels[0] : null;
  const targetFunnel = defaultFunnel || firstFunnel;
  
  // Определяем первый этап воронки
  let stageId = 'new';
  if (targetFunnel && targetFunnel.stages.length > 0) {
    stageId = targetFunnel.stages[0].id;
  }
  
  // Формируем имя контакта
  const firstName = lead.firstName || '';
  const lastName = lead.lastName || '';
  const contactName = `${firstName} ${lastName}`.trim() || 'Клиент с сайта';
  
  // Формируем название сделки
  const title = contactName !== 'Клиент с сайта' 
    ? `Заявка с сайта: ${contactName}`
    : lead.phone 
      ? `Заявка с сайта: ${lead.phone}`
      : `Заявка с сайта: ${lead.id}`;
  
  // Формируем заметки
  const notes = [
    lead.sourceSection && `Раздел сайта: ${lead.sourceSection}`,
    lead.phone && `Телефон: ${lead.phone}`,
  ].filter(Boolean).join('\n') || undefined;
  
  return {
    id: lead.id,
    title: title,
    contactName: contactName,
    amount: 0,
    currency: 'UZS',
    stage: stageId,
    funnelId: targetFunnel?.id,
    source: 'site',
    assigneeId: '', // Не назначено
    createdAt: lead.createdAt || new Date().toISOString(),
    notes: notes,
  };
};

// Убрана функция filterArchived - фильтрация происходит на уровне компонентов
// saveCollection теперь сохраняет все элементы, включая архивные (soft delete)
const saveCollection = async (collectionName: string, items: Array<{ id: string; isArchived?: boolean }>) => {
    // Сохраняем все элементы, включая архивные (soft delete)
    await Promise.all(items.map(item => firestoreService.save(collectionName, item)));
    // Удаление физически должно происходить только при "permanentDelete"
    // В данном случае, saveCollection не должен физически удалять, а только сохранять текущее состояние
};

export const clientsEndpoint = {
    getAll: async (): Promise<Client[]> => {
        const items = await firestoreService.getAll(CLIENTS_COLLECTION);
        // Не фильтруем архивные элементы - фильтрация происходит на уровне компонентов
        return items as Client[];
    },
    updateAll: async (clients: Client[]) => saveCollection(CLIENTS_COLLECTION, clients),
};

// Объединенный endpoint для договоров и продаж
export const dealsEndpoint = {
    getAll: async (): Promise<Deal[]> => {
        const items = await firestoreService.getAll(DEALS_COLLECTION);
        // Не фильтруем архивные элементы - фильтрация происходит на уровне компонентов
        
        // Преобразуем заявки с сайта в формат Deal
        const processedDeals: Deal[] = [];
        const leadsToConvert: WebsiteLead[] = [];
        
        for (const item of items) {
            if (isWebsiteLead(item)) {
                // Это заявка с сайта, нужно преобразовать
                leadsToConvert.push(item);
            } else {
                // Это уже Deal, оставляем как есть
                processedDeals.push(item as Deal);
            }
        }
        
        // Преобразуем заявки с сайта в Deal
        if (leadsToConvert.length > 0) {
            const convertedDeals = await Promise.all(
                leadsToConvert.map(lead => convertWebsiteLeadToDeal(lead))
            );
            processedDeals.push(...convertedDeals);
            
            // Сохраняем преобразованные сделки обратно в Firebase
            // чтобы в следующий раз они уже были в правильном формате
            await saveCollection(DEALS_COLLECTION, [...processedDeals]);
        }
        
        return processedDeals;
    },
    updateAll: async (deals: Deal[]) => saveCollection(DEALS_COLLECTION, deals),
};

// Алиасы для обратной совместимости
export const contractsEndpoint = dealsEndpoint;
export const oneTimeDealsEndpoint = dealsEndpoint;

export const employeesEndpoint = {
    getAll: async (): Promise<EmployeeInfo[]> => {
        const items = await firestoreService.getAll(EMPLOYEES_COLLECTION);
        // Не фильтруем архивные элементы - фильтрация происходит на уровне компонентов
        return items as EmployeeInfo[];
    },
    updateAll: async (employees: EmployeeInfo[]) => saveCollection(EMPLOYEES_COLLECTION, employees),
};

export const accountsReceivableEndpoint = {
    getAll: async (): Promise<AccountsReceivable[]> => {
        const items = await firestoreService.getAll(ACCOUNTS_RECEIVABLE_COLLECTION);
        // Не фильтруем архивные элементы - фильтрация происходит на уровне компонентов
        return items as AccountsReceivable[];
    },
    updateAll: async (accounts: AccountsReceivable[]) => saveCollection(ACCOUNTS_RECEIVABLE_COLLECTION, accounts),
};
