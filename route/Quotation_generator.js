var express = require('express');
const PDFDocument = require('pdfkit');
var fs = require('fs');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const assert = require('assert');
var collection;
var t=0;


MongoClient.connect(url,{ useNewUrlParser: true ,useUnifiedTopology: true }, function(err, client) {
	assert.equal(null, err);
  	console.log("Connected successfully to server *quptation_generator");
  	const db = client.db("quotation");
  	collection =db.collection('quotationData');

  	
  client.close();
  console.log("Mongo Client Closed");
});


router.post('/pdf',(req,res)=>{
				t=t+1;
				console.log("pdf called "+t);
				var usrn= req.body.username;
				var title= req.body.title;
				var name_s= req.body.name_s;
				var name_r= req.body.name_r;
				var address_s= req.body.address_s;
				var address_r = req.body.address_r;
				var  email_s= req.body.email_s;
				var  email_r= req.body.email_r;
				var  phn_s= req.body.phn_s;
				var  phn_r= req.body.phn_r;
				var  serial_no= req.body.i_serial_number;
				var  date= req.body.date;
				var  term= req.body.term;
				var  note= req.body.note;
				var  item_data= req.body.item_data;
				console.log("pdf "+usrn+title+name_s+name_r+address_s+address_r+email_s+email_r+phn_s+phn_r+serial_no+date+term+note);

				const doc = new PDFDocument;
				if(usrn.length>0)
				doc.pipe(fs.createWriteStream('quotationPDFs/q'+usrn+'.pdf'));
				else doc.pipe(fs.createWriteStream('quotationPDFs/qFree'+t+'.pdf'));

				doc.fontSize(25)
   					.text(title, 80, 80);

   				doc.fontSize(20)
   					.text(name_s, 50, 150);
   				doc.fontSize(20)
   					.text(email_s, 50,180 );
   				doc.fontSize(20)
   					.text(address_s, 50,210 );
   				doc.fontSize(20)
   					.text(phn_s, 50,240 );

   				doc.end();



				// for(var j=0;j<item_data.length;j++)
				// console.log("item data "+item_data[j].item);
    			


				// collection.find({'id' : usrn}).toArray(function(err,docs) {
				// 	//console.log("inside "+docs.length);
				// 	if(docs.length == 0){
				// 		console.log("error in logging");
				// 		res.sendStatus(404);
				// 	}
					
				// 	else{
				// 		assert.equal(err,null);
				// 		//console.log("password "+docs[0].pass);
				// 		if(typeof docs[0].pass !== 'undefined' && docs[0].pass==password){
				// 		 		res.sendStatus(200); 
				// 		 		// res.send("Successfully Login");
				// 		 	} 
				// 		else  res.sendStatus(404);
				// 		// res.send("Invalid Username or Password");
				// 	}
				// });
				res.send('file:///home/viraj/Desktop/IP/Quotation_Genearator/quotationPDFs/qFree'+t+'.pdf');
			});

module.exports= router;
	
