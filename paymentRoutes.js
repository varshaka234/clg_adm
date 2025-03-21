const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Make a Payment
router.post("/", (req, res) => {
  const { studentRef, applicationRef, total_amount, transaction_code } = req.body;
  const sql = "INSERT INTO payments_data (studentRef, applicationRef, total_amount, payment_status, transaction_code) VALUES (?, ?, ?, 'Pending', ?)";
  db.query(sql, [studentRef, applicationRef, total_amount, transaction_code], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "✅ Payment Initiated", id: result.insertId });
  });
});

// ✅ Get All Payments
router.get("/", (req, res) => {
  db.query("SELECT * FROM payments_data", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ✅ Update Payment Status
router.put("/:id", (req, res) => {
  const { payment_status } = req.body;
  const sql = "UPDATE payments_data SET payment_status=? WHERE paymentID=?";
  db.query(sql, [payment_status, req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "✅ Payment Updated" });
  });
});

// ✅ Delete a Payment
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM payments_data WHERE paymentID=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "✅ Payment Deleted" });
  });
});

module.exports = router;
