module.exports = function(app) {
	var mongoose = require("mongoose"); 
	var express = require("express");
	var router = express.Router();
	var User = require('../models/user.model.js');
    const users = require('../controllers/user.controller.js');

    var multer = require("multer");

    var ObjectId;
	exports.mongoose = mongoose.ObjectId;

 	var storage = multer.diskStorage({
    destination : './public/uploads/',
    filename :function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: storage
}).single('imageURL');
	
	var path = __basedir + '/views/';
	
	router.use(function (req,res,next) {
		console.log("/" + req.method);
		next();
	});
	
	app.get('/', (req,res) => {
		res.sendFile(path + "index.html");
	});

	app.use(express.static('public'));

    app.post('/api/users/save', function(req, res){
	//    	console.log(req.file);
	upload(req, res, function(err){
		if(err)
		{
			res.sen(err)
		}
		else
			if(req.file == undefined)
			{
			console.log("Please insert image " + req.file);
			}
		else{
			console.log(req.file);
		const user = new User({
    	_id   : new mongoose.Types.ObjectId(),
        firstname : req.body.firstname,
        lastname  : req.body.lastname,
        email     : req.body.email,
        gender    : req.body.gender,
        contact   : req.body.contact,
        subject   : req.body.subject,
        imageURL  : "http://localhost:8081/uploads/"+req.file.filename
        
    	});

    	user.save()
    	.then(data => {
        res.send(data);
    	}).catch(err => {
        res.status(500).send({
            message: err.message
        });
	});
	}

    });
    });

    app.get('/api/users/all', users.findAll);

 	app.delete('/api/users/delete/:id', users.delete);

 	app.get('/api/users/find/:id', function(req, res){

        // let firstname = req.body.firstname;
        // let lastname = req.body.lastname;
        // let email = req.body.email;
        // let gender = req.body.gender;
        // let contact = req.body.contact;
        // let subject = req.body.subject;
        // let imageURL = req.body.imageURL;

        // var id = ({_id: });

 		User.findById(req.params.id, function(err, doc) {
        if (doc){
            console.log("ID :" +doc._id);
            console.log("Firstname : " +doc.firstname);
            console.log("Lastname : " +doc.lastname);
            console.log("Email Id :" +doc.email);
            console.log("Gender :" +doc.gender);
            console.log("Contact :" +doc.contact);
            console.log("Subject :" +doc.subject);
            console.log("Image Path :" +doc.imageURL);
            res.send(doc);

        } else {
                        
            console.log('no data of this user');
            res.status(404).send("No Data Found");
        }

    });
 	});
    
 	app.put('/api/users/update/:id', function(req, res){
 		upload(req, res, err=>{
 			if(err)
 			{
 				res.send(err)
 			}
 			else if(req.file === undefined)
 			{
 				console.log("Please select image for update: " +req.file);
 			}
 			else
 				User.findOneAndUpdate({ "_id": mongoose.Types.ObjectId(req.params.id)},
     		{ $set:
    		 {
            firstname :  req.body.firstname, 
            lastname  :  req.body.lastname,
            email     :  req.body.email, 
            gender    :  req.body.gender, 
            contact   :  req.body.contact, 
            subject   :  req.body.subject,
            imageURL  : "http://localhost:8081/uploads/"+req.file.filename 
       		}
    		}, {new: true})
    		.then(users => {
        if(!users) {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        res.send(users);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });
})
    
 });
	
	app.use("/",router);
	
	//app.use(express.static(__basedir, 'uploads'));
 
	app.use("*", (req,res) => {
		res.sendFile(path + "404.html");
	});
}