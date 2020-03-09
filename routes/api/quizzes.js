const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const authUser = require("../../services/auth-user.services");

const Quiz = require("../../services/Quiz.services");
router.get('/',authUser.protect,function(req,res){
	Quiz.getAllQuiz(req,res);
})

router.get('/:id',function(req,res,next){
	Quiz.getQuizById(req,res,next);
})

router.post('/',upload.none(),function(req,res,next){
	Quiz.createQuiz(req,res,next);
})

router.put('/:id',function(req,res,next){

	Quiz.updateQuizById(req,res,next);
})


router.delete('/:id',upload.none(),async (req,res,next)=>{	
	Quiz.deleteQuiz(req,res,next);
})
module.exports = router;