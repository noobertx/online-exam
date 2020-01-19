<template>
  <div class="wrapper">
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Question Properties</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="quiz.quizItems.length>0">              
             <div class="form-group">
                <label for="question">Question</label>
                <textarea name="question" class="form-control"
                id="question" 
                cols="30" 
                v-model="quiz.quizItems[currentIndex].question"></textarea>
              </div>
              <div class="form-group">
                <label for="points">Points</label>
                <input type="number" class="form-control" 
                id="points" placeholder="2" 
                v-model="quiz.quizItems[currentIndex].points">
              </div>
              <div class="form-group">
                <label for="question_type">Type</label>
                <select name="question_type" class="form-control" id="question_type" v-model="quiz.quizItems[currentIndex].type">
                  <option value="" disabled selected></option>
                  <option v-for="choice in [{
                    value:'single-choice-r',
                    text:'Single Choice Radio',
                  },{
                    value:'single-choice-d',
                    text:'Single Choice Dropdown',
                  },{
                    value:'multiple-choice',
                    text:'Multiple Choice',
                  },{
                    value:'fill-in-the-blanks',
                    text:'Fill In the Blanks',
                  },{
                    value:'matching-text',
                    text:'Matching Text',
                  }]" :value="choice.value">{{choice.text}}</option>
                </select>                
              </div>

              <div class="mb-3">
                <button class="btn btn-success" @click="addChoice">Add Choices</button>
              </div>
              <div v-if="quiz.quizItems[currentIndex].options.length>0">
                <label >Choices</label>

                <div class="input-group mb-3" v-for="(value,  index) in quiz.quizItems[currentIndex].options">
  <input type="text" class="form-control" placeholder="Input Choice Detail" aria-label="Input Choice Detail" aria-describedby="basic-addon2" v-model="quiz.quizItems[currentIndex].options[index].text">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button" @click="removeAnswer(index)">&times;</button>
  </div>
</div>
              </div>
              <div class="form-group">
                <label for="answer">Answer</label>
                  <select v-if="isMultipleAnswer(quiz.quizItems[currentIndex].type)" class="form-control" id="answer" v-model="quiz.quizItems[currentIndex].correctAnswer" multiple>
                    <option value="" selected disabled></option>
                    <option v-for="option in quiz.quizItems[currentIndex].options" v-bind:value="option.cid">{{ option.text }}</option>
                  </select>
                  <select v-else class="form-control" id="answer" v-model="quiz.quizItems[currentIndex].correctAnswer" >
                    <option value="" selected disabled></option>
                    <option v-for="option in quiz.quizItems[currentIndex].options" v-bind:value="option.cid">{{ option.text }}</option>
                  </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Done</button>
          </div>
      </div>
    </div>
  </div>

      <!-- Sidebar -->
    <nav id="sidebar">

      <div class="input-group mb-3 pl-3 pr-3 pt-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="title">Quiz Title</span>
        </div>
        <input type="text" class="form-control" placeholder="Title" aria-label="Title" aria-describedby="title" v-model="quiz.quizData.title">
      </div>

      <div class="input-group mb-3 pl-3 pr-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="intro">Description</span>
        </div>
        <input type="text" class="form-control" placeholder="Description" aria-label="Description" aria-describedby="intro" v-model="quiz.quizData.intro">
      </div>

     


      <div class="input-group mb-3 pl-3 pr-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Time Limit</span>
        </div>
        <input type="number" class="form-control" placeholder="30000" aria-label="30000" v-model="quiz.settings.time" aria-describedby="time">
        <div class="input-group-append">
          <span class="input-group-text" id="time">minutes</span>
        </div>
      </div>
      <div class="input-group mb-3 pl-3 pr-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Randomize Items</span>
        </div>
        <input type="checkbox" class="form-control" placeholder="" v-model="quiz.settings.isRandomize" aria-describedby="time">
      </div>
      <div class="input-group mb-3 pl-3 pr-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Password Protected</span>
        </div>
        <input type="checkbox" class="form-control" placeholder="" v-model="quiz.settings.isPasswordProtected" aria-describedby="time">
      </div>
      <div class="input-group mb-3 pl-3 pr-3" v-if="quiz.settings.isPasswordProtected">
        <div class="input-group-prepend">
          <span class="input-group-text">Password</span>
        </div>
        <input type="text" class="form-control" placeholder="password" v-model="quiz.settings.password" aria-describedby="time">
      </div>

      <div class="input-group mb-3 pl-3 pr-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="totalPoints">Total Points</span>
        </div>
        <input type="number" disabled readonly class="form-control" aria-describedby="totalPoints" :value="getTotalPoints">
      </div>
      <div class="input-group mb-3 pl-3 pr-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="totalItems">Items</span>
        </div>
        <input type="number" disabled readonly class="form-control" aria-describedby="totalItems" :value="getTotalItems">
      </div>
      
      <div class="pl-3 pr-3 text-center">
        <button class="btn btn-primary btn-block" @click="saveQuiz">Save</button>        
      </div>
    </nav>

    <!-- Page Content -->
    <div id="content" >
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <button type="button" id="sidebarCollapse" class="btn btn-default">

                <span><i class="fa fa-bars"></i></span>
            </button>
            <button class="btn btn-success" @click="addItem" data-toggle="modal" data-target="#exampleModal">Add Item</button>
        </div>
    </nav>

     <div class="row" style="clear:both;">&nbsp;</div>
        <div class="quiz-items mt-4" v-if="quiz.quizItems.length>0"  style="clear:both;">              
          <div class="row"  v-for="(item,  index) in quiz.quizItems">
            <div class="col-sm-10 ml-3">
              <p>
                 {{index+1}} . {{item.question}} <br>
                 <small>Points : <b>{{item.points}}</b></small><br>

                 <div class="btn-group" role="group" aria-label="Basic example">
                  <button class="btn btn-warning btn-sm" @click="editItem(index)" data-toggle="modal" data-target="#exampleModal">Edit</button> 
                 <button class="btn btn-danger btn-sm" @click="removeItem(index)">&times;</button>
                  </div>


                 
              </p>              
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import QuizService from '../QuizItemService'
  import $ from 'jquery'
  const uuid = require('uuid');

export default {
  name: 'QuizzesComponent',
  data(){
    return {
      quiz:{
        quizData:{
        title:'New Created Quiz',
        items:0,
        total:0,
        wrong:0,        
        intro:'Lorem Ipsume this is an easy quiz',
        tag:'',
        },
        quizItems:[],
        settings:{
          time:30,
          isRandomize:"",
          isPasswordProtected:"",
          password:""
        },
        meta:{
          totalPoints:0
        },
      },     
      error:'',
      currentIndex:0,
      mode:"create"
    }
  },
  async created(){

    try{
      if(this.$route.params.id){

      let quiz = await QuizService.getQuiz(this.$route.params.id);
      this.quiz.quizData = quiz[0];
      this.quiz.quizItems = quiz[0].quizItems;
      this.quiz.settings = quiz[0].settings;
      this.quiz.meta = quiz[0].meta || {};

      this.quiz.meta.total = 0;
      this.quiz.meta.items = 0;
      }
      // console.log(quiz[0].quizItems);
    }catch(err){
      this.error = err.message;
    }
  },
  mounted(){
    $(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

  });
  },
  methods:{
    addItem(){
      this.quiz.quizItems.push({
        qid:uuid.v4(),
        type:"single-choice-r",
        question:"Choose Yes",
        points:1,
        options:[{
          cid:uuid.v4(),
          text:"Yes"
        },{
          cid:uuid.v4(),
          text:"No"
        }],
        correctAnswer:''
      });
      this.currentIndex = this.quiz.quizItems.length - 1;
      this.mode="create";
    },
    editItem(id){
      this.mode="edit";
      this.currentIndex=id;
    },
    removeItem(id){
      this.quiz.quizItems.splice(id,1);
    },
    removeAnswer(id){
      this.quiz.quizItems[this.currentIndex].options.splice(id,1);
    },
    addChoice(){

      this.quiz.quizItems[this.currentIndex].options.push({
        cid:uuid.v4(),
        text:"",
      });
    },
    async saveQuiz(){
      // console.log(this.$route.params.id,this.quiz);
      if(this.$route.params.id){        
        await QuizService.updateQuiz(this.$route.params.id,this.quiz);
        console.log(this.quiz);
        let quiz = await QuizService.getQuiz(this.$route.params.id);
        this.quiz.quizData = quiz[0];
      }else{
        var _id = await QuizService.insertQuiz(this.quiz);
        location.hash="#/quizzes/"+_id.data

      }
    },
    isMultipleAnswer(type){
      console.log(type);
      return (type=="multiple-choice");
      //
    }
  },
  computed:{
    getTotalPoints(){
      let sum =0;
      for (var i=0;i<this.quiz.quizItems.length;i+=1){
        sum+= parseInt(this.quiz.quizItems[i].points)
      }
      this.quiz.meta.total=sum;
      return sum;
    },
    getTotalItems(){
      console.log(this);
      this.quiz.meta.items=this.quiz.quizItems.length;
      return this.quiz.quizItems.length;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
#app{
  margin-top:0;
}
.wrapper {
    display: flex;
    align-items: stretch;
}

#sidebar {
    min-width: 350px;
    max-width: 350px;
    min-height: 100vh;
}
#sidebar.active {
    margin-left: -350px;
}


@media (max-width: 768px) {
    #sidebar {
        margin-left: -250px;
    }
    #sidebar.active {
        margin-left: 0;
    }
}


body {
    font-family: 'Poppins', sans-serif;
    background: #fafafa;
}

p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    font-weight: 300;
    line-height: 1.7em;
    color: #999;
}

a, a:hover, a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
}

#sidebar {
    /* don't forget to add all the previously mentioned styles here too */
    background: #6f6f6f;
    color: #fff;
    transition: all 0.3s;
}

#sidebar .sidebar-header {
    padding: 20px;
    background: #6f6f6f;
}

#sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #47748b;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}

#sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
}
#sidebar ul li a:hover {
    color: #6f6f6f;
    background: #fff;
}

#sidebar ul li.active > a, a[aria-expanded="true"] {
    color: #fff;
    background: #6f6f6f;
}
ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: #6f6f6f;
}

#content{
  width: 100%;
  color: #fff;
}
</style>
