const dbConnection = require("../db/database.js");
const { StatusCodes } = require("http-status-codes"); // status code

//ask question
async function askQuestion(req, res) {
  const { username, user_id } = req.user;
  const { question, description } = req.body;
  if (!question || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide full information" });
  }
  try {
    await dbConnection.query(
      "INSERT INTO question(user_id,question,description) VALUES (?,?,?)",
      [user_id, question, description]
    );
    return res
      .status(StatusCodes.OK)
      .json({ success: "ask question successful.", username });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong on the server." });
  }

  // res.send("questions")
}

//get all-questions
async function getAllQuestions(req, res) {
  try {
    const query =
    "SELECT question.*, users.username, users.user_id FROM question INNER JOIN users ON question.user_id = users.user_id ORDER BY question.question DESC";
    const [results] = await dbConnection.query(query);
    // Process the results here, e.g., send them as a JSON response
    return res.status(StatusCodes.OK).json(results);
  } catch (error) {
    // Handle any errors that may occur during the query
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); 
  }
}

//question detail
async function questionDetail(req, res) {
    try {
        const { question_id } = req.query;
        const query = "SELECT question_id,question, description FROM question WHERE question_id = ?";
        const [results] = await dbConnection.query(query, [question_id]);

        // Check if there are any results
        if (results.length > 0) {
            return res.status(StatusCodes.OK).json(results); // Assuming you want to send the first matching result as JSON
        } else {
            return res.status(404).json({ error: 'Question not found' });
        }
    } catch (error) {
        // Handle any errors that may occur during the query
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { askQuestion, getAllQuestions,questionDetail };