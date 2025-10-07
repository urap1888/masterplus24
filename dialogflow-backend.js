// Backend для интеграции с Google Dialogflow
// Запуск: node dialogflow-backend.js

const express = require('express');
const cors = require('cors');
const { SessionsClient } = require('@google-cloud/dialogflow');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Конфигурация Dialogflow
const DIALOGFLOW_CONFIG = {
    // Замените на ваши реальные данные
    PROJECT_ID: 'your-project-id', // ID проекта в Google Cloud
    CREDENTIALS_PATH: './credentials.json', // Путь к файлу с ключами
    LANGUAGE_CODE: 'ru', // Язык бота
    SESSION_ID: 'masterplus24-session' // ID сессии
};

// Инициализация Dialogflow клиента
let dialogflowClient;

try {
    dialogflowClient = new SessionsClient({
        keyFilename: DIALOGFLOW_CONFIG.CREDENTIALS_PATH,
        projectId: DIALOGFLOW_CONFIG.PROJECT_ID
    });
    console.log('✅ Dialogflow клиент инициализирован');
} catch (error) {
    console.error('❌ Ошибка инициализации Dialogflow:', error.message);
    console.log('💡 Убедитесь, что файл credentials.json существует и содержит корректные ключи');
}

// Функция для отправки запроса в Dialogflow
async function sendToDialogflow(message, sessionId = DIALOGFLOW_CONFIG.SESSION_ID) {
    try {
        if (!dialogflowClient) {
            throw new Error('Dialogflow клиент не инициализирован');
        }

        const sessionPath = dialogflowClient.projectAgentSessionPath(
            DIALOGFLOW_CONFIG.PROJECT_ID,
            sessionId
        );

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: DIALOGFLOW_CONFIG.LANGUAGE_CODE
                }
            }
        };

        console.log('📤 Отправляем в Dialogflow:', message);
        
        const responses = await dialogflowClient.detectIntent(request);
        const result = responses[0].queryResult;
        
        console.log('📥 Ответ от Dialogflow:', result.fulfillmentText);
        
        return {
            success: true,
            response: result.fulfillmentText,
            intent: result.intent?.displayName || 'Default Welcome Intent',
            confidence: result.intentDetectionConfidence || 0,
            parameters: result.parameters?.fields || {}
        };

    } catch (error) {
        console.error('❌ Ошибка Dialogflow:', error);
        return {
            success: false,
            error: error.message,
            fallbackResponse: 'Извините, произошла ошибка. Пожалуйста, свяжитесь с нами по телефону +375 29 284-84-34'
        };
    }
}

// API endpoint для чата
app.post('/api/chat', async (req, res) => {
    try {
        const { message, sessionId } = req.body;
        
        if (!message || !message.trim()) {
            return res.status(400).json({ 
                success: false,
                error: 'Сообщение не может быть пустым' 
            });
        }

        console.log('💬 Получено сообщение:', message);
        
        // Отправляем в Dialogflow
        const dialogflowResponse = await sendToDialogflow(message, sessionId);
        
        if (dialogflowResponse.success) {
            res.json({
                success: true,
                response: dialogflowResponse.response,
                intent: dialogflowResponse.intent,
                confidence: dialogflowResponse.confidence,
                parameters: dialogflowResponse.parameters,
                timestamp: new Date().toISOString()
            });
        } else {
            // Используем резервные ответы
            const fallbackResponse = getFallbackResponse(message);
            res.json({
                success: true,
                response: fallbackResponse,
                intent: 'fallback',
                confidence: 0.5,
                fallback: true,
                timestamp: new Date().toISOString()
            });
        }

    } catch (error) {
        console.error('💥 Chat API Error:', error);
        res.status(500).json({
            success: false,
            error: 'Внутренняя ошибка сервера',
            fallbackResponse: 'Спасибо за ваш вопрос! Наш специалист свяжется с вами для подробной консультации. Звоните +375 29 284-84-34'
        });
    }
});

// Резервные ответы (если Dialogflow недоступен)
function getFallbackResponse(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes('установка') || msg.includes('установить')) {
        return 'Отлично! Для установки кондиционера нужно знать площадь помещения и тип системы. Наш мастер может приехать для замеров. Стоимость установки от 150 руб.';
    } else if (msg.includes('ремонт')) {
        return 'Мы ремонтируем кондиционеры всех брендов. Диагностика стоит 50 руб., которые засчитываются при ремонте. Вызвать мастера?';
    } else if (msg.includes('обслуживание')) {
        return 'Регулярное обслуживание продлевает срок службы кондиционера. Базовое обслуживание от 80 руб. Предлагаем годовые контракты со скидкой.';
    } else if (msg.includes('цена') || msg.includes('стоимость')) {
        return 'Цены зависят от типа работ. Установка сплит-системы от 150 руб., ремонт от 80 руб., обслуживание от 80 руб. Точную стоимость определим после осмотра.';
    } else if (msg.includes('контакт') || msg.includes('телефон')) {
        return 'Наши контакты: +375 29 284-84-34, masterplus24.by@yandex.ru. Адрес: Минский р-н, Прилуки, ул. Мира 31/1. Работаем ежедневно 9:00-21:00.';
    } else {
        return 'Спасибо за ваш вопрос! Наш специалист свяжется с вами для подробной консультации. Оставьте заявку или звоните +375 29 284-84-34.';
    }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        service: 'Google Dialogflow Chat Backend',
        dialogflow_configured: !!dialogflowClient,
        timestamp: new Date().toISOString()
    });
});

// Endpoint для получения информации о намерениях
app.get('/api/intents', async (req, res) => {
    try {
        if (!dialogflowClient) {
            return res.json({
                success: false,
                message: 'Dialogflow не настроен'
            });
        }

        // Здесь можно добавить логику для получения списка намерений
        res.json({
            success: true,
            intents: [
                'Default Welcome Intent',
                'Installation Intent',
                'Repair Intent',
                'Maintenance Intent',
                'Pricing Intent',
                'Contact Intent'
            ]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Dialogflow Backend запущен на порту ${PORT}`);
    console.log(`🤖 Google Dialogflow интеграция готова`);
    console.log(`🔗 API endpoint: http://localhost:${PORT}/api/chat`);
    
    if (dialogflowClient) {
        console.log(`✅ Dialogflow клиент активен`);
    } else {
        console.log(`⚠️  Dialogflow клиент не настроен - используются резервные ответы`);
    }
});

module.exports = app;
