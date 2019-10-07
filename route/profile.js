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
				var usrnn= req.body.name;
    			// var password = req.body.password;
    			console.log("id "+usrnn);



				collection.find({'Pfirstname' : usrnn}, { projection: { _id: 0 } }).toArray(function(err,docs) {
					//console.log("inside "+docs.length);
					if(docs.length == 0){
						console.log("Profile Not found");
						res.sendStatus(404);
					}

					else{
						assert.equal(err,null);
						// console.log("password "+docs[0].pass);

								console.log(docs[0]);
								res.send(docs[0]);
					}
				});
			});

const multer = require('multer');
// const ejs = require('ejs');
const path = require('path');
const storage = multer.diskStorage({
    destination: './images',
    filename: function (req, file, cb) {
        // null as first argument means no error
        console.log(file);
        cb(null, Date.now() + '-' + file.originalname )
    }
})

// Init upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },

    fileFilter: function (req, file, cb) {
        sanitizeFile(file, cb);
    }

}).single('pic')

router.post('/upload', (req, res) => {
    res.send('done');
    upload(req, res, (err) => {
        if (err){
          console.log("hii");
            // res.render('index', { msg: err})
        }else{
            // If file is not selected
            if (req.file == undefined) {
                // res.render('index', { msg: 'No file selected!' })
                console.log("hey");
            }
            else{
                // res.render('index', { msg: 'File uploaded successfully!' })
                // console.log(file);
            }

        }

    })
})

function sanitizeFile(file, cb) {
    // Define the allowed
    let fileExts = ['png', 'jpg', 'jpeg', 'gif']

    // Check allowed extensions
    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());
    // Mime type must be an image
    let isAllowedMimeType = file.mimetype.startsWith("image/")

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true) // no errors
    }
    else {
        // pass error msg to callback, which can be displaye in frontend
        cb('Error: File type not allowed!')
    }
}



module.exports= router;
