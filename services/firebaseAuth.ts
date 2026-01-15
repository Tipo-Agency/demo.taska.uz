// Firebase Authentication service
// Используем Email/Password авторизацию для работы с правилами безопасности
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { app } from "../firebase/config";

const auth = getAuth(app);

// Администраторский аккаунт для Firebase Auth (отдельно от пользователей приложения)
// Эти данные используются ТОЛЬКО для авторизации в Firebase, НЕ для входа в приложение
// Пользователи приложения используют кастомную авторизацию (логин/пароль из Firestore)
// Можно использовать любой email, даже несуществующий - это технический аккаунт
const ADMIN_EMAIL = 'firebase-admin@tipa-task-manager.com';
const ADMIN_PASSWORD = 'FirebaseAdmin2024!'; // Измените на более безопасный пароль

/**
 * Инициализация авторизации администратора
 * Вызывается при старте приложения
 */
export const initFirebaseAuth = async (): Promise<FirebaseUser | null> => {
  try {
    console.log('[FirebaseAuth] Initializing Firebase Auth...');
    // Проверяем, авторизован ли уже пользователь
    if (auth.currentUser) {
      console.log('[FirebaseAuth] User already authenticated:', auth.currentUser.email);
      return auth.currentUser;
    }

    // Пытаемся войти с администраторскими данными
    try {
      console.log('[FirebaseAuth] Attempting to sign in with admin credentials...');
      const userCredential = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
      console.log('[FirebaseAuth] Successfully signed in:', userCredential.user.email);
      return userCredential.user;
    } catch (error: any) {
      console.log('[FirebaseAuth] Sign in error:', error.code, error.message);
      // Если пользователь не существует, создаем его
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        console.log('[FirebaseAuth] User not found, creating new admin user...');
        const userCredential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log('[FirebaseAuth] Admin user created:', userCredential.user.email);
        return userCredential.user;
      }
      throw error;
    }
  } catch (error: any) {
    console.error('[FirebaseAuth] Firebase Auth Error:', error);
    console.error('[FirebaseAuth] Error code:', error?.code);
    console.error('[FirebaseAuth] Error message:', error?.message);
    // Продолжаем работу даже при ошибке авторизации
    return null;
  }
};

/**
 * Получить текущего авторизованного пользователя
 */
export const getCurrentFirebaseUser = (): FirebaseUser | null => {
  return auth.currentUser;
};

/**
 * Проверить, авторизован ли пользователь
 */
export const isAuthenticated = (): boolean => {
  return auth.currentUser !== null;
};

/**
 * Подписаться на изменения состояния авторизации
 */
export const onAuthStateChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

