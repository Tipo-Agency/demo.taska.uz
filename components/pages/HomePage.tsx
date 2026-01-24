/**
 * HomePage - главная страница (рефакторенная версия)
 * 
 * Зачем отдельно:
 * - Только композиция компонентов
 * - Не содержит бизнес-логику
 * - Использует переиспользуемые компоненты
 */
import React, { useState, useEffect } from 'react';
import {
  Task,
  User,
  ActivityLog,
  Meeting,
  FinancePlan,
  PurchaseRequest,
  Deal,
  ContentPost,
  EmployeeInfo,
  Project,
  StatusOption,
  PriorityOption,
} from '../../types';
import {
  HomeHeader,
  QuickActions,
  MyTasksSection,
  UpcomingMeetings,
  RecentActivity,
  StatsCards,
  NotificationsSection,
  BirthdayModal,
} from '../features/home';
import { Container } from '../ui/Container';
import { PageLayout } from '../ui/PageLayout';
import { getTodayLocalDate } from '../../utils/dateUtils';

interface HomePageProps {
  currentUser: User;
  tasks: Task[];
  recentActivity: ActivityLog[];
  meetings?: Meeting[];
  financePlan?: FinancePlan | null;
  purchaseRequests?: PurchaseRequest[];
  deals?: Deal[];
  contentPosts?: ContentPost[];
  employeeInfos?: EmployeeInfo[];
  users: User[];
  projects: Project[];
  statuses: StatusOption[];
  priorities: PriorityOption[];
  onOpenTask: (task: Task) => void;
  onNavigateToInbox: () => void;
  onQuickCreateTask: () => void;
  onQuickCreateProcess: () => void;
  onQuickCreateDeal: () => void;
  onNavigateToTasks: () => void;
  onNavigateToMeetings: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentUser,
  tasks,
  recentActivity,
  meetings = [],
  financePlan,
  purchaseRequests = [],
  deals = [],
  contentPosts = [],
  employeeInfos = [],
  users,
  projects,
  statuses,
  priorities,
  onOpenTask,
  onNavigateToInbox,
  onQuickCreateTask,
  onQuickCreateProcess,
  onQuickCreateDeal,
  onNavigateToTasks,
  onNavigateToMeetings,
}) => {
  const [showBirthdayModal, setShowBirthdayModal] = useState(false);

  // Проверка дня рождения
  useEffect(() => {
    const employeeInfo = employeeInfos.find(e => e.userId === currentUser?.id);
    if (employeeInfo?.birthDate) {
      const birthDate = new Date(employeeInfo.birthDate);
      const today = new Date();
      const isBirthday =
        birthDate.getMonth() === today.getMonth() &&
        birthDate.getDate() === today.getDate();

      if (isBirthday) {
        const todayStr = getTodayLocalDate();
        const lastShown = localStorage.getItem(`birthday_${currentUser.id}_${todayStr}`);
        if (!lastShown) {
          setShowBirthdayModal(true);
          localStorage.setItem(`birthday_${currentUser.id}_${todayStr}`, 'true');
        }
      }
    }
  }, [currentUser?.id, employeeInfos]);

  // Фильтрация задач пользователя
  const myTasks = (tasks || []).filter(
    t =>
      t &&
      t.entityType !== 'idea' &&
      t.entityType !== 'feature' &&
      !t.isArchived &&
      !['Выполнено', 'Done', 'Завершено'].includes(t.status) &&
      (t.assigneeId === currentUser?.id || t.assigneeIds?.includes(currentUser?.id))
  );

  // Непрочитанные уведомления
  const unreadNotifications = (recentActivity || []).filter(a => a && !a.read);

  if (!currentUser) {
    return (
      <PageLayout>
        <Container>
          <div className="p-10 text-center text-gray-500 dark:text-gray-400">
            Пользователь не найден
          </div>
        </Container>
      </PageLayout>
    );
  }

  return (
    <>
      <BirthdayModal
        isOpen={showBirthdayModal}
        onClose={() => setShowBirthdayModal(false)}
        user={currentUser}
      />

      <PageLayout>
        <Container safeArea className="py-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <HomeHeader user={currentUser} />

            {/* Quick Actions */}
            <QuickActions
              onQuickCreateTask={onQuickCreateTask}
              onQuickCreateDeal={onQuickCreateDeal}
              onQuickCreateProcess={onQuickCreateProcess}
            />

            {/* Stats Cards */}
            <StatsCards
              deals={deals}
              financePlan={financePlan}
              tasks={tasks}
              currentUser={currentUser}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Left Column - Tasks and Meetings */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* My Tasks */}
                <MyTasksSection
                  tasks={myTasks}
                  users={users}
                  projects={projects}
                  statuses={statuses}
                  priorities={priorities}
                  onOpenTask={onOpenTask}
                  onViewAll={onNavigateToTasks}
                />

                {/* Upcoming Meetings */}
                <UpcomingMeetings
                  meetings={meetings}
                  users={users}
                  onViewAll={onNavigateToMeetings}
                />
              </div>

              {/* Right Column - Notifications */}
              <div className="lg:col-span-1">
                <NotificationsSection
                  notifications={unreadNotifications}
                  users={users}
                  onViewAll={onNavigateToInbox}
                />
              </div>
            </div>
          </div>
        </Container>
      </PageLayout>
    </>
  );
};
