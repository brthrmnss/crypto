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
var EasyRemoteTester = shelpers.EasyRemoteTester;

var fileScript = sh.fs.join(__dirname,'supporting', 'TestRCScripts.js');
var RCScripts = require(fileScript).RCScripts;

//console.log('got a new one ..d..')
function RCConfigExecServer() {
    var p = RCConfigExecServer.prototype;
    p = this;
    var self = this;
    self.data = {}

    var indexPageSecurityEnding = '567.html'

    p.loadConfig = function loadConfig(config) {
        self.settings = config;
        config.port = sh.dv(config.port, 6008);
        self.proc('go to ', 'http://localhost:'+ config.port);
        self.proc('go to ', 'http://'+sh.getIpAddress()+':'+ config.port+'/'+'index.html'+indexPageSecurityEnding);
        
        config.port2 = config.port;
        config.port += 2; //express can use any available port, we will forward to it 
        self.runServer();
        self.startSocket();
        self.data.id = exports.RCExtV
        console.error('RCConfigExecServer', exports.RCExtV)
        //   asdf3g.f
        self.data.dirDlManifests = sh.fs.makePath(__dirname,  'manifests')
        self.data.dirFileList = sh.fs.join(__dirname, 'data', 'fileList')
    }

    self.runServer = function runServer() {
        var express = require('express')
        var app = express()
        self.app = app;

        app.use(sh.blockIndexPage(indexPageSecurityEnding, __dirname));

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


        app.get('/goToFile', function onReadFile (req, res) {
            var name = req.query.file;
            name = name.replace('/media/sf_Dropbox', 'G:/Dropbox/')
           console.log(name)
            var opened = false;
            if ( sh.fs.exists(name) ) {
                if ( sh.fs.isDir(name)) {
                    sh.run('start "" '+sh.qq(name))
                    opened  = true
                } else {
                    var dir = sh.fs.goUpOneDir(name)
                    sh.run('start "" '+sh.qq(name))
                    opened = true
                }
            }

            if ( opened == false ) {
                res.status(404)
                res.send('no found ' + name)
                return;
            }

            res.send('ok');

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

        sh.defineExitware(self.app)

        var JSONFileHelper = require('shelpers').JSONFileHelper;
        
        function defineResumeMethods() {

            //var j = new JSONFileHelper();

            var j = new JSONFileHelper();
            var config = {};
            config.file = __dirname + '/'+'recent_files.json';
            j.init(config);
            self.data.j = j;
            
            app.post('/saveFile', function onSaveFile (req, res) {
                var body = req.body;
                var name = body.name;
                var contents = body.body;
                //var name = req.params.name;
                console.log(req.body);
                var fileJSON = dirSaves+name+'.html';
                sh.writeFile(fileJSON, contents);


                var bookJSON = {
                    file:fileJSON,
                    name:name
                }
                self.data.j.addRecent(bookJSON, true, 'file');

                res.send('Hello World!');
            });

            app.get('/removeFile', function onRemoveFile (req, res) {
                var body = req.query;
                var name = body.name;
                var fileJSON = dirSaves+name+'.html';
                self.proc('removing', name)

                var bookJSON = {
                    file:fileJSON,
                    name:name
                }
                self.data.j.removeRecent(bookJSON, 'file');

                res.send('removed');
            });

            app.get('/listFiles', function onSaveFile (req, res) {

                var files = [];//self.utils.getfilesInDir();

                files = self.data.j.readFile();
                res.json(files)

                return;
                var body = req.body;
                var name = body.name;
                var contents = body.body;
                //var name = req.params.name;
                console.log(req.body)
                sh.writeFile(dirSaves+name+'.html', contents)

                res.send('Hello World!');
            });

        }
        defineResumeMethods();



        function defineVerifyStep() {
            //move to other server
            app.get('/getFiles', function onGetFiles (req, res) {
                //start here and move to socket in other server


                var dirs = []

                
                var dir3 = 
                
                sh.async(dirs, function onEachDir(dir,fx) {

                }, function onEachDirsDione(){
                    res.send('onGetFiles');
                })

                return
            });

            app.get('/listFiles', function onSaveFile (req, res) {
                var files = [];

                files = self.data.j.readFile();
                res.json(files)

                return;
                var body = req.body;
                var name = body.name;
                var contents = body.body;
                //var name = req.params.name;
                console.log(req.body)
                sh.writeFile(dirSaves+name+'.html', contents)

                res.send('Hello World!');
            });

        }
        defineVerifyStep();

        self.active_server = app.listen(self.settings.port, function () {
            console.log('Listening on ' +  self.settings.port)
        });

        return self.active_server;

    }


    self.startSocket = function startSocket() {
        //  return
        console.error('startSocket ... no no n')
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





            socket.on('getLocalFiles', function onGetLocalFiles(data){
                self.proc('what is command', data.cmd, sh.toJSONString(data) )

                 socket.emit('getLocalFiles_results', 'cool');

                return
            });




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
            if ( data.cmd == 'dlFileList'){
                self.cmds.dlFileList(data, fx)
            }
            if ( data.cmd == 'dlListTypeConfig'){
                self.cmds.dlListTypeConfig(data, fx)
            }
            if ( data.cmd == 'sanitizeFileList'){
                self.cmds.sanitizeFileList(data, fx)
            }
            if ( data.cmd == 'percentCompleteList'){
                self.cmds.percentCompleteList(data, fx)
            }
            if ( data.cmd == 'dlRemoteFileList'){
                self.cmds.dlRemoteFileList(data, fx)
            }
            return;
        };
    }
    defineCMD()


    function defineCmds() {
        p.cmds = {}
        p.cmds.sendStatus = function sendStatus(msg,type) {
            var data = {};
            data.msg = msg;
            data.type = type;
            self.appSocket.emit('updateStatus', data);
        }
        p.cmds.searchPb = function searchPb(data, fx) {
            var dirScript = dirCrypto + '/ritv/distillerv3/utils/SearchPB.js'
            var SearchPB = require(dirScript).SearchPB

            self.cmds.sendStatus('msg ... starting search')

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

                var fileConfig = sh.fs.makePath(__dirname,  'manifests', name);
                sh.fs.copy(file, fileConfig, true);
                self.proc('copy', file, 'to', fileConfig);

                var bookJSON = {
                    file:fileConfig,
                    created_at:new Date(),
                    name:name
                }
                self.data.j.addRecent(bookJSON, true, 'file');
                //self.data.j.addRecent(j)

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
                    ConvertXToIMDB_PB_List.downloadLists(fx.data.listIds, true, fx.data.taskName, onSavedFile);
                    return;
                }

                if (cmd.wrapType == 'imdbSearch') {
                    ConvertXToIMDB_PB_List.createIMDBList_fromSearch(cmd, true, fx.data.taskName, onSavedFile);
                    return;
                }


                // if (cmd.wrapType == 'lsList') {
                ConvertXToIMDB_PB_List.downloadLists(fx.data.listIds, true, fx.data.taskName, onSavedFile);

                function onSavedFile(file) {
                    console.log('finished with lax', file);
                    self.utils.storeConfig(fx.data.taskName, file);

                    self.cmds.sendStatus('file is ' + file)
                    self.cmds.sendStatus('finished making manifest')
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
                    ,   result = token.selectedLink;
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
        p.cmds.dlFileList = function dlFileList(cmd, fx) {


            console.log('.....!@ddddd9999#d$', exports.RCExtV, self.data.id)

            //dl file
            //put in fileOutput dir

            var t = EasyRemoteTester.create('Dl List',{});
            var data = {};
            var urls = {};
            urls.notes = {};
            urls.reload = t.utils.createTestingUrl('reload')
            urls.file = cmd.url;
           // t.settings.baseUrl = baseUrl;
            t.settings.silent = true;

            var fileFileList = cmd.url.split('/').slice(-1)[0];


            sh.mkdirp(self.data.dirFileList);
            fileFileList = sh.fs.join(self.data.dirFileList, fileFileList)

            t.add(function dlFile() {
                    t.quickRequest(  urls.file,
                        'get', onResult )
                    function onResult(body) {

                        self.proc('saving file to ', fileFileList)
                        sh.writeFile(fileFileList, body)

                        fx();
                        // console.log('body', body)
                       // t.assert(body.id>0, 'post-verify did not let me do a search');
                        t.cb();
                    }
                }
            );

        }

        p.cmds.dlListTypeConfig = function dlListTypeConfig(cmd, fx) {
            console.log('.....!@ddddd9999#d$', exports.RCExtV, self.data.id)

            //dl file
            //put in fileOutput dir

            var t = EasyRemoteTester.create('Dl List',{});
            var data = {};
            var urls = {};
            urls.notes = {};
            urls.reload = t.utils.createTestingUrl('reload')
            urls.file = cmd.url;
           // t.settings.baseUrl = baseUrl;
            t.settings.silent = true;

            var fileFileList = cmd.url.split('/').slice(-1)[0];


            sh.mkdirp(self.data.dirFileList);
            fileFileList = sh.fs.join(self.data.dirFileList, fileFileList)

            t.add(function dlFile() {
                    t.quickRequest(  urls.file,
                        'get', onResult )
                    function onResult(body) {

                        self.proc('saving file to ', fileFileList)
                        sh.writeFile(fileFileList, body)

                        fx();
                        // console.log('body', body)
                       // t.assert(body.id>0, 'post-verify did not let me do a search');
                        t.cb();
                    }
                }
            );

        }



    }
    defineCmds();


    function defineCrossCmds() {
        p.cmds.dlRemoteFileList = function dlRemoteFileList(cmd, fx) {
            console.log('.....!@ddddd9999#d$', exports.RCExtV, self.data.id)
            var fileScript = sh.fs.join(__dirname, 'supporting','WorkflowGetFilesFromRemoteMachine.js');
            var GetFileListFromRemote = require(fileScript).GetFileListFromRemote;

            // var dirFileLists = sh.fs.makePath(__dirname,  'data', 'files')

            var data = cmd;

            var fileDlManifest = sh.fs.join(self.data.dirDlManifests, cmd.fileManifest);
            var fileFileList = sh.fs.join(self.data.dirFileList,  cmd.fileFileList);

            //self.cmds.sendStatus('running dlRemoteFileList');
            var type = 'dlRemoteFileList'
            self.cmds.sendStatus('running dlRemoteFileList', type);

            var instance = new GetFileListFromRemote();
            var config = {};
            config.ip = '127.0.0.1'
            config.port = '6014'

            config.socket = self.data.socketBreed;
            config.ip = data.ip;
            config.port = data.port;
            //config.localTest = true
            config.fxDone = function fxDone(file) {
                //console.log('...', 'y')
                self.proc('sending a result back.....')
                // self.cmds.sendStatus('done dlRemoteFileList '+ file);

                if ( instance.data.socket && self.data.socketBreed == null ) {
                    self.data.socketBreed = instance.data.socket;

                }

                /// self.cmds.sendStatusType('dlRemoteFileList')
                self.cmds.sendStatus('done dlRemoteFileList '+ file,  type);
            }
            instance.init(config)

            return;

            RCScripts.verifyComplete(fileDlManifest, fileFileList, function onDone(output) {
                console.log('found how many?', output.foundCount);
                output.itemsValid = null;
                output.itemsFound = null;
                output.lines = output.lines.length
                sh.throwIf(output.foundCount != 2, 'did not match write count of items');
                fx(output);
            });


            return;
        }

        p.cmds.sanitizeFileList = function sanitizeFileList(cmd, fx) {
            console.log('.....!@ddddd9999#d$', exports.RCExtV, self.data.id)
            // var dirFileLists = sh.fs.makePath(__dirname,  'data', 'files')

            var fileDlManifest = sh.fs.join(self.data.dirDlManifests, cmd.fileManifest);
            var fileFileList = sh.fs.join(self.data.dirFileList,  cmd.fileFileList);

            self.cmds.sendStatus('running tool');

            var type = 'sanitizeFileList'
            self.cmds.sendStatus('running sanitizeFileList', type);


            RCScripts.checkPercentageCompleteDeep(fileDlManifest, fileFileList, function onDone(output) {
                console.log('found how many?', output.foundCount);
                output.itemsValid = null;
                output.itemsFound = null;
                output.lines = output.lines.length
                //sh.throwIf(output.foundCount != 2, 'did not match write count of items');
                fx(output);
                self.cmds.sendStatus('done with sanitizeFileList '+ output.foundCount, type);
            });

            return;
        }

        p.cmds.percentCompleteList = function percentCompleteList(cmd, fx) {
            console.log('.....!@ddddd9999#d$', exports.RCExtV, self.data.id)

            // var dirFileLists = sh.fs.makePath(__dirname,  'data', 'files')

            var fileDlManifest = sh.fs.join(self.data.dirDlManifests, cmd.fileManifest);
            var fileFileList = sh.fs.join(self.data.dirFileList,  cmd.fileFileList);

            self.cmds.sendStatus('running tool');
            var type = 'percentCompleteList'
            self.cmds.sendStatus('running percentCompleteList', type);

            RCScripts.verifyComplete(fileDlManifest, fileFileList, function onDone(output) {
                console.log('found how many?', output.foundCount);
                output.itemsValid = null;
                output.itemsFound = null;
                output.lines = output.lines.length
                // sh.throwIf(output.foundCount != 2, 'did not match write count of items');
                fx(output);
                self.cmds.sendStatus('done with  ' +
                    type + ' '+ output.foundCount, type);
            });

            return;
        }

    }
    defineCrossCmds()

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

    function runServer() {
       //  sh.get('127.0.0.1:6010/exitQuit')
         sh.get('127.0.0.1:6008/exitQuit')
        setTimeout(function startup() {
            if  (RCConfigExecServer.oldServer) {
                RCConfigExecServer.oldServer.active_server.close();
            }
            exports.reloadServer()
        },500)



   /*     setTimeout(function onReload() {
            exports.reloadServer(RCConfigExecServer.oldServer)
        }, 1500)*/
    }
    runServer()




    function testScript() {
        var fileScript = sh.fs.join(__dirname, 'TestRCScripts.js');
        var RCScripts = require(fileScript).RCScripts;

        var fileDlManifest = 'G:/Dropbox/projects/crypto/mp/RCExt/manifests/listIds_ls051393312.json'
        var fileFileList = 'G:/Dropbox/projects/crypto/mp/RCExt/data/fileList/desktop_f4o5qnc.list.files.txt'

        RCScripts.verifyComplete(fileDlManifest, fileFileList, function onDone(output) {
            console.log(output.percent)
            console.log('found how many?', output.foundCount);
            sh.throwIf(output.foundCount != 2, 'did not match write count of items');
        });
    }
  //  testScript()

}


