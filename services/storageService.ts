
import { Doc, Project, Role, TableCollection, Task, User, Meeting, ActivityLog, StatusOption, PriorityOption, ContentPost, Client, EmployeeInfo, Contract, Folder, Deal, NotificationPreferences, Department, FinanceCategory, FinancePlan, PurchaseRequest, OrgPosition, BusinessProcess, AutomationRule, Warehouse, InventoryItem, StockMovement, OneTimeDeal, AccountsReceivable, SalesFunnel } from "../types";
import { FIREBASE_DB_URL, MOCK_PROJECTS, MOCK_TABLES, DEFAULT_STATUSES, DEFAULT_PRIORITIES, DEFAULT_NOTIFICATION_PREFS, MOCK_DEPARTMENTS, DEFAULT_FINANCE_CATEGORIES, MOCK_ORG_POSITIONS, DEFAULT_AUTOMATION_RULES } from "../constants";
import { firestoreService } from "./firestoreService";


// Флаг для отслеживания последнего сохранения (чтобы не перезаписывать свежие данные)
let lastSaveTime = 0;
const SAVE_COOLDOWN = 5000; // 5 секунд - минимальная задержка между сохранением и синхронизацией
/**
 * @deprecated ВАЖНО: Данные приложения теперь хранятся ТОЛЬКО в Firebase
 * 
 * localStorage используется ТОЛЬКО для настроек сессии:
 * - activeUserId, telegramChatId, tokens, darkMode и т.д.
 * 
 * Все методы get/set для данных приложения (tasks, deals, clients) помечены как @deprecated
 * Используйте api.*.getAll() для загрузки данных из Firebase
 */

let isSaving = false; // @deprecated - больше не используется

const STORAGE_KEYS = {
  USERS: 'cfo_users',
  TASKS: 'cfo_tasks',
  PROJECTS: 'cfo_projects',
  TABLES: 'cfo_tables',
  DOCS: 'cfo_docs',
  FOLDERS: 'cfo_folders',
  MEETINGS: 'cfo_meetings',
  CONTENT_POSTS: 'cfo_content_posts',
  ACTIVITY: 'cfo_activity',
  
  // Auth Session
  ACTIVE_USER_ID: 'cfo_active_user_session',

  TELEGRAM_CHAT_ID: 'cfo_telegram_chat_id',
  TELEGRAM_EMPLOYEE_TOKEN: 'cfo_telegram_employee_token',
  TELEGRAM_CLIENT_TOKEN: 'cfo_telegram_client_token',

  STATUSES: 'cfo_statuses',
  PRIORITIES: 'cfo_priorities',
  CLIENTS: 'cfo_clients',
  CONTRACTS: 'cfo_contracts',
  EMPLOYEE_INFOS: 'cfo_employee_infos',
  DEALS: 'cfo_deals',
  NOTIFICATION_PREFS: 'cfo_notification_prefs',
  // Finance
  DEPARTMENTS: 'cfo_departments',
  FINANCE_CATEGORIES: 'cfo_finance_categories',
  FINANCE_PLAN: 'cfo_finance_plan',
  PURCHASE_REQUESTS: 'cfo_purchase_requests',
  FINANCIAL_PLAN_DOCUMENTS: 'cfo_financial_plan_documents',
  FINANCIAL_PLANNINGS: 'cfo_financial_plannings',
  // BPM
  ORG_POSITIONS: 'cfo_org_positions',
  BUSINESS_PROCESSES: 'cfo_business_processes',
  // Automation
  AUTOMATION_RULES: 'cfo_automation_rules',
  // Inventory
  WAREHOUSES: 'cfo_warehouses',
  INVENTORY_ITEMS: 'cfo_inventory_items',
  STOCK_MOVEMENTS: 'cfo_stock_movements',
  // Sales Funnels
  SALES_FUNNELS: 'cfo_sales_funnels',
  // Integrations
  LAST_TELEGRAM_UPDATE_ID: 'cfo_last_telegram_update_id',
  ENABLE_TELEGRAM_IMPORT: 'cfo_enable_telegram_import',
};

const getLocal = <T>(key: string, seed: T): T => {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
        return JSON.parse(stored);
    } catch (e) {
        return seed;
    }
  }
  return seed;
};

const setLocal = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// Helper to convert Firebase Objects (from POST requests) to Arrays
const normalizeArray = <T>(data: any): T[] => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === 'object') {
        // If data is { "key1": val1, "key2": val2 }, return [val1, val2]
        return Object.values(data);
    }
    return [];
};

export const storageService = {
  getDbUrl: () => FIREBASE_DB_URL,
  
  // Session Management
  getActiveUserId: (): string | null => localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID),
  setActiveUserId: (id: string) => localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, id),
  clearActiveUserId: () => localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER_ID),

  getTelegramChatId: (): string => localStorage.getItem(STORAGE_KEYS.TELEGRAM_CHAT_ID) || '',
  setTelegramChatId: (id: string) => localStorage.setItem(STORAGE_KEYS.TELEGRAM_CHAT_ID, id),

  // Bot Tokens
  // ВАЖНО: Токен бота теперь берется только из .env на сервере (через GitHub Secrets)
  // В браузере токен НЕ используется для polling (только для отправки сообщений)
  // Polling делается только ботом на сервере
  getEmployeeBotToken: (): string => {
    // Токен для отправки уведомлений (берется из localStorage если установлен, иначе пустая строка)
    // НЕ используем TELEGRAM_BOT_TOKEN из constants - это только для сервера
    return localStorage.getItem(STORAGE_KEYS.TELEGRAM_EMPLOYEE_TOKEN) || '';
  },
  setEmployeeBotToken: (t: string) => localStorage.setItem(STORAGE_KEYS.TELEGRAM_EMPLOYEE_TOKEN, t),
  
  getClientBotToken: (): string => localStorage.getItem(STORAGE_KEYS.TELEGRAM_CLIENT_TOKEN) || '',
  setClientBotToken: (t: string) => localStorage.setItem(STORAGE_KEYS.TELEGRAM_CLIENT_TOKEN, t),

  // Telegram Direct Integration Settings
  getLastTelegramUpdateId: (): number => getLocal(STORAGE_KEYS.LAST_TELEGRAM_UPDATE_ID, 0),
  setLastTelegramUpdateId: (id: number) => setLocal(STORAGE_KEYS.LAST_TELEGRAM_UPDATE_ID, id),

  // Inventory Local Accessors - @deprecated
  /**
   * @deprecated Используйте api.inventory.getWarehouses() для загрузки из Firebase
   */
  getWarehouses: (): Warehouse[] => getLocal(STORAGE_KEYS.WAREHOUSES, []),
  /**
   * @deprecated Используйте api.inventory.updateWarehouses() для сохранения в Firebase
   */
  setWarehouses: (warehouses: Warehouse[]) => {
      console.warn('[DEPRECATED] storageService.setWarehouses() is deprecated. Use api.inventory.updateWarehouses() instead.');
      setLocal(STORAGE_KEYS.WAREHOUSES, warehouses);
  },
  /**
   * @deprecated Используйте api.inventory.getItems() для загрузки из Firebase
   */
  getInventoryItems: (): InventoryItem[] => getLocal(STORAGE_KEYS.INVENTORY_ITEMS, []),
  /**
   * @deprecated Используйте api.inventory.updateItems() для сохранения в Firebase
   */
  setInventoryItems: (items: InventoryItem[]) => {
      console.warn('[DEPRECATED] storageService.setInventoryItems() is deprecated. Use api.inventory.updateItems() instead.');
      setLocal(STORAGE_KEYS.INVENTORY_ITEMS, items);
  },
  /**
   * @deprecated Используйте api.inventory.getMovements() для загрузки из Firebase
   */
  getStockMovements: (): StockMovement[] => getLocal(STORAGE_KEYS.STOCK_MOVEMENTS, []),
  /**
   * @deprecated Используйте api.inventory.updateMovements() для сохранения в Firebase
   */
  setStockMovements: (movements: StockMovement[]) => {
      console.warn('[DEPRECATED] storageService.setStockMovements() is deprecated. Use api.inventory.updateMovements() instead.');
      setLocal(STORAGE_KEYS.STOCK_MOVEMENTS, movements);
  },
  
  getEnableTelegramImport: (): boolean => getLocal(STORAGE_KEYS.ENABLE_TELEGRAM_IMPORT, false),
  setEnableTelegramImport: (enabled: boolean) => setLocal(STORAGE_KEYS.ENABLE_TELEGRAM_IMPORT, enabled),

  // Sales Funnels Local Accessors - @deprecated
  /**
   * @deprecated Используйте api.funnels.getAll() для загрузки из Firebase
   */
  getSalesFunnels: (): SalesFunnel[] => {
      console.warn('[DEPRECATED] storageService.getSalesFunnels() is deprecated. Use api.funnels.getAll() instead.');
      const funnels = getLocal(STORAGE_KEYS.SALES_FUNNELS, []);
      return funnels.filter(f => !f.isArchived);
  },
  /**
   * @deprecated Используйте api.funnels.updateAll() для сохранения в Firebase
   */
  setSalesFunnels: (funnels: SalesFunnel[]) => {
      console.warn('[DEPRECATED] storageService.setSalesFunnels() is deprecated. Use api.funnels.updateAll() instead.');
      setLocal(STORAGE_KEYS.SALES_FUNNELS, funnels);
  },

  /**
   * @deprecated Этот метод больше не используется
   * Данные загружаются напрямую из Firebase через endpoints (api.*.getAll())
   */
  loadFromCloud: async (force: boolean = false) => {
      try {
          // Если force=true (первая загрузка), всегда загружаем из облака
          // При обычной синхронизации пропускаем только если идет сохранение
          if (!force && isSaving) {
              return false; // Пропускаем, если идет сохранение
          }
          
          // Убрали проверку timeSinceLastSave - она мешала синхронизации между устройствами
          // Теперь синхронизация происходит всегда, кроме случаев когда идет сохранение
          
          // @deprecated - этот метод больше не используется
          // Используем Firestore вместо Realtime Database
          const data = await firestoreService.loadFromCloud();
          // Если data === null, значит ошибка загрузки
          // Если data === {}, значит Firebase пуст, но это нормально - используем localStorage
          if (data === null) return false;

          // data может быть пустым объектом {} - это нормально, просто нет данных в Firebase
          let hasChanges = false;
          if (data) {
              
              // Firebase - единственный источник истины
              // Просто перезаписываем localStorage данными из Firebase
              // Никаких слияний - Firebase всегда прав
              // Фильтруем архивные элементы из Firebase (на всякий случай, хотя их там быть не должно)
              const filterArchived = <T extends { isArchived?: boolean }>(items: T[]): T[] => {
                  return items.filter(item => !item.isArchived);
              };
              
              // Firebase - единственный источник истины, просто перезаписываем
              if (data.tasks !== undefined) {
                  const normalized = filterArchived(normalizeArray(data.tasks));
                  const current = getLocal(STORAGE_KEYS.TASKS, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.TASKS, normalized);
                      hasChanges = true;
                  }
              }
              
              
              if (data.users !== undefined) {
                  const normalized = filterArchived(normalizeArray(data.users));
                  // Удаляем дубликаты по логину для пользователей (оставляем только последнего)
                  const removeDuplicatesByLogin = (users: User[]): User[] => {
                      const seen = new Map<string, User>();
                      for (let i = users.length - 1; i >= 0; i--) {
                          const user = users[i];
                          if (user.login && !seen.has(user.login)) {
                              seen.set(user.login, user);
                          } else if (!user.login && !seen.has(user.id)) {
                              seen.set(user.id, user);
                          }
                      }
                      return Array.from(seen.values());
                  };
                  const deduplicated = removeDuplicatesByLogin(normalized);
                  const current = getLocal(STORAGE_KEYS.USERS, []);
                  if (JSON.stringify(deduplicated) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.USERS, deduplicated);
                      hasChanges = true;
                  }
              }
              if (data.projects !== undefined) {
                  const normalized = filterArchived(normalizeArray(data.projects));
                  const current = getLocal(STORAGE_KEYS.PROJECTS, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.PROJECTS, normalized);
                      hasChanges = true;
                  }
              }
              if (data.tables !== undefined) {
                  const normalized = normalizeArray(data.tables);
                  const current = getLocal(STORAGE_KEYS.TABLES, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.TABLES, normalized);
                      hasChanges = true;
                  }
              }
              if (data.docs !== undefined) {
                  const normalized = filterArchived(normalizeArray(data.docs));
                  const current = getLocal(STORAGE_KEYS.DOCS, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.DOCS, normalized);
                      hasChanges = true;
                  }
              }
              if (data.folders !== undefined) {
                  const normalized = filterArchived(normalizeArray(data.folders));
                  const current = getLocal(STORAGE_KEYS.FOLDERS, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.FOLDERS, normalized);
                      hasChanges = true;
                  }
              }
              if (data.meetings !== undefined) {
                  const normalized = filterArchived(normalizeArray(data.meetings));
                  const current = getLocal(STORAGE_KEYS.MEETINGS, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.MEETINGS, normalized);
                      hasChanges = true;
                  }
              }
              if (data.contentPosts !== undefined) {
                  const normalized = filterArchived(normalizeArray(data.contentPosts));
                  const current = getLocal(STORAGE_KEYS.CONTENT_POSTS, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.CONTENT_POSTS, normalized);
                      hasChanges = true;
                  }
              }
              if (data.activity !== undefined) {
                  const normalized = normalizeArray(data.activity);
                  const current = getLocal(STORAGE_KEYS.ACTIVITY, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.ACTIVITY, normalized);
                      hasChanges = true;
                  }
              }
              // Статусы и приоритеты - не используем smartMerge, так как это справочники
              if (data.statuses) {
                  const normalized = normalizeArray(data.statuses);
                  const current = getLocal(STORAGE_KEYS.STATUSES, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.STATUSES, normalized);
                      hasChanges = true;
                  }
              }
              if (data.priorities) {
                  const normalized = normalizeArray(data.priorities);
                  const current = getLocal(STORAGE_KEYS.PRIORITIES, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.PRIORITIES, normalized);
                      hasChanges = true;
                  }
              }
              
              // CRM & Finance
              if (data.clients !== undefined) {
                  const normalized = filterArchived(normalizeArray(data.clients));
                  const current = getLocal(STORAGE_KEYS.CLIENTS, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.CLIENTS, normalized);
                      hasChanges = true;
                  }
              }
              if (data.contracts !== undefined) {
                  const normalized = filterArchived(normalizeArray(data.contracts));
                  const current = getLocal(STORAGE_KEYS.CONTRACTS, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.CONTRACTS, normalized);
                      hasChanges = true;
                  }
              }
              if (data.oneTimeDeals !== undefined) {
                  const normalized = filterArchived(normalizeArray(data.oneTimeDeals));
                  const current = getLocal(STORAGE_KEYS.ONE_TIME_DEALS, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.ONE_TIME_DEALS, normalized);
                      hasChanges = true;
                  }
              }
              if (data.accountsReceivable !== undefined) {
                  const normalized = filterArchived(normalizeArray(data.accountsReceivable));
                  const current = getLocal(STORAGE_KEYS.ACCOUNTS_RECEIVABLE, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.ACCOUNTS_RECEIVABLE, normalized);
                      hasChanges = true;
                  }
              }
              if (data.employeeInfos !== undefined) {
                  const normalized = filterArchived(normalizeArray(data.employeeInfos));
                  const current = getLocal(STORAGE_KEYS.EMPLOYEE_INFOS, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.EMPLOYEE_INFOS, normalized);
                      hasChanges = true;
                  }
              }
              if (data.deals !== undefined) {
                  const normalized = filterArchived(normalizeArray(data.deals));
                  const current = getLocal(STORAGE_KEYS.DEALS, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.DEALS, normalized);
                      hasChanges = true;
                  }
              }
              
              if (data.notificationPrefs) {
                  const current = getLocal(STORAGE_KEYS.NOTIFICATION_PREFS, DEFAULT_NOTIFICATION_PREFS);
                  if (JSON.stringify(data.notificationPrefs) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.NOTIFICATION_PREFS, data.notificationPrefs);
                      hasChanges = true;
                  }
              }
              
              // Finance
              if (data.departments !== undefined) {
                  const normalized = normalizeArray(data.departments);
                  const current = getLocal(STORAGE_KEYS.DEPARTMENTS, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.DEPARTMENTS, normalized);
                      hasChanges = true;
                  }
              }

              // Inventory
              if (data.warehouses !== undefined) {
                  const normalized = normalizeArray(data.warehouses);
                  const current = getLocal(STORAGE_KEYS.WAREHOUSES, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.WAREHOUSES, normalized);
                      hasChanges = true;
                  }
              }
              if (data.inventoryItems !== undefined) {
                  const normalized = normalizeArray(data.inventoryItems);
                  const current = getLocal(STORAGE_KEYS.INVENTORY_ITEMS, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.INVENTORY_ITEMS, normalized);
                      hasChanges = true;
                  }
              }
              if (data.stockMovements !== undefined) {
                  const normalized = normalizeArray(data.stockMovements);
                  const current = getLocal(STORAGE_KEYS.STOCK_MOVEMENTS, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.STOCK_MOVEMENTS, normalized);
                      hasChanges = true;
                  }
              }
              if (data.salesFunnels !== undefined) {
                  const normalized = filterArchived(normalizeArray(data.salesFunnels));
                  const current = filterArchived(getLocal(STORAGE_KEYS.SALES_FUNNELS, []));
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.SALES_FUNNELS, normalized);
                      hasChanges = true;
                  }
              }
              // Справочники - не используем smartMerge
              if (data.financeCategories) {
                  const normalized = normalizeArray(data.financeCategories);
                  const current = getLocal(STORAGE_KEYS.FINANCE_CATEGORIES, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.FINANCE_CATEGORIES, normalized);
                      hasChanges = true;
                  }
              }
              if (data.financePlan) {
                  const current = getLocal(STORAGE_KEYS.FINANCE_PLAN, null);
                  if (JSON.stringify(data.financePlan) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.FINANCE_PLAN, data.financePlan);
                      hasChanges = true;
                  }
              }
              if (data.purchaseRequests !== undefined) {
                  const normalized = normalizeArray(data.purchaseRequests);
                  const current = getLocal(STORAGE_KEYS.PURCHASE_REQUESTS, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.PURCHASE_REQUESTS, normalized);
                      hasChanges = true;
                  }
              }
              // BPM
              if (data.orgPositions !== undefined) {
                  const normalized = normalizeArray(data.orgPositions);
                  const current = getLocal(STORAGE_KEYS.ORG_POSITIONS, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.ORG_POSITIONS, normalized);
                      hasChanges = true;
                  }
              }
              if (data.businessProcesses !== undefined) {
                  const normalized = normalizeArray(data.businessProcesses);
                  const current = getLocal(STORAGE_KEYS.BUSINESS_PROCESSES, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.BUSINESS_PROCESSES, normalized);
                      hasChanges = true;
                  }
              }
              // Automation
              if (data.automationRules !== undefined) {
                  const normalized = normalizeArray(data.automationRules);
                  const current = getLocal(STORAGE_KEYS.AUTOMATION_RULES, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.AUTOMATION_RULES, normalized);
                      hasChanges = true;
                  }
              }
              
              // Financial Plan Documents
              if (data.financialPlanDocuments !== undefined) {
                  const normalized = normalizeArray(data.financialPlanDocuments);
                  const current = getLocal(STORAGE_KEYS.FINANCIAL_PLAN_DOCUMENTS, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.FINANCIAL_PLAN_DOCUMENTS, normalized);
                      hasChanges = true;
                  }
              }
              
              // Financial Plannings
              if (data.financialPlannings !== undefined) {
                  const normalized = normalizeArray(data.financialPlannings);
                  const current = getLocal(STORAGE_KEYS.FINANCIAL_PLANNINGS, []);
                  if (JSON.stringify(normalized) !== JSON.stringify(current)) {
                      setLocal(STORAGE_KEYS.FINANCIAL_PLANNINGS, normalized);
                      hasChanges = true;
                  }
              }
              
              return hasChanges;
          }
      } catch (e) {
          // Cloud Load Error
      }
      return false;
  },

  /**
   * @deprecated Этот метод больше не используется
   * Данные сохраняются напрямую в Firebase через endpoints (api.*.create(), api.*.update())
   */
  saveToCloud: async () => {
      // Фильтруем архивные элементы перед сохранением в Firebase
      // Архивные элементы НЕ сохраняются в Firebase - они удаляются навсегда
      const filterArchived = <T extends { isArchived?: boolean }>(items: T[]): T[] => {
          return items.filter(item => !item.isArchived);
      };
      
      // Получаем актуальные данные из localStorage
      // batch.set() с merge: false полностью перезаписывает документ,
      // что гарантирует, что все поля из локальных данных сохранятся в Firebase
      // Это обновит старые записи в Firebase, добавив им все новые поля
      const fullState = {
          users: filterArchived(getLocal(STORAGE_KEYS.USERS, [])),
          tasks: filterArchived(getLocal(STORAGE_KEYS.TASKS, [])),
          projects: filterArchived(getLocal(STORAGE_KEYS.PROJECTS, [])),
          tables: getLocal(STORAGE_KEYS.TABLES, []), // Таблицы не имеют isArchived
          docs: filterArchived(getLocal(STORAGE_KEYS.DOCS, [])),
          folders: filterArchived(getLocal(STORAGE_KEYS.FOLDERS, [])),
          meetings: filterArchived(getLocal(STORAGE_KEYS.MEETINGS, [])),
          contentPosts: filterArchived(getLocal(STORAGE_KEYS.CONTENT_POSTS, [])),
          activity: getLocal(STORAGE_KEYS.ACTIVITY, []), // Логи не имеют isArchived
          statuses: getLocal(STORAGE_KEYS.STATUSES, DEFAULT_STATUSES),
          priorities: getLocal(STORAGE_KEYS.PRIORITIES, DEFAULT_PRIORITIES),
          clients: filterArchived(getLocal(STORAGE_KEYS.CLIENTS, [])),
          contracts: filterArchived(getLocal(STORAGE_KEYS.CONTRACTS, [])),
          oneTimeDeals: filterArchived(getLocal(STORAGE_KEYS.ONE_TIME_DEALS, [])),
          accountsReceivable: filterArchived(getLocal(STORAGE_KEYS.ACCOUNTS_RECEIVABLE, [])),
          employeeInfos: filterArchived(getLocal(STORAGE_KEYS.EMPLOYEE_INFOS, [])),
          deals: filterArchived(getLocal(STORAGE_KEYS.DEALS, [])),
          notificationPrefs: getLocal(STORAGE_KEYS.NOTIFICATION_PREFS, DEFAULT_NOTIFICATION_PREFS),
          // Finance
          departments: getLocal(STORAGE_KEYS.DEPARTMENTS, []), // Справочники не имеют isArchived
          financeCategories: getLocal(STORAGE_KEYS.FINANCE_CATEGORIES, DEFAULT_FINANCE_CATEGORIES),
          financePlan: getLocal(STORAGE_KEYS.FINANCE_PLAN, null),
          purchaseRequests: getLocal(STORAGE_KEYS.PURCHASE_REQUESTS, []), // Заявки не имеют isArchived
          financialPlanDocuments: getLocal(STORAGE_KEYS.FINANCIAL_PLAN_DOCUMENTS, []),
          financialPlannings: getLocal(STORAGE_KEYS.FINANCIAL_PLANNINGS, []),
          // BPM
          orgPositions: getLocal(STORAGE_KEYS.ORG_POSITIONS, []),
          businessProcesses: getLocal(STORAGE_KEYS.BUSINESS_PROCESSES, []),
          // Automation
          automationRules: getLocal(STORAGE_KEYS.AUTOMATION_RULES, []),
          // Inventory
          warehouses: getLocal(STORAGE_KEYS.WAREHOUSES, []),
          inventoryItems: getLocal(STORAGE_KEYS.INVENTORY_ITEMS, []),
          stockMovements: getLocal(STORAGE_KEYS.STOCK_MOVEMENTS, []),
          // Sales Funnels
          salesFunnels: filterArchived(getLocal(STORAGE_KEYS.SALES_FUNNELS, [])),
      };

      // Используем Firestore вместо Realtime Database
      isSaving = true; // Устанавливаем флаг, что идет сохранение
      try {
          // @deprecated - этот метод больше не используется
      await firestoreService.saveToCloud(fullState);
          lastSaveTime = Date.now(); // Отмечаем время последнего сохранения
      } finally {
          isSaving = false; // Снимаем флаг после завершения
      }
  },

  /**
   * @deprecated Используйте api.users.getAll() для загрузки из Firebase
   */
  getUsers: (): User[] => {
      const users = getLocal(STORAGE_KEYS.USERS, []);
      // Удаляем дубликаты по логину (оставляем только последнего)
      const seen = new Map<string, User>();
      for (let i = users.length - 1; i >= 0; i--) {
          const user = users[i];
          if (user.login && !seen.has(user.login)) {
              seen.set(user.login, user);
          } else if (!user.login) {
              // Пользователи без логина добавляем по id
              if (!seen.has(user.id)) {
                  seen.set(user.id, user);
              }
          }
      }
      return Array.from(seen.values());
  }, // Пользователи загружаются только из Firebase
  /**
   * @deprecated Используйте api.tasks.getAll() для загрузки из Firebase
   */
  getTasks: (): Task[] => getLocal(STORAGE_KEYS.TASKS, []),
  /**
   * @deprecated Используйте api.projects.getAll() для загрузки из Firebase
   */
  getProjects: (): Project[] => getLocal(STORAGE_KEYS.PROJECTS, MOCK_PROJECTS),
  /**
   * @deprecated Используйте api.tables.getAll() для загрузки из Firebase
   */
  getTables: (): TableCollection[] => getLocal(STORAGE_KEYS.TABLES, MOCK_TABLES),
  /**
   * @deprecated Используйте api.docs.getAll() для загрузки из Firebase
   */
  getDocs: (): Doc[] => getLocal(STORAGE_KEYS.DOCS, []),
  /**
   * @deprecated Используйте api.folders.getAll() для загрузки из Firebase
   */
  getFolders: (): Folder[] => getLocal(STORAGE_KEYS.FOLDERS, []),
  /**
   * @deprecated Используйте api.meetings.getAll() для загрузки из Firebase
   */
  getMeetings: (): Meeting[] => getLocal(STORAGE_KEYS.MEETINGS, []),
  /**
   * @deprecated Используйте api.contentPosts.getAll() для загрузки из Firebase
   */
  getContentPosts: (): ContentPost[] => getLocal(STORAGE_KEYS.CONTENT_POSTS, []),
  /**
   * @deprecated Используйте api.activity.getAll() для загрузки из Firebase
   */
  getActivities: (): ActivityLog[] => getLocal(STORAGE_KEYS.ACTIVITY, []),
  /**
   * @deprecated Используйте api.statuses.getAll() для загрузки из Firebase
   */
  getStatuses: (): StatusOption[] => getLocal(STORAGE_KEYS.STATUSES, DEFAULT_STATUSES),
  /**
   * @deprecated Используйте api.priorities.getAll() для загрузки из Firebase
   */
  getPriorities: (): PriorityOption[] => getLocal(STORAGE_KEYS.PRIORITIES, DEFAULT_PRIORITIES),
  /**
   * @deprecated Используйте api.clients.getAll() для загрузки из Firebase
   */
  getClients: (): Client[] => getLocal(STORAGE_KEYS.CLIENTS, []),
  /**
   * @deprecated Используйте api.contracts.getAll() для загрузки из Firebase
   */
  getContracts: (): Contract[] => getLocal(STORAGE_KEYS.CONTRACTS, []),
  /**
   * @deprecated Используйте api.oneTimeDeals.getAll() для загрузки из Firebase
   */
  getOneTimeDeals: (): OneTimeDeal[] => getLocal(STORAGE_KEYS.ONE_TIME_DEALS, []),
  /**
   * @deprecated Используйте api.accountsReceivable.getAll() для загрузки из Firebase
   */
  getAccountsReceivable: (): AccountsReceivable[] => getLocal(STORAGE_KEYS.ACCOUNTS_RECEIVABLE, []),
  /**
   * @deprecated Используйте api.employees.getAll() для загрузки из Firebase
   */
  getEmployeeInfos: (): EmployeeInfo[] => getLocal(STORAGE_KEYS.EMPLOYEE_INFOS, []),
  /**
   * @deprecated Используйте api.deals.getAll() для загрузки из Firebase
   */
  getDeals: (): Deal[] => getLocal(STORAGE_KEYS.DEALS, []),
  getNotificationPrefs: (): NotificationPreferences => getLocal(STORAGE_KEYS.NOTIFICATION_PREFS, DEFAULT_NOTIFICATION_PREFS),
  
  // Finance Getters
  getDepartments: (): Department[] => getLocal(STORAGE_KEYS.DEPARTMENTS, MOCK_DEPARTMENTS),
  getFinanceCategories: (): FinanceCategory[] => getLocal(STORAGE_KEYS.FINANCE_CATEGORIES, DEFAULT_FINANCE_CATEGORIES),
  getFinancePlan: (): FinancePlan | null => getLocal(STORAGE_KEYS.FINANCE_PLAN, { id: 'current', period: 'month', salesPlan: 0, currentIncome: 0 }),
  getPurchaseRequests: (): PurchaseRequest[] => getLocal(STORAGE_KEYS.PURCHASE_REQUESTS, []),
  getFinancialPlanDocuments: (): FinancialPlanDocument[] => getLocal(STORAGE_KEYS.FINANCIAL_PLAN_DOCUMENTS, []),
  getFinancialPlannings: (): FinancialPlanning[] => getLocal(STORAGE_KEYS.FINANCIAL_PLANNINGS, []),

  // BPM Getters
  getOrgPositions: (): OrgPosition[] => getLocal(STORAGE_KEYS.ORG_POSITIONS, MOCK_ORG_POSITIONS),
  getBusinessProcesses: (): BusinessProcess[] => getLocal(STORAGE_KEYS.BUSINESS_PROCESSES, []),

  // Automation
  getAutomationRules: (): AutomationRule[] => getLocal(STORAGE_KEYS.AUTOMATION_RULES, DEFAULT_AUTOMATION_RULES),

  /**
   * @deprecated Используйте api.users.updateAll() для сохранения в Firebase
   */
  setUsers: (users: User[]) => {
      console.warn('[DEPRECATED] storageService.setUsers() is deprecated. Use api.users.updateAll() instead.');
      // Оставляем для обратной совместимости, но не сохраняем в Firebase
      setLocal(STORAGE_KEYS.USERS, users);
  },
  /**
   * @deprecated Используйте api.tasks.updateAll() для сохранения в Firebase
   */
  setTasks: (tasks: Task[]) => {
      console.warn('[DEPRECATED] storageService.setTasks() is deprecated. Use api.tasks.updateAll() instead.');
      setLocal(STORAGE_KEYS.TASKS, tasks);
  },
  /**
   * @deprecated Используйте api.projects.updateAll() для сохранения в Firebase
   */
  setProjects: (projects: Project[]) => {
      console.warn('[DEPRECATED] storageService.setProjects() is deprecated. Use api.projects.updateAll() instead.');
      setLocal(STORAGE_KEYS.PROJECTS, projects);
  },
  /**
   * @deprecated Используйте api.tables.updateAll() для сохранения в Firebase
   */
  setTables: (tables: TableCollection[]) => {
      console.warn('[DEPRECATED] storageService.setTables() is deprecated. Use api.tables.updateAll() instead.');
      setLocal(STORAGE_KEYS.TABLES, tables);
  },
  /**
   * @deprecated Используйте api.docs.updateAll() для сохранения в Firebase
   */
  setDocs: (docs: Doc[]) => {
      console.warn('[DEPRECATED] storageService.setDocs() is deprecated. Use api.docs.updateAll() instead.');
      setLocal(STORAGE_KEYS.DOCS, docs);
  },
  /**
   * @deprecated Используйте api.folders.updateAll() для сохранения в Firebase
   */
  setFolders: (folders: Folder[]) => {
      console.warn('[DEPRECATED] storageService.setFolders() is deprecated. Use api.folders.updateAll() instead.');
      setLocal(STORAGE_KEYS.FOLDERS, folders);
  },
  /**
   * @deprecated Используйте api.meetings.updateAll() для сохранения в Firebase
   */
  setMeetings: (meetings: Meeting[]) => {
      console.warn('[DEPRECATED] storageService.setMeetings() is deprecated. Use api.meetings.updateAll() instead.');
      setLocal(STORAGE_KEYS.MEETINGS, meetings);
  },
  /**
   * @deprecated Используйте api.contentPosts.updateAll() для сохранения в Firebase
   */
  setContentPosts: (posts: ContentPost[]) => {
      console.warn('[DEPRECATED] storageService.setContentPosts() is deprecated. Use api.contentPosts.updateAll() instead.');
      setLocal(STORAGE_KEYS.CONTENT_POSTS, posts);
  },
  /**
   * @deprecated Используйте api.activity.add() для сохранения в Firebase
   */
  setActivities: (logs: ActivityLog[]) => {
      console.warn('[DEPRECATED] storageService.setActivities() is deprecated. Use api.activity.add() instead.');
      setLocal(STORAGE_KEYS.ACTIVITY, logs);
  },
  /**
   * @deprecated Используйте api.statuses.updateAll() для сохранения в Firebase
   */
  setStatuses: (statuses: StatusOption[]) => {
      console.warn('[DEPRECATED] storageService.setStatuses() is deprecated. Use api.statuses.updateAll() instead.');
      setLocal(STORAGE_KEYS.STATUSES, statuses);
  },
  /**
   * @deprecated Используйте api.priorities.updateAll() для сохранения в Firebase
   */
  setPriorities: (priorities: PriorityOption[]) => {
      console.warn('[DEPRECATED] storageService.setPriorities() is deprecated. Use api.priorities.updateAll() instead.');
      setLocal(STORAGE_KEYS.PRIORITIES, priorities);
  },
  /**
   * @deprecated Используйте api.clients.updateAll() для сохранения в Firebase
   */
  setClients: (clients: Client[]) => {
      console.warn('[DEPRECATED] storageService.setClients() is deprecated. Use api.clients.updateAll() instead.');
      setLocal(STORAGE_KEYS.CLIENTS, clients);
  },
  /**
   * @deprecated Используйте api.contracts.updateAll() для сохранения в Firebase
   */
  setContracts: (contracts: Contract[]) => {
      console.warn('[DEPRECATED] storageService.setContracts() is deprecated. Use api.contracts.updateAll() instead.');
      setLocal(STORAGE_KEYS.CONTRACTS, contracts);
  },
  /**
   * @deprecated Используйте api.oneTimeDeals.updateAll() для сохранения в Firebase
   */
  setOneTimeDeals: (deals: OneTimeDeal[]) => {
      console.warn('[DEPRECATED] storageService.setOneTimeDeals() is deprecated. Use api.oneTimeDeals.updateAll() instead.');
      setLocal(STORAGE_KEYS.ONE_TIME_DEALS, deals);
  },
  /**
   * @deprecated Используйте api.accountsReceivable.updateAll() для сохранения в Firebase
   */
  setAccountsReceivable: (receivables: AccountsReceivable[]) => {
      console.warn('[DEPRECATED] storageService.setAccountsReceivable() is deprecated. Use api.accountsReceivable.updateAll() instead.');
      setLocal(STORAGE_KEYS.ACCOUNTS_RECEIVABLE, receivables);
  },
  /**
   * @deprecated Используйте api.employees.updateAll() для сохранения в Firebase
   */
  setEmployeeInfos: (infos: EmployeeInfo[]) => {
      console.warn('[DEPRECATED] storageService.setEmployeeInfos() is deprecated. Use api.employees.updateAll() instead.');
      setLocal(STORAGE_KEYS.EMPLOYEE_INFOS, infos);
  },
  /**
   * @deprecated Используйте api.deals.updateAll() для сохранения в Firebase
   */
  setDeals: (deals: Deal[]) => {
      console.warn('[DEPRECATED] storageService.setDeals() is deprecated. Use api.deals.updateAll() instead.');
      setLocal(STORAGE_KEYS.DEALS, deals);
  },
  /**
   * @deprecated Используйте api.notificationPrefs.update() для сохранения в Firebase
   */
  setNotificationPrefs: (prefs: NotificationPreferences) => {
      console.warn('[DEPRECATED] storageService.setNotificationPrefs() is deprecated. Use api.notificationPrefs.update() instead.');
      setLocal(STORAGE_KEYS.NOTIFICATION_PREFS, prefs);
  },
  
  // Finance Setters - @deprecated
  /**
   * @deprecated Используйте api.departments.updateAll() для сохранения в Firebase
   */
  setDepartments: (deps: Department[]) => {
      console.warn('[DEPRECATED] storageService.setDepartments() is deprecated. Use api.departments.updateAll() instead.');
      setLocal(STORAGE_KEYS.DEPARTMENTS, deps);
  },
  /**
   * @deprecated Используйте api.finance.updateCategories() для сохранения в Firebase
   */
  setFinanceCategories: (cats: FinanceCategory[]) => {
      console.warn('[DEPRECATED] storageService.setFinanceCategories() is deprecated. Use api.finance.updateCategories() instead.');
      setLocal(STORAGE_KEYS.FINANCE_CATEGORIES, cats);
  },
  /**
   * @deprecated Используйте api.finance.updatePlan() для сохранения в Firebase
   */
  setFinancePlan: (plan: FinancePlan) => {
      console.warn('[DEPRECATED] storageService.setFinancePlan() is deprecated. Use api.finance.updatePlan() instead.');
      setLocal(STORAGE_KEYS.FINANCE_PLAN, plan);
  },
  /**
   * @deprecated Используйте api.finance.updateRequests() для сохранения в Firebase
   */
  setPurchaseRequests: (reqs: PurchaseRequest[]) => {
      console.warn('[DEPRECATED] storageService.setPurchaseRequests() is deprecated. Use api.finance.updateRequests() instead.');
      setLocal(STORAGE_KEYS.PURCHASE_REQUESTS, reqs);
  },
  /**
   * @deprecated Используйте api.finance.updateFinancialPlanDocuments() для сохранения в Firebase
   */
  setFinancialPlanDocuments: (docs: FinancialPlanDocument[]) => {
      console.warn('[DEPRECATED] storageService.setFinancialPlanDocuments() is deprecated. Use api.finance.updateFinancialPlanDocuments() instead.');
      setLocal(STORAGE_KEYS.FINANCIAL_PLAN_DOCUMENTS, docs);
  },
  /**
   * @deprecated Используйте api.finance.updateFinancialPlannings() для сохранения в Firebase
   */
  setFinancialPlannings: (plannings: FinancialPlanning[]) => {
      console.warn('[DEPRECATED] storageService.setFinancialPlannings() is deprecated. Use api.finance.updateFinancialPlannings() instead.');
      setLocal(STORAGE_KEYS.FINANCIAL_PLANNINGS, plannings);
  },

  // BPM Setters - @deprecated
  /**
   * @deprecated Используйте api.bpm.updatePositions() для сохранения в Firebase
   */
  setOrgPositions: (ops: OrgPosition[]) => {
      console.warn('[DEPRECATED] storageService.setOrgPositions() is deprecated. Use api.bpm.updatePositions() instead.');
      setLocal(STORAGE_KEYS.ORG_POSITIONS, ops);
  },
  /**
   * @deprecated Используйте api.bpm.updateProcesses() для сохранения в Firebase
   */
  setBusinessProcesses: (bps: BusinessProcess[]) => {
      console.warn('[DEPRECATED] storageService.setBusinessProcesses() is deprecated. Use api.bpm.updateProcesses() instead.');
      setLocal(STORAGE_KEYS.BUSINESS_PROCESSES, bps);
  },

  // Automation Setters - @deprecated
  /**
   * @deprecated Используйте api.automation.updateRules() для сохранения в Firebase
   */
  setAutomationRules: (rules: AutomationRule[]) => {
      console.warn('[DEPRECATED] storageService.setAutomationRules() is deprecated. Use api.automation.updateRules() instead.');
      setLocal(STORAGE_KEYS.AUTOMATION_RULES, rules);
  },

  /**
   * @deprecated Используйте api.activity.add() для сохранения в Firebase
   */
  addActivity: (log: ActivityLog) => {
      console.warn('[DEPRECATED] storageService.addActivity() is deprecated. Use api.activity.add() instead.');
      const logs = getLocal<ActivityLog[]>(STORAGE_KEYS.ACTIVITY, []);
      const newLogs = [log, ...logs].slice(0, 100);
      setLocal(STORAGE_KEYS.ACTIVITY, newLogs);
      return newLogs;
  },
};
