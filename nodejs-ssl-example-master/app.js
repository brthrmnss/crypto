'use strict';

var express = require('express')
    ;

module.exports.create = function (server, host, port, publicDir) {
  var app = express()
      ;
  app.use(function(req, res, next) {
    var origin = '*'
    if (  req.header('origin') != null  ) {
      origin =  req.header('origin');
    }
    res.header("Access-Control-Allow-Origin",  origin);
    res.header("Access-Control-Allow-Credentials",  'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(express.static(publicDir));
  var xy = __dirname+'/../browser-eval/public_html'
  console.log(xy)
  app.use(express.static(xy));

  app.get('/say', function (req, res) {


    var baseUrl = 'http://127.0.0.1:4444'
    var t = EasyRemoteTester.create('Test say basics',{showBody:false});
    t.settings.baseUrl = baseUrl
    var urls = {};
    urls.notes = {};
    urls.say = t.utils.createTestingUrl('say')
    var t2 = t.clone('test a few voices notes');
    t2.getR(urls.say).with(req.query)
        .bodyHas('status').notEmpty()
        .addFx(function (data) {
      res.json(data)
    })


  })
  return app;
};
