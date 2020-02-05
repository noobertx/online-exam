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

const state = {
	user:{
		name:"",
		email:"",
		quizPaper:[],
		score:0,
	},
	canDisplay:false,
	quiz:{
		settings:{
			canExpire:false,
			expirationDate:"",
			isScheduled:false,
			schedule:"",
		}
	},
	timer:"",
	date:new Date()
}
const actions = {}
const mutations = {}
const getters = {
	isExpired(state){
		if(state.quiz.settings.canExpire){
			const expiration = state.quiz.settings.expirationDate.replace("T"," ");
			expiration = expiration.replace("Z"," ");
			expiration = new Date(expiration);
			const datenow = new Date();

			return (expiration < dateNow) ? true : false;
		}
	},
	isInSchedule(state){
		if(state.quiz.settings.isScheduled){
			const schedule = state.settings.schedule.replace("T"," ")
			schedule = schedule.replace("Z"," ");
			schedule = new Date(schedule);
			const datenow = new Date();
			return (schedule < dateNow) ? true : false;
		}
		return true;
	},
}
export const quizPaper = {
	namespaced: true,
    state,
    actions,
    mutations,
    getters
}