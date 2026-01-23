# Устранение неполадок Telegram бота

## Быстрая диагностика

### Шаг 1: Запустите скрипт диагностики

```bash
cd /var/www/tipa.taska.uz/telegram-bot
sudo ./fix-bot.sh
```

Этот скрипт:
- Проверит статус сервиса
- Проверит запущенные процессы
- Проверит версию кода
- Проверит подключение к Telegram API
- Предложит автоматическое исправление проблем

## Частые проблемы и решения

### Проблема 1: Бот не отвечает на команды

#### Симптомы:
- Отправляете `/start`, но бот не отвечает
- В логах нет сообщений `[UPDATE]`

#### Решения:

1. **Проверьте, запущен ли бот:**
```bash
sudo systemctl status telegram-bot
```

2. **Проверьте, получает ли бот обновления:**
```bash
cd /var/www/tipa.taska.uz/telegram-bot
./test-bot-connection.sh
```

3. **Проверьте логи в реальном времени:**
```bash
sudo journalctl -u telegram-bot -f
```
Затем отправьте `/start` боту. Должны появиться сообщения `[UPDATE]`.

4. **Проверьте, не заблокирован ли бот:**
- Откройте Telegram
- Найдите вашего бота
- Убедитесь, что бот не заблокирован
- Если заблокирован - разблокируйте

5. **Очистите очередь обновлений:**
```bash
curl -X POST "https://api.telegram.org/bot8348357222:AAHzzrWFOE7n3MiGYKgugqXbUSehTW1-D1c/getUpdates?offset=-1"
```

### Проблема 2: Ошибка 409 Conflict

#### Симптомы:
- В логах: `409 Conflict: terminated by other getUpdates request`
- Бот не получает обновления

#### Причина:
Запущено несколько экземпляров бота одновременно.

#### Решение:

```bash
cd /var/www/tipa.taska.uz/telegram-bot
sudo ./fix-bot.sh
```

Или вручную:

```bash
# 1. Остановите сервис
sudo systemctl stop telegram-bot

# 2. Убейте все процессы
sudo pkill -9 -f "python.*bot.py"

# 3. Проверьте, что все остановлено
ps aux | grep "python.*bot.py" | grep -v grep
# (должно быть пусто)

# 4. Запустите сервис
sudo systemctl start telegram-bot

# 5. Проверьте, что запущен только один процесс
ps aux | grep "python.*bot.py" | grep -v grep
# (должен быть только один процесс)
```

### Проблема 3: Бот не обновляется после деплоя

#### Симптомы:
- После деплоя версия кода в логах не меняется
- Старый код продолжает работать

#### Решения:

1. **Очистите кэш Python:**
```bash
cd /var/www/tipa.taska.uz/telegram-bot
find . -type d -name "__pycache__" -exec sudo rm -rf {} + 2>/dev/null || true
find . -type f -name "*.pyc" -delete 2>/dev/null || true
```

2. **Перезапустите сервис:**
```bash
sudo systemctl restart telegram-bot
```

3. **Проверьте версию в логах:**
```bash
sudo journalctl -u telegram-bot -n 20 | grep "Code version"
```

### Проблема 4: Бот не запускается

#### Симптомы:
- `sudo systemctl status telegram-bot` показывает ошибку
- В логах есть traceback

#### Решения:

1. **Проверьте логи:**
```bash
sudo journalctl -u telegram-bot -n 50 --no-pager
```

2. **Проверьте зависимости:**
```bash
cd /var/www/tipa.taska.uz/telegram-bot
source venv/bin/activate
pip install -r requirements.txt
```

3. **Проверьте .env файл:**
```bash
cat /var/www/tipa.taska.uz/telegram-bot/.env
```
Должен содержать:
```
TELEGRAM_BOT_TOKEN=8348357222:AAHzzrWFOE7n3MiGYKgugqXbUSehTW1-D1c
```

4. **Проверьте firebase-credentials.json:**
```bash
ls -la /var/www/tipa.taska.uz/telegram-bot/firebase-credentials.json
```

### Проблема 5: Бот запускается, но сразу падает

#### Симптомы:
- Бот запускается, но через несколько секунд останавливается
- В логах есть ошибки импорта или инициализации

#### Решения:

1. **Проверьте логи:**
```bash
sudo journalctl -u telegram-bot -n 100 --no-pager
```

2. **Проверьте импорты:**
```bash
cd /var/www/tipa.taska.uz/telegram-bot
source venv/bin/activate
python -c "import bot; print('OK')"
```

3. **Проверьте версию python-telegram-bot:**
```bash
source venv/bin/activate
pip show python-telegram-bot
```
Должна быть версия 20.7 или выше.

### Проблема 6: Бот не получает обновления от Telegram

#### Симптомы:
- `getMe` работает (бот существует)
- `getUpdates` возвращает пустой массив
- В логах нет `[UPDATE]` сообщений

#### Решения:

1. **Проверьте, не заблокирован ли бот:**
- Откройте Telegram
- Найдите бота
- Убедитесь, что можете отправить сообщение

2. **Очистите очередь обновлений:**
```bash
curl -X POST "https://api.telegram.org/bot8348357222:AAHzzrWFOE7n3MiGYKgugqXbUSehTW1-D1c/getUpdates?offset=-1"
```

3. **Проверьте, нет ли других ботов с тем же токеном:**
- Убедитесь, что только один экземпляр бота использует этот токен

## Полная диагностика

Для полной диагностики всех проблем запустите:

```bash
cd /var/www/tipa.taska.uz/telegram-bot
sudo ./fix-bot.sh
```

Этот скрипт проверит:
- ✅ Статус systemd сервиса
- ✅ Количество запущенных процессов
- ✅ Версию кода
- ✅ Подключение к Telegram API
- ✅ Ошибку 409 Conflict
- ✅ Последние логи

И предложит автоматическое исправление всех найденных проблем.

## Полезные команды

### Просмотр логов в реальном времени
```bash
sudo journalctl -u telegram-bot -f
```

### Просмотр последних 50 строк логов
```bash
sudo journalctl -u telegram-bot -n 50 --no-pager
```

### Перезапуск бота
```bash
sudo systemctl restart telegram-bot
```

### Проверка статуса
```bash
sudo systemctl status telegram-bot
```

### Проверка подключения к Telegram
```bash
cd /var/www/tipa.taska.uz/telegram-bot
./test-bot-connection.sh
```

### Проверка версии кода
```bash
cd /var/www/tipa.taska.uz/telegram-bot
grep "CODE_VERSION_AT_START" bot.py
```

### Проверка запущенных процессов
```bash
ps aux | grep "python.*bot.py" | grep -v grep
```

## Контакты и поддержка

Если проблема не решается:
1. Проверьте все шаги из этого руководства
2. Соберите логи: `sudo journalctl -u telegram-bot -n 100 > bot-logs.txt`
3. Проверьте версию кода в логах
4. Убедитесь, что код обновлен на сервере
