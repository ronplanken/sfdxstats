const _ = require('lodash');
const hb = require('handlebars');
var Server = require('./src/server.js');

hb.registerHelper("perc", function(min, max) {
  min = parseFloat(min);
  max = parseFloat(max);
      
  return Math.round((min / max) * 100);
});

let newOrgCard = function(title, url, id) {
  
  var cardTemplate = hb.compile(document.getElementById("card-template").innerHTML);

  var context = {"username": title, "url": url, "id": id};

  document.getElementById("orgCards").insertAdjacentHTML('beforeend', cardTemplate(context));

  document.getElementById(id).addEventListener("click", function() { Server.requestApiLimit(title); } );
};

let newApiLimits = function(title, limits) {
  
  var apiTemplate = hb.compile(document.getElementById("api-template").innerHTML);

  var context = {"title": title, "limits": limits};

  document.getElementById("orgLimits").innerHTML = apiTemplate(context);
};

Server.addCard = newOrgCard;
Server.addLimits = newApiLimits;

Server.setup();

document.getElementById("getOrgs").addEventListener("click", function() { document.getElementById("orgCards").innterHTML = ""; Server.requestOrgs(); } );