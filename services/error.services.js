const AppError = require("./appError");
const sendErrorDev = (err,res)=>{
	res.status(err.statusCode).json({
		status:err.status,
		err:err,
		message:err.message,
		stack:err.stack,
	})
}
const sendErrorProduction = (err,res)=>{
	if(err.isOperational){
		res.status(err.statusCode).json({
			status:err.status,
			message:err.message,
		})
	}else{
		res.status(500).json({
			status:"Error",
			message:"Something went very wrong!"
		})
	}
}
const handleCastErrorDB = err => {
	const message = `Invalid ${err.path} with the value of ${err.value}`;
	return new AppError(message,400);
}
const handleDuplicateFieldsDB = err => {
	const value = err.errmsg.match(/(["'"])(\\?.)*?\1/)[0];
	const message = `Duplicate Field Value  ${value} Please use another value`;
	return new AppError(message,400);
}
const handleValidationErrorDB = err => {
	return new AppError(message,400);
}

module.exports = (err,req,res,next)=>{
	// console.log(err.stack);

	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';


	// if(process.env.NODE_ENV === 'development' ){
	// }else if(process.env.NODE_ENV === 'production' ){
	// 	sendErrorProduction(err,res);

	let  error = {...err};
	if(error.name==="CastError") error = handleCastErrorDB(error)
	if(error.name==="ValidationError") error = handleValidationErrorDB(error)
	if(error.code===11000) error = handleDuplicateFieldsDB(error)
	
	sendErrorProduction(error,res);
	// }
}