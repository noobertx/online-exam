const Quiz = require("./../models/quiz.js");
const ObjectId = require('mongodb').ObjectID
const AppError = require("./appError");
const catchAsync = require("./catchAsync.service");
const factory = require("./handlerFactory");
const APIFeatures = require("./apiFeatures");


exports.createQuiz = factory.createOne(Quiz);


exports.getAllQuiz = catchAsync( async(req,res,next)=>{
	
	try{		
	const features = new APIFeatures(Quiz.find(),req.query).filter().sort().limitFields().paginate();
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

exports.getQuizById =  factory.getOne(Quiz)
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