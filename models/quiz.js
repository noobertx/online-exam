const mongoose = require("mongoose");

const quizSchema =  new mongoose.Schema({	
	title:String,
	intro:String,
	tag:String,
	date:Date,
	quizItems:Array,
	settings:mongoose.Schema.Types.Mixed,
	meta:mongoose.Schema.Types.Mixed
})

const Quiz = mongoose.model('Quiz',quizSchema)

module.exports = Quiz;