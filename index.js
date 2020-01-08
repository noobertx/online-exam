const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/Logger");
const members = require("./Members");
const app = express();

// app.use(logger);

// Body Parse Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/members',require('./routes/api/members'));
app.use('/api/questions',require('./routes/api/questions'));
app.use('/api/quizzes',require('./routes/api/quizzes'));

// Handle Production
if(process.env.NODE_ENV==='production'){
	app.use(express.static(__dirname+'/public/'));
	app.get(/.*/,(req,res)=>res.sendFile(__dirname+'/public/index.html'));
}


const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));
