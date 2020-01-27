require('dotenv').config()

const express = require('express');
const mongodb = require('mongodb');
const multer = require('multer');
const uuid = require('uuid');
const upload = multer();
const router = express.Router();
const ObjectId = require('mongodb').ObjectID
const jwt = require("jsonwebtoken");
// const members = require("../../Members");
let refreshTokens = []
router.post('/',upload.none(),async (req,res)=>{	
	const user = await getUser(req.body);
	if(user){	
			const members = await loadMembersCollection();
			res.json({			
				id:user[0]._id,
				name:user[0].name,
				email:user[0].email,
				mobile:user[0].mobile,
				userType:user[0].userType,
				gender:user[0].gender,
				college:user[0].college
			});
	}else{
		res.json({});				
	}
})

router.post('/token',(req,res)=>{
	const refreshToken = req.body.token;
	console.log(process.env.REFRESH_TOKEN_SECRET);
	// if(refreshToken==null) return res.sendStatus(401)
	// if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

	// jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
	// 	if(err) return res.sendStatus(403)
	// 	const accessToken = generateAccessToken({name:user.name});
	// 	res.json({accessToken:accessToken});
	// });
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
router.post('/', upload.none(),async (req,res)=>{
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
})

// Update Member

router.put('/:id',upload.none(),async (req,res)=>{	
	const members = await loadMembersCollection();
		await members.updateOne({_id:ObjectId(req.body._id)},{
			$set:{				
				name:req.body.name,
				userType:req.body.userType,
				gender:req.body.gender,
				college:req.body.college,
				email:req.body.email,
				mobile:req.body.mobile,
				password:req.body.password
			}
		})


	res.status(201).send();
})


// Delete Member

router.delete('/:id',async (req,res)=>{	

	const members = await loadMembersCollection();

	await members.deleteOne({_id:new mongodb.ObjectID(req.params.id)});

	res.status(200).send();

})
//mongodb://heroku_kzkgjmk7:ev0eenrv4jlevttct59op312ub@ds259878.mlab.com:59878/heroku_kzkgjmk7
function authenticateToken(req,res,next){
	const authHeader = req.headers['authorization'];
	const token = authHeader &&  authHeader.split(" ")[1];
	if(token == null) return res.sendStatus(401)
		jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
			if(err)	 return res.sendStatus(403)			
			req.user = user
			next()
		})
}
function generateAccessToken(user){
	return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30sec'});
}


async function getUser(userdata){
	const client = await mongodb.MongoClient.connect("mongodb+srv://admin_noobert23:DevSpades1523@onlineexam-id1lr.mongodb.net/test?authSource=admin&replicaSet=OnlineExam-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",{
		useNewUrlParser:true
	})


	return client.db('online-exam').collection('users').find(userdata).toArray();

}
async function loadMembersCollection(){
	const client = await mongodb.MongoClient.connect("mongodb+srv://admin_noobert23:DevSpades1523@onlineexam-id1lr.mongodb.net/test?authSource=admin&replicaSet=OnlineExam-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",{
		useNewUrlParser:true
	})

	// return client.db('OnlineExam').collection('users')
	return client.db('online-exam').collection('users')

}
module.exports = router;