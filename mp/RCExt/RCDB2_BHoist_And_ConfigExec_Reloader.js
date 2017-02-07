/**
 * Created by user1 on 1/16/2017.
 */





var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var dirCrypto = __dirname + '/'+'../'+'../'
var dirCrypto2 = 'C:/Users/user1/Dropbox/projects/crypto/'

var SelfReloadingTestScriptDemo = require(dirCrypto+'mp/Test_CanReloadJavascriptClass/SelfReloadingTestScriptDemo.js').SelfReloadingTestScriptDemo;

function BasicClass() {
    var p = BasicClass.prototype;
    p = this;
    var self = this;

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        self.startBreedScriptHoistServer();
        self.startRemote(); 
    }

    p.startBreedScriptHoistServer = function method(config) {
        var t = new SelfReloadingTestScriptDemo();
        //t.init();
        var options = {};
        options.fileToReload = dirCrypto+'mp/RCExt/BreedHoistServer.js'
        options.fileToReload2 = dirCrypto2+'mp/RCExt/BreedHoistServer.js'
        t.init(options);
    }

    p.startRemote = function startConfigExecManager(config) {
        var t = new SelfReloadingTestScriptDemo();
        //t.init();
        var options = {};
        var fileScript = 'mp/RCExt/RC_ConfigManager_ExecServer.js'
        options.fileToReload = dirCrypto+fileScript;
        options.fileToReload2 = dirCrypto2+fileScript;
        //'mp/RCExt/RC_ConfigManager_ExecServer.js'
        t.init(options);
    }

    p.test = function test(config) {
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.BasicClass = BasicClass;

if (module.parent == null) {
    var instance = new BasicClass();
    var config = {};
    instance.init(config)
    instance.test();
}



