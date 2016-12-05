var express = require('express')
var mongoose = require('mongoose');


var app = express()



require('./routes.js')(app, express);

app.listen(3000, function () {
  console.log('ETH DApps listening on port 3000!')
})


mongoose.connect('mongodb://localhost/ethdapps');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected to Mongo!');
});

