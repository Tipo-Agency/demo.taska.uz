/**
 * HomeHeader - заголовок главной страницы + быстрые действия справа на одном уровне
 */
import React from 'react';
import { User } from '../../../types';
import { CheckCircle2, Briefcase, Network, Plus } from 'lucide-react';
import { Button } from '../../ui/Button';

interface HomeHeaderProps {
  user: User;
  onQuickCreateTask: () => void;
  onQuickCreateDeal: () => void;
  onQuickCreateProcess: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  user,
  onQuickCreateTask,
  onQuickCreateDeal,
  onQuickCreateProcess,
}) => {
  const hour = new Date().getHours();
  let greeting: string;
  if (hour >= 6 && hour < 12) greeting = 'Доброе утро';
  else if (hour >= 12 && hour < 18) greeting = 'Добрый день';
  else if (hour >= 18 && hour < 23) greeting = 'Добрый вечер';
  else greeting = 'Доброй ночи';

  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('ru-RU', { weekday: 'long' });
  const dayOfMonth = today.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  const formattedDate = `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}, ${dayOfMonth}`;

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {greeting}, {user.name}!
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="secondary" size="sm" onClick={onQuickCreateTask} className="flex items-center gap-1.5">
          <CheckCircle2 size={16} /> Задача
        </Button>
        <Button variant="secondary" size="sm" onClick={onQuickCreateDeal} className="flex items-center gap-1.5">
          <Briefcase size={16} /> Сделка
        </Button>
        <Button variant="secondary" size="sm" onClick={onQuickCreateProcess} className="flex items-center gap-1.5">
          <Network size={16} /> Процесс
        </Button>
      </div>
    </div>
  );
};
