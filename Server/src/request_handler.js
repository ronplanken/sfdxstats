const Server = require('./server.js');
const uuid = require('uuid/v4');
const sfdx = require('sfdx-node');
const _ = require('lodash');

var RequestHandler = {
  handle: function(server, connection, message){
	
    if (!message.request)
      return;

    var client;
    for (var clientId in Server.clients){
      if (Server.clients[clientId].connection === connection){
        client = Server.clients[clientId];
        break;
      }
    }
    console.log(message);
    switch(message.request){
      case "newClient":
        client = Server.newClient(connection);
        console.log("Client connected: " + client.uuid);
        client.send(JSON.stringify({"command": "notify", "message": "Connected to server"}));
        break;
       case "getOrgs":
        if (client){
          console.log("Client requests Orgs: " + client.uuid);
          sfdx.org.list().then( function (orgs) { 
            _.forEach(orgs.nonScratchOrgs, function(org) {
              client.send(JSON.stringify({"command": "org", "org": org}));
            });
          });
        }        
        break;
      case "getApiLimit":
        if (client){
          console.log("Client requests ApiLimit: " + client.uuid + ' for username: ' + message.orgUsername);

          sfdx.limits.apiDisplay({ targetusername: message.orgUsername})
                      .then( function (limits) { 
                        client.send(JSON.stringify({"command": "orgLimit", "orgUsername": message.orgUsername, "limits": limits}));
                      });
        }        
        break;
      case "disconnect":
        if (client){
          console.log("Client disconnected: " + client.uuid);
          Server.removeClient(client);
        }
        break;
    }
  }

};


module.exports = RequestHandler;