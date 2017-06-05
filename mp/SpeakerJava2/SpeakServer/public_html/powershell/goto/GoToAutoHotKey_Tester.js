var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function BasicClass() {
    var p = BasicClass.prototype;
    p = this;
    var self = this;

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        self.method();
    }

    p.method = function method(config) {
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

//console.error(sh.n, 'ran it')
//console.log('zzzzzzzzzzzzzzzzzzzzzzzzz', process.argv)

/*
if ( process.argv[2] != 'selfFileMode') {
//sh.runWhenFileChanged(__dirname, 'AutoItServer.js')
    var fW = sh.runWhenFileChanged(__filename, 'selfFileMode*^!')
    //fW.settings.debugChanges = true
}
*/
 
  
 sh.reload.reloadFile(__filename)

