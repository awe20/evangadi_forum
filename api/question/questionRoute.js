const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth.js')

//question controllers
const {askQuestion,getAllQuestions,questionDetail} = require('../../controller/questionController.js');


// Define the route to handle asking questions
router.post("/ask-questions",auth,askQuestion); 

router.get("/all-questions",auth, getAllQuestions)

router.get("/question-detail",questionDetail) 

module.exports = router;  