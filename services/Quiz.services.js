const Quiz = require("./../models/quiz.js");
const ObjectId = require('mongodb').ObjectID
const AppError = require("./appError");
const catchAsync = require("./catchAsync.service");
const factory = require("./handlerFactory");


exports.createQuiz = factory.createOne(Quiz);

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

exports.getQuizById =  catchAsync( async (req,res,next) => {
	const quiz = await Quiz.findById(req.params.id);
	if(!quiz){
		return next(new AppError('No quiz Found With that ID',404));
	}
	res.status(200).json({
		status:'success',
		data:{
			quiz
		}
	})
})
exports.deleteQuiz = factory.deleteOne(Quiz);
// exports.deleteQuiz =  catchAsync(async(req,res,next)=>{
		
// 	const quiz = await Quiz.deleteOne({_id:req.params.id});
// 	if(!quiz){
// 		return next(new AppError('No quiz Found With that ID',404));
// 	}
// 	res.status(200).json(quiz)

// })

exports.updateQuizById =  factory.updateOne(Quiz)

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