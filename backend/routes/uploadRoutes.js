const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Настройка хранилища multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../uploads/'); // Убедитесь, что путь правильный
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // уникальное имя файла
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // ограничение на размер
});

const Experiment = require('../models/Experiment');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Добавление нового эксперимента с загрузкой изображения
router.post('/experiments', auth, upload.single('image'), async (req, res) => {
    const { title, instructions, description, difficulty } = req.body;

    try {
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const experiment = new Experiment({
            title,
            instructions,
            description,
            difficulty,
            user: req.user,
            username: user.username,
            imageUrl
        });

        await experiment.save();
        res.status(201).json(experiment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;