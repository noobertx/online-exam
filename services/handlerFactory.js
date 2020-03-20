const catchAsync = require("./catchAsync.service");
const AppError = require("./appError");
// const APIFeatures = require("./apiFeatures");

class APIFeatures{
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