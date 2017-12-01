var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function BasicClass3() {
    var p = BasicClass3.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;
        self.settings.ip = '192.168.1.163'
        self.settings.url = '192.168.1.163' + ':' + 6022
        self.settings.urlSocket = '192.168.1.163' + ':' + 6024
        self.settings.urlSocket = 'http://192.168.1.163' + ':' + 6018
        self.method();
    }
    p.s0_startServer = function s0_startServer() {
        var server = sh.require('RCExtRemoteServer.js').RCExtRemoteServer
        RCExtRemoteServer.isAvailable(port, function onConnected() {
            cb()
            wwanr
            user
        }, function notAvilable() {
            //ttry to restever
            //if fails ...
        })
        // port  =
    }
    p.s1_makeManifest = function s1_makeManifest() {
        //where is this?
    }
    p.s1 = {};
    p.s1.searchGoogle = function searchGoogle() {
        //list of queries, get lists
        //G:\Dropbox\projects\crypto\ritv\imdb_movie_scraper\ContentLists\GoogleIMDB_Looper.js
    }
    p.s1.postProcessPB = function postProcessPB() {
        //get imdb and recreate a nd sort list
        //G:\Dropbox\projects\crypto\ritv\imdb_movie_scraper\ContentLists\PostProcessPBFile.js
    }
    p.s1b_updateManifest = function s1b_updateManifest() {
        //get all extra episodes
        //G:\Dropbox\projects\crypto\ritv\distillerv3\tools\SanitizeName2
    }

    p.s2 = {};
    p.s2.startDL = function s2_dlManifest() {
        // self.utils.needs('serverIp')
        self.runTask('runcmd',
            {
                url: self.settings.url,
                ip: self.settings.ip, port: 6024, cmd: "uploadAndRun",
                fileFileList: "G:/Dropbox/projects/crypto/mp/RCExt/data/filelists/http___localhost_6024_.txt",
                fileManifest: "g:/Dropbox/projects/crypto/mp/RCExt/data/uploadedLists/test_dl_manifest.json",
                title: "test_dl_manifest",
            }, function onUplodateAndRun(a, b, c) {
                console.log('ok', a, b, c)
            }
        )
    }

    p.s2.getProgressLite = function getProgressLite() {
        var cmdData = {
            "url": "192.168.1.163:6022",
            "ip": "192.168.1.163",
            "port": 6024,
            "cmd": "taskCheckProgressLite",
            "title": "test_dl_manifest",
            "fileFileList": "G:\\Dropbox\\projects\\crypto\\mp\\RCExt\\data\\filelists\\http___localhost_6024_.txt",
            "fileManifest": "g:\\Dropbox\\projects\\crypto\\mp\\RCExt\\data\\uploadedLists\\test_dl_manifest.json"
        }
        self.runTask('runcmd',
            cmdData, function onUplodateAndRun(a, b, c) {
                console.log('ok', a, b, c)
            }
        )
    }
    p.s2.getProgress = function s2_dlManifest() {
        self.runTask('runcmd',
            {
                "url": "192.168.1.163:6022",
                "ip": "192.168.1.163",
                "port": 6024,
                "cmd": "dlRemoteFileList",
                "title": "test_dl_manifest",
                "fileFileList": "G:\\Dropbox\\projects\\crypto\\mp\\RCExt\\data\\filelists\\http___localhost_6024_.txt",
                "fileManifest": "g:\\Dropbox\\projects\\crypto\\mp\\RCExt\\data\\uploadedLists\\test_dl_manifest.json"
            }
            , function onUplodateAndRun(a, b, c) {
                console.log('ok', a, b, c)
            }
        )
    }

    p.s3 = {};
    p.s3.getCompletePercengateInfo()
    //.s4.downloadAgain
    p.s3.getFileListWSizes = function getFileList() {
        var getFileList = {
            "url": "192.168.1.163:6022",
            "ip": "192.168.1.163",
            "port": 6024,
            "cmd": "dlRemoteFileListWithSizes",
            "title": "test_dl_manifest",
            "fileFileList": "G:\\Dropbox\\projects\\crypto\\mp\\RCExt\\data\\filelists\\http___localhost_6024_.txt",
            "fileManifest": "g:\\Dropbox\\projects\\crypto\\mp\\RCExt\\data\\uploadedLists\\test_dl_manifest.json"
        }

        self.runTask('runcmd',
            getFileList
            ,
            function onUplodateAndRun(a, b, c) {
                console.log('ok', a, b, c)
            }
        )
    }

    p.s3.getFileList = function getFileList() {
        var getFileList = {
            "url": "192.168.1.163:6022",
            "ip": "192.168.1.163",
            "port": 6024,
            "cmd": "dlRemoteFileList",
            "title": "test_dl_manifest",
            "fileFileList": "G:\\Dropbox\\projects\\crypto\\mp\\RCExt\\data\\filelists\\http___localhost_6024_.txt",
            "fileManifest": "g:\\Dropbox\\projects\\crypto\\mp\\RCExt\\data\\uploadedLists\\test_dl_manifest.json"
        }

        self.runTask('runcmd',
            getFileList
            ,
            function onUplodateAndRun(a, b, c) {
                console.log('ok', a, b, c)
            }
        )
    }

    p.s2.santizeFileList = function santizeFileList() {
        var cmdData = {
            "url": "192.168.1.163:6022",
            "ip": "192.168.1.163",
            "port": 6024,
            "cmd": "sanitizeFileList",
            "title": "test_dl_manifest",
            "fileFileList": "G:\\Dropbox\\projects\\crypto\\mp\\RCExt\\data\\filelists\\http___localhost_6024_.txt",
            "fileManifest": "g:\\Dropbox\\projects\\crypto\\mp\\RCExt\\data\\uploadedLists\\test_dl_manifest.json"
        }
        self.runTask('runcmd',
            cmdData, function onUplodateAndRun(a, b, c) {
                console.log('ok', a, b, c)
            }
        )
    }

    p.s3.importFilsIntoGlobalCache = function s3_importFilsIntoGlobalCache() {
        self.utils.needs('serverIp')
    }
    p.s3.recreateManifest = function s3_recreateManifest(globalOrFile) {
        self.utils.needs('serverIp')
    }
    p.method = function method() {
        //G:\Dropbox\projects\crypto\ritv\distillerv3\tools\SanitizeName2
    }

    p.test = function test(config) {
    }


    p.runTask = function runTask(name, data, fxDone) {

        self.utils.emitAndCatchResult(name, data, fxDone)
        return;
        if (self.data.socket == null) {
            self.proc('ok socket not ready')
            self.step1_setupSocket()
            self.data.name = name;
            self.data.data = data;
            return;
        } else {
            self.data.socket.emit(name, data)
        }
    }


    p.step1_setupSocket = function step1_setupSocket() {
        //  if ( self.data.skipToDl ) {
        self.data.socket = self.settings.socket
        /* if (self.data.socket) {
         self.chain.nextLink();
         return;
         }*/
        //self.settings.url = 'http://127.0.0.1:14002/'

        self.proc('setup....', self.settings.urlSocket)
        var socket = require('socket.io-client')(self.settings.urlSocket);
        socket.on('connect', function onConnectToSocket() {
            self.data.socket = socket;
            self.data.socket = self.settings.socket = socket;
            self.data.connectedToSrv1x = true
            self.proc('connected')
            if (self.data.name) {
                self.proc('connected.init')
                self.data.socket.emit(self.data.name, self.data.data)
                self.data.name = null;
                self.data.data = null;
            }
            //self.chain.nextLink();
        });
        socket.on('event', function (data) {
        });

        socket.on('disconnect', function () {
            self.proc('lost the mirror')
        });

        socket.on('updateStatus', function onStatusUpdated(e) {
            console.log('updateStatus', e)
            var msg = e.msg;
        });

        socket.on('updateStatus', function onStatusUpdated(e) {
            console.log('updateStatus', e)
            var msg = e.msg;
        });


        self.setTimer()

        return;
    }

    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.getFilePath = function getFilePath(file) {
            var file = self.settings.dir + '/' + file;
            return file;
        }

        p.proc = function debugLogger() {
            if (self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };


        utils.emitAndCatchResult = function emitAndCatchResult(msg, data, fxDone) {

            if (self.data.socket == null) {
                setTimeout(function ok() {
                    console.log('try to do it again')
                    self.proc('ok socket not ready')
                    if (self.data.triedToSetupSocket != true) {
                        self.step1_setupSocket()
                    }
                    self.data.triedToSetupSocket = true
                    utils.emitAndCatchResult(msg, data, fxDone)
                }, 500)
                return;
            }
            console.log('emitting')
            self.data.socket.emit(msg, data)
            var key = null;
            if (key == null && self.data.socket.nextEmitter != null) {
                key = self.data.socket.nextEmitter
            }
            self.data.socket.dict = sh.dv(self.data.socket.dict, {})
            var existingListener = self.data.socket.dict[key];
            if (existingListener != null) {
                console.warn('u already set this ...')
                return; //skip ...
            }
            self.data.socket.dict[key] = fxDone;
            console.info('g-catching', data.cmd)
            self.data.socket.on(data.cmd + '_results', function _onResults(msg) {
                console.info('g-catching', 'result', msg);
                fxDone(msg)

            })

        }

        p.setTimer = function setTimer(config) {
            var currentId = Math.random();
            self.data.currentId = currentId;
            self.data.connectedToSrv1x = false;
            setTimeout(function testIfConnected() {
                if (self.data.currentId == currentId &&
                    self.data.connectedToSrv1x == false) {
                    self.proc('did not connect we have an issue')
                    sh.cid(self.settings.fxDone, 'what is this.... we failed on the url ' + self.settings.url)
                }
            }, 3510)
        }

        p.proc = function debugLogger() {
            if (self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }

    defineUtils()
}

exports.BasicClass3 = BasicClass3;

if (module.parent == null) {
    var instance = new BasicClass3();
    var config = {};
    instance.init(config)
    // instance.test();
    var i = instance;
    i.s2.startDL();
}



