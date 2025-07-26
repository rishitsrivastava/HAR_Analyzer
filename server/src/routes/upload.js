const express = require("express");
const router = express.Router();
const { handleUpload } = require("../controllers/harController.js");

const upload = require("../middlewares/fileUpload.js");

// Temporary handler just to check upload success
router.post("/upload", upload.single("harFile"), handleUpload);


module.exports = router;
