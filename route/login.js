var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const assert = require('assert');
var collection;


MongoClient.connect(url,{ useNewUrlParser: true ,useUnifiedTopology: true }, function(err, client) {
	assert.equal(null, err);
  	console.log("Connected successfully to server");
  	const db = client.db("quotation");
  	collection =db.collection('account');

  	
  client.close();
  console.log("Mongo Client Closed");
});


router.post('/login',(req,res)=>{

				console.log("login called ");
				var usrn= req.body.username;
    			var password = req.body.password;
    			console.log("id "+usrn+"  password "+password);


				collection.find({'id' : usrn}).toArray(function(err,docs) {
					//console.log("inside "+docs.length);
					if(docs.length == 0){
						console.log("error in logging");
						res.sendStatus(404);
					}
					
					else{
						assert.equal(err,null);
						//console.log("password "+docs[0].pass);
						if(typeof docs[0].pass !== 'undefined' && docs[0].pass==password){
						 		res.sendStatus(200); 
						 		// res.send("Successfully Login");
						 	} 
						else  res.sendStatus(404);
						// res.send("Invalid Username or Password");
					}
				});
			});

module.exports= router;
	
