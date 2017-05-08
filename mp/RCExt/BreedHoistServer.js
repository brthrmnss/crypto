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
var RC_HelperFxs = require('./supporting/TestRCScripts.js').RC_HelperFxs
var Workflow_ImportVidsAgain = require('./supporting/Workflow_ImportVidsAgain.js').Workflow_ImportVidsAgain


function DLHoistServer() {
 
    var p = DLHoistServer.prototype;
    p = this;
    var self = this;
    self.data = {}

    self.data.filePathTestConfig =  __dirname+'/'+'testData/' + 'test_dl_manifest.json'

  //  console.error(self.data.filePathTestConfig)
    //sh.exit(self.data.filePathTestConfig)

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
        self.app.use(express.static(
            sh.fs.join(__dirname,'outputFileLists')));
        self.startSocket();
    }

    p.createHoistServer2 = function createHoistServer2(config) {
        //  sdf.g
        self.app.get('/valid', function onReadFile (req, res) {
            var name = req.query.name;
            //var content = sh.readFile(dirSaves+name+'.html')
            res.send('connected');
        });

        self.app.get('/hostname', function onHostName (req, res) {
            var name = req.query.name;
            var os = require("os");
            var hostname = os.hostname().toLowerCase();
            res.send(hostname);
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


        self.app.get('/getStatus', function onGetStatus (req, res) {
            var output = onGetStatus2(false)
            res.send(output);
        });


        sh.defineExitware(self.app)

       /* self.app.get('/exitQuit', function onExit (req, res) {
            process.exit();
            //var output = onGetStatus2(false)
            res.send(5);
        });*/


        function onGetStatus2 ( onlyProgress ) {

            var items = self.data.instance.items;
            var items2 = [];
            var status  = {};
            items2.push(status)

            count=0
            countUnstarted=0
            countDone = 0
            countProgress = 0;

            sh.each(items, function filterProp(k,item) {
                count++;
                if ( item.globalStatus == null) {
                    countUnstarted++;
                }
                else if ( item.globalStatus.startsWith('done') ) {
                    countDone++;
                }
                else  {
                    countProgress++;
                }

                if ( onlyProgress ) {
                    if (item.globalStatus == null || item.globalStatus.startsWith('done')) {
                        return;
                    }
                }
                var filterProps = ['name2','title', 'size', 'dirRemoteMega', 'urlTorrent', 'workerId',
                    'globalStatus']
                var itemFiltered = sh.filterProps(item, filterProps)
                items2.push(itemFiltered)

            })

            status.count = count;
            status.unstarted = countUnstarted
            status.progress = countProgress;
            status.done = countDone;


            var output = sh.toJSONString(items2)
            output = sh.toHTMLStr(output)

            return output;

        }

        self.app.get('/getStatus2',  function onGetStatusB(req, res) {

            var output = onGetStatus2()

            res.send(output);

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


                socket.on('getLocalFiles', function onGetLocalFiles(data){
                    self.proc('what is command', data.cmd, sh.toJSONString(data) )
                    /*//  self.proc('cmd no match', data)
                    self.handleSocket(data, function onFinished (a,b,c) {
                        var result = {}
                        result.a = a; result.b = b; result.c = c;
                        if ( data.noreturn != true  ) {
                            var str = data.cmd + '' + '_results'
                            console.log('str', str)
                            io.emit(str, result);
                        };
                    })*/
                    var fileOutput = sh.fs.join(__dirname, '..', 'data', 'filelists','my'+'.txt' )
                    var dirOutput = sh.fs.getDir(fileOutput)
                    sh.fs.mkdirp(dirOutput)
                    RC_HelperFxs.listFilesInDirectories(fileOutput, function onDone(fileOutput, lite) {
                        //console.error(lite)
                        self.proc('file output', fileOutput);
                        var content = sh.readFile(fileOutput)
                       // onResultOfcall(content)
                        socket.emit('getLocalFiles_results', content);
                        //socket.broadcast.emit('window.invoke', x); 
                    }, null);
                    
                    return
                });


                socket.on('importRecFile', function onImportRecFiles(data){
                    self.proc('what is command', data.cmd, data.length )
                   // var fileOutput = sh.fs.join(__dirname, '..', 'data', 'filelists','my'+'.txt' )
                 //   var dirOutput = sh.fs.getDir(fileOutput)
                   // sh.fs.mkdirp(dirOutput)
                    Workflow_ImportVidsAgain.importRecFile(data, function onDone(fileOutput, lite) {
                        //console.error(lite)
                        self.proc('file output', fileOutput);
                       // var content = sh.readFile(fileOutput)
                        // onResultOfcall(content)
                        socket.emit('importRecFile_results', fileOutput);
                        //socket.broadcast.emit('window.invoke', x);
                    }, null);

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

                var dirScript = __dirname + '/' + 'getFiles.js'
                var GetFiles = require(dirScript).GetFiles

                var instance = new GetFiles();
                var config = {};

                config.fxDone = function fxDone(file) {

                    var filename = sh.getFileName(file)
                    console.log('file', file, filename);
                    //var url = 'http://'
                    fx(filename)

                }

                instance.init(config)





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

exports.reloadServer = function reloadServer(delayed ) {


    if ( delayed !== true ) {
        sh.get('127.0.0.1:6012/exitQuit')
        setTimeout(function a(){
            exports.reloadServer(true)
        }, 500)
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

    //console.error('-->reloading script', 'go', count)


    DLHoistServer.oldServer = instance;

    instance.init(config)
    instance.lastConfig = config;

    //instance.testLocally()
    var testRemoteDownload = false;
    //testRemoteDownload = true
    if ( testRemoteDownload ) {
        instance.testRemotely();
    }
    /* return;

     instance.testLocally()
     instance.testRemotely();
     /!*var i = instance;
     i.testLocally()
     i.testRemotely();*!/
     */

    return t;
}
if (module.parent == null) {
    exports.reloadServer()

}



