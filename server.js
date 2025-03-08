const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2");

dotenv.config();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend origin
    credentials: true, // Allow cookies and authentication headers
  })
);

app.use(express.json()); // Correct middleware usage

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "W7301@jqir#", // Ensure this is correct
  database: "college_admission",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database.");
});

// Example Login Route
app.post("/login", (req, res) => {
  res.json({ message: "Login successful" });
});

// Root Route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Student Routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
