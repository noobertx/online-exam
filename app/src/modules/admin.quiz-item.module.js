const uuid = require('uuid');
import QuizService from '../QuizItemService'



const state = {
	title:'New Created Quiz',
	intro:'Lorem Ipsume this is an easy quiz',
	tag:'',
	quizItems:[],
	settings:{
	    time:30,
	    isRandomize:"",
	    isPasswordProtected:"",
	    password:"",
	    isScheduled:"",
	    schedule:new Date(),
	    canExpire:"",
	    expirationDate:"",
	    isAttemptLimited:true,
	    attempts:1,
	  },
	meta:{
	    totalPoints:0
	},
	currentIndex:0,
}


const actions = {
	createItem({commit}){
		commit('createQuizItem',{
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
		correctAnswer:[]
    })
	},
	editItem({commit},index){
		commit('updateItem',index)
	},
	removeItem({commit},index){
		commit('deleteItem',index)		
	},
	removeAnswer({commit},index){
		commit('deleteAnswer',index)		
	},
	addChoice({commit}){
		commit('createChoices',{
    	cid:uuid.v4(),
    	text:"",
    })
	},

	isMultipleAnswer(type){
		return (type=="multiple-choice");
	},
	saveQuiz({commit}){

		

	}
}
const mutations = {
	createQuizItem(state,item){
		state.quizItems.push(item)
		state.currentIndex = state.quizItems.length-1;
	},
	updateItem(state,index){
		state.currentIndex = index;
	},
	updateTitle(state,val){
		state.title = val;
	},
	updateIntro(state,val){
		state.intro = val;
	},
	deleteItem(state,index){
		state.quizItems.splice(index,1);
	},
	deleteAnswer(state,index){
		state.quizItems[state.currentIndex].options.splice(index,1)
	},
	createChoices(state,item){
		state.quizItems[state.currentIndex].options.push(item);
	},
	updateTitle (state, title) {
	    state.title = title
  	},
	async saveItem(state){
		const response =  await QuizService.insertQuiz(this.state)
		return response;
  	},
	async saveChanges(state,id){
		const response = await QuizService.updateQuiz(id,this.state);
		return response;
  	},
  	async loadData(state,id){
		const loadedData = await QuizService.getQuiz(id);

		state.title = loadedData.title;
		state.intro = loadedData.intro;
		state.tag = loadedData.tag;
		state.settings = loadedData.settings;
		state.meta = loadedData.meta;
		state.quizItems = loadedData.quizItems;
		console.log(loadedData);
  	}
}
const getters = {
	itemCount(state){
		return state.quizItems.length;
	},
	totalPoints(state){
		
	}
}
export const quiz = {
	namespaced: true,
    state,
    actions,
    mutations,
    getters
}