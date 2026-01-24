/**
 * Централизованный сервис для отправки уведомлений
 * Объединяет логику создания activity logs и отправки Telegram уведомлений
 */

import { User, NotificationPreferences, Task, Deal, Client, Contract, Doc, Meeting, Role } from '../types';
import { getUserTelegramChatId } from './telegramService';
import { api } from '../backend/api';
import {
  createTaskCreatedLog,
  createTaskStatusChangedLog,
  createDealCreatedLog,
  createDealStatusChangedLog,
  createClientCreatedLog,
  createContractCreatedLog,
  createDocCreatedLog,
  createMeetingCreatedLog,
  createPurchaseRequestCreatedLog,
} from '../utils/activityLogUtils';
import {
  formatNewTaskMessage,
  formatStatusChangeMessage,
  formatDealMessage,
  formatDealStatusChangeMessage,
  formatClientMessage,
  formatContractMessage,
  formatDocumentMessage,
  formatMeetingMessage,
  formatPurchaseRequestMessage,
} from './telegramService';

export interface NotificationContext {
  currentUser: User;
  allUsers: User[];
  notificationPrefs?: NotificationPreferences;
}

/**
 * Базовый интерфейс для уведомлений
 */
interface BaseNotificationOptions {
  context: NotificationContext;
  skipActivityLog?: boolean;
  skipTelegram?: boolean;
}

/**
 * Отправляет уведомление о создании задачи
 */
export const notifyTaskCreated = async (
  task: Task,
  assigneeUser: User | null,
  options: BaseNotificationOptions
): Promise<void> => {
  const { context, skipActivityLog, skipTelegram } = options;
  const { currentUser, allUsers, notificationPrefs } = context;

  try {
    // Activity log - всегда создается (если не пропущен)
    if (!skipActivityLog) {
      await createTaskCreatedLog(task, currentUser, assigneeUser, allUsers);
    }

    // Telegram уведомление
    // ВСЕ УВЕДОМЛЕНИЯ БАЗОВО АКТИВНЫ - если настройка не указана, считаем что она включена
    const newTaskSetting = notificationPrefs?.newTask || { telegramPersonal: true, telegramGroup: false };
    
    console.log('[NOTIFICATION] notifyTaskCreated:', {
      skipTelegram,
      newTaskSetting,
      hasAssignee: !!assigneeUser,
      assigneeId: assigneeUser?.id,
      assigneeTelegramUserId: assigneeUser?.telegramUserId,
      creatorId: task.createdByUserId || currentUser?.id,
      hasNotificationPrefs: !!notificationPrefs
    });
    
    // Отправляем уведомления через очередь бота (токен берется из .env на сервере)
    if (!skipTelegram && newTaskSetting.telegramPersonal !== false) {
      const assigneeName = assigneeUser ? assigneeUser.name : 'Не назначено';
      const message = formatNewTaskMessage(task.title, task.priority, task.endDate, assigneeName, null);
      
      // Добавляем задачу в очередь для исполнителя (если назначен)
      if (assigneeUser) {
        const assigneeTelegramChatId = getUserTelegramChatId(assigneeUser);
        if (assigneeTelegramChatId) {
          try {
            await api.notificationQueue.add({
              type: 'taskCreated',
              userId: assigneeUser.id,
              message,
              chatId: assigneeTelegramChatId,
              metadata: { taskId: task.id, taskTitle: task.title }
            });
            console.log('[NOTIFICATION] Task notification queued for assignee:', assigneeUser.id);
          } catch (error) {
            console.error('[NOTIFICATION] Error queueing notification for assignee:', error);
          }
        } else {
          console.warn('[NOTIFICATION] Assignee has no telegramUserId - user needs to login to bot:', {
            assigneeId: assigneeUser.id,
            assigneeName: assigneeUser.name
          });
        }
      }
      
      // Также добавляем задачу для создателя, если он не является исполнителем
      const creatorId = task.createdByUserId || currentUser?.id;
      if (creatorId && (!assigneeUser || assigneeUser.id !== creatorId)) {
        const creatorUser = allUsers.find(u => u.id === creatorId);
        if (creatorUser) {
          const creatorTelegramChatId = getUserTelegramChatId(creatorUser);
          if (creatorTelegramChatId) {
            try {
              await api.notificationQueue.add({
                type: 'taskCreated',
                userId: creatorId,
                message,
                chatId: creatorTelegramChatId,
                metadata: { taskId: task.id, taskTitle: task.title }
              });
              console.log('[NOTIFICATION] Task notification queued for creator:', creatorId);
            } catch (error) {
              console.error('[NOTIFICATION] Error queueing notification for creator:', error);
            }
          } else {
            console.warn('[NOTIFICATION] Creator has no telegramUserId - user needs to login to bot:', {
              creatorId,
              creatorName: creatorUser.name
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('[NOTIFICATION] Error notifying task created:', error);
  }
};

/**
 * Отправляет уведомление об изменении статуса задачи
 */
export const notifyTaskStatusChanged = async (
  task: Task,
  oldStatus: string,
  newStatus: string,
  assigneeUser: User | null,
  options: BaseNotificationOptions
): Promise<void> => {
  const { context, skipActivityLog, skipTelegram } = options;
  const { currentUser, allUsers, notificationPrefs } = context;

  try {
    // Activity log - всегда создается (если не пропущен)
    if (!skipActivityLog) {
      await createTaskStatusChangedLog(task, oldStatus, newStatus, currentUser, assigneeUser, allUsers);
    }

    // Отправляем уведомление через очередь бота
    const statusChangeSetting = notificationPrefs?.statusChange || { telegramPersonal: true, telegramGroup: false };
    if (!skipTelegram && statusChangeSetting.telegramPersonal !== false && assigneeUser) {
      const userTelegramChatId = getUserTelegramChatId(assigneeUser);
      if (userTelegramChatId) {
        try {
          await api.notificationQueue.add({
            type: 'taskStatusChanged',
            userId: assigneeUser.id,
            message: formatStatusChangeMessage(task.title, oldStatus, newStatus, currentUser.name),
            chatId: userTelegramChatId,
            metadata: { taskId: task.id, oldStatus, newStatus }
          });
        } catch (error) {
          console.error('[NOTIFICATION] Error queueing status change notification:', error);
        }
      }
    }
  } catch (error) {
    console.error('[NOTIFICATION] Error notifying task status changed:', error);
  }
};

/**
 * Отправляет уведомление о создании сделки
 */
export const notifyDealCreated = async (
  deal: Deal,
  assigneeUser: User | null,
  options: BaseNotificationOptions
): Promise<void> => {
  const { context, skipActivityLog, skipTelegram } = options;
  const { currentUser, allUsers, notificationPrefs } = context;

  try {
    // Activity log - всегда создается (если не пропущен)
    if (!skipActivityLog) {
      await createDealCreatedLog(deal, currentUser, assigneeUser, allUsers);
    }

    // Отправляем уведомления через очередь бота
    const dealCreatedSetting = notificationPrefs?.dealCreated || { telegramPersonal: true, telegramGroup: false };
    if (!skipTelegram && dealCreatedSetting.telegramPersonal !== false) {
      const dealMessage = formatDealMessage(deal.title, deal.stage, deal.amount || 0, assigneeUser?.name || 'Не назначено');
      
      // Отправляем уведомление ответственному (если назначен)
      if (assigneeUser) {
        const userTelegramChatId = getUserTelegramChatId(assigneeUser);
        if (userTelegramChatId) {
          try {
            await api.notificationQueue.add({
              type: 'dealCreated',
              userId: assigneeUser.id,
              message: dealMessage,
              chatId: userTelegramChatId,
              metadata: { dealId: deal.id, dealTitle: deal.title }
            });
          } catch (error) {
            console.error('[NOTIFICATION] Error queueing deal notification for assignee:', error);
          }
        }
      }
      
      // Отправляем уведомление всем администраторам
      const adminUsers = allUsers.filter(user => user.role === 'ADMIN' && !user.isArchived);
      for (const admin of adminUsers) {
        const adminTelegramChatId = getUserTelegramChatId(admin);
        if (adminTelegramChatId && (!assigneeUser || admin.id !== assigneeUser.id)) {
          try {
            await api.notificationQueue.add({
              type: 'dealCreated',
              userId: admin.id,
              message: `🆕 <b>Новая заявка</b>\n\n<b>Название:</b> ${deal.title}\n<b>Стадия:</b> ${deal.stage}\n<b>Сумма:</b> ${deal.amount?.toLocaleString() || 0} ${deal.currency || 'UZS'}\n<b>Создал:</b> ${currentUser?.name || 'Неизвестно'}\n<b>Ответственный:</b> ${assigneeUser?.name || 'Не назначено'}`,
              chatId: adminTelegramChatId,
              metadata: { dealId: deal.id, dealTitle: deal.title, isAdmin: true }
            });
          } catch (error) {
            console.error('[NOTIFICATION] Error queueing deal notification for admin:', error);
          }
        }
      }
    }
  } catch (error) {
    console.error('[NOTIFICATION] Error notifying deal created:', error);
  }
};

/**
 * Отправляет уведомление об изменении статуса сделки
 */
export const notifyDealStatusChanged = async (
  deal: Deal,
  oldStage: string,
  newStage: string,
  options: BaseNotificationOptions
): Promise<void> => {
  const { context, skipActivityLog, skipTelegram } = options;
  const { currentUser, allUsers, notificationPrefs } = context;

  try {
    // Activity log - всегда создается (если не пропущен)
    if (!skipActivityLog) {
      await createDealStatusChangedLog(deal, oldStage, newStage, currentUser, allUsers);
    }

    // Отправляем уведомление через очередь бота (если есть ответственный)
    const dealStatusChangedSetting = notificationPrefs?.dealStatusChanged || { telegramPersonal: true, telegramGroup: false };
    if (!skipTelegram && dealStatusChangedSetting.telegramPersonal !== false) {
      // Находим ответственного по сделке
      const assigneeUser = deal.assigneeId ? allUsers.find(u => u.id === deal.assigneeId) : null;
      if (assigneeUser) {
        const userTelegramChatId = getUserTelegramChatId(assigneeUser);
        if (userTelegramChatId) {
          try {
            await api.notificationQueue.add({
              type: 'dealStatusChanged',
              userId: assigneeUser.id,
              message: formatDealStatusChangeMessage(deal.title, oldStage, newStage, currentUser.name),
              chatId: userTelegramChatId,
              metadata: { dealId: deal.id, oldStage, newStage }
            });
          } catch (error) {
            console.error('[NOTIFICATION] Error queueing deal status change notification:', error);
          }
        }
      }
    }
  } catch (error) {
    console.error('[NOTIFICATION] Error notifying deal status changed:', error);
  }
};

/**
 * Отправляет уведомление о создании клиента
 */
export const notifyClientCreated = async (
  client: Client,
  options: BaseNotificationOptions
): Promise<void> => {
  const { context, skipActivityLog, skipTelegram } = options;
  const { currentUser, allUsers, notificationPrefs } = context;

  try {
    // Activity log - всегда создается (если не пропущен)
    if (!skipActivityLog) {
      await createClientCreatedLog(client, currentUser, allUsers);
    }

    // Уведомления о клиентах обычно не требуют персональных уведомлений
    // Можно добавить в очередь для администраторов, если нужно
  } catch (error) {
    console.error('[NOTIFICATION] Error notifying client created:', error);
  }
};

/**
 * Отправляет уведомление о создании договора
 */
export const notifyContractCreated = async (
  contract: Contract,
  clientName: string,
  options: BaseNotificationOptions
): Promise<void> => {
  const { context, skipActivityLog, skipTelegram } = options;
  const { currentUser, allUsers, notificationPrefs } = context;

  try {
    // Activity log - всегда создается (если не пропущен)
    if (!skipActivityLog) {
      await createContractCreatedLog(contract, currentUser, allUsers);
    }

    // Уведомления о договорах обычно не требуют персональных уведомлений
    // Можно добавить в очередь для администраторов, если нужно
  } catch (error) {
    console.error('[NOTIFICATION] Error notifying contract created:', error);
  }
};

/**
 * Отправляет уведомление о создании документа
 */
export const notifyDocCreated = async (
  doc: Doc,
  options: BaseNotificationOptions
): Promise<void> => {
  const { context, skipActivityLog, skipTelegram } = options;
  const { currentUser, allUsers, notificationPrefs } = context;

  try {
    // Activity log - всегда создается (если не пропущен)
    if (!skipActivityLog) {
      await createDocCreatedLog(doc, currentUser, allUsers);
    }

    // Уведомления о документах обычно не требуют персональных уведомлений
    // Можно добавить в очередь для администраторов, если нужно
  } catch (error) {
    console.error('[NOTIFICATION] Error notifying doc created:', error);
  }
};

/**
 * Отправляет уведомление о создании встречи
 */
export const notifyMeetingCreated = async (
  meeting: Meeting,
  participantIds: string[],
  options: BaseNotificationOptions
): Promise<void> => {
  const { context, skipActivityLog, skipTelegram } = options;
  const { currentUser, allUsers, notificationPrefs } = context;

  try {
    // Activity log - всегда создается (если не пропущен)
    if (!skipActivityLog) {
      await createMeetingCreatedLog(meeting, currentUser, participantIds, allUsers);
    }

    // Отправляем уведомления участникам встречи через очередь
    const meetingCreatedSetting = notificationPrefs?.meetingCreated || { telegramPersonal: true, telegramGroup: false };
    if (!skipTelegram && meetingCreatedSetting.telegramPersonal !== false) {
      const message = formatMeetingMessage(meeting.title, meeting.date, meeting.time, currentUser.name);
      
      // Отправляем уведомление всем участникам
      for (const participantId of participantIds) {
        const participant = allUsers.find(u => u.id === participantId);
        if (participant) {
          const participantTelegramChatId = getUserTelegramChatId(participant);
          if (participantTelegramChatId) {
            try {
              await api.notificationQueue.add({
                type: 'meetingCreated',
                userId: participantId,
                message,
                chatId: participantTelegramChatId,
                metadata: { meetingId: meeting.id, meetingTitle: meeting.title }
              });
            } catch (error) {
              console.error('[NOTIFICATION] Error queueing meeting notification:', error);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('[NOTIFICATION] Error notifying meeting created:', error);
  }
};

/**
 * Отправляет уведомление о создании заявки на покупку
 */
export const notifyPurchaseRequestCreated = async (
  request: { id: string; title?: string; description?: string; amount?: number },
  departmentName: string,
  options: BaseNotificationOptions
): Promise<void> => {
  const { context, skipActivityLog, skipTelegram } = options;
  const { currentUser, allUsers, notificationPrefs } = context;

  try {
    // Activity log - всегда создается (если не пропущен)
    if (!skipActivityLog) {
      await createPurchaseRequestCreatedLog(request, currentUser, allUsers);
    }

    // Уведомления о заявках на покупку обычно отправляются администраторам
    const purchaseRequestCreatedSetting = notificationPrefs?.purchaseRequestCreated || { telegramPersonal: true, telegramGroup: false };
    if (!skipTelegram && purchaseRequestCreatedSetting.telegramPersonal !== false) {
      const message = formatPurchaseRequestMessage(
        request.title || request.description || 'Заявка',
        request.amount || 0,
        departmentName,
        currentUser.name
      );
      
      // Отправляем уведомление администраторам
      const adminUsers = allUsers.filter(user => user.role === 'ADMIN' && !user.isArchived);
      for (const admin of adminUsers) {
        const adminTelegramChatId = getUserTelegramChatId(admin);
        if (adminTelegramChatId) {
          try {
            await api.notificationQueue.add({
              type: 'purchaseRequestCreated',
              userId: admin.id,
              message,
              chatId: adminTelegramChatId,
              metadata: { requestId: request.id }
            });
          } catch (error) {
            console.error('[NOTIFICATION] Error queueing purchase request notification:', error);
          }
        }
      }
    }
  } catch (error) {
    console.error('[NOTIFICATION] Error notifying purchase request created:', error);
  }
};
