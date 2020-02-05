<template>
	<div class="container">
		<table class="table">
			<thead>
				<tr>
					<th>Title</th>
					<th>Duration</th>
					<th>Total Items</th>
					<th>Points</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(quiz,index) in quizzes">

					<td><a :href="'#/take-quiz/'+quiz._id">{{quiz.title}}</a></td>
					<td>{{quiz.settings.time}}</td>
					<td>{{quiz.quizItems.length}}</td>
					<td>{{getTotalPoints(quiz)}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	import QuizzesService from '../../QuizzesService'
	export default{
		data(){
    		return {
    		  quizzes:[],    		  
    		}
  		},
  		async created(){
    		try{
      			this.quizzes = await QuizzesService.getQuizzes();
    		}catch(err){
      			this.error = err.message;
    		}
  		},
  		methods:{
  			getTotalPoints(quiz){
  				var points = 0 ;
      			for(var i=0;i<quiz.quizItems.length;i+=1){
        				points += parseInt(quiz.quizItems[i].points)
      			}
      			return points;
  			}
  		}
	}
</script>