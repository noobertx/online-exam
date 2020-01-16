<template>
	<div class="sign-up">
		<div class="row">
		<div class="col-md-6">
			
		<div class="card">
			<div class="card-body">
				<h2 class="card-text text-center">
					Login your account
				</h2>
				<div class="form-group">
    				<label for="email">Email</label>
    				<input type="text" name="email" id="email" class="form-control" v-model="user.email">
  				</div>
  				<div class="form-group">
    				<label for="password">Password</label>
    				<input type="password" name="password" id="password" class="form-control" v-model="user.password">
  				</div>
  				<div class="form-group">
  					<button class="btn btn-success btn-block" @click="logInUser">Log In</button>
  				</div>
			</div>
		</div>
		</div>
		</div>
		
	</div>
</template>
<script>
    import LoginService from '../../services/LoginService'
	export default {
  		name: 'Login',
  		data(){  
  			return {
  				user:{
  					email:"noobertx@gmail.com",
  					password:"1234123",
  				},
          userdata:{

          }
  			}			  			
  		},
  		methods:{
  			async logInUser(){
           this.userdata = await LoginService.getLogin(this.user);
  			}
  		}
  	}
</script>