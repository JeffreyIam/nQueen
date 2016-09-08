var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/'));

var port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log('listening on port ', port) ;
});
