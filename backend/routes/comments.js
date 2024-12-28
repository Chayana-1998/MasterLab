const express = require('express');
const router = express.Router();
const Experiment = require('../models/Experiment');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Добавление комментария к эксперименту
router.post('/:experimentId/comments', auth, async (req, res) => {
    const { experimentId } = req.params;
    const { text } = req.body;

    try {
        const experiment = await Experiment.findById(experimentId);
        if (!experiment) {
            console.log('Experiment not found');
            return res.status(404).json({ message: 'Experiment not found' });
        }
        
        console.log('Experiment found:', experiment);
        console.log('User ID from auth middleware:', req.user);

        const user = await User.findById(req.user); // Извлекаем пользователя по ID
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User found:', user);

        const comment = {
            user: req.user._id,
            username: user.username,
            text: text,
            date: new Date()
        };

        experiment.comments.unshift(comment);
        await experiment.save();

        res.status(201).json(experiment);
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).json({ message: err.message });
    }
});

// Получение всех комментариев к эксперименту
router.get('/:experimentId/comments', async (req, res) => {
    const { experimentId } = req.params;

    try {
        const experiment = await Experiment.findById(experimentId).populate({
            path: 'comments.user',
            select: 'username'  // Только поле username
        });
        if (!experiment) {
            return res.status(404).json({ message: 'Experiment not found' });
        }

        res.json(experiment.comments);
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;