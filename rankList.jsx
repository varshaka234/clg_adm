const express = require("express");
const router = express.Router();
const db = require("../db"); // Import your MySQL connection

// Get Rank List for a Specific Course
router.get("/ranklist/:course", (req, res) => {
    const course = req.params.course; // Get course name from request URL

    const query = `SELECT student_rank, student_name, total_marks, 
                          physics, chemistry, mathematics, zoology, botany, 
                          computer_science, logical_ability, community 
                   FROM admission_results 
                   WHERE course = ? 
                   ORDER BY student_rank`;

    db.query(query, [course], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;
