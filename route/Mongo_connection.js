const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const assert = require('assert');
var db;
MongoClient.connect(url,{ useNewUrlParser: true ,useUnifiedTopology: true }, function(err, client) {
	assert.equal(null, err);
  	console.log("Connected successfully to server *profile");
  	db = client.db("quotation");
  	

  	
  client.close();
  console.log("Mongo Client Closed");
});


module.exports= db;

