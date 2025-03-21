const express = require("express");
const upload = require("../middleware/multerConfig"); // Import multer config

const router = express.Router();

// ✅ Upload API Route
router.post("/upload", upload.fields([{ name: "photo", maxCount: 1 }, { name: "signature", maxCount: 1 }]), (req, res) => {
  if (!req.files || !req.files.photo || !req.files.signature) {
    return res.status(400).json({ error: "❌ Both Photo and Signature are required!" });
  }

  const photoPath = `/uploads/${req.files.photo[0].filename}`;
  const signaturePath = `/uploads/${req.files.signature[0].filename}`;

  res.json({
    message: "✅ Upload successful!",
    photoUrl: photoPath,
    signatureUrl: signaturePath,
  });
});

// ✅ Export Router
module.exports = router;
