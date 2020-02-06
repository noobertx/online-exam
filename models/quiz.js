const mongoose = require("mongoose");

const quizSchema =  new mongoose.Schema({	
	title:String,
	intro:String,
	tag:String,
	date:Date,
	quizItems:Array,
	settings:mongoose.Schema.Types.Mixed,
	meta:mongoose.Schema.Types.Mixed
},{
	toJSON:{virtuals:true},
	toObject:{virtuals:true}
})
// Virtual Properties


	quizSchema.virtual('totalScore').get(function(){
		var total_score = 0;
		this.quizItems.forEach((q)=>{
			total_score += parseInt(q.points)
		})
		return total_score;
	})



const Quiz = mongoose.model('Quiz',quizSchema)

module.exports = Quiz;