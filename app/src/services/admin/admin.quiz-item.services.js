export const adminQuizItem = {
	getBlankQuizItem
}

function getBlankQuizItem(){
	return {
		qid:uuid.v4(),
		type:"single-choice-r",
		question:"Choose Yes",
		points:1,
		isPerCorrectAnswer:"",
		options:[{
		  cid:uuid.v4(),
		  text:"Yes"
		},{
		  cid:uuid.v4(),
		  text:"No"
		}],
		correctAnswer:''
    }
}