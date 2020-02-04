<template>
  <div>
    <h1>Quizzes</h1>
    <router-link  to="/quizzes/add" class="btn btn-primary mb-3">Add new Quiz</router-link>    
    <input type="text" class="form-control" v-model="searchText" @input="filterQuizInput" placeholder="Search for quiz">  
    <p class="error" v-if="error">{{error}}</p>
    <div class="quiz-container">

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Duration (minutes)</th>
            <th scope="col">Tag</th>
            <th scope="col">Items</th>
            <th scope="col">Total Points</th>
          </tr>
        </thead>
        <tbody>          
          <tr v-for="(quiz,index) in filteredQuizzes" 
          v-bind:item="quiz" 
          v-bind:index="index" 
          v-bind:key="quiz._id">
            <td><a :href="'#/quizzes/'+quiz._id">{{quiz.title}}</a></td>
            <td v-if="quiz.settings">{{quiz.settings.time}}</td>
            <td></td>
            <td>{{quiz.tag}}</td>
            <td v-if="quiz.meta">{{quiz.meta.items}}</td>
            <td v-else></td>
            <td v-if="quiz.meta">{{quiz.meta.total}}</td>
            <td v-else></td>
            <td>
              <a href="#" class="btn btn-sm btn-warning" title="Clone Quiz" @click="cloneQuiz(quiz)">[]</a>
              <a href="#" class="btn btn-sm btn-danger" title="Remove Quiz" @click="deleteQuiz(quiz._id)">x</a>
            </td>
          </tr>
        </tbody>
      </table>
  
    </div>
   
  </div>
</template>

<script>
  import QuizService from '../QuizzesService'
export default {
  name: 'QuizzesComponent',
  data(){
    return {
      quizzes:[],
      error:'',
      filteredQuizzes:[],
      searchText:"",
      quizdata:{
        title:'',
        items:0,
        wrong:0,
        time:5,
        intro:'',
        tag:'',
      },
      mode:"create"
    }
  },
  async created(){
    try{
      this.quizzes = await QuizService.getQuizzes();
      this.filteredQuizzes = this.quizzes;

      console.log(this.filteredQuizzes )
    }catch(err){
      this.error = err.message;
    }
  },
  methods:{
    async deleteQuiz(id){
       await this.$store.commit('quiz/deleteQuiz',id);
    },
    async cloneQuiz(quiz){
      await this.$store.commit('quiz/cloneQuiz',quiz);
    },
    editQuiz(quiz){
      this.mode="edit";
      this.quizdata = quiz;
      // console.log(this.quizdata);
    },
  },
  computed:{
     filterQuizInput(){
       if(this.searchText!=""){  

          this.filteredQuizzes = this.quizzes.filter(function(quiz){
            console.log(quiz.title);
            return quiz.title.toLowerCase().includes(this.searchText.toLowerCase())
          },this)
       }else{
        this.filteredQuizzes = this.quizzes;
       }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container{
  max-width: 800px;
  margin: 0 auto;
}

p.error{
  border:1px solid #ff5b5f;
  background-color:#ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.quiz{
  position: relative;
  border: 1px solid #5bd658;
  background-color:  #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom:15px;
}

div.title{
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background: darkgreen;
  color: #fff;
  font-size: 13px
}

p.text{
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

</style>
