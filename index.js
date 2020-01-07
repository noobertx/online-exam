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


// Homepage route
// app.get('/',(req,res)=> {
// 	res.render('index',{
// 		title:"Member App Lorem Ipsum",
// 		members
// 	});
// });

// Handlebars Middleware
// app.engine('handlebars',exphbs({defaultLayout:'main'}));
// app.set('view engine','handlebars');

//set a static folder
// app.use(express.static(path.join(__dirname,'public')));

app.use('/api/members',require('./routes/api/members'));

// Handle Production
if(process.env.NODE_ENV==='production'){
	app.use(express.static(__dirname+'public'));
	app.get(/.*/,(req,res)=>res.sendFile(__dirname+'/public/index.html'));
}


const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));
