
import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'vue-nprogress'
import App from './App.vue'
import {store} from './stores/store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';


Vue.config.productionTip = false
Vue.use(VueRouter)
const options = {
  latencyThreshold: 100, // Number of ms before progressbar starts showing, default: 100,
  router: true, // Show progressbar when navigating routes, default: true
  http: false // Show progressbar when doing Vue.http, default: true
};
Vue.use(NProgress, options)

const nprogress = new NProgress({ parent: '.nprogress-container' })


const routes = [
  { path: '/sign-up', component:require("./components/auth/signUp.vue").default },
  { path: '/login', component:require("./components/auth/Login.vue").default },
  { path: '/members', component:require("./components/MembersComponent.vue").default },
  { path: '/members/:id', component:require("./components/MembersItemComponent.vue").default },
  { path: '/myprofile', component:require("./components/MyProfile.vue").default },
  { path: '/profiles/:id', component:require("./components/UserProfile.vue").default },
  { path: '/members/add', component:require("./components/MembersItemComponent.vue").default },
  { path: '/quizzes', component:require("./components/QuizzesComponent.vue").default ,meta: 
    { 
      requiresAuth: true,

    }
  },
  { path: '/quizzes/add', component:require("./components/QuizItemComponent.vue").default ,meta: 
    { 
      requiresAuth: true,

    }
  },
  { path: '/quizzes/:id', component:require("./components/QuizItemComponent.vue").default ,
    meta:{ 
      requiresAuth: true,
    }
  },
  { path: '/quiz-listings/', component:require("./components/frontend/QuizListings.vue").default ,
    meta:{ 
      requiresAuth: true,
    }
  },
  { path: '/take-quiz/:id', component:require("./components/frontend/TakeQuiz.vue").default ,
    meta:{ 
      requiresAuth: true,
    }
  },
  // { path: '/questions', component:require("./components/QuestionsComponent.vue").default }
]

// function authenticateToken(req,res,next){
//  const authHeader = req.headers['authorization'];
//  const token = authHeader &&  authHeader.split(" ")[1];
//  if(token == null) return res.sendStatus(401)
//    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
//      if(err)  return res.sendStatus(403)     
//      req.user = user
//      next()
//    })
// }

const router = new VueRouter({
  routes // short for `routes: routes`
})


//https://scotch.io/tutorials/vue-authentication-and-route-handling-using-vue-router
// router.beforeEach((to, from, next) => {
//     if(to.matched.some(record => record.meta.requiresAuth)) {
//         if (localStorage.getItem('credentials') == null) {
//             next({
//                 path: '/login',
//                 params: { nextUrl: to.fullPath }
//             })
//         } else {

//             next();
//         }
//     }
// })

new Vue({
	router,
  nprogress,
  store: store,
  render: h => h(App),
}).$mount('#app')
