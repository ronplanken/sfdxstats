let Config = require('../config.js');
var host = location.origin.replace(/^http/, 'ws');

let Server = {
	socket: undefined,
  connected: false,
	
	setup: function(){
		this.socket = new WebSocket(host);
		this.socket.onopen = this.onopen.bind(this);
		this.socket.onmessage = this.onmessage.bind(this);
		this.socket.onclose = this.onclose.bind(this);
		this.socket.onerror = this.onerror.bind(this);
	},

	handleCommand: function(request, data){
    console.log(request);
    console.log(data);
		switch(request){
      case "notify":
        M.toast({"html": data.message}, 4000);
        break;
      case "org":
        this.addCard(data.org.username, data.org.instanceUrl, data.org.orgId);
        M.toast({"html": "Org added"}, 4000);
        break;
      case "orgLimit":
        this.addLimits(data.orgUsername, data.limits);
        M.toast({"html": "Limits loaded"}, 4000);
        break;
		}
	},

	requestOrgs: function(){
		if (this.connected){
      console.log('Requesting Orgs');
			let message = {"request": "getOrgs"};
			this.socket.send(JSON.stringify(message));
		}
	},

	requestApiLimit: function(username){
		if (this.connected){
      console.log('Requesting Api Limit for orgUsername: ' + username);
			let message = {"request": "getApiLimit", "orgUsername": username };
			this.socket.send(JSON.stringify(message));
		}
	},

	tryToReconnect: function(){
		setTimeout(this.setup.bind(this), 3000);
	},
	
	onopen: function(event){
		this.connected = true;
	},
	
	onmessage: function(event){
		let data = JSON.parse(event.data);
		this.handleCommand(data.command, data);
	},
	
	onclose: function(event){
		this.closeConnection();
	},
	
	onerror: function(event){
		console.log("error", event);
	},
	
	closeConnection: function(event){
		console.log("closed");
		this.connected = false;
		this.socket = undefined;
		this.tryToReconnect();
	},

};

module.exports = Server;