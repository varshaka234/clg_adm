const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Approve Top 3 Students API
router.post('/confirm/:examId', (req, res) => {
    const examId = req.params.examId;

    const query = `
        UPDATE students 
        SET admission_status = 'Approved'
        WHERE id IN (
            SELECT student_id FROM (
                SELECT student_id, RANK() OVER (ORDER BY total_marks DESC) AS rank_position
                FROM results WHERE exam_id = ?
            ) ranked_students 
            WHERE rank_position <= 3
        );
    `;

    db.query(query, [examId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Top 3 students approved for admission' });
    });
});

module.exports = router;
