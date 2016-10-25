var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use(bodyParser.json())

app.post('/question', function(req, res){
  console.log(JSON.stringify(req.body));
  var post_data = JSON.stringify(req.body);
  var auth = 'Basic' + new Buffer('quk_student10:D8WLxiLk').toString('base64');
  var post_options = {
    host: 'watson-wdc01.ihost.com',
    port: '443',
    path: '/instance/541/deepqa/v1/question',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': auth
    }
  }
  var response_string = '';
  var post_req = https.request(post_options, function(result){
    console.log('making a request');
    result.setEncoding('utf-8');

    result.on('data', function(chunk){
      response_string += chunk;
      console.log('got some data', chunk);
    });

    result.on('end', function(){
      var answers_pipeline = JSON.parse(response_string),
        answers = answers_pipeline[0];
      console.log(response_string);
      res.send(response_string);
    });
  });

  post_req.on('error', function(e){
    console.log('error: ' + e.message);

  });

  post_req.write(post_data);
  post_req.end();
});

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname + '/public' });
});

app.listen(8080, function () {
  console.log('Running on http://localhost:8080/');
});

// from https://www.ibm.com/blogs/bluemix/2015/08/simple-angular-node-application/
// HTML server that can get host and port info from VCAP
// var connect = require('connect');
// var serveStatic = require('serve-static');
// var port = (process.env.VCAP_APP_PORT || 3000);
// var host = (process.env.VCAP_APP_HOST || 'localhost');
// connect().use(serveStatic(__dirname)).listen(port,host);