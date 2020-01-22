<template>
  <div id="app">
    <nprogress-container></nprogress-container>
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
    </div>

  </div>
</template>

<script>
// import MembersComponent from './components/MembersComponent.vue'
// import QuestionsComponent from './components/QuestionsComponent.vue'
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
export default {
  name: 'app',
  components: {
    NprogressContainer
  },
  methods:{
    isLoggedIn(){

      return false;
    }
  },
  async created(){
    this.$store.commit('loadTokens');
  },

  mounted(){
    
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
