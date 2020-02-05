<template>
	<div class="container">
    <div v-if="page=='init'">
      <h1  class="text-center">{{quiz.title}}</h1>
      <p  class="text-center">{{quiz.intro}}</p>

      <div class="row " v-if="comingSoon">     
        <h2 class="text-center" style="width:100%">Coming Soon</h2>
        <h4 class="text-center" style="width:100%">{{availableTimer}}</h4>


      </div>
        {{renderTimerAvailability()}}
        {{renderTimerExpire()}}
      <div class="row" v-if="quiz.settings.canExpire">
        <h2 class="text-center" style="width:100%">Expires In</h2>
        <h4 class="text-center" style="width:100%">{{expireTimer}}</h4>
      </div>

      <div v-if="canDisplay">        
      <input type="number" v-model="itemsPerPage">
      <button class="btn btn-primary btn-block" @click="page='exam'">Proceed</button>
      </div>
    </div>

    <div v-if="page=='exam'" >


    <p class="small">{{timer}}</p> 


    <ul class="pagination">
      <li class="page-item"><a class="page-link" @click="currentPage = (currentPage>0) ? currentPage -= 1 : currentPage">Previous</a></li>
      <li class="page-item" v-for="(item,index) in paginatedItems">
        <a class="page-link" @click="currentPage=index">{{(index+1)}}</a>
      </li>
      <li class="page-item"><a class="page-link" @click = "currentPage = (currentPage < paginatedItems.length-1) ? currentPage+=1 : currentPage " >Next</a></li>
    </ul>

    <div class="row" v-for="(item,index) in paginatedItems[currentPage]">
      <div class="col-md-12">
        <p>{{index+1}}. {{item.question}}</p>
        <select class="form-control mb-3" v-if="item.type=='single-choice-d'" v-model="user.quizPaper[index].answer">
          <option value="" selected disabled></option>
          <option v-for="(option,optIndex)  in item.options" :value="option.cid">{{option.text}}</option>    
        </select>
        <input type="text" class="form-control mb-3" v-else-if="item.type=='fill-in-the-blanks'" v-model="user.quizPaper[index].answer">
        <ul v-for="(option,optIndex) in item.options" v-else class="list-group mb-3">
          <li class="list-group-item">
            <label v-if="item.type=='single-choice-r'">
              <input type="radio" :value = "option.cid" v-model="user.quizPaper[index].answer" @input="test(index)">
              {{option.text}}
            </label>
            <label v-if="item.type=='multiple-choice'">
              <input type="checkbox" :value = "option.cid" :id="option.cid"  v-model="user.quizPaper[index].answer" :disabled="user.quizPaper[index].answer.length > item.correctAnswer.length-1 && user.quizPaper[index].answer.indexOf(option.cid) === -1" >
              {{option.text}}
            </label>

          </li>
        </ul>

      </div>
      </div>


	<!-- 	<div class="row" v-for="(item,index) in quiz.quizItems">
			<div class="col-md-12">
				<p>{{index+1}}. {{item.question}}</p>
        <select class="form-control mb-3" v-if="item.type=='single-choice-d'" v-model="user.quizPaper[index].answer">
          <option value="" selected disabled></option>
          <option v-for="(option,optIndex)  in item.options" :value="option.cid">{{option.text}}</option>    
        </select>
        <input type="text" class="form-control mb-3" v-else-if="item.type=='fill-in-the-blanks'" v-model="user.quizPaper[index].answer">
				<ul v-for="(option,optIndex) in item.options" v-else class="list-group mb-3">
					<li class="list-group-item">
						<label v-if="item.type=='single-choice-r'">
							<input type="radio" :value = "option.cid" v-model="user.quizPaper[index].answer" @input="test(index)">
							{{option.text}}
						</label>
            <label v-if="item.type=='multiple-choice'">
              <input type="checkbox" :value = "option.cid" :id="option.cid"  v-model="user.quizPaper[index].answer" :disabled="user.quizPaper[index].answer.length > item.correctAnswer.length-1 && user.quizPaper[index].answer.indexOf(option.cid) === -1" >
              {{option.text}}
            </label>

					</li>
				</ul>

			</div>			
		</div> -->
		<button class="btn btn-success btn-block" @click="checkResults" v-if="canDisplay">Submit</button>
    </div>
    <div v-else>
      <div v-for="(item,index) in status" class="text-center">        
        <h2 class="">{{status[index]}}</h2>
        <h3 class=" text-error ">{{message[index]}}</h3>
        <router-link  to="/quiz-listings" class="btn btn-success">Return</router-link>

      </div>
    </div>
	</div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import Vue from 'vue'
  import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';
	import QuizService from '../../QuizItemService'
  import HistoryService from '../../services/HistoryService'

  Vue.use(VueToast);
	export default{
		data(){
    		return {
          page:'init',
          comingSoon:false,
          expired:false,
          canDisplay:false,
          availableTimer:"",
          expireTimer:"",
          itemsPerPage:1,
          paginatedItems:[],
          currentPage:0

    		  // user:{
    		  // 	name:"Robert Talavera",
    		  // 	email:"noobertx@gmail.com",
    		  // 	quizPaper:[],
    		  // 	score:0
    		  // },
        //   canDisplay:true,
        //   status:[],
        //   message:[],
    		  // quiz:[],
        //   timer: "",
        //   date: new Date()
    		}
  		},
  		async created(){

        await this.$store.commit('quizPaper/loadData',this.$route.params.id);


      // 			 let quiz = await QuizService.getQuiz(this.$route.params.id);
      //        this.user = JSON.parse(localStorage.getItem('user'));
      //       this.user.quizPaper=[];
      //       this.user.score=0;

            

                         
      //        this.quiz = quiz[0];
      //       console.log(this.quiz);

    		// try{


      // 			 if(this.quiz.settings.isRandomize){
      // 			 	this.quiz.quizItems = this.shuffle(this.quiz.quizItems ) ;
      // 			 }
      // 			 this.generateQuizPaper(this.quiz.quizItems);
      //         if(this.quiz.settings.time){
      //           this.renderCountDownTimer(this.quiz.settings.time);
      //         }


                this.canDisplay=true;
              if(!this.isInSchedule()){
                this.canDisplay=false;
                this.comingSoon = true;
                // this.status.push("Forbidden")
                // this.message.push("This item is currently unavailable")
              }else{
                this.comingSoon = false;                
              }

              if(this.isExpired()){
                this.canDisplay=false;
                this.expired = true;
                // this.status.push("Forbidden")
                // this.message.push("This item is expired");               
              }else{
                this.expired = false;
              }


                this.generateQuizPaper();
                this.paginateItems(this.quiz.quizItems);
      //         if(this.canDisplay){
      //           Vue.$toast.success('Good Luck on your exam', {
      //             position: 'top-right',
      //             dismissible:true,
      //             duration:10000
      //           })
      //         }
    		// }catch(err){
      // 			this.error = err.message;

      			
    		// }
  		},
  		methods:{
        ...mapActions('quizPaper',[
        'generateQuizPaper',
        'setAnswer',
        'renderCountDownTimer',
        'checkResults'
        ]),

      isExpired(){      
        if(this.quiz.settings.canExpire){
          var expiration = this.quiz.settings.expirationDate.replace("T"," ");
          expiration = expiration.replace("Z"," ");
          expiration = new Date(expiration);           
          var dateNow = new Date();     
          console.log((expiration < dateNow));
          return (expiration < dateNow) ? true : false;
        }
      },
      isInSchedule(){
        console.log(this.quiz.settings.isScheduled);
        if(this.quiz.settings.isScheduled){
          var schedule = this.quiz.settings.schedule.replace("T"," ");
          schedule = schedule.replace("Z"," ");
          schedule = new Date(schedule);           
          var dateNow = new Date();           
          return (schedule < dateNow) ? true : false;
        }
        return true;
      },
      paginateItems(collections){
        var the_index = 0;
        var items_count = 0;
        var pages = Math.ceil(this.quiz.quizItems.length/this.itemsPerPage);
        for(var i=0;i<pages;i+=1){
          this.paginatedItems.push([])
        }

        collections.forEach(function(c){
          if(this.paginatedItems[the_index].length<this.itemsPerPage){
            this.paginatedItems[the_index].push(c);
          }else{
            the_index+=1;
            this.paginatedItems[the_index].push(c);
          }
        },this)



        // console.log(this.paginatedItems);
        // for(var i=0;i<itemsPerPage;i+=1){
        //   paginateItems.push(collections[the_index])
        //   the_index+=1;
        // }
        // for(var i=0;i<collections.length;i+=1){}
      },


  	// 		shuffle(array) {
  	// 			var currentIndex = array.length, temporaryValue, randomIndex;
				
  	// 			// While there remain elements to shuffle...
  	// 			while (0 !== currentIndex) {
				
  	// 			  // Pick a remaining element...
  	// 			  randomIndex = Math.floor(Math.random() * currentIndex);
  	// 			  currentIndex -= 1;
				
  	// 			  // And swap it with the current element.
  	// 			  temporaryValue = array[currentIndex];
  	// 			  array[currentIndex] = array[randomIndex];
  	// 			  array[randomIndex] = temporaryValue;
  	// 			}
				
  	// 			return array;
			// },
   //
   
			// generateQuizPaper(collection){
			// 	 this.user.quizPaper = collection.map((i)=>{
			// 		return {
			// 			question : i.question,
			// 			answer:[]
			// 		};
			// 	})
			// },
			// test(index){
   //      if(this.quiz.quizItems[index].type=="multiple-choice"){
   //        var max = this.quiz.quizItems[index].correctAnswer.length;
   //        if(max<=this.user.quizPaper[index].answer.length){
   //           Vue.$toast.success('Your Have selected More than '+this.quiz.quizItems[index].correctAnswer.length+"answers ", {
   //            position: 'top-right',
   //            dismissible:true,
   //            duration:10000
   //          })

   //          this.user.quizPaper[index].answer.splice(2,1);
   //        }
   //      }
  	// 	},

   //    renderCountDownTimer(time){
   //       var d = new Date(),context=this;
   //          d.setMinutes(d.getMinutes()+time);           

   //           var timeinterval = setInterval(function(){
   //            var t = context.getTimeRemaining(d);
   //            context.timer =   t.hours + ' HRS ' + t.minutes + ' Mins ' + t.seconds+" Secs";
   //            if(t.total<=0){
   //              clearInterval(timeinterval);
   //            }
   //          },1000)
   //    },
   renderTimerExpire(){
      var context = this;
        var expiration = this.quiz.settings.expirationDate.replace("T"," ");
        expiration = expiration.replace("Z"," ");
        expiration = new Date(expiration);
          var timeinterval = setInterval(function(){
              var t = context.getTimeRemaining(expiration);
              context.expireTimer = t.days+" Days "+  t.hours + ' HRS ' + t.minutes + ' Mins ' + t.seconds+" Secs";
              if(t.total<=0){
                clearInterval(timeinterval);
              }
            },1000)
   },
      renderTimerAvailability(){
        if(this.comingSoon){
          var context = this;
        var schedule = this.quiz.settings.schedule.replace("T"," ");
        schedule = schedule.replace("Z"," ");
        schedule = new Date(schedule);
          var timeinterval = setInterval(function(){
              var t = context.getTimeRemaining(schedule);
              context.availableTimer = t.days+" Days "+  t.hours + ' HRS ' + t.minutes + ' Mins ' + t.seconds+" Secs";
              if(t.total<=0){
                clearInterval(timeinterval);
              }
            },1000)
        }
      },
      getTimeRemaining(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds
        };
      },
  	// 	checkResults(){
  	// 			var context = this;
  	// 			this.user.score = 0 ;
   //        this.user.overall = 0 ;
  	// 			this.user.quizPaper.forEach((i)=>{
  	// 				context.quiz.quizItems.forEach((q)=>{
  	// 					if(i.question==q.question){

   //                if(q.type=="multiple-choice"){
   //                  var points = q.points;
   //                  var correct = q.correctAnswer.length;
   //                  var score = points/correct;

   //                  q.correctAnswer.forEach(function(answer){
   //                    if(i.answer.indexOf(answer)!=-1){
   //                      if(q.isPerCorrectAnswer=="false"){
   //                        context.user.score += score;

   //                      }else{
   //                        context.user.score += parseFloat(points);                          
   //                      }
   //                    }

   //                    if(q.isPerCorrectAnswer=="false"){
   //                      context.user.overall += parseFloat(score)
   //                    }else{
   //                      context.user.overall += parseFloat(q.points)                     
   //                    }
   //                  })

                   


   //                }else if(q.type=="fill-in-the-blanks"){
   //                  if(i.answer.length>0){                      
   //                  var userAnswer = i.answer.replace(/\s/g,"").toLowerCase();
   //                  var examAnswer = q.correctAnswer.replace(/\s/g,"").toLowerCase();
   //                    if(userAnswer==examAnswer){
   //                      context.user.score += parseFloat(q.points);
   //                    }
   //                  }
   //                   this.user.overall += parseFloat(q.points)
   //                }else{                   
   //    							if(i.answer==q.correctAnswer){
  	//      							context.user.score += parseFloat(q.points);
  	// 		     				}
   //                   this.user.overall += parseFloat(q.points)
   //                }
      
             
  	// 					}
  	// 				})					
			// 	})

   //        var scoreRating = ((this.user.score/this.user.overall)*100);

   //        Vue.$toast.success('Your Score is '+ scoreRating.toFixed(2) +" % ", {
   //            position: 'top-right',
   //            dismissible:true,
   //            duration:10000
   //          })

   //        HistoryService.insertQuiz({
   //          userId:this.user.id,
   //          examId:this.$route.params.id,
   //          score:scoreRating.toFixed(2),
   //        });

  	// 		}
  		},

  		computed:{
  			...mapState('quizPaper',[
          'user',          
          'quiz',
          'index',
          'timer',
          'date',
          'status',
        ]),
  		}
	}
</script>