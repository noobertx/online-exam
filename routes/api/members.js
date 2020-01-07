const express = require('express');
const mongodb = require('mongodb');
const uuid = require('uuid');
const router = express.Router();
const members = require("../../Members");

router.get('/', async (req,res)=>{	
	// res.json(members) 
	const members = await loadMembersCollection();
	res.send(await members.find({}).toArray());
})

//Get Single member
router.get('/:id',(req,res)=>{	
	const found = members.some(member=>member.id===parseInt(req.params.id))
	if(found){
		res.json(members.filter(member=>member.id=== parseInt(req.params.id)))
	}else{
		res.status(400).json({msg:`No member with the id of ${req.params.id} found`})
	}
})

// Create Member
router.post('/',async (req,res)=>{

	const members = await loadMembersCollection();

	

	await members.insertOne({
		id:uuid.v4(),
		name:req.body.name,
		userType:req.body.userType,
		gender:req.body.gender,
		college:req.body.college,
		email:req.body.email,
		mobile:req.body.mobile,
		password:req.body.password
	})


	res.status(201).send();

	// members.push(newMember);
	// res.json(members);
	// res.redirect("/");
})

// Update Member

router.put('/:id',(req,res)=>{	
	const found = members.some(member=>member.id===parseInt(req.params.id))
	if(found){
		const updMember = req.body;
		members.forEach(member=>{
			if(member.id===parseInt(req.params.id)){
				member.name = updMember.name ? updMember.name : member.name;
				member.userType = updMember.userType ? updMember.userType : member.userType;
				member.gender = updMember.gender ? updMember.gender : member.gender;
				member.college = updMember.college ? updMember.college : member.college;
				member.email = updMember.email ? updMember.email : member.email;
				member.mobile = updMember.mobile ? updMember.mobile : member.mobile;
				member.password = updMember.password ? updMember.password : member.password;
			}
		});		
	}else{
		res.status(400).json({msg:`No member with the id of ${req.params.id} found`})
	}
})

// Delete Member

router.delete('/:id',async (req,res)=>{	
	// const found = members.some(member=>member.id===parseInt(req.params.id))
	// if(found){

	// 	res.json({msg:"member deleted",members:members.filter(member=>member.id!== parseInt(req.params.id))})
	// }else{
	// 	res.status(400).json({msg:`No member with the id of ${req.params.id} found`})
	// }
	const members = await loadMembersCollection();

	await members.deleteOne({_id:new mongodb.ObjectID(req.params.id)});

	res.status(200).send();
})
//mongodb://heroku_kzkgjmk7:ev0eenrv4jlevttct59op312ub@ds259878.mlab.com:59878/heroku_kzkgjmk7
async function loadMembersCollection(){
	const client = await mongodb.MongoClient.connect("mongodb+srv://admin_noobert23:DevSpades1523@onlineexam-id1lr.mongodb.net/test?authSource=admin&replicaSet=OnlineExam-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",{
		useNewUrlParser:true
	})

	return client.db('online-exam').collection('users')

}
module.exports = router;