import WebSocket from 'websocket';
const WebSocketClient = WebSocket.client;

var client = new WebSocketClient();

client.on('connectFailed', function (error) {
	console.log('Connect Error: ' + error.toString());
});

client.on('connect', function (connection) {
	console.log('WebSocket Client Connected');
	connection.on('error', function (error) {
		console.log('Connection Error: ' + error.toString());
	});
	connection.on('close', function () {
		console.log('echo-protocol Connection Closed');
	});
	connection.on('message', function (message) {
		if (message.type === 'utf8') {
			console.log("Received: '" + message.utf8Data + "'");
		}
	});

	if (connection.connected) {
		setTimeout(() => {
			var number = Math.round(Math.random() * 0xffffff);
			connection.sendUTF(number.toString());
		}, 1000);
	}
});

client.connect('ws://localhost:8080/', 'echo-protocol');
