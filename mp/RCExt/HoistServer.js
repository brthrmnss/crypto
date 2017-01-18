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

function HoistServer(_self) {

    var p = HoistServer.prototype;
    p = this;
    var self = this;
    self.data = {}

    if ( _self ) {
        self = _self;
        p = _self;
        self.data.subclass = true;
    }

    p.init = function init(config) {
        config = sh.dv(config, {});
        config.port = sh.dv(config.port, 6012)
            if (self.data.subclass) {
               //create a new instance on lower port to test
                self.data.superTest = HoistServer.testHoistServer();
            } else {
                //config.port = sh.dv(config.port, 6011)
            }
        self.settings = config;

        sh.mkdirp(__dirname + '/configs')
        // sh.mkdirp(__dirname + '/configUploads')
        self.createHoistServer();
    }

    p.method = function method(config) {
    }

    function defineRunInternals() {


        p.run = function run(config) {
            self.stopCurrent();
            var dirScript = self.settings.file;
            var clazz = require(dirScript)
            if ( self.settings.clazz ) {
                clazz = clazz[self.settings.clazz];
                var instance = new clazz();
                instance.init(config);
                instance.runActions();
            }
            if ( self.settings.fxClazz ) {
                var fxClazz = clazz.XY[self.settings.fxClazz];
                var instance = fxClazz(config);
            }

            self.data.instance = instance;
        }

        p.runFromConfigFile = function runFromConfigFile(fileConfig, write, config) {
            var fileConfigInput = fileConfig;
            var dir = __dirname + '/' + 'configs/';
            if ( fileConfig.endsWith('.json') == false ) {
                fileConfig += '.json';
            }
            if ( write ) {
                sh.writeJSONFile(dir+fileConfig, config);
                return;
            }
            var config = sh.readJSONFile(dir+fileConfig,false, true);
            if ( config === false ) {
                var errorResult = {error:'could not find file '+fileConfigInput};
                console.error('runFromConfigFile', errorResult.error );
                return errorResult;
            }
            self.run(config)
            return config;
        }


        p.stopCurrent = function stopCurrent() {
            if ( self.data.instance ) {
                self.data.instance.data.stop = true;
                self.proc('stop current')
            }
        }

        p.getJSONPath = function getJSONPath(path, doNotHTML) {

            var totalPath = 'self.data.instance.data';
            if ( path) {
                totalPath += '.' + path;
            }

            totalPath = sh.replace(totalPath, ';', '#@$$^&%^(');
            totalPath = sh.replace(totalPath, 'require', '#gotyo(');
            if ( totalPath.length > 50 ) {
                sh.throw('totalPath input is too long', totalPath)
            }
            try {
                var output = eval(totalPath)
            } catch( e) {
                console.error('coudl not run command', totalPath)
                throw (e)
            }

            output = sh.clone(output);

            if ( self.fxFilterJSON ) {
                var output2 = self.fxFilterJSON(output);
                if ( output2 ) { output2 = output}
            }

            var output = sh.toJSONString(output)



            if ( self.settings.dbgoutput )
                console.log('output>>>>', output)

            if ( doNotHTML != true ) {
                output = sh.toHTMLStr(output)
            }

            return output;

        }
    }
    defineRunInternals();


    function defineServer() {

        p.createHoistServer = function createHoistServer() {
            self.tests.defineTests();

            var app = express()
            self.app = app;
            self.server = app;
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
            var multer = require('multer');
            var storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, __dirname +'/configs/')			// DESTINATION FILES
                },
                filename: function (req, file, cb) {
                    if(typeof file === 'undefined')
                        return;
                    //var ext = file.originalname.split('.').pop();
                    cb(null, file.originalname);
                }
            });

            var upload = multer({ storage: storage });

            app.post('/uploadConfig', upload.single('file'), function onUploadSingleFile(req, res){
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
                res.json(sh.json.good('uploaded '+ filename))
                    .end(); req.filename;
            });


            app.use(bodyParser.json({limit: '50mb'}));

            app.use(bodyParser.urlencoded({
                limit: '50mb',
                extended: true
            }));

            app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

            app.use(express.static(__dirname + '/'+'public_html'));


            app.get('/readFile', function onReadFile (req, res) {
                var name = req.query.name;
                var content = sh.readFile(dirSaves+name+'.html')
                res.send(content);

            });


            app.get('/test', function onTest(req, res) {
                res.json(sh.json.good('all good'));
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
                var file = req.query.file;npm 
                sh.throwIfNull(file, 'need file path');


                var jsonConfig = self.runFromConfigFile(file);
                var json = sh.json.good('all good');
                if ( jsonConfig.error ) {
                    var json = sh.json.error('could not find that file', file, jsonConfig.error )
                }


                if ( jsonConfig) {
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

            self.active_server = app.listen(self.settings.port, function () {
                console.log('Listening on ' +  self.settings.port)
            });

 
            console.log('createHostServer2',self.createHoistServer2 )
            if ( self.createHoistServer2 ){
                self.createHoistServer2()
            }

        }

        /*p.createHoistServer2 = function createHoistServer2() {

         }*/
        return
    }
    defineServer();


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
            var baseUrl = 'http://127.0.0.1:'+self.settings.port;
            var t = EasyRemoteTester.create('Test say basics',{showBody:false});
            var data = {};
            t.settings.baseUrl = baseUrl
            var urls = {};
            urls.notes = {};
            urls.test = t.utils.createTestingUrl('test')
            urls.play = t.utils.createTestingUrl('play')
            urls.stop = t.utils.createTestingUrl('stop')
            urls.playCustom = t.utils.createTestingUrl('playCustom')
            urls.getJSONPath = t.utils.createTestingUrl('getJSONPath')
            urls.uploadConfig = t.utils.createTestingUrl('uploadConfig')
            self.tests.t = t;

            self.tests.urls = urls;
        }


        p.tests.uploadTestConfig =function uploadTestConfig(t2, fileTestConfigName, callX) {
            var urls = self.tests.urls;
            //var fileTestConfigName = 'test_demoInnerScriptConfig3.json';
            var fileTestConfig = __dirname + '/' + 'testData/' + fileTestConfigName
            var fileConfigDest = __dirname + '/' + 'configs/' + fileTestConfigName
            if ( sh.fs.exists( fileConfigDest )) {
                sh.deleteFile( fileConfigDest );
            }
            t2.getR(urls.uploadConfig).with({channel:'cnn'}).upload(fileTestConfig)
            //.bodyHas('status').notEmpty()
                .fxDone(function onDeleteFileAfterUpload() {
                    //  sh.deleteFile(localDir + 'channels/cnn/'+fileTestVidUpload)
                })
            var makeFail = '';
            //makeFail = '35345
            var  call = t2.getR(self.tests
                .urls.playCustom)
                .with({file:fileTestConfigName+makeFail, rate:20})

            if ( callX ) {
                call.bodyHas('name').notEmpty();
            }

        }


        self.tests.configFails = function configFails(t2, configName) {
            var urls = self.tests.urls;
            var makeFail = '';
            makeFail = '35345'
            t2.getR(urls.playCustom)
                .with({file:configName+makeFail, rate:20})
                .bodyHas('error').notEmpty();
        }



        p.testRemotely = function testRemotely() {


            var t = self.tests.t ;

            var t2 = t.clone('test an example command');
            var urls = self.tests.urls; 
            t2.getR(urls.test).with({text:'test', rate:20}).bodyHas('status').notEmpty();
            t2.getR(urls.play).with({text:'play', rate:20}).bodyHas('status').notEmpty();

            t2.wait(1)

            t2.getR(urls.stop).with({text:'play', rate:20}).bodyHas('status').notEmpty();
            t2.getR(urls.playCustom).with({file:'demoInnerScriptConfig7', rate:20}).bodyHas('error').notEmpty();
            t2.getR(urls.playCustom).with({file:'demoInnerScriptConfig2', rate:20}).bodyHas('name').notEmpty();

            t2.wait(1)

            t2.getR(urls.getJSONPath).with({path:'', html:true})//.bodyHas('name').notEmpty();
            t2.getR(urls.getJSONPath).with({path:'count', html:false})//.bodyHas('name').notEmpty();
            t2.getR(urls.getJSONPath).with({path:'y;process.exit()', html:false})
                .why('block hacker')//.bodyHas('name').notEmpty();
            t2.getR(urls.getJSONPath).with({path:sh.str.createName(150), html:false})
                .why('block hacker who is verbose')
                .makeOptional() //mustFail


            var fileTestConfigName = 'test_demoInnerScriptConfig3.json';

            var configName = self.tests.uploadTestConfig(t2, fileTestConfigName)
            self.tests.configFails(t2, fileTestConfigName)

        }
    }

    defineTestingMethods();


    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.HoistServer = HoistServer;
HoistServer.testHoistServer = function testHoistServer() {
    var instance = new HoistServer();
    var config = {};
    config.file = './HoistServer_DemoInnerScript.js'
    config.clazz = 'DemoInnerScript'

    var innerConfig ={}
    innerConfig.action = 'run10';
    config.innerConfig = innerConfig;

    instance.init(config)
    instance.testLocally()
    instance.testRemotely();
    /*var i = instance;
     i.testLocally()
     i.testRemotely();*/

    return instance;
}


if (module.parent == null) {
    HoistServer.testHoistServer();
}