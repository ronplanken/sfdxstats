const uuid = require('uuid/v4');
const _ = require('lodash');

function Client(connection) {
	this.uuid = String(uuid());
	this.connection = connection;
}

Client.prototype = {
	send: function(msg){
		this.connection.send(msg);
	}
};

var Server = {
	clients: {},

	newClient: function(connection){
		var newClient = new Client(connection);
		this.clients[newClient.uuid] = newClient;
		return newClient;
	},

	removeClient: function(client){
		delete this.clients[client.uuid];
	},

	findClient: function(clientId){
		return this.clients[clientId];
	}
};

module.exports = Server;