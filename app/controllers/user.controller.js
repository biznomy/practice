var User = require('../models/user.model.js');
var mongoose = require("mongoose");
var express = require('express');
var app = express();

var multer = require("multer");
const path   = require('path');





var ObjectId ;
exports.mongoose = mongoose.ObjectId;   

app.use(express.static('./public/uploads/'));

exports.save = (req, res) => {
	console.log('Post a User: ' + JSON.stringify(req.body));

 /*const user = new User({
        firstname : req.body.firstname,
        lastname  : req.body.lastname,
        email     : req.body.email,
        gender    : req.body.gender,
        contact   : req.body.contact,
        subject   : req.body.subject,
        imageURL  : req.body.imageURL
        
    });

  user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });*/
};
var listSort = ['time','request'];
var defSort = listSort[0];
var listOrder = ['-1','1'];
var defOrder = listOrder[0];

    exports.findAll = (req, res) =>  {
    console.log("Fetch all Users");



var rQuery = req.query || {};
   var limit = rQuery.limit || 5;
   var page = rQuery.page || 1;

   var sort =  listSort.indexOf(rQuery.sort) === -1 ? defSort :  rQuery.sort;
   var order = listOrder.indexOf(rQuery.order) === -1 ? defOrder : rQuery.order;
   var querySort = {};
   querySort.sort = parseInt(order, 10);

   var timeBegin = isNaN(Number(rQuery.timeBegin)) ? undefined : Number(rQuery.timeBegin);
   var timeEnd = isNaN(Number(rQuery.timeEnd))  ? undefined : Number(rQuery.timeEnd);
   var request = rQuery.request;
   var queryFind = {};

   if(timeBegin || timeEnd){
       queryFind.time={};
       if(timeBegin)
           queryFind.time['$gte']=timeBegin;
       if(timeEnd)
           queryFind.time['$lte']=timeEnd;
   }

   if(request){
       queryFind.request =  new RegExp(request, 'i');
   }

   User.find(queryFind).sort(querySort)
   .limit(limit).skip(limit*(page-1), function(err, logItems) {
       if (!err) {
         return res.json(logItems);
       } else {
         return res.send({error: err});
       }
   })/*paginate({}, options)*/
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.delete = (req, res) => {
    const user = new User({
        firstname  : req.body.firstname,
        lastname   : req.body.lastname,
        email      : req.body.email,
        gender     : req.body.gender,
        contact    : req.body.contact,
        subject    : req.body.subject,
        imageURL   : req.body.imageURL
    });

    User.findByIdAndRemove(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        res.send({message: "user deleted successfully!" + req.params.id});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.firstname === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.id
        });
    });
};


/*exports.update = (req, res) => {
   
console.log("Your data is :", req.body);

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
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
        res.send(user);
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
};*/
