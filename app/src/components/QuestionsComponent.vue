<template>
  <div class="container">
    <h1>Questions</h1>
    <button @click="createNew">Add New Question</button>

    <div v-if="questionItems.length>0">
      <div v-for="(question,question_index) in questionItems">
        
      
      <div class="form-group">
      <label for="name">Question</label>
      <input type="text" name="name" id="name" class="form-control" v-model="question.question">
      
      <label for="choice">Number of choices</label>
      <input type="number" name="choice" id="choice" class="form-control" v-model="question.choice" @input="generateSelections(question_index)">
      </div>
  
      <div v-if="question.choices.length>0">      
      <div class="form-group" v-for="(choice,index) in question.choices" >
        <input type="text" name="choice_item[]" class="form-control" v-model="question.choices[index]">
      </div>
  
      <label for="answer">Answer</label>
        <select name="answer" id="answer" v-model="question.answer">
          <option value="" selected disabled></option>
          <option v-for="(choice,index) in question.choices" :value="choice">{{choice}}</option>
        </select>
      </div>
      </div>
    </div>
    <!-- <input type="number" name="choice" id="choice" class="form-control" v-model="questiondata.choice" @input="generateSelections"> -->
   


    <hr>
    <p class="error" v-if="error">{{error}}</p>
 <!--    <div class="question-container">
      <div class="question" 
      v-for="(question,index) in questions" 
      v-bind:item="question" 
      v-bind:index="index" 
      v-bind:key="question._id"
      @click="editQuestionItem(question)">
        <div class="title">{{question.question}}</div>
        <button v-on:click="deleteQuestionId(question._id)">Remove</button>
        <p>{{question.choice}} | {{question.sn}} </p>        
      </div>
    </div> -->
   
  </div>
</template>

<script>
  import QuestionService from '../QuestionService'
export default {
  name: 'QuestionsComponent',
  data(){
    return {
      questionItems:[{
        question:'',
        choice:0,
        choices:[],
        answer:''
      }],
      error:'',
      questiondata:{
        examid:'',
        questionId:'',
        question:'',
        choice:0,
        choices:[],
        answer:''
      },
      mode:"create"
    }
  },
  async created(){
    try{
      this.questions = await QuestionService.getQuestions();
    }catch(err){
      this.error = err.message;
    }
  },
  methods:{
    async addQuestionItem(){
      if(this.mode=="create"){
        await QuestionService.insertQuestion(this.questiondata);
      }else{
        await QuestionService.updateQuestion(this.questiondata._id,this.questiondata);
      }
      this.questions = await QuestionService.getQuestions();
    },
    async deleteQuestionId(id){
      // console.log(id);
      await QuestionService.deleteQuestion(id);
      this.questions = await QuestionService.getQuestions();
    },
    editQuestionItem(question){
      this.mode="edit";
      this.questiondata = question;
      // console.log(this.questiondata);
    },
    createNew(){
      this.mode="create";
      this.questionItems.push({
        question:'',
        choice:0,
        choices:[],
        answer:''
      })       
    },
    generateSelections:function(index){
      this.questionItems[index].choices = [];
      for(var i=0;i<this.questionItems[index].choice;i+=1){
        this.questionItems[index].choices.push("");
      }
    }
  },
  computed:{
   
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

div.question{
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
