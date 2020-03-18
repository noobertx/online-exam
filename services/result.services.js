const Result = require('./../models/result.js');
const catchAsync = require("./catchAsync.service");
const AppError = require("./appError");
const factory = require("./handlerFactory");

exports.getAllResults = factory.getAll(Result);

exports.setUserQuizId = (req,res,next)=>{
	if(!req.body.quiz) req.body.quiz = req.params.quizId
	if(!req.body.user) req.body.user = req.user.id
		next();
}
exports.getResult = factory.getOne(Result);

exports.createResult = factory.createOne(Result)

exports.deleteResult = factory.deleteOne(Result)

exports.updateResult = factory.updateOne(Result);