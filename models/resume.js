const mongoose = require("mongoose");
const Joi = require("joi");

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  experience: [
    {
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
      },
    },
  ],
  education: [
    {
      institution: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      percentage: {
        type: Number,
        required: true,
      },
      fieldOfStudy: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
      },
    },
  ],
  hobbies: {
    type: [String],
  },
  linkedIn: {
    type: String,
    required: true,
  },
  skype: {
    type: String,
  },
  twitter: {
    type: String,
  },
  github: {
    type: String,
    required: true,
  },
});

const Resume = mongoose.model("Resume", resumeSchema);

const validateResume = (resume) => {
  const resumeSchema = Joi.object({
    firstName: Joi.string().min(0).max(50).required(),
    lastName: Joi.string().min(0).max(50).required(),
    email: Joi.string().email().min(5).max(255).required(),
    phone: Joi.string().min(10).max(10).required(),
    linkedIn: Joi.string().min(5).max(50).required(),
    github: Joi.string().min(5).max(50).required(),
    skype: Joi.string().min(5).max(50),
    twitter: Joi.string().min(5).max(50),
    address: Joi.string().min(0).max(255),
    summary: Joi.string().min(0).max(1000),
    experience: Joi.array().items(
      Joi.object({
        position: Joi.string().min(0).max(255).required(),
        location: Joi.string().min(0).max(255).required(),
        company: Joi.string().min(0).max(255).required(),
        startDate: Joi.date().required(),
        endDate: Joi.date(),
        description: Joi.string().min(0).max(1000),
      })
    ),
    education: Joi.array().items(
      Joi.object({
        institution: Joi.string().min(0).max(255).required(),
        fieldOfStudy: Joi.string().min(0).max(255).required(),
        degree: Joi.string().min(0).max(255).required(),
        percentage: Joi.number().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date(),
        description: Joi.string().min(0).max(1000),
      })
    ),
    skills: Joi.array().items(Joi.string().min(0).max(255)),
    hobbies: Joi.array().items(Joi.string().min(0).max(50)),
  });

  const validationResult = resumeSchema.validate(resume);
  return validationResult;
};

module.exports = { Resume, validateResume };
