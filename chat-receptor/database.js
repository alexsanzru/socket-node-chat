var conf = {
	debug: true,
	dbPort: 6379,
	dbHost: 'chatredisdatabase',
	dbOptions: {},
	mainroom: 'MainRoom'
};

var http = require('http');
var io = require('socket.io')(http);
var redis = require('socket.io-redis');

io.adapter(redis({ host: conf.dbHost, port: conf.dbPort }));

var db = require('redis').createClient(conf.dbPort,conf.dbHost);

db.on('connect', function() {
	console.log('DB Redis connected');
});