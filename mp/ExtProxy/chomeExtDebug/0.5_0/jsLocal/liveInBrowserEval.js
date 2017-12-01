var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');


var shelpers = require('shelpers')
var sh = shelpers.shelpers;
var ReloadWatcher = shelpers.ReloadWatcher;
var PromiseHelperV3 = shelpers.PromiseHelperV3;

function LiveInBrowserEval() {
    var p = LiveInBrowserEval.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}
    self.data.count = 0;
    self.data.stepFlags = {};

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;
        //self.settings.tabName = 'kate'
        sh.throwIfNull(self.settings.tabName, 'need a tab name')
        self.method();
    }

    p.method = function method() {
    }

    p.test = function test(config) {
        if (self.settings.fxActions) {
            sh.cid(self.settings.fxActions, self)
            return;
        }
        self.eval('console.error("testing bot")')
        self.eval('console.error("testing bot2")')
        self.eval('console.error("testing bot3")')
        self.eval('console.error("testing bot4")')
        self.eval('console.error("testing bot5")')
        return
        self.eval('alert("testing bot")')
        self.eval('alert("testing bot 2")')
    }


    function defineUtils2() {
        p.connect = function connectSocket() {
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

                function ensureSocketIsConnected() {
                    //return;
                    self.data.foundTab = false;
                    setTimeout(function hvaeFoundTab() {
                        if (self.data.foundTab == false) {
                            console.log('open tab')
                            var arr = [
                                sh.qq("C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"),
                                '--user-data-dir=c:/trash/ws', '--new-window',
                                sh.qq('www.yahoo.com?boomboom=true&evalBrowserName=' + self.settings.tabName)
                            ]
                            var url = arr.join(' ')
                            console.log('open url', url)
                            sh.runAsync(url)

                            function retrySetup() {
                                onConnected(socket)
                            }

                            setTimeout(retrySetup, 2200)
                        }
                    }, 1200)
                }

                ensureSocketIsConnected();

                self.data.socket.on('window.eval.result', function (data) {
                    if (data.evalBrowserName != self.settings.tabName) {
                        return;
                    }
                    if (data.locationTest == true) {
                        console.log('ok....', data)

                        //
                        //
                        //debugger;
                    }
                    if (self.data.foundTab != true) {
                        var newItem = true;
                    }
                    self.data.foundTab = true
                    if (newItem) {
                        console.log('----connected')
                        return;
                    }
                    console.error('-->window.eval.result', data)
                    console.log()
                    sh.cid(self.data.fxDoneResult, data)
                    //self.data.fxDoneResult = null;
                });


                /* self.data.socket.on('window.eval.result.location', function onLocationX(data) {
                 if (data.evalBrowserName != self.settings.tabName) {
                 return;
                 }
                 self.data.foundTab = true
                 console.log('window.eval.result.location', data)
                 sh.cid(self.data.fxDoneResult, data)
                 //self.data.fxDoneResult = null;
                 });*/
            });
        };

        p.onConnected = function onConnected() {
            if (self.silent == true) {
                return;
            }
            sh.sLog(arguments);


        };
        p.sendEvalStr = function sendEvalStr(evalStr, fxDone, noReturn) {
            self.data.fxDoneResult = fxDone;
            self.data.socket.emit('window.eval', {
                evalBrowserName: self.settings.tabName,
                noReturn: noReturn,
                evalStr: evalStr
            })
        };

        p.nextItem = function onNextITem() {
        }


        p.storeHTML = function storeHTML(url) {
            //  var str2 = 'window.location='+sh.qq(url);
            var str2 =
                `
                var html = $('html').html();
                //returnData.storeVal = html
                html
                `
            //   self.data.stepFlags.locationTest = true;
            var cfgStep = {}
            cfgStep.fxDoneStep = function onStore(data) {
                self.data.valHtml = data.result
            }
            self.eval(str2, cfgStep)
        }
        p.waitForLoad = function waitForLoad(url) {
            var str2 =
                `
                $(document).ready(function onIfReady () {
                    console.log('ready on return' ,'it')
                    sendResponse()
                });
                `
            //   self.data.stepFlags.locationTest = true;
            var cfgStep = {}
            cfgStep.noReturn = true;
            cfgStep.fxDoneStep = function onStore(data) {
                self.data.valHtml = data.result
            }
            self.eval(str2, cfgStep)
        }
        p.goToUrl = function goToUrl(url) {
            //  var str2 = 'window.location='+sh.qq(url);
            var str2 =
                `
                if ( window.location!=` + sh.qq(url) + ` ) {
                    window.location=` + sh.qq(url) + `;
                } else {
                    returnData.locationTest = true;
                }
                `
            self.data.stepFlags.locationTest = true;
            self.eval(str2)
        }
        p.alert = function alert(url) {
            //  var str2 = 'window.location='+sh.qq(url);
            var str2 =
                `
               alert('okok');
                `
            self.eval(str2)
        }
        p.eval = function eval(str, stepCfg) {
            stepCfg = sh.dv(stepCfg, {});
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

                token.fxDone = self.settings.fxDone;
                self.data.work = work;
            }
            /* if (   ) {

             }*/
            if (self.socketInit != true) {
                self.socketInit = true;
                self.connect();
            }


            let stepFlags = self.data.stepFlags
            stepFlags = sh.dv(stepFlags, {})
            self.data.stepFlags = {}
            //self.data.stepFlags.locationTest

            self.data.t.add(function onNewChain() {

                console.log('')
                self.data.count++;
                console.log(self.data.count, 'cmd:', str)

                 self.data.stepFlags = stepFlags //assum ethis is stale and force it to be global

                self.sendEvalStr(str, function onResponse(data) {
                    if (stepFlags.locationTest && data.locationTest != true) {
                        console.log('... locationTest blocking', data)
                        return;
                    } else {
                        console.log('continuing')
                    }
                    if (self.data.stepFlags.locationTest != true && data.locationTest == true) {
                        console.error('... locationTest bad response ignoring', data)
                        return;
                    }
                    console.log(sh.t, 'ok', str)
                    sh.cid(stepCfg.fxDoneStep, data)
                    self.data.work.cb();
                }, stepCfg.noReturn);

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

exports.LiveInBrowserEval = LiveInBrowserEval;

LiveInBrowserEval.request = function requestLIBImpersonator(opts, callback2) {
    var instance = new LiveInBrowserEval();
    var config = {};
    config.tabName = 'LibImpersonator'
    config.fxDone = function ok(a, b, c) {
        //+++++console.log('done', a, b, c)
        // console.log(instance.data.valHtml)
        var resp = {}
        resp.statusCode = 200
        console.log('live browser eval done')
        callback2(null, resp, instance.data.valHtml)
        // return
        // debugger
    }
    instance.init(config)

    var self = instance;
    config.fxActions = function fxActions() {
        // self.waitForLoad()
        // self.alert()
        // return
        self.eval('console.error("testing bot--2")')
        // self.eval('console.error("testing bot--3")')
        self.goToUrl(opts.url)
        //self.alert()
        self.waitForLoad()
        // self.data.t.utils.wait(2)
        self.storeHTML()
        //self.eval('console.error("testing bot--4")')
        //self.eval('alert("ok")')
        self.eval('console.error("testing bot--5")')
        //$(document).ready(function(){...});


    }
    instance.test();


}
if (module.parent == null) {
    var instance = new LiveInBrowserEval();
    var config = {};
    config.tabName = 'kate'
    instance.init(config)
    //instance.test();


    var opts = {}
    opts.url = 'https://news.ycombinator.com/'
    LiveInBrowserEval.request(opts, function onK(err, resp, body) {
        console.log('finished', err, resp, body)
    })

}



