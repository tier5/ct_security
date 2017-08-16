var express=require("express")
var bodyParser=require("body-parser")
var path = require('path');
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser({limit: '5000mb'}));

app.all('*', function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    if ('OPTIONS' == req.method) return res.send(200);
    next();
});

app.use(bodyParser({
    keepExtensions: true,
    uploadDir: __dirname + '/uploads'
}));
app.use(express.static(__dirname ));
app.use(express.static(path.join(__dirname, 'uploads')));

var routes = {};
routes.users = require('./routes/users/user.js');
routes.visitors = require('./routes/visitors/visitors.js');

//users

app.post('/adminLogin', routes.users.adminLogin);
app.post('/addAdmin', routes.users.addAdmin);
app.post('/addUser', routes.users.addUser);
app.post('/login', routes.users.login);
app.get('/users', routes.users.users);
app.post('/updateUser', routes.users.updateUser);
app.get('/user/:id', routes.users.user);
app.delete('/deleteuser/:id', routes.users.delete);


//visitors
app.post('/addvisitors', routes.visitors.addvisitors);
app.post('/updatevisitor', routes.visitors.updatevisitor);

app.get('/findvisitor/:id', routes.visitors.findvisitor);
app.get('/visitordata/:id', routes.visitors.visitordata);
app.delete('/delete', routes.visitors.delete);



var server = app.listen(2000,function()
{
    var host = server.address().address
    var port = server.address().port
    console.log('app running at host', port)
});


 
