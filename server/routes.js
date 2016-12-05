module.exports = function (app, express) {
  app.use(express.static('client'))
  app.use('/lib', express.static('node_modules'))

  app.get('/:test', function (req, res, next) {
    console.log(req.params.test);
    res.sendStatus(200);
  });

  app.post('/anothertest', function() {});
};