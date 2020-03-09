const crypto = require("crypto");
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
	role:{
		type:String,
		enum:['user','admin'],
		default:"user"
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
	passwordChangeAt:Date,
	passwordResetToken:String,
	passwordResetExpires:Date

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

userSchema.methods.changePasswordAfter = function(JWTTimestamp){
	// if(this.passwordChangeAt){
	// 	const changedTimestamp = parseInt(this.passwordChangeAt.getTime()/1000,10);
	// 	return JWTTimestamp < changedTimestamp
	// }
	return false;
}

userSchema.methods.createPasswordResetToken = function(){
	const resetToken = crypto.randomBytes(32).toString('hex');
	this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

	console.log({resetToken},this.passwordResetToken)
	this.passwordResetExpires = Date.now()+10*60*1000;
	return resetToken 
}
const User = mongoose.model('User',userSchema)

module.exports = User;
