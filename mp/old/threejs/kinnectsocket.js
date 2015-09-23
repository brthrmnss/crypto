//https://gist.github.com/dbainbridge/2424055
//
//
/**
 * Module dependencies.
 */

var express = require('express')
//, routes = require('./routes')
    , http = require('http');

var app = express();
var port = 3000
var win = true
if ( process.platform.indexOf('win') == -1  ) {

    win = false
}

if ( win == false ) {

    port = 3001
    var OpenNI = require('/mnt/hgfs/Dropbox/projects/linux/kinnect/node-openni');

    var context = OpenNI();

    //context.setJoints([ 'right_hand']);

    context.emit = function () {
        //console.log('emitted', arguments);
        console.log()
        console.log('out')
        console.log(JSON.stringify(arguments))
        addToCollection(arguments)
    }

    process.on('SIGINT', function () {
        context.close();
        process.exit();
    });


}
var server = app.listen(port);
var io = require('socket.io').listen(server, { log: false });

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.static(__dirname ))//+ '/public'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', function (r, re){
    r.send('d')
});



appSocket = null
io.sockets.on('connection', function (socket) {
    appSocket = socket;
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});


function createFakePositions () {
    if ( appSocket == null )
        return;
    var positions = [];
    var cubeLength = 10
    for (var i = 0; i < cubeLength; i++) {
        var position = {}
        var co = 10
        position.x = Math.random()*co
        position.y =  Math.random()*co
        position.z =  Math.random()*co
        positions.push(position)
    }
    console.log('positions', positions.length)
    // self.updateCubes(positions)
    appSocket.emit('news', { action:'runTest', data: positions });
}
//setInterval(createFakePositions, 1000/2)

var obj = {}
function addToCollection(event) {
    var name = event[0]
    if ( name == null ) {
        return;
    }
    var position = {}
    obj[name]=position
    position.x = event[2]
    position.y =  event[3]
    position.z =   event[4]
    position.name = name;
}
var sendCount=0
function sendCollection() {
    var positions = [];

    for (var prop in obj) {
        var position = obj[prop]
        positions.push(position)
    }

    console.log('positions', positions.length)

    sendCount++
    if ( sendCount % 10 == 0 ) {
        console.log(JSON.stringify(positions, "\\t") )
    }
    //obj = {}
    // self.updateCubes(positions)
    if ( appSocket == null )
        return;
    appSocket.emit('news', { action:'runTest', data: positions });

}
//setInterval(sendCollection, 1000/2)
setInterval(sendCollection, 100)

function sendEmit() {
    var event = {}
    event['0'] = Math.random().toFixed(1)
    event['2'] = 60
    event['1'] = 60
    event['4'] = 60
    addToCollection(event)

}
if ( win )
    setInterval(sendEmit, 1000/5)


//{"0":"right_knee","1":1,"2":-140.03134155273438,"3":-5.4804229736328125,"4":755.1737060546875,"5":0}



console.log("Express server listening on port 3000");