# Telegram Bot для системы управления задачами

Telegram бот для интеграции с системой управления задачами `tipa.taska.uz`.

## ⚠️ Важно: Настройка

**Для работы бота нужны:**
- Firebase Service Account (JSON файл с ключами)
- Telegram Bot Token (настраивается через GitHub Secrets)

Токен бота настраивается автоматически при деплое через GitHub Actions из Secrets.

## Запуск

### Локальный запуск (для разработки)

```bash
python bot.py
```

### Запуск на сервере (автоматический деплой)

Бот автоматически деплоится при пуше в `main` ветку через GitHub Actions.

Для ручного деплоя на сервере:

```bash
./deploy.sh
```

Этот скрипт:
- Создает виртуальное окружение Python
- Устанавливает зависимости
- Создает systemd service
- Запускает бота как системный сервис

### Управление сервисом

```bash
# Статус
sudo systemctl status telegram-bot

# Запуск
sudo systemctl start telegram-bot

# Остановка
sudo systemctl stop telegram-bot

# Перезапуск
sudo systemctl restart telegram-bot

# Просмотр логов
sudo journalctl -u telegram-bot -f
```

## Функции

- Авторизация пользователей
- Просмотр и управление задачами
- Просмотр и управление сделками
- Уведомления о новых задачах и заявках
- Ежедневные напоминания о задачах (9:00)
- Еженедельные отчеты (понедельник, 9:00)
- Групповые уведомления об успешных сделках
- Личный кабинет (смена пароля, аватарки)

## Структура проекта

- `bot.py` - главный файл бота
- `auth.py` - модуль аутентификации
- `tasks.py` - модуль работы с задачами
- `deals.py` - модуль работы со сделками
- `clients.py` - модуль работы с клиентами
- `notifications.py` - модуль уведомлений
- `profile.py` - модуль личного кабинета
- `scheduler.py` - планировщик задач
- `firebase_client.py` - клиент для работы с Firebase
- `keyboards.py` - клавиатуры (меню и кнопки)
- `messages.py` - форматирование сообщений
- `utils.py` - вспомогательные функции
- `config.py` - конфигурация

## Документация

- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Настройка Firebase
- **[TELEGRAM_BOT_TZ.md](./TELEGRAM_BOT_TZ.md)** - Техническое задание
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Решение проблем
