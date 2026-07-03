const express = require("express");

const router = express.Router();

const { uploadResume, getMyResumes, getResumeById, deleteResume, reanalyzeResume } = require("../Controllers/resume.controller.js");
const protect = require("../Middlewares/auth.middleware.js");
const upload = require("../Middlewares/upload.middleware.js");

router.post("/upload", protect, upload.single("resume"), uploadResume);
router.get("/my-resumes", protect, getMyResumes)
router.get("/:id", protect, getResumeById)
router.delete("/:id", protect, deleteResume)
router.put("/reanalyze/:id", protect, reanalyzeResume)

module.exports = router