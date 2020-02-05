const Quiz = require("./../models/quiz.js");
const ObjectId = require('mongodb').ObjectID
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

exports.updateQuizById = async(req,res)=>{
	try{		
	const body = req.body.quiz
	console.log(body);
	const quiz = await Quiz.updateOne({_id:req.params.id},{
		$set:{
			title:body.title,
			intro:body.intro,
			quizItems:body.quizItems,
			settings:body.settings,
			meta:body.meta
		}
	});
	res.status(200).json(quiz)
	}catch(err){
		res.status(404).json({
			status:'fail',
			message:err
		})
	}
}