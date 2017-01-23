/**
 * Created by yx41 on 1/3/14.
 * Encapsulates all loigc for remote server
 *
 * //http://localhost:6008/
 * //this and run db2host?
 */

var shelpers = require('shelpers');
var sh = require('shelpers').shelpers;

var PromiseHelperV3 = shelpers.PromiseHelperV3;

console.log('got a new one ..d..')
function RCConfigExecServer() {
    var p = RCConfigExecServer.prototype;
    p = this;
    var self = this;
    self.data = {}

    p.loadConfig = function loadConfig(config) {
        self.settings = config;
        config.port = sh.dv(config.port, 6008);
        self.proc('go to ', 'http://localhost:'+ config.port)
        config.port2 = config.port;
        config.port += 2; //express can use any available port, we will forward to it 
        self.runServer();
        self.startSocket();
        self.data.id = exports.RCExtV
        console.error('RCConfigExecServer', exports.RCExtV)
        //   asdf3g.f
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

        app.use(express.static(__dirname + '/'+'public_html'));

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




        self.active_server = app.listen(self.settings.port, function () {
            console.log('Listening on ' +  self.settings.port)
        });

        return self.active_server;

    }


    self.startSocket = function startSocket() {
        //  return
        console.error('cock block ... no no n')
        var http = require('http').Server(self.app);
        var io = require('socket.io')(http);
        http.listen(self.settings.port2, function onSTarted() {
            console.log('started port2', exports.RCExtV)
            self.active_server2 = this;
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
                self.proc('what is command', data.cmd, sh.toJSONString(data) )
//  self.proc('cmd no match', data)
                self.handleSocket(data, function onFinished (a,b,c) {
                    var result = {}
                    result.a = a; result.b = b; result.c = c;
                    if ( data.noreturn != true  ) {
                        var str = data.cmd + '' + '_results'
                        console.log('str', str)
                        io.emit(str, result);
                    };
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

        self.http = http;
    }


    var dirCrypto = __dirname + '/'+'../'+'../'

    function defineCMD() {
        p.handleSocket = function handleSocket(data, fx) {
            console.log(data.cmd, 'cmd')
            if ( data.cmd == 'searchpb'){
                self.cmds.searchPb(data, fx)
            }
            if ( data.cmd == 'listids'){
                self.cmds.listids(data, fx)
            }
            if ( data.cmd == 'makemani') {
                console.log('..dfsd.')
                var dirManifest = __dirname+'/'+'manifests/'
                sh.makePathIfDoesNotExist(dirManifest);

                sh.throwIfNull(data.title, 'need a title')

                if ( data.file) {

                }
                if ( data.tor ) {
                    var tors = [data.tor]
                }
                sh.writeJSONFile(dirManifest + data.title, tors)
                fx('ok')
            }

            return;
        };
    }
    defineCMD()


    function defineCmds() {
        p.cmds = {}
        p.cmds.sendStatus = function sendStatus(msg) {
            var data = {};
            data.msg = msg;
            self.appSocket.emit('updateStatus', data);
        }
        p.cmds.searchPb = function searchPb(cmd, fx) {
            var dirScript = dirCrypto + '/ritv/distillerv3/utils/SearchPB.js'
            var SearchPB = require(dirScript).SearchPB

            self.cmds.status('msg ... starting search')

            var token = {};
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
                //  result.title = token.title;
                //  result.urlMagnet = token.urlMagnet;
                result = token.selectedLink;
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
                    //  token.fxBail(msg)
                    fx(null, msg);
                }
            }
            go.go(options);
        }

        console.log('...sdfxsdf......')
        p.cmds.listids = function listids(cmd, fx) {


            console.log('.....!@ddddd9999#d$', exports.RCExtV, self.data.id)
            var fxHelper = {}
            var fH = fxHelper;
            fH.startCmd_Dl = function startCmd_Dl(token, cb) {
                self.proc('startCmd_Dl');

                console.log('cmd', cmd)

                var listIds = sh.splitStrIntoArray(cmd.listIds)
                fx.data = {};
                fx.data.listIds = listIds;

                fx.data.taskName = cmd.taskName;
                if ( fx.data.taskName == null ) {
                    fx.data.taskName = listIds[0]+listIds.length+'_more_'+sh.getTimeStamp();
                }
                console.log(sh.n)
                console.log('list', fx.data);
                console.log(sh.n)
                //display info

 
                cb();
            }

            self.utils.storeConfig = function storeConfig(name, file) {
                //var fileConfig = sh.fs.makePath(__dirname, /*'../',*/ 'configs', name+'')
               // sh.fs.copy(file, fileConfig, true)

                var fileConfig = sh.fs.makePath(__dirname,  'manifests', name)
                sh.fs.copy(file, fileConfig, true)
                self.proc('copy', file, 'to', fileConfig)
            }


            var dirScript = 'G:/Dropbox/projects/crypto/ritv/imdb_movie_scraper/'+
                'wrappers/imdb_app_v3_wrapper.js'
            var ConvertXToIMDB_PB_List = require(dirScript).ConvertXToIMDB_PB_List
            
            fH.dlLists = function dlLists(token, cb) {
                self.proc('dlLists');

               // return;
                if (cmd.wrapType == 'ttIds') {
                    ConvertXToIMDB_PB_List.downloadIds(fx.data.listIds, true, fx.data.taskName, onSavedFile);
                    return;

                }
                if (cmd.wrapType == 'idList') {
                    ConvertXToIMDB_PB_List.downloadIdList(fx.data.listIds, true, fx.data.taskName, onSavedFile);
                    return;
                }
                
                
                
                // if (cmd.wrapType == 'lsList') {
                ConvertXToIMDB_PB_List.downloadLists(fx.data.listIds, true, fx.data.taskName, onSavedFile);

                function onSavedFile(file) {
                    console.log('finished with lax', file);
                    self.utils.storeConfig(fx.data.taskName, file);
                    cb();
                }

                //dl list

            }
            fH.storeInFile = function storeInFile(token, cb) {
                self.proc('storeInFile')
                fx(fx.data.taskName, 'size');
                //create manifest and return manifest name
                cb();
            }


            var token = {}

            var work = new PromiseHelperV3();
            token.silentToken = true
            work.wait = token.simulate == false;
            work.startChain(token)
                .add(fH.startCmd_Dl)
                .add(fH.dlLists)
                .add(fH.storeInFile)
                //.log()
                .end();
            self.cmds.sendStatus('msg ... starting search')
            
            return;



            var dirScript = dirCrypto + '/ritv/distillerv3/utils/SearchPB.js'
            var SearchPB = require(dirScript).SearchPB

         

            var token = {};
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
                //  result.title = token.title;
                //  result.urlMagnet = token.urlMagnet;
                result = token.selectedLink;
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
                    //  token.fxBail(msg)
                    fx(null, msg);
                }
            }
            go.go(options);
        }
    }
    defineCmds();


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

exports.RCExtV = 1;
exports.RCConfigExecServer = RCConfigExecServer;
exports.reloadServer = function reloadServer(oldServer, fxFin, count, dict, classFx) {


    console.log(sh.n, 'reloadServer', count, oldServer!= null, sh.n)
    exports.RCExtV = count
    if ( oldServer) {
        //  asdf.g
        var yyy =  oldServer.active_server2.close()
        var oldS = oldServer.active_server.close();

        //return;
        ///console.log('output',null!=oldServer, yyy, oldS)
        setTimeout(function onReloadLater () {
            if ( dict && dict.count != count ) {
                console.error('warn', 'bad count', count, '!=', dict.count)
                return;
            }
            console.log('\t','onReloadLater', count)
            exports.reloadServer(null, fxFin, count, dict, classFx);
        }, 1500);
        return;
    }
    if ( classFx == null )
        var t = new RCConfigExecServer()
    else
        t = new classFx.RCConfigExecServer(); //maybe ned to get reloaded version not orignal versoin?

    console.error('-->reloading script', 'go', count)

    var options = {}
    if ( oldServer && oldServer.oldOptions ) {
        options = oldServer.oldOptions;
    }

    /*  t.handleSocket({cmd:'searchpb', query:'epub'}, function onGotIt(a,b){
     console.log('output', a,b)
     })*/

    t.loadConfig(options);

    RCConfigExecServer.oldServer = t;

    if ( fxFin )
        fxFin(t)


    return t;
}
if (module.parent == null) {
    exports.reloadServer()


    setTimeout(function onReload() {
        exports.reloadServer(RCConfigExecServer.oldServer)
    }, 2500)

}


