var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var login = require('./login');
var profile=require('./profile');
var pdf=require('./Quotation_generator');
var register=require('./register');
 
app.use('',login);  //login file from post_login
app.use('',profile);
app.use('',pdf);
app.use('',register);

module.exports=app;
