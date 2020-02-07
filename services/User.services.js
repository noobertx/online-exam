require('dotenv').config()
const User = require("./../models/user.js");
const jwt = require("jsonwebtoken");

let refreshTokens = []

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
	return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1000sec'});
}



exports.login = async(req,res)=>{
	try{		
	const user = await User.findOne({email:req.body.email,password:req.body.password});
	const accessToken =  generateAccessToken(user.email);
	const refreshToken =  jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);

	
	// console.log(user,process.env.REFRESH_TOKEN_SECRET);
	console.log({accessToken:accessToken});

	res.status(200).json(user)
	}catch(err){
		res.status(404).json({
			status:'fail',
			message:err
		})
	}
}




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
