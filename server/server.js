var express = require('express')
var mongoose = require('mongoose');
var Twitter = require('twitter');
var keys = require('./keys.js');

// DB setup

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
  'License Platform': String,
  Status: String,
  'Last Update': String,
  'Contract Address': String
});

var EthDapp = mongoose.model('EthDapp', ethDappSchema);

// Server setup 

var app = express()

app.use(express.static('client'))
app.use('/lib', express.static('node_modules'))

//routes

app.get('/ethdapps', function (req, res) {
  if (req.query.searchQuery === 'all') {
    EthDapp.find(function (err, dappList) {
      res.send(dappList);
    });
  } else {
    EthDapp.find({ Description: {$regex: req.query.searchQuery, $options: 'g'}}, function(err, dappList) {
      res.send(dappList);
    });
  }
});

app.get('/gettweets', function (req, res) {
  new Twitter(keys.twitter).get('search/tweets', {q: req.query.searchQuery}, function(err, tweets, response) {
    (tweets.statuses && tweets.statuses.length) ? res.send(tweets.statuses) : res.send([{user: {name: 'no tweets found :('}}])
  });
});

// app.get('/:test', function (req, res, next) {
//   console.log(req.params.test);
//   res.sendStatus(200);
// });
// app.post('/anothertest', function() {});

app.listen(3000, function () {
  console.log('ETH Dapps listening on port 3000')
})
