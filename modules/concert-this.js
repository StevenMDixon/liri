// concert this
// https://rest.bandsintown.com/artists/ artist /events?app_id=codingbootcamp
const axios = require("axios");
const moment = require("moment");
const {logger} = require("./logger");

exports.concertThis = (args) =>{
  // set artist to user input or use default if no user input provided
  let artist = args.slice(1).join(" ") || "billy idol";
  // use axios to get data on locations of artists next concerts
  return axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`).then(res => {
    // filter data returned based on fields needed
    let data = res.data.map(item=>{
      return {
      artist: item.artist,
      date: moment(item.datetime).format("MM/DD/YYYY"),
      venue: item.venue.name,
      location: `${item.venue.city}, ${item.venue.country}`,
      }
    });
    // write data to console.
    console.log(data)
    // log data to specified log file
    logger(data, "./logs/concert.log")
  }).catch(err => console.log(err))
}