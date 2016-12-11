/**
 * Created by user1 on 12/4/2016.
 */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 3000;

// create the switchboard
var switchboard = require('rtc-switchboard')(server);

server.listen(port, function(err) {
    if (err) {
        return;
    }
    console.log('server listening on port: ' + port);
});
var sh = require('shelpers').shelpers;
console.log(__dirname)
var dirRTC = __dirname+'/../../'+'node_modules/'+ '/'+ 'rtc/dist/';
dirRTC = sh.fs.resolve(dirRTC)
if (  sh.fileExists(dirRTC) == false )
    sh.throw('could not find path to', dirRTC)
console.log(dirRTC)
app.use(express.static(__dirname+ '/'+ 'public_html'));
app.use(express.static(dirRTC));