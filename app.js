var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(express.static('resources'));
 
global.__basedir = __dirname;

const dbConfig = require('./app/config/mongodb.config.js');
const mongoose = require('mongoose');
 
mongoose.Promise = global.Promise;
 
var connect =mongoose.connect(dbConfig.url, function(err, db){
	useNewUrlParser: true
	var col = db.collection('users');
	console.log("table is :" + col);
})
.then(() => {
    console.log("Successfully connected to MongoDB.");    
}).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
});
 
require('./app/routes/user.route.js')(app);

 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
 
})