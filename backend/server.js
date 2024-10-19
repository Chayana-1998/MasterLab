const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


// Простая проверка работы сервера
app.get('/', (req, res) => {
    res.send("Hello from Express.JS backend!");
});

// Задаем порт для сервера
const PORT = process.env.PORT || 1234;

//Выводим сообщение о запуске сервера, если все ОК
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
