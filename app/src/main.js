import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.min.css'


Vue.config.productionTip = false
Vue.use(VueRouter)



const routes = [
  { path: '/sign-up', component:require("./components/auth/signUp.vue").default },
  { path: '/login', component:require("./components/auth/Login.vue").default },
  { path: '/members', component:require("./components/MembersComponent.vue").default },
  { path: '/quizzes', component:require("./components/QuizzesComponent.vue").default },
  { path: '/quizzes/:id', component:require("./components/QuizItemComponent.vue").default },
  { path: '/quiz-listings/', component:require("./components/frontend/QuizListings.vue").default },
  { path: '/take-quiz/:id', component:require("./components/frontend/TakeQuiz.vue").default },
  // { path: '/questions', component:require("./components/QuestionsComponent.vue").default }
]

const router = new VueRouter({

  routes // short for `routes: routes`
})

new Vue({
	router,
  	render: h => h(App),
}).$mount('#app')
