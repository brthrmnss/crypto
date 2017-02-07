/**
 * Created by morriste on 1/13/2017.
 */

/*
 start server - specify file
 run server locally with commands
 end all command procsses
 expose json of inner array

 start from script
 start and ahve it keep running
 stop the script
 */

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var express = require('express')
var HoistServer = require('./HoistServer').HoistServer

function DLHoistServer() {

    var p = DLHoistServer.prototype;
    p = this;
    var self = this;
    self.data = {}

    self.data.filePathTestConfig =  __dirname+'/'+'testData/' + 'test_dl_manifest.json'

    var superInstance = new HoistServer(self)
    //DLHoistServer.prototype;
    p.init = function init(config) {
        config = sh.dv(config, {});
        config.port = sh.dv(config.port, 6012)
        config.portSocket = sh.dv(config.portSocket,  config.port+2);
        self.settings = config;

        sh.mkdirp(__dirname + '/configs')
        // sh.mkdirp(__dirname + '/configUploads')
        self.createHoistServer();

        self.startSocket();
    }

    p.createHoistServer2 = function createHoistServer2(config) {
      //  sdf.g
        self.app.get('/valid', function onReadFile (req, res) {
            var name = req.query.name;
            //var content = sh.readFile(dirSaves+name+'.html')
            res.send('connected');

        });


        self.app.get('/useConfig', function onUseConfig (req, res) {
            var taskName = req.query.taskName;
            var fileManifest = sh.fs.makePath(__dirname, 'manifests', taskName)
            self.proc('run config with', fileManifest);
            sh.fs.exists(fileManifest, 'manifest must exists')
            console.log('what', fileManifest);
            if ( sh.fs.notFound(fileManifest)  ) {
                res.send(sh.json.error('not found '+ taskName));
                return;
            }

            var dirDestination = sh.fs.makePath(__dirname, 'configs')
            var fileConfigCp = sh.fs.copy(fileManifest, dirDestination);

            var fileConfig = sh.getFileName(fileConfigCp)

            if ( req.query.run != 'false') {
                self.runFromConfigFile(fileConfig);
                res.send('run');
            }

            //var content = sh.readFile(dirSaves+name+'.html')
            res.send('moved');

        });


        self.fxFilterJSON = function onRemoveJSON(json) {
            delete json['instances']
            return json;
        }
    }

    function defineTestingMethods() {
        p.testLocally = function testLocally() {

            var i = self;
            var innerConfig = {};

            innerConfig.file = self.data.filePathTestConfig;
            i.run(innerConfig.file);


            setTimeout(function startFromScript() {
                // i.run(innerConfig);
                var fileConfig = self.data.filePathTestConfig;
                //i.runFromConfigFile(fileConfig, true , innerConfig);
                i.runFromConfigFile(fileConfig);
                // i.run(innerConfig);
            }, 2000);

            setTimeout(function startFromScript() {
                // i.run(innerConfig);
                sh.clearConsole();
                console.log('starting ')
                var fileConfig = self.data.filePathTestConfig;
                //i.runFromConfigFile(fileConfig, true , innerConfig);
                i.runFromConfigFile(fileConfig);
                // i.run(innerConfig);



            }, 2200);


            setTimeout(function logIt() {
                var output = i.getJSONPath('', true);
                console.log('1-attempt output', 'output', output);
                var output = i.getJSONPath('count', true);
                console.log('2', 'output', output);
            }, 4000)

        }

        p.testRemotely = function testRemotely() {

            var t = self.tests.t;
            var t2 = t.clone('test an example command');
            var urls = self.tests.urls;
            t2.getR(urls.test).with({text:'test', rate:20}).bodyHas('status').notEmpty();
            //t2.getR(urls.play).with({text:'play', rate:20}).bodyHas('status').notEmpty();

            t2.wait(1)

            t2.getR(urls.stop).with({text:'play', rate:20}).bodyHas('status').notEmpty();
            //t2.getR(urls.playCustom).with({file:'demoInnerScriptConfig7', rate:20}).bodyHas('error').notEmpty();
            //t2.getR(urls.playCustom).with({file:'demoInnerScriptConfig2'}).bodyHas('name').notEmpty();

            //t2.wait(1)


            var configName = self.tests.uploadTestConfig(t2, 'test_dl_manifest.json')


            self.tests.configFails(t2, configName)


        }
    }
    defineTestingMethods();

    function defineSocketMethods() {
        self.startSocket = function startSocket() {

            //  return
            console.error('startSocket ... no no n', self.settings.portSocket)
            var http = require('http').Server(self.app);
            var io = require('socket.io')(http);

            http.listen(self.settings.portSocket, function onSTarted() {
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

 //sdf.g
                
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
                if ( data.cmd == 'testit'){
                    self.cmds.sendStatus('test it ok '+sh.getTimeStamp())
                    //self.cmds.listids(data, fx)
                }
                if ( data.cmd == 'searchpb'){
                    self.cmds.searchPb(data, fx)
                }
                if ( data.cmd == 'getFileList'){
                    self.cmds.getFileList(data, fx)
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
                self.proc('output', msg);
                self.appSocket.emit('updateStatus', data);
            }

            p.cmds.getFileList = function getFileList(cmd, fx) {
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
    }
    defineSocketMethods();

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.DLHoistServer = DLHoistServer;


exports.RCExtV = 1;

exports.reloadServer = function reloadServer(oldServer, fxFin, count, dict) {

    console.log(sh.n, 'reloadServer2', count, oldServer!= null, sh.n)
    if ( oldServer) {
        //var yyy =  oldServer.active_server2.close()
      //  if ( oldServer.server && oldServer.server.close )
            var oldS = oldServer.active_server.close();
        ///console.log('output',null!=oldServer, yyy, oldS)
        setTimeout(function onReloadLater () {
            if ( dict.count != count ) {
                console.error('warn', 'bad count', count, '!=', dict.count)
                return;
            }
            console.log('\t','onReloadLater', count)
            exports.reloadServer(null, fxFin, count, dict);
        }, 1500);
        return;
    }
    //var t = new DLHoistServer()

    var instance = new DLHoistServer();
    var t = instance;

    var config = {};
    config.file = __dirname + '/RunBreed.js'
    config.fxClazz = 'startBreed'

    var innerConfig ={}
    innerConfig.file = instance.data.filePathTestConfig;
    config.innerConfig = innerConfig;

    console.error('-->reloading script', 'go', count)

    if ( oldServer && oldServer.lastConfig ) {
        config = oldServer.lastConfig;
    }
    DLHoistServer.oldServer = instance;

    instance.init(config)
    instance.lastConfig = config;

    //instance.testLocally()
    instance.testRemotely();
    /* return;

     instance.testLocally()
     instance.testRemotely();
     /!*var i = instance;
     i.testLocally()
     i.testRemotely();*!/
     */

    if ( fxFin ) {
        fxFin(t) }

    return t;
}
if (module.parent == null) {
    exports.reloadServer()

}



