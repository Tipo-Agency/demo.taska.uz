
import { Doc, Project, Role, TableCollection, Task, User, Meeting, ActivityLog, StatusOption, PriorityOption, ContentPost, Client, EmployeeInfo, Contract, Folder, Deal, NotificationPreferences, Department, FinanceCategory, FinancePlan, PurchaseRequest, OrgPosition, BusinessProcess, AutomationRule, Warehouse, InventoryItem, StockMovement } from "../types";
import { MOCK_PROJECTS, MOCK_TABLES, DEFAULT_STATUSES, DEFAULT_PRIORITIES, DEFAULT_NOTIFICATION_PREFS, MOCK_DEPARTMENTS, DEFAULT_FINANCE_CATEGORIES, MOCK_ORG_POSITIONS, DEFAULT_AUTOMATION_RULES, TELEGRAM_BOT_TOKEN } from "../constants";

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
  // BPM
  ORG_POSITIONS: 'cfo_org_positions',
  BUSINESS_PROCESSES: 'cfo_business_processes',
  // Automation
  AUTOMATION_RULES: 'cfo_automation_rules',
  // Inventory
  WAREHOUSES: 'cfo_warehouses',
  INVENTORY_ITEMS: 'cfo_inventory_items',
  STOCK_MOVEMENTS: 'cfo_stock_movements',
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

export const storageService = {
  // Session Management
  getActiveUserId: (): string | null => localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID),
  setActiveUserId: (id: string) => localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, id),
  clearActiveUserId: () => localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER_ID),

  getTelegramChatId: (): string => localStorage.getItem(STORAGE_KEYS.TELEGRAM_CHAT_ID) || '',
  setTelegramChatId: (id: string) => localStorage.setItem(STORAGE_KEYS.TELEGRAM_CHAT_ID, id),

  // Bot Tokens
  getEmployeeBotToken: (): string => localStorage.getItem(STORAGE_KEYS.TELEGRAM_EMPLOYEE_TOKEN) || TELEGRAM_BOT_TOKEN,
  setEmployeeBotToken: (t: string) => localStorage.setItem(STORAGE_KEYS.TELEGRAM_EMPLOYEE_TOKEN, t),
  
  getClientBotToken: (): string => localStorage.getItem(STORAGE_KEYS.TELEGRAM_CLIENT_TOKEN) || '',
  setClientBotToken: (t: string) => localStorage.setItem(STORAGE_KEYS.TELEGRAM_CLIENT_TOKEN, t),

  // Telegram Direct Integration Settings
  getLastTelegramUpdateId: (): number => getLocal(STORAGE_KEYS.LAST_TELEGRAM_UPDATE_ID, 0),
  setLastTelegramUpdateId: (id: number) => setLocal(STORAGE_KEYS.LAST_TELEGRAM_UPDATE_ID, id),

  // Inventory Local Accessors
  getWarehouses: (): Warehouse[] => getLocal(STORAGE_KEYS.WAREHOUSES, []),
  setWarehouses: (warehouses: Warehouse[]) => setLocal(STORAGE_KEYS.WAREHOUSES, warehouses),
  getInventoryItems: (): InventoryItem[] => getLocal(STORAGE_KEYS.INVENTORY_ITEMS, []),
  setInventoryItems: (items: InventoryItem[]) => setLocal(STORAGE_KEYS.INVENTORY_ITEMS, items),
  getStockMovements: (): StockMovement[] => getLocal(STORAGE_KEYS.STOCK_MOVEMENTS, []),
  setStockMovements: (movements: StockMovement[]) => setLocal(STORAGE_KEYS.STOCK_MOVEMENTS, movements),
  
  getEnableTelegramImport: (): boolean => getLocal(STORAGE_KEYS.ENABLE_TELEGRAM_IMPORT, false),
  setEnableTelegramImport: (enabled: boolean) => setLocal(STORAGE_KEYS.ENABLE_TELEGRAM_IMPORT, enabled),

  // Локальная версия - без синхронизации с облаком
  loadFromCloud: async () => {
      // Локальный режим - не загружаем из облака
      return false;
  },

  saveToCloud: async () => {
      // Локальный режим - не сохраняем в облако
      // Все данные хранятся только в localStorage
  },

  getUsers: (): User[] => getLocal(STORAGE_KEYS.USERS, []), // Пользователи загружаются только из Firebase
  getTasks: (): Task[] => getLocal(STORAGE_KEYS.TASKS, []),
  getProjects: (): Project[] => getLocal(STORAGE_KEYS.PROJECTS, MOCK_PROJECTS),
  getTables: (): TableCollection[] => getLocal(STORAGE_KEYS.TABLES, MOCK_TABLES),
  getDocs: (): Doc[] => getLocal(STORAGE_KEYS.DOCS, []),
  getFolders: (): Folder[] => getLocal(STORAGE_KEYS.FOLDERS, []),
  getMeetings: (): Meeting[] => getLocal(STORAGE_KEYS.MEETINGS, []),
  getContentPosts: (): ContentPost[] => getLocal(STORAGE_KEYS.CONTENT_POSTS, []),
  getActivities: (): ActivityLog[] => getLocal(STORAGE_KEYS.ACTIVITY, []),
  getStatuses: (): StatusOption[] => getLocal(STORAGE_KEYS.STATUSES, DEFAULT_STATUSES),
  getPriorities: (): PriorityOption[] => getLocal(STORAGE_KEYS.PRIORITIES, DEFAULT_PRIORITIES),
  getClients: (): Client[] => getLocal(STORAGE_KEYS.CLIENTS, []),
  getContracts: (): Contract[] => getLocal(STORAGE_KEYS.CONTRACTS, []),
  getEmployeeInfos: (): EmployeeInfo[] => getLocal(STORAGE_KEYS.EMPLOYEE_INFOS, []),
  getDeals: (): Deal[] => getLocal(STORAGE_KEYS.DEALS, []),
  getNotificationPrefs: (): NotificationPreferences => getLocal(STORAGE_KEYS.NOTIFICATION_PREFS, DEFAULT_NOTIFICATION_PREFS),
  
  // Finance Getters
  getDepartments: (): Department[] => getLocal(STORAGE_KEYS.DEPARTMENTS, MOCK_DEPARTMENTS),
  getFinanceCategories: (): FinanceCategory[] => getLocal(STORAGE_KEYS.FINANCE_CATEGORIES, DEFAULT_FINANCE_CATEGORIES),
  getFinancePlan: (): FinancePlan | null => getLocal(STORAGE_KEYS.FINANCE_PLAN, { id: 'current', period: 'month', salesPlan: 0, currentIncome: 0 }),
  getPurchaseRequests: (): PurchaseRequest[] => getLocal(STORAGE_KEYS.PURCHASE_REQUESTS, []),

  // BPM Getters
  getOrgPositions: (): OrgPosition[] => getLocal(STORAGE_KEYS.ORG_POSITIONS, MOCK_ORG_POSITIONS),
  getBusinessProcesses: (): BusinessProcess[] => getLocal(STORAGE_KEYS.BUSINESS_PROCESSES, []),

  // Automation
  getAutomationRules: (): AutomationRule[] => getLocal(STORAGE_KEYS.AUTOMATION_RULES, DEFAULT_AUTOMATION_RULES),

  setUsers: (users: User[]) => setLocal(STORAGE_KEYS.USERS, users),
  setTasks: (tasks: Task[]) => setLocal(STORAGE_KEYS.TASKS, tasks),
  setProjects: (projects: Project[]) => setLocal(STORAGE_KEYS.PROJECTS, projects),
  setTables: (tables: TableCollection[]) => setLocal(STORAGE_KEYS.TABLES, tables),
  setDocs: (docs: Doc[]) => setLocal(STORAGE_KEYS.DOCS, docs),
  setFolders: (folders: Folder[]) => setLocal(STORAGE_KEYS.FOLDERS, folders),
  setMeetings: (meetings: Meeting[]) => setLocal(STORAGE_KEYS.MEETINGS, meetings),
  setContentPosts: (posts: ContentPost[]) => setLocal(STORAGE_KEYS.CONTENT_POSTS, posts),
  setActivities: (logs: ActivityLog[]) => setLocal(STORAGE_KEYS.ACTIVITY, logs),
  setStatuses: (statuses: StatusOption[]) => setLocal(STORAGE_KEYS.STATUSES, statuses),
  setPriorities: (priorities: PriorityOption[]) => setLocal(STORAGE_KEYS.PRIORITIES, priorities),
  setClients: (clients: Client[]) => setLocal(STORAGE_KEYS.CLIENTS, clients),
  setContracts: (contracts: Contract[]) => setLocal(STORAGE_KEYS.CONTRACTS, contracts),
  setEmployeeInfos: (infos: EmployeeInfo[]) => setLocal(STORAGE_KEYS.EMPLOYEE_INFOS, infos),
  setDeals: (deals: Deal[]) => setLocal(STORAGE_KEYS.DEALS, deals),
  setNotificationPrefs: (prefs: NotificationPreferences) => setLocal(STORAGE_KEYS.NOTIFICATION_PREFS, prefs),
  
  // Finance Setters
  setDepartments: (deps: Department[]) => setLocal(STORAGE_KEYS.DEPARTMENTS, deps),
  setFinanceCategories: (cats: FinanceCategory[]) => setLocal(STORAGE_KEYS.FINANCE_CATEGORIES, cats),
  setFinancePlan: (plan: FinancePlan) => setLocal(STORAGE_KEYS.FINANCE_PLAN, plan),
  setPurchaseRequests: (reqs: PurchaseRequest[]) => setLocal(STORAGE_KEYS.PURCHASE_REQUESTS, reqs),

  // BPM Setters
  setOrgPositions: (ops: OrgPosition[]) => setLocal(STORAGE_KEYS.ORG_POSITIONS, ops),
  setBusinessProcesses: (bps: BusinessProcess[]) => setLocal(STORAGE_KEYS.BUSINESS_PROCESSES, bps),

  // Automation Setters
  setAutomationRules: (rules: AutomationRule[]) => setLocal(STORAGE_KEYS.AUTOMATION_RULES, rules),

  addActivity: (log: ActivityLog) => {
      const logs = getLocal<ActivityLog[]>(STORAGE_KEYS.ACTIVITY, []);
      const newLogs = [log, ...logs].slice(0, 100); 
      setLocal(STORAGE_KEYS.ACTIVITY, newLogs);
      return newLogs;
  },
};
