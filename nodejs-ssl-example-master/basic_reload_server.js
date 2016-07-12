#!/usr/bin/env node
'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var port = process.argv[2] || 8043;
var insecurePort = process.argv[3] || 4080;
var fs = require('fs');
var path = require('path');
var checkip = require('check-ip-address');
var server;
var insecureServer;
var options;
var certsPath = path.join(__dirname, 'certs', 'server');
var caCertsPath = path.join(__dirname, 'certs', 'ca');


var app = express();
app.listen(insecurePort)
var publicDir = path.join(__dirname, 'public');



function ValidateOrgin(req, res, allowAnything ) {
  var origin = '';
  var headerOrigin = '';
  if ( req.header('origin') != null ) {
    headerOrigin = req.header('origin').toLowerCase()
  }

  //allow local requests through ;
  //allow anything
  if ( headerOrigin.indexOf('http://127.0.0.1')
      == 0 || allowAnything ) {
    origin =  req.header('origin');
  }
  if ( allowAnything ) {
    if ( origin == null ) {
      origin = req.header('origin');
    }
    if ( origin == null ) {
      origin = req.header('Origin');
    }
    // origin = 'dddd'
  }

  if ( origin != null ) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Origin", origin);
  }
  //res.header("xxxxxxxxxxxxx", origin);
  res.header("origin-loopback", req.header('origin'));
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers',
      'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log('...')
}






app.use(ValidateOrgin)
app.use(express.static(publicDir));

var http = require('http').Server(app);
//start socket
var io = require('socket.io')(http);



io.sockets.on('connection', function (socket) {
  console.log('new connnnn')
  //self.pSocket = socket;
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  /*socket.on('chat message', function (data) {
   console.log(data);
   });*/
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('window.invoke', function (x) {
    console.log('window invoke')
    socket.broadcast.emit('window.invoke', x);
  })
});

