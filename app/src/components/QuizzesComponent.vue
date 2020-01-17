<template>
  <div class="container">
    <h1>Quizzes</h1>
    <button @click="createNew">Add New Quiz</button>
    <div style="display: none;">
      
  <div class="form-group">
    <label for="title">Title</label>
    <input type="text" name="name" id="name" class="form-control" v-model="quizdata.title">
  </div>
  <div class="form-group">
    <label for="items">Items</label>
    <input type="number" name="items" id="items" class="form-control" v-model="quizdata.items">
  </div>
  <div class="form-group">
    <label for="wrong">Wrong</label>
    <input type="number" name="wrong" id="wrong" class="form-control" v-model="quizdata.wrong">
  </div>
  <div class="form-group">
    <label for="total">Total</label>
    <input type="number" name="total" id="total" class="form-control" v-model="quizdata.total">
  </div>
  <div class="form-group">
    <label for="time">Time (minutes)</label>
    <input type="number" name="time" id="time" class="form-control" v-model="quizdata.time">
  </div>
  <div class="form-group">
    <label for="tag">Tag</label>
    <input type="text" name="tag" id="tag" class="form-control" v-model="quizdata.tag">
  </div>
  <div class="form-group">
    <label for="intro">Introduction</label>
    <textarea name="intro" id="" cols="30" rows="10"  v-model="quizdata.intro"></textarea>
  </div>
   <button v-on:click="addQuiz">Save</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{error}}</p>
    <div class="quiz-container">

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Duration</th>
            <th scope="col">Tag</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>          
          <tr v-for="(quiz,index) in quizzes" 
          v-bind:item="quiz" 
          v-bind:index="index" 
          v-bind:key="quiz._id">
            <td><a :href="'#/quizzes/'+quiz._id">{{quiz.title}}</a></td>
            <td>{{quiz.time}}</td>
            <td>{{quiz.tag}}</td>
            <td>{{quiz.time}}</td>
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
    }catch(err){
      this.error = err.message;
    }
  },
  methods:{
    async addQuiz(){
      if(this.mode=="create"){
        await QuizService.insertQuiz(this.quizdata);
      }else{
        await QuizService.updateQuiz(this.quizdata._id,this.quizdata);
      }
      this.quizzes = await QuizService.getQuizzes();
    },
    async deleteQuiz(id){
      // console.log(id);
      await QuizService.deleteQuiz(id);
      this.quizzes = await QuizService.getQuizzes();
      this.mode="create";
    },
    editQuiz(quiz){
      this.mode="edit";
      this.quizdata = quiz;
      // console.log(this.quizdata);
    },
    createNew(){
      this.mode="create";
      this.quizdata={
        name:'',
        password:'',
        userType:0,
        gender:'',
        college:'',
        title:'',
        mobile:'',
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
