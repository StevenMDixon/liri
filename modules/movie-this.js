// movie-this
const axios = require("axios");
const {logger} = require("./logger");

exports.movieThis = (args, settings) => {
  const movie = args.slice(1).join(" ") || "Mr. Nobody";
  axios.get(`http://www.omdbapi.com/?apikey=${settings.omdb.key}&t=${movie}`).then(res =>{
    //console.log(res.data)
    const movieData = {
      Movie: res.data.Title,
      Year: res.data.Year,
      IMDB: res.data.imdbRating,
      RottenTomatoes: res.data.Ratings.filter(item => item.Source === "Rotten Tomatoes")[0].Value,
      Coutnry: res.data.Country,
      Language: res.data.Language,
      plot: res.data.Plot,
      Actors: res.data.Actors
    }
    console.log(movieData)
    logger(movieData, "./logs/movie.log");
  }).catch(err => console.log(err));
}