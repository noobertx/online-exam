const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
		minlength:8,
		select:false
	},
	passwordConfirm:{
		type:String,
		required:[true,"Please Confirm your password"],
		validate:{
			validator:function(el){
				return this.password === el
			}
		}
	},
})

userSchema.pre('save',async function(next){
	if(!this.isModified('password')) return	next();
	this.password = await bcrypt.hash(this.password,12)
	this.passwordConfirm = undefined;
	next();
})

userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
	return await bcrypt.compare(candidatePassword,userPassword);
}

const User = mongoose.model('User',userSchema)

module.exports = User;
