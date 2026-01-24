/**
 * UserAvatar - аватар пользователя
 * 
 * Зачем отдельно:
 * - Переиспользуется везде где показываются пользователи
 * - Единый стиль аватаров
 * - Поддержка разных размеров
 */
import React from 'react';
import { User } from '../../../types';

interface UserAvatarProps {
  user: User;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}

const sizeClasses = {
  xs: 'w-5 h-5 text-xs',
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-base',
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'md',
  showName = false,
  className = '',
}) => {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className={`
          ${sizeClasses[size]}
          rounded-full bg-blue-500 text-white
          flex items-center justify-center
          font-semibold shrink-0
        `}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>
      {showName && (
        <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
          {user.name}
        </span>
      )}
    </div>
  );
};
