const express = require('express');
const mongodb = require('mongodb');
const multer = require('multer');
const uuid = require('uuid');
const upload = multer();
const router = express.Router();
const ObjectId = require('mongodb').ObjectID
// const quizzes = require("../../Members");

router.get('/', async (req,res)=>{	
	// res.json(quizzes) 
	const quizzes = await loadQuizzesCollection();
	res.send(await quizzes.find({}).toArray());
})

//Get Single member
router.get('/:id',async (req,res)=>{	
	const quizzes = await loadQuizzesCollection();
	// console.log(req.body);

	res.send(await quizzes.find({_id:new mongodb.ObjectID(req.params.id)}).toArray());
	// const found = quizzes.some(quiz=>quiz._id===new mongodb.ObjectID(req.params.id))
	// if(found){
	// 	res.json(quizzes.filter(quiz=>quiz._id=== new mongodb.ObjectID(req.params.id)))
	// }else{
	// 	res.status(400).json({msg:`No member with the id of ${req.params.id} found`})
	// }
})

// Create Member
router.post('/', upload.none(),async (req,res)=>{
	const quizzes = await loadQuizzesCollection();
	const result = await quizzes.insertOne({
		examId:uuid.v4(),
		title:req.body.quizData.title,
		items:req.body.quizData.items,
		wrong:req.body.quizData.wrong,
		total:req.body.quizData.total,
		time:req.body.quizData.time,
		intro:req.body.quizData.intro,
		tag:req.body.quizData.tag,
		quizItems:req.body.quizItems,
		settings:req.body.settings,
		meta:req.body.meta,
		date: new Date()
	})


	res.status(201).send(result.insertedId.toString());
})

// Update Member

router.put('/:id',upload.none(),async (req,res)=>{	
	const quizzes = await loadQuizzesCollection();
		await quizzes.updateOne({_id:ObjectId(req.body.quizData._id)},{
			$set:{				
				title:req.body.quizData.title,
				items:req.body.quizData.items,
				wrong:req.body.quizData.wrong,
				total:req.body.quizData.total,
				time:req.body.quizData.time,
				intro:req.body.quizData.intro,
				tag:req.body.quizData.tag,
				quizItems:req.body.quizItems,
				settings:req.body.settings,
				meta:req.body.meta,
			}
		})


	res.status(201).send();
})

// Delete Member

router.delete('/:id',async (req,res)=>{	

	const quizzes = await loadQuizzesCollection();

	await quizzes.deleteOne({_id:new mongodb.ObjectID(req.params.id)});

	res.status(200).send();

})
//mongodb://heroku_kzkgjmk7:ev0eenrv4jlevttct59op312ub@ds259878.mlab.com:59878/heroku_kzkgjmk7
async function loadQuizzesCollection(){
	const client = await mongodb.MongoClient.connect("mongodb+srv://admin_noobert23:DevSpades1523@onlineexam-id1lr.mongodb.net/test?authSource=admin&replicaSet=OnlineExam-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",{
		useNewUrlParser:true
	})

	// return client.db('OnlineExam').collection('users')
	return client.db('online-exam').collection('quiz')

}
module.exports = router;