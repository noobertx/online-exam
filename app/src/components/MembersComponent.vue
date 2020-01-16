<template>
  <div class="container">
    <h1>Members</h1>
    <button @click="createNew">Add New Member</button>
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" name="name" class="form-control" v-model="userdata.name">
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" name="password" class="form-control" v-model="userdata.password">
  </div>
  <div class="form-group">
    <input type="hidden" name="userType" class="form-control" v-model="userdata.userType">
  </div>
  <div class="form-group">
    <label for="gender">Gender</label>
    <select name="gender" class="form-control" v-model="userdata.gender">
      <option value="" selected disabled></option>
      <option value="F">Female</option>
      <option value="M">Male</option>
    </select>
  </div>
  <div class="form-group">
    <label for="college">College</label>
    <input type="text" name="college" class="form-control" v-model="userdata.college">
  </div>
  <div class="form-group">
    <label for="name">Email</label>
    <input type="text" name="email" class="form-control" v-model="userdata.email">
  </div>
  <div class="form-group">
    <label for="name">Mobile</label>
    <input type="text" name="mobile" class="form-control" v-model="userdata.mobile">
  </div>
   <button v-on:click="addMember">Save</button>
    <hr>
    <p class="error" v-if="error">{{error}}</p>
    <div class="member-container">
      <div class="member" 
      v-for="(member,index) in members" 
      v-bind:item="member" 
      v-bind:index="index" 
      v-bind:key="member._id"
      @click="editMember(member)">
        <div class="email">{{member.email}}</div>
        <button v-on:click="deleteMember(member._id)">Remove</button>
        <p class="text">{{member.name}}</p>
        <p>{{member.college}} | {{member.mobile}} | {{member._id}}</p>        
      </div>
    </div>
   
  </div>
</template>

<script>
  import MemberService from '../MemberService'
export default {
  name: 'MembersComponent',
  data(){
    return {
      members:[],
      error:'',
      userdata:{
        name:'',
        password:'',
        userType:0,
        gender:'',
        college:'',
        email:'',
        mobile:'',
      },
      mode:"register"
    }
  },
  async created(){
    try{
      this.members = await MemberService.getMembers();
    }catch(err){
      this.error = err.message;
    }
  },
  methods:{
    async addMember(){
      if(this.mode=="register"){
        await MemberService.insertMember(this.userdata);
      }else{
        await MemberService.updateMember(this.userdata._id,this.userdata);
      }
      this.members = await MemberService.getMembers();
    },
    async deleteMember(id){
      // console.log(id);
      await MemberService.deleteMember(id);
      this.members = await MemberService.getMembers();
    },
    editMember(member){
      this.mode="edit";
      this.userdata = member;
      // console.log(this.userdata);
    },
    createNew(){
      this.mode="register";
      this.userdata={
        name:'',
        password:'',
        userType:0,
        gender:'',
        college:'',
        email:'',
        mobile:'',
      } 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container{
  max-width: 800px;
  margin: 0 auto;
}

p.error{
  border:1px solid #ff5b5f;
  background-color:#ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.member{
  position: relative;
  border: 1px solid #5bd658;
  background-color:  #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom:15px;
}

div.email{
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background: darkgreen;
  color: #fff;
  font-size: 13px
}

p.text{
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

</style>
