
 

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function SocketScriptListener() {
    var p = SocketScriptListener.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;

        var useSecureServer = false;
        if ( useSecureServer ) {
        //var socket = require('socket.io-client')('https://local.helloworld3000.com:8043/');
        } else {
            var socket = require('socket.io-client')('http://127.0.0.1:14002/');
        }
        socket.on('connect', function(){});
        socket.on('event', function(data){});
        socket.on('disconnect', function(){});
        socket.on('window.invoke', function windowInvoke(a,b,c) {
            var path = sh.replaceBackslash(a);
            var isMatch = path == self.settings.fileToReload2
            if ( isMatch || self.settings.fileToReload == path ) {
                self.proc('hit parent module');
                sh.callIfDefined(self.settings.fxWhenParentChanged);
            }
 
           // console.log('asdf', path,self.settings.fileToReload, module.parent.filename)
            //console.log('...', module.parent)
            console.log(a,b,c);
        })
        socket.emit('my other event', __filename + ' is listening');
        //self.listTo();
    }

    p.fxWhenParentChanged = function fxWhenParentChanged(fxCb) {
        self.settings.fxWhenParentChanged = fxCb
    }

    p.test = function test(config) {
    }
    
    p.showParentFile = function showParentFile() {
        //self.proc('parent',module.parent  )
      //  console.log('parent', module.parent)
    }


    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.getFilePath = function getFilePath(file) {
            var file = self.settings.dir+'/'+ file;
            return file;
        }

        p.proc = function debugLogger() {
            if ( self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }
    defineUtils()
}

exports.SocketScriptListener = SocketScriptListener;

if (module.parent == null) {
    var instance = new SocketScriptListener();
    var config = {};
    instance.init(config);
    instance.test();
}







