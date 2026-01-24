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
    <PageLayout>
      <Container safeArea className="py-4">
        <div className="max-w-4xl mx-auto w-full">
          {/* Заголовок с действиями */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full">
                  {unreadCount} непрочитанных
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

          {/* Список уведомлений */}
          {activities.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Bell size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg">Нет уведомлений</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#252525] border border-gray-200 dark:border-[#333] rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-100 dark:divide-[#333]">
                {activities.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    activity={activity}
                    users={users}
                    onMarkRead={onMarkRead ? () => onMarkRead(activity.id) : undefined}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </PageLayout>
  );
};
