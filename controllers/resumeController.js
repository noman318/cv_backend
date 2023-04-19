const express = require("express");
const router = express.Router();
const { Resume, validateResume } = require("../models/resume");

const createResume = async (req, res) => {
  const validationResult = validateResume(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  try {
    const resume = new Resume({
      user: req.user._id,
      name: `${req.body.firstName} ${req.body.lastName}`,
      email: req.body.email,
      phone: req.body.phone,
      skills: req.body.skills,
      experience: req.body.experience,
      education: req.body.education,
    });

    await resume.save();

    res.send({
      msg: "Resume Created Sucessfully",
      resume,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const updateResume = async (req, res) => {
  try {
    const { error } = validateResume(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedResume)
      return res
        .status(404)
        .send("The resume with the given ID was not found.");

    res.send({
      msg: "Resume Updated Sucessfully",
      updatedResume,
    });
  } catch (ex) {
    console.log(ex);
    res.status(500).send("Something failed.");
  }
};

const getAllResume = async (req, res) => {
  const { userId } = req.params;
  try {
    const resumes = await Resume.find({ user: userId });
    res.send({
      msg: "All of your Resumes",
      resumes,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { createResume, getAllResume, updateResume };
