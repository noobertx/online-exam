<template>
	<div>
		<h1>{{name}} Member Profile</h1>
    <p>User Type: {{userType}}</p>
    <p>Email Address: {{email}}</p>
    <p>College: {{college}}</p>
    <p>Mobile: {{mobile}}</p>

	</div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
	export default{
		name: 'MemberItemComponent',
		data(){
			return{				
          name:"",
          userType:0,
          gender:"F",
          college:"UC",
          email:"lorem-sr@example.com",
          mobile:"44444",
          password:"123123",
          refreshToken:"",
			}
		},
    created(){
      this.name = this.$store.state.account.user.name;
      this.userType = this.$store.state.account.user.userType;
      this.gender = this.$store.state.account.user.gender;
      this.college = this.$store.state.account.user.college;
      this.email = this.$store.state.account.user.email;
      this.mobile = this.$store.state.account.user.mobile;
      this.refreshToken = this.$store.state.account.user.refreshToken;
    },

    computed:{
       ...mapState('account',['user'])
    },
		methods:{
		
		}
	}
</script>