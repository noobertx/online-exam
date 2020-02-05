import QuizService from '../QuizItemService'

const shuffle = (array)=>{
	var currentIndex = array.length, temporaryValue, randomIndex;
				
  	// While there remain elements to shuffle...
  	while (0 !== currentIndex) {
	
  	  // Pick a remaining element...
  	  randomIndex = Math.floor(Math.random() * currentIndex);
  	  currentIndex -= 1;
	
  	  // And swap it with the current element.
  	  temporaryValue = array[currentIndex];
  	  array[currentIndex] = array[randomIndex];
  	  array[randomIndex] = temporaryValue;
  	}
	
  	return array;
}

const getTimeRemaining = function(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds
        };
      }



const state = {
	user:{
		name:"",
		email:"",
		quizPaper:[],
		score:0,
		overall:0,
		scoreRating:0
	},
	quiz:{
		title:"",
		intro:"",
		quizItems:[],
		settings:{
			canExpire:false,
			expirationDate:"",
			isScheduled:false,
			schedule:"",
		}
	},
	commingSoon:true,
	expired:false,
	index:0,
	timer:"",
	status:[],
	message:[],
	date:new Date()
}
const actions = {
	generateQuizPaper({commit}){
		commit('initQuizPaper')
	},
	setAnswer({commit},index){
		commit('updateAnswer',index)		
	},
	renderCountDownTimer({commit}){
		var d = new Date();
		d.setMinutes(d.getMinutes()+state.quiz.settings.time);

		var timeInterval = setInterval(function(){
			var t = getTimeRemaining(d)
			var timer =  t.hours + ' HRS ' + t.minutes + ' Mins ' + t.seconds+" Secs";
			commit('updateTimer',timer)
			if(t.total<=0){
				clearInterval(timeInterval);
			}
		})
	},
	checkResults({commit}){
		state.user.score = 0
		state.user.overall = 0

		state.user.quizPaper.forEach((i)=>{
			state.quiz.quizItems.forEach((q)=>{
				if(i.question==q.question){
					if(q.type=="multiple-choice"){
						var points = q.points;
						var correct = q.correctAnswer.length;
						var score = points/correct

						q.correctAnswer.forEach((answer)=>{
							if(i.answer.indexOf(answer)!=-1){
								if(q.isPerCorrectAnswer=="false"){
									state.user.score += score
								}else{
									state.user.score+=parseFloat(points)
								}
							}
							if(q.isPerCorrectAnswer=="false"){
								state.user.overall += parseFloat(score)
							}else{
								
							}
						})
					}else if(q.type=="fill-in-the-blanks"){
						if(i.answer.length>0){
							var userAnswer = i.answer.replace(/\s/g,"").toLowerCase();
                    		var examAnswer = q.correctAnswer.replace(/\s/g,"").toLowerCase();
                    		if(userAnswer==examAnswer){
                        		state.user.score += parseFloat(q.points);
                      		}
                      	}else{
                      		if(i.answer==q.correctAnswer){
                      			state.user.score+= parseFloat(q.points)
                      		}
                      		
                      	}
					}else{
						if(i.answer==q.correctAnswer){
                        	state.user.score += parseFloat(q.points);
                      	}
					}
                    state.user.overall += parseFloat(q.points)
				}
			})
		})

		state.user.scoreRating = ((state.user.score/state.user.overall)*100).toFixed(2)
		console.log(state.user);

	}
}
const mutations = {
	initQuizPaper(state){
		if(state.quiz.settings.isRandomize){
			state.quiz.quizItems = shuffle(state.quiz.quizItems)
		}

		state.user.quizPaper = state.quiz.quizItems.map((i)=>{
			return {
				question: i.question,
				answer:[]
			}
		})

	},
	updateAnswer(state,index){
		if(state.quiz.quizItems[index].type=="multiple-choice"){
			var max = state.quiz.quizItems[index].correctAnswer.length;
			if(max<=state.user.quizPaper[index].answer.length){
				/*

				*/
			}
			state.user.quizPaper[index].answer.splice(2,1)
		}
	},
	updateTimer(state,timer){
		state.quiz.settings.timer = timer
	},
	isExpired : (state)=>{
		if(state.quiz.settings.canExpire){
			const expiration = state.quiz.settings.expirationDate.replace("T"," ");
			expiration = expiration.replace("Z"," ");
			expiration = new Date(expiration);
			const datenow = new Date();

			return (expiration < dateNow) ? true : false;
		}
	},
	isInSchedule : (state)=>{
		if(state.quiz.settings.isScheduled){
			const schedule = state.settings.schedule.replace("T"," ")
			schedule = schedule.replace("Z"," ");
			schedule = new Date(schedule);
			const datenow = new Date();
			return (schedule < dateNow) ? true : false;
		}
		return true;
	},
	async loadData(state,id){
		const loadedData = await QuizService.getQuiz(id);
		state.quiz.title = loadedData.title;
		state.quiz.intro = loadedData.intro;
		state.quiz.tag = loadedData.tag;
		state.quiz.quizItems = loadedData.quizItems;
		state.quiz.settings = loadedData.settings;
		state.quiz.meta = loadedData.meta;
		console.log(loadedData);
	}
}
const getters = {
	
}
export const quizPaper = {
	namespaced: true,
    state,
    actions,
    mutations,
    getters
}