const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const Quiz = require("../../services/Quiz.services");
router.get('/',function(req,res){
	Quiz.getAllQuiz(req,res);
})

router.get('/:id',function(req,res){
	Quiz.getQuizById(req,res);
})

router.post('/',upload.none(),function(req,res){
	Quiz.createQuiz(req,res);
})

router.put('/:id',function(req,res){

	Quiz.updateQuizById(req,res);
})


router.delete('/:id',upload.none(),async (req,res)=>{	
	Quiz.deleteQuiz(req,res);
})
module.exports = router;