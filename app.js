var express = require('express');
var https = require('https');
var bodyParser = require('body-parser');
// var watson = require('watson-developer-cloud');
var app = express();

var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use(bodyParser.json())

app.post('/question', function(req, res){
  // credentials
  var username = 'quk_student10';
  var passwd = 'D8WLxiLk';

  // Get the values
  var syncTimeout = "1";
  var query = req.body.question;

  console.log("Timeout:" + syncTimeout + " Query:" + query);

  // Set the required headers for posting the REST query to Watson
  var headers = {
    'Content-Type'  :'application/json',
    'X-synctimeout' : syncTimeout,
    'Authorization' : "Basic " + new Buffer("quk_student10"+":"+"D8WLxiLk").toString("base64")
  };

  // Create the request options to POST our question to Watson
  var options = {
    host: 'watson-wdc01.ihost.com',
    port: '443',
    path: '/instance/541/deepqa/v1/question',
    method: 'POST',
    headers: headers,
    rejectUnauthorized: false, // ignore certificates
    requestCert: true,
    agent: false
  };

  var output = "";

  // Create a request to POST to Watson
  var post_req = https.request(options, function(result) {
    result.setEncoding('utf-8');

    // Retrieve and return the result back to the client            
    result.on("data", function(chunk) {          
      output += chunk; 
    });

    result.on('end', function(chunk) {    
      var results = JSON.parse(output);
      res.send(results);
    });
  });


  post_req.on('error',function(e) {
    console.log("problem"+ e.message);
  });

  // create the Question text to ask Watson  
  var question = {
    question : {
      questionText : query
    }
  };   
  // console.log(JSON.stringify(question));

  // Set the POST body and send to Watson
  post_req.write(JSON.stringify(question));
  // post_req.write("\n\n");
  post_req.end();

  // res.send('it did a thing');
});

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname + '/public' });
});

app.listen(port, function () {
  console.log('Running on:' + port);
});