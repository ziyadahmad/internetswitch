var express = require('express');
var app = express();
var jsonfile = require('jsonfile');
var file = '\data.json';
var bodyParser = require('body-parser');
var path = require('path');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//
var port =process.env.PORT || 8080;

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

app.use('/static', express.static(__dirname + '/www'));
app.use('/modules', express.static(__dirname + '/node_modules'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/www/index.html'));
});

app.get('/switch', function(req, res) {

    jsonfile.readFile(file, function(err, obj) {
        res.send(JSON.stringify(obj));
    })
});

app.post('/switch', function(req, res) {

    var obj = { switch: req.body.action }

    jsonfile.writeFile(file, obj, function(err) {
        if (err != null)
            console.log(err);
    });

    res.send(obj);
});

app.listen(port);
console.log('Server listening on port' + port);

