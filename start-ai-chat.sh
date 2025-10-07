#!/bin/bash

# Скрипт для запуска Yandex GPT чата
echo "🤖 Запуск Yandex GPT чата для Masterplus 24"
echo "=============================================="

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
echo "🔍 Проверяем конфигурацию..."

if grep -q "YOUR_FOLDER_ID" chat-backend.js; then
    echo "⚠️  ВНИМАНИЕ: Необходимо настроить Yandex GPT API"
    echo "📝 Отредактируйте файл chat-backend.js:"
    echo "   - Замените YOUR_FOLDER_ID на ваш Folder ID"
    echo "   - Замените YOUR_IAM_TOKEN на ваш IAM Token"
    echo ""
    echo "📖 Подробная инструкция в файле YANDEX_GPT_SETUP.md"
    echo ""
    read -p "Продолжить с резервными ответами? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Запускаем backend
echo "🚀 Запускаем backend сервер..."
node chat-backend.js &
BACKEND_PID=$!

# Ждем запуска backend
sleep 3

# Проверяем, что backend запустился
if curl -s http://localhost:3001/api/health > /dev/null; then
    echo "✅ Backend сервер запущен на порту 3001"
else
    echo "❌ Ошибка запуска backend сервера"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Открываем сайт
echo "🌐 Открываем сайт..."
open index.html

echo ""
echo "🎉 Yandex GPT чат запущен!"
echo "📱 Откройте чат на сайте и протестируйте"
echo "🛑 Для остановки нажмите Ctrl+C"

# Ждем завершения
wait $BACKEND_PID
