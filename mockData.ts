import { User, Task, Deal, Client, Contract, EmployeeInfo, ContentPost, Meeting, Doc, Folder, ActivityLog, Project, TableCollection, Role, FinancePlan, PurchaseRequest, Warehouse, InventoryItem, StockMovement, BusinessProcess, OrgPosition, Department } from './types';
import { MOCK_TABLES, MOCK_DEPARTMENTS, MOCK_ORG_POSITIONS } from './constants';

// Мок-данные для демо-стенда

export const MOCK_DEMO_USERS: User[] = [
  {
    id: 'u1',
    name: 'Александр Иванов',
    role: Role.ADMIN,
    email: 'admin@company.com',
    login: 'admin',
    password: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Александр+Иванов&background=2C7E20&color=fff',
    phone: '+998901234567',
    telegram: '@admin'
  },
  {
    id: 'u2',
    name: 'Мария Петрова',
    role: Role.EMPLOYEE,
    email: 'maria@company.com',
    login: 'maria',
    password: '123456',
    avatar: 'https://ui-avatars.com/api/?name=Мария+Петрова&background=6366f1&color=fff',
    phone: '+998901234568',
    telegram: '@maria'
  },
  {
    id: 'u3',
    name: 'Дмитрий Сидоров',
    role: Role.EMPLOYEE,
    email: 'dmitry@company.com',
    login: 'dmitry',
    password: '123456',
    avatar: 'https://ui-avatars.com/api/?name=Дмитрий+Сидоров&background=10b981&color=fff',
    phone: '+998901234569',
    telegram: '@dmitry'
  },
  {
    id: 'u4',
    name: 'Анна Козлова',
    role: Role.EMPLOYEE,
    email: 'anna@company.com',
    login: 'anna',
    password: '123456',
    avatar: 'https://ui-avatars.com/api/?name=Анна+Козлова&background=ec4899&color=fff',
    phone: '+998901234570',
    telegram: '@anna'
  },
  {
    id: 'u5',
    name: 'Сергей Волков',
    role: Role.EMPLOYEE,
    email: 'sergey@company.com',
    login: 'sergey',
    password: '123456',
    avatar: 'https://ui-avatars.com/api/?name=Сергей+Волков&background=8b5cf6&color=fff',
    phone: '+998901234571',
    telegram: '@sergey'
  },
  {
    id: 'u6',
    name: 'Елена Смирнова',
    role: Role.EMPLOYEE,
    email: 'elena@company.com',
    login: 'elena',
    password: '123456',
    avatar: 'https://ui-avatars.com/api/?name=Елена+Смирнова&background=f59e0b&color=fff',
    phone: '+998901234572',
    telegram: '@elena'
  },
  {
    id: 'u7',
    name: 'Иван Кузнецов',
    role: Role.EMPLOYEE,
    email: 'ivan@company.com',
    login: 'ivan',
    password: '123456',
    avatar: 'https://ui-avatars.com/api/?name=Иван+Кузнецов&background=ef4444&color=fff',
    phone: '+998901234573',
    telegram: '@ivan'
  },
  {
    id: 'u8',
    name: 'Ольга Новикова',
    role: Role.EMPLOYEE,
    email: 'olga@company.com',
    login: 'olga',
    password: '123456',
    avatar: 'https://ui-avatars.com/api/?name=Ольга+Новикова&background=06b6d4&color=fff',
    phone: '+998901234574',
    telegram: '@olga'
  }
];

export const MOCK_DEMO_TASKS: Task[] = [
  {
    id: 'task-1',
    tableId: 't2',
    title: 'Разработать новый лендинг для продукта',
    status: 'В работе',
    priority: 'Высокий',
    assigneeId: 'u2',
    projectId: 'p2',
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Создать современный лендинг с адаптивным дизайном и интеграцией с CRM'
  },
  {
    id: 'task-2',
    tableId: 't2',
    title: 'Подготовить контент-план на март',
    status: 'На проверке',
    priority: 'Средний',
    assigneeId: 'u3',
    projectId: 'p3',
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Составить план публикаций для Instagram и других соцсетей'
  },
  {
    id: 'task-3',
    tableId: 't2',
    title: 'Провести встречу с клиентом',
    status: 'Выполнено',
    priority: 'Высокий',
    assigneeId: 'u1',
    projectId: 'p1',
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Обсудить детали проекта и подписать договор'
  },
  {
    id: 'task-4',
    tableId: 't2',
    title: 'Настроить аналитику в CRM',
    status: 'Не начато',
    priority: 'Средний',
    assigneeId: 'u4',
    projectId: 'p2',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Интегрировать Google Analytics и настроить отслеживание конверсий'
  },
  {
    id: 'task-5',
    tableId: 't2',
    title: 'Обновить дизайн мобильного приложения',
    status: 'В работе',
    priority: 'Высокий',
    assigneeId: 'u2',
    projectId: 'p2',
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Переработать UI/UX согласно новым гайдлайнам'
  },
  // Дополнительные задачи
  {
    id: 'task-6',
    tableId: 't2',
    title: 'Оптимизировать производительность сайта',
    status: 'В работе',
    priority: 'Средний',
    assigneeId: 'u2',
    projectId: 'p2',
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Улучшить скорость загрузки и оптимизировать изображения'
  },
  {
    id: 'task-7',
    tableId: 't2',
    title: 'Создать презентацию для инвесторов',
    status: 'Не начато',
    priority: 'Высокий',
    assigneeId: 'u1',
    projectId: 'p3',
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Подготовить презентацию с финансовыми показателями и планами развития'
  },
  {
    id: 'task-8',
    tableId: 't2',
    title: 'Провести A/B тестирование лендинга',
    status: 'На проверке',
    priority: 'Средний',
    assigneeId: 'u3',
    projectId: 'p2',
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Протестировать разные варианты заголовков и CTA-кнопок'
  },
  // Задачи для бэклога
  {
    id: 'backlog-1',
    tableId: 't7',
    title: 'Интеграция с платежными системами',
    status: 'Не начато',
    priority: 'Высокий',
    assigneeId: null,
    projectId: 'p2',
    startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Добавить поддержку Payme, Click, Uzcard'
  },
  {
    id: 'backlog-2',
    tableId: 't7',
    title: 'Мобильное приложение для iOS',
    status: 'Не начато',
    priority: 'Средний',
    assigneeId: null,
    projectId: 'p2',
    startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Разработка нативного iOS приложения'
  },
  {
    id: 'backlog-3',
    tableId: 't7',
    title: 'Система аналитики и отчетности',
    status: 'Не начато',
    priority: 'Высокий',
    assigneeId: null,
    projectId: 'p2',
    startDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Дашборды с метриками и автоматические отчеты'
  },
  {
    id: 'backlog-4',
    tableId: 't7',
    title: 'Многоязычная поддержка',
    status: 'Не начато',
    priority: 'Средний',
    assigneeId: null,
    projectId: 'p2',
    startDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Добавить поддержку узбекского, русского и английского языков'
  },
  // Задачи для функционала
  {
    id: 'feature-1',
    tableId: 't8',
    title: 'Темная тема интерфейса',
    status: 'Выполнено',
    priority: 'Средний',
    assigneeId: 'u2',
    projectId: 'p2',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Реализована поддержка темной темы для всех компонентов'
  },
  {
    id: 'feature-2',
    tableId: 't8',
    title: 'Экспорт данных в Excel',
    status: 'В работе',
    priority: 'Высокий',
    assigneeId: 'u2',
    projectId: 'p2',
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Возможность экспортировать таблицы и отчеты в Excel'
  },
  {
    id: 'feature-3',
    tableId: 't8',
    title: 'Уведомления в реальном времени',
    status: 'На проверке',
    priority: 'Высокий',
    assigneeId: 'u4',
    projectId: 'p2',
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'WebSocket интеграция для мгновенных уведомлений'
  },
  {
    id: 'feature-4',
    tableId: 't8',
    title: 'Интеграция с Telegram ботом',
    status: 'Выполнено',
    priority: 'Средний',
    assigneeId: 'u3',
    projectId: 'p1',
    startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Бот для уведомлений и управления задачами через Telegram'
  },
  {
    id: 'feature-5',
    tableId: 't8',
    title: 'Календарь событий',
    status: 'Не начато',
    priority: 'Средний',
    assigneeId: 'u4',
    projectId: 'p2',
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Визуальный календарь с задачами и встречами'
  },
  // Задачи для бизнес-процессов
  {
    id: 'process-task-1',
    tableId: 't2',
    title: 'Подготовка договора для ООО "ТехноСервис"',
    status: 'Выполнено',
    priority: 'Высокий',
    assigneeId: 'u1',
    projectId: 'p2',
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Подготовить проект договора на разработку сайта',
    processId: 'bp-1',
    processInstanceId: 'instance-1',
    stepId: 'step-1'
  },
  {
    id: 'process-task-2',
    tableId: 't2',
    title: 'Согласование договора с ООО "ТехноСервис"',
    status: 'В работе',
    priority: 'Высокий',
    assigneeId: 'u4',
    projectId: 'p2',
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Согласовать условия договора с клиентом',
    processId: 'bp-1',
    processInstanceId: 'instance-1',
    stepId: 'step-2'
  },
  {
    id: 'process-task-3',
    tableId: 't2',
    title: 'Подготовка договора для ИП "СмартРешения"',
    status: 'Выполнено',
    priority: 'Высокий',
    assigneeId: 'u1',
    projectId: 'p2',
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Подготовить проект договора',
    processId: 'bp-1',
    processInstanceId: 'instance-2',
    stepId: 'step-1'
  },
  {
    id: 'process-task-4',
    tableId: 't2',
    title: 'Согласование договора с ИП "СмартРешения"',
    status: 'Выполнено',
    priority: 'Высокий',
    assigneeId: 'u4',
    projectId: 'p2',
    startDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Согласовать условия договора',
    processId: 'bp-1',
    processInstanceId: 'instance-2',
    stepId: 'step-2'
  },
  {
    id: 'process-task-5',
    tableId: 't2',
    title: 'Подписание договора с ИП "СмартРешения"',
    status: 'Выполнено',
    priority: 'Высокий',
    assigneeId: 'u1',
    projectId: 'p2',
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Подписать договор обеими сторонами',
    processId: 'bp-1',
    processInstanceId: 'instance-2',
    stepId: 'step-3'
  },
  {
    id: 'process-task-6',
    tableId: 't2',
    title: 'Создание аккаунта для ООО "Торговый Дом"',
    status: 'Выполнено',
    priority: 'Средний',
    assigneeId: 'u2',
    projectId: 'p2',
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Создать учетную запись и настроить базовые параметры',
    processId: 'bp-2',
    processInstanceId: 'instance-onboard-1',
    stepId: 'step-onboard-1'
  },
  {
    id: 'process-task-7',
    tableId: 't2',
    title: 'Настройка системы для ООО "Торговый Дом"',
    status: 'В работе',
    priority: 'Средний',
    assigneeId: 'u2',
    projectId: 'p2',
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Настроить модули и интеграции под требования клиента',
    processId: 'bp-2',
    processInstanceId: 'instance-onboard-1',
    stepId: 'step-onboard-2'
  },
  {
    id: 'process-task-8',
    tableId: 't2',
    title: 'ТЗ: Интеграция с платежными системами',
    status: 'Выполнено',
    priority: 'Высокий',
    assigneeId: 'u1',
    projectId: 'p2',
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Подготовить детальное техническое задание',
    processId: 'bp-3',
    processInstanceId: 'instance-dev-1',
    stepId: 'step-dev-1'
  },
  {
    id: 'process-task-9',
    tableId: 't2',
    title: 'Дизайн: Интерфейс платежных систем',
    status: 'Выполнено',
    priority: 'Высокий',
    assigneeId: 'u2',
    projectId: 'p2',
    startDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Создать макеты и прототипы интерфейса',
    processId: 'bp-3',
    processInstanceId: 'instance-dev-1',
    stepId: 'step-dev-2'
  },
  {
    id: 'process-task-10',
    tableId: 't2',
    title: 'Разработка: Интеграция с Payme и Click',
    status: 'В работе',
    priority: 'Высокий',
    assigneeId: 'u2',
    projectId: 'p2',
    startDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Программирование интеграции с платежными системами',
    processId: 'bp-3',
    processInstanceId: 'instance-dev-1',
    stepId: 'step-dev-3'
  },
  {
    id: 'process-task-11',
    tableId: 't2',
    title: 'ТЗ: Экспорт данных в Excel',
    status: 'Выполнено',
    priority: 'Средний',
    assigneeId: 'u1',
    projectId: 'p2',
    startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Подготовить техническое задание',
    processId: 'bp-3',
    processInstanceId: 'instance-dev-2',
    stepId: 'step-dev-1'
  },
  {
    id: 'process-task-12',
    tableId: 't2',
    title: 'Дизайн: Интерфейс экспорта',
    status: 'Выполнено',
    priority: 'Средний',
    assigneeId: 'u2',
    projectId: 'p2',
    startDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Создать макеты интерфейса экспорта',
    processId: 'bp-3',
    processInstanceId: 'instance-dev-2',
    stepId: 'step-dev-2'
  },
  {
    id: 'process-task-13',
    tableId: 't2',
    title: 'Разработка: Функция экспорта в Excel',
    status: 'Выполнено',
    priority: 'Средний',
    assigneeId: 'u2',
    projectId: 'p2',
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Программирование функции экспорта',
    processId: 'bp-3',
    processInstanceId: 'instance-dev-2',
    stepId: 'step-dev-3'
  },
  {
    id: 'process-task-14',
    tableId: 't2',
    title: 'Тестирование: Экспорт в Excel',
    status: 'В работе',
    priority: 'Средний',
    assigneeId: 'u4',
    projectId: 'p2',
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Провести тестирование и исправить ошибки',
    processId: 'bp-3',
    processInstanceId: 'instance-dev-2',
    stepId: 'step-dev-4'
  },
  {
    id: 'process-task-15',
    tableId: 't2',
    title: 'Проверка заявки на закупку серверного оборудования',
    status: 'Выполнено',
    priority: 'Средний',
    assigneeId: 'u3',
    projectId: 'p2',
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Проверить обоснованность и корректность заявки',
    processId: 'bp-4',
    processInstanceId: 'instance-purchase-1',
    stepId: 'step-purchase-1'
  },
  // Задачи из сделок
  {
    id: 'deal-task-1',
    tableId: 't2',
    title: 'Подготовить техническое задание для ООО "ТехноСервис"',
    status: 'В работе',
    priority: 'Высокий',
    assigneeId: 'u1',
    projectId: 'p2',
    startDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Разработать детальное ТЗ для корпоративного сайта с учетом интеграции с 1С',
    dealId: 'deal-1'
  },
  {
    id: 'deal-task-2',
    tableId: 't2',
    title: 'Встреча с клиентом ООО "ТехноСервис" для обсуждения ТЗ',
    status: 'На проверке',
    priority: 'Высокий',
    assigneeId: 'u1',
    projectId: 'p2',
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Обсудить детали технического задания и согласовать требования',
    dealId: 'deal-1'
  },
  {
    id: 'deal-task-3',
    tableId: 't2',
    title: 'Подготовить коммерческое предложение для SMM-продвижения',
    status: 'Выполнено',
    priority: 'Средний',
    assigneeId: 'u3',
    projectId: 'p1',
    startDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Подготовить коммерческий план для продвижения в Instagram',
    dealId: 'deal-2'
  },
  {
    id: 'deal-task-4',
    tableId: 't2',
    title: 'Отправить коммерческое предложение клиенту ООО "ДизайнСтудия"',
    status: 'В работе',
    priority: 'Средний',
    assigneeId: 'u3',
    projectId: 'p1',
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Отправить КП и договориться о встрече для презентации',
    dealId: 'deal-2'
  },
  {
    id: 'deal-task-5',
    tableId: 't2',
    title: 'Квалифицировать лид: Разработка мобильного приложения',
    status: 'В работе',
    priority: 'Высокий',
    assigneeId: 'u1',
    projectId: 'p2',
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Уточнить требования, бюджет и сроки для мобильного приложения',
    dealId: 'deal-3'
  },
  {
    id: 'deal-task-6',
    tableId: 't2',
    title: 'Подготовить презентацию для ИП "СмартРешения"',
    status: 'Не начато',
    priority: 'Высокий',
    assigneeId: 'u1',
    projectId: 'p2',
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Создать презентацию с примерами работ и техническими решениями',
    dealId: 'deal-3'
  },
  {
    id: 'deal-task-7',
    tableId: 't2',
    title: 'Разработать контент-план на квартал для ООО "ДизайнСтудия"',
    status: 'Выполнено',
    priority: 'Средний',
    assigneeId: 'u3',
    projectId: 'p3',
    startDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Подготовить детальный контент-план с темами, форматами и датами публикаций',
    dealId: 'deal-4'
  },
  {
    id: 'deal-task-8',
    tableId: 't2',
    title: 'Согласовать контент-план с клиентом',
    status: 'Выполнено',
    priority: 'Средний',
    assigneeId: 'u3',
    projectId: 'p3',
    startDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Согласовать финальную версию контент-плана и получить одобрение',
    dealId: 'deal-4'
  },
  {
    id: 'deal-task-9',
    tableId: 't2',
    title: 'Провести анализ текущего дизайна интернет-магазина',
    status: 'В работе',
    priority: 'Высокий',
    assigneeId: 'u4',
    projectId: 'p2',
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Проанализировать текущий дизайн и подготовить рекомендации по улучшению',
    dealId: 'deal-5'
  },
  {
    id: 'deal-task-10',
    tableId: 't2',
    title: 'Уточнить требования к редизайну у клиента',
    status: 'Не начато',
    priority: 'Высокий',
    assigneeId: 'u4',
    projectId: 'p2',
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Провести встречу с клиентом для уточнения требований к дизайну',
    dealId: 'deal-5'
  },
  {
    id: 'deal-task-11',
    tableId: 't2',
    title: 'Настроить рекламные кампании в Google Ads',
    status: 'В работе',
    priority: 'Средний',
    assigneeId: 'u3',
    projectId: 'p3',
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Создать и настроить рекламные кампании для клиента ИП "СмартРешения"',
    dealId: 'deal-6'
  },
  {
    id: 'deal-task-12',
    tableId: 't2',
    title: 'Подготовить отчет по эффективности рекламы',
    status: 'Не начато',
    priority: 'Низкий',
    assigneeId: 'u3',
    projectId: 'p3',
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Подготовить еженедельный отчет по показателям рекламных кампаний',
    dealId: 'deal-6'
  },
  {
    id: 'deal-task-13',
    tableId: 't2',
    title: 'Провести техническое интервью для CRM системы',
    status: 'В работе',
    priority: 'Высокий',
    assigneeId: 'u1',
    projectId: 'p2',
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Провести интервью с клиентом для выяснения требований к CRM системе',
    dealId: 'deal-7'
  },
  {
    id: 'deal-task-14',
    tableId: 't2',
    title: 'Подготовить архитектуру CRM системы',
    status: 'Не начато',
    priority: 'Высокий',
    assigneeId: 'u2',
    projectId: 'p2',
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Разработать техническую архитектуру и схему базы данных',
    dealId: 'deal-7'
  },
  {
    id: 'deal-task-15',
    tableId: 't2',
    title: 'Подготовить коммерческое предложение для разработки лендинга',
    status: 'Выполнено',
    priority: 'Средний',
    assigneeId: 'u4',
    projectId: 'p2',
    startDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Подготовить КП с описанием работ и стоимостью',
    dealId: 'deal-8'
  },
  {
    id: 'deal-task-16',
    tableId: 't2',
    title: 'Согласовать дизайн-макеты лендинга с клиентом',
    status: 'В работе',
    priority: 'Средний',
    assigneeId: 'u4',
    projectId: 'p2',
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: 'Согласовать дизайн-макеты и получить фидбек от клиента',
    dealId: 'deal-8'
  }
];

export const MOCK_DEMO_CLIENTS: Client[] = [
  {
    id: 'c1',
    name: 'ООО "ТехноСервис"',
    contactPerson: 'Иван Петров',
    phone: '+998901111111',
    email: 'ivan@technoservice.uz',
    notes: 'Крупный клиент, постоянное сотрудничество'
  },
  {
    id: 'c2',
    name: 'ИП "СмартРешения"',
    contactPerson: 'Елена Смирнова',
    phone: '+998902222222',
    email: 'elena@smart.uz',
    notes: 'Новый клиент, заинтересован в разработке сайта'
  },
  {
    id: 'c3',
    name: 'ООО "ДизайнСтудия"',
    contactPerson: 'Алексей Волков',
    phone: '+998903333333',
    email: 'alex@design.uz',
    notes: 'Регулярные заказы на контент'
  },
  {
    id: 'c4',
    name: 'ООО "Торговый Дом"',
    contactPerson: 'Сергей Кузнецов',
    phone: '+998904444444',
    email: 'sergey@trade.uz',
    notes: 'Интернет-магазин, требуется поддержка'
  },
  {
    id: 'c5',
    name: 'ИП "МедиаГрупп"',
    contactPerson: 'Ольга Новикова',
    phone: '+998905555555',
    email: 'olga@media.uz',
    notes: 'SMM и контент-маркетинг'
  },
  {
    id: 'c6',
    name: 'ООО "СтройКомплекс"',
    contactPerson: 'Дмитрий Морозов',
    phone: '+998906666666',
    email: 'dmitry@build.uz',
    notes: 'Корпоративный сайт и реклама'
  }
];

export const MOCK_DEMO_DEALS: Deal[] = [
  {
    id: 'deal-1',
    title: 'Разработка корпоративного сайта',
    clientId: 'c1',
    contactName: 'Иван Петров',
    amount: 5000000,
    currency: 'UZS',
    stage: 'negotiation',
    source: 'site',
    assigneeId: 'u1',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Обсуждаем детали технического задания',
    projectId: 'p2',
    comments: [
      {
        id: 'cm-1',
        text: 'Клиент заинтересован в интеграции с 1С',
        authorId: 'u1',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'internal'
      }
    ]
  },
  {
    id: 'deal-2',
    title: 'SMM-продвижение в Instagram',
    clientId: 'c3',
    contactName: 'Алексей Волков',
    amount: 2000000,
    currency: 'UZS',
    stage: 'proposal',
    source: 'instagram',
    assigneeId: 'u3',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Подготовлен коммерческий план',
    projectId: 'p1'
  },
  {
    id: 'deal-3',
    title: 'Разработка мобильного приложения',
    clientId: 'c2',
    contactName: 'Елена Смирнова',
    amount: 15000000,
    currency: 'UZS',
    stage: 'new',
    source: 'site',
    assigneeId: 'u1',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Требуется квалификация',
    projectId: 'p2'
  },
  {
    id: 'deal-4',
    title: 'Контент-план на квартал',
    clientId: 'c3',
    contactName: 'Алексей Волков',
    amount: 3000000,
    currency: 'UZS',
    stage: 'won',
    source: 'recommendation',
    assigneeId: 'u3',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Сделка закрыта успешно',
    projectId: 'p3'
  },
  {
    id: 'deal-5',
    title: 'Редизайн интернет-магазина',
    clientId: 'c1',
    contactName: 'Иван Петров',
    amount: 8000000,
    currency: 'UZS',
    stage: 'qualification',
    source: 'site',
    assigneeId: 'u4',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Нужно уточнить требования к дизайну',
    projectId: 'p2'
  },
  {
    id: 'deal-6',
    title: 'Настройка рекламы в Google Ads',
    clientId: 'c2',
    contactName: 'Елена Смирнова',
    amount: 1500000,
    currency: 'UZS',
    stage: 'proposal',
    source: 'telegram',
    assigneeId: 'u3',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Клиент хочет запустить рекламу на следующей неделе',
    projectId: 'p3'
  },
  {
    id: 'deal-7',
    title: 'Разработка CRM системы',
    clientId: 'c1',
    contactName: 'Иван Петров',
    amount: 20000000,
    currency: 'UZS',
    stage: 'negotiation',
    source: 'recommendation',
    assigneeId: 'u1',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Крупный проект, требуется детальное ТЗ',
    projectId: 'p2'
  },
  {
    id: 'deal-8',
    title: 'Ведение соцсетей на месяц',
    clientId: 'c3',
    contactName: 'Алексей Волков',
    amount: 1200000,
    currency: 'UZS',
    stage: 'won',
    source: 'instagram',
    assigneeId: 'u3',
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Ежемесячное обслуживание',
    projectId: 'p1'
  }
];

export const MOCK_DEMO_CONTRACTS: Contract[] = [
  {
    id: 'contract-1',
    clientId: 'c1',
    number: 'ДГ-2024-001',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: 5000000,
    currency: 'UZS',
    status: 'active',
    paymentDay: 15,
    services: 'Разработка и поддержка сайта'
  },
  {
    id: 'contract-2',
    clientId: 'c3',
    number: 'ДГ-2024-002',
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 350 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: 3000000,
    currency: 'UZS',
    status: 'active',
    paymentDay: 1,
    services: 'SMM-продвижение'
  }
];

export const MOCK_DEMO_EMPLOYEE_INFOS: EmployeeInfo[] = [
  {
    id: 'emp-1',
    userId: 'u1',
    departmentId: undefined,
    position: 'Генеральный директор',
    salary: '20000000',
    hireDate: new Date(Date.now() - 1095 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    birthDate: '1985-01-15',
    conditions: 'Полная занятость, офис'
  },
  {
    id: 'emp-2',
    userId: 'u2',
    departmentId: 'dep3',
    position: 'Frontend разработчик',
    salary: '8000000',
    hireDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    birthDate: '1995-05-15',
    conditions: 'Полная занятость, удаленная работа'
  },
  {
    id: 'emp-3',
    userId: 'u3',
    departmentId: 'dep1',
    position: 'SMM-менеджер',
    salary: '6000000',
    hireDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    birthDate: '1992-08-20',
    conditions: 'Полная занятость, офис'
  },
  {
    id: 'emp-4',
    userId: 'u4',
    departmentId: 'dep2',
    position: 'Менеджер по продажам',
    salary: '7000000',
    hireDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    birthDate: '1990-03-10',
    conditions: 'Полная занятость, офис + выезды'
  },
  {
    id: 'emp-5',
    userId: 'u5',
    departmentId: 'dep3',
    position: 'Backend разработчик',
    salary: '9000000',
    hireDate: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    birthDate: '1993-07-22',
    conditions: 'Полная занятость, удаленная работа'
  },
  {
    id: 'emp-6',
    userId: 'u6',
    departmentId: 'dep1',
    position: 'Контент-менеджер',
    salary: '5500000',
    hireDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    birthDate: '1994-11-05',
    conditions: 'Полная занятость, офис'
  },
  {
    id: 'emp-7',
    userId: 'u7',
    departmentId: 'dep2',
    position: 'Старший менеджер по продажам',
    salary: '8500000',
    hireDate: new Date(Date.now() - 450 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    birthDate: '1988-09-18',
    conditions: 'Полная занятость, офис + выезды'
  },
  {
    id: 'emp-8',
    userId: 'u8',
    departmentId: 'dep3',
    position: 'QA инженер',
    salary: '6500000',
    hireDate: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    birthDate: '1991-04-12',
    conditions: 'Полная занятость, удаленная работа'
  }
];

export const MOCK_DEMO_CONTENT_POSTS: ContentPost[] = [
  {
    id: 'post-1',
    tableId: 't6',
    topic: 'Новинки в дизайне интерфейсов 2024',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    platform: ['instagram'],
    format: 'post',
    status: 'scheduled',
    copy: 'Рассказываем о трендах в UI/UX дизайне этого года...'
  },
  {
    id: 'post-2',
    tableId: 't6',
    topic: 'Как выбрать правильный хостинг',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    platform: ['instagram'],
    format: 'reel',
    status: 'design',
    copy: 'Полезные советы для владельцев сайтов...'
  },
  {
    id: 'post-3',
    tableId: 't6',
    topic: 'Кейс: запуск интернет-магазина',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    platform: ['instagram'],
    format: 'post',
    status: 'copywriting',
    copy: 'История успеха нашего клиента...'
  },
  {
    id: 'post-4',
    tableId: 't6',
    topic: '5 способов увеличить конверсию сайта',
    date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    platform: ['instagram'],
    format: 'post',
    status: 'approval',
    copy: 'Практические советы по оптимизации конверсии...'
  },
  {
    id: 'post-5',
    tableId: 't6',
    topic: 'Мобильная версия сайта: зачем она нужна',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    platform: ['instagram'],
    format: 'reel',
    status: 'published',
    copy: 'Важность адаптивного дизайна в современном мире...'
  },
  {
    id: 'post-6',
    tableId: 't6',
    topic: 'SEO-оптимизация: с чего начать',
    date: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    platform: ['instagram'],
    format: 'post',
    status: 'idea',
    copy: 'Базовые принципы SEO для начинающих...'
  },
  {
    id: 'post-7',
    tableId: 't6',
    topic: 'Интеграция CRM: автоматизация продаж',
    date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    platform: ['instagram'],
    format: 'post',
    status: 'copywriting',
    copy: 'Как CRM помогает автоматизировать бизнес-процессы...'
  },
  {
    id: 'post-8',
    tableId: 't6',
    topic: 'Веб-аналитика: что смотреть',
    date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    platform: ['instagram'],
    format: 'reel',
    status: 'design',
    copy: 'Ключевые метрики для анализа эффективности сайта...'
  }
];

export const MOCK_DEMO_MEETINGS: Meeting[] = [
  {
    id: 'meeting-1',
    tableId: 't5',
    title: 'Планирование спринта',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '10:00',
    participantIds: ['u1', 'u2', 'u4'],
    summary: '',
    recurrence: 'weekly'
  },
  {
    id: 'meeting-2',
    tableId: 't5',
    title: 'Встреча с клиентом ООО "ТехноСервис"',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '14:00',
    participantIds: ['u1', 'u4'],
    summary: '',
    recurrence: 'none'
  },
  {
    id: 'meeting-3',
    tableId: 't5',
    title: 'Ретроспектива проекта',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '11:00',
    participantIds: ['u1', 'u2', 'u3', 'u4'],
    summary: '',
    recurrence: 'none'
  },
  {
    id: 'meeting-4',
    tableId: 't5',
    title: 'Презентация нового функционала',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '15:00',
    participantIds: ['u1', 'u2'],
    summary: '',
    recurrence: 'none'
  },
  {
    id: 'meeting-5',
    tableId: 't5',
    title: 'Ежедневный стендап',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '09:30',
    participantIds: ['u1', 'u2', 'u3', 'u4'],
    summary: '',
    recurrence: 'daily'
  }
];

export const MOCK_DEMO_DOCS: Doc[] = [
  {
    id: 'doc-1',
    tableId: 't4',
    title: 'Техническое задание на разработку сайта',
    type: 'internal',
    content: '# Техническое задание\n\n## Описание проекта\n\nРазработка корпоративного сайта для ООО "ТехноСервис"...',
    tags: ['ТЗ', 'Разработка', 'Сайт']
  },
  {
    id: 'doc-2',
    tableId: 't4',
    title: 'Политика конфиденциальности',
    type: 'link',
    url: 'https://example.com/privacy',
    tags: ['Юридические', 'Политика']
  },
  {
    id: 'doc-3',
    tableId: 't4',
    title: 'Гайдлайн по брендингу',
    type: 'internal',
    content: '# Гайдлайн по брендингу\n\n## Цветовая палитра\n\n- Основной: #2C7E20\n- Вторичный: #10b981...',
    tags: ['Дизайн', 'Брендинг']
  },
  {
    id: 'doc-4',
    tableId: 't4',
    title: 'Договор с ООО "ТехноСервис"',
    type: 'link',
    url: 'https://example.com/contract-1',
    tags: ['Договоры', 'Юридические']
  },
  {
    id: 'doc-5',
    tableId: 't4',
    title: 'Инструкция по работе с CRM',
    type: 'internal',
    content: '# Инструкция по работе с CRM\n\n## Основные функции\n\n1. Управление клиентами\n2. Отслеживание сделок...',
    tags: ['Инструкции', 'CRM']
  },
  {
    id: 'doc-6',
    tableId: 't4',
    title: 'Отчет за Q1 2024',
    type: 'internal',
    content: '# Отчет за первый квартал 2024\n\n## Финансовые показатели\n\n- Выручка: 50 млн сум\n- Прибыль: 15 млн сум...',
    tags: ['Отчеты', 'Финансы']
  },
  {
    id: 'doc-7',
    tableId: 't4',
    title: 'Презентация компании',
    type: 'link',
    url: 'https://example.com/presentation',
    tags: ['Презентации', 'Маркетинг']
  },
  {
    id: 'doc-8',
    tableId: 't4',
    title: 'Чек-лист запуска проекта',
    type: 'internal',
    content: '# Чек-лист запуска проекта\n\n- [ ] Техническое задание\n- [ ] Дизайн-макеты\n- [ ] Разработка...',
    tags: ['Чек-листы', 'Проекты']
  }
];

export const MOCK_DEMO_FOLDERS: Folder[] = [
  {
    id: 'folder-1',
    tableId: 't4',
    name: 'Проекты'
  },
  {
    id: 'folder-2',
    tableId: 't4',
    name: 'Документация'
  }
];

export const MOCK_DEMO_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'activity-1',
    userId: 'u1',
    userName: 'Александр Иванов',
    userAvatar: MOCK_DEMO_USERS[0].avatar || '',
    action: 'Создал задачу',
    details: 'Разработать новый лендинг для продукта',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: 'activity-2',
    userId: 'u2',
    userName: 'Мария Петрова',
    userAvatar: MOCK_DEMO_USERS[1].avatar || '',
    action: 'Изменил статус задачи',
    details: 'Обновить дизайн мобильного приложения → В работе',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: 'activity-3',
    userId: 'u3',
    userName: 'Дмитрий Сидоров',
    userAvatar: MOCK_DEMO_USERS[2].avatar || '',
    action: 'Создал сделку',
    details: 'SMM-продвижение в Instagram',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    read: true
  },
  {
    id: 'activity-4',
    userId: 'u1',
    userName: 'Александр Иванов',
    userAvatar: MOCK_DEMO_USERS[0].avatar || '',
    action: 'Закрыл сделку',
    details: 'Контент-план на квартал - Выиграно',
    timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    read: true
  },
  {
    id: 'activity-5',
    userId: 'u4',
    userName: 'Анна Козлова',
    userAvatar: MOCK_DEMO_USERS[3].avatar || '',
    action: 'Создал клиента',
    details: 'ООО "Торговый Дом"',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: 'activity-6',
    userId: 'u2',
    userName: 'Мария Петрова',
    userAvatar: MOCK_DEMO_USERS[1].avatar || '',
    action: 'Добавил комментарий',
    details: 'К задаче: Оптимизировать производительность сайта',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: 'activity-7',
    userId: 'u3',
    userName: 'Дмитрий Сидоров',
    userAvatar: MOCK_DEMO_USERS[2].avatar || '',
    action: 'Опубликовал пост',
    details: 'Мобильная версия сайта: зачем она нужна',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    read: true
  },
  {
    id: 'activity-8',
    userId: 'u1',
    userName: 'Александр Иванов',
    userAvatar: MOCK_DEMO_USERS[0].avatar || '',
    action: 'Создал документ',
    details: 'Отчет за Q1 2024',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    read: true
  }
];

export const MOCK_DEMO_FINANCE_PLAN: FinancePlan = {
  id: 'current',
  period: 'month',
  salesPlan: 50000000,
  currentIncome: 35000000
};

export const MOCK_DEMO_PURCHASE_REQUESTS: PurchaseRequest[] = [
  {
    id: 'pr-1',
    requesterId: 'u2',
    departmentId: 'dep3',
    categoryId: 'fc5',
    amount: 500000,
    description: 'Подписка на Figma Pro на год',
    status: 'approved',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    decisionDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  {
    id: 'pr-2',
    requesterId: 'u3',
    departmentId: 'dep1',
    categoryId: 'fc3',
    amount: 2000000,
    description: 'Реклама в Instagram на месяц',
    status: 'pending',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  {
    id: 'pr-3',
    requesterId: 'u4',
    departmentId: 'dep2',
    categoryId: 'fc3',
    amount: 1500000,
    description: 'Контекстная реклама в Google на месяц',
    status: 'approved',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    decisionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  {
    id: 'pr-4',
    requesterId: 'u2',
    departmentId: 'dep3',
    categoryId: 'fc5',
    amount: 800000,
    description: 'Обновление серверного оборудования',
    status: 'pending',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  {
    id: 'pr-5',
    requesterId: 'u1',
    departmentId: 'dep1',
    categoryId: 'fc3',
    amount: 3000000,
    description: 'Маркетинговая кампания на квартал',
    status: 'deferred',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    decisionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }
];

export const MOCK_DEMO_WAREHOUSES: Warehouse[] = [
  {
    id: 'wh-1',
    name: 'Основной склад',
    location: 'Ташкент, ул. Примерная, 1',
    isDefault: true
  },
  {
    id: 'wh-2',
    name: 'Склад маркетинга',
    departmentId: 'dep1',
    location: 'Ташкент, офис'
  }
];

export const MOCK_DEMO_INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'item-1',
    sku: 'SUP-001',
    name: 'Сувенирная продукция (ручки)',
    unit: 'шт',
    category: 'Сувениры',
    notes: 'Для подарков клиентам'
  },
  {
    id: 'item-2',
    sku: 'OFF-001',
    name: 'Офисная бумага A4',
    unit: 'пачка',
    category: 'Канцелярия',
    notes: 'Для печати документов'
  },
  {
    id: 'item-3',
    sku: 'OFF-002',
    name: 'Блокноты с логотипом',
    unit: 'шт',
    category: 'Сувениры',
    notes: 'Для презентаций и подарков'
  },
  {
    id: 'item-4',
    sku: 'TEC-001',
    name: 'USB-флешки 32GB',
    unit: 'шт',
    category: 'Техника',
    notes: 'Для передачи файлов клиентам'
  },
  {
    id: 'item-5',
    sku: 'OFF-003',
    name: 'Папки для документов',
    unit: 'шт',
    category: 'Канцелярия',
    notes: 'Организация документооборота'
  },
  {
    id: 'item-6',
    sku: 'TEC-002',
    name: 'Веб-камеры для видеозвонков',
    unit: 'шт',
    category: 'Техника',
    notes: 'Оборудование для удаленной работы'
  }
];

export const MOCK_DEMO_STOCK_MOVEMENTS: StockMovement[] = [
  {
    id: 'movement-1',
    type: 'receipt',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    toWarehouseId: 'wh-1',
    items: [
      { itemId: 'item-1', quantity: 100, price: 5000 }
    ],
    reason: 'Закупка для подарков клиентам',
    createdByUserId: 'u1'
  },
  {
    id: 'movement-2',
    type: 'receipt',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    toWarehouseId: 'wh-1',
    items: [
      { itemId: 'item-2', quantity: 20, price: 15000 },
      { itemId: 'item-5', quantity: 50, price: 8000 }
    ],
    reason: 'Пополнение офисных принадлежностей',
    createdByUserId: 'u1'
  },
  {
    id: 'movement-3',
    type: 'transfer',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    fromWarehouseId: 'wh-1',
    toWarehouseId: 'wh-2',
    items: [
      { itemId: 'item-3', quantity: 30, price: 0 }
    ],
    reason: 'Передача в отдел маркетинга',
    createdByUserId: 'u1'
  },
  {
    id: 'movement-4',
    type: 'writeoff',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    fromWarehouseId: 'wh-1',
    items: [
      { itemId: 'item-1', quantity: 5, price: 0 }
    ],
    reason: 'Использовано на мероприятии',
    createdByUserId: 'u1'
  }
];

export const MOCK_DEMO_BUSINESS_PROCESSES: BusinessProcess[] = [
  {
    id: 'bp-1',
    title: 'Согласование договора',
    description: 'Процесс согласования и подписания договора с клиентом',
    steps: [
      {
        id: 'step-1',
        title: 'Подготовка договора',
        description: 'Юрист подготавливает проект договора',
        assigneeType: 'position',
        assigneeId: 'op1',
        order: 1
      },
      {
        id: 'step-2',
        title: 'Согласование с клиентом',
        description: 'Менеджер согласовывает условия с клиентом',
        assigneeType: 'position',
        assigneeId: 'op3',
        order: 2
      },
      {
        id: 'step-3',
        title: 'Подписание',
        description: 'Подписание договора обеими сторонами',
        assigneeType: 'user',
        assigneeId: 'u1',
        order: 3
      }
    ],
    instances: [
      {
        id: 'instance-1',
        processId: 'bp-1',
        currentStepId: 'step-2',
        status: 'active',
        startedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        taskIds: ['process-task-1', 'process-task-2']
      },
      {
        id: 'instance-2',
        processId: 'bp-1',
        currentStepId: null,
        status: 'completed',
        startedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        taskIds: ['process-task-3', 'process-task-4', 'process-task-5']
      }
    ]
  },
  {
    id: 'bp-2',
    title: 'Онбординг нового клиента',
    description: 'Процесс подключения и настройки системы для нового клиента',
    steps: [
      {
        id: 'step-onboard-1',
        title: 'Создание аккаунта',
        description: 'Создание учетной записи и настройка базовых параметров',
        assigneeType: 'user',
        assigneeId: 'u2',
        order: 1
      },
      {
        id: 'step-onboard-2',
        title: 'Настройка системы',
        description: 'Настройка модулей и интеграций под требования клиента',
        assigneeType: 'user',
        assigneeId: 'u2',
        order: 2
      },
      {
        id: 'step-onboard-3',
        title: 'Обучение клиента',
        description: 'Проведение обучения работе с системой',
        assigneeType: 'position',
        assigneeId: 'op3',
        order: 3
      },
      {
        id: 'step-onboard-4',
        title: 'Запуск в продакшн',
        description: 'Финальная проверка и запуск системы',
        assigneeType: 'user',
        assigneeId: 'u1',
        order: 4
      }
    ],
    instances: [
      {
        id: 'instance-onboard-1',
        processId: 'bp-2',
        currentStepId: 'step-onboard-2',
        status: 'active',
        startedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        taskIds: ['process-task-6', 'process-task-7']
      }
    ]
  },
  {
    id: 'bp-3',
    title: 'Разработка нового функционала',
    description: 'Процесс разработки и внедрения новой функции',
    steps: [
      {
        id: 'step-dev-1',
        title: 'Техническое задание',
        description: 'Подготовка детального ТЗ',
        assigneeType: 'position',
        assigneeId: 'op1',
        order: 1
      },
      {
        id: 'step-dev-2',
        title: 'Дизайн интерфейса',
        description: 'Создание макетов и прототипов',
        assigneeType: 'user',
        assigneeId: 'u2',
        order: 2
      },
      {
        id: 'step-dev-3',
        title: 'Разработка',
        description: 'Программирование функционала',
        assigneeType: 'user',
        assigneeId: 'u2',
        order: 3
      },
      {
        id: 'step-dev-4',
        title: 'Тестирование',
        description: 'Проведение тестирования и исправление ошибок',
        assigneeType: 'user',
        assigneeId: 'u4',
        order: 4
      },
      {
        id: 'step-dev-5',
        title: 'Внедрение',
        description: 'Деплой на продакшн и мониторинг',
        assigneeType: 'user',
        assigneeId: 'u1',
        order: 5
      }
    ],
    instances: [
      {
        id: 'instance-dev-1',
        processId: 'bp-3',
        currentStepId: 'step-dev-3',
        status: 'active',
        startedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        taskIds: ['process-task-8', 'process-task-9', 'process-task-10']
      },
      {
        id: 'instance-dev-2',
        processId: 'bp-3',
        currentStepId: 'step-dev-4',
        status: 'active',
        startedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        taskIds: ['process-task-11', 'process-task-12', 'process-task-13', 'process-task-14']
      }
    ]
  },
  {
    id: 'bp-4',
    title: 'Обработка заявки на закупку',
    description: 'Процесс согласования и утверждения заявки на закупку',
    steps: [
      {
        id: 'step-purchase-1',
        title: 'Проверка заявки',
        description: 'Проверка обоснованности и корректности заявки',
        assigneeType: 'position',
        assigneeId: 'op2',
        order: 1
      },
      {
        id: 'step-purchase-2',
        title: 'Согласование с директором',
        description: 'Согласование крупных закупок с руководством',
        assigneeType: 'position',
        assigneeId: 'op1',
        order: 2
      },
      {
        id: 'step-purchase-3',
        title: 'Оформление заказа',
        description: 'Оформление заказа у поставщика',
        assigneeType: 'user',
        assigneeId: 'u4',
        order: 3
      }
    ],
    instances: [
      {
        id: 'instance-purchase-1',
        processId: 'bp-4',
        currentStepId: 'step-purchase-2',
        status: 'active',
        startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        taskIds: ['process-task-15']
      }
    ]
  }
];

// Функция для инициализации всех мок-данных
export const initializeMockData = (forceReset: boolean = false) => {
  try {
    const isInitialized = localStorage.getItem('demo_initialized');
    const dataVersion = localStorage.getItem('demo_data_version');
    const CURRENT_VERSION = '2.3'; // Версия данных - увеличиваем при обновлении мок-данных
    
    // Если данные уже инициализированы и версия совпадает - пропускаем (если не принудительный сброс)
    if (!forceReset && isInitialized === 'true' && dataVersion === CURRENT_VERSION) {
      return; // Уже инициализировано с актуальной версией
    }
    
    // Если версия не совпадает или данные не инициализированы - перезаписываем
    if (forceReset) {
      console.log('Принудительная перезапись мок-данных для демо-стенда...');
    } else {
      console.log('Инициализация мок-данных для демо-стенда...');
    }

    // Вспомогательные функции для работы с localStorage
    const getLocal = <T>(key: string, defaultValue: T): T => {
      try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
      } catch (e) {
        console.warn(`Ошибка чтения ${key}:`, e);
        return defaultValue;
      }
    };

    const setLocal = (key: string, data: any) => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.error(`Ошибка записи ${key}:`, e);
      }
    };

  // Принудительно перезаписываем все мок-данные (для демо-стенда)
  setLocal('cfo_users', MOCK_DEMO_USERS);
  setLocal('cfo_tasks', MOCK_DEMO_TASKS);
  setLocal('cfo_deals', MOCK_DEMO_DEALS);
  setLocal('cfo_clients', MOCK_DEMO_CLIENTS);
  setLocal('cfo_contracts', MOCK_DEMO_CONTRACTS);
  setLocal('cfo_employee_infos', MOCK_DEMO_EMPLOYEE_INFOS);
  setLocal('cfo_content_posts', MOCK_DEMO_CONTENT_POSTS);
  setLocal('cfo_meetings', MOCK_DEMO_MEETINGS);
  setLocal('cfo_docs', MOCK_DEMO_DOCS);
  setLocal('cfo_folders', MOCK_DEMO_FOLDERS);
  setLocal('cfo_activity', MOCK_DEMO_ACTIVITY_LOGS);
  setLocal('cfo_finance_plan', MOCK_DEMO_FINANCE_PLAN);
  setLocal('cfo_purchase_requests', MOCK_DEMO_PURCHASE_REQUESTS);
  setLocal('cfo_warehouses', MOCK_DEMO_WAREHOUSES);
  setLocal('cfo_inventory_items', MOCK_DEMO_INVENTORY_ITEMS);
  setLocal('cfo_stock_movements', MOCK_DEMO_STOCK_MOVEMENTS);
  setLocal('cfo_business_processes', MOCK_DEMO_BUSINESS_PROCESSES);
  setLocal('cfo_tables', MOCK_TABLES);
  setLocal('cfo_departments', MOCK_DEPARTMENTS);
  setLocal('cfo_org_positions', MOCK_ORG_POSITIONS);

  localStorage.setItem('demo_initialized', 'true');
  localStorage.setItem('demo_data_version', CURRENT_VERSION);
  console.log('✅ Мок-данные успешно инициализированы');
  } catch (error) {
    console.error('Ошибка инициализации мок-данных:', error);
  }
};

// Функция для принудительной очистки и перезаписи данных (для отладки)
export const resetMockData = () => {
  console.log('Очистка всех данных и перезапись мок-данных...');
  localStorage.removeItem('demo_initialized');
  localStorage.removeItem('demo_data_version');
  
  // Очищаем все ключи с данными
  const keysToRemove = [
    'cfo_users', 'cfo_tasks', 'cfo_deals', 'cfo_clients', 'cfo_contracts',
    'cfo_employee_infos', 'cfo_content_posts', 'cfo_meetings', 'cfo_docs',
    'cfo_folders', 'cfo_activity', 'cfo_finance_plan', 'cfo_purchase_requests',
    'cfo_warehouses', 'cfo_inventory_items', 'cfo_stock_movements',
    'cfo_business_processes', 'cfo_tables', 'cfo_projects', 'cfo_statuses',
    'cfo_priorities', 'cfo_notification_prefs', 'cfo_automation_rules',
    'cfo_departments', 'cfo_finance_categories', 'cfo_org_positions'
  ];
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
  
  // Перезаписываем данные
  initializeMockData();
  console.log('✅ Данные очищены и перезаписаны');
};

