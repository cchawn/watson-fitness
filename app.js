var express = require('express');
var bodyParser = require('body-parser');
// var watson = require('watson-developer-cloud');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use(bodyParser.json())

app.post('/question', function(req, res){
  console.log(JSON.stringify(req.body));
  res.send('it did a thing');
});

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname + '/public' });
});

app.listen(8080, function () {
  console.log('Running on http://localhost:8080/');
});