
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/Logger");
const members = require("./Members");

const mongoose = require("mongoose");
const app = express();

const multer = require('multer');
const upload = multer();
const User = require("./services/User.services");

// const Users = require("./models/user");
// const Quiz = require("./models/quiz");
// const Quiz = require("./models/quiz");
// app.use(logger);
mongoose.connect("mongodb+srv://admin_noobert23:DevSpades1523@onlineexam-id1lr.mongodb.net/online-exam?authSource=admin&replicaSet=OnlineExam-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",(err)=>{

	if(!err){
		console.log("Server connected to mongodb")
	}else{
		console.log("Error :Server connected to mongodb")

	}
});

// Body Parse Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// app.use('/api/login',require('./routes/api/login'));
// app.use('/api/members',require('./routes/api/members'));
// app.use('/api/questions',require('./routes/api/questions'));
app.use('/api/quiz',require('./routes/api/quizzes'));
// app.use('/api/history',require('./routes/api/history'));
// var db = mongoose.connection;


app.get('/',function(res,req){})

app.post('/api/login',(req,res)=>{
	User.login(req,res);
})



//User Authentication

const posts =[
	{
		username:'bert',
		title:"Post 1"
	},
	{
		username:'test',
		title:"Post 2"
	}
]

// app.get('/posts',authenticateToken,(req,res)=>{
// 	res.json(posts.filter(post=>post.username===req.user.name))
// })

let refreshTokens = []



// Handle Production
if(process.env.NODE_ENV==='production'){
	app.use(express.static(__dirname+'/public/'));
	app.get(/.*/,(req,res)=>res.sendFile(__dirname+'/public/index.html'));
}


const PORT = process.env.PORT || 5555;


app.all("*",(req,res,next)=>{
	res.status(404).json({
		status:'fail',
		message:`Can't fid ${req.originalUrl} on this server! `
	});
});

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));
