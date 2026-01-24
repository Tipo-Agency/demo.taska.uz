/**
 * ActivityItem - элемент активности для отображения в списках
 * 
 * Зачем отдельно:
 * - Переиспользуется в InboxView, HomeView
 * - Единый стиль отображения активности
 */
import React from 'react';
import { ActivityLog, User } from '../../../types';
import { UserAvatar } from '../common/UserAvatar';
import { Clock, CheckCircle2 } from 'lucide-react';
// formatDate используется в других компонентах, но здесь используем встроенный формат

interface ActivityItemProps {
  activity: ActivityLog;
  users: User[];
  onClick?: () => void;
  onMarkRead?: () => void;
  className?: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  activity,
  users,
  onClick,
  onMarkRead,
  className = '',
}) => {
  const user = users.find(u => u.id === activity.userId);

  return (
    <div
      className={`
        p-3 border-b border-gray-200 dark:border-[#333] 
        hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors
        cursor-pointer
        ${!activity.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {/* Аватар */}
        {user && (
          <UserAvatar user={user} size="sm" />
        )}

        <div className="flex-1 min-w-0">
          {/* Текст активности */}
          <p className="text-sm text-gray-900 dark:text-white mb-1">
            {activity.message}
          </p>

          {/* Метаданные */}
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock size={10} />
              <span>
                {activity.timestamp && new Date(activity.timestamp).toLocaleString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            {!activity.read && (
              <div className="flex items-center gap-1">
                <CheckCircle2 size={10} className="text-blue-500" />
                <span>Новое</span>
              </div>
            )}
          </div>
        </div>

        {/* Кнопка прочитать */}
        {!activity.read && onMarkRead && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMarkRead();
            }}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline shrink-0"
          >
            Прочитать
          </button>
        )}
      </div>
    </div>
  );
};
