# Руководство по рефакторингу

## Текущее состояние

### ✅ Создано
1. **Базовые UI компоненты**:
   - SafeArea, Container, PageLayout
   - Select, Toast
   - Button, Input, Textarea, Card, Badge (уже были)

2. **Feature компоненты**:
   - TaskCard
   - UserAvatar, PriorityBadge, StatusBadge

3. **Документация**:
   - ARCHITECTURE.md
   - COMPONENTS.md
   - REFACTORING_PLAN.md

### 📋 Что нужно сделать

## Этап 1: Завершение базовых компонентов

### 1.1. Создать недостающие feature компоненты

```typescript
// components/features/deals/DealCard.tsx
// Аналогично TaskCard, но для сделок

// components/features/clients/ClientCard.tsx
// Карточка клиента

// components/features/meetings/MeetingCard.tsx
// Карточка встречи

// components/features/activity/ActivityItem.tsx
// Элемент активности
```

### 1.2. Создать layout компоненты

```typescript
// components/layouts/AppLayout.tsx
// Основной layout приложения (Sidebar + Header + Content)

// components/layouts/AuthLayout.tsx
// Layout для страниц авторизации

// components/layouts/PublicLayout.tsx
// Layout для публичных страниц
```

## Этап 2: Рефакторинг монолитных компонентов

### 2.1. Пример: HomeView → HomePage

**Было** (монолитный компонент):
```tsx
// HomeView.tsx - 340 строк, вся логика внутри
```

**Должно быть** (композиция):
```tsx
// pages/HomePage.tsx - только композиция
import { HomeHeader } from '../features/home/HomeHeader';
import { QuickActions } from '../features/home/QuickActions';
import { MyTasksSection } from '../features/home/MyTasksSection';
import { UpcomingMeetings } from '../features/home/UpcomingMeetings';
import { RecentActivity } from '../features/home/RecentActivity';
import { StatsCards } from '../features/home/StatsCards';

export const HomePage: React.FC<HomePageProps> = (props) => {
  return (
    <PageLayout>
      <Container>
        <HomeHeader user={props.currentUser} />
        <QuickActions {...props} />
        <StatsCards {...props} />
        <MyTasksSection tasks={props.tasks} onOpenTask={props.onOpenTask} />
        <UpcomingMeetings meetings={props.meetings} />
        <RecentActivity activities={props.recentActivity} />
      </Container>
    </PageLayout>
  );
};
```

**Разбить на компоненты**:
- `components/features/home/HomeHeader.tsx` - приветствие и дата
- `components/features/home/QuickActions.tsx` - быстрые действия
- `components/features/home/MyTasksSection.tsx` - секция моих задач
- `components/features/home/UpcomingMeetings.tsx` - предстоящие встречи
- `components/features/home/RecentActivity.tsx` - последняя активность
- `components/features/home/StatsCards.tsx` - статистические карточки

### 2.2. Пример: TasksView → TasksPage

**Разбить на**:
- `components/features/tasks/TasksHeader.tsx` - заголовок с фильтрами
- `components/features/tasks/TasksList.tsx` - список задач (использует TaskCard)
- `components/features/tasks/TasksFilters.tsx` - фильтры
- `pages/TasksPage.tsx` - композиция

### 2.3. Пример: ClientsView → ClientsPage

**Разбить на**:
- `components/features/clients/ClientsHeader.tsx`
- `components/features/clients/ClientsList.tsx` (использует ClientCard)
- `components/features/clients/ClientsFilters.tsx`
- `pages/ClientsPage.tsx` - композиция

## Этап 3: Применение SafeArea

### 3.1. Обновить все страницы

```tsx
// Было
<div className="h-full w-full overflow-auto">
  <YourContent />
</div>

// Должно быть
<PageLayout>
  <Container safeArea>
    <YourContent />
  </Container>
</PageLayout>
```

### 3.2. Обновить модальные окна

Все модальные окна уже используют safe areas через StandardModal.

## Этап 4: Мобильная оптимизация

### 4.1. Адаптивные таблицы

```tsx
// components/features/common/ResponsiveTable.tsx
// На десктопе - таблица, на мобильных - карточки
```

### 4.2. Touch-friendly элементы

- Минимум 44x44px для кликабельных элементов
- Увеличенные отступы на мобильных
- Swipe-жесты где уместно

## Правила рефакторинга

### 1. Принцип единственной ответственности
Каждый компонент решает одну задачу.

### 2. Композиция над наследованием
Собирай сложное из простого.

### 3. Переиспользование
Если код повторяется 2+ раза - вынеси в компонент.

### 4. Изоляция
Компонент не знает о контексте использования.

### 5. Документация
Каждый компонент должен иметь:
- Описание назначения
- Props интерфейс
- Примеры использования

## Чеклист рефакторинга компонента

- [ ] Компонент решает одну задачу
- [ ] Компонент переиспользуется минимум в 2 местах
- [ ] Компонент не содержит бизнес-логику (только в hooks)
- [ ] Компонент использует UI компоненты из `components/ui`
- [ ] Компонент поддерживает мобильную версию
- [ ] Компонент использует SafeArea где нужно
- [ ] Компонент документирован
- [ ] Компонент имеет типизированные props

## Порядок рефакторинга

1. **Сначала** создай все базовые компоненты
2. **Затем** создай feature компоненты
3. **Потом** рефакторь монолитные компоненты
4. **В конце** оптимизируй и документируй

## Примеры хорошего кода

### ✅ Хорошо
```tsx
// Композиция из переиспользуемых компонентов
<PageLayout>
  <Container>
    <TasksHeader />
    <TasksList tasks={tasks} />
  </Container>
</PageLayout>
```

### ❌ Плохо
```tsx
// Монолитный компонент со всей логикой
<div className="h-full">
  <div className="p-4">
    <h1>Задачи</h1>
    {tasks.map(task => (
      <div className="p-2 border">
        {task.title}
      </div>
    ))}
  </div>
</div>
```
