const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Submit an Application
router.post("/", (req, res) => {
  const { studentRef, courseRef } = req.body;
  const sql = "INSERT INTO applications_data (studentRef, courseRef, app_status) VALUES (?, ?, 'Pending')";
  db.query(sql, [studentRef, courseRef], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "✅ Application Submitted", id: result.insertId });
  });
});

// ✅ Get All Applications
router.get("/", (req, res) => {
  db.query("SELECT * FROM applications_data", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ✅ Update Application Status
router.put("/:id", (req, res) => {
  const { app_status } = req.body;
  const sql = "UPDATE applications_data SET app_status=? WHERE applicationID=?";
  db.query(sql, [app_status, req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "✅ Application Updated" });
  });
});

// ✅ Delete an Application
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM applications_data WHERE applicationID=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "✅ Application Deleted" });
  });
});

module.exports = router;
