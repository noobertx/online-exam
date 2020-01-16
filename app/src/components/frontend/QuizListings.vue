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
					<td>{{quiz.time}}</td>
					<td>{{quiz.items}}</td>
					<td>{{quiz.total}}</td>
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
	}
</script>