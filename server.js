const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());
const multer = require('multer');
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this directory exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and JPG images are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2 // 2MB limit
  }
});


// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Database connection (XAMPP default)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "college_admission"
});

// Connect to database
db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Helper function for database queries
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// STUDENT REGISTRATION
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    // Simple validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email exists
    const [user] = await query("SELECT * FROM users WHERE email = ?", [email]);
    if (user) return res.status(400).json({ error: "Email already exists" });

    // Insert new user
    await query(
      "INSERT INTO user_registration (name, email, password) VALUES (?, ?, ?)",
      [name, email, password] // In production, you should hash the password
    );

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Basic validation
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required"
//       });
//     }

//     // Check user tables sequentially
//     let authenticatedUser = null;
//     let userType = null;

//     // Check student table first
//     const [user] = await query(
//       "SELECT * FROM user_registration WHERE email = ?",
//       [email]
//     );

//     if (user && user.password === password) {
//       authenticatedUser = user.student_id;
//       userType = "User";
//     } else {
//       // Check admin table if student login failed
//       const [admin] = await query(
//         "SELECT * FROM admin WHERE username = ?",
//         [email]
//       );

//       if (admin && admin.password === password) {
//         authenticatedUser = admin.id;
//         userType = "Admin";
//       }
//       else{

//       }
//     }

//     if (!authenticatedUser) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password"
//       });
//     }
// console.log(authenticatedUser);

//     // Successful login response
//     res.json({
//       success: true,
//       message: "Login successful",
//       data: {
//         id: authenticatedUser,
//         name: authenticatedUser.name,
//         userType: userType
//       }
//     });

//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server error during login"
//     });
//   }
// });


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Check user tables sequentially
    let authenticatedUser = null;
    let userType = null;
    let userName = null;
    let userId = null;

    // 1. Check student table first
    const [student] = await query(
      "SELECT * FROM user_registration WHERE email = ?",
      [email]
    );

    if (student) {
      // Compare passwords (in production, use bcrypt.compare)
      if (student.password === password) {
        authenticatedUser = student;
        userType = "User";
        userName = student.fullname || student.email;
        userId = student.student_id;
      }
    } else {
      // 2. Check admin table if student login failed
      const [admin] = await query(
        "SELECT * FROM admin WHERE username = ?",
        [email]
      );

      if (admin) {
        if (admin.password === password) {
          authenticatedUser = admin;
          userType = "Admin";
          userName = admin.username;
          userId = admin.id;
        }
      } else {
        // 3. Check examiner table if admin login failed
        const [examiner] = await query(
          "SELECT * FROM tbl_examiner WHERE examiner_email = ?",
          [email]
        );

        if (examiner) {
          if (examiner.examiner_password === password) {
            authenticatedUser = examiner;
            userType = "Examiner";
            userName = examiner.examiner_name;
            userId = examiner.examiner_id;
          }
        }
      }
    }

    if (!authenticatedUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate token (in production, use JWT)

    // Successful login response
    res.json({
      success: true,
      message: "Login successful",
      data: {
        id: userId,
        name: userName,
        userType: userType,
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
});


// APPLICATION SUBMISSION
app.post("/applications", async (req, res) => {
  try {
    const { userId, programId } = req.body;

    await query(
      "INSERT INTO applications (user_id, program_id, status) VALUES (?, ?, 'pending')",
      [userId, programId]
    );

    res.status(201).json({ message: "Application submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET USER APPLICATIONS
app.get("/applications/:userId", async (req, res) => {
  try {
    const applications = await query(`
      SELECT a.*, p.name as program_name 
      FROM applications a
      JOIN programs p ON a.program_id = p.id
      WHERE a.user_id = ?
    `, [req.params.userId]);

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ADMIN - GET ALL APPLICATIONS
app.get("/admin/applications", async (req, res) => {
  try {
    const applications = await query(`
      SELECT a.*, u.name as user_name, p.name as program_name
      FROM applications a
      JOIN users u ON a.user_id = u.id
      JOIN programs p ON a.program_id = p.id
    `);
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ADMIN - UPDATE APPLICATION STATUS
app.put("/admin/applications/:id", async (req, res) => {
  try {
    const { status } = req.body;
    await query(
      "UPDATE applications SET status = ? WHERE id = ?",
      [status, req.params.id]
    );
    res.json({ message: "Application updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.post('/api/upload', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'signature', maxCount: 1 }]), async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId ) {
      // Clean up uploaded files if validation fails
      if (req.files.photo) fs.unlinkSync(req.files.photo[0].path);
      if (req.files.signature) fs.unlinkSync(req.files.signature[0].path);
      return res.status(400).json({ error: "User ID and email are required" });
    }

    // Get file paths
    const photoPath = req.files.photo ? req.files.photo[0].path : null;
    const signaturePath = req.files.signature ? req.files.signature[0].path : null;

    // Update student record in database
    await query(
      `UPDATE students 
       SET photo = ?, signature = ?
       WHERE id = ?`,
      [photoPath, signaturePath, userId]
    );

    res.status(200).json({
      message: "Files uploaded successfully",
      photoPath,
      signaturePath
    });
  } catch (err) {
    console.error("Upload error:", err);

    // Clean up files if error occurs
    if (req.files?.photo) fs.unlinkSync(req.files.photo[0].path);
    if (req.files?.signature) fs.unlinkSync(req.files.signature[0].path);

    res.status(500).json({ error: "Failed to upload files" });
  }
});



// Update Admission Status API
app.put("/students/:id/admission-status-accept", (req, res) => {
  const studentId = req.params.id;
  const  admission_status  = "Approved"

  if (!["Pending", "Approved", "Rejected","Payment"].includes(admission_status)) {
    return res.status(400).json({ error: "Invalid admission status" });
  }

  const sql = "UPDATE students SET admission_status = ? WHERE id = ?";
  db.query(sql, [admission_status, studentId], (err, result) => {
    if (err) {
      console.error("Error updating admission status:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Admission status updated successfully!" });
  });
});




// Update Admission Status API
app.put("/students/:id/admission-status-reject", (req, res) => {
  const studentId = req.params.id;
  const  admission_status  = "Rejected"

  if (!["Pending", "Approved", "Rejected","Payment"].includes(admission_status)) {
    return res.status(400).json({ error: "Invalid admission status" });
  }

  const sql = "UPDATE students SET admission_status = ? WHERE id = ?";
  db.query(sql, [admission_status, studentId], (err, result) => {
    if (err) {
      console.error("Error updating admission status:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Admission status updated successfully!" });
  });
});



// Update Admission Status API
app.put("/students/:id/admission-status", (req, res) => {
  const studentId = req.params.id;
  const  admission_status  = "Payment"

  if (!["Pending", "Approved", "Rejected","Payment"].includes(admission_status)) {
    return res.status(400).json({ error: "Invalid admission status" });
  }

  const sql = "UPDATE students SET admission_status = ? WHERE id = ?";
  db.query(sql, [admission_status, studentId], (err, result) => {
    if (err) {
      console.error("Error updating admission status:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Admission status updated successfully!" });
  });
});


app.put("/students/:id/mark", (req, res) => {
  console.log('hi');
  
  const studentId = req.params.id;
  const  {marks}  = req.body

 

  const sql = "UPDATE exam_details SET result = ? WHERE applicantId = ?";
  db.query(sql, [marks, studentId], (err, result) => {
    if (err) {
      console.error("Error updating admission status:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Mark status updated successfully!" });
  });
});


// GET ALL PROGRAMS
app.get("/programs", async (req, res) => {
  try {
    const programs = await query("SELECT * FROM programs");
    res.json(programs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}); 



app.post("/students", async (req, res) => {
  try {
    const {
      fullname,
      fatherName,
      motherName,
      dobYear,
      dobMonth,
      dobDay,
      gender,
      qualification,
      category,
      aadhar,
      email,
      mobile,
      alternateMobile,
      address,
      permanent_address,
      nationality,
      district,
      pincode,
      state,
      keralite,
      religion,
      caste,
      uid
    } = req.body;

    console.log("Received data:", req.body);

    // Validate required fields
    const requiredFields = ['fullname', 'email', 'dobYear', 'dobMonth', 'dobDay', 'mobile', 'district'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        missingFields: missingFields
      });
    }

    // Set default values
    const password = "";
    const course = "";
    const admission_status = "Pending";
    const registration_status = "pending";

    // Insert into database
    const result = await query(
      `INSERT INTO students (
        name, email, password, course, father_name, mother_name, 
        aadhar_number, alternate_mobile, nationality, state, 
        permanent_address, pincode, keralite_status, dobYear, 
        dobMonth, dobDay, mobile, district, admission_status, registration_status,
        gender, qualification, category, address, religion, caste,uid
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
      [
        fullname, email, password, course, fatherName, motherName,
        aadhar, alternateMobile, nationality, state,
        permanent_address, pincode, keralite, dobYear,
        dobMonth, dobDay, mobile, district, admission_status, registration_status,
        gender, qualification, category, address, religion, caste,uid
      ]
    );
    const insertedId = result.insertId;

    res.status(201).json({
      message: "Student record inserted successfully",
      studentId: insertedId
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      error: "Server error",
      details: err.message
    });
  }
});



// API to Get All Students Data
app.get("/studentskgkjhjk", (req, res) => {
  const sql = "SELECT * FROM students where admission_status='payment'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});



// API to Get All Students Data
app.get("/studentskgk", (req, res) => {
  const sql = "SELECT * FROM students where admission_status='Approved'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});


// API to Get All Students Data
app.get("/studentskgkjhjjhgjhk", (req, res) => {
  const sql = "SELECT * FROM students where admission_status='Approved'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});


app.post('/api/save-programs', async (req, res) => {
  try {
    const { studentId, qualification, selectedPrograms } = req.body;

    // Validate input
    if (!studentId || !qualification || !selectedPrograms || selectedPrograms.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Prepare program data for insertion
    const programValues = selectedPrograms.map(program => [
      studentId,
      qualification,
      program
    ]);

    // Insert programs into database
    await query(
      `INSERT INTO tbl_student_course 
       (student_id,  qualification, program_name) 
       VALUES ?`,
      [programValues]
    );

    res.status(201).json({
      success: true,
      message: "Programs saved successfully"
    });
  } catch (err) {
    console.error("Error saving programs:", err);
    res.status(500).json({
      error: "Failed to save programs",
      details: err.message
    });
  }
});


// Add this to your backend API
app.put("/students/:id/set-exam", (req, res) => {
  const { id } = req.params;
  const { examDate, examCenter } = req.body;

  const sql = "UPDATE students SET exam_date = ?, exam_center = ? WHERE id = ?";
  db.query(sql, [examDate, examCenter, id], (err, result) => {
    if (err) {
      console.error("Error updating exam details:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Exam details updated successfully" });
  });
});



// Get all exam details
app.get("/exam-details", (req, res) => {
  const sql = "SELECT * FROM exam_details";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching exam details:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Create new exam detail
app.post("/exam-details", (req, res) => {
  const { examDate, applicantId, examCenter,examTime } = req.body;
  const sql = "INSERT INTO exam_details (date, time, center,applicantId) VALUES (?, ?, ?, ?)";
  db.query(sql, [examDate, examTime, examCenter,applicantId], (err, result) => {
    if (err) {
      console.error("Error creating exam detail:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ id: result.insertId, message: "Exam detail created successfully" });
  });
});

// Update exam detail
app.put("/exam-details/:id", (req, res) => {
  const { id } = req.params;
  const { date, time, center } = req.body;
  const sql = "UPDATE exam_details SET date = ?, time = ?, center = ? WHERE id = ?";
  db.query(sql, [date, time, center, id], (err, result) => {
    if (err) {
      console.error("Error updating exam detail:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Exam detail updated successfully" });
  });
});

// Delete exam detail
app.delete("/exam-details/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM exam_details WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting exam detail:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Exam detail deleted successfully" });
  });
});

// Assign exam to student
app.put("/students/:id/assign-exam", (req, res) => {
  const { id } = req.params;
  const { exam_detail_id } = req.body;
  const sql = "UPDATE students SET exam_detail_id = ? WHERE id = ?";
  db.query(sql, [exam_detail_id, id], (err, result) => {
    if (err) {
      console.error("Error assigning exam to student:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Exam assigned to student successfully" });
  });
});


// Get exam details by ID
app.get("/api/exam-details/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM exam_details WHERE applicantId = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching exam details:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Exam details not found" });
    }
    res.json(results[0]);
  });
});



// Update your existing student application query
app.get("/api/getApplication/:studentId", (req, res) => {
  const { studentId } = req.params;
  const sql = "SELECT * FROM students WHERE uid = ?";
  db.query(sql, [studentId], (err, results) => {
    if (err) {
      console.error("Error fetching application:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});
// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.get("/ranklistALLLL", (req, res) => {
  const sql = `
    SELECT 
     *
    FROM students s
    INNER JOIN exam_details e ON s.id = e.applicantId
    WHERE e.result > 0
    ORDER BY e.result DESC
  `;
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching rank list:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    // Add rank position
    const rankedResults = results.map((item, index) => ({
      ...item,
      rank_position: index + 1
    }));
    
    res.json(rankedResults);
  });
});



app.get("/api/student-rank/:studentId", (req, res) => {
  const { studentId } = req.params;
  const sql = `
    SELECT 
      s.*,
      e.result,
      (SELECT COUNT(*) + 1 
       FROM exam_details e2 
       JOIN students s2 ON s2.id = e2.applicantId 
       WHERE e2.result > e.result) as rank_position
    FROM students s
    INNER JOIN exam_details e ON s.id = e.applicantId
    WHERE s.uid = ? AND e.result > 0
  `;
  
  db.query(sql, [studentId], (err, results) => {
    if (err) {
      console.error("Error fetching student rank:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Student not found or no results" });
    }
    res.json(results[0]); // Return single student record
  });
});



app.post("/api/upload-certificates", upload.fields([
  { name: 'certificate_0_file', maxCount: 1 },
  { name: 'certificate_1_file', maxCount: 1 },
  { name: 'certificate_2_file', maxCount: 1 },
  { name: 'certificate_3_file', maxCount: 1 },
  { name: 'certificate_4_file', maxCount: 1 }
]), (req, res) => {
  const studentId = req.body.studentId;
  const certificates = [];
  
  // Process each certificate
  for (let i = 0; i < 5; i++) {
    const name = req.body[`certificate_${i}_name`];
    const file = req.files[`certificate_${i}_file`];
    
    if (name && file) {
      certificates.push({
        studentId,
        name,
        filePath: file[0].path,
        uploadedAt: new Date()
      });
    }
  }

  // Insert certificates into database (adjust SQL according to your schema)
  const sql = "INSERT INTO certificates (student_id, name, file_path, uploaded_at) VALUES ?";
  const values = certificates.map(cert => [cert.studentId, cert.name, cert.filePath, cert.uploadedAt]);

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Error saving certificates:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Certificates uploaded successfully", count: result.affectedRows });
  });
});


// Get certificates for a student
app.get("/api/certificates/:studentId", (req, res) => {
  const { studentId } = req.params;
  const sql = "SELECT * FROM certificates WHERE student_id = ?";
  
  db.query(sql, [studentId], (err, results) => {
    if (err) {
      console.error("Error fetching certificates:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Update certificate status
app.put("/api/certificates/:certificateId/status", (req, res) => {
  const { certificateId } = req.params;
  const { status } = req.body;
  const sql = "UPDATE certificates SET status = ? WHERE certificate_id = ?";
  
  db.query(sql, [status, certificateId], (err, result) => {
    if (err) {
      console.error("Error updating certificate status:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Certificate status updated" });
  });
});

// Serve static files
