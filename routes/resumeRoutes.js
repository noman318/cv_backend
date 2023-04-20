const express = require("express");
const { auth } = require("../middleware/auth");
const {
  createResume,
  getAllResume,
  updateResume,
  getResumeById,
} = require("../controllers/resumeController");

const router = express.Router();

router.post("/create-resume", auth, createResume);
router.get("/getall-resume/:userId", auth, getAllResume);
router.get("/get-resume/:id", auth, getResumeById);
router.put("/update-resume/:id", auth, updateResume);

module.exports = router;
