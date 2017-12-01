/**
 * Created by user on 8/2/15.
 */

/**
 * This is a mini server, that allows users to
 * append to notes
 *
 * Expects everest to be running.
 */


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var express = require('express');
var config = global.config;

var express = require("express");
var app = express();
var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');

app.use(sh.allowWildcardRequests)
app.use(bodyParser());

var open = require('open')

var allowedOrigins = "http://localhost:* http://127.0.0.1:*";
allowedOrigins = "http://localhost:14002 http://127.0.0.1:14002";
var path ='/stomp'; // you need this if you want to connect to something other than the default socket.io path
/*

var sio_server = io(server, {
    origins: allowedOrigins,
*/

var http = require('http').Server(app);
var io = require('socket.io')(http, {origins: allowedOrigins}
);

//io.use(sh.allowWildcardRequests)

//var server = require('http').Server(app);
//var io = require('socket.io')(server);


/**
 * Created by user on 7/30/15.
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var EasyRemoteTester = shelpers.EasyRemoteTester;

var utils = {};
utils.replaceNewline = function (txt) {
    var txt2 = txt.replace(/(\r\n|\n|\r)/gm, '<br clear="none" />');
    return txt2;
}


function BrowserEvalServer() {
    var p = BrowserEvalServer.prototype;
    p = this;
    var self = this;
    var port = 14001
    //specify url of everest folder
    var baseUrl = 'http://127.0.0.1:'+port

    //create urls
    var t = EasyRemoteTester.create('Test evenote basics',{})
    t.settings.baseUrl = baseUrl
    var urls = {};
    urls.notes = {};
    urls.reload = t.utils.createTestingUrl('reload')
    urls.getFile = t.utils.createTestingUrl('getFile')
    urls.notes.update = t.utils.createTestingUrl('notes')
    urls.notes.get = t.utils.createTestingUrl('notes')

    /**
     * Setup middleware and routes
     * @param url
     * @param appCode
     */
    p.start = function start(url, appCode) {
        //Add middleware for cross domains
       /* app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });*/



      //  asfd.g
        // app.post('/append_named',   self.appendNoteNamed);
        self.setupSession();


        http.listen(14002, function onStarted() {
            console.log('started')
        })



       // console.log('hhh', http.use, io, server)
       // sh.exit()

        // open('http://localhost:5557')
        // http://localhost:5557/index.html
        var server = app.listen(port);
        // var io = require('socket.io').listen(server, { log: true });

        self.proc('starting here', __dirname);

        var f = sh.fileExists(__dirname + '/public_html')
        //console.error('sasdf', f)
        //return;
        app.use(express.static(__dirname + '/public_html'));
        app.use(express.static(__dirname + '/testFiles'));
        var path = __dirname + '/../node_modules/shelpers/lib';
        app.use(express.static(path));
        //app.use(express.static(_fo_dirname ) );// + '/public_html'))
        self.appSocket = io
        io.sockets.on('connection', function (socket) {
            console.log('new connnnn')
            self.pSocket = socket;
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


            socket.on('window.invoke.loopback', function (x) {
                console.log('window invoke loopback', x)
                setTimeout(function load() {
                    socket.emit('window.invoke', x);
                },500)
                /*setTimeout(function load() {
                    socket.broadcast.emit('window.invoke', x);
                },3000)
                setTimeout(function load() {
                    socket.emit('window.invoke', x);
                },5000)*/
            })

            socket.on('window.invoke', function (x) {
                console.log('window invoke', sh.t, sh.t, x)
                socket.broadcast.emit('window.invoke', x);
            })

            var msgWindowEval = 'window.eval'
            socket.on(msgWindowEval, function (x) {
                console.log(msgWindowEval, sh.t, sh.t, x)
                socket.broadcast.emit(msgWindowEval, x);
            })
            var msgWindowEvalResult = 'window.eval.result'
            socket.on(msgWindowEvalResult, function (x) {
                console.log(msgWindowEvalResult, sh.t, sh.t, x)
                socket.broadcast.emit(msgWindowEvalResult, x);
            })
        });

        self.server = app;
        self.newRoutes();
    }

    self.newRoutes = function newroutes() {
        //asdf.g.d.d

        app.get('/socket.io.js', function (req, res) {
            var fileSocket = __dirname + '/' + 'public_html/'+'socket.io-1.2.0.js.ignore'
            res.sendfile( fileSocket );
        });


        //http://127.0.0.1:14002/socket.io-1.2.0.js.ignore
        app.get('/socket.io-1.2.0.js', function (req, res) {
            var fileSocket = __dirname + '/' + 'public_html/'+'socket.io-1.2.0.js.ignore'
            res.sendfile( fileSocket );
        });
        

        self.server.get('/getFile', function (req, res) {
            var fileName = req.query.file;
            console.log(req.query.file, 'file....')

         //   process.exit()
            function LoadFile () {
                var self = this;
                var p = this;
                p.init = function init() {

                };

                p.loadTestFile = function loadTestFile(file) {
                    var contents = sh.readFile(__dirname+'/'+'testFiles/'+file)
                    var addTo = []
                    var config = {}
                    config.ignore = ['data: WARNING: Skip: ',
                        'WARNING: Skipping FS',
                        'data: ERROR: Can',
                        'child process '
                    ]
                    config.ignoreComments = true;
                    config.fxProc = function parseCmd(item){
                        var fields = item.split(',')
                        var fixed = [];
                        sh.each(fields, function x(i,f){
                            f=f.trim()
                            fixed.push(f);
                        });
                        fields = fixed;

                        function CmdConvertor() {
                            var self = this;
                            var p = this;
                            p.init = function init(d) {
                                self.output = {};
                                self.output.orig  =d;
                                var firstField = d[0];
                                var second = d[1];

                                var helper = {};

                                helper.typeIs = function isType(type) {
                                    type = type.toLowerCase();
                                    if ( type == firstField.toLowerCase())
                                        return true;
                                    return false;
                                };

                                helper.makeQuery = function makeQuery(asdf) {
                                    if ( asdf.indexOf(' ')==-1) {
                                        return '#'+asdf;
                                    }
                                    return asdf;
                                };

                                self.orig = d;

                                if ( helper.typeIs('click')) {
                                    var template = "$('#query').click();"
                                    var query = second;
                                    query = helper.makeQuery(query)
                                    template = template.replace('#query', query);
                                    self.output.eval = template;
                                }

                                return  self.output;
                            };
                        }


                        var y  = new CmdConvertor();

                        return y.init(fields)
                        return fixed;
                    }
                    var lines = sh.each.lines(contents, config)
                    self.lines = lines;
                    return lines;
                };
            }


            var l = new LoadFile();
            self.lines = l.loadTestFile(fileName);
            console.log('loaded', l.lines.length)
            //console.log(sh.toJSONString(l.lines));
            setTimeout(function () {
                self.sendNext();
            }, 400);
            //process.exit();
            res.json({status:'ok'});
        });


        self.server.get('/next', function (req, res) {
                var fileName = req.query.file;
                console.log( 'next', 'file....');
                setTimeout(function () {
                    self.sendNext();
                }, 400)
                res.end('ok');
            }
        )
    }

    self.sendNext = function sendNextCommand() {
        if ( self.lines.length == 0 ) {
            console.log('all work is done');
            return;
        }
        var cmd = self.lines.shift();
        if ( self.pSocket == null ) {
            self.proc('pSocket is null')
            return;
        }
        self.proc('sent')
        self.appSocket.emit('runcmd', cmd);
        self.appSocket.emit('chat message', "llllllllllllllllllllllll");
    }

    self.setupSession = function setupSession() {
        var t = EasyRemoteTester.create('Test evenote basics',{});
        var data = {};

        t.settings.baseUrl = baseUrl;


        t.xadd(function reload() {
                t.quickRequest( urls.reload,
                    'get', onResult )
                function onResult(body) {
                    // console.log('body', body)
                    t.assert(body.id>0, 'post-verify did not let me do a search');
                    t.cb();
                }
            }
        );

        t.add(function getFiles() {
               // return; // is this necessary? 11/23/2016?
                t.quickRequest( urls.getFile,
                    'get', onResult, {file:'a.txt'} )
                function onResult(body) {
                    // console.log('body', body)
                    t.assert(body.status=='ok', 'did not parse file');
                    t.cb();
                }
            }
        );
    }

    function defineRoutes() {
    }
    defineRoutes();

    p.test = function test() {}


    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments)
    }


}

exports.BrowserEvalServer = BrowserEvalServer;
exports.init = function initBES(){
    var e = new BrowserEvalServer()
    e.start();
    e.test();
}
if (module.parent == null) {
    var e = new BrowserEvalServer()
    e.start();



    e.test();

}

/*
 Command Runner

 Command
 name
 description
 getComponentFx
 actionFx
 timeout
 settings

 send command

 client side runner
 recieve command send it back
 check url to ask for new command (means start new one)

 server
 start, will send back first command
 --support multiple tests

 test parser
 \ - i do not want to write tests manually want high level code
 this is most useful but can be waste of time


 click
 goToUrl
 enter text
 buttonLike
 waitFor
 pause

 conditionals
 load test
 fill in vars
 getVal
 setVal

 dictionary
 storeComponent - i can perform action on component
 storeValueFromComponent


 */

