const mongoose = require("mongoose");

const quizSchema =  new mongoose.Schema({	
	title:{
		type:String,
		maxlength:[50,"Title must have 50 or less characters"],
		minlength:[5,"Title must have a character of more than 5 characters"]
	},
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

// Document Middleware : runs before save and create
// quizSchema.pre('save',function(next){})
// quizSchema.post('save',function(doc , next){ })

//	QUERY MIDDLEWARE
// quizSchema.pre('find',function(next){})


const Quiz = mongoose.model('Quiz',quizSchema)

module.exports = Quiz;

// MiddleWares