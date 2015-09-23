fsmonitor = require('fsmonitor');


var socket = require('socket.io-client')('https://local.helloworld3000.com:8043/');
socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});
socket.emit('window.invoke', 'quickreloadable.dir.html')

setTimeout(function () {
    process.exit()
    //socket.emit('invoke.window', 'what?...')
}, 500)