#!/bin/bash

# Скрипт для запуска Google Dialogflow чата
echo "🤖 Запуск Google Dialogflow чата для Masterplus 24"
echo "=================================================="

# Проверяем наличие Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не найден. Установите Node.js с https://nodejs.org"
    exit 1
fi

# Проверяем наличие npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm не найден. Установите npm"
    exit 1
fi

echo "✅ Node.js и npm найдены"

# Устанавливаем зависимости
echo "📦 Устанавливаем зависимости..."
npm install

# Проверяем конфигурацию
echo "🔍 Проверяем конфигурацию Dialogflow..."

if grep -q "your-project-id" dialogflow-backend.js; then
    echo "⚠️  ВНИМАНИЕ: Необходимо настроить Google Dialogflow"
    echo "📝 Отредактируйте файл dialogflow-backend.js:"
    echo "   - Замените 'your-project-id' на ваш Project ID"
    echo "   - Поместите файл credentials.json в корень проекта"
    echo ""
    echo "📖 Подробная инструкция в файле DIALOGFLOW_SETUP.md"
    echo ""
    read -p "Продолжить с резервными ответами? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Проверяем наличие credentials.json
if [ ! -f "credentials.json" ]; then
    echo "⚠️  Файл credentials.json не найден"
    echo "📝 Создайте файл credentials.json с ключами Google Cloud"
    echo "📖 Инструкция в DIALOGFLOW_SETUP.md"
    echo ""
    read -p "Продолжить без Dialogflow? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Запускаем backend
echo "🚀 Запускаем Dialogflow backend сервер..."
node dialogflow-backend.js &
BACKEND_PID=$!

# Ждем запуска backend
sleep 3

# Проверяем, что backend запустился
if curl -s http://localhost:3001/api/health > /dev/null; then
    echo "✅ Backend сервер запущен на порту 3001"
    
    # Проверяем статус Dialogflow
    HEALTH_RESPONSE=$(curl -s http://localhost:3001/api/health)
    if echo "$HEALTH_RESPONSE" | grep -q "dialogflow_configured.*true"; then
        echo "✅ Dialogflow клиент активен"
    else
        echo "⚠️  Dialogflow не настроен - используются резервные ответы"
    fi
else
    echo "❌ Ошибка запуска backend сервера"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Открываем сайт
echo "🌐 Открываем сайт..."
open index.html

echo ""
echo "🎉 Google Dialogflow чат запущен!"
echo "📱 Откройте чат на сайте и протестируйте"
echo "🔍 Проверьте консоль браузера для отладочной информации"
echo "🛑 Для остановки нажмите Ctrl+C"

# Показываем полезные команды
echo ""
echo "💡 Полезные команды:"
echo "   curl http://localhost:3001/api/health - проверка статуса"
echo "   curl http://localhost:3001/api/intents - список намерений"

# Ждем завершения
wait $BACKEND_PID
