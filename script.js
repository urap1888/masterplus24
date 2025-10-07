// Telegram Bot Integration
// Замените на ваши данные
const TELEGRAM_BOT_TOKEN = '8313069916:AAEfNysrPdRvmDhKesjcbYwZ3Z2nP2BWzjs';
const TELEGRAM_CHAT_ID = '-1002963324268'; // ID супергруппы (обновленный Chat ID)

// Parts Catalog Functions
function showParts() {
    // Скрыть все секции кроме запчастей
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id !== 'parts') {
            section.style.display = 'none';
        }
    });
    
    // Показать секцию запчастей
    const partsSection = document.getElementById('parts');
    if (partsSection) {
        partsSection.classList.add('show');
        partsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Функция для возврата к основному виду
function showAllSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'block';
        // Убираем класс show у секции запчастей
        if (section.id === 'parts') {
            section.classList.remove('show');
        }
    });
}

// Blog Functions
function showBlog() {
    // Показать все секции
    showAllSections();
    
    const element = document.getElementById('blog');
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 50; // Увеличенный отступ
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Tab switching function
function switchTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Activate selected button
    const selectedButton = document.querySelector(`[onclick="switchTab('${tabName}')"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
}

// Calculator Functions
window.showCalculator = function() {
    // Показать все секции
    showAllSections();
    
    const calculatorSection = document.getElementById('calculator');
    if (calculatorSection) {
        calculatorSection.style.display = 'block';
        calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show clients from navigation only
function showClientsFromNav() {
    const clientsSection = document.getElementById('clients');
    
    // Показываем секцию клиентов
    clientsSection.style.display = 'block';
    
    // Smooth scroll to clients section
    clientsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// CRM Authentication
const CRM_PASSWORD = '1111'; // Измените на свой пароль
let isCrmAuthenticated = false;

// CRM Functions
function showCRM() {
    // Проверить аутентификацию
    if (!isCrmAuthenticated) {
        // Показать модальное окно входа
        document.getElementById('crmLoginModal').style.display = 'block';
        return;
    }
    
    // Показать все секции
    showAllSections();
    
    // Скрыть все секции кроме CRM
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id !== 'crm') {
            section.style.display = 'none';
        }
    });
    
    // Показать секцию CRM
    const crmSection = document.getElementById('crm');
    if (crmSection) {
        crmSection.classList.add('show');
        crmSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Загрузить данные клиентов
    loadClients();
}

// Проверка пароля CRM
window.checkCrmPassword = function(event) {
    event.preventDefault();
    
    const passwordInput = document.getElementById('crmPassword');
    const errorDiv = document.getElementById('crmLoginError');
    
    if (passwordInput.value === CRM_PASSWORD) {
        isCrmAuthenticated = true;
        document.getElementById('crmLoginModal').style.display = 'none';
        passwordInput.value = '';
        errorDiv.style.display = 'none';
        showCRM();
    } else {
        errorDiv.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// Закрыть окно входа в CRM
window.closeCrmLogin = function() {
    document.getElementById('crmLoginModal').style.display = 'none';
    document.getElementById('crmPassword').value = '';
    document.getElementById('crmLoginError').style.display = 'none';
}

// Выход из CRM
window.logoutCrm = function() {
    console.log('logoutCrm called'); // Отладка
    isCrmAuthenticated = false;
    
    // Скрыть CRM секцию
    const crmSection = document.getElementById('crm');
    if (crmSection) {
        crmSection.classList.remove('show');
        crmSection.style.display = 'none';
    }
    
    // Показать все остальные секции
    showAllSections();
    
    // Прокрутить к началу страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// CRM Data Management
let clientsData = [];

// Функция для загрузки данных из localStorage
function loadClientsFromStorage() {
    const savedClients = localStorage.getItem('clientsData');
    if (savedClients) {
        clientsData = JSON.parse(savedClients);
    } else {
        // Если нет сохраненных данных, загружаем демо-данные
        clientsData = [
            {
                id: 1,
                name: 'Александр Петров',
                phone: '+375 29 123-45-67',
                email: 'alex.petrov@email.com',
                address: 'Минск, ул. Ленина, 15',
                status: 'active',
                orders: [
                    {
                        id: 1,
                        service: 'Установка кондиционера',
                        date: '2024-01-15',
                        amount: 450,
                        status: 'completed'
                    },
                    {
                        id: 2,
                        service: 'Обслуживание',
                        date: '2024-03-20',
                        amount: 120,
                        status: 'completed'
                    }
                ]
            },
            {
                id: 2,
                name: 'Мария Иванова',
                phone: '+375 29 234-56-78',
                email: 'maria.ivanova@email.com',
                address: 'Минск, ул. Независимости, 45',
                status: 'vip',
                orders: [
                    {
                        id: 3,
                        service: 'Ремонт кондиционера',
                        date: '2024-02-10',
                        amount: 320,
                        status: 'completed'
                    },
                    {
                        id: 4,
                        service: 'Запчасти',
                        date: '2024-04-05',
                        amount: 180,
                        status: 'active'
                    }
                ]
            },
            {
                id: 3,
                name: 'Дмитрий Сидоров',
                phone: '+375 29 345-67-89',
                email: 'dmitry.sidorov@email.com',
                address: 'Минск, ул. Пушкина, 23',
                status: 'new',
                orders: [
                    {
                        id: 5,
                        service: 'Установка кондиционера',
                        date: '2024-04-12',
                        amount: 520,
                        status: 'active'
                    }
                ]
            }
        ];
        saveClientsToStorage();
    }
}

// Функция для сохранения данных в localStorage
function saveClientsToStorage() {
    localStorage.setItem('clientsData', JSON.stringify(clientsData));
}

function loadClients() {
    // Загружаем данные из localStorage
    loadClientsFromStorage();
    
    const tbody = document.getElementById('clientsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    clientsData.forEach(client => {
        const lastOrder = client.orders[client.orders.length - 1];
        const totalAmount = client.orders.reduce((sum, order) => sum + order.amount, 0);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="client-info-cell">
                    <div class="client-avatar-small">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="client-details-small">
                        <h4>${client.name}</h4>
                        <p>ID: ${client.id}</p>
                    </div>
                </div>
            </td>
            <td>
                <div class="contact-info">
                    <div class="phone">${client.phone}</div>
                    <div>${client.email}</div>
                </div>
            </td>
            <td>
                <div>
                    <strong>${lastOrder ? lastOrder.service : 'Нет заказов'}</strong>
                    <div style="font-size: 0.8rem; color: #64748b;">
                        ${lastOrder ? new Date(lastOrder.date).toLocaleDateString('ru-RU') : ''}
                    </div>
                </div>
            </td>
            <td>
                <span class="status-badge status-${client.status}">
                    ${getStatusText(client.status)}
                </span>
            </td>
            <td>
                <div class="amount">${totalAmount} BYN</div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewClient(${client.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" onclick="editClient(${client.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteClient(${client.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    updateStats();
}

function getStatusText(status) {
    const statusMap = {
        'new': 'Новый',
        'active': 'Активный',
        'completed': 'Завершен',
        'vip': 'VIP'
    };
    return statusMap[status] || status;
}

function updateStats() {
    const totalClients = clientsData.length;
    const activeOrders = clientsData.reduce((count, client) => 
        count + client.orders.filter(order => order.status === 'active').length, 0);
    const totalRevenue = clientsData.reduce((sum, client) => 
        sum + client.orders.reduce((clientSum, order) => clientSum + order.amount, 0), 0);
    const vipClients = clientsData.filter(client => client.status === 'vip').length;
    
    document.getElementById('totalClients').textContent = totalClients;
    document.getElementById('activeOrders').textContent = activeOrders;
    document.getElementById('totalRevenue').textContent = totalRevenue + ' BYN';
    document.getElementById('vipClients').textContent = vipClients;
}

// Глобальные функции для CRM
window.searchClients = function() {
    console.log('searchClients called');
    const searchTerm = document.getElementById('clientSearch').value.toLowerCase();
    const filteredClients = clientsData.filter(client => 
        client.name.toLowerCase().includes(searchTerm) ||
        client.phone.includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm)
    );
    
    // Обновить таблицу с отфильтрованными данными
    updateTableWithClients(filteredClients);
}

window.filterClients = function() {
    console.log('filterClients called');
    const statusFilter = document.getElementById('statusFilter').value;
    const serviceFilter = document.getElementById('serviceFilter').value;
    
    console.log('Фильтры:', { statusFilter, serviceFilter });
    console.log('Всего клиентов:', clientsData.length);
    
    let filteredClients = clientsData;
    
    if (statusFilter) {
        filteredClients = filteredClients.filter(client => client.status === statusFilter);
        console.log('После фильтра по статусу:', filteredClients.length);
    }
    
    if (serviceFilter) {
        filteredClients = filteredClients.filter(client => 
            client.orders.some(order => order.service.toLowerCase().includes(serviceFilter.toLowerCase()))
        );
        console.log('После фильтра по услуге:', filteredClients.length);
    }
    
    console.log('Итоговый результат:', filteredClients.length);
    updateTableWithClients(filteredClients);
}

// Функция сброса фильтров
window.resetFilters = function() {
    console.log('resetFilters called');
    document.getElementById('statusFilter').value = '';
    document.getElementById('serviceFilter').value = '';
    document.getElementById('clientSearch').value = '';
    loadClients(); // Показываем всех клиентов
}

function updateTableWithClients(clients) {
    const tbody = document.getElementById('clientsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    clients.forEach(client => {
        const lastOrder = client.orders[client.orders.length - 1];
        const totalAmount = client.orders.reduce((sum, order) => sum + order.amount, 0);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="client-info-cell">
                    <div class="client-avatar-small">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="client-details-small">
                        <h4>${client.name}</h4>
                        <p>ID: ${client.id}</p>
                    </div>
                </div>
            </td>
            <td>
                <div class="contact-info">
                    <div class="phone">${client.phone}</div>
                    <div>${client.email}</div>
                </div>
            </td>
            <td>
                <div>
                    <strong>${lastOrder ? lastOrder.service : 'Нет заказов'}</strong>
                    <div style="font-size: 0.8rem; color: #64748b;">
                        ${lastOrder ? new Date(lastOrder.date).toLocaleDateString('ru-RU') : ''}
                    </div>
                </div>
            </td>
            <td>
                <span class="status-badge status-${client.status}">
                    ${getStatusText(client.status)}
                </span>
            </td>
            <td>
                <div class="amount">${totalAmount} BYN</div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewClient(${client.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" onclick="editClient(${client.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteClient(${client.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function viewClient(clientId) {
    const client = clientsData.find(c => c.id === clientId);
    if (!client) return;
    
    // Заполнить модальное окно данными клиента
    document.getElementById('clientName').textContent = client.name;
    document.getElementById('clientPhone').textContent = client.phone;
    document.getElementById('clientEmail').textContent = client.email;
    document.getElementById('clientAddress').textContent = client.address;
    
    // Заполнить историю заказов
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = '';
    
    client.orders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-info">
                <h5>${order.service}</h5>
                <p>Дата: ${new Date(order.date).toLocaleDateString('ru-RU')}</p>
                <p>Статус: ${getStatusText(order.status)}</p>
            </div>
            <div class="order-amount">${order.amount} BYN</div>
        `;
        ordersList.appendChild(orderItem);
    });
    
    // Показать модальное окно
    document.getElementById('clientModal').style.display = 'block';
}

window.addNewClient = function() {
    console.log('addNewClient called');
    const modal = document.getElementById('addClientModal');
    modal.style.display = 'flex';
    modal.classList.add('show');
    document.getElementById('addClientModalTitle').textContent = 'Добавить клиента';
    document.getElementById('clientForm').reset();
    document.getElementById('clientForm').removeAttribute('data-edit-id');
    
    // Блокируем прокрутку фона
    document.body.style.overflow = 'hidden';
    
    // Прокручиваем к началу модального окна (для мобильных)
    setTimeout(() => {
        modal.scrollTop = 0;
    }, 100);
    
    // Автоматически заполняем дату сегодняшним днем
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('orderDateInput').value = today;
}

window.editClient = function(clientId) {
    if (clientId) {
        const client = clientsData.find(c => c.id === clientId);
        if (!client) return;
        
        // Заполнить форму данными клиента
        document.getElementById('clientNameInput').value = client.name;
        document.getElementById('clientPhoneInput').value = client.phone;
        document.getElementById('clientEmailInput').value = client.email;
        document.getElementById('clientAddressInput').value = client.address;
        document.getElementById('clientStatusInput').value = client.status;
        
        document.getElementById('addClientModalTitle').textContent = 'Редактировать клиента';
        
        // Сохранить ID редактируемого клиента
        document.getElementById('clientForm').setAttribute('data-edit-id', clientId);
    }
    
    const modal = document.getElementById('addClientModal');
    modal.style.display = 'flex';
    modal.classList.add('show');
    
    // Блокируем прокрутку фона
    document.body.style.overflow = 'hidden';
    
    // Прокручиваем к началу модального окна (для мобильных)
    setTimeout(() => {
        modal.scrollTop = 0;
    }, 100);
}

function deleteClient(clientId) {
    if (confirm('Вы уверены, что хотите удалить этого клиента?')) {
        clientsData = clientsData.filter(c => c.id !== clientId);
        saveClientsToStorage(); // Сохраняем в localStorage
        loadClients();
    }
}

window.closeClientModal = function() {
    document.getElementById('clientModal').style.display = 'none';
}

window.closeCrmClientModal = function() {
    document.getElementById('crmClientModal').style.display = 'none';
}

window.closeAddClientModal = function() {
    const modal = document.getElementById('addClientModal');
    modal.style.display = 'none';
    modal.classList.remove('show');
    
    // Разблокируем прокрутку фона
    document.body.style.overflow = '';
}

window.addOrder = function() {
    alert('Функция добавления заказа будет реализована в следующей версии');
}

window.sendNotification = function() {
    alert('Функция уведомлений будет реализована в следующей версии');
}

// Обработка формы клиента
document.addEventListener('DOMContentLoaded', function() {
    const clientForm = document.getElementById('clientForm');
    if (clientForm) {
        clientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(clientForm);
            const editId = clientForm.getAttribute('data-edit-id');
            
            if (editId) {
                // Редактирование существующего клиента
                const clientIndex = clientsData.findIndex(c => c.id == editId);
                if (clientIndex !== -1) {
                    clientsData[clientIndex].name = formData.get('name');
                    clientsData[clientIndex].phone = formData.get('phone');
                    clientsData[clientIndex].email = formData.get('email');
                    clientsData[clientIndex].address = formData.get('address');
                    clientsData[clientIndex].status = formData.get('status');
                    
                    saveClientsToStorage(); // Сохраняем в localStorage
                    alert('Клиент успешно обновлен!');
                }
            } else {
                // Добавление нового клиента
                const clientData = {
                    id: Math.max(...clientsData.map(c => c.id), 0) + 1,
                    name: formData.get('name'),
                    phone: formData.get('phone'),
                    email: formData.get('email'),
                    address: formData.get('address'),
                    status: formData.get('status'),
                    orders: []
                };
                
                // Добавляем заказ, если указаны данные
                const orderService = formData.get('orderService');
                const orderDate = formData.get('orderDate');
                const orderAmount = formData.get('orderAmount');
                const orderStatus = formData.get('orderStatus');
                const orderComments = formData.get('orderComments');
                
                if (orderService && orderDate && orderAmount) {
                    const orderData = {
                        id: Math.max(...clientsData.flatMap(c => c.orders).map(o => o.id), 0) + 1,
                        service: orderService,
                        date: orderDate,
                        amount: parseFloat(orderAmount),
                        status: orderStatus || 'active',
                        comments: orderComments || ''
                    };
                    clientData.orders.push(orderData);
                }
                
                clientsData.push(clientData);
                saveClientsToStorage(); // Сохраняем в localStorage
                alert('Клиент успешно добавлен!');
            }
            
            loadClients();
            closeAddClientModal();
            
            // Очистить атрибут редактирования
            clientForm.removeAttribute('data-edit-id');
        });
    }
});

// Простая оптимизация загрузки изображений
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback для старых браузеров
        lazyImages.forEach(img => img.classList.add('loaded'));
    }
});

// Функция для тестирования Telegram бота (вызывается из консоли)
window.testTelegram = async function() {
    if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN' || TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID') {
        console.log('❌ Сначала настройте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в script.js');
        return;
    }
    
    const testData = {
        name: 'Тест Тестов',
        phone: '+375 (29) 284-84-34',
        address: 'Минск, ул. Тестовая 1',
        service: 'installation',
        comments: 'Тестовое сообщение для проверки работы Telegram бота'
    };
    
    console.log('📤 Отправляем тестовую заявку...');
    const result = await sendToTelegram(testData);
    
    if (result) {
        console.log('✅ Тестовая заявка отправлена успешно!');
    } else {
        console.log('❌ Ошибка отправки тестовой заявки');
    }
};

// Функция для тестирования отправки в группу (вызывается из консоли)
window.testGroupTelegram = async function() {
    console.log('🧪 Тестируем отправку в группу...');
    console.log('Токен бота:', TELEGRAM_BOT_TOKEN);
    console.log('Chat ID группы:', TELEGRAM_CHAT_ID);
    console.log('Chat ID (число):', parseInt(TELEGRAM_CHAT_ID));
    
    const testData = {
        name: 'Тест группы',
        phone: '+375 (29) 284-84-34',
        address: 'Минск, ул. Тестовая 1',
        service: 'installation',
        comments: 'Тестовое сообщение для проверки работы в группе MP24'
    };
    
    const result = await sendToTelegram(testData);
    
    if (result) {
        console.log('✅ Тестовое сообщение отправлено в группу MP24!');
    } else {
        console.log('❌ Ошибка отправки в группу MP24');
    }
};

// Функция для проверки настроек бота (вызывается из консоли)
window.checkBotSettings = async function() {
    console.log('🔍 Проверяем настройки бота...');
    console.log('Токен бота:', TELEGRAM_BOT_TOKEN);
    console.log('Chat ID группы:', TELEGRAM_CHAT_ID);
    console.log('Chat ID (число):', parseInt(TELEGRAM_CHAT_ID));
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`);
        const data = await response.json();
        
        if (data.ok) {
            console.log('✅ Бот найден:', data.result.first_name, '@' + data.result.username);
        } else {
            console.error('❌ Ошибка бота:', data.description);
        }
    } catch (error) {
        console.error('❌ Ошибка проверки бота:', error);
    }
};

// Функция для отправки заявки в Telegram
async function sendToTelegram(formData) {
    try {
        // Проверяем настройки
        if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN' || TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID') {
            console.error('❌ Telegram бот не настроен! Замените TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в script.js');
            return false;
        }

        const message = `🔔 НОВАЯ ЗАЯВКА С САЙТА

👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
📧 Email: ${formData.email || 'Не указан'}
🏠 Адрес: ${formData.address || 'Не указан'}
🔧 Услуга: ${formData.service || 'Не указана'}
💬 Комментарий: ${formData.comments || 'Не указано'}
🕒 Время: ${new Date().toLocaleString('ru-RU')}`;

        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: parseInt(TELEGRAM_CHAT_ID),
                text: message,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();

        if (response.ok && data.ok) {
            console.log('✅ Заявка успешно отправлена в Telegram');
            return true;
        } else {
            console.error('❌ Ошибка отправки в Telegram:', data);
            console.error('📊 Детали запроса:');
            console.error('- Токен бота:', TELEGRAM_BOT_TOKEN);
            console.error('- Chat ID:', TELEGRAM_CHAT_ID);
            console.error('- Chat ID (число):', parseInt(TELEGRAM_CHAT_ID));
            console.error('- Сообщение:', message);
            
            // Детальная диагностика ошибок
            if (data.error_code === 400) {
                if (data.description.includes('chat not found')) {
                    console.error('❌ Chat ID неверный или бот не может найти чат');
                    console.error('💡 Решение: Проверьте Chat ID или отправьте боту команду /start');
                } else if (data.description.includes('group chat was upgraded to a supergroup chat')) {
                    console.error('❌ Группа была обновлена до супергруппы!');
                    console.error('💡 Новый Chat ID:', data.parameters?.migrate_to_chat_id);
                    console.error('💡 Обновите TELEGRAM_CHAT_ID в script.js на:', data.parameters?.migrate_to_chat_id);
                } else if (data.description.includes('Bad Request')) {
                    console.error('❌ Неверный запрос к Telegram API');
                    console.error('💡 Решение: Проверьте токен бота');
                } else {
                    console.error('❌ Неизвестная ошибка 400:', data.description);
                }
            } else if (data.error_code === 401) {
                console.error('❌ Неверный токен бота');
                console.error('💡 Решение: Проверьте правильность токена');
            } else {
                console.error('❌ Неизвестная ошибка:', data.error_code, data.description);
            }
            
            return false;
        }
    } catch (error) {
        console.error('❌ Ошибка при отправке в Telegram:', error);
        return false;
    }
}

// Функция для отправки сообщений чата в Telegram
async function sendChatToTelegram(message) {
    try {
        const telegramMessage = `💬 СООБЩЕНИЕ ИЗ ЧАТА

📝 Текст: ${message}
🕒 Время: ${new Date().toLocaleString('ru-RU')}`;

        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: telegramMessage,
                parse_mode: 'HTML'
            })
        });

        if (response.ok) {
            console.log('Сообщение чата отправлено в Telegram');
            return true;
        } else {
            console.error('Ошибка отправки сообщения чата в Telegram:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Ошибка при отправке сообщения чата в Telegram:', error);
        return false;
    }
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (hamburger && navMenu) {
        const isClickInsideNav = navMenu.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Close mobile menu on scroll
window.addEventListener('scroll', () => {
    if (hamburger && navMenu && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for navigation links with fixed header offset
function scrollToSection(sectionId) {
    console.log('scrollToSection called with:', sectionId);
    const element = document.getElementById(sectionId);
    console.log('Element found:', element);
    
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20; // 20px дополнительный отступ для фиксированного header
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    } else {
        console.error('Element not found:', sectionId);
        // Показываем все доступные элементы с id
        const allElements = document.querySelectorAll('[id]');
        console.log('Available elements with id:', Array.from(allElements).map(el => el.id));
    }
}

// Add click event listeners to navigation links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            scrollToSection(href.substring(1));
        }
    });
});

// Add click event listeners to hero buttons
document.querySelectorAll('.hero-buttons .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const onclick = button.getAttribute('onclick');
        if (onclick) {
            eval(onclick);
        }
    });
});

// Discount Modal Functions
const modal = document.getElementById('discountModal');
const closeModal = document.querySelector('.close');

function showDiscountModal(type) {
    const modalTitle = document.getElementById('modalTitle');
    const discountType = document.getElementById('discountType');
    
    // Set modal title based on discount type
    switch(type) {
        case 'online':
            modalTitle.textContent = 'Получить скидку 10% при заказе онлайн';
            discountType.value = 'online';
            break;
        case 'pensioner':
            modalTitle.textContent = 'Получить скидку 20% для пенсионеров';
            discountType.value = 'pensioner';
            break;
        case 'family':
            modalTitle.textContent = 'Получить скидку 20% для многодетных семей';
            discountType.value = 'family';
            break;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideDiscountModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking X
closeModal.addEventListener('click', hideDiscountModal);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideDiscountModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        hideDiscountModal();
    }
});

// Discount Form Submission
const discountForm = document.getElementById('discountForm');
if (discountForm) {
    discountForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(discountForm);
    const data = Object.fromEntries(formData);
    
    // Show success message
    showNotification('Заявка на скидку отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
    
    // Reset form
    discountForm.reset();
    hideDiscountModal();
    
    // Here you would typically send the data to your server
    console.log('Discount application:', data);
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!data.name || !data.phone || !data.service) {
        showNotification('Пожалуйста, заполните все обязательные поля', 'error');
        return;
    }
    
    // Show success message
    showNotification('Заявка отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Here you would typically send the data to your server
    console.log('Contact form submission:', data);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 3000;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(notificationStyle);

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .brand-card, .discount-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.service-card, .brand-card, .discount-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Add scroll listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animation check on load
    animateOnScroll();
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Phone number formatting
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    // Если номер начинается с 8, заменяем на +375
    if (value.startsWith('8')) {
        value = '375' + value.slice(1);
    }
    
    // Если номер начинается с 375, оставляем как есть
    if (value.startsWith('375')) {
        value = value;
    }
    
    // Если номер не начинается с 375, добавляем 375
    if (!value.startsWith('375') && value.length > 0) {
        value = '375' + value;
    }
    
    // Форматируем номер
    if (value.length > 4) {
        if (value.length <= 6) {
            value = `+375 (${value.slice(4)}`;
        } else if (value.length <= 9) {
            value = `+375 (${value.slice(4, 6)}) ${value.slice(6)}`;
        } else if (value.length <= 11) {
            value = `+375 (${value.slice(4, 6)}) ${value.slice(6, 9)}-${value.slice(9)}`;
        } else {
            value = `+375 (${value.slice(4, 6)}) ${value.slice(6, 9)}-${value.slice(9, 11)}-${value.slice(11, 13)}`;
        }
    }
    
    input.value = value;
}

// Функция для получения номера телефона как есть
function getFullPhoneNumber() {
    const phoneInput = document.getElementById('phone');
    return phoneInput.value.trim();
}

// Phone link click tracking
window.trackPhoneClick = function() {
    console.log('Phone number clicked: +375 29 284-84-34');
    // Here you can add analytics tracking
}

// Email link click tracking
function trackEmailClick() {
    console.log('Email clicked: masterplus24.by@yandex.ru');
    // Here you can add analytics tracking
}

// Add phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', () => {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', () => formatPhoneNumber(input));
    });
});

// Discount calculator
function calculateDiscount(originalPrice, discountType) {
    let discountPercent = 0;
    
    switch(discountType) {
        case 'online':
            discountPercent = 10;
            break;
        case 'pensioner':
        case 'family':
            discountPercent = 20;
            break;
    }
    
    const discountAmount = (originalPrice * discountPercent) / 100;
    const finalPrice = originalPrice - discountAmount;
    
    return {
        originalPrice,
        discountPercent,
        discountAmount,
        finalPrice
    };
}

// Add discount calculator to modal
function addDiscountCalculator() {
    const modalContent = document.querySelector('.modal-content');
    const calculatorHTML = `
        <div class="discount-calculator" style="margin-top: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px;">
            <h4>Калькулятор скидки</h4>
            <div class="form-group">
                <label>Стоимость услуг (руб.):</label>
                <input type="number" id="servicePrice" placeholder="Введите стоимость" min="0">
            </div>
            <div id="discountResult" style="display: none; margin-top: 1rem; padding: 1rem; background: white; border-radius: 8px; border-left: 4px solid #10b981;">
                <p><strong>Итоговая стоимость:</strong> <span id="finalPrice"></span> руб.</p>
                <p><strong>Экономия:</strong> <span id="savings"></span> руб.</p>
            </div>
        </div>
    `;
    
    modalContent.insertAdjacentHTML('beforeend', calculatorHTML);
    
    const priceInput = document.getElementById('servicePrice');
    const discountType = document.getElementById('discountType');
    const resultDiv = document.getElementById('discountResult');
    const finalPriceSpan = document.getElementById('finalPrice');
    const savingsSpan = document.getElementById('savings');
    
    function updateCalculator() {
        const price = parseFloat(priceInput.value);
        const type = discountType.value;
        
        if (price > 0 && type) {
            const result = calculateDiscount(price, type);
            finalPriceSpan.textContent = result.finalPrice.toLocaleString();
            savingsSpan.textContent = result.discountAmount.toLocaleString();
            resultDiv.style.display = 'block';
        } else {
            resultDiv.style.display = 'none';
        }
    }
    
    priceInput.addEventListener('input', updateCalculator);
    discountType.addEventListener('change', updateCalculator);
}

// Initialize discount calculator when modal opens
const originalShowDiscountModal = showDiscountModal;
showDiscountModal = function(type) {
    originalShowDiscountModal(type);
    setTimeout(addDiscountCalculator, 100);
};

// Lazy loading for images (when they are added)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add loading states to forms
function addLoadingState(form, button) {
    const originalText = button.textContent;
    button.textContent = 'Отправка...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Add loading states to form submissions
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                addLoadingState(form, submitButton);
            }
        });
    });
});

// Add smooth reveal animations for sections
function revealSections() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 150;
        
        if (sectionTop < window.innerHeight - sectionVisible) {
            section.classList.add('revealed');
        }
    });
}

// Add reveal animation styles
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    section {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero {
        opacity: 1;
        transform: none;
    }
`;
document.head.appendChild(revealStyle);

// Initialize section reveal
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', revealSections);
    revealSections(); // Check on load
});

// Blog Modal Functions
function openBlogModal(articleId) {
    console.log('openBlogModal called with articleId:', articleId);
    const modal = document.getElementById('blogModal');
    console.log('Modal element:', modal);
    
    if (!modal) {
        console.error('Modal not found!');
        return;
    }
    
    const articles = {
        1: {
            title: 'Как правильно выбрать кондиционер для квартиры',
            date: '20 сентября 2024',
            category: 'Выбор',
            image: 'images/condition_tipes_001.jpeg',
            content: `
                <h3>Основные критерии выбора</h3>
                <p>При выборе кондиционера для квартиры важно учитывать несколько ключевых факторов:</p>
                
                <h4>1. Мощность охлаждения</h4>
                <p>Для расчета необходимой мощности используйте формулу: <strong>1 кВт на 10 м²</strong> площади помещения. Для комнаты 20 м² потребуется кондиционер мощностью 2 кВт.</p>
                
                <h4>2. Тип кондиционера</h4>
                <ul>
                    <li><strong>Сплит-система</strong> - оптимальный выбор для квартир</li>
                    <li><strong>Мульти-сплит</strong> - для охлаждения нескольких комнат</li>
                    <li><strong>Мобильный</strong> - для временного использования</li>
                </ul>
                
                <h4>3. Энергоэффективность</h4>
                <p>Обращайте внимание на класс энергоэффективности. Класс A+++ обеспечивает максимальную экономию электроэнергии.</p>
                
                <h4>4. Дополнительные функции</h4>
                <ul>
                    <li>Wi-Fi управление</li>
                    <li>Ионизация воздуха</li>
                    <li>Фильтры от аллергенов</li>
                    <li>Тихий режим работы</li>
                </ul>
                
                <h3>Рекомендации по брендам</h3>
                <p>Для квартир рекомендуем следующие бренды:</p>
                <ul>
                    <li><strong>MDV</strong> - отличное соотношение цена/качество</li>
                    <li><strong>TCL</strong> - современные технологии и умные функции</li>
                    <li><strong>Gree</strong> - надежность и долговечность</li>
                </ul>
                
                <h3>Советы по установке</h3>
                <p>Правильная установка кондиционера влияет на его эффективность и срок службы. Обязательно обратитесь к профессионалам для монтажа.</p>
            `
        },
        2: {
            title: 'Регулярное обслуживание кондиционера: зачем и как часто',
            date: '15 сентября 2024',
            category: 'Обслуживание',
            image: 'images/obsl.jpeg',
            content: `
                <h3>Зачем нужно обслуживание кондиционера</h3>
                <p>Регулярное обслуживание кондиционера необходимо для:</p>
                <ul>
                    <li>Поддержания эффективности работы</li>
                    <li>Предотвращения поломок</li>
                    <li>Обеспечения чистоты воздуха</li>
                    <li>Продления срока службы оборудования</li>
                </ul>
                
                <h4>Что включает в себя обслуживание</h4>
                <p>Полное техническое обслуживание включает:</p>
                <ul>
                    <li>Очистку фильтров</li>
                    <li>Проверку уровня хладагента</li>
                    <li>Очистку теплообменников</li>
                    <li>Проверку электрических соединений</li>
                    <li>Тестирование всех функций</li>
                </ul>
                
                <h3>Как часто проводить обслуживание</h3>
                <p><strong>Рекомендуемая периодичность:</strong></p>
                <ul>
                    <li><strong>Ежемесячно</strong> - очистка фильтров (можно делать самостоятельно)</li>
                    <li><strong>Каждые 3 месяца</strong> - базовое обслуживание</li>
                    <li><strong>Раз в год</strong> - полное техническое обслуживание</li>
                </ul>
                
                <h4>Признаки необходимости обслуживания</h4>
                <ul>
                    <li>Снижение эффективности охлаждения</li>
                    <li>Увеличение потребления электроэнергии</li>
                    <li>Неприятные запахи</li>
                    <li>Повышенный уровень шума</li>
                </ul>
                
                <h3>Самостоятельное обслуживание</h3>
                <p>Некоторые процедуры можно выполнять самостоятельно:</p>
                <ol>
                    <li>Очистка фильтров под проточной водой</li>
                    <li>Очистка наружного блока от листьев и мусора</li>
                    <li>Проверка работы пульта управления</li>
                </ol>
                
                <p><strong>Важно:</strong> Для сложных работ всегда обращайтесь к специалистам!</p>
            `
        },
        3: {
            title: 'Топ-5 ошибок при установке кондиционеров',
            date: '10 сентября 2024',
            category: 'Монтаж',
            image: 'images/kond1.jpeg',
            content: `
                <h3>Самые частые ошибки при монтаже</h3>
                <p>Неправильная установка кондиционера может привести к серьезным проблемам. Рассмотрим основные ошибки:</p>
                
                <h4>1. Неправильный выбор места установки</h4>
                <p><strong>Проблема:</strong> Установка внутреннего блока над кроватью или рабочим местом</p>
                <p><strong>Последствия:</strong> Прямой поток холодного воздуха вызывает простуды</p>
                <p><strong>Решение:</strong> Устанавливайте блок так, чтобы воздух не дул на людей</p>
                
                <h4>2. Недостаточная длина трассы</h4>
                <p><strong>Проблема:</strong> Слишком длинная или короткая трасса между блоками</p>
                <p><strong>Последствия:</strong> Снижение эффективности, перегрузка компрессора</p>
                <p><strong>Решение:</strong> Оптимальная длина трассы 3-15 метров</p>
                
                <h4>3. Неправильный уклон дренажа</h4>
                <p><strong>Проблема:</strong> Отсутствие уклона или обратный уклон дренажной трубки</p>
                <p><strong>Последствия:</strong> Застой воды, протечки, плесень</p>
                <p><strong>Решение:</strong> Уклон не менее 3° в сторону улицы</p>
                
                <h4>4. Некачественная изоляция трассы</h4>
                <p><strong>Проблема:</strong> Отсутствие или плохая изоляция медных труб</p>
                <p><strong>Последствия:</strong> Потери холода, конденсат, коррозия</p>
                <p><strong>Решение:</strong> Использование качественной изоляции толщиной 15-20 мм</p>
                
                <h4>5. Неправильная заправка хладагентом</h4>
                <p><strong>Проблема:</strong> Недостаточное или избыточное количество фреона</p>
                <p><strong>Последствия:</strong> Снижение эффективности, поломка компрессора</p>
                <p><strong>Решение:</strong> Точная заправка по весу и давлению</p>
                
                <h3>Как избежать ошибок</h3>
                <ul>
                    <li>Обращайтесь только к сертифицированным мастерам</li>
                    <li>Проверяйте наличие гарантии на работы</li>
                    <li>Требуйте сертификаты и лицензии</li>
                    <li>Не экономьте на качестве монтажа</li>
                </ul>
                
                <h3>Признаки качественного монтажа</h3>
                <ul>
                    <li>Аккуратная прокладка трассы</li>
                    <li>Правильная изоляция всех соединений</li>
                    <li>Отсутствие вибраций и шума</li>
                    <li>Быстрое достижение заданной температуры</li>
                </ul>
            `
        },
        4: {
            title: 'Где лучше установить кондиционер в квартире',
            date: '5 сентября 2024',
            category: 'Установка',
            image: 'images/ulrkt1zcmwh0zg3i0zoi.jpeg',
            content: `
                <h3>Выбор места для внутреннего блока</h3>
                <p>Правильное размещение внутреннего блока кондиционера критически важно для эффективной работы системы:</p>
                
                <h4>1. Высота установки</h4>
                <p>Рекомендуемая высота: <strong>2,5-3 метра от пола</strong>. Это обеспечивает оптимальную циркуляцию воздуха и комфорт.</p>
                
                <h4>2. Расположение относительно мебели</h4>
                <ul>
                    <li>Рекомендуемая зона комфорта над кроватью и над рабочим местом (Кондиционер выдувает воздух вперёд на расстояние 2–3 метров, после чего воздух рассеивается по комнате)</li>
                    <li>Избегайте прямого потока воздуха на людей</li>
                    <li>Оставляйте свободное пространство для обслуживания</li>
                </ul>
                
                <h4>3. Выбор места для наружного блока</h4>
                <p>Наружный блок должен быть:</p>
                <ul>
                    <li>Легко доступен для обслуживания</li>
                    <li>Защищен от прямых солнечных лучей</li>
                    <li>Иметь хорошую вентиляцию</li>
                    <li>Надежно закреплен на стене</li>
                </ul>
            `
        },
        5: {
            title: 'Кондиционер и здоровье: мифы и реальность',
            date: '1 сентября 2024',
            category: 'Здоровье',
            image: 'images/17012325t1h3dc0.webp',
            content: `
                <h3>Разбираем популярные мифы</h3>
                <p>Многие люди опасаются использовать кондиционеры из-за распространенных мифов о их вреде для здоровья.</p>
                
                <h4>Миф 1: "Кондиционер вызывает простуду"</h4>
                <p><strong>Реальность:</strong> Кондиционер не вызывает простуду. Проблема в неправильной эксплуатации - слишком низкая температура или прямой поток воздуха.</p>
                
                <h4>Миф 2: "Кондиционер сушит воздух"</h4>
                <p><strong>Реальность:</strong> Современные кондиционеры имеют функции увлажнения и не пересушивают воздух при правильной настройке.</p>
                
                <h4>Миф 3: "Кондиционер распространяет бактерии"</h4>
                <p><strong>Реальность:</strong> При регулярной чистке фильтров кондиционер, наоборот, очищает воздух от пыли и аллергенов.</p>
                
                <h4>Правила безопасного использования</h4>
                <ul>
                    <li>Температура не ниже 22-24°C</li>
                    <li>Регулярная чистка фильтров</li>
                    <li>Избегайте прямого потока воздуха</li>
                    <li>Проветривайте помещение</li>
                </ul>
            `
        },
        6: {
            title: 'Использование кондиционера зимой',
            date: '28 августа 2024',
            category: 'Эксплуатация',
            image: 'images/vMxCsI14954551613181_b.jpeg',
            content: `
                <h3>Особенности зимней эксплуатации</h3>
                <p>Многие кондиционеры могут работать в режиме обогрева, но есть важные ограничения и правила.</p>
                
                <h4>Температурные ограничения</h4>
                <p>Большинство кондиционеров эффективно работают на обогрев при температуре наружного воздуха <strong>не ниже -5°C</strong>.</p>
                
                <h4>Подготовка к зиме</h4>
                <ul>
                    <li>Очистите наружный блок от листьев и мусора</li>
                    <li>Проверьте крепления и изоляцию</li>
                    <li>Убедитесь в герметичности соединений</li>
                    <li>Проведите профилактическое обслуживание</li>
                </ul>
                
                <h4>Режимы работы зимой</h4>
                <p>При низких температурах рекомендуется:</p>
                <ul>
                    <li>Использовать кондиционер как дополнительный обогрев</li>
                    <li>Не отключать полностью - включать периодически</li>
                    <li>Следить за образованием льда на наружном блоке</li>
                </ul>
                
                <h4>Альтернативы зимой</h4>
                <p>При температуре ниже -10°C лучше использовать традиционные системы отопления.</p>
            `
        }
    };
    
    const article = articles[articleId];
    console.log('Article found:', article);
    
    if (!article) {
        console.error('Article not found for ID:', articleId);
        return;
    }
    
    console.log('Setting modal content...');
    document.getElementById('blogModalTitle').textContent = article.title;
    document.getElementById('blogModalDate').textContent = article.date;
    document.getElementById('blogModalCategory').textContent = article.category;
    document.getElementById('blogModalImage').src = article.image;
    document.getElementById('blogModalImage').alt = article.title;
    document.getElementById('blogModalContent').innerHTML = article.content;
    
    console.log('Showing modal...');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    console.log('Modal should be visible now');
}

window.closeBlogModal = function() {
    console.log('closeBlogModal called');
    const modal = document.getElementById('blogModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('Modal closed');
    } else {
        console.error('Modal not found for closing');
    }
}

// Close blog modal when clicking outside
window.addEventListener('click', (e) => {
    const blogModal = document.getElementById('blogModal');
    if (e.target === blogModal) {
        closeBlogModal();
    }
});

// Close blog modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const blogModal = document.getElementById('blogModal');
        if (blogModal.style.display === 'block') {
            closeBlogModal();
        }
    }
});

// Toggle additional articles in the same section
function toggleAllArticles() {
    console.log('toggleAllArticles called');
    const additionalArticles = document.getElementById('additionalArticles');
    const button = document.querySelector('.blog-more .btn');
    
    console.log('additionalArticles:', additionalArticles);
    console.log('button:', button);
    
    if (additionalArticles && button) {
        console.log('Current classes:', additionalArticles.className);
        
        if (additionalArticles.classList.contains('hidden')) {
            // Показываем дополнительные статьи
            console.log('Showing articles');
            additionalArticles.classList.remove('hidden');
            additionalArticles.classList.add('visible');
            button.textContent = 'Скрыть статьи';
            additionalArticles.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Скрываем дополнительные статьи
            console.log('Hiding articles');
            additionalArticles.classList.remove('visible');
            additionalArticles.classList.add('hidden');
            button.textContent = 'Все статьи';
        }
    } else {
        console.log('Elements not found');
    }
}

window.hideCalculator = function() {
    const calculatorSection = document.getElementById('calculator');
    if (calculatorSection) {
        calculatorSection.style.display = 'none';
    }
}

// Application Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const applicationForm = document.getElementById('applicationForm');
    
    if (applicationForm) {
        // Service checkboxes handling - Standard version
        const serviceCheckboxes = document.querySelectorAll('input[name="services"]');
        
        serviceCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // Standard checkbox behavior - no additional logic needed
                console.log('Service selected:', this.value, this.checked);
            });
        });
        // Phone number formatting
        // Простое поле телефона без автоматического форматирования
        
        // Application method toggle
        const applicationMethodSelect = document.getElementById('applicationMethod');
        if (applicationMethodSelect) {
            applicationMethodSelect.addEventListener('change', toggleApplicationMethod);
        }
        
        // Form validation
        applicationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(applicationForm);
            const data = {};
            
            // Collect form data
            for (let [key, value] of formData.entries()) {
                if (data[key]) {
                    if (Array.isArray(data[key])) {
                        data[key].push(value);
                    } else {
                        data[key] = [data[key], value];
                    }
                } else {
                    data[key] = value;
                }
            }
            
            // Номер телефона как есть
            
            // Validate required fields
            const requiredFields = ['name', 'address', 'phone'];
            const errors = [];
            
            requiredFields.forEach(field => {
                if (!data[field] || data[field].trim() === '') {
                    const fieldNames = {
                        'name': 'Имя',
                        'phone': 'Телефон',
                        'address': 'Адрес',
                        'message': 'Сообщение'
                    };
                    errors.push(`${fieldNames[field] || field} обязательно для заполнения`);
                }
            });
            
            // Validate phone number
            const cleanPhone = data.phone ? data.phone.replace(/\D/g, '') : '';
            if (data.phone && (!cleanPhone.startsWith('375') || cleanPhone.length !== 12)) {
                errors.push('Введите корректный белорусский номер телефона');
            }
            
            // Validate email if required (for online method)
            if (data.applicationMethod === 'online' && data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                errors.push('Введите корректный email адрес');
            }
            
            // Validate telegram username if provided
            if (data.telegram && !data.telegram.startsWith('@')) {
                data.telegram = '@' + data.telegram;
            }
            
            // Check if service is selected
            const serviceSelect = document.querySelector('select[name="service"]');
            if (serviceSelect && (!serviceSelect.value || serviceSelect.value.trim() === '')) {
                errors.push('Выберите услугу');
            }
            
            if (errors.length > 0) {
                alert('Исправьте следующие ошибки:\n' + errors.join('\n'));
                return;
            }
            
            // Отправляем заявку в Telegram
            console.log('📤 Отправляем заявку в Telegram...', data);
            const telegramResult = await sendToTelegram(data);
            
            if (telegramResult) {
                // Show success message
                alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
                
                // Reset form
                applicationForm.reset();
            } else {
                alert('Произошла ошибка при отправке заявки. Попробуйте еще раз или свяжитесь с нами по телефону.');
            }
            
            // Log form data
            console.log('Application submitted:', data);
        });
    }
});


// Toggle services list
function toggleServices() {
    const servicesList = document.getElementById('servicesList');
    const toggleButton = document.querySelector('.services-toggle');
    const toggleText = document.getElementById('services-toggle-text');
    
    if (servicesList.style.display === 'none') {
        servicesList.style.display = 'flex';
        toggleButton.classList.add('open');
        toggleText.textContent = 'Скрыть';
    } else {
        servicesList.style.display = 'none';
        toggleButton.classList.remove('open');
        toggleText.textContent = 'Выбрать';
    }
}

// Toggle application method fields
function toggleApplicationMethod() {
    const method = document.getElementById('applicationMethod').value;
    const phoneGroup = document.getElementById('phoneGroup');
    const emailGroup = document.getElementById('emailGroup');
    const telegramGroup = document.getElementById('telegramGroup');
    const viberGroup = document.getElementById('viberGroup');
    
    // Hide all groups first
    phoneGroup.style.display = 'none';
    emailGroup.style.display = 'none';
    telegramGroup.style.display = 'none';
    viberGroup.style.display = 'none';
    
    // Show relevant groups based on selection
    if (method === 'telegram') {
        phoneGroup.style.display = 'block';
        telegramGroup.style.display = 'block';
    } else if (method === 'viber') {
        phoneGroup.style.display = 'block';
        viberGroup.style.display = 'block';
    } else if (method === 'online') {
        phoneGroup.style.display = 'block';
        emailGroup.style.display = 'block';
    }
}

// Client modal functions
function showClientModal(title, description) {
    const modal = document.getElementById('clientModal');
    const titleElement = document.getElementById('clientModalTitle');
    const descriptionElement = document.getElementById('clientModalDescription');
    
    if (titleElement) titleElement.textContent = title;
    if (descriptionElement) descriptionElement.textContent = description;
    
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeClientModal() {
    const modal = document.getElementById('clientModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const clientModal = document.getElementById('clientModal');
    const crmClientModal = document.getElementById('crmClientModal');
    const versaillesModal = document.getElementById('versaillesModal');
    const lotosModal = document.getElementById('lotosModal');

    if (event.target === clientModal) {
        closeClientModal();
    }

    if (event.target === crmClientModal) {
        closeCrmClientModal();
    }

    if (event.target === versaillesModal) {
        closeVersaillesModal();
    }

    if (event.target === lotosModal) {
        closeLotosModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeClientModal();
        closeCrmClientModal();
        closeVersaillesModal();
        closeLotosModal();
    }
});

// Lotos Modal Functions
window.showLotosModal = function() {
    const modal = document.getElementById('lotosModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

window.closeLotosModal = function() {
    const modal = document.getElementById('lotosModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Versailles modal functions
window.showVersaillesModal = function() {
    const modal = document.getElementById('versaillesModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

window.closeVersaillesModal = function() {
    const modal = document.getElementById('versaillesModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question) {
            question.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const isActive = item.classList.contains('active');
                console.log('FAQ clicked, isActive:', isActive);
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    console.log('FAQ closed');
                } else {
                    item.classList.add('active');
                    console.log('FAQ opened');
                }
            });
        }
    });
});

// Pricing tabs functionality
function showPricingTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.pricing-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-pricing');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Конфигурация цен для калькулятора
const PRICING_CONFIG = {
    // Базовая стоимость по типу помещения (рублей за м²)
    roomTypeBase: {
        apartment: 1500,
        office: 1800,
        house: 2000,
        commercial: 2200
    },
    
    // Коэффициенты сложности
    complexityMultipliers: {
        simple: 1.0,
        medium: 1.3,
        complex: 1.6
    },
    
    // Дополнительные услуги
    additionalServices: {
        drilling: 60,        // Сверление отверстий до 40 см
        drainage: 2500      // Организация дренажа
    },
    
    // Стоимость монтажа блоков
    blockInstallation: 450,  // Монтаж внутреннего и внешнего блока
    
    // Стоимость трассы за метр
    routePricePerMeter: 65,  // 65 BYN за метр трассы
    
    // Минимальная стоимость установки
    minInstallationPrice: 8000,
    
    // Максимальная стоимость установки
    maxInstallationPrice: 150000
};

// Функция для форматирования числа с разделителями
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price) + ' BYN';
}

// Функция для расчёта дополнительных услуг
function calculateAdditionalServices() {
    let additionalPrice = 0;
    const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        const servicePrice = PRICING_CONFIG.additionalServices[checkbox.value];
        if (servicePrice) {
            // Специальная логика для сверления
            if (checkbox.value === 'drilling') {
                const wallThickness = parseFloat(document.getElementById('wallThickness').value) || 20;
                const drillingCount = parseInt(document.getElementById('drillingCount').value) || 1;
                
                // Базовая стоимость сверления (до 40 см)
                let drillingPrice = servicePrice;
                
                // Доплата за толстые стены (свыше 40 см)
                if (wallThickness > 40) {
                    drillingPrice += 30; // Доплата за толстые стены
                }
                
                // Умножаем на количество отверстий
                drillingPrice *= drillingCount;
                
                additionalPrice += drillingPrice;
            } else {
                additionalPrice += servicePrice;
            }
        }
    });
    
    return Math.round(additionalPrice);
}

// Функция для расчёта итоговой стоимости
function calculateTotalPrice() {
    console.log('Начинаем расчёт...');
    
    // Получаем данные из формы
    const roomType = document.getElementById('roomType').value;
    const roomArea = parseFloat(document.getElementById('roomArea').value);
    const routeLength = parseFloat(document.getElementById('routeLength').value);
    const acType = document.getElementById('acType').value;
    const power = document.getElementById('power').value;
    
    console.log('Данные формы:', { roomType, roomArea, routeLength, acType, power });
    
    // Валидация
    if (!roomType || !roomArea || !routeLength || !acType || !power) {
        throw new Error('Пожалуйста, заполните все обязательные поля');
    }
    
    if (roomArea <= 0 || routeLength <= 0) {
        throw new Error('Пожалуйста, введите корректные значения');
    }
    
    // Расчёт дополнительных услуг
    const additionalPrice = calculateAdditionalServices();
    
    // Расчёт стоимости трассы
    const routePrice = routeLength * PRICING_CONFIG.routePricePerMeter;
    
    // Стоимость монтажа блоков
    const blockInstallationPrice = PRICING_CONFIG.blockInstallation;
    
    const totalPrice = routePrice + blockInstallationPrice + additionalPrice;
    
    console.log('Результат расчёта:', {
        routePrice,
        blockInstallationPrice,
        additionalPrice,
        totalPrice
    });
    
    return {
        routePrice,
        blockInstallationPrice,
        additionalPrice,
        totalPrice
    };
}

// Функция для отображения результата
function displayResult(result) {
    const resultDiv = document.getElementById('result');
    const routePriceElement = document.getElementById('routePrice');
    const blockInstallationElement = document.getElementById('blockInstallationPrice');
    const additionalPriceElement = document.getElementById('additionalPrice');
    const totalPriceElement = document.getElementById('totalPrice');
    
    if (routePriceElement) routePriceElement.textContent = formatPrice(result.routePrice);
    if (blockInstallationElement) blockInstallationElement.textContent = formatPrice(result.blockInstallationPrice);
    if (additionalPriceElement) additionalPriceElement.textContent = formatPrice(result.additionalPrice);
    if (totalPriceElement) totalPriceElement.textContent = formatPrice(result.totalPrice);
    
    if (resultDiv) {
        resultDiv.classList.remove('hidden');
        // Плавная прокрутка к результату
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

// Функция для валидации формы
function validateForm() {
    const requiredFields = [
        'roomType', 'roomArea', 'routeLength', 'acType', 'power'
    ];
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            field.focus();
            throw new Error(`Пожалуйста, заполните поле: ${field.previousElementSibling.textContent}`);
        } else {
            field.style.borderColor = '#27ae60';
        }
    }
    
    // Дополнительная валидация числовых полей
    const roomArea = parseFloat(document.getElementById('roomArea').value);
    const routeLength = parseFloat(document.getElementById('routeLength').value);
    
    if (roomArea <= 0 || roomArea > 1000) {
        throw new Error('Площадь помещения должна быть от 1 до 1000 м²');
    }
    
    if (routeLength < 1 || routeLength > 100) {
        throw new Error('Длина трассы должна быть от 1 до 100 метров');
    }
    
    if (!routeLength || isNaN(routeLength)) {
        throw new Error('Пожалуйста, укажите длину трассы');
    }
}

// Функция для показа ошибки
function showError(message) {
    // Удаляем предыдущие ошибки
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Создаём новое сообщение об ошибке
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: #e74c3c;
        color: white;
        padding: 15px;
        border-radius: 10px;
        margin: 20px 0;
        text-align: center;
        font-weight: 600;
        animation: fadeIn 0.3s ease-out;
    `;
    errorDiv.textContent = message;
    
    // Вставляем сообщение об ошибке перед формой
    const form = document.getElementById('calculatorForm');
    if (form) {
        form.parentNode.insertBefore(errorDiv, form);
        
        // Автоматически скрываем ошибку через 5 секунд
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
}

// Функция для автоматического подбора мощности
function autoSelectPower() {
    const roomArea = parseFloat(document.getElementById('roomArea').value);
    const powerSelect = document.getElementById('power');
    
    if (roomArea > 0 && powerSelect) {
        let recommendedPower = '';
        if (roomArea <= 25) recommendedPower = '2.5';
        else if (roomArea <= 35) recommendedPower = '3.5';
        else if (roomArea <= 50) recommendedPower = '5';
        else if (roomArea <= 70) recommendedPower = '7';
        else if (roomArea <= 90) recommendedPower = '9';
        else recommendedPower = '12';
        
        powerSelect.value = recommendedPower;
    }
}

// Обработчик отправки формы калькулятора
document.addEventListener('DOMContentLoaded', function() {
    const calculatorForm = document.getElementById('calculatorForm');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            try {
                // Валидация
                validateForm();
                
                // Расчёт
                const result = calculateTotalPrice();
                
                // Отображение результата
                displayResult(result);
                
                // Скрываем ошибки
                const existingError = document.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
            } catch (error) {
                showError(error.message);
            }
        });
    }

    // Автоматический подбор мощности при изменении площади
    const roomAreaField = document.getElementById('roomArea');
    if (roomAreaField) {
        roomAreaField.addEventListener('input', autoSelectPower);
    }

    // Очистка ошибок при изменении полей
    document.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('input', function() {
            this.style.borderColor = '#e1e5e9';
            const errorMessage = document.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    });

    // Специальная валидация для поля длины трассы
    const routeLengthField = document.getElementById('routeLength');
    if (routeLengthField) {
        routeLengthField.addEventListener('input', function() {
            const value = parseFloat(this.value);
            
            if (this.value === '' || isNaN(value)) {
                this.style.borderColor = '#e74c3c';
                this.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
            } else if (value < 1 || value > 100) {
                this.style.borderColor = '#f39c12';
                this.style.boxShadow = '0 0 0 3px rgba(243, 156, 18, 0.1)';
            } else {
                this.style.borderColor = '#27ae60';
                this.style.boxShadow = '0 0 0 3px rgba(39, 174, 96, 0.1)';
            }
        });
    }

    // Обработчик для чекбокса сверления
    const drillingCheckbox = document.getElementById('drilling');
    if (drillingCheckbox) {
        drillingCheckbox.addEventListener('change', function() {
            const drillingOptions = document.getElementById('drillingOptions');
            
            if (this.checked) {
                drillingOptions.style.display = 'block';
            } else {
                drillingOptions.style.display = 'none';
            }
        });
    }
});

// Chat functionality
let chatOpen = false;

window.toggleChat = function() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) {
        chatOpen = !chatOpen;
        if (chatOpen) {
            chatWindow.classList.add('active');
        } else {
            chatWindow.classList.remove('active');
        }
    }
}

// Конфигурация для Dialogflow
const CHAT_CONFIG = {
    BACKEND_URL: 'http://localhost:3001/api/chat',
    FALLBACK_ENABLED: true, // Включить резервные ответы если ИИ недоступен
    SHOW_INTENT_INFO: true, // Показывать информацию о намерениях (для отладки)
    SHOW_CONFIDENCE: true // Показывать уровень уверенности
};

// История разговора для контекста
let conversationHistory = [];

window.sendChatMessage = function() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    
    if (input && input.value.trim() && messagesContainer) {
        const message = input.value.trim();
        
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user-message';
        userMessage.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">Сейчас</span>
            </div>
        `;
        messagesContainer.appendChild(userMessage);
        
        // Отправляем сообщение в Telegram (отключено для снижения нагрузки)
        // sendChatToTelegram(message);
        
        // Добавляем в историю разговора
        conversationHistory.push({
            role: 'user',
            text: message
        });
        
        // Clear input
        input.value = '';
        
        // Показываем индикатор загрузки
        showTypingIndicator();
        
        // Отправляем запрос к Dialogflow
        sendToDialogflow(message);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Функция для отправки запроса к Dialogflow
async function sendToDialogflow(message) {
    try {
        console.log('Отправляем запрос к Dialogflow:', message);
        
        const response = await fetch(CHAT_CONFIG.BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                sessionId: generateSessionId()
            })
        });

        const data = await response.json();
        
        // Убираем индикатор загрузки
        hideTypingIndicator();
        
        if (data.success) {
            // Добавляем ответ ИИ в историю
            conversationHistory.push({
                role: 'assistant',
                text: data.response
            });
            
            // Показываем ответ ИИ с дополнительной информацией
            showBotMessage(data.response, data);
        } else {
            throw new Error(data.error || 'Ошибка получения ответа');
        }
        
    } catch (error) {
        console.error('Ошибка Dialogflow:', error);
        
        // Убираем индикатор загрузки
        hideTypingIndicator();
        
        // Используем резервные ответы
        if (CHAT_CONFIG.FALLBACK_ENABLED) {
            const fallbackReply = getBotReply(message);
            showBotMessage(fallbackReply);
        } else {
            showBotMessage('Извините, произошла ошибка. Пожалуйста, свяжитесь с нами по телефону +375 29 284-84-34');
        }
    }
}

// Генерация уникального ID сессии
function generateSessionId() {
    return 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// Функция для показа сообщения бота
function showBotMessage(text, dialogflowData = null) {
    const messagesContainer = document.getElementById('chatMessages');
    const botMessage = document.createElement('div');
    botMessage.className = 'chat-message bot-message';
    
    // Дополнительная информация от Dialogflow
    let additionalInfo = '';
    if (dialogflowData && CHAT_CONFIG.SHOW_INTENT_INFO) {
        if (dialogflowData.intent && dialogflowData.intent !== 'Default Welcome Intent') {
            additionalInfo += `<div class="intent-info">🎯 Намерение: ${dialogflowData.intent}</div>`;
        }
        if (dialogflowData.confidence && CHAT_CONFIG.SHOW_CONFIDENCE) {
            const confidencePercent = Math.round(dialogflowData.confidence * 100);
            additionalInfo += `<div class="confidence-info">📊 Уверенность: ${confidencePercent}%</div>`;
        }
        if (dialogflowData.fallback) {
            additionalInfo += `<div class="fallback-info">⚠️ Использован резервный ответ</div>`;
        }
    }
    
    botMessage.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <p>${text}</p>
            ${additionalInfo}
            <span class="message-time">Сейчас</span>
        </div>
    `;
    messagesContainer.appendChild(botMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Индикатор печати
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-message bot-message typing-indicator';
    typingIndicator.id = 'typingIndicator';
    typingIndicator.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span class="message-time">Печатает...</span>
        </div>
    `;
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function quickMessage(message) {
    const input = document.getElementById('chatInput');
    if (input) {
        input.value = message;
        sendChatMessage();
    }
}

function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function getBotReply(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Установка и монтаж
    if (message.includes('установка') || message.includes('установить') || message.includes('монтаж')) {
        return 'Отлично! Для установки кондиционера нужно знать площадь помещения и тип системы. Наш мастер может приехать для замеров. Стоимость установки от 150 руб.';
    } else if (message.includes('сплит') || message.includes('сплит-система')) {
        return 'Сплит-системы - самый популярный выбор для квартир. Состоят из внутреннего и наружного блока. Рекомендуем мощность 1 кВт на 10 м².';
    } else if (message.includes('мульти') || message.includes('мульти-сплит')) {
        return 'Мульти-сплит системы позволяют подключить несколько внутренних блоков к одному наружному. Идеально для больших квартир и офисов.';
    } else if (message.includes('канальный') || message.includes('канальный кондиционер')) {
        return 'Канальные кондиционеры скрываются за подвесным потолком. Требуют больше места, но обеспечивают равномерное распределение воздуха.';
    
    // Ремонт и обслуживание
    } else if (message.includes('ремонт') || message.includes('поломка') || message.includes('не работает')) {
        return 'Мы ремонтируем кондиционеры всех брендов. Диагностика стоит 50 руб., которые засчитываются при ремонте. Вызвать мастера?';
    } else if (message.includes('обслуживание') || message.includes('чистка') || message.includes('профилактика')) {
        return 'Регулярное обслуживание продлевает срок службы кондиционера. Базовое обслуживание от 80 руб. Предлагаем годовые контракты со скидкой.';
    } else if (message.includes('фильтр') || message.includes('фильтры')) {
        return 'Фильтры нужно чистить каждые 2-3 недели и менять раз в 3-6 месяцев. Мы можем провести полную очистку системы.';
    } else if (message.includes('фреон') || message.includes('заправка')) {
        return 'Заправка фреоном нужна при утечке или после ремонта. Определяем тип хладагента и заправляем качественным фреоном.';
    
    // Цены и стоимость
    } else if (message.includes('цена') || message.includes('стоимость') || message.includes('сколько стоит')) {
        return 'Цены зависят от типа работ. Установка сплит-системы от 150 руб., ремонт от 80 руб., обслуживание от 80 руб. Точную стоимость определим после осмотра.';
    } else if (message.includes('бесплатно') || message.includes('бесплатн')) {
        return 'Бесплатно: консультация, замеры (при покупке), диагностика (при ремонте), выезд в Минск. Стоимость выезда в область от 20 руб.';
    } else if (message.includes('скидка') || message.includes('акция') || message.includes('скидки')) {
        return 'У нас есть скидки: 10% при заказе онлайн, 20% для пенсионеров и многодетных семей на работы. Также скидки при покупке оборудования.';
    
    // Гарантии и сертификаты
    } else if (message.includes('гарантия') || message.includes('гарантий')) {
        return 'Даём гарантию до 5 лет на оборудование и 3 года на монтажные работы. Все работы застрахованы.';
    } else if (message.includes('сертификат') || message.includes('лицензия')) {
        return 'У нас есть все необходимые сертификаты и лицензии. Работаем официально, предоставляем документы для отчётности.';
    
    // Время работы и выезд
    } else if (message.includes('время') || message.includes('когда') || message.includes('работаете')) {
        return 'Работаем ежедневно с 9:00 до 21:00. Выезжаем в день обращения при наличии свободного мастера. Срочный выезд возможен за доплату.';
    } else if (message.includes('выезд') || message.includes('приедете') || message.includes('мастер')) {
        return 'Мастер приедет в удобное для вас время. В Минске выезд бесплатный, в область от 20 руб. Время доезда: Минск - до 1 часа, область - 1-3 часа.';
    
    // Типы кондиционеров и мощность
    } else if (message.includes('мощность') || message.includes('квт') || message.includes('btu')) {
        return 'Мощность рассчитывается по формуле: 1 кВт на 10 м². Для комнаты 20 м² нужен кондиционер 2 кВт, для 30 м² - 3 кВт.';
    } else if (message.includes('инвертор') || message.includes('инверторный')) {
        return 'Инверторные кондиционеры экономичнее и тише обычных. Плавно регулируют мощность, экономят до 40% электроэнергии.';
    } else if (message.includes('мобильный') || message.includes('переносной')) {
        return 'Мобильные кондиционеры не требуют монтажа, но менее эффективны. Подходят для временного использования или арендованных помещений.';
    
    // Бренды и производители
    } else if (message.includes('бренд') || message.includes('марка') || message.includes('производитель')) {
        return 'Рекомендуем бренды: MDV, TCL, Midea, ROYAL CLIMA - оптимальное соотношение цена/качество. Также работаем с Daikin, Mitsubishi, Samsung.';
    } else if (message.includes('mdv') || message.includes('тcl') || message.includes('midea')) {
        return 'Отличный выбор! Эти бренды предлагают качественные кондиционеры по разумным ценам. У нас есть сертифицированные мастера для всех брендов.';
    
    // Здоровье и безопасность
    } else if (message.includes('здоровье') || message.includes('безопасн') || message.includes('вред')) {
        return 'Современные кондиционеры безопасны для здоровья при правильной эксплуатации. Важно: регулярная чистка фильтров, правильная температура (22-24°C).';
    } else if (message.includes('аллергия') || message.includes('аллерген')) {
        return 'Кондиционеры с HEPA-фильтрами очищают воздух от аллергенов. Рекомендуем модели с ионизацией и ультрафиолетовой очисткой.';
    
    // Зимняя эксплуатация
    } else if (message.includes('зима') || message.includes('зимний') || message.includes('холод')) {
        return 'Многие кондиционеры работают на обогрев до -5°C. При более низких температурах эффективность снижается. Рекомендуем использовать как дополнительный обогрев.';
    } else if (message.includes('обогрев') || message.includes('отопление')) {
        return 'Кондиционеры с функцией обогрева могут работать зимой. Эффективны до -5°C, экономят электроэнергию по сравнению с обогревателями.';
    
    // Контакты и связь
    } else if (message.includes('телефон') || message.includes('контакт') || message.includes('связаться')) {
        return 'Наши контакты: +375 29 284-84-34, masterplus24.by@yandex.ru. Адрес: Минский р-н, Прилуки, ул. Мира 31/1. Работаем ежедневно 9:00-21:00.';
    } else if (message.includes('адрес') || message.includes('где находитесь')) {
        return 'Наш офис: Минский р-н, Прилуки, ул. Мира 31/1 (7км от МКАД). Выезжаем по всему Минску и области.';
    
    // Общие вопросы
    } else if (message.includes('спасибо') || message.includes('благодарю')) {
        return 'Пожалуйста! Рады помочь. Если у вас есть ещё вопросы, обращайтесь!';
    } else if (message.includes('привет') || message.includes('здравствуйте') || message.includes('добрый день')) {
        return 'Здравствуйте! Я помогу вам с выбором и установкой кондиционера. Задавайте любые вопросы!';
    } else if (message.includes('помощь') || message.includes('помогите')) {
        return 'Конечно, помогу! Расскажите, что именно вас интересует: установка, ремонт, обслуживание или выбор кондиционера?';
    
    // Заказ и заявка
    } else if (message.includes('заказ') || message.includes('заявка') || message.includes('хочу заказать')) {
        return 'Отлично! Для оформления заказа нужны: площадь помещения, тип кондиционера, адрес установки. Можем оформить заявку прямо сейчас!';
    } else if (message.includes('замер') || message.includes('замеры')) {
        return 'Замеры проводим бесплатно при покупке кондиционера. Мастер определит оптимальное место установки и необходимую мощность.';
    
    // По умолчанию
    } else {
        return 'Спасибо за ваш вопрос! Наш специалист свяжется с вами для подробной консультации. Оставьте заявку или звоните +375 29 284-84-34.';
    }
}

// Toggle clients section visibility
window.toggleClients = function() {
    const clientsContent = document.querySelector('.clients-content');
    if (clientsContent) {
        if (clientsContent.style.display === 'none') {
            clientsContent.style.display = 'block';
        } else {
            clientsContent.style.display = 'none';
        }
    }
}



// Installation Modal Functions
window.openInstallationModal = function() {
    console.log('openInstallationModal called');
    const modal = document.getElementById('installationModal');
    console.log('Modal found:', modal);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('Modal opened');
    } else {
        console.error('Installation modal not found');
    }
}

window.closeInstallationModal = function() {
    const modal = document.getElementById('installationModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Maintenance Modal Functions
window.openMaintenanceModal = function() {
    console.log('openMaintenanceModal called');
    const modal = document.getElementById('maintenanceModal');
    console.log('Modal found:', modal);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('Modal opened');
    } else {
        console.error('Maintenance modal not found');
    }
}

window.closeMaintenanceModal = function() {
    const modal = document.getElementById('maintenanceModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const installationModal = document.getElementById('installationModal');
    const maintenanceModal = document.getElementById('maintenanceModal');
    
    if (event.target === installationModal) {
        closeInstallationModal();
    }
    
    if (event.target === maintenanceModal) {
        closeMaintenanceModal();
    }
}

// Фильтрация запчастей
function filterParts(category) {
    const partCards = document.querySelectorAll('.part-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Обновить активную кнопку
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    // Показать/скрыть карточки
    partCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// Заказ запчасти
function orderPart(partName) {
    // Открыть форму заявки с предзаполненной услугой
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Предзаполнить поле услуги
        const serviceSelect = document.querySelector('select[name="service"]');
        if (serviceSelect) {
            serviceSelect.value = 'parts';
        }
        
        // Предзаполнить сообщение
        const messageField = document.querySelector('textarea[name="comments"]');
        if (messageField) {
            messageField.value = `Интересует запчасть: ${partName}`;
        }
        
        // Показать уведомление
        setTimeout(() => {
            alert(`Запчасть "${partName}" добавлена в заявку! Заполните форму ниже.`);
        }, 500);
    }
}

// Инициализация фильтров запчастей
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterParts(category);
        });
    });
});

// Анимация появления карточек
const fadeInKeyframes = `
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

// Добавить CSS анимацию
const partsAnimationStyle = document.createElement('style');
partsAnimationStyle.textContent = fadeInKeyframes;
document.head.appendChild(partsAnimationStyle);

console.log('Masterplus 24: Сайт загружен успешно!');

// Инициализация данных клиентов при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadClientsFromStorage();
    console.log('Данные клиентов загружены из localStorage:', clientsData.length, 'клиентов');
});

// Проверка доступности функций
console.log('Проверка функций:');
console.log('searchClients:', typeof window.searchClients);
console.log('filterClients:', typeof window.filterClients);
console.log('addNewClient:', typeof window.addNewClient);

// Функция для раскрытия деталей прайса на мобильных
window.togglePricingDetails = function(button) {
    const card = button.closest('.pricing-card');
    if (card) {
        card.classList.toggle('expanded');
        if (card.classList.contains('expanded')) {
            button.textContent = 'Свернуть';
        } else {
            button.textContent = 'Подробнее';
        }
    }
}

// Добавляем кнопки "Подробнее" ко всем карточкам прайса
document.addEventListener('DOMContentLoaded', function() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        // Проверяем, есть ли уже кнопка
        if (!card.querySelector('.pricing-card-mobile-expand')) {
            const features = card.querySelector('.pricing-features');
            if (features) {
                const button = document.createElement('button');
                button.className = 'pricing-card-mobile-expand';
                button.textContent = 'Подробнее';
                button.onclick = function() {
                    togglePricingDetails(this);
                };
                card.appendChild(button);
            }
        }
    });
});

// Добавляем data-label атрибуты для мобильного CRM
document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('.crm-table');
    if (table) {
        const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
        
        const updateTableLabels = () => {
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                cells.forEach((cell, index) => {
                    if (headers[index]) {
                        cell.setAttribute('data-label', headers[index]);
                    }
                });
            });
        };
        
        // Обновляем при загрузке
        updateTableLabels();
        
        // Наблюдаем за изменениями в таблице
        const observer = new MutationObserver(updateTableLabels);
        observer.observe(table.querySelector('tbody'), {
            childList: true,
            subtree: true
        });
    }
});

// Функция раскрытия/сворачивания карточек клиентов в мобильной версии
window.toggleClientCard = function(event) {
    // Проверяем, что клик не по кнопке или ссылке
    if (event.target.closest('.btn') || event.target.closest('a')) {
        return;
    }
    
    const row = event.currentTarget;
    row.classList.toggle('expanded');
};

// Добавляем обработчики для карточек клиентов
document.addEventListener('DOMContentLoaded', function() {
    const setupCardToggle = () => {
        const table = document.querySelector('.crm-table');
        if (!table) return;
        
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            // Удаляем старый обработчик если есть
            row.removeEventListener('click', window.toggleClientCard);
            // Добавляем новый
            row.addEventListener('click', window.toggleClientCard);
        });
    };
    
    // Настраиваем при загрузке
    setupCardToggle();
    
    // Настраиваем при изменении DOM (добавление/удаление клиентов)
    const table = document.querySelector('.crm-table');
    if (table) {
        const observer = new MutationObserver(setupCardToggle);
        observer.observe(table.querySelector('tbody'), {
            childList: true
        });
    }
});
