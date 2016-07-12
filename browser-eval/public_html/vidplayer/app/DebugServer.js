var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

/**
 * Socket server, send debug information
 * will post 'slot's for information
 * @constructor
 */

function DebugServer() {
    var p = DebugServer.prototype;
    p = this;
    var self = this;
    p.method1 = function method1(url, appCode) {
         var helper = new ESHV2()
        h = helper;
        h.serveDir()
        h.aliasFile()
        h.post
        h.get
        //h.addAngularJS()
        h.add(ESHV2.angularjs)
        h.add(ESHV2.socket)
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}

exports.DebugServer = DebugServer;

if (module.parent == null) {

}



