// server.js

//Base Setup 
//==============================================================================================

//require packages needed
var _ = require('lodash');
var express = require('express');
var path = require('path');
// var bodyParser = require('body-parser');

// // configure app to use bodyParser()
// // lets us get data from a POST
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 8100;

server.listen(port, function() {
	console.log('Running on port: ', port);
});

var staticPath = path.join(__dirname, 'client');
app.use(express.static(staticPath));