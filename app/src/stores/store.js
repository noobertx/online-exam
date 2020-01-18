import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
	state:{
		tokens:{
			accessToken:"",
			refreshToken:""
		}
	},
	mutations:{
		saveToken(state,params){
			state.tokens.accessToken=params.accessToken;
			state.tokens.refreshToken=params.refreshToken;
			localStorage.setItem('credentials', JSON.stringify(state.tokens));
		},
		loadTokens(state){
			if("credentials" in localStorage){
				const credentials = JSON.parse(localStorage.getItem("credentials"));
				state.tokens.accessToken=credentials.accessToken || "";
				state.tokens.refreshToken=credentials.refreshToken || ""; 
			}
			console.log(state);
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