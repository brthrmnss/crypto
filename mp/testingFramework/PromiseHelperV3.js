/**
 *
 *Wrapper on promise library for ease of use
 * @type {{}}
 */
if ( typeof isNode === 'undefined') {
    var isNode = true;
}
if (typeof exports === 'undefined' || exports.isNode == false) {
    isNode = false
}

if ( isNode ) {
    try {
        var sh = require('shelpers').shelpers
    } catch (e ) {
        var sh = require('./shelpers').shelpers
    }
} else {
    if (typeof exports === 'undefined') {
        var exports = {};
    }
    if (typeof module === 'undefined') {
        var module = {};
    }
}
//var Q = require("q");
function PromiseHelperV3() {
    var self = this;
    var p = PromiseHelperV3.prototype;
    self.starter = "--\t\t"
    self.debugName = self.starter + 'PromH'
    self.data = {}
    self.start = function start(arg1) {
        //var deferred = Q.defer();
        // console.log('starting...')
        //debugger
        console.log('starting/', arg1.name, arg1 )
        //deferred.resolve(arg1);
        //deferred.promise.fail(function (error) {
        //setTimeout( function wait500MsForLogToFlush() {
        ///    self.proc("error occured: " + error, JSON.stringify(error))//, error.stack);
        // }, 500)
        //console.error("error occured: " + error);
        // })
        ///self.lastPromise = deferred.promise
        //return deferred.promise;
        setTimeout(self.startNextMethod, 10);
    }
    function defineTransportControlMethods() {
        self.startNextMethod = function () {
            if ( self.isPlaying == false ) {
                self.proc('double end call...');
                return;
            }
            self.data.methods.currentIndex++
            self.currentOperation = self.methods.shift();
            if (self.currentOperation == null) {
                if (self.methods.length == 0) {
                    self.currentMethod = null;
                    if (self.token.name != null) {
                        self.proc('***Chain Complete', self.token.name);
                    } else {
                        console.log('done'); //, self.token.name);
                    }
                    if ( self.token.fxDone != null ) {
                        self.token.fxDone(self.token, self);
                    }
                    sh.callIfDefined(self.token.fxDone2, self)
                    sh.callIfDefined(self.token.fxDone3, self)
                    sh.callIfDefined(self.fxDone, self)
                    sh.callIfDefined(self.fxDone2, self)
                    sh.callIfDefined(self.fxDone3, self)
                    self.isPlaying = false;
                    return;
                }
                setTimeout(self.startNextMethod, 10);
                return
            }

            var meth = self.currentOperation.fx;
            if ( self.currentOperation.fx == null ) {
                meth = self.currentOperation;
            }
            self.currentMethod = meth;
            //method is callled after chain is complete
            self.currentCallback = function currentCallback_onDoneMethod(token) {
                //debugger
                function fxResume() {
                    var defaultTime = sh.dv(self.token.linkDelay, 0);
                    setTimeout(self.startNextMethod, 10 + defaultTime);
                }


                //self.showProgress();
                //self.data.index = asdf
                //self.data.length = self.methods.length; 
                var continueTest = sh.callIfDefined(self.token.fxStep, self, fxResume)
                if( continueTest == false ) {
                    self.currentMethod = null; //break the timer if a pause
                    console.warn('test ended the test early')
                    return;
                }

                fxResume();
            }

            var fxLinkFinishedCB = self.currentCallback;
            //REQ: support timeout delays

            if ( self.token.timeout){
                var _tokenForTimeout = self.token;
                var chainTimeoutHelper = {};
                chainTimeoutHelper.currentMethod = meth;
                setTimeout(function timeoutTimer() {
                    if ( self.currentMethod == chainTimeoutHelper.currentMethod){
                        //debugger;
                        var errorMsg = ['chain link timeout', self.currentMethod.name].join(', ');
                        console.error(errorMsg);
                        self.stop();
                        sh.callIfDefined(_tokenForTimeout.fxError, errorMsg, self);
                        throw new Error(errorMsg)
                    }
                },self.token.timeout*1000)
            }

            /*
             var stillActive = false;
             setTimeout(function warnIfTooLong() {
             if ( stillActive== true) {
             console.warn('this method goes on for long time', self.currentOperation.fx.name)
             }
             },10*1000 );
             fxLinkFinishedCB = function endChain() {
             stillActive = false;
             sh.fxForward(self.currentCallback,arguments );
             }
             */
            self.cb = fxLinkFinishedCB
            self.next = fxLinkFinishedCB
            meth(self.token, fxLinkFinishedCB);


        }

        /**
         * Retry the previous  method. (used when components are not ready)
         * @param delayTime
         */
        self.tryLater = function tryLater(delayTime) {
            self.methods.unshift(this.currentMethod);
            delayTime = sh.dv(delayTime, 500)
            setTimeout(self.startNextMethod, delayTime);
        }
        /**
         * simplify chaining
         * @param arg1
         * @returns {PromiseHelperV2}
         */
        self.startChain = function startChain(token, userSettings) {
            self.processSettings(userSettings)
            self.token = token;
            self.start(token);
            self.methods = []
            self.isPlaying = true;
            return self;
        }
        /**
         * Stop running this chain
         */
        self.stop = function stop() {
            self.methods = [];
            self.isPlaying = false;
            self.token = null; //overkill
        }
    }
    defineTransportControlMethods();

    /**
     * Mix in user settings.
     * @param userSettings
     * @returns {{}|*}
     */
    self.processSettings = function processSettings(userSettings) {
        self.defaultSettings = {}
        self.defaultSettings.addFailHandlerOnEnd = true
        self.defaultSettings.ignoreNull = true
        self.settings = self.defaultSettings;
        self.data = {}
        self.data.methods = {}
        self.data.methods.count = 0
        self.data.methods.currentIndex = 0
        return self.settings;
    }
    /**
     * Add method to work-chain
     * Method will be based 2 parameters,
     * token, and a callback
     * you must call the callback for the chain to proceed
     * @param fx
     * @returns {PromiseHelper}
     */
    self.add = function addNewFxToWorkChain(fx) {
        self.data.methods.count++
        self.methods.push({fx:fx, stack:sh.errors.storeError(6)})
        //self.lastAddition
        //self.lastPromise = self.lastPromise.then(self.w(fx))
        return self;
    }
    /**
     * Add method to work-chain at current step
     * Method will be based 2 parameters,
     * token, and a callback
     * you must call the callback for the chain to proceed
     * @param fx
     * @returns {PromiseHelper}
     */
    self.addNext = function addNext_NewFxToWorkChain(fx, offset) {
        self.data.methods.count++
        var method = {fx:fx, stack:sh.errors.storeError(6)}
        offset = sh.dv(offset,0);
        //self.data.offsetForAddNext++;
        //Remember: we remove method, so to add it next,
        //it goes to front of methods array
        self.methods.splice(offset, 0, method)
        return self;
    }
    //short for add Skip, stub does nothing
    self.addSkip = function addSkip(fx) {
    }
    self.addS = self.addSkip;
    self.sub = {}
    //alias to indicate substesps
    self.sub.add = self.add;
    /**
     * Add unwrapped method.
     * This is syncrhonous, no callback is passed
     * @param fx
     * @returns {PromiseHelper}
     */
    self.addSync = function addSync(fx) {
        self.data.methods.count++
        self.add(
            function rawWrapper (token, callback) {
                fx()
                callback(token)
            }
        )
        return self;
    }
    self.addRaw = self.addSync
    /**
     * Method indicates dev has completed adding methods to chain
     * @param fx
     * @returns {PromiseHelper}
     */
    self.end = function end(fx) {
        if ( self.settings.addFailHandlerOnEnd ) {
            self.failH =  function (error) {
                self.proc("error occurred: " + error);
                console.error("error occurred: " + error);
                console.error("error occurred: " + error.stack);
            } ;
        }
        self.addRaw(function () {
            console.log('finished.................', self.token.name, self.data.methods.count)
        });
        self.proc('added ', self.data.methods.count)
        return self;
    }
    self.showProgress = function showProgress() {
        var percentage  =  (self.data.methods.currentIndex/self.data.methods.count)
        percentage *= 100
        percentage = percentage.toFixed(2)
        percentage += '%'
        console.log(self.debugName, percentage)
        return
        self.proc('%',
            (percentage).toFixed(2), '%', self.data.methods.currentIndex, self.data.methods.count)
        return self;
    }

//    self.rawWrapper = function rawWrapper (token, callback) {
//        callback()
//    }
    self.fail = function fail(fx) {
        self.lastPromise = self.lastPromise.fail(fx)
        return self;
    }
    self.log = function log(arg1) {
        var deferred = Q.defer();
        //action(arg1, arg2, deferred.resolve);
        console.log('done...')
        console.log('log/', arg1)
        deferred.resolve(arg1);
        return deferred.promise;
    }
    self.log = function log(arg1) {
        self.add(function showToken(token, cb) {
            self.proc('log2', sh.toJSONString( self.token) )
            cb();
        })
        return self;
    }
    self.showToken = self.log
//    self.wrapMethod = function wrapMethod(fx) {
//        var wrapperFx = function autoGenWrapper(opts) {
//            var deferred = Q.defer();
//            fx(opts, deferred.resolve);
//            return deferred.promise;
//        }
//        return wrapperFx;
//    }
    self.wrapMethod = function wrapMethod(fx) {
        //this is for prototyping, devs may apply method placeholder
        //that do not exist
        if ( fx == null && self.defaultSettings.ignoreNull == true ) {
            return self.lastPromise;
        }
        var wrapperFx = function autoGenWrapper(token) {
            var deferred = Q.defer();
            function temp(token, resolve) {
                //console.log('-->', fx) //auto trace name
                //console.log('----------->')
                console.log()
                self.showProgress()
                self.data.methods.currentIndex++
                console.log(self.debugName, 'next method', fx.name)
                console.log()
                if ( token == null ) {
                    //we used to show warnings
                    //we have added token to self so if
                    //user forgets to pass it to callback,
                    // we will fix it ...
                    if ( self.settings.showNullTokenWarnings ) {
                        self.proc('token is null')
                    }
                    token = self.token;
                }
                fx(token, deferred.resolve);
            }
            function fxDone() {
                deferred.resolve(token) //auto commit token, and log
            }
            temp(token, fxDone);
            return deferred.promise;
        }
        return wrapperFx;
    }
    self.w = self.wrapMethod;
    //predefined helper methods to simpslify chain config
    self.utils = {}
    function utilsMethods() {
        self.utils.wait10Secs = function wait10Secs(token, callback) {
            if (self.wait == false) {
                callback(token)
                return
            }
            setTimeout(function wait10() {
                callback(token)
            }, 10 * 1000)
            var count = 10;
            var totalTime = 10000
            for (var i = 0; i < count; i++) {
                var time = i * 1000
                setTimeout(function tellTime(time) {
                    console.log((totalTime - time) + '...')
                }, time, time)
            }
        }
        self.utils.wait3Secs = function wait3Secs(token, callback) {
            setTimeout(function wait3() {
                callback(token)
            }, 3 * 1000)
        }
        self.utils.wait = function wait(duration, addToChain) {
            if (duration == null ) {
                duration = 3;
            }
            var fxDelay = function instantWait(token, cb){
                setTimeout(function wait3() {
                    cb(token)
                }, duration * 1000)
            }
            if ( addToChain != false ) {
                self.add(fxDelay);
            } else {
                return fxDelay;
            }
        }
    }
    utilsMethods();

    self.demo  = {}
    self.demo.exampleUsage = function exampleUsage() {
        log(data)
        /*
         .then(pb.searchForTorrent)
         .then(log)
         .then(pb.getFirstQueryResult)
         .then(log)
         .then(pb.convertMagnetLinkToTorrent)
         .then(log)
         */
        //cleanup existing files beforehand(or after)
            .then(wrapMethod(pb.putIORemoveFiles))
            .then(log)
    }

    self.demo.exampleInnerFx = function exampleInnerFx(opts, callback) {
        callback(opts)
    }

    p.proc = function proc() {
        sh.sLog(arguments)
    }

}
//exports.PromiseHelperV2 = PromiseHelperV2;
exports.PromiseHelperV3 = PromiseHelperV3;
if ( module.parent == null && window.testPromise ) {
    /*if ( window.testPromise == false)
     return;*/
    //return
    var self = {}
    self.searchByName = function search(token, cb){
        console.log('searchByName')
        //asdf.g
        cb();
    }

    self.returnMagnetLink = function returnMagnetLink(token, cb){
        setTimeout(function () {
            console.log('returnMagnetLink')
            cb()
        },200)
        ;
    }
    var token = {}
    var work = new PromiseHelperV3();
    token.silentToken = true
    work.wait = token.simulate==false;
    work.startChain(token)
        .add(self.searchByName)
        .log()
        // .add(self.getFirstQuery)
        //  .add(self.convertMagnetLinkToTorrent)
        .log()
        .add(self.returnMagnetLink)
        .end();

}
