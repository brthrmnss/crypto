
var SocketScriptListener = require('./socketScriptListener').SocketScriptListener

var sh = require('shelpers').shelpers;
var express = require('express');
var requireReload = require('require-reload')(require);
//var proxy = require('express-http-proxy-extended2');
var bodyParser = require('body-parser');


function SelfReloadingTestScriptDemo() {
    var p = SelfReloadingTestScriptDemo.prototype;
    p = this;
    var self = this;

    p.init = function init(config) {
        self.settings = config;
        self.data = {};
        self.data.count = 0;
        self.runServer();
        self.setupReload();
    }

    self.setupReload = function setupReload() {
        var y = new SocketScriptListener()
        y.showParentFile();
        y.init();
        y.fxWhenParentChanged(function onChangedFile(){
            self.runServer()
        })
        y.settings.fileToReload = self.settings.fileToReload
        y.settings.fileToReload2 = self.settings.fileToReload2

        return;
    }

    self.runServer = function runServer() {
        /*   if ( self.server ) {
         self.server.close();
         }
         */
        var fileToReload = self.settings.fileToReload;
        var nodeScript = requireReload(fileToReload);
        self.data.count ++
        console.log('reload count', self.data.count)
        self.server = nodeScript.reloadServer(
            self.server,
            function setReloadingServer(reloadingServer) {
                self.server = reloadingServer
            },
            self.data.count, 
            self.data, nodeScript)
    }


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

exports.SelfReloadingTestScriptDemo = SelfReloadingTestScriptDemo;

if (module.parent == null) {
    var t = new SelfReloadingTestScriptDemo();
    //t.init();
    var options = {};
    options.fileToReload ='G:/Dropbox/projects/crypto/mp/RCExt/RCExt.js'
    options.fileToReload2 ='C:/Users/user1/Dropbox/projects/crypto/mp/RCExt/RCExt.js'
    t.init(options);

    function testServer() {

        setTimeout(function () {
            t.runServer()
        }, 5000)


        setTimeout(function () {
            t.runServer()
        }, 6000)

        setTimeout(function () {
            t.runServer()
        }, 10 * 1000)

    }
    //testServer();
}


