const sfdx = require('sfdx-node');
const _ = require('lodash');

sfdx.org.list().then(function(data){
  _.forEach(data.nonScratchOrgs, function(org){ 
    console.log(org.username);
  });  
});

let cardContainer = document.getElementById("orgCards");

let newOrgCard = function(title, url) {

	let divColContainer = document.createElement("div");
  divColContainer.className = "col s3 m3";

	let divCardContainer = document.createElement("div");
  divCardContainer.className = "card blue-grey darken-1";

  divColContainer.appendChild(divCardContainer);

	let divCardBody = document.createElement("div");
  divCardBody.className = "card-content white-text";

  divCardContainer.appendChild(divCardBody);

	let divRow = document.createElement("div");
  divRow.className = "row";

  divCardBody.appendChild(divRow);

  let divCardIcon = document.createElement("i");
  divCardIcon.className = "material-icons small col";
  divCardIcon.appendChild(document.createTextNode('cloud_circle'));

	let divCardTitle = document.createElement("span");
  divCardTitle.className = "card-title";
  divCardTitle.appendChild(document.createTextNode(title));

	let divCardText = document.createElement("p");
  divCardText.appendChild(document.createTextNode(url));

  divCardBody.appendChild(divCardText);

  divRow.appendChild(divCardIcon);
  divRow.appendChild(divCardTitle);

  return divColContainer;
};

cardContainer.appendChild(newOrgCard('Test', 'Test 2'));