const express = require('express');
const router = express.Router();


const auth = require('../../middleware/auth')

//ansewr controllers
const {answerQuestion,getAnswer} =require ('../../controller/answerController')

router.post("/answer-the-question",auth,answerQuestion) 
router.get("/get-the-answer",auth,getAnswer)  

module.exports = router;       