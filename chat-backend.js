// Backend для интеграции с Yandex GPT
// Запуск: node chat-backend.js

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Конфигурация Yandex GPT
const YANDEX_GPT_CONFIG = {
    // Замените на ваши реальные данные
    FOLDER_ID: 'YOUR_FOLDER_ID', // ID папки в Yandex Cloud
    IAM_TOKEN: 'YOUR_IAM_TOKEN', // IAM токен для аутентификации
    API_URL: 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion'
};

// Промпт для специализации на кондиционерах
const SYSTEM_PROMPT = `Ты эксперт-консультант по кондиционерам компании "Masterplus 24". 

Твоя специализация:
- Установка, ремонт и обслуживание кондиционеров
- Подбор кондиционеров по мощности и типу помещения
- Консультации по брендам MDV, TCL, Midea, ROYAL CLIMA
- Работа в Минске и Минской области
- Цены: установка от 150 руб., ремонт от 80 руб., обслуживание от 80 руб.
- Контакты: +375 29 284-84-34, masterplus24.by@yandex.ru
- Адрес: Минский р-н, Прилуки, ул. Мира 31/1
- Время работы: ежедневно 9:00-21:00

Отвечай кратко, по делу, дружелюбно. Всегда предлагай связаться с нами для подробной консультации.`;

// Функция для получения IAM токена (если нужно обновлять)
async function getIAMToken() {
    // Здесь должна быть логика получения IAM токена
    // Пока используем статический токен
    return YANDEX_GPT_CONFIG.IAM_TOKEN;
}

// Основная функция для запроса к Yandex GPT
async function getYandexGPTResponse(message, conversationHistory = []) {
    try {
        const iamToken = await getIAMToken();
        
        // Формируем историю разговора
        const messages = [
            {
                role: 'system',
                text: SYSTEM_PROMPT
            },
            ...conversationHistory,
            {
                role: 'user',
                text: message
            }
        ];

        const response = await fetch(YANDEX_GPT_CONFIG.API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${iamToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                modelUri: `gpt://${YANDEX_GPT_CONFIG.FOLDER_ID}/yandexgpt`,
                completionOptions: {
                    stream: false,
                    temperature: 0.7,
                    maxTokens: 1000
                },
                messages: messages
            })
        });

        if (!response.ok) {
            throw new Error(`Yandex GPT API error: ${response.status}`);
        }

        const data = await response.json();
        return data.result.alternatives[0].message.text;

    } catch (error) {
        console.error('Yandex GPT Error:', error);
        return 'Извините, произошла ошибка. Пожалуйста, свяжитесь с нами по телефону +375 29 284-84-34';
    }
}

// API endpoint для чата
app.post('/api/chat', async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;
        
        if (!message || !message.trim()) {
            return res.status(400).json({ error: 'Сообщение не может быть пустым' });
        }

        console.log('Получено сообщение:', message);
        
        // Получаем ответ от Yandex GPT
        const aiResponse = await getYandexGPTResponse(message, conversationHistory);
        
        console.log('Ответ Yandex GPT:', aiResponse);
        
        res.json({
            success: true,
            response: aiResponse,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        res.status(500).json({
            success: false,
            error: 'Внутренняя ошибка сервера',
            fallbackResponse: 'Спасибо за ваш вопрос! Наш специалист свяжется с вами для подробной консультации. Звоните +375 29 284-84-34'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        service: 'Yandex GPT Chat Backend',
        timestamp: new Date().toISOString()
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Chat Backend запущен на порту ${PORT}`);
    console.log(`📡 Yandex GPT интеграция готова`);
    console.log(`🔗 API endpoint: http://localhost:${PORT}/api/chat`);
});

module.exports = app;
