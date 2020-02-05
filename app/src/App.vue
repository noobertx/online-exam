<template>
  <div id="app">
    <div class="container">      
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Online Exam</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <router-link  to="/members" class="nav-link">Members</router-link>      
            </li>
            <li class="nav-item">
              <router-link  to="/quizzes" class="nav-link">Quiz Admin</router-link>      
            </li>
            <li class="nav-item">
              <router-link  to="/quiz-listings" class="nav-link">Take Quiz</router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn()">
              <router-link  to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item" v-else>
              <router-link  to="#" class="nav-link">Profile</router-link>
            </li>
          </ul>
        </div>
      </nav>
    <router-view></router-view>
    <vue-progress-bar></vue-progress-bar>
    </div>

  </div>
</template>

<script>
// import MembersComponent from './components/MembersComponent.vue'
// import QuestionsComponent from './components/QuestionsComponent.vue'

export default {
  name: 'app',
 
  methods:{
    isLoggedIn(){

      return false;
    }
  },
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })
  },

  mounted(){
    this.$Progress.finish()
    this.$store.getters.getAccessToken;
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body{
  background:#fff;
  color:#333;
}
body p{
  color:#333;
}
</style>
