import { localStoreService } from "../../services/localStoreService";
import { ActivityLog, StatusOption, PriorityOption, TableCollection, NotificationPreferences, AutomationRule } from "../../types";
import { DEFAULT_NOTIFICATION_PREFS } from "../../constants";

const TABLES_COLLECTION = 'tables';
const ACTIVITY_COLLECTION = 'activity';
const STATUSES_COLLECTION = 'statuses';
const PRIORITIES_COLLECTION = 'priorities';
const NOTIFICATION_PREFS_COLLECTION = 'notificationPrefs';
const AUTOMATION_RULES_COLLECTION = 'automationRules';

export const tablesEndpoint = {
    getAll: async (): Promise<TableCollection[]> => {
        return await localStoreService.getAll(TABLES_COLLECTION) as TableCollection[];
    },
    updateAll: async (tables: TableCollection[]) => {
        await Promise.all(tables.map(table => localStoreService.save(TABLES_COLLECTION, table)));
    },
};

export const activityEndpoint = {
    getAll: async (): Promise<ActivityLog[]> => {
        return await localStoreService.getAll(ACTIVITY_COLLECTION) as ActivityLog[];
    },
    updateAll: async (logs: ActivityLog[]) => {
        await Promise.all(logs.map(log => localStoreService.save(ACTIVITY_COLLECTION, log)));
    },
    add: async (log: ActivityLog) => {
        await localStoreService.save(ACTIVITY_COLLECTION, log);
    },
};

export const statusesEndpoint = {
    getAll: async (): Promise<StatusOption[]> => {
        return await localStoreService.getAll(STATUSES_COLLECTION) as StatusOption[];
    },
    updateAll: async (statuses: StatusOption[]) => {
        await Promise.all(statuses.map(status => localStoreService.save(STATUSES_COLLECTION, status)));
    },
};

export const prioritiesEndpoint = {
    getAll: async (): Promise<PriorityOption[]> => {
        return await localStoreService.getAll(PRIORITIES_COLLECTION) as PriorityOption[];
    },
    updateAll: async (priorities: PriorityOption[]) => {
        await Promise.all(priorities.map(priority => localStoreService.save(PRIORITIES_COLLECTION, priority)));
    },
};

export const notificationPrefsEndpoint = {
    get: async (): Promise<NotificationPreferences> => {
        const items = await localStoreService.getAll(NOTIFICATION_PREFS_COLLECTION);
        return (items[0] as NotificationPreferences) || DEFAULT_NOTIFICATION_PREFS;
    },
    update: async (prefs: NotificationPreferences) => {
        const existing = await localStoreService.getAll(NOTIFICATION_PREFS_COLLECTION);
        if (existing.length > 0) {
            await localStoreService.save(NOTIFICATION_PREFS_COLLECTION, { ...prefs, id: existing[0].id });
        } else {
            await localStoreService.save(NOTIFICATION_PREFS_COLLECTION, { ...prefs, id: 'default' });
        }
    },
};

export const automationEndpoint = {
    getRules: async (): Promise<AutomationRule[]> => {
        return await localStoreService.getAll(AUTOMATION_RULES_COLLECTION) as AutomationRule[];
    },
    updateRules: async (rules: AutomationRule[]) => {
        await Promise.all(rules.map(rule => localStoreService.save(AUTOMATION_RULES_COLLECTION, rule)));
    },
};

// Notification Queue endpoint для отправки уведомлений через бота
const NOTIFICATION_QUEUE_COLLECTION = 'notificationQueue';

export const notificationQueueEndpoint = {
    add: async (task: {
        type: string;
        userId: string;
        message: string;
        chatId: string;
        metadata?: Record<string, any>;
    }): Promise<void> => {
        const notificationTask = {
            id: `notif_${Date.now()}_${task.userId}`,
            type: task.type,
            userId: task.userId,
            message: task.message,
            chatId: task.chatId,
            metadata: task.metadata || {},
            createdAt: new Date().toISOString(),
            sent: false,
            error: null,
        };
        await localStoreService.save(NOTIFICATION_QUEUE_COLLECTION, notificationTask);
    },
};
