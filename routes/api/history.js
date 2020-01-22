const express = require('express');
const mongodb = require('mongodb');
const multer = require('multer');
const uuid = require('uuid');
const upload = multer();
const router = express.Router();
const ObjectId = require('mongodb').ObjectID

router.post('/', upload.none(),async (req,res)=>{
	const records = await loadHistoryCollection();


	const result = await records.insertOne({
		userId:req.body.userId,
		examId:req.body.examId,
		score:req.body.score,
		date: new Date()
	})


	res.status(201).send(result.insertedId.toString());
})


async function loadHistoryCollection(){
	const client = await mongodb.MongoClient.connect("mongodb+srv://admin_noobert23:DevSpades1523@onlineexam-id1lr.mongodb.net/test?authSource=admin&replicaSet=OnlineExam-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",{
		useNewUrlParser:true
	})

	// return client.db('OnlineExam').collection('users')
	return client.db('online-exam').collection('quiz-history')

}
module.exports = router;