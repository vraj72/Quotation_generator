var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const assert = require('assert');
var collection;
const db;

	
MongoClient.connect(url,{ useNewUrlParser: true ,useUnifiedTopology: true }, function(err, client) {
	assert.equal(null, err);
  	console.log("Connected successfully to server *regiter");
  	db = client.db("quotation");
  	collection =db.collection('account');

  	
  client.close();
  console.log("Mongo Client Closed");
});


// router.post('/profile',(req,res)=>{

// 				console.log("profile called ");
// 				var usrn= req.body.username;
//     			// var password = req.body.password;
//     			console.log("id "+usrn);


// 				collection.find({'id' : usrn}, { projection: { _id: 0 , which_fields_u_dont_want_make_theme :0} }).toArray(function(err,docs) {
// 					//console.log("inside "+docs.length);
// 					if(docs.length == 0){
// 						console.log("Profile Not found");
// 						res.sendStatus(404);
// 					}
					
// 					else{
// 						assert.equal(err,null);
// 						console.log("password "+docs[0].pass);
					
// 								console.log(docs[0]);
// 								res.send(docs[0]);
// 					}
// 				});
// 			});



router.post('/register',(req,res)=>{

          console.log("register called");
				  var Pname1= req.body.Pname1;
          var Pname2= req.body.Pname2;
          var Pemail = req.body.Pemail;
          var Pphone = req.body.Pphone;
          var Paddress = req.body.Paddress;
          var Prole = req.body.Prole;

          var Oname= req.body.Oname;
          var Ophone=req.body.Ophone;
          var Oemail=req.body.Oemail;
          var Oaddress1 =req.body.Oaddress1;
          var Oaddress2 = req.body.Oaddress2;
          var Ofax = req.body.Ofax;
          var Oreg = req.body.Oreg;

          var Aname = req.body.Aname;
          var Apassword = req.body.Apassword;
          var Apassword2 = req.body.Apassword2;

          var Personal = {Pfirstname:Pname1, Plastname:Pname2, Pemail:Pemail, Pphone:Pphone, Paddress:Paddress, Prole:Prole};
          var Organisation = {Oname:Oname, Ophone:Ophone, Oemail:Oemail, Oaddress1:Oaddress1, Oaddress2:Oaddress2, Ofax:Ofax, Oreg:Oreg};
          var Account = {Aname:Aname, Apassword:Apassword, Apassword2:Apassword2};

          db.collection("register").insertOne(Personal, function(res){
            console.log("Personal details inserted");
          });
          db.collection("register").insertOne(Organisation, function(res){
            console.log("Organisation details inserted");
          });
          db.collection("register").insertOne(Account, function(res)
          {
            console.log("Account details inserted");
          });
});

module.exports= router;
	
