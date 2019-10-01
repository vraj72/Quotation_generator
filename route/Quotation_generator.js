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
				var  subtotal= req.body.subtotal_amount;
				var  tax_per= req.body.tax_per;
				var  tax_amount= req.body.tax_amount;
				var  total_amount= req.body.total_amount;
				var  item_data= req.body.item_data;
				console.log("pdf "+usrn+title+name_s+name_r+address_s+address_r+email_s+email_r+phn_s+phn_r+serial_no+date+term+note);

				const doc = new PDFDocument;
				if(usrn.length>0)
				doc.pipe(fs.createWriteStream('quotationPDFs/q'+usrn+'.pdf'));
				else doc.pipe(fs.createWriteStream('quotationPDFs/qFree'+t+'.pdf'));

				doc.fontSize(35)
   					.text(name_s, 40, 40);
   				doc.fontSize(18)
   					.text(title, 430, 50);

   				doc.fontSize(15)
   					.text('Serial No: '+serial_no,400,120);
   				doc.fontSize(14)
   					.text("Date: "+date,400,140);  
   				doc.fontSize(14)
   					.text('Term: '+term,400,160);

   				doc.moveTo(20,95)
   					.lineTo(590,95)
   					.stroke();

   				doc.fontSize(13)
   					.text('Address:\n'+ name_s+'\n'+address_s+'\n'+email_s+'\n'+phn_s+'\n\nTo,\n'+name_r+'\n'+address_r+'\n'+email_r+'\n'+phn_r, 40,120 );

   				

   				doc.moveDown();
   				doc.moveTo(20,doc.y)
   					.lineTo(590,doc.y)
   					.stroke();

   				var y_axis=doc.y;
   				doc.rect(20,doc.y,570,25)
   					.fill('#C0C0C0');

   				doc.fontSize(13)
   					.fillColor('black')
   					.text('Description',60,y_axis+5);
   				doc.fontSize(13)
   					.fillColor('black')
   					.text('Rate       Quantity        Amount        Tax',300,y_axis+5);

   				doc.moveDown();
   				doc.moveDown();
   				y_axis=doc.y;
   				for(var j=0;j<item_data.length;j++){

   					doc.fontSize(15)
   					.text(item_data[j].item,60,y_axis);


   					doc.fontSize(12)
   					.text(item_data[j].rate,300,y_axis+3);

   					doc.fontSize(12)
   					.text(item_data[j].quan,360,y_axis+3);

   					doc.fontSize(12)
   					.text(item_data[j].amount,430,y_axis+3);

   					doc.fontSize(12)
   					.text(item_data[j].tax,510,y_axis+3);

   					// doc.moveDown(); y_axis=doc.y;
   					if(item_data[j].desc.length>0)
					{
   					doc.fontSize(10)
   					.text('( Description : '+item_data[j].desc+' )',60,doc.y+3);}

   					doc.moveDown();
	   				doc.moveDown();
	   				y_axis=doc.y;

   				}

   				doc.moveTo(20,doc.y)
   					.lineTo(590,doc.y)
   					.stroke();

   					doc.moveDown();
   				doc.fontSize(13)
   					.fillColor('black')
   					.text('Subtotal Amount : '+subtotal,360,doc.y);
   				doc.fontSize(13)
   					.fillColor('black')
   					.text('Tax Amount : '+tax_amount,360,doc.y);
   				doc.fontSize(13)
   					.fillColor('black')
   					.text('Tax Percentage : '+tax_per+'%',360,doc.y);
   				doc.fontSize(13)
   					.fillColor('black')
   					.text('Total Amount : '+total_amount,360,doc.y);


				// console.log("item data "+item_data[j].item);




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
				
				if(usrn.length>0)
				{res.send('file:///home/viraj/Desktop/IP/Quotation_Genearator/quotationPDFs/q'+usrn+'.pdf');
				console.log('file:///home/viraj/Desktop/IP/Quotation_Genearator/quotationPDFs/q'+usrn+'.pdf');}
				else{
				res.send('file:///home/viraj/Desktop/IP/Quotation_Genearator/quotationPDFs/qFree'+t+'.pdf');
				console.log('file:///home/viraj/Desktop/IP/Quotation_Genearator/quotationPDFs/qFree'+t+'.pdf');}
			});

module.exports= router;
	
