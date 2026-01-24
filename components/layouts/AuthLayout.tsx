/**
 * AuthLayout - layout для страниц авторизации
 * 
 * Зачем отдельно:
 * - Единый стиль страниц авторизации
 * - Центрирование контента
 * - Safe areas для мобильных
 */
import React from 'react';
import { SafeAreaAll } from '../ui/SafeArea';
import { Container } from '../ui/Container';

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  className = '',
}) => {
  return (
    <SafeAreaAll
      className={`min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#121212] ${className}`}
    >
      <Container maxWidth="sm" padding className="w-full">
        {children}
      </Container>
    </SafeAreaAll>
  );
};
