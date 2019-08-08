// this file maps liri requests to the correct module to handle
const fs = require("fs");
const { movieThis } = require("./movie-this");
const { concertThis } = require("./concert-this");
const { spotifyThisSong } = require("./spotify-this-song");

// key for api requests
let liri_settings = {};

// export a initilization functions
exports.init = settings => {
  // set keys as settings
  liri_settings = settings;
  // return the new liri app
  return liri;
};

// main application
function liri(args) {
  // call appropriate function based on user input
  switch (args[0].toLowerCase()) {
    case "concert-this":
      concertThis(args);
      break;
    case "spotify-this-song":
      spotifyThisSong(args, liri_settings);
      break;
    case "movie-this":
      movieThis(args, liri_settings);
      break;
    case "do-what-it-says":
      doWhat(args);
      break;
    default:
      console.log("Command not valid");
  }
}

// do what reruns liri with the data retreived from the random file
function doWhat(args) {
  fs.readFile("./random.txt", (err, data) => {
    // check for an error
    if (err) {
      console.log("there was an error:", err);
    } else {
      let command = data.toString().split(",");
      return liri(command);
    }
  });
}
