
// var mongoose = require('mongoose');
var express=require('express');
var router = express.Router();
var app=express();
// app.set('view engine','ejs');
// app.use('/assets', express.static('assets'));
// Connect to MongoDB and create/use database called todoAppTest
// mongoose.connect('mongodb://localhost/profile',{ useNewUrlParser: true ,useUnifiedTopology: true }, function(err){
//   if (err) console.log(err);
//   else console.log('connectd');
// });

// // Create a schema
//  var TodoSchema = new mongoose.Schema({
//   name: String,
//   age:String,
//   updated_at: { type: Date, default: Date.now },
// });
// var TodoSchema =mongoose.Schema('todos');
// var TodoSchema = new mongoose.Schema({
//   users : [{ type : mongoose.Schema.ObjectId, ref : 'todos' }]
// });
// Create a model based on the schema
// var Todo = mongoose.model('users', TodoSchema);

// Create a todo in memory
// var todo = new Todo({name: 'Master NodeJS', completed: false, note: 'Getting there...'});
//#@SD!.ZnTMSw4Ym
// // Save it to database
// todo.save(function(err){
//   if(err)
//     console.log(err);
//   else
//     console.log(todo);
// });

// Todo.create({name: 'Create something with Mongoose', completed: true, note: 'this is one'}, function(err, todo){
//   if(err) console.log(err);
//   else console.log(todo);
// });
//

// Find all data in the Todo collection

app.post('/db',function(req,res){
  console.log("request recieved");
  var usrn=req.body.name;
  Todo.find({ name: usrn} ,function (err, todos) {
    if (err) return console.error(err);
    // res.send('/db',{data:'todos'})
    res.send(todos);

    });
    // console.log(todos);
    });

// Todo.find({"name":"varun"},function (err, todos) {
//   if (err) return console.error(err);
//   // res.send('/db',{data:'todos'})
//   console.log(todos);
//   // res.send(todos);
// });
app.listen(8081);
