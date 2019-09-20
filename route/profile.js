var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const assert = require('assert');
var collection;


MongoClient.connect(url,{ useNewUrlParser: true ,useUnifiedTopology: true }, function(err, client) {
	assert.equal(null, err);
  	console.log("Connected successfully to server *profile");
  	const db = client.db("quotation");
  	collection =db.collection('account');

  	
  client.close();
  console.log("Mongo Client Closed");
});


router.post('/profile',(req,res)=>{

				console.log("profile called ");
				var usrn= req.body.username;
    			// var password = req.body.password;
    			console.log("id "+usrn);


				collection.find({'id' : usrn}, { projection: { _id: 0 , which_fields_u_dont_want_make_theme :0} }).toArray(function(err,docs) {
					//console.log("inside "+docs.length);
					if(docs.length == 0){
						console.log("Profile Not found");
						res.sendStatus(404);
					}
					
					else{
						assert.equal(err,null);
						console.log("password "+docs[0].pass);
					
								console.log(docs[0]);
								res.send(docs[0]);
					}
				});
			});

module.exports= router;
	
