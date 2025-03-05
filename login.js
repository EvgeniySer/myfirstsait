document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registerLink = document.getElementById("register-link");
    const loginButton = document.getElementById("login-button");
    const userInfo = document.getElementById("user-info");
    const usernameDisplay = document.getElementById("username-display");
    const logoutButton = document.getElementById("logout-button");

    // Проверка, авторизован ли пользователь
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("username");

    // Обновление интерфейса в зависимости от состояния авторизации
    if (isLoggedIn && username) {
        loginButton.style.display = "none"; // Скрываем кнопку "Войти"
        userInfo.style.display = "flex"; // Показываем блок с логином и кнопкой "Выйти"
        usernameDisplay.textContent = username; // Отображаем логин пользователя
    } else {
        loginButton.style.display = "block"; // Показываем кнопку "Войти"
        userInfo.style.display = "none"; // Скрываем блок с логином и кнопкой "Выйти"
    }

    // Обработка формы входа
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Проверка логина и пароля (заглушка)
            if (usernameInput && password) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("username", usernameInput); // Сохраняем логин
                alert("Вход выполнен!");
                window.location.href = "index.html"; // Перенаправляем на главную страницу
            } else {
                alert("Неверный логин или пароль");
            }
        });
    }

    // Обработка кнопки "Выйти"
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("isLoggedIn"); // Удаляем состояние авторизации
            localStorage.removeItem("username"); // Удаляем логин
            window.location.href = "index.html"; // Перенаправляем на главную страницу
        });
    }

    // Обработка ссылки "Регистрация"
    if (registerLink) {
        registerLink.addEventListener("click", () => {
            alert("Регистрация (заглушка)");
        });
    }
});