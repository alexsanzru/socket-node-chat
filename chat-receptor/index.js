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

//require('./database')

var port = process.env.PORT || conf.port

var server = http.listen(port, conf.host, function(){
	var addr = server.address();
	console.log('listening on '+addr.address+':' + addr.port);
});

//app.get('/enviar', function(req, res) {  
//	return res.status(200).jsonp({'status':200});
//});

// Logger configuration
//var logger = new events.EventEmitter();
//logger.on('newEvent', function(event, data) {
	// Console log
//	console.log('%s: %s', event, JSON.stringify(data));
//});

// Welcome message
io.on('connection', function(socket)
	{
	return res.status(400).jsonp({'status':400});

	io.emit('connected', 'Welcome to the chat server - Connection OK' );

	socket.join(user.room, function(err, obj)
		{
		if (err)
			{
			socket.emit('connectToSocket', {'room':'MainRoom', 'username':'Anonymus', 'msg':'error: ' + err, 'id':'0','username':'Chat'});
			}
		else
			{
			io.emit('messageNew', {'room':'MainRoom', 'username':'Chat', 'msg': 'Anonymus' + ' se ha unido al bingo', 'id':'0'});
			}
		});

	// Clean up on disconnect
	socket.on('disconnect', function() {
		// Get current rooms of user
		var rooms = 'MainRoom';
		});

	// New message sent to group
	socket.on('sendMessageFromChat', function(data)
		{
		var message = {'room':'MainRoom', 'username':'Anonymus', 'msg':data.msg, 'date':new Date()};
		io.emit('sendMessageToChat', message);
		});
	});