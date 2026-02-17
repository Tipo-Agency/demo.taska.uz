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
  const baseTasks = [
    { id: 'task1', tableId: 't1', title: 'Подготовить КП', entityType: 'task', status: 'В работе', priority: 'Средний', assigneeId: demoUserId, startDate: today(), endDate: today(), createdAt: now() },
    { id: 'task2', tableId: 't1', title: 'Созвон с клиентом', entityType: 'task', status: 'Не начато', priority: 'Высокий', assigneeId: 'u2', startDate: today(), endDate: today(), createdAt: now() },
    { id: 'task3', tableId: 't1', title: 'Обновить лендинг', entityType: 'task', status: 'Выполнено', priority: 'Средний', assigneeId: demoUserId, startDate: today(), endDate: today(), createdAt: now() },
  ];
  const extraTasks = Array.from({ length: 20 }).map((_, i) => ({
    id: `task_extra_${i + 1}`,
    tableId: 't1',
    title: `Демо задача ${i + 1}`,
    entityType: 'task',
    status: i % 3 === 0 ? 'Не начато' : i % 3 === 1 ? 'В работе' : 'Выполнено',
    priority: i % 3 === 0 ? 'Низкий' : i % 3 === 1 ? 'Средний' : 'Высокий',
    assigneeId: i % 2 === 0 ? demoUserId : 'u2',
    startDate: today(),
    endDate: today(),
    createdAt: now(),
  }));
  localStoreService.setAll('tasks', [...baseTasks, ...extraTasks]);

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
  const baseDeals = [
    { id: 'deal1', title: 'Разработка сайта', clientId: 'c1', amount: 5000000, currency: 'UZS', stage: 'st2', funnelId: 'f1', assigneeId: demoUserId, createdAt: now() },
    { id: 'deal2', title: 'Реклама Instagram', clientId: 'c2', amount: 1200000, currency: 'UZS', stage: 'st1', funnelId: 'f1', assigneeId: 'u2', createdAt: now() },
  ];
  const extraDeals = Array.from({ length: 10 }).map((_, i) => ({
    id: `deal_extra_${i + 1}`,
    title: `Демо сделка ${i + 1}`,
    clientId: i % 2 === 0 ? 'c1' : 'c2',
    amount: 1000000 + i * 150000,
    currency: 'UZS',
    stage: i % 4 === 0 ? 'st1' : i % 4 === 1 ? 'st2' : i % 4 === 2 ? 'st3' : 'st4',
    funnelId: 'f1',
    assigneeId: i % 2 === 0 ? demoUserId : 'u2',
    createdAt: now(),
  }));
  localStoreService.setAll('deals', [...baseDeals, ...extraDeals]);

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
  const baseMeetings = [
    { id: 'm1', tableId: 't1', title: 'Планерка', date: today(), time: '10:00', participantIds: [demoUserId, 'u2'], summary: 'Еженедельный созвон', type: 'work' },
  ];
  const extraMeetings = Array.from({ length: 5 }).map((_, i) => ({
    id: `m_extra_${i + 1}`,
    tableId: 't1',
    title: `Встреча с клиентом ${i + 1}`,
    date: today(),
    time: `1${i}:00`,
    participantIds: [demoUserId],
    summary: 'Демо встреча',
    type: 'client' as const,
  }));
  localStoreService.setAll('meetings', [...baseMeetings, ...extraMeetings]);

  // Content posts
  const basePosts = [
    { id: 'cp1', tableId: 't2', topic: 'Акция лето', description: 'Пост про скидки', date: today(), platform: ['instagram'], format: 'post', status: 'idea' },
  ];
  const extraPosts = Array.from({ length: 10 }).map((_, i) => ({
    id: `cp_extra_${i + 1}`,
    tableId: 't2',
    topic: `Пост ${i + 1}`,
    description: 'Демо контент',
    date: today(),
    platform: ['instagram'],
    format: 'post' as const,
    status: 'idea' as const,
  }));
  localStoreService.setAll('contentPosts', [...basePosts, ...extraPosts]);

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
    { id: 'wh3', name: 'Склад мерча', departmentId: 'd2' },
  ]);
  const baseItems = [
    { id: 'it1', sku: '001', name: 'Блокнот А4', unit: 'шт', category: 'Канцтовары' },
    { id: 'it2', sku: '002', name: 'Ручка синяя', unit: 'шт', category: 'Канцтовары' },
    { id: 'it3', sku: '003', name: 'Мерч (футболка)', unit: 'шт', category: 'Мерч' },
  ];
  const extraItems = Array.from({ length: 20 }).map((_, i) => ({
    id: `it_extra_${i + 1}`,
    sku: `${100 + i}`,
    name: `Товар ${i + 1}`,
    unit: 'шт',
    category: i % 2 === 0 ? 'Канцтовары' : 'Мерч',
  }));
  localStoreService.setAll('inventoryItems', [...baseItems, ...extraItems]);

  const baseMovements = [
    { id: 'mv1', type: 'receipt', date: now(), toWarehouseId: 'wh1', items: [{ itemId: 'it1', quantity: 50 }, { itemId: 'it2', quantity: 100 }], reason: 'Оприходование', createdByUserId: demoUserId },
    { id: 'mv2', type: 'receipt', date: now(), toWarehouseId: 'wh1', items: [{ itemId: 'it3', quantity: 20 }], reason: 'Поступление мерча', createdByUserId: demoUserId },
  ];
  const extraMovements = Array.from({ length: 15 }).map((_, i) => ({
    id: `mv_extra_${i + 1}`,
    type: i % 3 === 0 ? 'transfer' : i % 3 === 1 ? 'writeoff' : 'receipt',
    date: now(),
    fromWarehouseId: i % 3 === 0 || i % 3 === 1 ? 'wh1' : undefined,
    toWarehouseId: i % 3 === 0 || i % 3 === 2 ? (i % 2 === 0 ? 'wh2' : 'wh3') : undefined,
    items: [{ itemId: i % 2 === 0 ? 'it1' : 'it2', quantity: 5 + i }],
    reason: 'Демо операция',
    createdByUserId: demoUserId,
  }));
  localStoreService.setAll('stockMovements', [...baseMovements, ...extraMovements]);
  localStoreService.setAll('inventoryRevisions', []);

  localStorage.setItem(SEED_FLAG, '1');
}
