//requires
const WebSocketServer = require('ws').Server;
const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

//include local files
var RequestHandler = require('./src/request_handler.js');
var Server = require('./src/server.js');

//const variables
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, '/public/');

global.appRoot = path.resolve(__dirname);

//start Express webserver
const server = express()
  .use(express.static('public'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


global.appRoot = path.resolve(__dirname);

const wss = new SocketServer({ server });
wss.on('connection', (ws) => {
  RequestHandler.handle(Server, ws, {"request": "newClient"});
	
  ws.on('message', function incoming(message) {
    var json = JSON.parse(message);
    RequestHandler.handle(Server, ws, json);
  });
  ws.on('close', function(){
    RequestHandler.handle(Server, ws, {"request": "disconnect"});
  });
});
