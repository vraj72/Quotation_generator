var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
var bodyparser = require("body-parser");
const assert = require('assert');
var collection;
var app=express();
app.use(express.json())

app.get('/',(req,res)=>{
	return res.sendFile("11.html");
})

app.listen(8081, (req, res) => {
    console.log("Listening on 8081");
});
