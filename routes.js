const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname); // Keep original extension
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage
});

router.route("/addimage").post(upload.single("img"), (req, res) => {
    try {
        // Return just the filename instead of the full path
        res.json({ filename: req.file.filename });
    } catch (e) {
        return res.json({ error: e.message });
    }
});

module.exports = router;
