# Деплой на demo.taska.uz

## Подготовка к деплою

1. **Сборка проекта:**
   ```bash
   npm install
   npm run build
   ```
   
   Это создаст папку `dist/` с готовыми файлами для продакшна.

2. **Содержимое папки `dist/`:**
   - `index.html` - главная страница
   - `assets/` - все JS, CSS и другие ресурсы
   - Все файлы готовы для загрузки на сервер

## Варианты деплоя

### Вариант 1: Статический хостинг (Vercel, Netlify, GitHub Pages)

**Vercel:**
```bash
npm i -g vercel
vercel --prod
```

**Netlify:**
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Вариант 2: Nginx на сервере

1. Загрузите содержимое папки `dist/` на сервер
2. Настройте Nginx:

```nginx
server {
    listen 80;
    server_name demo.taska.uz;

    root /var/www/taska.uz/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Кэширование статических файлов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
}
```

3. Перезапустите Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Вариант 3: Apache

1. Загрузите содержимое `dist/` в `/var/www/html/` или другую директорию
2. Создайте `.htaccess` в корне:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## SSL сертификат (HTTPS)

Рекомендуется использовать Let's Encrypt:

```bash
sudo certbot --nginx -d demo.taska.uz
```

Или для Apache:
```bash
sudo certbot --apache -d demo.taska.uz
```

## Проверка после деплоя

1. Откройте https://demo.taska.uz
2. Проверьте, что приложение загружается
3. Проверьте консоль браузера на ошибки
4. Убедитесь, что localStorage работает (данные сохраняются)

## Важные замечания

- Приложение полностью локальное, не требует backend
- Все данные хранятся в localStorage браузера
- Для каждого пользователя данные изолированы
- При очистке кэша браузера данные теряются (это нормально для демо)

