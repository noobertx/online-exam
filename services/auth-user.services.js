const {promisify} = require("util");
const User = require("./../models/user.js");
const catchAsync = require("./catchAsync.service");
const jwt = require("jsonwebtoken");
const AppError = require("./appError")
const sendEmail = require("./email");

const signToken = id => {
	return jwt.sign({id:id},process.env.REFRESH_TOKEN_SECRET,{
		expiresIn:process.env.TOKEN_EXPIRES_IN
	});
}


exports.getAllUsers = catchAsync(async (req,res,next)=>{
	const users = await User.find()
	res.status(200).json({
		status:'success',
		results:users.length,
		data:{
			users
		}
	})
})
exports.signup = catchAsync( async(req,res,next) => {
	const newUser = await User.create({
		name:req.body.name,
		email:req.body.email,
		password:req.body.password,
		passwordConfirm:req.body.passwordConfirm
	});


	const token = signToken(newUser._id)

	res.status(201).json({
		status:'success',
		token,
		data:{
			user: newUser
		}
	})
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

	const token = signToken(user._id)
	res.status(200).json({
		status:'success',
		token
	})

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
exports.resetPassword = catchAsync(async(req,res,next)  => {
	console.log(req)
})