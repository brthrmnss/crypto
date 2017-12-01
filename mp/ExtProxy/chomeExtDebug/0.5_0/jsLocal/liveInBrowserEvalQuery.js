var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');


var shelpers = require('shelpers')
var sh = shelpers.shelpers;
var ReloadWatcher = shelpers.ReloadWatcher;
var PromiseHelperV3 = shelpers.PromiseHelperV3;


var LiveInBrowserEval = require('./LiveInBrowserEval.js').LiveInBrowserEval
function LiveInBrowserEvalQuery() {
    var p = LiveInBrowserEvalQuery.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;




        var instance = new LiveInBrowserEval();
        //var config = {};
        //config.tabSessionName = 'kate'
        instance.init(config)
        //  instance.test();

        self.method();
    }

    p.method = function method() {
        self.data.url = self.dataMakeUrl();

        self.data.instance.cacheForXDays(14)
        self.data.instance.goToPage(self.data.url);
        self.data.instance.waitForLoading(10);
        self.data.instance.saveHTML()
        self.data.instance.addELink(function onGetResults() {
            var ppp = ''
            sh.cid(self.settings.fxDone, ppp)
        })
    }

    p.dataMakeUrl = function dataMakeUrl() {


        var opts = {};
        opts.query = ['Amelie', '2001']
        opts.movie = true;

        var url = 'https://rarbg.to/torrents.php?'

        if (opts.movie) {
            url += '+category=14;48;17;44;45;47;50;51;52;42;46'
        }
        if (opts.sort != false) {
            url += '&order=seeders&by=DESC'
        }


        url += '&' + 'search=' + opts.query.join('+')

        self.data.url = url
        console.log('search', url)
        return url;
    }

    p.test = function test(config) {
        self.eval('console.error("testing bot")')
        self.eval('console.error("testing bot2")')
        self.eval('console.error("testing bot3")')
        self.eval('console.error("testing bot4")')
        self.eval('console.error("testing bot5")')
        return
    }


    function defineUtils2() {
        p.connect = function debugLogger() {
            if (self.silent == true) {
                return;
            }
            sh.sLog(arguments);

            var instance = new ReloadWatcher();
            var config = {};
            instance.init(config)
            instance.connectSocket(function onConnected(socket) {
                console.log('connect to port')
                self.data.socketConnected = true;
                self.data.socket = socket;

                self.data.socket.emit('window.eval', {
                    evalBrowserName: self.settings.tabName,
                    evalStr: 'console.log("booo")'
                })

                self.data.socket.on('window.eval.result', function (data) {
                    if (data.evalBrowserName != self.settings.tabName) {
                        return;
                    }
                    console.log('window.eval.result', data)
                    sh.cid(self.data.fxDoneResult, data)
                    //self.data.fxDoneResult = null;
                });
            });
        };

        p.onConnected = function onConnected() {
            if (self.silent == true) {
                return;
            }
            sh.sLog(arguments);


        };
        p.sendEvalStr = function sendEvalStr(evalStr, fxDone) {
            self.data.fxDoneResult = fxDone;
            self.data.socket.emit('window.eval', {
                evalBrowserName: self.settings.tabName,
                evalStr: evalStr
            })
        };

        p.nextItem = function onNextITem() {
        }


        p.eval = function eval(str) {
            if (self.data.work == null || self.data.work.running == false) {
                var token = {}

                var work = new PromiseHelperV3();
                token.silentToken = true
                work.wait = token.simulate == false;
                self.data.t = work;
                console.log('what is', self.importFilesIntoFileDB)
                work.startChain(token)

                    .add(function waitForConnection() {
                        function onIsReady() {
                            if (self.data.socketConnected == true) {
                                self.data.work.cb()
                                return;
                            }
                            setTimeout(onIsReady, 250)
                        }

                        setTimeout(onIsReady)
                    })

                self.data.work = work;
            }
            /* if (   ) {

             }*/
            if (self.socketInit != true) {
                self.socketInit = true;
                self.connect();
            }


            self.data.t.add(function onNewChain() {

                console.log('cmd:', str)

                self.sendEvalStr(str, function onResponse(data) {
                    console.log(sh.t, 'ok', str)
                    self.data.work.cb();
                });

            })

        }

    }

    defineUtils2()


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
    }

    defineUtils()
}

exports.LiveInBrowserEvalQuery = LiveInBrowserEvalQuery;

if (module.parent == null) {
    var instance = new LiveInBrowserEvalQuery();
    var config = {};
    config.tabName = 'kate'
    instance.init(config)
    instance.test();

}



