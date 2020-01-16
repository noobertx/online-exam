<template>
	<div class="sign-up">
		<div class="row">
		<div class="col-md-6">
			
		<div class="card">
			<div class="card-body">
				<h2 class="card-text text-center">
					Register for an account
				</h2>
				<div class="form-group">
    				<label for="email">Email</label>
    				<input type="text" name="email" id="email" class="form-control" v-model="user.email">
  				</div>
  				<div class="form-group">
    				<label for="fullname">Fullname</label>
    				<input type="text" name="fullname" id="fullname" class="form-control" v-model="user.fullname">
  				</div>
  				<div class="form-group">
    				<label for="password">Password</label>
    				<input type="password" name="password" id="password" class="form-control" v-model="user.password">
  				</div>
  				<div class="form-group">
    				<label for="confirm_password">Confirm Password</label>
    				<input type="password" name="confirm_password" id="confirm_password" class="form-control" v-model="confirmPassword">
  				</div>
  				<div class="form-group">
  					<buttn class="btn btn-success btn-block" @click="signUpUser">Sign Up</buttn>
  				</div>
			</div>
		</div>
		</div>
		</div>
		
	</div>
</template>
<script>
	export default {
  		name: 'SignUp',
  		data(){  
  			return {
  				user:{
  					email:"noobertx@gmail.com",
  					fullname:"Robert Talavera",
  					password:"passwrd1",
  				},
  				confirmPassword:"password2"
  			}			
  			
  		},
  		methods:{
  			signUpUser(){

  			}
  		}
  	}
</script>