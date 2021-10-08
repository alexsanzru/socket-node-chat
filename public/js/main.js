// Events
$( document ).ready(function() {
	var socket = io.connect('http://localhost:8888', {transports: ['websocket', 'polling', 'flashsocket'], secure: false, reconnect: true});

	var debug = true;

	var room = 'MainRoom';
	var username = 'Anonymus';

    // Connection established
    socket.once('connected', function (data) {
		socket.emit('join', {'room':room, 'user_id':username, 'username': username, 'socket_id': socket.id});
	});

	//startgame();

    // Disconnected from server
    socket.on('disconnect', function (data) {
        var info = {'room':'MainRoom', 'username':'Chat Server', 'msg':'----- Lost connection to server -----'};
        addMessage(info);
    });

    // Reconnected to server
    socket.on('reconnect', function (data) {
        var info = {'room':'MainRoom', 'username':'Chat Server', 'msg':'----- Reconnected to server -----'};
        addMessage(info);
    });

	$('#b_send_message').click(function(eventObject) {
/*		
		//var data = {'username':'alex1', 'password':'1234', 'extra':''};
		var data = {'username':'alex1', 'password':'1234'};

		$.ajax({
			//url : 'http://localhost:3001/users/',
			url : 'http://localhost:3001/sessions/create',
			data : data,
			method : 'post', //en este caso
			dataType : 'json',
			success : function(response){
				alert(JSON.parse(response));
			},
			error: function(error){
				alert("No funciona");
			}
		});
*/
		eventObject.preventDefault();
		if ($('#message_text').val() != "") {
			socket.emit('enviar', {'room': room, 'msg':getMessageText(), 'username': username});
			$('#message_text').val('');
			return false;
		}
	});


	// Message received
	socket.on('messageNew', function (data) {
		alert('messageNew');
		console.log("messageNew: %s", JSON.stringify(data));
		addMessage(data);

		// Scroll down room messages
		//var room_messages = $('#room_messages');
		var room_messages = $('#mCSB_1_container');
		if (room_messages.length > 0){
			//room_messages[0].scrollTop = room_messages[0].scrollHeight;
			//alert($('#room_messages')[0].scrollHeight);
			var ch = $('#mCSB_1').innerHeight();
			var th = room_messages.innerHeight();
			if(th > ch)
				{
				room_messages.animate({ top: ch - th }, 500);
				setTimeout(function () {
					var sh = $('#mCSB_1_dragger_vertical').height();
					if(sh > 0){$('#mCSB_1_dragger_vertical').animate({ top: ch - sh }, 500);}
					}, 500);
				}
			}
	});

	// Get message text from input field
	var getMessageText = function() {
		var text = $('#message_text').val();
		$('#message_text').val("");
		return text;
	};


	// User joins room
	socket.on('userJoinsRoom', function(data) {
		console.log("userJoinsRoom: %s", JSON.stringify(data));
		// Log join in conversation
		addMessage(data);

		// Add user to connected users list
		addUser(data);
	});


	// ***************************************************************************
	// Templates and helpers
	// ***************************************************************************
	var templates = {};
	var getTemplate = function(path, callback) {
		var source;
		var template;

		// Check first if we've the template cached
		if (_.has(templates, path)) {
			if (callback) callback(templates[path]);
			// If not we get and compile it
		} else {
			$.ajax({
				url: path,
				success: function(data) {
					source = data;
					template = Handlebars.compile(source);//'' + source +''
					// Store compiled template in cache
					templates[path] = template;
					if (callback) callback(template);
				}
			});
		}
	}


	// Add message to room
	var addMessage = function(msg) {
		getTemplate('http://localhost:8888/templates/message.handlebars', function(template) {
			var room_messages = '#room_messages';
			if ($(room_messages).length > 0) {
				$(room_messages).append(template(msg));
			} else {
				var roomInterval = setInterval(function() {
					if ($(room_messages).length > 0) {
						$(room_messages).append(template(msg));
						clearInterval(roomInterval);
					}
				}, 100);
			}
		});
	};

	// Add user to connected users list
	var addUser = function(user) {
		getTemplate('http://localhost:8888/templates/user.handlebars', function(template) {
			var room_users = '#room_users';
			// Add only if it doesn't exist in the room
			var user_badge = '#'+user.id;
			if (!($(user_badge).length))
			{
				$(user_badge).remove()
				$(room_users).append(template(user));
			}
		});
	}
});

$(document).ready(function(){
    $('#action_menu_btn').click(function(){
	    $('.action_menu').toggle();
    });
});