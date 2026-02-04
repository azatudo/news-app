# News App (Expo / React Native)

Тестовое мобильное приложение на **Expo + React Native + TypeScript**, реализованное в рамках тестового задания Frontend Mobile Developer.

Проект демонстрирует работу с API, навигацией, локальным хранилищем, биометрией, push-уведомлениями и файловой системой.

---

## Стек технологий

- Expo (SDK 53+)
- React Native
- TypeScript
- React Navigation (Stack + Bottom Tabs)
- AsyncStorage
- Expo Local Authentication (Face ID)
- Expo Notifications (local push)
- Expo File System
- Expo Document Picker
- NewsAPI

---

## Реализованный функционал

### Новости
- Загрузка новостей с **NewsAPI**
- Обработка состояний loading / error
- Pull-to-refresh
- Пагинация (infinite scroll)
- Поиск по новостям

### Детали статьи
- Просмотр краткой информации
- Открытие полной статьи (WebView / браузер)
- Добавление в избранное

### Избранное
- Сохранение статей в AsyncStorage
- Удаление из избранного
- Persisted state между перезапусками приложения

### Биометрия
- Проверка Face ID / Touch ID
- Используется `expo-local-authentication`

### Push-уведомления
- Локальные push-уведомления
- Тестовая отправка уведомления из приложения
- Реализовано через `expo-notifications`

> В Expo Go есть ограничения — для полноценной поддержки рекомендуется development build

### Работа с файлами
- Выбор файла с устройства (Document Picker)
- Скачивание файла по URL
- Сохранение в `documentDirectory`
- Отдельный экран Files

### Навигация
- Bottom Tabs:
  - News
  - Favorites
  - Files
- Stack-навигация для экранов

---

## Переменные окружения

Создайте файл `.env` в корне проекта:

```env
EXPO_PUBLIC_NEWS_API_KEY=your_newsapi_key_here
```

Файл `.env` добавлен в `.gitignore` и не хранится в репозитории.

Пример доступен в `.env.example`.

---

## Запуск проекта

```bash
npm install
npm start
```

Запуск:
- iOS Simulator
- Android Emulator
- Web

---

## Ограничения NewsAPI

NewsAPI имеет лимит запросов (100 запросов / 24 часа для free-tier).
При превышении лимита приложение может отображать ошибку загрузки новостей — это ожидаемое поведение.

---

## Структура проекта

```
screens/
  ├─ NewsListScreen.tsx
  ├─ ArticleScreen.tsx
  ├─ FavoritesScreen.tsx
  ├─ FileScreen.tsx
services/
  └─ newsApi.ts
App.tsx
```

---

## Статус

Все пункты тестового задания реализованы.

Проект готов к демонстрации и защите.

---

## Автор

Aidar Akhmetzhanov
