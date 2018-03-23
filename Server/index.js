const express = require('express');
const PORT = process.env.PORT || 3000;

const path = require('path');
const INDEX = path.join(__dirname, '/public/');

global.appRoot = path.resolve(__dirname);

const server = express()
  .use(express.static('public'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
