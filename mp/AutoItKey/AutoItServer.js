/**
 * hoist it
 * take a get to send to command line
 * and send result?
 * init test
 *
 * add server
 * startup irb and import nodejs
 * add get request
 * send command to commadn line
 * return result
 * -x modulpe requers
 *
 * //C:\Users\user1\Dropbox\projects\soundboard\automate_android_store\autoit\
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var express = require('express')

function AutoItServer() {
    var p = AutoItServer.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;
        self.settings.port = sh.dv(self.settings.port, 11200)

        self.settings.waitMode = sh.dv(self.settings.waitMode, true)

        sh.catchErrors();

        self.method();
        self.createAutoItServer()
        p.fx();
        setTimeout(function onTestLateR() {
            self.testRemotely2()
        }, 800);
        self.defineCommandHelper()
        self.defineCommandHelper({storeAs: 'cmd2'})
    }

    p.defineCommandHelper = function defineCommandHelper(config) {
        config = sh.dv(config, {})
        //run it up ....
        //how to run a commadn and keep calling it ?

        var cmd = new sh.CommandRunner()
        var settings = {}
        settings.silent = self.silent
        settings.fxCallback =
            function commandFinished() {
                console.log(cmd.log.output)
                sh.callIfDefined(fxDone);
            }
        settings.cmd = 'cmd';
        settings.doNotAddCr = true
        settings.skipSameLine = true

        settings.fxEcho = function fxEcho(echoContent) {
            console.error('what is echo', echoContent.trim())
            if (self.settings.waitMode) {
                if (self.data.fxReturn)
                    self.data.fxReturn(echoContent)
            }
        }
        var args = []
        settings.args = args;
        // settings.cwd = cd;
        cmd.execute(settings)
        //settings.enableInput = true
        console.log('run', args)


        if (config.storeAs) {
            self[config.storeAs] = cmd;
            return;
        }
        self.cmd = cmd;


        self.cmd.write('irb')

        function onAcceptUserInput() {
            var stdin = process.openStdin();

            stdin.addListener("data", function onGotStdIn(d) {
                // note:  d is an object, and when converted to a string it will
                // end with a linefeed.  so we (rather crudely) account for that
                // with toString() and then trim()
                // console.log("you entered: [" +
                //    d.toString().trim() + "]");
                var userInput = d.toString().trim();

                cmd.write(userInput)
            });
        }

        onAcceptUserInput();
    }


    p.method = function method(config) {
    }

    p.test = function test(config) {
    }


    function defineServer() {

        p.createAutoItServer = function createAutoItServer() {
            self.tests.defineTests();

            var app = express()
            self.app = app;
            self.server = app;
            app.use(function addCrossDomainMiddlware(req, res, next) {
                //asdf.g
                res.header("Access-Control-Allow-Origin", "*");
                if (req.headers.origin != null) {
                    res.header("Access-Control-Allow-Origin", req.headers.origin);
                }
                ;
                res.header("Access-Control-Allow-Headers", "X-Requested-With");
                res.header("Access-Control-Allow-Headers", "Content-Type");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
                next();
            });

            var bodyParser = require("body-parser");

            function configUploads() {

                var multer = require('multer');
                var storage = multer.diskStorage({
                    destination: function (req, file, cb) {
                        cb(null, __dirname + '/configs/')			// DESTINATION FILES
                    },
                    filename: function (req, file, cb) {
                        if (typeof file === 'undefined')
                            return;
                        //var ext = file.originalname.split('.').pop();
                        cb(null, file.originalname);
                    }
                });

                var upload = multer({storage: storage});

                app.post('/uploadConfig', upload.single('file'), function onUploadSingleFile(req, res) {
                    var filename = req.file.filename;
                    /*var isArchiveFile = req.file.filename.indexOf('.htmlz') != -1
                     if ( req.file.filename.indexOf('.epub') != -1 || isArchiveFile ) {
                     var filePath = req.file.destination+req.file.filename
                     var execSync = require('child_process').execSync;
                     var dirExtraction = req.file.destination+'extracted/'
                     filePath = '"'+filePath+'"'
                     var dirBook = filename.replace(/[^\w\s]/gi, '')
                     dirExtraction += dirBook   +'/'
                     dirExtraction = '"'+dirExtraction+'"'
                     var args = ['-o',filePath, '-d', dirExtraction];
                     console.log(args)
                     args = args.join(' ')
                     console.log(args)
                     var code = execSync('unzip ' +args);
                     }*/
                    console.log('uploaded', filename)

                    res.status(204)
                    res.json(sh.json.good('uploaded ' + filename))
                        .end();
                    req.filename;
                });

                app.use(bodyParser.json({limit: '50mb'}));

                app.use(bodyParser.urlencoded({
                    limit: '50mb',
                    extended: true
                }));

                app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

            }


            app.use(express.static(__dirname + '/' + 'public_html'));


            function deprecrandomFx() {
                app.get('/readFile', function onReadFile(req, res) {
                    var name = req.query.name;
                    var content = sh.readFile(dirSaves + name + '.html')
                    res.send(content);

                });


                app.get('/play', function onPlayDefault(req, res) {
                    self.proc('playing the thing...')
                    var innerConfig = sh.clone(self.settings.innerConfig);
                    self.run(innerConfig);
                    res.json(sh.json.good('all good'));
                });

                app.get('/stop', function onStop(req, res) {
                    //self.proc('playing the thing...')
                    self.stopCurrent();
                    res.json(sh.json.good('stopped it'));
                });

                app.get('/playCustom', function onPlayCustom(req, res) {
                    var file = req.query.file;
                    sh.throwIfNull(file, 'need file path');


                    var jsonConfig = self.runFromConfigFile(file);
                    var json = sh.json.good('all good');
                    if (jsonConfig.error) {
                        var json = sh.json.error('could not find that file', file, jsonConfig.error)
                    }


                    if (jsonConfig) {
                        json.name = jsonConfig.name;
                    }
                    res.json(json);
                });


                app.get('/getJSONPath', function onGetJSONPath(req, res) {
                    var path = req.query.path;
                    //sh.throwIfNull(path, 'need data path')
                    var output = self.getJSONPath(path)
                    res.send(output)
                });

            }


            app.get('/test', function onTest(req, res) {
                res.json(sh.json.good('all good'));
            });
            app.get('/runlocal/:id', function onRunLocal(req, res) {
                //https://www.wired.com/story/al-franken-just-gave-the-speech-big-tech-has-been-dreading/
                var AIR_GotoAccount = sh.require('mp/AutoItKey/vm_scripts/AutoItRunner_GoToAccount.js').AIR_GotoAccount;
                var instance = new AIR_GotoAccount();
                var config = {};
                config.port = 11510
                config.ip = '192.168.1.172'
                if (req.params.id != null) {
                    id = req.params.id
                }
                // var yyy = req.originalUrl.split(-1)[0];
                config.url = id
                instance.init(config)
                instance.test();
                instance.readArticle(id)
                res.json('ok')
            })

            app.get('/runlocal', function onRunLocal(req, res) {
                //https://www.wired.com/story/al-franken-just-gave-the-speech-big-tech-has-been-dreading/
                var AIR_GotoAccount = sh.require('mp/AutoItKey/vm_scripts/AutoItRunner_GoToAccount.js').AIR_GotoAccount;
                var instance = new AIR_GotoAccount();
                var config = {};
                config.port = 11510
                config.ip = '192.168.1.172'
                if (req.params.id != null) {
                    id = req.params.id
                }
                // var yyy = req.originalUrl.split(-1)[0];
                //config.url = id
                config.url = req.query.url
                instance.init(config)
                //instance.test();
                instance.readArticle(config.url)
                res.json('ok')
            })

            app.get('/runAISCmd', function runAISCmd(req, res) {
                var cmd = req.query.text;
                var cmdObj2 = req.query.cmdObj2

                if (cmd.includes(';')) {
                    console.log('becreare fo ; input')
                }

                var cmdObjHelper = self.cmd;
                if (cmdObj2) {
                    cmdObjHelper = self.cmd2;
                }

                if (req.query.runAsFileType) {
                    var fileName = 'temp.x.auotitserver.' +
                        req.query.runAsFileType
                    fileName = sh.fs.trash(fileName)
                    sh.writeFile(fileName, cmd)
                    cmd = fileName;
                }
                // cmd += '\n\r'
                //  cmd += ' \r\n'
                // self.proc('cmd', cmd)
                //  console.error('cmd', cmd, req.query)
                cmdObjHelper.write(cmd)
                //  self.cmd.write('')
                var cmdOutput = cmdObjHelper.flush()
                //self.proc(cmdOutput)
                self.proc('!!!---!!!')
                console.log('cmdOutput', cmdOutput)
                var json = sh.json.good('all good')

                json.cmdOutput = cmdOutput;


                if (false == self.settings.waitMode) {
                    res.json(json);
                } else {
                    self.data.fxReturn = function fxReturn(output) {
                        json.cmd = cmd;
                        if (output.trim() == '') {
                            return;
                        }
                        if (cmd.trim() == output.trim()) {
                            console.error('skipping this line')
                            return;
                        }
                        // econsole.log(sh.t, sh.t, '|', cmd)
                        // console.log(sh.t, sh.t, '|', output)
                        json.cmdOutput = output.trim();
                        res.json(json);
                    }
                }


            });


            /*      app.get('/runBatCmd', function runBatCmd(req, res) {
             var cmd = req.query.text;

             var instance = new RunScriptHelper();
             var config = {};
             instance.init(config)
             output = instance.runHidden(cmd);
             var json = {}
             json.cmdOutput = output.trim();
             res.json(json);
             return;

             if ( false ==  self.settings.waitMode ) {
             res.json(json);
             } else {
             self.data.fxReturn = function fxReturn(output) {
             json.cmd = cmd;
             if ( output.trim() == '' ) {
             return;
             }
             if ( cmd.trim() == output.trim() ) {
             console.error('skipping this line')
             return;
             }
             // econsole.log(sh.t, sh.t, '|', cmd)
             // console.log(sh.t, sh.t, '|', output)
             json.cmdOutput = output.trim();
             res.json(json);
             }
             }


             });*/


            self.active_server = app.listen(self.settings.port, function () {
                console.log('Listening on ' + self.settings.port)
                var baseUrl = 'http://127.0.0.1' + ':' + self.settings.port;
                var url = baseUrl.replace('127.0.0.1', sh.getIpAddress());
                console.log('go to 2', url)
                console.log(url)
            });


            console.log('createHostServer2', self.createHoistServer2)
            if (self.createHoistServer2) {
                self.createHoistServer2()
            }

        }

        return
    }

    defineServer();


    p.fx = function fx() {
        if (self.settings.monitor == false) {
            self.proc('not watcing')
            return;
        }
        var FileWatcher = require('./../QuickJSON/FileWatcher').FileWatcher;

        var f = new FileWatcher();
        var config = {
            //  file:__dirname + '/' + 'AutoItRunner',
            runNode: "__file__",
            action: "runFile"
        };

        config.file = __dirname + '/' + 'AutoItRunner.js';

        f.init(config)
    }


    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.getFilePath = function getFilePath(file) {
            var file = self.settings.dir + '/' + file;
            return file;
        }

        p.proc = function debugLogger() {
            if (self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }

    defineUtils()


    function defineTestingMethods() {
        p.testLocally = function testLocally() {

            var i = self;
            var innerConfig = {};
            innerConfig.action = 'run10';
            i.run(innerConfig);


            setTimeout(function startFromScript() {
                // i.run(innerConfig);
                var fileConfig = 'demoInnerScriptConfig';
                //i.runFromConfigFile(fileConfig, true , innerConfig);
                i.runFromConfigFile(fileConfig)
                // i.run(innerConfig);
            }, 2000)


            setTimeout(function logIt() {
                var output = i.getJSONPath('', true);
                console.log('1', 'output', output);
                var output = i.getJSONPath('count', true);
                console.log('2', 'output', output);
            }, 4000)

        }

        p.tests = {}

        p.tests.defineTests = function defineHoistTests() {
            var EasyRemoteTester = shelpers.EasyRemoteTester;
            var baseUrl = 'http://127.0.0.1:' + self.settings.port;
            var t = EasyRemoteTester.create('Test say basics',
                {
                    showBody: false,
                    silent: true
                });
            var data = {};
            t.settings.baseUrl = baseUrl
            var urls = {};
            urls.notes = {};
            urls.test = t.utils.createTestingUrl('test')
            urls.runAISCmd = t.utils.createTestingUrl('runAISCmd')
            urls.play = t.utils.createTestingUrl('play')
            urls.stop = t.utils.createTestingUrl('stop')
            urls.playCustom = t.utils.createTestingUrl('playCustom')
            urls.getJSONPath = t.utils.createTestingUrl('getJSONPath')
            urls.uploadConfig = t.utils.createTestingUrl('uploadConfig')
            self.tests.t = t;

            self.tests.urls = urls;
        }


        function asdf() {
            p.tests.uploadTestConfig = function uploadTestConfig(t2, fileTestConfigName, callX) {
                var urls = self.tests.urls;
                //var fileTestConfigName = 'test_demoInnerScriptConfig3.json';
                var fileTestConfig = __dirname + '/' + 'testData/' + fileTestConfigName
                var fileConfigDest = __dirname + '/' + 'configs/' + fileTestConfigName
                if (sh.fs.exists(fileConfigDest)) {
                    sh.deleteFile(fileConfigDest);
                }
                t2.getR(urls.uploadConfig).with({channel: 'cnn'}).upload(fileTestConfig)
                //.bodyHas('status').notEmpty()
                    .fxDone(function onDeleteFileAfterUpload() {
                        //  sh.deleteFile(localDir + 'channels/cnn/'+fileTestVidUpload)
                    })
                var makeFail = '';
                //makeFail = '35345
                var call = t2.getR(self.tests
                    .urls.playCustom)
                    .with({file: fileTestConfigName + makeFail, rate: 20})

                if (callX) {
                    call.bodyHas('name').notEmpty();
                }

            }

            self.tests.configFails = function configFails(t2, configName) {
                var urls = self.tests.urls;
                var makeFail = '';
                makeFail = '35345'
                t2.getR(urls.playCustom)
                    .with({file: configName + makeFail, rate: 20})
                    .bodyHas('error').notEmpty();
            }
        }

        p.testRemotely2 = function testRemotely2() {

            console.error('one')
            //  return
            var t = self.tests.t;

            var t2 = t.clone('test an example command');
            var urls = self.tests.urls;
            t2.getR(urls.test).with({text: 'test', rate: 20}).bodyHas('status').notEmpty();


            var initial = "";

            var dirC = 'C:/Users/user1/Dropbox/projects/soundboard/automate_android_store/autoit'

            var cmdStr = sh.readFile('scripts/init.rb');
            console.log('what is this', cmdStr);
            //process.exit()
            var dirFolder = sh.qq(dirC)
            dirFolder = sh.replaceBackslash(dirFolder)
            cmdStr = sh.replace(cmdStr, 'Dir.pwd', dirFolder);
            t2.getR(urls.runAISCmd).with({text: cmdStr, rate: 20})
                .bodyHas('status').notEmpty()
                .fxDone(function onDne(a, b, c) {
                    console.log('y', a/*, b, c*/)
                });


            var cmdStr = sh.readFile('scripts/beep.rb');
            t2.getR(urls.runAISCmd).with({text: cmdStr, rate: 20}).bodyHas('status').notEmpty();
            t2.wait(1)


            t2.getR(urls.runAISCmd).with({text: 'lsdf', rate: 20}) //
                .bodyHas('status').notEmpty()
                .fxDone(function onDne(a, b, c) {
                    console.log('y', a/*, b, c*/)
                });

            //return ;
            t2.getR(urls.runAISCmd).with({text: "winExists('calibre')", rate: 20})
                .bodyHas('status').notEmpty()
                .fxDone(function onDne(a, b, c) {
                    console.log('-', a)
                });
            t2.getR(urls.runAISCmd).with({text: "winExists('calibre')", rate: 20})
                .bodyHas('status').notEmpty()
                .fxDone(function onDne(a, b, c) {
                    console.log('-', a)
                });

            t2.getR(urls.runAISCmd).with({text: "beep 400, 400", rate: 20})
                .bodyHas('status').notEmpty()
                .fxDone(function onDne(a, b, c) {
                    console.log('y', a)
                });
            t2.getR(urls.runAISCmd).with({
                cmdObj2: true,
                text: "G:/Dropbox/projects/crypto/mp/AutoItKey/test_remote_bat.bat", rate: 20
            })
                .bodyHas('status').notEmpty()
                .fxDone(function onDne(a, b, c) {
                    console.log('y', a)
                });
            t2.getR(urls.runAISCmd).with({
                cmdObj2: true,
                runAsFileType: '.bat',
                text: "echo ran it"
            })
                .bodyHas('status').notEmpty()
                .fxDone(function onDne(a, b, c) {
                    console.log('y', a)
                });

            return;
            t2.getR(urls.stop).with({text: 'play', rate: 20}).bodyHas('status').notEmpty();
            t2.getR(urls.playCustom).with({file: 'demoInnerScriptConfig7', rate: 20}).bodyHas('error').notEmpty();
            t2.getR(urls.playCustom).with({file: 'demoInnerScriptConfig2', rate: 20}).bodyHas('name').notEmpty();

            t2.wait(1)

            t2.getR(urls.getJSONPath).with({path: '', html: true})//.bodyHas('name').notEmpty();
            t2.getR(urls.getJSONPath).with({path: 'count', html: false})//.bodyHas('name').notEmpty();
            t2.getR(urls.getJSONPath).with({path: 'y;process.exit()', html: false})
                .why('block hacker')//.bodyHas('name').notEmpty();
            t2.getR(urls.getJSONPath).with({path: sh.str.createName(150), html: false})
                .why('block hacker who is verbose')
                .makeOptional() //mustFail


            var fileTestConfigName = 'test_demoInnerScriptConfig3.json';

            var configName = self.tests.uploadTestConfig(t2, fileTestConfigName)
            self.tests.configFails(t2, fileTestConfigName)
        }

        p.testRemotely = function testRemotely() {


            var t = self.tests.t;

            var t2 = t.clone('test an example command');
            var urls = self.tests.urls;
            t2.getR(urls.test).with({text: 'test', rate: 20}).bodyHas('status').notEmpty();
            t2.getR(urls.play).with({text: 'play', rate: 20}).bodyHas('status').notEmpty();

            t2.wait(1)

            t2.getR(urls.stop).with({text: 'play', rate: 20}).bodyHas('status').notEmpty();
            t2.getR(urls.playCustom).with({file: 'demoInnerScriptConfig7', rate: 20}).bodyHas('error').notEmpty();
            t2.getR(urls.playCustom).with({file: 'demoInnerScriptConfig2', rate: 20}).bodyHas('name').notEmpty();

            t2.wait(1)

            t2.getR(urls.getJSONPath).with({path: '', html: true})//.bodyHas('name').notEmpty();
            t2.getR(urls.getJSONPath).with({path: 'count', html: false})//.bodyHas('name').notEmpty();
            t2.getR(urls.getJSONPath).with({path: 'y;process.exit()', html: false})
                .why('block hacker')//.bodyHas('name').notEmpty();
            t2.getR(urls.getJSONPath).with({path: sh.str.createName(150), html: false})
                .why('block hacker who is verbose')
                .makeOptional() //mustFail


            var fileTestConfigName = 'test_demoInnerScriptConfig3.json';

            var configName = self.tests.uploadTestConfig(t2, fileTestConfigName)
            self.tests.configFails(t2, fileTestConfigName)

        }
    }

    defineTestingMethods();
}

exports.AutoItServer = AutoItServer;

if (module.parent == null) {
    var instance = new AutoItServer();
    var config = {};
    instance.init(config)
    instance.test();
}



