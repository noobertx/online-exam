const catchAsync = require("./catchAsync.service");
const AppError = require("./appError");

exports.deleteOne = Model => catchAsync(async(req,res,next)=>{		
	const doc = await Model.deleteOne({_id:req.params.id});
	if(!doc){
		return next(new AppError('No document Found With that ID',404));
	}
	res.status(204).json({
		status:"success",
		data:null
	})
})

exports.updateOne = Model=> catchAsync(async(req,res,next)=>{	
	const body = req.body.quiz
	const doc = await Model.findByIdAndUpdate(req.params.id,{
		new:true,
		runValidators:true
	});
	if(!doc){
		return next(new AppError('No quiz Found With that ID',404));
	}
	res.status(200).json({
		status:"success",
		data:{
			data:doc
		}
	})	
})