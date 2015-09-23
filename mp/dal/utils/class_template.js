var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var SequelizeHelper = shelpers.SequelizeHelper;
var EasyRemoteTester = shelpers.EasyRemoteTester;



function BasicClass() {
    var p = BasicClass.prototype;
    p = this;
    var self = this;
    p.method1 = function method1(url, appCode) {
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }
}

exports.BasicClass = BasicClass;

