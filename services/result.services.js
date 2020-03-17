const Result = require('./../models/result.js');
const catchAsync = require("./catchAsync.service");
const AppError = require("./appError");


exports.getAllResults = catchAsync(async(req,res,next) => {
	const results = await Result.find({});

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

exports.createResult = catchAsync(async(req,res,next)=>{
	const newResult = await Result.create(req.body)

	res.status(201).json({
		status:'success',
		data:{
			result:newResult
		},
	})
})