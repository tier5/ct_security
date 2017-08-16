var db = require('../../config/mongoSchema');
var fs = require('fs');	
var multer = require('multer');

exports.addvisitors = function (req, res) {

  function decodeBase64Image(dataString) {
      var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};
      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer(matches[2], 'base64');
      return response;
    }

    var imageBuffer = decodeBase64Image(req.body.visitor_image);
    var date=Date.now();
    var file=date+'.jpg'
    fs.writeFile(__dirname + '/../../public/uploads/'+file, imageBuffer.data);
    var filedir = "http://104.236.67.117:2000/public/uploads/" +file;

    var imageBuffer1 = decodeBase64Image(req.body.file);
    var date1=Date.now();
    var file1=date1+'.jpg'
    fs.writeFile(__dirname + '/../../public/uploads/'+file1, imageBuffer.data);
    var filedir1 = "http://104.236.67.117:2000/public/uploads/" +file1;


    var newvisitor=new db.visitorModel({name:req.body.name,company_name:req.body.company_name,location:req.body.location,licence_plate:req.body.licence_plate,checkintime:req.body.checkintime,checkindate:req.body.checkindate,security_id:req.body.security_id,visitor_image:filedir,file:filedir1,checkoutdate:"in"})
    newvisitor.save(function(err,newvisitor){
      if (err) {
         var message = JSON.parse('{"status":"failed","data":"visitor insertion failed"}');
        res.send(message)

      }else{
        var message = JSON.parse('{"status":"success","data":' + JSON.stringify(newvisitor) + '}');
        res.send(message)
      }
    })
    
}


exports.updatevisitor = function(req, res, next) { 
  var id = req.body.id;

   db.visitorModel.findById(id, function(err, doc) {
    if (err) { 
        var message = JSON.parse('{"status":"failed","data":"no data found with this id"}');
            res.send(message);
    } 
    if (doc) { 
        console.log(JSON.stringify(doc));
        doc.checkoutdate=req.body.checkoutdate;
        doc.checkouttime=req.body.checkouttime;
       
        doc.save(function(err,update){
          var message = JSON.parse('{"status":"success","data":' + JSON.stringify(update) + '}');
          res.send(message);

        });
    }
    else{
        var message = JSON.parse('{"status":"failed","data":"failed to update user"}');
        res.send(message);
    }
     
  })
  };

  exports.findvisitor = function(req, res, next) {
   //var id = req.params.id;
   db.visitorModel.find({security_id:req.params.id,checkoutdate:"in"}, function (err, doc) {  
    if (err) {
        res.json(err)
    }
    if (doc) {
        var message = JSON.parse('{"status":"success","data":' + JSON.stringify(doc) + '}');
        res.send(message);
    } else {
        res.json("No record found with that ID")
    }
      });
}


  exports.visitordata = function(req, res, next) {
   var id = req.params.id;
   db.visitorModel.findById(id, function (err, doc) {  
    if (err) {
        res.json(err)
    }
    else {
        var message = JSON.parse('{"status":"success","data":' + JSON.stringify(doc) + '}');
        res.send(message);
    } 
      });
}




exports.delete = function(req, res, next) {
 // var id = req.params.id;
 db.visitorModel.Remove(function (err, doc) {
     if (err) {
      var message = JSON.parse('{"status":"failed","user":' + JSON.stringify(err) + '}');
                    res.send(message)  
    }  else{
    var message = JSON.parse('{"status":"success","user":"Record deleted "}');
                    res.send(message)  
     }
  });
 
};

