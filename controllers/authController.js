const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, validateUser } = require("../models/user");
require("dotenv").config();
const secret = process.env.secret;
// console.log("secret", secret);

async function register(req, res) {
  // console.log(req.body);
  const validationResult = validateUser(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.send({
      err: "1",
      msg: "Try any other email, this email is already registered!",
    });
  }

  let userPhone = await User.findOne({ phone: req.body.phone });

  if (userPhone) {
    return res.send({ err: "1", msg: "Number Already exists" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const user = new User({
      ...req.body,
      password: await bcrypt.hash(req.body.password, salt),
    });
    const response = await user.save();
    const token = jwt.sign(
      {
        _id: response._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: response.email,
        phone: response.phone,
      },
      secret
    );
    res.send({
      err: 0,
      status: 200,
      msg: "Registered Successfully",
      token: token,
      id: response._id,
      email: response.email,
    });
  } catch (ex) {
    res.status(400).send(ex.message);
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    return res.send({ err: 1, msg: "This email has not been registered!" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.send({ err: 1, msg: "Invalid Credentials!" });
  }

  const token = jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    },
    secret
  );
  res.send({
    status: 200,
    msg: "User Logged in Sucessfully",
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    isAuthenticated: true,
    token: token,
    err: 0,
  });
}

module.exports = { register, login };
