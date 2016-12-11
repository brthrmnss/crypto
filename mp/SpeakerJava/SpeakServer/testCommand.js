
var socket = require('socket.io-client')('http://127.0.0.1:5558/');

socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});
socket.emit('my other event', __filename + ' is listening')
socket.on('cmdout', function(data){
    console.error('what is this', data)

});
var cmd = {};
cmd.cmd='say'
cmd.args = ['snark snark snark .... what is this? ']

cmd.cmd = 'node'
cmd.args =  [__dirname+'/'+ 'public_html/'+'testscript.js']
cd = __dirname+'l';

socket.emit('cmd', cmd)

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

