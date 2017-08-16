var db = require('../../config/mongoSchema');
var bcrypt = require('bcryptjs');
var fs = require('fs');
var randtoken = require('rand-token').generator();
var SALT_WORK_FACTOR = 10;	

var nodemailer = require("nodemailer");
var sgTransport = require('nodemailer-sendgrid-transport');


var SALT_WORK_FACTOR = 10;
var _ = require("underscore");

var SENDGRID_USERNAME = "venkat56781";
var SENDGRID_PASSWORD = "pass@123";




exports.login = function (req, res) {
    db.userModel.findOne({'email':req.body.email.toLowerCase()}).then(user => {
        if(user == undefined) {
            var message = JSON.parse('{"status":"failed","user":"Invalid email or password"}');
            res.send(message)       
        } else { 
            
            if(req.body.password==user.password)
             {
                var message = JSON.parse('{"status":"success","user":' + JSON.stringify(user) + '}');
                res.send(message)       
            } 
            else {  
                var message = JSON.parse('{"status":"failed","user":"Invalid email or password"}');
                res.send(message)       
            }    
        }
    })
}


exports.addUser = function (req, res) {
    db.userModel.findOne({email:req.body.email},function(err,user){
        if(user==undefined){
           
                    var newUser=new db.userModel({username:req.body.username,email:req.body.email.toLowerCase(),password:req.body.password,location:req.body.location})
                    newUser.save(function(err,newuser){
                    
                    var message = JSON.parse('{"status":"success","user":' + JSON.stringify(newuser) + '}');
                    res.send(message)
                    })
              
                           } else {
            
                             var message = JSON.parse('{"status":"failed","user":"Email already Exist"}');
                                res.send(message) 
                                   }
                       })
}


exports.addAdmin = function (req, res) {
                var newMsg=new db.adminModel({email:req.body.email,password:req.body.password})
                newMsg.save(function(err,newuser){
                    var message = JSON.parse('{"status":"success","msg":' + JSON.stringify(newMsg) + '}');
                    res.send(message)

    })
    }


exports.adminLogin = function (req, res) {
    db.adminModel.findOne({'email':req.body.email.toLowerCase()}).then(user => {
        if(user == undefined) {
            var message = JSON.parse('{"status":"failed","user":"Invalid email or password"}');
            res.send(message)       
        } else {  

             if(req.body.password==user.password)
                 {
                    var message = JSON.parse('{"status":"success","user":' + JSON.stringify(user) + '}');
                    res.send(message)       
                } 
                else {  
                    var message = JSON.parse('{"status":"failed","user":"Invalid email or password"}');
                    res.send(message)       
                }    
        }
    }) 
}


exports.user = function(req, res, next) {
   var id = req.params.id;
   db.userModel.findById(id, function (err, doc) {  
    if (err) {
        res.json(err)
    }
    if (doc) {
        res.json(doc)
    } else {
        res.json("No record found with that ID")
    }
      });
}

exports.users = function (req, res) {
  db.userModel.find()
    .then(function(doc) {
      var message = JSON.parse('{"status":"success","users":' + JSON.stringify(doc) + '}');
        res.send(message)
    });
};


exports.delete = function(req, res, next) {
  var id = req.params.id;
 db.userModel.findByIdAndRemove(id,function (err, doc) {
     if (err) {
      var message = JSON.parse('{"status":"failed","user":' + JSON.stringify(err) + '}');
                    res.send(message)  
    }  else{
    var message = JSON.parse('{"status":"success","user":"Record deleted "}');
                    res.send(message)  
     }
  });
 
};

exports.updateUser = function(req, res, next) { 
  var id = req.body.id;

   db.userModel.findById(id, function(err, doc) {
    if (err) { 
        var message = JSON.parse('{"status":"failed","data":"no data found with this id"}');
            res.send(message);
    } 
    if (doc) { 
        console.log(JSON.stringify(doc));
        doc.username=req.body.username;
        doc.email=req.body.email.toLowerCase();
        doc.location=req.body.location;
        
        doc.save(function(err,newuser){
          var message = JSON.parse('{"status":"success","data":' + JSON.stringify(newuser) + '}');
          res.send(message);

        });
    }
    else{
        var message = JSON.parse('{"status":"failed","data":"failed to update user"}');
        res.send(message);
    }
     
  })
  };

