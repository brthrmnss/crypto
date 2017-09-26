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



console.log( require('v8').getHeapStatistics())
console.log(process.memoryUsage)
sh.storeErrorsInLogFile();

function ReloadableServer() {

    var p = ReloadableServer.prototype;
    p = this;
    var self = this;
    self.data = {}
    p.init = function init(config) {
        config = sh.dv(config, {});
        config.port = sh.dv(config.port, 10008)
        config.portSocket = sh.dv(config.portSocket, config.port + 2);
        self.settings = config;
        self.runServer();
        self.tests.testRemotely();
    }

    self.runServer = function runServer() {
        var express = require('express')
        var app = express()
        self.app = app;

        // app.use(sh.blockIndexPage(indexPageSecurityEnding));

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
        //var multer = require('multer');

        app.use(bodyParser.json({limit: '50mb'}));

        app.use(bodyParser.urlencoded({
            limit: '50mb',
            extended: true
        }));

        app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

        app.use(express.static(__dirname + '/' + 'public_html'));


        var http = require('http');

        var server = http.createServer(function(request, response) {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write("<!DOCTYPE \"html\">");
            response.write("<html>");
            response.write("<head>");
            response.write("<title>Hello World Page</title>");
            response.write("</head>");
            response.write("<body>");
            response.write("Hello World!");
            response.write("</body>");
            response.write("</html>");
            response.end();
        })

        server.listen(1337, '127.0.0.1');
        server.setMaxListeners(0);
        var nonLeakyData = [];
        var leakyData = [];

        function SimpleClass(text) {
           var self = this;
            self.text = text;
        }

        /*return;
         var dirSaves = __dirname+'/'+'saves/';
         sh.mkdirp(dirSaves);
         sh.writeFile(dirSaves + 'test.html', 'Test content <br /> ok ok ok ?');
         */
        app.get('/testMemory', function onReadFile(req, res) {
            for (var i = 0; i < 100000; i++) {
                //console.log('i', i)
                var outerRef = {}
                var randomData = Math.random().toString();
                var randomObject = new SimpleClass(randomData);
                server.on('request', function leakyfunc() {
                    var y = {}
                    y.ref = randomObject
                });
                var server2 = http.createServer(function(request, response) {
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write("<!DOCTYPE \"html\">");
                    response.write("<html>");
                    response.write("<head>");
                    response.write("<title>Hello World Page</title>");
                    response.write("</head>");
                    response.write("<body>");
                    response.write("Hello World!");
                    response.write("</body>");
                    response.write("</html>");
                    response.end();
                })

                var file = "C:/Users/user1/trash/downloads/Wiz Khalifa - No Sleep.mp3.zip"
                file = "C:/Users/user1/trash/downloads/Wiz Khalifa - No Sleep.mp3.zipex/Wiz Khalifa - No Sleep.mp3/VMware Workstation Pro 12.1.0 Build 3272444 - 64bit [ENG] [Serial] [AT-TEAM].rar"
                file = 'G:/Dropbox/projects/crypto/mp/MemoryLeak/MemoryLeak.js'
                var fs = require("fs")
                try {
                    randomObject.file = fs.readFileSync(file, 'binary');//sh.readFile(file, null, true)
                } catch ( e ) {
                    console.error(e)
                    console.error('failed on fie i' , i);
                }
                if ( i % 5000 == 0) {
                    console.log('at ' , i)
                }
                leakyData.push(randomObject);
            }
            res.end('Hello World\n');
        });


        app.post('/listFiles', function onSaveFile(req, res) {

            var body = req.body;
            var name = body.name;
            var contents = body.body;
            //var name = req.params.name;
            console.log(req.body)
            sh.writeFile(dirSaves + name + '.html', contents)

            res.send('Hello World!');
        });


        app.post('/saveFile', function onSaveFile(req, res) {
            var body = req.body;
            var name = body.name;
            var contents = body.body;
            //var name = req.params.name;
            console.log(req.body)
            sh.writeFile(dirSaves + name + '.html', contents)

            res.send('Hello World!');
        });

        app.post('/listFiles', function onSaveFile(req, res) {

            var body = req.body;
            var name = body.name;
            var contents = body.body;
            //var name = req.params.name;
            console.log(req.body)
            sh.writeFile(dirSaves + name + '.html', contents)

            res.send('Hello World!');
        });

        var JSONFileHelper = require('shelpers').JSONFileHelper;

        console.log(self.settings.port)
        self.active_server = app.listen(self.settings.port, function () {
            console.log('Listening on ' + self.settings.port)
        });

        return self.active_server;

    }

    function defineTest() {
        p.tests = {}
        p.tests.defineTests = function defineHoistTests() {
            var EasyRemoteTester = shelpers.EasyRemoteTester;
            var baseUrl = 'http://127.0.0.1:' + self.settings.port;
            var t = EasyRemoteTester.create('Test say basics', {showBody: false});
            var data = {};
            t.settings.baseUrl = baseUrl
            var urls = {};
            urls.notes = {};
            urls.testMemory = t.utils.createTestingUrl('testMemory')
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

        p.tests.testRemotely = function testRemotely() {

            if ( self.tests.t == null ) {
                self.tests.defineTests();
            }

            var t = self.tests.t;

            var t2 = t.clone('test an example command');
            var urls = self.tests.urls;
            t2.getR(urls.testMemory).with({text: 'test', rate: 20}) //.bodyHas('status').notEmpty();


            return;


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

    defineTest();

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

exports.ReloadableServer = ReloadableServer;


exports.reloadServer = function reloadServer(delayed) {


    if (delayed !== true) {
        sh.get('127.0.0.1:6022/exitQuit')
        setTimeout(function a() {
            exports.reloadServer(true)
        }, 500)
        return;
    }

    //var t = new DLHoistServer()

    var instance = new ReloadableServer();
    var t = instance;

    var config = {};
    config.file = __dirname + '/RunBreed.js'
    config.fxClazz = 'startBreed'
    var innerConfig = {}
    innerConfig.file = instance.data.filePathTestConfig;
    config.innerConfig = innerConfig;

    //console.error('-->reloading script', 'go', count)


    ReloadableServer.oldServer = instance;

    instance.init(config)
    instance.lastConfig = config;

    //instance.testLocally()
    var testRemoteDownload = false;
    //testRemoteDownload = true
    if (testRemoteDownload) {
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



