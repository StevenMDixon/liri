require('dotenv').config();
const keys = require("./keys");

// retreive omdb and spotify keys from .env file
const settings = keys;

// retrieve the liri intitialization app
const {init} = require("./modules/index");

// pass settings and args from the command line to liri
init(settings)(getArgs());

function getArgs(){
  // get the arguments from the command line
  return process.argv.slice(2);
}