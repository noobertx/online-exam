const Quiz = require("./../models/quiz.js");
const ObjectId = require('mongodb').ObjectID
const AppError = require("./appError");
// const catchAsync = require("./catchAsync.service");
const factory = require("./handlerFactory");
const APIFeatures = require("./apiFeatures");


exports.createQuiz = factory.createOne(Quiz);
exports.getAllQuiz = factory.getAll(Quiz)
exports.getQuizById =  factory.getOne(Quiz)
exports.deleteQuiz = factory.deleteOne(Quiz);
exports.updateQuizById =  factory.updateOne(Quiz)
