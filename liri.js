require('dotenv').config();
const keys = require("./keys");
const Spotify = require('node-spotify-api');
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
// create a new spotify app
const spotifyApp = new Spotify(keys.spotify);


const liriLogger = require('./logger');


function getArgs(){
  // get the arguments from the command line
  return process.argv.slice(2);
}

// concert this
// https://rest.bandsintown.com/artists/ artist /events?app_id=codingbootcamp
function concertThis(args){
  let artist = args.slice(1).join(" ");
  axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`).then(res => {
    let data = res.data.reduce((acc, cur)=>{
      let t = {
      artist,
      date: moment(cur.datetime).format("MM/DD/YYYY"),
      venue: cur.venue.name,
      location: `${cur.venue.city}, ${cur.venue.country}`,
      }
      acc.push(t);
      return acc;
    }, []);
    console.log(data)
  }).catch(err => console.log(err))
}

// spotify-this-song
function spotifyThisSong(args){
  const song = args.slice(1).join(" ") || "The Sign";
  spotifyApp.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    let songInfo = data.tracks.items.reduce((acc, cur)=>{
      acc.push({
        artist: cur.artists[0].name,
        song: cur.name,
        album: cur.album.name,
        preview: cur.preview_url,

      })
      return acc;
    }, [])
    return console.log(songInfo);
  });
}
// movie-this
function movieThis(args){
  const movie = args.slice(1).join(" ") || "Mr. Nobody";
  axios.get(`http://www.omdbapi.com/?apikey=${keys.omdb.key}&t=${movie}`).then(res =>{
    //console.log(res.data)
    console.log({
      Movie: res.data.Title,
      Year: res.data.Year,
      IMDB: res.data.imdbRating,
      RottenTomatoes: res.data.Ratings.filter(item => item.Source === "Rotten Tomatoes")[0].Value,
      Coutnry: res.data.Country,
      Language: res.data.Language,
      plot: res.data.Plot,
      Actors: res.data.Actors
    })
  }).catch(err => console.log(err));
}

// do-what-it-says
function doWhat(args){
  fs.readFile('./random.txt', (err, data)=>{
    let command = data.toString().split(",");
    return liri(command);
  })
}


function liri(args){
  switch(args[0].toLowerCase()){
    case 'concert-this': concertThis(args); break;
    case 'spotify-this-song': spotifyThisSong(args); break;
    case 'movie-this': movieThis(args); break;
    case 'do-what-it-says': doWhat(args); break;
    default: console.log("Command not valid")
  }
}

liri(getArgs());