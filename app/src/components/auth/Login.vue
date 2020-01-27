<template>
	<div class="sign-up">
		<div class="row">
		<div class="col-md-6">
			
		<div class="card">
			<div class="card-body">
				<h2 class="card-text text-center">
					Login your account
				</h2>
        <form @submit.prevent="handleSubmit">
				<div class="form-group">
    				<label for="email">Email</label>
    				<input type="text" name="email" id="email" class="form-control" v-model="email">
  				</div>
  				<div class="form-group">
    				<label for="password">Password</label>
    				<input type="password" name="password" id="password" class="form-control" v-model="password">
  				</div>
  				<div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="status.loggingIn">Login</button>
  				</div>
        </form>
			</div>
		</div>
		</div>
		</div>
		
	</div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'

	export default {
  		name: 'Login',
  		data(){  
  			return {
            email: 'komalpd2011@gmail.com',
            password: 'e10adc3949ba59abbe56e057f20f883e',
            submitted: false
        }		  			
  		},
      computed:{
        ...mapState('account', ['status'])
      },
      created(){
         this.logout();
      },
  		methods:{
  			...mapActions('account', ['login', 'logout']),
        handleSubmit (e) {
            this.submitted = true;
            const { email, password } = this;
            if (email && password) {
                this.login({ email, password })
            }
        }
  		}
  	}
</script>