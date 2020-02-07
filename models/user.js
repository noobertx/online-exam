const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:[true , "Please Tell us your name"]
	},
	userType:{
		type:String,

	},
	email:{
		type:String,
		required:[true, "Please Provide your Email"],
		unique:true,
		lowercase:true,
		validate:[validator.isEmail,"Please Provide your valid Email"]
	},
	photo:{
		type:String,
	},
	password:{
		type:String,
		required:[true,"Please provide your password"],
		minlength:8
	},
	passwordConfirm:{
		type:String,
		required:[true,"Please Confirm your password"]
	},

})

const User = mongoose.model('User',userSchema)

module.exports = User;
