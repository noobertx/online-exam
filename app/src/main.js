import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import {store} from './stores/store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.min.css'


Vue.config.productionTip = false
Vue.use(VueRouter)



const routes = [
  { path: '/sign-up', component:require("./components/auth/signUp.vue").default },
  { path: '/login', component:require("./components/auth/Login.vue").default },
  { path: '/members', component:require("./components/MembersComponent.vue").default },
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

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('credential') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            if(to.matched.some(record => record.meta.is_admin)) {
                if(user.is_admin == 1){
                    next()
                }
                else{
                    next({ name: 'userboard'})
                }
            }else {
                next()
            }
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(localStorage.getItem('jwt') == null){
            next()
        }
        else{
            next({ name: 'userboard'})
        }
    }else {
        next() 
    }
})

new Vue({
	router,
  store: store,
  render: h => h(App),
}).$mount('#app')
