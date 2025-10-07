# 🤖 Настройка Yandex GPT для онлайн-чата

## 📋 Что нужно для запуска

### 1. Yandex Cloud аккаунт
- Зарегистрируйтесь на [cloud.yandex.ru](https://cloud.yandex.ru)
- Создайте платежный аккаунт
- Активируйте сервис Yandex GPT

### 2. Получение данных для API
1. **Folder ID** - ID папки в Yandex Cloud
2. **IAM Token** - токен для аутентификации

## 🔧 Настройка

### Шаг 1: Получите Folder ID
```bash
# В консоли Yandex Cloud
# Перейдите в раздел "Ресурсы" → "Папки"
# Скопируйте ID папки (например: b1g1234567890abcdef)
```

### Шаг 2: Получите IAM Token
```bash
# Через Yandex CLI
yc iam create-token

# Или через веб-интерфейс
# Перейдите в "Сервисные аккаунты" → "Создать токен"
```

### Шаг 3: Обновите конфигурацию
В файле `chat-backend.js` замените:
```javascript
const YANDEX_GPT_CONFIG = {
    FOLDER_ID: 'YOUR_FOLDER_ID', // Ваш реальный Folder ID
    IAM_TOKEN: 'YOUR_IAM_TOKEN', // Ваш реальный IAM Token
    API_URL: 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion'
};
```

## 🚀 Запуск

### 1. Установите зависимости
```bash
npm install
```

### 2. Запустите backend
```bash
npm start
# или для разработки
npm run dev
```

### 3. Откройте сайт
```bash
open index.html
```

## 🔍 Проверка работы

### 1. Проверьте backend
```bash
curl http://localhost:3001/api/health
```

### 2. Тестируйте чат
- Откройте чат на сайте
- Напишите любое сообщение
- Должен появиться индикатор "Печатает..."
- Получите ответ от Yandex GPT

## ⚙️ Настройки

### Температура ответов (креативность)
```javascript
temperature: 0.7, // 0.0 = строго, 1.0 = креативно
```

### Максимальная длина ответа
```javascript
maxTokens: 1000, // Количество токенов в ответе
```

### Системный промпт
Можно изменить в `chat-backend.js`:
```javascript
const SYSTEM_PROMPT = `Ты эксперт-консультант по кондиционерам...`;
```

## 🛡️ Безопасность

### 1. Скрытие токенов
```javascript
// Используйте переменные окружения
const YANDEX_GPT_CONFIG = {
    FOLDER_ID: process.env.YANDEX_FOLDER_ID,
    IAM_TOKEN: process.env.YANDEX_IAM_TOKEN
};
```

### 2. CORS настройки
```javascript
app.use(cors({
    origin: ['http://localhost', 'https://yourdomain.com'],
    credentials: true
}));
```

## 💰 Стоимость

- **Yandex GPT**: ~0.5₽ за 1000 токенов
- **Средний ответ**: 50-100 токенов
- **Примерная стоимость**: 0.025-0.05₽ за ответ

## 🔧 Устранение неполадок

### Ошибка 401 (Unauthorized)
- Проверьте IAM Token
- Убедитесь, что токен не истек

### Ошибка 403 (Forbidden)
- Проверьте Folder ID
- Убедитесь, что у вас есть доступ к Yandex GPT

### Ошибка 429 (Too Many Requests)
- Превышен лимит запросов
- Подождите или увеличьте лимиты

### Backend не запускается
```bash
# Проверьте порт
lsof -i :3001

# Установите зависимости
npm install express cors node-fetch
```

## 📞 Поддержка

При проблемах:
1. Проверьте логи в консоли браузера
2. Проверьте логи backend сервера
3. Убедитесь, что все токены корректны
4. Проверьте доступность Yandex GPT API

## 🎯 Готово!

После настройки ваш чат будет:
- ✅ Понимать любые вопросы
- ✅ Помнить контекст разговора
- ✅ Давать умные ответы
- ✅ Работать на русском языке
- ✅ Специализироваться на кондиционерах
