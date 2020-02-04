const Quiz = require("./../models/quiz.js");

exports.createQuiz = async (req,res)=>{
	try{
		const newQuiz = await Quiz.create(req.body.quiz)
		res.status(201).json({
			status:'success',
			data:{
				quiz:newQuiz
			}	
		})
	}catch(err){
		res.status(400).json({
			status:'fail',
			message:err
		})
	}	
}

exports.getAllQuiz = async(req,res)=>{
	try{		
	const quiz = await Quiz.find();
	res.status(200).json(quiz)
	}catch(err){
		res.status(404).json({
			status:'fail',
			message:err
		})
	}
}

exports.getQuizById = async(req,res)=>{
	try{		
	const quiz = await Quiz.findOne({_id:req.params.id});
	res.status(200).json(quiz)
	}catch(err){
		res.status(404).json({
			status:'fail',
			message:err
		})
	}
}

exports.deleteQuiz = async(req,res)=>{
	try{		
	const quiz = await Quiz.deleteOne({_id:req.params.id});
	res.status(200).json(quiz)
	}catch(err){
		res.status(404).json({
			status:'fail',
			message:err
		})
	}
}