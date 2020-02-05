require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/Logger");
const members = require("./Members");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = express();

const multer = require('multer');
const upload = multer();


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


// app.post('/login',(req,res)=>{
// 	const username = req.body.username
// 	const user = {name:username	}
// 	const accessToken =  generateAccessToken(user);
// 	const refreshToken =  jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);
// 	refreshTokens.push(refreshToken);
// 	res.json({accessToken:accessToken,refreshToken:refreshToken});
// });

// app.delete('/logout',(req,res)=>{
// 	console.log(refreshTokens)
// 	console.log(req.body.token)
// 	refreshTokens = refreshTokens.filter(token=>token !== req.body.token)
// 	res.sendStatus(204);
// })
// function authenticateToken(req,res,next){
// 	const authHeader = req.headers['authorization'];
// 	const token = authHeader &&  authHeader.split(" ")[1];
// 	if(token == null) return res.sendStatus(401)
// 		jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
// 			if(err)	 return res.sendStatus(403)			
// 			req.user = user
// 			next()
// 		})
// }

// function generateAccessToken(user){
// 	return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30sec'});
// }
//
// Handle Production
if(process.env.NODE_ENV==='production'){
	app.use(express.static(__dirname+'/public/'));
	app.get(/.*/,(req,res)=>res.sendFile(__dirname+'/public/index.html'));
}


const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));
