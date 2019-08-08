const Spotify = require('node-spotify-api');
const {logger} = require("./logger");

exports.spotifyThisSong = (args, settings) =>{
  // create a new spotify app from spotify api
  const spotifyApp = new Spotify(settings.spotify);
  // set song to user input or defualt if not specified
  const song = args.slice(1).join(" ") || "The Sign";
  // use the spotify app created earlier to query the spotify api
  spotifyApp.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      // handle error
      console.log('Error occurred: ' + err);
    }else{
      // filter keys in response to create item to be displayed in console.
      let songInfo = data.tracks.items.map(item =>{
        return {
          artist: item.artists[0].name,
          song: item.name,
          album: item.album.name,
          preview: item.preview_url
        }
      })
      // write data to console
      console.log(songInfo);
      // log data to specified log file
      logger(songInfo, './logs/spotify.log')
    }
  });
}