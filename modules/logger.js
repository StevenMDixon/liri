const fs = require('fs');

exports.logger = (dataToLog, fileToLog)=>{
    // write log data to the specified log data
    fs.appendFile(fileToLog, JSON.stringify(dataToLog)+"\n", function (err) {
      if (err) console.log(err);
      else console.log('Saved!');
    })
}