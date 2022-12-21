import { server as WebSocketServer } from 'websocket';
import http from 'http';

export const startWSServer = ({ hdbCore, logger }, schema, table) => {
	const server = http.createServer(function (request, response) {
		console.log(new Date() + ' Received request for ' + request.url);
		response.writeHead(404);
		response.end();
	});
	server.listen(8080, function () {
		console.log(new Date() + ' Server is listening on port 8080');
	});

	const wsServer = new WebSocketServer({
		httpServer: server,
		autoAcceptConnections: false,
	});
	console.log('server running!');

	wsServer.on('request', (request) => {
		const connection = request.accept('echo-protocol', request.origin);
		console.log(new Date() + ' Connection accepted.');
		connection.on('message', (message) => {
			console.log('Received Message: ' + message.utf8Data);
			hdbCore.requestWithoutAuthentication({
				body: {
					operation: 'insert',
					schema,
					table,
					records: [{ message: message.utf8Data }],
				},
			});
		});
		connection.on('close', (reasonCode, description) => {
			console.log(new Date() + ' Peer ' + connection.remoteAddress + ' disconnected.');
		});
	});
};
