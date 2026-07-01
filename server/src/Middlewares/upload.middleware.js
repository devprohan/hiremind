const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary.js");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "hiremind/resumes",
        resource_type: "raw",
        allowed_formats: ["pdf"],
    },
});

const fileFilter = (req, file, cb) => {
    console.log("Original Name:", file.originalname);
    console.log("Mime Type:", file.mimetype);

    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});

module.exports = upload;