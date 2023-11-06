const { StatusCodes } = require("http-status-codes"); // status code
const jwt = require("jsonwebtoken"); // json web token
require("dotenv").config(); //dotenv config

async function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token (assuming it's in the format "Bearer <token>")

  try {
    const { username, user_id } = jwt.verify(token, process.env.TOKENSCREAT);
    req.user = { username, user_id };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid authorization token" });
  }
}

module.exports = auth;