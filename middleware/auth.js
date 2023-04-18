const jwt = require("jsonwebtoken");

require("dotenv").config();
const secret = process.env.secret;
function auth(req, res, next) {
  const token = req.header("token");
  console.log(token);
  if (!token) {
    //401 Unauthorized
    return res.status(401).send("Please Login first to access this endpoint!");
  }

  try {
    const decodedToken = jwt.verify(token, secret);
    req.user = decodedToken;
    console.log(decodedToken);
    next();
  } catch (ex) {
    res.status(401).send("Unauthorized User");
  }
}

module.exports = { auth };
