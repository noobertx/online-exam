import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
	state:{
		tokens:{
			accessToken:"",
			refreshToken:"",
			id:"",
			name:"",
			mobile:"",
			userType:"",
			gender:"",
			college:"",
			email:""
		}
	},
	mutations:{
		saveToken(state,params){
			state.tokens.accessToken=params.accessToken;
			state.tokens.refreshToken=params.refreshToken;
			state.tokens.id=params.id;
			state.tokens.name=params.name;
			state.tokens.mobile=params.mobile;
			state.tokens.userType=params.userType;
			state.tokens.gender=params.gender;
			state.tokens.name=params.name;
			state.tokens.college=params.college;
			localStorage.setItem('credentials', JSON.stringify(state.tokens));
		},
		loadTokens(state){
			if("credentials" in localStorage){
				const credentials = JSON.parse(localStorage.getItem("credentials"));
				state.tokens.accessToken=credentials.accessToken || "";
				state.tokens.refreshToken=credentials.refreshToken || ""; 
			}
		}
	},
	actions:{
		saveToken(context){
			this.commit('saveToken')
		}
	},
	getters:{
		getAccessToken(state){
			return state.tokens.accessToken;
		}
	}
})