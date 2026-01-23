# Архитектура системы tipa.taska.uz

## 1. Общая архитектура

### 1.1. Компоненты системы

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + TypeScript)            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Components │  │    Hooks    │  │   Services   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ API Calls
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Backend API (TypeScript)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Endpoints   │  │  Firestore   │  │  Storage     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Firebase (Google Cloud)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Firestore   │  │   Storage    │  │   Auth       │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Webhooks/API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│         Telegram Bot (Python)                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Bot API    │  │  Scheduler   │  │ Notifications│     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### 1.2. Технологический стек

#### Frontend
- **Framework**: React 18+
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Custom hooks (useState, useEffect)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

#### Backend
- **Language**: TypeScript
- **Storage**: Firebase Firestore (REST API)
- **File Storage**: Firebase Storage
- **Authentication**: Custom (Firebase-based)

#### Telegram Bot
- **Language**: Python 3.10+
- **Library**: python-telegram-bot v20+
- **Scheduler**: APScheduler
- **Database**: Firebase Firestore (Admin SDK)

#### Infrastructure
- **Hosting**: VPS (Linux)
- **Web Server**: Nginx
- **Process Manager**: systemd
- **CI/CD**: GitHub Actions
- **Database**: Firebase Firestore (Cloud)

## 2. Модульная архитектура

### 2.1. Модули системы

1. **Tasks Module** - Управление задачами
2. **CRM Module** - Управление клиентами, сделками, договорами
3. **Finance Module** - Финансовое планирование и заявки
4. **Content Module** - Документы, встречи, контент-план
5. **HR Module** - Сотрудники и бизнес-процессы
6. **Inventory Module** - Управление складом
7. **Settings Module** - Настройки системы
8. **Notifications Module** - Система уведомлений

### 2.2. Структура модуля

Каждый модуль состоит из:
- **Components** - React компоненты для UI
- **Hooks** - Бизнес-логика (custom hooks)
- **Endpoints** - API endpoints для работы с данными
- **Types** - TypeScript типы и интерфейсы
- **Services** - Вспомогательные сервисы

## 3. Потоки данных

### 3.1. Создание задачи

```
User Input → TaskModal → useTaskLogic → api.tasks → Firestore
                                    ↓
                            notificationService
                                    ↓
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
            Activity Logs                  Telegram Bot
```

### 3.2. Уведомления

```
Event → notificationService → Activity Logs (всегда)
                            → Telegram (по настройкам)
```

## 4. Безопасность

### 4.1. Аутентификация
- Кастомная система авторизации через Firebase
- Пароли хешируются с помощью bcrypt
- Сессии хранятся в localStorage

### 4.2. Авторизация
- Роли: ADMIN, EMPLOYEE
- Администраторы имеют доступ ко всем функциям
- Сотрудники имеют ограниченный доступ

### 4.3. Защита данных
- Все запросы к Firebase проходят через backend API
- Чувствительные данные (пароли, токены) не хранятся в открытом виде
- Firebase Security Rules настроены для защиты данных

## 5. Масштабируемость

### 5.1. Frontend
- Lazy loading модулей
- Оптимизация bundle size через Vite
- Кэширование данных в localStorage

### 5.2. Backend
- Firebase автоматически масштабируется
- Оптимизация запросов к Firestore
- Индексы для быстрого поиска

### 5.3. Telegram Bot
- Асинхронная обработка запросов
- Очередь для уведомлений
- Планировщик для периодических задач

## 6. Развертывание

### 6.1. Frontend
- Сборка через Vite
- Деплой на статический хостинг (Nginx)
- Автоматический деплой через GitHub Actions

### 6.2. Telegram Bot
- Запуск через systemd service
- Автоматический деплой через GitHub Actions
- Мониторинг через journalctl

## 7. Мониторинг и логирование

### 7.1. Frontend
- Console logging для разработки
- Error boundaries для обработки ошибок

### 7.2. Telegram Bot
- Логирование через Python logging
- Просмотр логов через journalctl
- Версионирование кода для отслеживания деплоев
