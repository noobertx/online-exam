const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	userType:{
		type:String,
		required:true
	},
	gender:{
		type:String,
		required:true
	},
	college:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	mobile:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	refreshToken:{
		type:String,
		required:true
	},
})

const User = mongoose.model('User',userSchema)

module.exports = User;
