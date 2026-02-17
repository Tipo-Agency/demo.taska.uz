/**
 * Мок-данные для демо. Один раз заполняет localStorage по всем модулям.
 */
import { localStoreService } from '../services/localStoreService';
import { Role } from '../types';
import {
  DEFAULT_STATUSES,
  DEFAULT_PRIORITIES,
  DEFAULT_NOTIFICATION_PREFS,
  DEFAULT_FINANCE_CATEGORIES,
  DEFAULT_AUTOMATION_RULES,
} from '../constants';

const SEED_FLAG = 'taska_demo_seeded';

const now = () => new Date().toISOString();
const today = () => now().slice(0, 10);

export function runSeed(): void {
  if (typeof window === 'undefined') return;
  if (localStorage.getItem(SEED_FLAG)) return;

  const demoUserId = 'demo-user';

  // Users (демо + ещё пару для отображения)
  localStoreService.setAll('users', [
    { id: demoUserId, name: 'Демо', role: Role.ADMIN, login: 'demo', password: '' },
    { id: 'u2', name: 'Анна Иванова', role: Role.EMPLOYEE, login: 'anna', email: 'anna@example.com' },
    { id: 'u3', name: 'Пётр Сидоров', role: Role.EMPLOYEE, login: 'petr', email: 'petr@example.com' },
  ]);

  // Tables (страницы)
  localStoreService.setAll('tables', [
    { id: 't1', name: 'Задачи', type: 'tasks', icon: 'CheckSquare', color: 'text-blue-500' },
    { id: 't2', name: 'Контент-план', type: 'content-plan', icon: 'Instagram', color: 'text-pink-500' },
    { id: 't3', name: 'Беклог', type: 'backlog', icon: 'Archive', color: 'text-amber-500' },
    { id: 't4', name: 'Функционал', type: 'functionality', icon: 'Layers', color: 'text-green-600' },
  ]);

  // Statuses, priorities
  localStoreService.setAll('statuses', DEFAULT_STATUSES);
  localStoreService.setAll('priorities', DEFAULT_PRIORITIES);

  // Notification prefs (один документ в массиве)
  localStoreService.setAll('notificationPrefs', [{ id: 'default', ...DEFAULT_NOTIFICATION_PREFS }]);
  localStoreService.setAll('automationRules', DEFAULT_AUTOMATION_RULES);

  // Departments
  localStoreService.setAll('departments', [
    { id: 'd1', name: 'Отдел продаж' },
    { id: 'd2', name: 'Маркетинг' },
    { id: 'd3', name: 'Разработка' },
  ]);

  // Projects
  localStoreService.setAll('projects', [
    { id: 'pr1', name: 'Сайт клиента А' },
    { id: 'pr2', name: 'Реклама в соцсетях' },
  ]);

  // Tasks (status/priority — названия из справочников)
  localStoreService.setAll('tasks', [
    { id: 'task1', tableId: 't1', title: 'Подготовить КП', entityType: 'task', status: 'В работе', priority: 'Средний', assigneeId: demoUserId, startDate: today(), endDate: today(), createdAt: now() },
    { id: 'task2', tableId: 't1', title: 'Созвон с клиентом', entityType: 'task', status: 'Не начато', priority: 'Высокий', assigneeId: 'u2', startDate: today(), endDate: today(), createdAt: now() },
    { id: 'task3', tableId: 't1', title: 'Обновить лендинг', entityType: 'task', status: 'Выполнено', priority: 'Средний', assigneeId: demoUserId, startDate: today(), endDate: today(), createdAt: now() },
  ]);

  // Sales funnels
  localStoreService.setAll('salesFunnels', [
    {
      id: 'f1',
      name: 'Продажи',
      stages: [
        { id: 'st1', label: 'Новая', color: 'bg-gray-200' },
        { id: 'st2', label: 'В работе', color: 'bg-blue-200' },
        { id: 'st3', label: 'Счёт', color: 'bg-amber-200' },
        { id: 'st4', label: 'Сделка', color: 'bg-green-200' },
      ],
    },
  ]);

  // Clients
  localStoreService.setAll('clients', [
    { id: 'c1', name: 'ООО Ромашка', contactPerson: 'Мария', email: 'maria@romashka.uz', phone: '+998901234567' },
    { id: 'c2', name: 'ИП Васильев', contactPerson: 'Алексей', phone: '+998909876543' },
  ]);

  // Deals (CRM: title, stage, assigneeId, funnelId)
  localStoreService.setAll('deals', [
    { id: 'deal1', title: 'Разработка сайта', clientId: 'c1', amount: 5000000, currency: 'UZS', stage: 'st2', funnelId: 'f1', assigneeId: demoUserId, createdAt: now() },
    { id: 'deal2', title: 'Реклама Instagram', clientId: 'c2', amount: 1200000, currency: 'UZS', stage: 'st1', funnelId: 'f1', assigneeId: 'u2', createdAt: now() },
  ]);

  // Employee infos
  localStoreService.setAll('employeeInfos', [
    { id: 'emp1', userId: demoUserId, position: 'Руководитель', hireDate: '2023-01-01' },
    { id: 'emp2', userId: 'u2', departmentId: 'd1', position: 'Менеджер', hireDate: '2023-06-01' },
  ]);

  // Accounts receivable (пусто или пара)
  localStoreService.setAll('accountsReceivable', []);

  // Docs, folders
  localStoreService.setAll('folders', [
    { id: 'fd1', tableId: 't1', name: 'Документы по проектам' },
  ]);
  localStoreService.setAll('docs', [
    { id: 'doc1', tableId: 't1', folderId: 'fd1', title: 'Договор шаблон', type: 'link', url: 'https://example.com', tags: ['договор'] },
  ]);

  // Meetings
  localStoreService.setAll('meetings', [
    { id: 'm1', tableId: 't1', title: 'Планерка', date: today(), time: '10:00', participantIds: [demoUserId, 'u2'], summary: 'Еженедельный созвон', type: 'work' },
  ]);

  // Content posts
  localStoreService.setAll('contentPosts', [
    { id: 'cp1', tableId: 't2', topic: 'Акция лето', description: 'Пост про скидки', date: today(), platform: ['instagram'], format: 'post', status: 'idea' },
  ]);

  // Activity
  localStoreService.setAll('activity', [
    { id: 'a1', userId: demoUserId, userName: 'Демо', userAvatar: '', action: 'task_created', details: 'Задача «Подготовить КП»', timestamp: now(), read: false },
  ]);

  // Finance
  localStoreService.setAll('financeCategories', DEFAULT_FINANCE_CATEGORIES);
  localStoreService.setAll('financePlan', [{ id: 'default', period: 'month', salesPlan: 50000000, currentIncome: 12000000 }]);
  localStoreService.setAll('purchaseRequests', [
    { id: 'prq1', requesterId: demoUserId, departmentId: 'd1', categoryId: 'fc5', amount: 500000, description: 'Подписка на сервис', status: 'pending', date: today() },
  ]);
  localStoreService.setAll('financialPlanDocuments', []);
  localStoreService.setAll('financialPlannings', []);

  // BPM
  localStoreService.setAll('orgPositions', [
    { id: 'pos1', name: 'Менеджер по продажам' },
    { id: 'pos2', name: 'Дизайнер' },
  ]);
  localStoreService.setAll('businessProcesses', [
    { id: 'bp1', name: 'Согласование договора', description: 'От менеджера до подписи', isArchived: false },
  ]);

  // Inventory: склады, номенклатура, движения
  localStoreService.setAll('warehouses', [
    { id: 'wh1', name: 'Основной склад', departmentId: 'd1' },
    { id: 'wh2', name: 'Склад маркетинга', departmentId: 'd2' },
  ]);
  localStoreService.setAll('inventoryItems', [
    { id: 'it1', sku: '001', name: 'Блокнот А4', unit: 'шт', category: 'Канцтовары' },
    { id: 'it2', sku: '002', name: 'Ручка синяя', unit: 'шт', category: 'Канцтовары' },
    { id: 'it3', sku: '003', name: 'Мерч (футболка)', unit: 'шт', category: 'Мерч' },
  ]);
  localStoreService.setAll('stockMovements', [
    { id: 'mv1', type: 'receipt', date: now(), toWarehouseId: 'wh1', items: [{ itemId: 'it1', quantity: 50 }, { itemId: 'it2', quantity: 100 }], reason: 'Оприходование', createdByUserId: demoUserId },
    { id: 'mv2', type: 'receipt', date: now(), toWarehouseId: 'wh1', items: [{ itemId: 'it3', quantity: 20 }], reason: 'Поступление мерча', createdByUserId: demoUserId },
  ]);
  localStoreService.setAll('inventoryRevisions', []);

  localStorage.setItem(SEED_FLAG, '1');
}
