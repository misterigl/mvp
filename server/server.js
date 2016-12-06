var express = require('express')
var mongoose = require('mongoose');

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

app.get('/:test', function (req, res, next) {
  console.log(req.params.test);
  res.sendStatus(200);
});
app.post('/anothertest', function() {});

app.listen(3000, function () {
  console.log('ETH Dapps listening on port 3000')
})
