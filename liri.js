require('dotenv').config();

const keys = require("./keys");

const settings = {
  spotify: keys.spotify,
  omdb: keys.omdb
}

const {init} = require("./modules/index");

function getArgs(){
  // get the arguments from the command line
  return process.argv.slice(2);
}

init(settings)(getArgs());