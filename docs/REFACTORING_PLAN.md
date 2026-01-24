# План рефакторинга tipa.taska.uz

## Этап 1: Создание базовой инфраструктуры компонентов

### 1.1. UI-компоненты (components/ui/)
- [ ] Button (все варианты)
- [ ] Input (текст, число, дата, выбор)
- [ ] Select/Dropdown
- [ ] Modal (базовый)
- [ ] Card
- [ ] Badge
- [ ] Toast/Notification
- [ ] Loading states
- [ ] Empty states
- [ ] Error states

### 1.2. Layout компоненты
- [ ] Container
- [ ] Grid
- [ ] Flex
- [ ] SafeArea (для мобильных)
- [ ] PageLayout

### 1.3. Navigation компоненты
- [ ] Sidebar
- [ ] Header
- [ ] Breadcrumbs
- [ ] Tabs
- [ ] MobileMenu

## Этап 2: Рефакторинг существующих компонентов

### 2.1. Разбиение монолитных компонентов
- [ ] HomeView → HomePage (композиция)
- [ ] TasksView → TasksPage (композиция)
- [ ] ClientsView → ClientsPage (композиция)
- [ ] SettingsView → SettingsPage (композиция)

### 2.2. Выделение переиспользуемых блоков
- [ ] TaskCard
- [ ] DealCard
- [ ] ClientCard
- [ ] ActivityItem
- [ ] UserAvatar
- [ ] StatusBadge
- [ ] PriorityBadge

## Этап 3: Мобильная адаптация

### 3.1. Safe Areas
- [ ] Создать SafeArea компонент
- [ ] Применить ко всем страницам
- [ ] Тестирование в Telegram Web App
- [ ] Тестирование на iOS/Android

### 3.2. Адаптивные компоненты
- [ ] Адаптивные таблицы (карточки на мобильных)
- [ ] Мобильная навигация
- [ ] Touch-оптимизация

## Этап 4: Оптимизация и документация

### 4.1. Производительность
- [ ] Lazy loading модулей
- [ ] Мемоизация компонентов
- [ ] Виртуализация списков

### 4.2. Документация
- [ ] Storybook или аналог
- [ ] Документация каждого компонента
- [ ] Примеры использования

## Приоритеты

1. **Критично**: UI-компоненты, Safe Areas
2. **Важно**: Разбиение монолитных компонентов
3. **Желательно**: Оптимизация, документация
