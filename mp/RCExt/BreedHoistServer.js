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
        self.settings = config;

        sh.mkdirp(__dirname + '/configs')
        // sh.mkdirp(__dirname + '/configUploads')
        self.createHoistServer();
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



