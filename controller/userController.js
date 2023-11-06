const dbConnection = require("../db/database.js"); //database connection
const bcrypt = require("bcrypt"); //bcrypt
const { StatusCodes } = require("http-status-codes"); // status code
const jwt = require("jsonwebtoken"); // json web token

//---registration controller------//
async function register(req, res) {
    const { username, firstname, lastname, email, password } = req.body;
  
    if (!username || !firstname || !lastname || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Please provide all information." });
    }
  
    if (password.length < 8) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Weak password. It must be at least 8 characters long." });
    }
  
    try {
      const [user] = await dbConnection.query(
        "SELECT username, user_id from users WHERE username = ? OR email = ?",
        [username, email]
      );
  
      if (user.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "You already have an account." });
      } else {
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
  
        await dbConnection.query(
          "INSERT INTO users(username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
          [username, firstname, lastname, email, hashedPassword]
        );
  
        return res.status(StatusCodes.OK).json({ success: "Signup successfully." });
      }
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Something went wrong on the server." });
    }
  }
//-------login controller---------//
async function login(req, res) {
  const { email, password } = req.body;
  console.log(email)
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide full information" });
  }
  try {
    const [user] = await dbConnection.query(
      "SELECT username, user_id,password FROM users WHERE email= ?",
      [email]
    );
    if (user == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password); //compare password
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    } else {
      //  -------------return jwt------------//
      const username = user[0].username;
      const user_id = user[0].user_id;
      const token = jwt.sign({ username, user_id }, process.env.TOKENSCREAT, { 
        expiresIn: "1d",
      });

      res.status(StatusCodes.OK).json({ msg: "log in successfully", token ,username,user_id});
    }
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something wrong  bro" });
  }
}
// check user controller
async function check(req, res) {
    const {username, user_id} = req.user
    res.status(StatusCodes.OK).json({msg :"valid user", user_id, username})
    // res.send("check user"); 
}

module.exports = { register, login, check }; 