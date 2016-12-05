var express = require('express')
var mongoose = require('mongoose');


var app = express()

app.use(express.static('client'))
app.use('/lib', express.static('node_modules'))

app.listen(3000, function () {
  console.log('ETH DApps listening on port 3000!')
})


mongoose.connect('mongodb://localhost/ethdapps');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected to Mongo!');
});

