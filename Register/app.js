var express = require('express');
var app = express.Router();
const assert = require('assert');
var bodyparser = require("body-parser");
var fs = require('fs');
var app = express();
app.use(express.json())
var collection;
var db;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/11.html');
  res.sendFile(__dirname + '/11.css');
  app.use('/css',express.static(__dirname + '/css'));
  fs.readFile('11.css', function(req, res){
  });
  fs.readFile('11.html', function(req, res) {
  });
});
app.listen(8080);
console.log('listening on port 8080');

//connection url
const url = 'mongodb://localhost:27017';
const MongoClient = require('mongodb').MongoClient;

//Database name
const dbname = 'quotation';

//connect to server
MongoClient.connect(url,{ useNewUrlParser:true, useUnifiedTopology: true}, function(err, client){
  assert.equal(null, err);
  console.log('Connected to server');
  db = client.db(dbname);
  collection =db.collection('register');

});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/register',(req,res)=>{

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
				  // collection.insert({'usrn' : usrn}, { projection: { _id: 0 } }).toArray(function(err,docs) {
					// console.log("inside "+docs.length);
					//  if(docs.length == 0)
          //  {
					//  	console.log("Error bhai");
					//  	res.sendStatus(404);
					//  }
          // else
          // {
          //   console.log("1 document inserted");
          // }
