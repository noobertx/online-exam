class AppError extends Error {
	constructor(message,statusCode){
		super(message);
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('4') ? 'fa il' : 'error';
		this.isOperational = true;

		Error.captureStackTrace(this,this.constructor)
	}
}

module.exports = AppError;