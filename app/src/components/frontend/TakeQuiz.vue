<template>
	<div class="container">

    <h1>{{quiz.title}}</h1>
    <p>{{quiz.description}}</p>
    <p class="small">{{timer}}</p>
    
    <div id="clockdiv"></div>

		<div class="row" v-for="(item,index) in quiz.quizItems">
			<div class="col-md-12">
				<p>{{index+1}}. {{item.question}}</p>

				<ul v-for="(option,optIndex) in item.options" class="list-group mb-3">
					<li class="list-group-item">
						<label v-if="item.type=='single-choice-r'">
							<input type="radio" :value = "option.cid" v-model="user.quizPaper[index].answer" @input="test">
							{{option.text}}
						</label>
            <label v-if="item.type=='multiple-choice'">
              <input type="checkbox" :value = "option.cid" :id="option.cid"  v-model="user.quizPaper[index].answer" @input="test">
              {{option.text}}
            </label>
					</li>
				</ul>

			</div>			
		</div>
		<button class="btn btn-success btn-block" @click="checkResults">Submit</button>

	</div>
</template>
<script>
	import QuizService from '../../QuizItemService'
	export default{
		data(){
    		return {
    		  user:{
    		  	name:"Robert Talavera",
    		  	email:"noobertx@gmail.com",
    		  	quizPaper:[],
    		  	score:0
    		  },
    		  quiz:[],
          timer: "",
          date: new Date()
    		}
  		},
  		async created(){
    		try{
      			let quiz = await QuizService.getQuiz(this.$route.params.id);
      			this.quiz = quiz[0];
      			if(this.quiz.settings.isRandomize){
      				this.quiz.quizItems = this.shuffle(this.quiz.quizItems ) ;
      			}
      			this.generateQuizPaper(this.quiz.quizItems);
            if(this.quiz.settings.time){
              this.renderCountDownTimer(this.quiz.settings.time);
            }

    		}catch(err){
      			this.error = err.message;

      			
    		}
  		},

  		methods:{
  			shuffle(array) {
  				var currentIndex = array.length, temporaryValue, randomIndex;
				
  				// While there remain elements to shuffle...
  				while (0 !== currentIndex) {
				
  				  // Pick a remaining element...
  				  randomIndex = Math.floor(Math.random() * currentIndex);
  				  currentIndex -= 1;
				
  				  // And swap it with the current element.
  				  temporaryValue = array[currentIndex];
  				  array[currentIndex] = array[randomIndex];
  				  array[randomIndex] = temporaryValue;
  				}
				
  				return array;
			},
			generateQuizPaper(collection){
				 this.user.quizPaper = collection.map((i)=>{
					return {
						question : i.question,
						answer:[]
					};
				})
			},
			test(){

  			},

      renderCountDownTimer(time){
         var d = new Date(),context=this;
            d.setMinutes(d.getMinutes()+time);           

             var timeinterval = setInterval(function(){
              var t = context.getTimeRemaining(d);
              context.timer =   t.hours + ' HRS ' + t.minutes + ' Mins ' + t.seconds+" Secs";
              if(t.total<=0){
                clearInterval(timeinterval);
              }
            },1000)
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
  		checkResults(){
  				var context = this;
  				this.user.score = 0 ;
  				this.user.quizPaper.forEach((i)=>{
  					context.quiz.quizItems.forEach((q)=>{
  						if(i.question==q.question){

                  if(q.type=="multiple-choice"){
                    var points = q.points;
                    var correct = q.correctAnswer.length;
                    var score = points/correct;

                    q.correctAnswer.forEach(function(answer){
                      if(i.answer.indexOf(answer)!=-1){
                        context.user.score += score;
                      }
                    })

                  }else{                   
      							if(i.answer==q.correctAnswer){
  	     							context.user.score += parseInt(q.points);
  			     				}
                  }
  						}
  					})					
				})

				alert("Your Score:" + this.user.score);
  			}
  		},

  		computed:{
  			
  		}
	}
</script>