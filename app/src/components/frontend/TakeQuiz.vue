<template>
	<div class="container">
		<div class="row" v-for="(item,index) in quiz.quizItems">
			<div class="col-md-12">
				<p>{{index+1}}. {{item.question}}</p>
				
				<ul v-for="(option,optIndex) in item.options" class="list-group mb-3">
					<li class="list-group-item">
						<label>
							<input type="radio" :value = "option.cid" v-model="user.quizPaper[index].answer" @input="test">
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
						answer:""
					};
				})
			},
			test(){
  				// console.log(this.user.quizPaper);
  			},
  			checkResults(){
  				var context = this;
  				this.user.score = 0 ;
  				this.user.quizPaper.forEach((i)=>{
  					context.quiz.quizItems.forEach((q)=>{
  						if(i.question==q.question){
  							if(i.answer==q.correctAnswer){
  								context.user.score += parseInt(q.points);
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