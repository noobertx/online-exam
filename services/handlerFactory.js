const catchAsync = require("./catchAsync.service");
const AppError = require("./appError");
const APIFeatures = require("./apiFeatures");

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

exports.createOne = Model => catchAsync( async (req,res,next)=>{
	const doc = await Model.create(req.body)
		res.status(201).json({
			status:'success',
			data:{
			data:doc
		}	
	})	
})

exports.getOne = (Model,popOptions) => catchAsync( async (req,res,next) => {
	let query = Model.findById(req.params.id);

	if(popOptions) query = query.populate(popOptions)

	const doc = await query;

	if(!doc){
		return next(new AppError('No document Found With that ID',404));
	}
	res.status(200).json({
		status:'success',
		data:{
			data:doc
		}
	})
})

exports.getAll = Model => catchAsync( async(req,res,next)=>{	
	const features = new APIFeatures(Model.find(),req.query).filter().sort().limitFields().paginate();
	const doc = await features.query

	res.status(200).json({
		status:"success",
		results:doc.length,
		data:{
			data:doc
		}
	})
})