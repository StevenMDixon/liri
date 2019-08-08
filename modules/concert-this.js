// concert this
// https://rest.bandsintown.com/artists/ artist /events?app_id=codingbootcamp
const axios = require("axios");
const moment = require("moment");
const {logger} = require("./logger");

exports.concertThis = (args) =>{
  let artist = args.slice(1).join(" ");
  return axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`).then(res => {
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
    logger(data, "./logs/concert.log")
  }).catch(err => console.log(err))
}