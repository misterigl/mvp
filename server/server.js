var express = require('express')
var mongoose = require('mongoose');
var EthDappsData = require('./ethDappsData.js');

// DB setup

mongoose.connect('mongodb://localhost/ethdapps');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('and we are connected to Mongo!');
});

var ethDappSchema = mongoose.Schema({
    name: String,
    developer: String,
    contact: {
      website: String,
      twitter: String
    },
    description: String,
    updated: { type: Date, default: Date.now }
});

var EthDapp = mongoose.model('EthDapp', ethDappSchema);

// cleaning and populating the database with example data

EthDapp.remove({}, function(err) { 
   console.log('collection removed') 
});

for (var i = 0; i < EthDappsData.example.length; i++) {
  new EthDapp(EthDappsData.example[i]).save(function (err, ethdapp) {
    if (err) return console.error(err);
    console.log(ethdapp.name + ' created at ' + ethdapp.updated)
  });
}

// Server setup 

var app = express()

app.use(express.static('client'))
app.use('/lib', express.static('node_modules'))

app.get('/ethdapps', function (req, res) {
  EthDapp.find({ description: {$regex: req.query.searchQuery, $options: 'g'}}, function(err, data) {
    console.log(data);
    res.send(200);
  });
});

app.get('/:test', function (req, res, next) {
  console.log(req.params.test);
  res.sendStatus(200);
});
app.post('/anothertest', function() {});

app.listen(3000, function () {
  console.log('ETH Dapps listening on port 3000')
})
