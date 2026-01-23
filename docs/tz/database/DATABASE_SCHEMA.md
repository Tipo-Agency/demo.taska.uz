# Схема базы данных Firebase Firestore

## 1. Общая информация

### 1.1. База данных
- **Тип**: Firebase Firestore (NoSQL документная БД)
- **Структура**: Коллекции → Документы → Поля
- **Режим**: Production (Cloud)

### 1.2. Правила именования
- Коллекции: camelCase (например: `users`, `tasks`, `deals`)
- Документы: ID генерируется автоматически или задается вручную
- Поля: camelCase (например: `createdAt`, `isArchived`)

## 2. Коллекции

### 2.1. Аутентификация и пользователи

#### `users`
```typescript
{
  id: string;                    // Уникальный ID пользователя
  name: string;                  // Имя пользователя
  role: 'ADMIN' | 'EMPLOYEE';    // Роль
  avatar?: string;               // URL аватара
  login?: string;                 // Логин для входа
  email?: string;                 // Email
  phone?: string;                 // Телефон
  telegram?: string;              // Telegram username
  telegramUserId?: string;        // Telegram user ID (для бота)
  password?: string;              // Хеш пароля (bcrypt)
  mustChangePassword?: boolean;   // Требуется смена пароля
  isArchived?: boolean;           // Архив (мягкое удаление)
  createdAt?: string;             // ISO дата создания
  updatedAt?: string;              // ISO дата обновления
}
```

### 2.2. Задачи

#### `tasks`
```typescript
{
  id: string;                     // Уникальный ID задачи
  entityType: 'task' | 'idea' | 'feature' | 'purchase_request';
  tableId: string;                // ID таблицы/проекта
  title: string;                   // Название задачи
  status: string;                  // Статус (из коллекции statuses)
  priority: string;                // Приоритет (из коллекции priorities)
  assigneeId: string | null;      // ID исполнителя
  assigneeIds?: string[];         // ID нескольких исполнителей
  projectId: string | null;        // ID проекта
  startDate: string;               // Дата начала (YYYY-MM-DD)
  endDate: string;                 // Дата окончания (YYYY-MM-DD)
  description?: string;            // Описание
  comments?: TaskComment[];        // Комментарии
  attachments?: TaskAttachment[];  // Вложения
  isArchived?: boolean;            // Архив
  createdAt?: string;              // ISO дата создания
  updatedAt?: string;              // ISO дата обновления
  createdByUserId?: string;       // ID создателя
  // Связи
  contentPostId?: string;          // ID поста контент-плана
  processId?: string;              // ID бизнес-процесса
  processInstanceId?: string;      // ID экземпляра процесса
  stepId?: string;                 // ID шага процесса
  dealId?: string;                 // ID сделки
  source?: string;                 // Источник ('Задача', 'Беклог', 'Функционал')
  category?: string;               // Категория
  // Для purchase_request
  requesterId?: string;            // ID запрашивающего
  departmentId?: string;           // ID отдела
  categoryId?: string;             // ID категории финансов
  amount?: number;                 // Сумма
  decisionDate?: string;           // ISO дата решения
}
```

#### `projects`
```typescript
{
  id: string;
  name: string;
  description?: string;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

#### `statuses`
```typescript
{
  id: string;
  name: string;
  color: string;  // Tailwind CSS класс
}
```

#### `priorities`
```typescript
{
  id: string;
  name: string;
  color: string;  // Tailwind CSS класс
}
```

### 2.3. CRM

#### `clients`
```typescript
{
  id: string;
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  telegram?: string;
  instagram?: string;
  companyName?: string;
  companyInfo?: string;
  notes?: string;
  funnelId?: string;              // ID воронки продаж
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

#### `deals`
```typescript
{
  id: string;
  clientId: string;
  recurring: boolean;              // true = договор, false = разовая сделка
  number: string;                  // Номер договора/сделки
  amount: number;
  currency: string;                // 'UZS', 'USD', etc.
  status: 'pending' | 'paid' | 'overdue' | 'active' | 'completed';
  description: string;
  notes?: string;
  funnelId?: string;
  stage: string;                   // ID стадии воронки
  assigneeId?: string;             // ID ответственного
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
  // Общие поля
  date?: string;                   // Дата сделки/договора
  dueDate?: string;                // Срок оплаты
  paidAmount?: number;             // Оплаченная сумма
  paidDate?: string;               // Дата оплаты
  // Поля для договоров (recurring = true)
  startDate?: string;              // Дата начала договора
  endDate?: string;                // Дата окончания договора
  paymentDay?: number;             // День месяца для оплаты
  // Поля для лидов
  contactName?: string;            // Имя контакта
  source?: string;                 // Источник ('telegram', 'instagram', 'site')
  telegramChatId?: string;         // ID чата в Telegram
  telegramUsername?: string;        // Username в Telegram
}
```

#### `accountsReceivable`
```typescript
{
  id: string;
  clientId: string;
  dealId: string;                  // ID сделки (договора или продажи)
  amount: number;
  currency: string;
  dueDate: string;                 // Срок погашения (YYYY-MM-DD)
  status: 'current' | 'overdue' | 'paid';
  description: string;
  paidAmount?: number;
  paidDate?: string;
  createdAt: string;
  updatedAt?: string;
  isArchived?: boolean;
}
```

#### `employeeInfos`
```typescript
{
  id: string;
  userId: string;                  // ID пользователя
  position?: string;                // Должность
  departmentId?: string;            // ID отдела
  hireDate?: string;               // Дата найма (YYYY-MM-DD)
  birthDate?: string;              // Дата рождения (YYYY-MM-DD)
  salary?: number;                 // Зарплата
  notes?: string;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

### 2.4. Финансы

#### `departments`
```typescript
{
  id: string;
  name: string;
  description?: string;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

#### `financeCategories`
```typescript
{
  id: string;
  name: string;
  type: 'fixed' | 'percent';      // Фиксированная или процентная
  color?: string;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

#### `financePlan`
```typescript
{
  id: string;
  period: 'week' | 'month';
  salesPlan: number;               // План продаж
  currentIncome: number;           // Текущий доход
  createdAt?: string;
  updatedAt?: string;
}
```

#### `purchaseRequests`
```typescript
{
  id: string;
  requesterId: string;             // ID запрашивающего
  departmentId: string;            // ID отдела
  categoryId: string;              // ID категории финансов
  amount: number;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'deferred';
  date: string;                    // Дата заявки (YYYY-MM-DD)
  decisionDate?: string;           // ISO дата решения
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

#### `financialPlanDocuments`
```typescript
{
  id: string;
  departmentId: string;
  period: string;                  // YYYY-MM формат месяца
  income: number;                  // Доход
  expenses: Record<string, number>; // Расходы по статьям: { categoryId: amount }
  status: 'created' | 'conducted' | 'approved';
  createdAt: string;
  updatedAt?: string;
  approvedBy?: string;             // userId
  approvedAt?: string;
  isArchived?: boolean;
}
```

### 2.5. Контент

#### `docs`
```typescript
{
  id: string;
  title: string;
  content?: string;                // Содержимое документа
  type: 'internal' | 'external';  // Внутренний или внешний
  folderId?: string;               // ID папки
  tableId?: string;                // ID таблицы
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;              // userId
}
```

#### `folders`
```typescript
{
  id: string;
  name: string;
  parentId?: string;               // ID родительской папки
  tableId?: string;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

#### `meetings`
```typescript
{
  id: string;
  title: string;
  date: string;                    // Дата встречи (YYYY-MM-DD)
  time: string;                    // Время (HH:MM)
  description?: string;
  participantIds: string[];        // ID участников
  summary?: string;                // Резюме встречи
  tableId?: string;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

#### `contentPosts`
```typescript
{
  id: string;
  topic: string;                   // Тема поста
  text?: string;                   // Текст поста
  date: string;                    // Дата публикации (YYYY-MM-DD)
  status: 'draft' | 'scheduled' | 'published';
  platform?: string;               // Платформа ('instagram', 'telegram', etc.)
  tableId?: string;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

### 2.6. Бизнес-процессы

#### `orgPositions`
```typescript
{
  id: string;
  name: string;                    // Название должности
  description?: string;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

#### `businessProcesses`
```typescript
{
  id: string;
  title: string;
  description?: string;
  version?: number;                // Версия процесса
  steps: ProcessStep[];            // Шаги процесса
  instances?: ProcessInstance[];    // Экземпляры процесса
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

ProcessStep {
  id: string;
  title: string;
  description?: string;
  assigneeType: 'user' | 'position' | 'department';
  assigneeId?: string;            // ID пользователя/должности/отдела
  order: number;                   // Порядок выполнения
  requiresApproval?: boolean;      // Требуется согласование
}

ProcessInstance {
  id: string;
  processId: string;
  currentStepId?: string;          // ID текущего шага
  taskIds: string[];               // ID задач процесса
  startedAt: string;               // ISO дата запуска
  completedAt?: string;            // ISO дата завершения
  status: 'active' | 'completed' | 'cancelled';
}
```

### 2.7. Склад

#### `warehouses`
```typescript
{
  id: string;
  name: string;
  address?: string;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

#### `inventoryItems`
```typescript
{
  id: string;
  name: string;
  description?: string;
  unit: string;                    // Единица измерения
  warehouseId: string;             // ID склада
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

#### `stockMovements`
```typescript
{
  id: string;
  itemId: string;                  // ID товара
  warehouseId: string;             // ID склада
  type: 'in' | 'out';              // Приход/Расход
  quantity: number;
  reason?: string;                 // Причина движения
  date: string;                    // Дата движения (YYYY-MM-DD)
  createdAt?: string;
  updatedAt?: string;
}
```

### 2.8. Воронки продаж

#### `salesFunnels`
```typescript
{
  id: string;
  name: string;
  description?: string;
  stages: FunnelStage[];           // Стадии воронки
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

FunnelStage {
  id: string;
  name: string;
  order: number;                   // Порядок стадии
  color?: string;
}
```

### 2.9. Настройки

#### `tables`
```typescript
{
  id: string;
  name: string;
  type: 'tasks' | 'docs' | 'meetings' | 'content-plan' | 'backlog' | 'functionality';
  isSystem?: boolean;              // Системная таблица
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

#### `notificationPrefs`
```typescript
{
  id: string;                     // Обычно 'default'
  // Настройки уведомлений для каждого типа события
  newTask: NotificationSetting;
  statusChange: NotificationSetting;
  taskAssigned: NotificationSetting;
  // ... и т.д. для всех типов событий
  telegramGroupChatId?: string;   // ID группового чата
  defaultFunnelId?: string;        // ID основной воронки
}

NotificationSetting {
  telegramPersonal: boolean;       // Уведомления в личный чат
  telegramGroup: boolean;         // Уведомления в группу
}
```

#### `automationRules`
```typescript
{
  id: string;
  name: string;
  isActive: boolean;
  module: 'tasks' | 'docs' | 'meetings' | 'content' | 'finance' | 'crm' | 'employees' | 'bpm';
  trigger: string;                 // Тип триггера
  conditions?: {
    statusTo?: string;             // Статус для триггера изменения статуса
  };
  action: {
    type: 'telegram_message' | 'approval_request';
    template?: string;             // Шаблон сообщения
    targetUser: 'assignee' | 'creator' | 'admin' | 'specific' | 'manager';
    approvalType?: string;
    buttons?: TelegramButton[];
  };
  createdAt?: string;
  updatedAt?: string;
}
```

#### `activity`
```typescript
{
  id: string;
  userId: string;                  // ID пользователя, для которого создано уведомление
  userName: string;                // Имя пользователя, который выполнил действие
  userAvatar: string;             // Аватар пользователя
  action: string;                 // Действие ('создал задачу', 'изменил статус')
  details: string;                 // Детали ('Название задачи')
  timestamp: string;               // ISO дата создания
  read: boolean;                   // Прочитано ли уведомление
}
```

### 2.10. Сайты

#### `partnerLogos`
```typescript
{
  id: string;
  name: string;
  logoUrl: string;
  link?: string;
  order?: number;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

#### `news`
```typescript
{
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publishedAt?: string;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

#### `cases`
```typescript
{
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
  tags?: string[];
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

## 3. Индексы

### 3.1. Рекомендуемые индексы Firestore

Для оптимизации запросов рекомендуется создать составные индексы:

1. **tasks**: `assigneeId + isArchived`, `status + isArchived`, `endDate + isArchived`
2. **deals**: `assigneeId + isArchived`, `stage + isArchived`, `status + isArchived`
3. **meetings**: `date + isArchived`, `participantIds + isArchived`
4. **activity**: `userId + read`, `timestamp + read`

## 4. Правила безопасности

### 4.1. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Правила для каждой коллекции
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    // ... и т.д.
  }
}
```

## 5. Миграции данных

### 5.1. Версионирование схемы
- При изменении схемы добавлять поле `schemaVersion` в документы
- Создавать скрипты миграции для обновления существующих данных

### 5.2. Обратная совместимость
- Старые поля не удаляются сразу, помечаются как deprecated
- Новые поля добавляются с опциональными значениями по умолчанию
