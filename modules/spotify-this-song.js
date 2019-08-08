// create a new spotify app
const Spotify = require('node-spotify-api');
const {logger} = require("./logger");

exports.spotifyThisSong = (args, settings) =>{
  const spotifyApp = new Spotify(settings.spotify);
  const song = args.slice(1).join(" ") || "The Sign";
  spotifyApp.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
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
    console.log(songInfo);
    logger(songInfo, './logs/spotify.log')
  });
}