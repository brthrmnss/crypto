var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var request = require('request');
var CachedFileDataStore = require('./CachedFileDataStore').CachedFileDataStore;

function SearchPBCachedRequest() {
    var p = SearchPBCachedRequest.prototype;
    p = this;
    var self = this;
    self.settings = {};
    self.data = {};
    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;
        config.fileExt = sh.dv(config.fileExt, '.txt')

        self.settings.redoCountMax = sh.dv(config.redoCountMax, 3)
        self.settings.redoCount   = sh.dv(config.redoCount, 0)

        self.method();


        var instance = new CachedFileDataStore();
        var config = {dir:'SearchPBCachedRequests'};
        if ( self.settings.dir ) {
            config.dir = self.settings.dir;
        }
        config.cachedTime = 14*sh.time.days;
        config.cachedTime = 10*14*sh.time.days;
        instance.init(config)
        //instance.test();
        self.d = instance
    }

    p.method = function method(config) {
    }

    p.getFileFromRequest = function getFileFromRequest(url) {
    }

    p.request = function request_ImpersonatorProxy(opts, callback) {
        //var oldFx = opts.fx;
        // if ( oldFx ) {
        //}

        self.lastRequestMade = false;
        self.lastKey = null
        //self.utils.getFileFromRequest()
        var filename = sh.join([opts.url])
        filename = sh.stripSpecialChars(filename)
        if ( self.settings.fileExt) {
            filename +=  self.settings.fileExt ;//'.txt'
        }

        if ( self.data.forceNextRequest ) {
            self.data.forceNextRequest = false;
            self.d.clear(filename)
        }
        var test = self.d.get(filename);

        if (self.settings.ignoreIf) {
            if (sh.includes(test, self.settings.ignoreIf, true )) {
                self.d.clear(filename);
                test = null;
            };
        };

        if ( test && test != 'undefined') {
            if ( self.settings.dbg ) {
                self.proc('saved prev');
            }
            callback(null, {}, test)
            return;
        }
        self.lastRequestMade = true;

        opts.gzip = true;

        request(opts, function onRecievePBResults(err, resp, body) {
            if (resp == null) {
                // var msg = 'SearchPB.js resp is null ' + url
                //console.error(msg)
                //self.bail(msg)
                // return;
            }


            /*   if( resp.headers != null && resp.headers['content-encoding'] == 'gzip'){
             var zlib = require('zlib');
             zlib.gunzip(body, function(err, dezipped) {
             //callback(dezipped.toString());
             resp.headers['content-encoding'] = null
             onRecievePBResults(err, resp, dezipped.toString())
             });
             return;
             } else {
             // callback(body);
             }
             */
            //save
            self.lastKey = filename;

            var redo = false;
            if ( body ) {
                body = body.toString();
            }
            self.d.set(filename, body);
            if (self.settings.ignoreIf) {
                if (sh.includes(body, self.settings.ignoreIf, true )) {
                    self.d.clear(filename);
                    redo = true
                };
            };
            if ( null == body ) {
                self.d.clear(filename);
                redo  = true ;
            };
            if ( err != null ) {
                debugger
                redo  = true ;
            }

            if ( self.settings.redoCountMax ) {
                if (redo && self.settings.redoCount < self.settings.redoCountMax) {
                    self.settings.redoCount++;

                    self.proc('redoing', self.settings.redoCount, self.settings.redoCountMax)
                    setTimeout(function retryAgain() {
                        self.request(opts, callback)
                    }, 10 * 1000)
                    return;
                }
            }
            sh.callIfDefined(callback, err, resp, body);
        })
    }

    p.updateLastKey = function updateLastKey(contents) {
        if  ( self.lastKey == null ) {
            throw new Error('no last key')
        }

        self.d.set(filename, body.toString());
    }

    p.test = function test(config) {
        self.data.forceNextRequest =  true;
        var opts = {};
        opts.url = 'http://www.yahoo.com'

        p.request(opts, function testCompleted() {
            console.error('...')


            p.request(opts, function testCompleted2() {
                if (self.lastRequestMade) {
                    console.error('...', lastRequestMade)
                }

            })
        })
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
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


