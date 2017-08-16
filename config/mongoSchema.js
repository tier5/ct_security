 var mongoose = require('mongoose');

console.log("Mongo schema")
var mongodbURL = 'mongodb://localhost/jon';
var mongodbOptions = {};

mongoose.connect(mongodbURL, mongodbOptions, function (err, res) {
    if (err) {
        console.log('Connection refused to ' + mongodbURL);
        console.log(err);
    }
    else {
        console.log('Connection successful to: ' + mongodbURL);
    }
});

var Schema = mongoose.Schema;



//// User schema
var User = new Schema({
    username: { type: String},
    email: { type: String, required: true, unique: true },
    location:{type: String},
    password: { type: String },
    time: { type: String },
    createdDate:{ type: Date, default: Date.now, required:true }
})

var Visitor = new Schema({
    name: { type: String},
    company_name: { type: String },
    location: { type: String },
    licence_plate:{type: String},
    checkindate: { type: String },
    checkintime: { type: String },
    checkoutdate: { type: String },
    checkouttime: { type: String },
    visitor_image: { type: String },
    file:{ type: String},
    security_id: { type: String},
    createdDate:{ type: Date, default: Date.now, required:true }
})


var admin = new Schema({
    email: { type: String},
    password: { type: String},
    createdDate:{ type: Date, default: Date.now, required:true }
})




var userModel = mongoose.model('User', User);

var visitorModel = mongoose.model('Visitor', Visitor);

var adminModel = mongoose.model('admin', admin);


module.exports.adminModel = adminModel;

module.exports.userModel = userModel;

module.exports.visitorModel = visitorModel;
  
