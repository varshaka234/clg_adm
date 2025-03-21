const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Add a New Course
router.post("/", (req, res) => {
  const { course_title, department_name, total_seats } = req.body;
  const sql = "INSERT INTO courses_data (course_title, department_name, total_seats) VALUES (?, ?, ?)";
  db.query(sql, [course_title, department_name, total_seats], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "✅ Course Added", id: result.insertId });
  });
});

// ✅ Get All Courses
router.get("/", (req, res) => {
  db.query("SELECT * FROM courses_data", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ✅ Update a Course
router.put("/:id", (req, res) => {
  const { course_title, department_name, total_seats } = req.body;
  const sql = "UPDATE courses_data SET course_title=?, department_name=?, total_seats=? WHERE courseID=?";
  db.query(sql, [course_title, department_name, total_seats, req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "✅ Course Updated" });
  });
});

// ✅ Delete a Course
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM courses_data WHERE courseID=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "✅ Course Deleted" });
  });
});

module.exports = router;
