const User = require("./../models/user.js");
const catchAsync = require("./catchAsync.service");
const jwt = require("jsonwebtoken");
const AppError = require("./appError")

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

	console.log(user);
	const token = signToken(user._id)
	res.status(200).json({
		status:'success',
		token
	})

})