/**
 * Created by user on 7/24/15.
 */

/*
 Downloads the file from imdb_app_breed
 why: downloads a pre-compiled download list.
 */

var ritvConfigHelper = require('ritvHelpers');
var rh = ritvConfigHelper.ritvHelpers.ritvHelper//.RitvHelper
var sh = require('shelpers').shelpers;

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var PromiseHelperV3 = shelpers.PromiseHelperV3;


var RC_HelperFxs = require('./TestRCScripts.js').RC_HelperFxs

function TestVerifyCommandsThroughSocket() {
    var p = TestVerifyCommandsThroughSocket.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {};

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;

        if ( self.settings.url ) {
        }
        else
        {
            self.settings.url = 'http://'+self.settings.ip+':'+self.settings.port + '/'
        }

        
        if ( self.settings.file == null ) {
            var filename = sh.fs.clean(self.settings.url)
            var fileOutput = sh.fs.join(__dirname, '..', 'data', 'filelists',filename+'.txt' )
            var dirOutput = sh.fs.getDir(fileOutput)
            sh.fs.mkdirp(dirOutput)
            self.proc('storing it', fileOutput)
            self.settings.file = fileOutput
        }
        self.proc('self.settings.file', self.settings.file)
       // return
        self.runStesps();
    }

    p.runStesps = function runStesps() {
        var chain = new PromiseHelperV3();
        var token = {};
        token.silentToken = true
        chain.wait = token.simulate == false;
        chain.startChain(token)
        chain.add(self.step1_setupSocket)
        chain.add(self.step2_getFiles)
        chain.add(self.step3_returnFile)
        // chain.add(self.step4_moveOutputFileToProject);
        self.chain = chain;
    }

    p.step1_setupSocket = function step1_setupSocket() {
        //  if ( self.data.skipToDl ) {
        self.data.socket = self.settings.socket
        if ( self.data.socket ) {

            self.chain.nextLink();
            return;
        }
        //self.settings.url = 'http://127.0.0.1:14002/'

        var socket = require('socket.io-client')(self.settings.url );
        socket.on('connect', function onConnectToSocket(){
            self.data.socket = socket;
            self.proc('connected')
            self.chain.nextLink();
        });
        socket.on('event', function(data){});
        socket.on('disconnect', function(){
            self.proc('lost the mirror')
        });
        //socket.emit('my other event', __filename + ' is listening')

        return;
        // }
    }

     p.step2_getFiles = function step2_getFiles() {
        //  if ( self.data.skipToDl ) {

        function onResultOfcall(data) {
            self.proc('data', data.length)
            //  asdf.g
            sh.fs.writeFile(self.settings.file, data)
            self.chain.nextLink()
        }

        if ( self.settings.localTest) {
            var dirTrash = sh.fs.makePath(__dirname, 'trash')
            var fileOutput = sh.fs.makePath(dirTrash, 'file.list.test.txt')
            RC_HelperFxs.listFilesInDirectories(fileOutput, function onDone(fileOutput, lite) {
                //console.error(lite)
                console.log('file output', fileOutput);
                var content = sh.readFile(fileOutput);
                onResultOfcall(content);
                //sh.throwIf(output.foundCount != 2, 'did not match write count of items');
            }, null);
            return; 
        }

        self.proc('started the push')
        self.data.socket.on('getLocalFiles_results', onResultOfcall)
        self.data.socket.emit('getLocalFiles', {msg:'ok'})

        //self.chain.nextLink();
        return;
        //  }
    }

    p.step3_quickCheck = function step2_getFiles() {
        //  if ( self.data.skipToDl ) {

        function onResultOfcall(data) {
            self.proc('data', data.length)
            //  asdf.g
            sh.fs.writeFile(self.settings.file, data)
            self.chain.nextLink()
        }

        if ( self.settings.localTest) {
            var dirTrash = sh.fs.makePath(__dirname, 'trash')
            var fileOutput = sh.fs.makePath(dirTrash, 'file.list.test.txt')
            RC_HelperFxs.listFilesInDirectories(fileOutput, function onDone(fileOutput, lite) {
                //console.error(lite)
                console.log('file output', fileOutput);
                var content = sh.readFile(fileOutput);
                onResultOfcall(content);
                //sh.throwIf(output.foundCount != 2, 'did not match write count of items');
            }, null);
            return;
        }

        self.proc('started the push')
        self.data.socket.on('getLocalFiles_results', onResultOfcall)
        self.data.socket.emit('getLocalFiles', {msg:'ok'})

        //self.chain.nextLink();
        return;
        //  }
    }


    p.step4_fullCheck = function step2_getFiles() {
        //  if ( self.data.skipToDl ) {

        function onResultOfcall(data) {
            self.proc('data', data.length)
            //  asdf.g
            sh.fs.writeFile(self.settings.file, data)
            self.chain.nextLink()
        }

        if ( self.settings.localTest) {
            var dirTrash = sh.fs.makePath(__dirname, 'trash')
            var fileOutput = sh.fs.makePath(dirTrash, 'file.list.test.txt')
            RC_HelperFxs.listFilesInDirectories(fileOutput, function onDone(fileOutput, lite) {
                //console.error(lite)
                console.log('file output', fileOutput);
                var content = sh.readFile(fileOutput);
                onResultOfcall(content);
                //sh.throwIf(output.foundCount != 2, 'did not match write count of items');
            }, null);
            return;
        }

        self.proc('started the push')
        self.data.socket.on('getLocalFiles_results', onResultOfcall)
        self.data.socket.emit('getLocalFiles', {msg:'ok'})

        //self.chain.nextLink();
        return;
        //  }
    }



    p.step3_returnFile = function step3_returnFile() {

        self.chain.cb()
         sh.callIfDefined(self.settings.fxDone, self.settings.file, self)
    }

    p.test = function test(config) {
    }

    function defineUtils() {
        var utils = {};
        p.utils = utils;

        p.proc = function debugLogger() {
            if ( self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }
    defineUtils()
}

exports.TestVerifyCommandsThroughSocket = TestVerifyCommandsThroughSocket;



if (module.parent == null) {

    var instance = new TestVerifyCommandsThroughSocket();
    var config = {};
    config.ip = '127.0.0.1'
    config.port = '6008'
    //config.port = '6010'
    //config.localTest = true
    config.fxDone = function fxDone() {
        console.log('...', 'y')
    }
    instance.init(config)

}
