 /*
 call with name and path and ur good
  */

//var art = process.argv.slice(2);;
 art = 'lklsdf'
 var art = process.argv.slice(2)[0]
 if ( art == null ) {
     art = ''
 }
 console.log('not now', new Date(),  art)

 var sh = require('shelpers').shelpers;
 var shelpers = require('shelpers');

 var useSecureServer = false;
 if (useSecureServer) {
     //var socket = require('socket.io-client')('https://local.helloworld3000.com:8043/');
 } else {
     var socket = require('socket.io-client')('http://127.0.0.1:14002/');
 }
 socket.on('connect', function () {
     console.log('connected...')
     p.trigger(art);
 });
 socket.on('event', function (data) {
 });
 socket.on('disconnect', function () {
 });
 //socket.emit('my other event', __filename + ' is listening')

 //self.data.socket = socket;

var p = {};
 p.trigger = function trigger(file) {
     console.log('matched tr', file)
     var split = "\\GrammarHelperServer\\"
     if (file.indexOf(split) != -1) {
         fi = file.split(split)[1];
         file = '/g/' + fi
     } else {
         split = sh.fs.slash(split)
         if (file.includes(split)) {
             fi = file.split(split)[1];
             file = '/g/' + fi
         }
     }

     file = sh.replaceBackslash(file)

     socket.emit('window.invoke', file)
     setTimeout(function () {
         sh.exit()
     }, 250)

 }

