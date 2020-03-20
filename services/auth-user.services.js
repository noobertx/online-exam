const crypto = require("crypto");
const {promisify} = require("util");
const User = require("./../models/user.js");
const catchAsync = require("./catchAsync.service");
const jwt = require("jsonwebtoken");
const AppError = require("./appError")
const sendEmail = require("./email");
const factory = require("./handlerFactory");

const filterObj = (obj,...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach(el=>{
		if(allowedFields.includes(el)){
			newObj[el]=obj[el];
		}
	})
	return newObj;
}

const signToken = id => {
	return jwt.sign({id:id},process.env.REFRESH_TOKEN_SECRET,{
		expiresIn:process.env.TOKEN_EXPIRES_IN
	});
}



const createSendToken = (user,statusCode,res)=>{
	
	const token = signToken(user._id)
	const cookieOptions = {
		expires: new Date(Date.now+process.env.JWT_COOKIES_EXPIRES_IN*24*60*60*1000),
		httpOnly:true
	}

	if(process.env.NODE_ENV === 'production') cookieOptions.secure = true

	res.cookie('jwt',token,cookieOptions)

	user.password = undefined;

	res.status(statusCode).json({
		status:'success',
		token,
		data:{
			user: user
		}
	})

}
exports.getAllUsers = factory.getAll(User);

exports.updateMe = catchAsync(async(req,res,next) => {
	if(req.body.password || req.body.passwordConfirm ){
		return next(new AppError("This route is not for password update user/updateMYPassword",400))
	}


	const filteredBody = filterObj(req.body,'name','email');

	const updatedUser = await User.findByIdAndUpdate(req.user.id,filteredBody,{
		new:true,
		runValidators:true
	});

	res.status(200).json({
		status:"success",
		data:{
			user:updatedUser
		}
	})
})


exports.deleteMe = catchAsync(async(req,res,next)=> {
	await User.findByIdAndUpdate(req.user.id,{active:false})

	res.status(204).json({
		status:"success",
		data:null
	})
})
exports.signup = catchAsync( async(req,res,next) => {
	const newUser = await User.create({
		name:req.body.name,
		email:req.body.email,
		password:req.body.password,
		passwordConfirm:req.body.passwordConfirm
	});
	createSendToken(newUser,201,res)

	
})

exports.login = catchAsync(async(req,res,next) => {
	const { email,password } = req.body;
	// check if email and password exists



	if(!email || !password){
		return next(new AppError('Please provide email and password',400));
	}
	// check if user exists && password is valid
	const user =await User.findOne({email}).select('+password')
	const correct = await user.correctPassword(password,user.password);
	// If everything is ok, send token to the client
	if(!correct || !user){
		return next(AppError("Incorrect email or password",401))
	}

	createSendToken(user,200,res)

	

})


exports.protect  = catchAsync(async (req,res,next) => {
	let token;
	// get the token and see if its there
	if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
		token = req.headers.authorization.split(" ")[1];
	}
	if(!token){
		return next(new AppError('You are not logged In! Please login to get access',401))
	}

	// validate token
	const decoded = await promisify(jwt.verify)(token, process.env.REFRESH_TOKEN_SECRET);	

	// if user exists
	const freshUser = await User.findById(decoded.id);
	if(!freshUser){
		return next(new AppError("the user belonging to this token no longer exists",401));
	}

	//user changed password after JWT was issued

	if(freshUser.changePasswordAfter(decoded.iat)){
		return next(AppError('User recently chanaged password! Please Login again',401))
	}

	// Grants access to protected route
	req.user = freshUser;
	next()
})

exports.restrictTo = (...roles) => {
	return (req,res,next) =>{
		if(!roles.includes(req.user.role)){
			return next(new AppError('You do not have permission to perform this action',403))
		}
		next();
	}
}

exports.forgotPassword =catchAsync(async (req,res,next)  => {
	//get user by email
	const user = await User.findOne({email:req.body.email})


	if(!user){
		return next(new AppError('No User found with that email',404))
	}

	// generate random reset token
	const resetToken = user.createPasswordResetToken();
	await user.save({validateBeforeSave:false});

	const resetURL = `${req.protocol}://${req.get('host')}/api/user/resetPassword/${resetToken}`
	const message = `Forgot your password ? Submit a request with your new password and password Confirm to ${resetURL}  \n If you didnt, please ignore this email`


	try{
		await sendEmail({
		email:user.email,
		subject:'Password Reset Token',
		message:message
		})

	res.status(200).json({
		status:'success',
		message:'Token sent to email'
	})
	}catch(err){
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({validateBeforeSave:false});

		return next(new AppError("There was an error sending email, Try again later"),500)
	}

	
})
exports.resetPassword = catchAsync( async (req,res,next)  => {
	const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

	const user =  await User.findOne({passwordResetToken:hashedToken,passwordResetExpires : { $gt:Date.now() }});

	if(!user){
		console.log("Error")
		return next(new AppError("Token is invalid or expired",404))
	}

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;

	await user.save();

	createSendToken(user,200,res)

})

exports.updatePassword = catchAsync( async (req,res,next)  => {
	const user = await User.findById(req.user.id).select("+password");
	if(!(await user.correctPassword(req.body.passwordCurrent,user.password))){
		return next(new AppError("Your Current password is incorrect",401))
	}

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	await user.save();

	createSendToken(user,200,res)
})

exports.getUser = factory.getOne(User);

exports.deleteUser = factory.deleteOne(User);
// Do not update passwords with this
exports.updateUser = factory.updateOne(User);

exports.getMe = (req,res,next)=>{
	req.params.id = req.user.id
	next();
}