
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const exphbs = require("express-handlebars");
const logger = require("./middleware/Logger");
const members = require("./Members");

const mongoose = require("mongoose");
const app = express();

const multer = require('multer');
const upload = multer();
const User = require("./services/User.services");
const AppError = require("./services/appError");
const GlobalErrorHandler = require("./services/error.services");

const pug = require('pug');


// const Users = require("./models/user");
// const Quiz = require("./models/quiz");
// const Quiz = require("./models/quiz");
// app.use(logger);
// SET HTTP SECURITY

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(helmet());

mongoose.connect("mongodb+srv://admin_noobert23:DevSpades1523@onlineexam-id1lr.mongodb.net/online-exam?authSource=admin&replicaSet=OnlineExam-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true").then(()=>console.log("DB Connection Successful")).catch(err=>console.log("ERROR"));

const limiter = rateLimit({
	max: 100,
	windowMS:60*60*1000,
	message:'Too many request from this IP, please try again in an hour'
})
// LIMIT REQUEST FROM SAME API
app.use('/api',limiter)

// Data sanitization against NOSQL Injection
app.use(mongoSanitize());

// Data sanitization againts xss
app.use(xss());

// Prevent Parameter Polution
app.use(hpp({
	// whitelist fields	
	whitelist:[
	]
}));

// BODY PARSERS
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({limit:'10kb'}));
app.use(express.urlencoded({extended:false}));



// app.use('/api/login',require('./routes/api/login'));
// app.use('/api/members',require('./routes/api/members'));
// app.use('/api/questions',require('./routes/api/questions'));
app.use('/api/quiz',require('./routes/api/quizzes'));
app.use('/api/user',require('./routes/api/user.api.js'));
app.use('/api/result',require('./routes/api/result.js'));
// app.use('/api/history',require('./routes/api/history'));
// var db = mongoose.connection;




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
// if(process.env.NODE_ENV==='production'){
	app.use(express.static(path.join(__dirname+'/public')));
// 	app.get(/.*/,(req,res)=>res.sendFile(__dirname+'/public/index.html'));
// }


const PORT = process.env.PORT || 5000;
app.get('/',(req,res)=>{
	res.status(200).render('base',{
		author:'Robert Talavera',
		role:'Developer'
	})
})
// app.all("*",(req,res,next)=>{
// 	next(new AppError(`Cant' find ${req.originalUrl} on this server`,404));
// });
app.use(GlobalErrorHandler)

const server = app.listen(PORT,() => console.log(`Server started on port ${PORT}`));


// process.on('unhandledRejection',err=>{
// 	console.log(err.name,err.message);
// 	server.close(()=>{
// 		process.exit(1)
// 	})
// })
// process.on('uncaughtException',err=>{
// 	console.log(err.name,err.message);
// 	server.close(()=>{
// 		process.exit(1)
// 	})
// })


//Test Debug

