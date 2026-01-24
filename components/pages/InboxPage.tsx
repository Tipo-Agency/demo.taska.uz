/**
 * InboxPage - страница входящих (рефакторенная версия)
 * 
 * Зачем отдельно:
 * - Только композиция компонентов
 * - Использует переиспользуемые компоненты
 */
import React from 'react';
import { ActivityLog, User } from '../types';
import { PageLayout } from '../ui/PageLayout';
import { Container } from '../ui/Container';
import { ActivityItem } from '../features/activity/ActivityItem';
import { Button } from '../ui/Button';
import { CheckCircle2, Bell } from 'lucide-react';
interface InboxPageProps {
  activities: ActivityLog[];
  users: User[];
  onMarkAllRead: () => void;
  onMarkRead?: (id: string) => void;
}

export const InboxPage: React.FC<InboxPageProps> = ({
  activities,
  users,
  onMarkAllRead,
  onMarkRead,
}) => {
  const unreadCount = activities.filter(a => !a.read).length;

  return (
    <PageLayout
      header={
        <div className="border-b border-gray-200 dark:border-[#333] bg-white dark:bg-[#191919] px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell size={20} className="text-gray-600 dark:text-gray-400" />
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                Входящие
              </h1>
              {unreadCount > 0 && (
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                icon={CheckCircle2}
                onClick={onMarkAllRead}
              >
                Отметить все прочитанными
              </Button>
            )}
          </div>
        </div>
      }
    >
      <Container safeArea className="py-4">
        {activities.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            Нет уведомлений
          </div>
        ) : (
          <div className="space-y-1">
            {activities.map((activity) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                users={users}
                onMarkRead={onMarkRead ? () => onMarkRead(activity.id) : undefined}
              />
            ))}
          </div>
        )}
      </Container>
    </PageLayout>
  );
};
