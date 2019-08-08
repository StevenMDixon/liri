const fs = require('fs');

exports.logger = (dataToLog, fileToLog)=>{
    console.log(dataToLog)
    fs.appendFile(fileToLog, JSON.stringify(dataToLog)+"\n", function (err) {
      if (err) console.log(err);
      else console.log('Saved!');
    })
}