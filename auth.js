let users = [];

const savedUsers = localStorage.getItem('helltaker_users');
if (savedUsers) {
    users = JSON.parse(savedUsers);
} else {
    users = [
        { login: "admin", password: "admin" },
        { login: "Helltaker", password: "pancakes" },
        { login: "Lucifer", password: "hell123" },
        { login: "Cerberus", password: "doggy" },
        { login: "Malina", password: "strateg" },
        { login: "Zdrada", password: "cigarette" },
        { login: "Modeus", password: "heart" },
        { login: "Justice", password: "blind" },
        { login: "Azazel", password: "angel" }
    ];
    localStorage.setItem('helltaker_users', JSON.stringify(users));
}

function isAdminLoggedIn() {
    const currentUser = sessionStorage.getItem('helltaker_current_user');
    return currentUser === 'admin';
}

function showUsersInConsole() {
    if (isAdminLoggedIn()) {
        console.log('=== Доступные логины и пароли ===');
        for (let i = 0; i < users.length; i++) {
            console.log('Логин: ' + users[i].login + ' | Пароль: ' + users[i].password);
        }
        console.log('=================================');
    } else {
        console.log('Доступ запрещён. Только admin может просматривать список пользователей.');
    }
}

setTimeout(function() {
    showUsersInConsole();
}, 100);

function saveUsers() {
    localStorage.setItem('helltaker_users', JSON.stringify(users));
}

function validateLogin(login) {
    if (!login || login.trim() === '') {
        return { success: false, message: "Логин не может быть пустым" };
    }
    if (login.length < 3) {
        return { success: false, message: "Логин должен быть не менее 3 символов" };
    }
    if (login.length > 20) {
        return { success: false, message: "Логин не должен превышать 20 символов" };
    }
    return { success: true };
}

function validatePassword(password) {
    if (!password || password.trim() === '') {
        return { success: false, message: "Пароль не может быть пустым" };
    }
    if (password.length < 3) {
        return { success: false, message: "Пароль должен быть не менее 3 символов" };
    }
    if (password.length > 30) {
        return { success: false, message: "Пароль не должен превышать 30 символов" };
    }
    return { success: true };
}

function registerUser(login, password) {
    const loginCheck = validateLogin(login);
    if (!loginCheck.success) {
        return loginCheck;
    }
    
    const passwordCheck = validatePassword(password);
    if (!passwordCheck.success) {
        return passwordCheck;
    }
    
    for (let i = 0; i < users.length; i++) {
        if (users[i].login === login) {
            return { success: false, message: "Пользователь с таким логином уже существует" };
        }
    }
    
    users.push({ login: login, password: password });
    saveUsers();
    
    if (isAdminLoggedIn()) {
        console.log('Новый пользователь зарегистрирован: ' + login + ' / ' + password);
    }
    return { success: true, message: "Регистрация прошла успешно" };
}

function loginUser(login, password) {
    if (!login || !password) {
        return { success: false, message: "Заполните все поля" };
    }
    
    for (let i = 0; i < users.length; i++) {
        if (users[i].login === login && users[i].password === password) {
            sessionStorage.setItem('helltaker_current_user', login);
            
            if (login === 'admin') {
                console.log('Admin вошёл в систему');
                setTimeout(function() {
                    showUsersInConsole();
                }, 500);
            } else {
                console.log('Пользователь вошёл: ' + login);
            }
            return { success: true, message: "Вход выполнен успешно" };
        }
    }
    
    console.log('Неудачная попытка входа: ' + login);
    return { success: false, message: "Неверный логин или пароль" };
}

const loginDiv = document.getElementById('loginForm');
const registerDiv = document.getElementById('registerForm');
const loginTab = document.getElementById('loginTabBtn');
const regTab = document.getElementById('registerTabBtn');
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginMsg = document.getElementById('loginMessage');
const regUsername = document.getElementById('regUsername');
const regPassword = document.getElementById('regPassword');
const regMsg = document.getElementById('regMessage');

loginTab.addEventListener('click', function() {
    loginDiv.style.display = 'block';
    registerDiv.style.display = 'none';
    loginTab.classList.add('active');
    regTab.classList.remove('active');
    loginMsg.innerHTML = '';
    loginMsg.className = 'info-message';
    regMsg.innerHTML = '';
    regMsg.className = 'info-message';
});

regTab.addEventListener('click', function() {
    loginDiv.style.display = 'none';
    registerDiv.style.display = 'block';
    regTab.classList.add('active');
    loginTab.classList.remove('active');
    loginMsg.innerHTML = '';
    loginMsg.className = 'info-message';
    regMsg.innerHTML = '';
    regMsg.className = 'info-message';
});

document.getElementById('doLoginBtn').addEventListener('click', function() {
    const login = loginUsername.value.trim();
    const password = loginPassword.value.trim();
    
    const result = loginUser(login, password);
    
    if (result.success) {
        loginMsg.innerHTML = result.message;
        loginMsg.className = 'info-message success';
        setTimeout(function() {
            window.location.href = 'main.html';
        }, 1000);
    } else {
        loginMsg.innerHTML = result.message;
        loginMsg.className = 'info-message error';
    }
});

document.getElementById('doRegisterBtn').addEventListener('click', function() {
    const login = regUsername.value.trim();
    const password = regPassword.value.trim();
    
    const result = registerUser(login, password);
    
    if (result.success) {
        regMsg.innerHTML = result.message;
        regMsg.className = 'info-message success';
        regUsername.value = '';
        regPassword.value = '';
        setTimeout(function() {
            loginTab.click();
            loginUsername.value = login;
            loginMsg.innerHTML = 'Теперь войдите с новым логином';
            loginMsg.className = 'info-message success';
        }, 1500);
    } else {
        regMsg.innerHTML = result.message;
        regMsg.className = 'info-message error';
    }
});

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (loginDiv.style.display !== 'none') {
            document.getElementById('doLoginBtn').click();
        } else if (registerDiv.style.display !== 'none') {
            document.getElementById('doRegisterBtn').click();
        }
    }
});