const Result = require('./../models/result.js');
const catchAsync = require("./catchAsync.service");
const AppError = require("./appError");
const factory = require("./handlerFactory");

exports.getAllResults = catchAsync(async(req,res,next) => {
	let filter = {}
	if(req.params.quizId) filter = {quiz:req.params.quizId}

	const results = await Result.find(filter);

	if(results.length<1){
		return next(new AppError("Empty Results",404))
	}
	res.status(200).json({
		status:"success",
		results:results.length,
		data:{
			results
		}
	})
})

exports.setUserQuizId = (req,res,next)=>{
	if(!req.body.quiz) req.body.quiz = req.params.quizId
	if(!req.body.user) req.body.user = req.user.id
		next();
}

exports.createResult = factory.createOne(Result)

exports.deleteResult = factory.deleteOne(Result)

exports.updateResult = factory.updateOne(Result);