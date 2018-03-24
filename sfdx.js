const sfdx = require('sfdx-node');
const _ = require('lodash');


sfdx.limits.apiDisplay({ targetusername: 'ron@dev.hr2d.com' }).then( function (orgs) { console.log(orgs); });