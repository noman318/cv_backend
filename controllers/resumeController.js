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
      hobbies: req.body.hobbies,
      skype: req.body.skype,
      twitter: req.body.twitter,
      experience: req.body.experience,
      education: req.body.education,
      github: req.body.github,
      linkedIn: req.body.linkedIn,
    });
    // console.log("resume", resume);

    await resume.save();

    res.send({
      err: 0,
      msg: "Resume Created Sucessfully",
      id: resume._id,
      resume,
    });
  } catch (error) {
    console.error(error);
    res.send({ err: 1, msg: error });
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

const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume)
      return res
        .status(404)
        .send("The resume with the given ID was not found.");

    res.send({
      msg: "Resume Found",
      resume,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createResume, getAllResume, updateResume, getResumeById };
