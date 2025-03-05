const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Путь к файлу, где будут храниться результаты голосования
const votesFilePath = path.join(__dirname, 'votes.json');

// Функция для чтения данных из файла
function readVotes() {
    if (!fs.existsSync(votesFilePath)) {
        fs.writeFileSync(votesFilePath, JSON.stringify({}));
    }
    const data = fs.readFileSync(votesFilePath, 'utf8');
    return JSON.parse(data);
}

// Функция для записи данных в файл
function writeVotes(data) {
    fs.writeFileSync(votesFilePath, JSON.stringify(data, null, 2));
}

// Маршрут для получения результатов голосования
app.get('/api/votes', (req, res) => {
    const votes = readVotes();
    res.json(votes);
});

// Маршрут для обработки голосования
app.post('/api/vote', (req, res) => {
    const { orgId } = req.body;
    const votes = readVotes();

    if (!votes[orgId]) {
        votes[orgId] = 0;
    }

    votes[orgId] += 1;
    writeVotes(votes);

    res.json({ success: true, message: "Голос учтён!" });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});