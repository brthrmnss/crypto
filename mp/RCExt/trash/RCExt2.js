/**
 * Created by yx41 on 1/3/14.
 * Encapsulates all loigc for remote server
 */
var sh = require('shelpers').shelpers;
var express = require('express');
var requireReload = require('require-reload')(require);
//var proxy = require('express-http-proxy-extended2');
var bodyParser = require('body-parser');


function TinyMCESaveServer() {
    var p = TinyMCESaveServer.prototype;
    p = this;
    var self = this;

    p.loadConfig = function loadConfig(config) {
        self.settings = config;
        config.port = sh.dv(config.port, 6008)
        config.port2 = config.port;
        config.port += 2; //express can use any available port, we will forward to it 
        self.runServer();
        self.startSocket();
    }

    self.runServer = function runServer() {
        var express = require('express')
        var app = express()
        self.app = app;

        app.use(function addCrossDomainMiddlware(req, res, next) {
            //asdf.g
            res.header("Access-Control-Allow-Origin", "*");
            if ( req.headers.origin != null ) {
                res.header("Access-Control-Allow-Origin", req.headers.origin);
            };
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            next();
        });

        var bodyParser  = require("body-parser");
        //var multer = require('multer');

        app.use(bodyParser.json({limit: '50mb'}));

        app.use(bodyParser.urlencoded({
            limit: '50mb',
            extended: true
        }));

        app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

        app.use(express.static('public_html'));

        /*return;
         var dirSaves = __dirname+'/'+'saves/';
         sh.mkdirp(dirSaves);
         sh.writeFile(dirSaves + 'test.html', 'Test content <br /> ok ok ok ?');
         */
        app.get('/readFile', function onReadFile (req, res) {
            var name = req.query.name;
            var content = sh.readFile(dirSaves+name+'.html')
            res.send(content);

        });

        app.post('/saveFile', function onSaveFile (req, res) {
            var body = req.body;
            var name = body.name;
            var contents = body.body;
            //var name = req.params.name;
            console.log(req.body)
            sh.writeFile(dirSaves+name+'.html', contents)

            res.send('Hello World!');
        });

        app.post('/listFiles', function onSaveFile (req, res) {

            var body = req.body;
            var name = body.name;
            var contents = body.body;
            //var name = req.params.name;
            console.log(req.body)
            sh.writeFile(dirSaves+name+'.html', contents)

            res.send('Hello World!');
        });




        app.listen(self.settings.port, function () {
            console.log('Listening on ' +  self.settings.port)
        });


    }

    self.startSocket = function startSocket() {
        var http = require('http').Server(self.app);
        var io = require('socket.io')(http);
        http.listen(self.settings.port2, function () {
            console.log('started')
            // console.log('go to ', baseUrl)
        })
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


            socket.on('runcmd', function onRunCmd(data){
                self.proc('what is command', sh.toJSONString(data) )

                self.asdf(data, function onFinished (a,b,c) {
                    var result = {}
                    result.a = a; result.b = b; result.c = c;
                    if ( data.noreturn != true  ) {
                        var str = data.cmd + '' + '_results'
                        console.log('str', str)
                        io.emit(str, result);
                    }
                })

                return
                if ( data.noreturn != true  ) {
                    var str = data.cmd + '' + '_results'
                    console.log('str', str)
                    io.emit(str, data);
                }
            });


            socket.on('window.invoke', function (x) {
                console.log('window invoke')
                socket.broadcast.emit('window.invoke', x);
            })

        });


    }

    var dirCrypto = __dirname + '/'+'../'+'../'

    function defineCMD() {  
        p.asdf = function asdf(data, fx) {
            if ( data.cmd == 'searchpb'){
                var dirScript = dirCrypto + '/ritv/distillerv3/utils/SearchPB.js'
                var SearchPB = require(dirScript).SearchPB


                var token = {}
                token.query = data.query;

                var options = {}
                sh.mergeObjects(token, options)
                options.query = token.query
                options.pbCategory = token.pbCategory;
                options.pbCategory2 = token.pbCategory2;
                options.showAllMatches = true

                if ( data.searchInCategory != null ) {
                    options.pbCategory = data.searchInCategory;
                }
                options.pbMinSeederCount = token.pbMinSeederCount;

                var go = new SearchPB()
                options.callback = function onDone(_urlTorrent, token){
                    token.urlTorrent = _urlTorrent;
                    self.proc('token.urlTorrent', token.query, _urlTorrent)
                    if ( token.testPbQuery ) {
                        token.fxCallback()
                        return;
                    }
                    var result = {}
                    result.title = token.title;
                    result.urlMagnet = token.urlMagnet;
                    fx(result, token.linkz);
                }
                options.fxBail = function bailX(msg) {

                    var bailOnQuery = false;
                    //TODO: if have to add a 3rd category, store searchInCategory in array
                    //and verify each attempt
                    //feature: bookmark.searchAgain without category restrictions
                    if ( token.pbCategory != null ) {
                        if ( token.pbCategory2 == null ) {
                            bailOnQuery = true
                        } else {
                            var haveSearchedCategory2 =  token.pbCategory2 == searchInCategory;
                            if ( haveSearchedCategory2 == true ) {
                                bailOnQuery = true
                            } else {
                                //retry
                                token.query = token.query.replace('720p', '')
                                self.searchByName(token, cb, token.pbCategory2)
                            }
                        }
                    } else {
                        bailOnQuery = true
                    }

                    if ( bailOnQuery  ) {
                        console.error('bailing bc', msg)
                        token.fxBail(msg)
                    }
                }
                go.go(options);
            }
            return;
        };
    }
    defineCMD()


    function defineUtils() {
        p.utils = {}
    }

    defineUtils();

    /**
     * Receive log commands in special format
     */
    p.proc = function proc() {
        sh.sLog(arguments)
    }
}

if (module.parent == null) {
    var t = new TinyMCESaveServer()
    var options = {}

    t.asdf({cmd:'searchpb', query:'epub'}, function onGotIt(a,b){
        console.log('output', a,b)
    })

    t.loadConfig(options);
    return;
}


