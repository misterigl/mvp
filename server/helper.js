var csvToArray = require("csv-to-array");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ethdapps');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('and we are connected to Mongo!');
});

var ethDappSchema = mongoose.Schema({
  Name: String,
  Description: String,
  Site: String,
  GitHub: String,
  Reddit: String,
  Developer: String,
  Tags: String,
  License: String,
  Platform: String,
  Status: String,
  'Last Update': String,
  'Contract Address': String
});

var EthDapp = mongoose.model('EthDapp', ethDappSchema);

// EthDapp.remove({}, function(err) { 
//      console.log('collection removed') 
//     });


function makeDBgreatAgain () {
  var columns = ['Name', 'Description', 'Site', 'GitHub', 'Reddit', 'Who?', 'Tags', 'License', 'Platform', 'Status', 'Last Update', 'Contract Address'];
  csvToArray({
     file: "./dapps.ethercasts.com.csv",
     columns: columns
  }, function (err, array) {
    // console.log(err || array);
    
    for (var i = 0; i < array.length; i++) {
      new EthDapp(array[i]).save(function (err, ethdapp) {
        if (err) return console.error(err);
        console.log(ethdapp.Name + ' created at ' + ethdapp['Last Update'])
      });
    }

  });
}

makeDBgreatAgain();
