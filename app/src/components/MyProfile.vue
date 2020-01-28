<template>
	<div>
		<h1>{{member.name}} Member Profile</h1>
    <p>User Type: {{member.userType}}</p>
    <p>Email Address: {{member.email}}</p>
    <p>College: {{member.college}}</p>
    <p>Mobile: {{member.mobile}}</p>

	</div>
</template>
<script>
	import MemberService from '../MemberService'

	export default{
		name: 'MemberItemComponent',
		data(){
			return{
				member:{
					name:"",
					userType:0,
					gender:"F",
					college:"UC",
					email:"lorem-sr@example.com",
					mobile:"44444",
					password:"123123",
					refreshToken:"",
				}
			}
		},
    mounted(){
          this.member = JSON.parse(localStorage.getItem("credentials")).user ;
          console.log(this.member);
      try{
      	// 		if(this.$route.params.id){
    			// 	let member = await MemberService.getMember(this.$route.params.id);    
    			// 	this.member = member[0];
    			// }      
    		}catch(err){
      			this.error = err.message;
    		}
		},
		methods:{
			async saveMember(){

    		  if(this.$route.params.id!="add"){        
    		    await MemberService.updateMember(this.$route.params.id,this.member);
    		  }else{
    		    var _id = await MemberService.insertMember(this.member);
    		    location.hash="#/members/"+_id.data		
    		  }
    		},
		}
	}
</script>