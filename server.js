const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const path = require("path"); // ✅ Missing path module added
const multer = require("multer"); // ✅ Added multer for file uploads
const upload = require("./middleware/multerConfig"); // ✅ Import Multer Config
const Razorpay = require("razorpay");
dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// ✅ Configure Multer for File Uploads with Validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // Store files in 'uploads/' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename file with timestamp
  },
});

// ✅ File Type and Size Validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("❌ Only JPEG, PNG, and JPG files are allowed!"), false);
  }
};






// ✅ Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Database Connection (Using Connection Pool)
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "W7301@jqir#", // Ensure this is correct
  database: "college_admission",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ✅ File Upload API Route (Fix Applied)
app.post("/upload", upload.fields([{ name: "photo" }, { name: "signature" }]), (req, res) => {
  if (!req.files || !req.files["photo"] || !req.files["signature"]) {
    return res.status(400).json({ error: "❌ Both Photo and Signature are required!" });
  }

  const photoPath = `/uploads/${req.files["photo"][0].filename}`;
  const signaturePath = `/uploads/${req.files["signature"][0].filename}`;

  res.json({
    message: "✅ Upload successful!",
    photoUrl: photoPath,
    signatureUrl: signaturePath,
  });
});

// ✅ Global Error Handler for Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `❌ Multer error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

// ✅ Database Connection Check
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed: " + err.stack);
    return;
  }
  console.log("✅ Connected to MySQL database.");
  connection.release();
});

// ✅ Student Registration Route
app.post("/register", (req, res) => {
  console.log("Received Data:", req.body); // Debugging step

  const {
    fullName, fatherName, motherName, dobYear, dobMonth, dobDay, aadhar, mobile,
    alternateMobile, address, state, district, pincode, keralite
  } = req.body;

  if (!fullName || !fatherName || !motherName || !dobYear || !dobMonth || !dobDay || !aadhar || !mobile) {
    return res.status(400).json({ error: "❌ Missing required fields" });
  }

  const sql = `INSERT INTO students 
    (name, father_name, mother_name, dobYear, dobMonth, dobDay, aadhar_number, mobile, 
    alternate_mobile, permanent_address, state, district, pincode, keralite_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [fullName, fatherName, motherName, dobYear, dobMonth, dobDay, aadhar, mobile,
      alternateMobile, address, state, district, pincode, keralite],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting data:", err);
        return res.status(500).json({ error: "❌ Database Error" });
      }
      res.status(201).json({ message: "✅ Registration Successful", id: result.insertId });
    }
  );
});

// ✅ Simple Login Route
app.post("/login", (req, res) => {
  res.json({ message: "✅ Login successful" });
});
// ✅ Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// ✅ Serve Uploaded Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Import and Use Routes
const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api", uploadRoutes); // Now upload route is available at `/api/upload`

const razorpay = new Razorpay({
  key_id: "YOUR_RAZORPAY_KEY_ID",
  key_secret: "YOUR_RAZORPAY_SECRET",
});

// API to create an order
app.post("/create-order", async (req, res) => {
  try {
      const options = {
          amount: 50000, // ₹500 (amount in paise)
          currency: "INR",
          receipt: "order_rcptid_11",
      };

      const order = await razorpay.orders.create(options);
      res.json(order);
  } catch (error) {
      console.error(error);
      res.status(500).send("Error creating Razorpay order");
  }
});
// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
