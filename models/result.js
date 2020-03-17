const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
	user:{
		type:mongoose.Schema.ObjectId,
		ref:'User',
		required:[true,'results must belong to a user']
	},
	quiz:{
		type:mongoose.Schema.ObjectId,
		ref:'Quiz',
		required:[true,'results must belong to a quiz']
	},
	score:{
		type:Number,
		default:0
	}
},{
	toJSON:{virtuals:true},
	toObject:{virtuals:true}
})


const Result = mongoose.model('Result',resultSchema);

module.exports = Result;