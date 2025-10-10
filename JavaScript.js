// Обновите функцию handleAdminClick
window.handleAdminClick = function() {
    const adminAuthModal = document.getElementById('admin-auth-modal');
    const adminContextMenu = document.getElementById('admin-context-menu');
    
    if (isAdmin) {
        // Если админ уже авторизован, показываем контекстное меню
        if (adminContextMenu) {
            adminContextMenu.classList.toggle('hidden');
        }
    } else {
        // Показываем модальное окно авторизации
        if (adminAuthModal) {
            adminAuthModal.style.display = 'flex';
            // Фокусируемся на поле ввода пароля
            setTimeout(() => {
                const passwordInput = document.getElementById('admin-password');
                if (passwordInput) {
                    passwordInput.focus();
                }
            }, 300);
        }
    }
}

// Добавьте обработчик для закрытия модального окна по Escape
document.addEventListener('keydown', (e) => {
    const adminAuthModal = document.getElementById('admin-auth-modal');
    if (e.key === 'Escape' && adminAuthModal.style.display === 'flex') {
        closeModal(adminAuthModal);
    }
});

// Обновите функцию закрытия модальных окон
function closeModal(modal) {
    modal.style.display = 'none';
    // Сбрасываем состояние поля пароля
    const passwordInput = document.getElementById('admin-password');
    if (passwordInput) {
        passwordInput.classList.remove('error', 'success');
        passwordInput.value = '';
    }
}

// Добавьте обработчик для клика вне модального окна
document.addEventListener('click', (e) => {
    const adminAuthModal = document.getElementById('admin-auth-modal');
    if (e.target === adminAuthModal) {
        closeModal(adminAuthModal);
    }
});

// Улучшенная обработка авторизации
authSubmit.addEventListener('click', () => {
    const password = adminPassword.value;
    
    if (password === ADMIN_PASSWORD) {
        // Success state
        adminPassword.classList.add('success');
        adminPassword.classList.remove('error');
        
        // Показываем анимацию успеха
        authSubmit.innerHTML = '<span class="loading"></span>';
        authSubmit.disabled = true;
        
        setTimeout(() => {
            isAdmin = true;
            adminBtn.style.opacity = '1';
            adminBtn.style.transform = 'scale(1.2)';
            
            // Показываем админ-панель
            adminPanel.style.display = 'flex';
            closeModal(adminAuthModal);
            adminPassword.value = '';
            
            // Сбрасываем кнопку
            authSubmit.innerHTML = 'Войти';
            authSubmit.disabled = false;
            
            renderProducts();
            showToast('🎉 Добро пожаловать в админ-панель!', 'success');
        }, 1000);
        
    } else {
        // Error state
        adminPassword.classList.add('error');
        adminPassword.classList.remove('success');
        adminPassword.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            adminPassword.style.animation = '';
        }, 500);
        
        showToast('❌ Неверный пароль!', 'error');
    }
});
