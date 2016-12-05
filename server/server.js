var express = require('express')
var app = express()

app.use(express.static('client'))
app.use('/lib', express.static('node_modules'))

app.listen(3000, function () {
  console.log('ETH DApps listening on port 3000!')
})