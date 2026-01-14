# API для управления контентом сайтов

## Описание

Система управления контентом для сайта tipa.uz. Позволяет управлять логотипами партнеров, новостями, кейсами и тегами через админ-панель, а также получать данные через публичный API для отображения на сайте.

## Архитектура

### 1. Типы данных

Все типы определены в `types.ts`:

- **Tag** - Теги для категоризации контента
- **PartnerLogo** - Логотипы партнеров
- **News** - Новости с HTML контентом
- **Case** - Кейсы (портфолио проектов)

### 2. Backend API

#### Админ API (требует аутентификации)

Все endpoints находятся в `backend/endpoints/sites.endpoint.ts`:

- `api.partnerLogos.getAll()` - Получить все логотипы
- `api.partnerLogos.updateAll(logos)` - Сохранить все логотипы
- `api.news.getAll()` - Получить все новости
- `api.news.updateAll(news)` - Сохранить все новости
- `api.cases.getAll()` - Получить все кейсы
- `api.cases.updateAll(cases)` - Сохранить все кейсы
- `api.tags.getAll()` - Получить все теги
- `api.tags.updateAll(tags)` - Сохранить все теги

#### Публичный API (для сайта tipa.uz)

- `api.publicSites.getSiteData()` - Получить все опубликованные данные для сайта

Возвращает объект:
```typescript
{
  partnerLogos: PartnerLogo[]; // Отсортированы по order
  news: News[]; // Только опубликованные, отсортированы по дате (новые первыми)
  cases: Case[]; // Только опубликованные, отсортированы по order
  tags: Tag[]; // Все теги
}
```

### 3. Хранение данных

#### Firestore Collections

- `partnerLogos` - Логотипы партнеров
- `news` - Новости
- `cases` - Кейсы
- `tags` - Теги

#### Firebase Storage

Изображения хранятся в следующих папках:
- `sites/partner-logos/` - Логотипы партнеров (PNG)
- `sites/news/` - Изображения для новостей
- `sites/cases/` - Изображения для кейсов

### 4. Компоненты UI

#### SitesView (`components/sites/SitesView.tsx`)

Главный компонент для управления контентом с вкладками:
- **Логотипы партнеров** - управление логотипами
- **Новости** - создание и редактирование новостей
- **Кейсы** - управление портфолио
- **Теги** - создание и управление тегами

#### Особенности редактора

- **HTML редактор** для новостей и кейсов - поддерживает HTML теги для форматирования
- **Загрузка изображений** - автоматическая загрузка в Firebase Storage
- **Теги** - возможность привязывать теги к новостям и кейсам
- **Публикация** - флаг `published` для контроля видимости на сайте

### 5. Интеграция с сайтом tipa.uz

#### Вариант 1: Прямой вызов API (рекомендуется)

```javascript
// На сайте tipa.uz
const response = await fetch('https://your-api-url/api/publicSites/getSiteData');
const data = await response.json();

// data.partnerLogos - логотипы партнеров
// data.news - опубликованные новости
// data.cases - опубликованные кейсы
// data.tags - все теги
```

#### Вариант 2: REST API endpoint

Создать отдельный REST endpoint в бэкенде:

```typescript
// backend/endpoints/public.endpoint.ts
export const publicSitesEndpoint = {
  getSiteData: async (): Promise<SiteData> => {
    // Реализация из sites.endpoint.ts
  }
};
```

Затем на сайте tipa.uz:

```javascript
// GET /api/public/sites/data
fetch('/api/public/sites/data')
  .then(res => res.json())
  .then(data => {
    // Отобразить данные на сайте
  });
```

### 6. Пример использования на сайте

```html
<!-- Логотипы партнеров -->
<div class="partners">
  <div v-for="logo in siteData.partnerLogos" :key="logo.id">
    <a :href="logo.websiteUrl" target="_blank">
      <img :src="logo.logoUrl" :alt="logo.name" />
    </a>
  </div>
</div>

<!-- Новости -->
<div class="news">
  <article v-for="item in siteData.news" :key="item.id">
    <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.title" />
    <h2>{{ item.title }}</h2>
    <p>{{ item.excerpt }}</p>
    <div v-html="item.content"></div>
    <div class="tags">
      <span v-for="tagId in item.tags" :key="tagId">
        {{ getTagName(tagId) }}
      </span>
    </div>
  </article>
</div>

<!-- Кейсы -->
<div class="cases">
  <div v-for="caseItem in siteData.cases" :key="caseItem.id">
    <img v-if="caseItem.imageUrl" :src="caseItem.imageUrl" :alt="caseItem.title" />
    <h3>{{ caseItem.title }}</h3>
    <p v-if="caseItem.clientName">Клиент: {{ caseItem.clientName }}</p>
    <div v-html="caseItem.description"></div>
  </div>
</div>
```

### 7. Безопасность

- **Админ API** - требует аутентификации через систему пользователей
- **Публичный API** - возвращает только опубликованные записи (`published: true`)
- **Firebase Storage** - настройте правила доступа для публичного чтения изображений

### 8. Рекомендации по реализации на tipa.uz

1. **Кэширование** - кэшируйте данные на стороне сайта (например, каждые 5-10 минут)
2. **Обработка ошибок** - добавьте fallback для случаев, когда API недоступен
3. **Ленивая загрузка изображений** - используйте lazy loading для оптимизации
4. **SEO** - убедитесь, что контент индексируется поисковыми системами
5. **Мобильная версия** - адаптируйте отображение для мобильных устройств

### 9. Следующие шаги

1. Создать REST API endpoint для публичного доступа
2. Настроить CORS для разрешения запросов с tipa.uz
3. Реализовать кэширование на стороне сайта
4. Добавить мета-теги для SEO (title, description, og:image)
5. Реализовать пагинацию для больших списков новостей/кейсов
