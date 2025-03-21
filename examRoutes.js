import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Create Exam
router.post('/add', async (req, res) => {
    const { exam_name, exam_date, duration, total_marks } = req.body;
    try {
        await db.query('INSERT INTO exams (exam_name, exam_date, duration, total_marks) VALUES (?, ?, ?, ?)', 
        [exam_name, exam_date, duration, total_marks]);
        res.json({ message: 'Exam added successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

// Get All Exams
router.get('/', async (req, res) => {
    try {
        const [exams] = await db.query('SELECT * FROM exams');
        res.json(exams);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

export default router;
