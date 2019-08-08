// movie-this
const axios = require("axios");
const {logger} = require("./logger");

exports.movieThis = (args, settings) => {
  // set movie to the user input, if there is no user input use default
  const movie = args.slice(1).join(" ") || "Mr. Nobody";
  // use axios to request info on the movie
  axios.get(`http://www.omdbapi.com/?apikey=${settings.omdb.key}&t=${movie}`).then(res =>{
    // filter data from returned request 
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
    // display filtered data
    console.log(movieData)
    // use logger to write data to the log file
    logger(movieData, "./logs/movie.log");
  }).catch(err => console.log(err));
}