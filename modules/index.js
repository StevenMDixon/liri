// this file maps liri requests to the correct module to handle
const fs = require("fs");
const {movieThis} = require("./movie-this");
const {concertThis} = require("./concert-this");
const {spotifyThisSong} = require("./spotify-this-song");

let liri_settings = {}

exports.init = (settings) => {
  liri_settings = settings;
  return liri;
}

function liri(args){
    switch(args[0].toLowerCase()){
      case 'concert-this': concertThis(args); break;
      case 'spotify-this-song': spotifyThisSong(args, liri_settings); break;
      case 'movie-this': movieThis(args, liri_settings); break;
      case 'do-what-it-says': doWhat(args); break;
      default: console.log("Command not valid")
    }
}

function doWhat(args){
  fs.readFile('./random.txt', (err, data)=>{
    let command = data.toString().split(",");
    return liri(command);
  })
}


