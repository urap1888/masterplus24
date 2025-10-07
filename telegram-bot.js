// Telegram Bot для отправки заявок
// Замените YOUR_BOT_TOKEN на токен вашего бота
const BOT_TOKEN = 'YOUR_BOT_TOKEN';
const CHAT_ID = 'YOUR_CHAT_ID'; // ID чата с номером +375 29 284-84-34

// Функция для отправки заявки в Telegram
async function sendToTelegram(formData) {
    try {
        const message = `
🔔 НОВАЯ ЗАЯВКА С САЙТА

👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
📧 Email: ${formData.email || 'Не указан'}
🏠 Адрес: ${formData.address || 'Не указан'}
💬 Сообщение: ${formData.message || 'Не указано'}
🕒 Время: ${new Date().toLocaleString('ru-RU')}
        `;

        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        if (response.ok) {
            console.log('Заявка успешно отправлена в Telegram');
            return true;
        } else {
            console.error('Ошибка отправки в Telegram:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Ошибка при отправке в Telegram:', error);
        return false;
    }
}

// Функция для отправки уведомления о калькуляторе
async function sendCalculatorResult(calculatorData) {
    try {
        const message = `
🧮 РЕЗУЛЬТАТ КАЛЬКУЛЯТОРА

👤 Имя: ${calculatorData.name}
📞 Телефон: ${calculatorData.phone}
🏠 Площадь: ${calculatorData.area} м²
🏢 Тип помещения: ${calculatorData.roomType}
💨 Тип кондиционера: ${calculatorData.acType}
💰 Примерная стоимость: ${calculatorData.estimatedPrice} руб.
🕒 Время: ${new Date().toLocaleString('ru-RU')}
        `;

        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        return response.ok;
    } catch (error) {
        console.error('Ошибка при отправке результата калькулятора:', error);
        return false;
    }
}

// Экспорт функций для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sendToTelegram, sendCalculatorResult };
}
