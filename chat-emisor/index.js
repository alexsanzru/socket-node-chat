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

//require('./database')

// Logger configuration
var logger = new events.EventEmitter();
logger.on('newEvent', function(event, data) {
	// Console log
	console.log('%s: %s', event, JSON.stringify(data));
	// Persistent log storage too?
	// TODO
});

// Welcome message
io.on('connection', function(socket)
	{
//	db.flushdb( function (err, didSucceed) {
//        console.log(didSucceed); // true
//    });

	io.emit('connected', 'Welcome to the chat server - Connection OK' );

	//Connect to the room
	socket.on('join', function(user){
		socket.session = {};   // создаем объект с данными сокета
		socket.session.userName = user.username;   // помещаем в объект имя пользователя
		socket.session.userId = user.user_id;   // помещаем в объект имя пользователя
		socket.session.address = socket.handshake.address; //помещаем в объект IP-адресс пользователя
		socket.session.id = socket.id;    //помещаем в объект id сокета данного пользователя

		console.log('Ищу Ключ: ' + user.user_id);

		// Store user data in db
		db.hset([user.user_id, 'connectionDate', new Date()], redis.print);
		db.hset([user.user_id, 'socketID', socket.id]);
		db.hset([user.user_id, 'username', user.username], redis.print);
		db.hset([user.user_id, 'userid', user.user_id], redis.print);
		db.hset([user.user_id, 'room', user.room], redis.print);

		socket.join(user.room, function(err, obj)
			{
			if (err)
				{
				socket.emit('connectToSocket', {'room':user.room, 'username':socket.session.userName, 'msg':'error: ' + err, 'id':socket.session.userId,'username':'WinCoin Bingo'});
				}
			else
				{
				io.emit('messageNew', {'room':user.room, 'username':'WinCoin Bingo', 'msg': socket.session.userName + ' se ha unido al bingo', 'id':socket.session.userId});

				var users_online = db.dbsize( function (err, numKeys) {
					db.hset(['stat', 'connectedTotal', numKeys - 1], redis.print);
					io.emit('updateBingoConnectionsTotal', {'counttotal': numKeys - 1});
					});
				}
			});
		});

		// Clean up on disconnect
		socket.on('disconnect', function() {
			// Get current rooms of user
			var rooms = socket.rooms;
			});

	// New message sent to group
	socket.on('enviar', function(data)
		{
		var message = {'room':data.room, 'username':socket.session.userName, 'msg':data.msg, 'date':new Date()};
		io.emit('messageNew', message);
		});
	});