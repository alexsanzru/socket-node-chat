var conf = {
	port: 3000,
	host: '0.0.0.0'
};

// External dependencies
var express = require('express'),
http = require('http'),
https = require('https'),
events = require('events'),
_ = require('underscore'),
sanitize = require('validator').sanitize;

// HTTP Server configuration & launch
var app = express(),
http = http.createServer(app);

var io = require('socket.io')(http);
var handlebars = require('handlebars');

var port = process.env.PORT || conf.port

var server = http.listen(port, conf.host, function(){
	var addr = server.address();
	console.log('listening on '+addr.address+':' + addr.port);
});

var path = require('path');
var public = path.join(__dirname, 'public');

// Demo clinet
app.get('/', function(req, res) {
    res.sendFile(path.join(public, '/index.html'));
});

app.use('/', express.static(public));