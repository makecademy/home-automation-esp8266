// Module
var express = require('express');
var app = express();

// Define port
var port = 3000;

// Global variable for motion sensor
var motion = 0;

// Alarm state
var alarm = 0;

// View engine
app.set('view engine', 'jade');

// Set public folder
app.use(express.static(__dirname + '/public'));

// Serve interface
app.get('/', function(req, res){
  res.render('interface');
});

// Change motion sensor state
app.post('/motion', function(req, res) {
  motion = req.query.state;
  res.send('Data received: ' + motion);
});

// Get motion sensor state
app.get('/motion', function(req, res) {
  res.json({state: motion});
});

// Get alarm state
app.get('/alarm', function(req, res) {
  res.json({state: alarm});
});

// Set alarm state
app.post('/alarm', function(req, res) {
  alarm = req.query.state;
  res.send('Data received: ' + alarm);
});

// Start server
app.listen(port);
console.log("Listening on port " + port);