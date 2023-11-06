const dbConnection = require("../db/database.js");
const { StatusCodes } = require("http-status-codes"); // status code

//ansewr the question
async function answerQuestion(req, res) {
  try {
    const { user_id } = req.user;
    const { question_id, answer } = req.body;

    if (answer.trim() === "") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please provide your answer" });
    }

    // Make sure to validate and sanitize the input data as needed

    const query =
      "INSERT INTO answer (user_id, question_id, answer) VALUES (?, ?, ?)";
    await dbConnection.query(query, [user_id, question_id, answer]);

    return res.status(201).json({ message: "Answer submitted successfully" });
  } catch (error) {
    // Handle any errors that may occur during the query
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
//get the ansswer
async function getAnswer(req, res) {
  try {
    const { user_id,username } = req.user;
    const { question_id } = req.query ;
    const query = `
      SELECT users.*, answer.*
      FROM users
      INNER JOIN answer ON users.user_id = answer.user_id
      WHERE question_id = ?
      ORDER BY answer.answer DESC;
    `;
    
    const [results] = await dbConnection.query(query, [question_id])

    // Process the results and send them as a JSON response
    return res.json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { answerQuestion, getAnswer };


