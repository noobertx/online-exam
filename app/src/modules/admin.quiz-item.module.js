const uuid = require('uuid');
import { adminQuizItem } from '../services/admin/admin.quiz-item.services';

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
	}
	}


const actions = {
	createItem({commit}){
		commit('createQuizItem',adminQuizItem.getBlankQuizItem())
	}
}
const mutations = {
	createQuizItem(state,item){
		state.quizItems.push(item)
	}
}
export const quizItem = {
	namespaced: true,
    state,
    actions,
    mutations
}