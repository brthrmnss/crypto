var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var request = require('request');
var LiveInBrowserEval = sh.require('mp/ExtProxy/chomeExtDebug/0.5_0/jsLocal/liveInBrowserEval.js').LiveInBrowserEval
var CachedFileDataStore = require('./CachedFileDataStore').CachedFileDataStore;

function SearchPBCachedRequest() {
    var p = SearchPBCachedRequest.prototype;
    p = this;
    var self = this;
    self.settings = {};
    self.data = {};
    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        self.settings.timeout = sh.dv(self.settings.timeout, 1000);

        config = self.settings;
        config.fileExt = sh.dv(config.fileExt, '.txt')

        self.settings.redoCountMax = sh.dv(config.redoCountMax, 3)
        self.data.redoCount = 0;
        self.settings.redoDelayTimeSecs = sh.dv(config.redoDelayTimeSecs, 10)

        self.method();

        var instance = new CachedFileDataStore();
        var config = {dir: 'SearchPBCachedRequests'};
        if (self.settings.dir) {
            config.dir = self.settings.dir;
        }
        config.cachedTime = 14 * sh.time.days;
        config.cachedTime = 10 * 14 * sh.time.days;
        instance.init(config)
        //instance.test();
        self.d = instance;
    }

    p.method = function method(config) {
    }

    p.getFileFromRequest = function getFileFromRequest(url) {
    }

    p.request = function request_ImpersonatorProxy(opts, callback2) {
        function callback(a, b, c, cached) {
            var args = sh.args(arguments)
            if (cached != true) {
                //debugger
            }
            callback2.apply(self, args)
        }

        //var oldFx = opts.fx;
        // if ( oldFx ) {
        //}
        self.lastRequestMade = false;
        self.lastKey = null
        //self.utils.getFileFromRequest()
        var filename = sh.join([opts.url])
        filename = sh.stripSpecialChars(filename)
        if (self.settings.fileExt) {
            filename += self.settings.fileExt;//'.txt'
        }

        if (self.data.forceNextRequest) {
            self.data.forceNextRequest = false; //clear flag
            self.d.clear(filename)
        }


        var cachedResponse = self.d.get(filename);

        if (self.settings.cacheOnly) {
            var cachedResponse = self.d.get(filename, true);
            if (cachedResponse == null) {
                cachedResponse = 'cacheOnly'
            }
        } else {


            if (self.settings.noCache) {
                //self.data.forceNextRequest = false;
                cachedResponse = null;
            }


            if (self.settings.ignoreIf) {
                if (sh.includes(cachedResponse, self.settings.ignoreIf, true)) {
                    self.d.clear(filename);
                    cachedResponse = null;
                }
                ;
            }
            ;
            if (self.settings.ignoreIf2) {
                if (sh.includes(cachedResponse, self.settings.ignoreIf2, true)) {
                    self.d.clear(filename);
                    cachedResponse = null;
                }
                ;
            }
            ;

        }


        if (cachedResponse && cachedResponse != 'undefined') {
            if (self.settings.dbg) {
                self.proc('saved prev');
            }
            callback(null, {}, cachedResponse, true)
            return;
        }
        if ( opts.mustHitCache ) {
            sh.throw('did not hit cache')
        }
        self.lastRequestMade = true;

        opts.gzip = true;

        if (opts.timeout == null) {
            opts.timeout = self.settings.timeout;
        }


        var timer = sh.timer()
        var indx = setInterval(function displayCount() {
            var timeRemaining = ((opts.timeout - timer.ms()) / 1000).toFixed(0)
            console.log(sh.t, sh.t, 'waiting for', opts.url, timeRemaining, opts.timeout)
        }, 1000)


        if ( opts.mode2) {
            LiveInBrowserEval.request (opts, onRecievePBResults)
        } else {
            request(opts, onRecievePBResults)
        }

        function onRecievePBResults(err, resp, body) {
            if (resp == null) {

            }

            clearInterval(indx)

            self.lastKey = filename;

            var redo = false;
            if (body) {
                body = body.toString();
            }
            self.d.set(filename, body);
            if (self.settings.ignoreIf) {
                if (sh.includes(body, self.settings.ignoreIf, true)) {
                    self.d.clear(filename);
                    redo = true
                }
                ;
            }
            ;
            if (self.settings.ignoreIf2) {
                if (sh.includes(body, self.settings.ignoreIf2, true)) {
                    self.d.clear(filename);
                    redo = true
                }
                ;
            }
            ;

            if (null == body) {
                self.d.clear(filename);
                redo = true;
            }
            ;

            if (err != null) {
                console.error('url-spcr failed', opts.url, err.code, opts.timeout)
                //debugger
                redo = true;
            }

            if (self.settings.redoCountMax) {
                if (redo) {
                    if (self.data.redoCount < self.settings.redoCountMax) {
                        self.data.redoCount++;
                        var redoDelayTimeSecs = self.settings.redoDelayTimeSecs;
                        self.proc('redoing in ', redoDelayTimeSecs, 'secs', self.data.redoCount, self.settings.redoCountMax, opts)
                        setTimeout(function retryAgain() {
                            console.error('resume', opts.url)
                            self.request(opts, callback)
                        }, redoDelayTimeSecs * 1000)
                        return;
                    } else {

                    }
                }
            }

            function onFinishedRequest() {
                sh.callIfDefined(callback, err, resp, body);
            }


            if (self.settings.ifNotFoundInCacheAddDelaySecs) {
                var delaTime = 1
                var ifNotFoundInCacheAddDelaySecs = self.settings.ifNotFoundInCacheAddDelaySecs
                if (ifNotFoundInCacheAddDelaySecs) {
                    //    asdf.g
                    delayTime = 1000 * ifNotFoundInCacheAddDelaySecs
                    console.log(sh.t, '-->delay for', delayTime)
                }
                setTimeout(onFinishedRequest, delayTime)
                //var delayTime = sh.dv(self.settings.ifNotFoundInCacheAddDelaySecs

            } else {
                onFinishedRequest();
            }
        }
    }

    p.updateLastKey = function updateLastKey(contents) {
        if (self.lastKey == null) {
            throw new Error('no last key')
        }

        self.d.set(filename, body.toString());
    }

    p.test = function test(config) {
        self.data.forceNextRequest = true;
        var opts = {};
        opts.url = 'http://www.yahoo.com'

        opts.mode2 = true;
        p.request(opts, function testCompleted() {
            console.error('...')
            opts.mustHitCache = true
            p.request(opts, function testCompleted2() {
                if (self.lastRequestMade) {
                    console.error('...', lastRequestMade)
                }

            })
        })
    }

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.SearchPBCachedRequest = SearchPBCachedRequest;

if (module.parent == null) {
    var instance = new SearchPBCachedRequest();
    var config = {};
    instance.init(config)
    instance.test();

}


