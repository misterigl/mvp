var express = require('express')
var mongoose = require('mongoose');
var EthDappsData = require('./ethDappsData.js');


var app = express()

//routes and middleware

app.use(express.static('client'))
app.use('/lib', express.static('node_modules'))

app.get('/ethdapps', function (req, res) {
  console.log(req.query.searchQuery);
  res.send(200);
});

app.get('/:test', function (req, res, next) {
  console.log(req.params.test);
  res.sendStatus(200);
});
app.post('/anothertest', function() {});

// DB setup

mongoose.connect('mongodb://localhost/ethdapps');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected to Mongo!');
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

for (var i = 0; i < EthDappsData.example.length; i++) {
  new EthDapp(EthDappsData.example[i]).save(function (err, ethdapp) {
    if (err) return console.error(err);
    console.log(ethdapp.name + ' created at ' + ethdapp.updated)
  });
}

//start server

app.listen(3000, function () {
  console.log('ETH Dapps listening on port 3000!')
})
