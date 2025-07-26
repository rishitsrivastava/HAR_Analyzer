const express = require("express");
const router = express.Router();

const upload = require("../middlewares/fileUpload.js");

// Temporary handler just to check upload success
router.post("/upload", upload.single("harFile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({
    message: "File uploaded successfully",
    file: req.file.filename,
    path: req.file.path,
  });
});

module.exports = router;
