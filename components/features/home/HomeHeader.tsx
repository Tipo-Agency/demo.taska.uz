/**
 * HomeHeader - заголовок главной страницы
 * 
 * Зачем отдельно:
 * - Переиспользуемый компонент приветствия
 * - Изолированная логика определения времени суток
 */
import React from 'react';
import { User } from '../../../types';

interface HomeHeaderProps {
  user: User;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ user }) => {
  // Приветствие в зависимости от времени суток
  const hour = new Date().getHours();
  let greeting: string;
  if (hour >= 6 && hour < 12) {
    greeting = 'Доброе утро';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Добрый день';
  } else if (hour >= 18 && hour < 23) {
    greeting = 'Добрый вечер';
  } else {
    greeting = 'Доброй ночи';
  }

  // Форматирование даты
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('ru-RU', { weekday: 'long' });
  const dayOfMonth = today.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedDate = `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}, ${dayOfMonth}`;

  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
        {greeting}, {user.name}!
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>
    </div>
  );
};
