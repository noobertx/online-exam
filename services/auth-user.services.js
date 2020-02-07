const User = require("./../models/user.js");
const catchAsync = require("./catchAsync.service");

exports.signup = catchAsync( async(req,res,next) => {
	const newUser = await User.create(req.body);
	res.status(201).json({
		status:'success',
		data:{
			user: newUser
		}
	})
})