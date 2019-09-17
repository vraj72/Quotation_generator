var app = require('./route/app');

app.get('/',(req,res)=>{
	return res.send("quotation generator");
})

app.listen(8081, (req, res) => {
    console.log("Listening on 8081");
});
