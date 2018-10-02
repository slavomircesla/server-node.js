var app   = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var path    = require("path");
var bodyParser = require("body-parser");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student",
  });
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });
	
  app.post('/insert',function(req,res){
	var firstname = req.body.firstname;
    var surname = req.body.surname;
    var clas = req.body.class;

	var values =[req.body.firstname,req.body.surname,req.body.class];
	console.log(firstname);
	console.log(surname);


	con.query("INSERT into student(firstname,surname,class) values (?) ",[values],function(err, rows, fields){
	
      
	res.send(rows);

			
		
	});
});


app.post('/select',function(req,res){
	var id= req.body.id;
	
	con.query("SELECT firstname,surname,class from student where id like ? ",[id],function(err, rows, fields){
	
      
	res.send(rows);
	console.log(rows);
			
		
	});
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


  
  app.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});