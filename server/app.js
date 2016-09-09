var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var Solve = require('./solvers.js');

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/'));

app.post('/api/solve', function (req, res){
  console.log(req.body);
  if( (req.body.chessPiece === 'q' || req.body.chessPiece === 'r') &&
    req.body.n >=2 && req.body.n <= 8){
    res.status(200).send(Solve.solve(req.body.chessPiece, req.body.n));
  } else {
    res.status(400).send('Solutions are not available');
  }
});

var port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log('listening on port ', port) ;
});

module.exports = app;
