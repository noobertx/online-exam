const Quiz = require("./../models/quiz.js");
const ObjectId = require('mongodb').ObjectID

const catchAsync = fn => {
	return (req,res,next)=>{
		fn(req,res,next).catch(next);
	}
}

exports.createQuiz = catchAsync( async (req,res,next)=>{
	const newQuiz = await Quiz.create(req.body.quiz)
		res.status(201).json({
			status:'success',
			data:{
			quiz:newQuiz
		}	
	})	
})

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
			queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=> `$${match}`)
			
			this.query = this.query.find(JSON.parse(queryStr))
			return this;
		}

		sort(){
			if(this.queryString.sort){
				const sortBy = this.queryString.sort.split(",").join(' ');
				this.query = this.query.sort(sortBy)
				// sort('sortBy')
			}else{
				this.query = this.query.sort('-createdAt')	
			}
			return this;
		}

		limitFields(){
			if(this.queryString.fields){
				const fields = this.queryString.fields.split(",").join(' ');
				this.query = this.query.select(fields)
			}else{
				this.query = this.query.select('-__v')		
			}
			return this;
		}

		paginate(){
			const page = this.queryString.page *1 || 1;
			const limit = this.queryString.limit *1 || 100;
			const skip = (page -1) * limit;
			this.query = this.query.skip(skip).limit(limit);			
				//if(this.queryString.page){
				//	const numTours = await Tour.countDocuments();
				//	if(skip >= numTours){
				//		throw new Error('This page does not exist');
				//	}
				//}
			return this;
		}
	}

exports.getAllQuiz = catchAsync( async(req,res,next)=>{
	
	try{		
	const features = new QuizAPIFeatures(Quiz.find(),req.query).filter().sort().limitFields().paginate();
	const quiz = await features.query
	// const quiz = await Quiz.find();
	res.status(200).json(quiz)
	}catch(err){
		res.status(404).json({
			status:'fail',
			message:err
		})
	}
})

exports.getQuizById =  catchAsync(async(req,res,next)=>{
	try{		
	const quiz = await Quiz.findOne({_id:req.params.id});
	res.status(200).json(quiz)
	}catch(err){
		res.status(404).json({
			status:'fail',
			message:err
		})
	}
})

exports.deleteQuiz =  catchAsync(async(req,res,next)=>{
	try{		
	const quiz = await Quiz.deleteOne({_id:req.params.id});
	res.status(200).json(quiz)
	}catch(err){
		res.status(404).json({
			status:'fail',
			message:err
		})
	}
})

exports.updateQuizById =  catchAsync(async(req,res,next)=>{
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
})

/*
	router.route('tour-stats').get(tourController.getTourStats);
*/

/*


exports.getTourStats = async(req,res) =>{
	try{
		const stats = await Tour.aggregate([
			{
				$match : {ratingsAverage : {$gta :4.5}}
			},
			{
				$group:{
					_id:null,
					num:{ $sum : '$ratingsQuantity'},
					numRatings:{ $sum : '$ratingsQuantity'},
					avgRating:{ $avg : '$ratingsAverage'},
					avgPrice:{ $avg : '$price'},
					minPrice:{ $min : '$price'},
					maxPrice:{ $max : '$price'},
				}
			},{
				$sort :{
					avgPrice : 1
				}
			}
		]);
	}catch(err){
		res.status(404).json({
			status:'fail',
			message:err
		})
	}
}

exports.getMonthlyPlan = async(req,res) => {
	try{
		const year = req.params.year * 1
		const plan = await Tour.aggregate([
			{
				$unwind:'$startDates'
			},
			{
				$match : {startDates : {
						$gte : new Date(`${year}-01-01`),
						$lte : new Date(`${year}-12-31`)
					}
				}
			},
			{
				$group:{
					_id:{$month:'$startDates'},
					numTour:{$sum:1},
					tours : { $push : '$name'}
				}
			},{
				$addField: {month : '$_id'}
			},
			{
				$project:{
					_id:0
				}
			},
			{
				$sort:{
					numTourStarts:-1
				}
			}
		])
	}catch(err){
		res.status(404).json({
			status:'fail',
			message:err
		})
	}
}
*/