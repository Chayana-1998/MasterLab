const express = require('express');
const jwt = require('jsonwebtoken');
const Experiment = require('../models/Experiment');
const User = require('../models/User');
const auth = require('../middleware/auth');
const upload = require('../config/multer');
const router = express.Router();


// Получение всех экспериментов
router.get('/', async (req, res) => {
  try {
    const experiments = await Experiment.find().populate('user', 'username');
    res.json(experiments);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Маршрут для получения количества экспериментов
router.get('/count', async (req, res) => {
  try {
    const count = await Experiment.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error(error); // Логирование ошибки на сервере
    res.status(500).json({ error: 'Ошибка при получении количества экспериментов' });
  }
});

// Получение деталей эксперимента
router.get('/:id', async (req, res) => {
  try {
    const experiment = await Experiment.findById(req.params.id);
    if (!experiment) {
      return res.status(404).send('Эксперимент не найден');
    }
    res.json(experiment);
  } catch (error) {
    res.status(500).send('Ошибка сервера');
  }
});

// Добавление нового эксперимента
router.post('/', auth, upload.single('image'), async (req, res) => {
  const { title, instructions, description, difficulty } = req.body;

  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    console.log('Image URL to be saved:', imageUrl);
    const experiment = new Experiment({ title, instructions, user: req.user, username: user.username, difficulty, description, imageUrl });
    console.log('Uploaded file path:', imageUrl); // Отладочный вывод
    await experiment.save();
    res.status(201).json(experiment);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;