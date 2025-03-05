document.addEventListener("DOMContentLoaded", () => {
    const voteButton = document.getElementById("vote-button");

    // Проверка, авторизован ли пользователь
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
        voteButton.disabled = false;
    }

    // Обработчик нажатия на кнопку
    voteButton.addEventListener("click", () => {
        const orgId = new URLSearchParams(window.location.search).get("id");

        // Отправка данных на сервер
        fetch(`http://localhost:3000/api/vote`, {
            method: "POST",
            body: JSON.stringify({ orgId: orgId }),
            headers: { "Content-Type": "application/json" },
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                voteButton.disabled = true; // Отключаем кнопку после голосования
                // Можно добавить обновление интерфейса, например, показать количество голосов
            })
            .catch(error => {
                console.error("Ошибка при отправке голоса:", error);
            });
    });
});