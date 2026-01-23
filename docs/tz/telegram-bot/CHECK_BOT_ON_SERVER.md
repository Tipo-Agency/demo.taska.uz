# Проверка бота на сервере

## Проблема: Бот не отвечает

### Шаг 1: Проверьте, обновился ли код

```bash
# На сервере
cd /var/www/tipa.taska.uz/telegram-bot
grep "Code version" bot.py | head -1
```

Должна быть строка с версией `2026-01-21-v5` или новее.

Если версии нет или старая - обновите код:
```bash
cd /var/www/tipa.taska.uz
sudo systemctl stop telegram-bot
git pull origin main
sudo systemctl start telegram-bot
```

### Шаг 2: Проверьте, получает ли бот обновления от Telegram

```bash
cd /var/www/tipa.taska.uz/telegram-bot
chmod +x test-bot-connection.sh
./test-bot-connection.sh
```

Этот скрипт покажет:
- Работает ли бот (getMe)
- Есть ли обновления в очереди (getUpdates)
- Сколько обновлений ожидает обработки

### Шаг 3: Проверьте логи после отправки /start

```bash
# В одном терминале - смотрите логи в реальном времени
sudo journalctl -u telegram-bot -f

# В другом терминале или на телефоне - отправьте /start боту
```

**Что должно появиться в логах:**
- `[BOT] Code version: 2026-01-21-v5`
- `[BOT] Logging handler registered in group -1`
- `[UPDATE] ===== RECEIVED UPDATE (ID: ...) =====`
- `[UPDATE] Message from user ... in PRIVATE: /start`
- `[UPDATE] ⚠️ COMMAND DETECTED: /start`
- `[START] Command received from user ...`

**Если этих сообщений НЕТ:**
- Бот не получает обновления от Telegram
- Проверьте токен бота
- Проверьте, что бот не заблокирован в Telegram

### Шаг 4: Проверьте токен бота

```bash
cat /var/www/tipa.taska.uz/telegram-bot/.env | grep TELEGRAM_BOT_TOKEN
```

Должен быть: `TELEGRAM_BOT_TOKEN=8348357222:AAHzzrWFOE7n3MiGYKgugqXbUSehTW1-D1c`

### Шаг 5: Проверьте, под каким пользователем запущен бот

```bash
sudo systemctl status telegram-bot | grep User
```

Должен быть пользователь деплоя, НЕ root.

### Шаг 6: Если обновления не приходят

Проверьте, что бот не заблокирован:
1. Откройте Telegram
2. Найдите вашего бота
3. Убедитесь, что бот не заблокирован (должна быть кнопка "Начать" или возможность отправить сообщение)

### Шаг 7: Очистите очередь обновлений (если нужно)

Если в очереди много старых обновлений:

```bash
curl -X POST "https://api.telegram.org/bot8348357222:AAHzzrWFOE7n3MiGYKgugqXbUSehTW1-D1c/getUpdates?offset=-1"
```

Это очистит очередь и бот начнет получать новые обновления.
