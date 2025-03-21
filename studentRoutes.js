module.exports = router;
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Fetch Student Marks (for Student Dashboard)
router.get("/student-marks/:studentId", (req, res) => {
    const { studentId } = req.params;
    const query = `
        SELECT s.name, e.marks, e.rank 
        FROM students s 
        JOIN exam_results e ON s.id = e.student_id 
        WHERE s.id = ?;
    `;

    db.query(query, [studentId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results[0]); // Send student data
    });
});




// Example student route
router.get("/", (req, res) => {
    res.send("Student API is working!");
});

module.exports = router; // ✅ Export after defining router




    

module.exports = router;

