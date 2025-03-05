document.addEventListener("DOMContentLoaded", () => {
    const resultsList = document.getElementById("results-list");

    // Загрузка результатов голосования с сервера
    fetch('http://localhost:3000/api/votes')
        .then(response => response.json())
        .then(data => {
            for (const [orgId, votes] of Object.entries(data)) {
                const li = document.createElement("li");
                li.textContent = `Организация ${orgId}: ${votes} голосов`;
                resultsList.appendChild(li);
            }
        })
        .catch(error => {
            console.error("Ошибка при загрузке результатов:", error);
        });
});

document.addEventListener("DOMContentLoaded", () => {
    const showResultsButton = document.getElementById("show-results-button");
    const passwordForm = document.getElementById("password-form");
    const passwordInput = document.getElementById("password-input");
    const submitPasswordButton = document.getElementById("submit-password");
    const passwordError = document.getElementById("password-error");
    const votingResults = document.getElementById("voting-results");

    // Пароль для доступа к результатам
    const correctPassword = "adminadmin111";

    // Обработчик нажатия на кнопку "Посмотреть результат"
    showResultsButton.addEventListener("click", () => {
        passwordForm.style.display = "block"; // Показываем форму ввода пароля
    });

    // Обработчик нажатия на кнопку "Подтвердить"
    submitPasswordButton.addEventListener("click", () => {
        const enteredPassword = passwordInput.value;

        // Проверка пароля
        if (enteredPassword === correctPassword) {
            passwordError.style.display = "none"; // Скрываем сообщение об ошибке
            passwordForm.style.display = "none"; // Скрываем форму ввода пароля
            votingResults.style.display = "block"; // Показываем результаты голосования

            // Загрузка результатов голосования
            loadVotingResults();
        } else {
            passwordError.style.display = "block"; // Показываем сообщение об ошибке
        }
    });

    // Функция для загрузки результатов голосования
    function loadVotingResults() {
        const resultsList = document.getElementById("results-list");

         // Загрузка результатов голосования с сервера
    fetch('http://localhost:3000/api/votes')
    .then(response => response.json())
    .then(data => {
        for (const [orgId, votes] of Object.entries(data)) {
            const li = document.createElement("li");
            li.textContent = `Организация ${orgId}: ${votes} голосов`;
            resultsList.appendChild(li);
        }
    })
    .catch(error => {
        console.error("Ошибка при загрузке результатов:", error);
    });

        // Очистка списка перед загрузкой новых данных
        resultsList.innerHTML = "";

        // Добавление результатов в список
        results.forEach(org => {
            const li = document.createElement("li");
            li.textContent = `${org.name}: ${org.votes} голосов`;
            resultsList.appendChild(li);
        });
    }
});