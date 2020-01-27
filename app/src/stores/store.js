import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
	state:{
		user:{

		},
		tokens:{
			accessToken:"",
			refreshToken:""
		}
	},
	mutations:{
		saveToken(state,params){
			state.tokens.accessToken=params.accessToken;
			state.tokens.refreshToken=params.refreshToken;
			state.user.id=params.id;
			state.user.name=params.name;
			state.user.email=params.email;
			state.user.mobile=params.mobile;
			state.user.userType=params.userType;
			state.user.gender=params.gender;
			state.user.name=params.name;
			state.user.college=params.college;
			localStorage.setItem('credentials', JSON.stringify(state));
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
		},
		getUser( state){
			return state.user;
		}
	}
})