const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// 🔒 Protected Route - Dashboard
router.get('/dashboard', authMiddleware, (req, res) => {
    res.status(200).json({ 
        success: true,
        message: "Welcome to your dashboard",
        userId: req.user 
    });
});

module.exports = router;
connection.query('SELECT COUNT(*) AS total FROM admissions', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ totalAdmissions: results[0].total });
  });
  