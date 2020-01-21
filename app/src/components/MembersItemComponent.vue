<template>
	<div>
		<h1>Change Member Info</h1>
<div class="form-group">
    <label for="name">Name</label>
    <input type="text" name="name" class="form-control" v-model="member.name">
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" name="password" class="form-control" v-model="member.password">
  </div>
  <div class="form-group">
    <input type="hidden" name="usertype" class="form-control" v-model="member.usertype">
  </div>
  <div class="form-group">
    <label for="gender">Gender</label>
    <select name="gender" class="form-control" v-model="member.gender">
      <option value="" selected disabled></option>
      <option value="F">Female</option>
      <option value="M">Male</option>
    </select>
  </div>
  <div class="form-group">
    <label for="college">College</label>
    <input type="text" name="college" class="form-control" v-model="member.college">
  </div>
  <div class="form-group">
    <label for="name">Email</label>
    <input type="text" name="email" class="form-control" v-model="member.email">
  </div>
  <div class="form-group">
    <label for="name">Mobile</label>
    <input type="text" name="mobile" class="form-control" v-model="member.mobile">
  </div>
  <div class="form-group">
    <label for="name">Refresh Token</label>
    <input type="text" name="mobile" class="form-control" v-model="member.refreshToken">
  </div>
   <button v-on:click="saveMember">Save</button>
    <hr> 
	</div>
</template>
<script>
	import MemberService from '../MemberService'

	export default{
		name: 'MemberItemComponent',
		data(){
			return{
				member:{
					name:"Lorem Sr",
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
		async created(){
			try{
      			if(this.$route.params.id){
    				let member = await MemberService.getMember(this.$route.params.id);    				
    				this.member = member[0];
    			}      
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