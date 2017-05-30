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


function Workflow_UploadAndRun () {
    var p = Workflow_UploadAndRun.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;

        sh.fs.exists(self.settings.fileManifest, 'cannot find manifest')
       // sh.throwIfNull(self.settings.fileManifestReceipt, 'need an input file ')

        if ( self.settings.url ) {
        }
        else
        {
            self.settings.url = 'http://'+self.settings.ip+':'+self.settings.port + '/'
        }
        self.settings.url2 =  self.settings.url + 'useConfig'

        if ( self.settings.file == null ) {
            var filename = sh.fs.clean(self.settings.url)
            var fileOutput = sh.fs.join(__dirname, '..', 'data', 'filelists',filename+'.txt' )
            var dirOutput = sh.fs.getDir(fileOutput)
            sh.fs.mkdirp(dirOutput)
            self.proc('storing it', fileOutput)
            self.settings.file = fileOutput;
        }
        self.proc('self.settings.file', self.settings.file)
        if ( config.initGFFRM ) {
            self.proc('init...|||>>>')
            var data = {}
            data.initGFFRM = true
            data.fileExists = sh.fs.exists(self.settings.file)
            data.file = self.settings.file;
            sh.cid(self.settings.fxDone, self.settings.file, data)
            return;
        }
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
        chain.add(self.step2_uploadFile)
        chain.add(self.step3_importFiles)
        chain.add(self.step4_returnFile)
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

        self.proc('setup....', self.settings.url )
        var socket = require('socket.io-client')(self.settings.url );
        socket.on('connect', function onConnectToSocket(){
            self.data.socket = socket;
            self.data.socket = self.settings.socket = socket;
            self.data.connectedToSrv1x = true

            self.proc('connected')
            self.chain.nextLink();
        });
        socket.on('event', function(data){});
        socket.on('disconnect', function(){
            self.proc('lost the mirror')
        });


        self.setTimer()

        return;
    }

    p.step2_uploadFile = function step2_uploadFile() {
        //  if ( self.data.skipToDl ) {
        self.proc('step2_uploadFile....')
        if ( self.settings.localTest) {
            self.chain.nextLink()
            return
        }
        /* else {
         var json = sh.readJSONFile(self.settings.fileManifestReceipt)
         self.data.json = json;
         self.chain.nextLink()
         }
         return;
         */


        //asdf.g
        function onResultOfcall(data) {
            self.proc('data', data.length)
            //  asdf.g
            //sh.fs.writeFile(self.settings.file, data)
            self.chain.nextLink()
        }

        self.proc('started the push')
        var taskName = 'uploadAndRun'
        self.data.socket.on(taskName+'_results', onResultOfcall)
        var data = {}
        data.name = sh.fs.leaf(self.settings.fileManifest)
        self.settings.leaf = data.name;
        data.contents = sh.readFile(self.settings.fileManifest)
        self.data.socket.emit(taskName, data)
        return;
    }


    p.step3_importFiles = function step3_importFiles() {
        //  if ( self.data.skipToDl ) {

        function onResultOfcall(data) {
            self.proc('data', data)
            //  asdf.g
           // sh.fs.writeFile(self.settings.file, data)
            self.chain.nextLink()
        }

        sh.getRequest(self.settings.url2, function onStarted(body) {
            console.log('body', body)
            onResultOfcall({})
        }, {taskName:self.settings.leaf});

        return;

        if ( self.settings.localTest) {
            /*
            self.proc('localTest', self.settings.localTest )
            var dirTrash = sh.fs.makePath(__dirname, 'trash')
            var fileOutput = sh.fs.makePath(dirTrash, 'file.list.test.txt')

            Workflow_ImportVidsAgain.importRecFile(self.settings.fileManifestReceipt,
                function onDone(fileOutput, lite) {
                    //console.error(lite)
                    console.log('file output', fileOutput);
                    var content = sh.readFile(fileOutput)
                    onResultOfcall(content)
                    //sh.throwIf(output.foundCount != 2, 'did not match write count of items');
                }, null);
            return;
            */
        }

        var type = 'importRecFile';
        self.proc('started the push')
        self.data.socket.on(type+'_results', onResultOfcall)
        self.data.socket.emit(type, self.data.json )

        //self.chain.nextLink();
        return;
        //  }
    }

    p.step4_returnFile = function step4_returnFile() {
        self.proc('ok...')
        self.chain.cb()
        sh.callIfDefined(self.settings.fxDone, self.settings.file, self)
    }

    p.test = function test(config) {
    }

    function defineUtils() {
        var utils = {};
        p.utils = utils;

        p.setTimer = function setTimer(config) {
            var currentId = Math.random();
            self.data.currentId = currentId;
            self.data.connectedToSrv1x = false;
            setTimeout(function testIfConnected() {
                if ( self.data.currentId == currentId &&
                    self.data.connectedToSrv1x == false ) {
                    self.proc('did not connect we have an issue')
                    sh.cid(self.settings.fxDone, 'what is this.... we failed on the url '+self.settings.url)
                }
            }, 3510)
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

Workflow_UploadAndRun.uploadAndRun = function uploadAndRun(cfg, fxDone2) {
    var instance = new Workflow_UploadAndRun();
    var config = cfg
    cfg.fxDone = fxDone2;
    instance.init(config)
}

exports.Workflow_UploadAndRun = Workflow_UploadAndRun;



if (module.parent == null) {

    var instance = new Workflow_UploadAndRun();
    var config = {};
    config.ip = '127.0.0.1'
    config.port = '6014'
    //config.localTest = true;
    config.fileManifest = 'G:/Dropbox/projects/crypto/mp/RCExt/manifests/1off_sia mp3 single.json'
    config.fxDone = function fxDone() {
        console.log('...', 'y')
    }
    instance.init(config)

}
