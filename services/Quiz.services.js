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
	

	class QuizAPIFeatures{
		constructor(query,queryString){
			this.query=query;
			this.queryString=queryString;
		}

		filter(){
			const queryObj = {...this.queryString}
			const excludedFields = ['page','sort','limit','fields']
			excludedFields.forEach(el=> delete queryObj[el])
			
			// 1b) Advance Filtering
			let queryStr = JSON.stringify(queryObj)
			queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g math=> `$${match}`)
			
			this.query = this.query.find(JSON.parse(queryStr))
			return this;
		}
	}

	try{		
	const features = new QuizAPIFeatures(Quiz.find(),req.query).filter();
	const quiz = await features.query
	// const quiz = await Quiz.find();
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