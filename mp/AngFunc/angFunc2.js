var isNode = true

if (typeof exports === 'undefined' || exports.isNode == false) {
    isNode = false
}

if ( isNode ) {
    var sh = require('shelpers').shelpers
    var properties = require('properties')
    var fs = require('fs')
    var path = require('path')
}


//todo: add update numbers
//todo: bind to properties
//todo: monitor from properties
//todo: dispatch events to library to move a chain
//todo: better debugging
//todo: how to test?
//todo: sum input from 2 sources. Require both to be set, or any
//todo: clean up ...

function AngFxChain() {
    var self = this;
    var p = self;

    self.parent = [];
    self.children = [];

    self.isChainLink = true

    p.init = function init(opts){
        self.settings = opts
    }

    p.addParent = function addParent(p, desc) {
        self.parents.push({p:p, desc:desc})
    }

    p.addChild = function addChild(p, desc) {
        self.children.push({p:p, desc:desc})
    }

    p.incomingWrapper = function incomingWrapper(data){
        if ( self.chain.paused ) {
            //logger.debug(self.chain, 'paused')
            return;
        }
        self.incoming(data)
    }

    p.incoming = function incoming(data){

    }

    p.outgoing = function outgoing (data){
        self.outgoingWrapper(data)
    }

    p.outgoingWrapper = function outgoingWrapper (data){
        sh.each(self.children, function sendToChildren(i,child) {
            child.incomingWrapper(data);
        });
    }


    p.setInterval = function setInterval2_(fx, int){
        function fx2() {
            //handle pauses
            if ( self.paused() )
                return;
            fx()
        }
        self.int = setInterval(fx2, int)


    }

    p.pause = function pause() {

    }

    function defineUtils() {
        p.paused = function paused() {
            if ( self.chain.paused == true ) {
                return true;
            }
            if ( self.paused == true ) {
                return true;
            }
            return false;
        }

        p.noInput = function addInputBlock(reason) {
            self.incoming = function blockedInput(data) {
                throw new Error('no input allowed. ' + reason); //on type?
            }
        }
    }
    defineUtils();

}

function DS() {
    var self = this;
    var p = self;
    self.isChain = true;
    p.init = function init(opts) {
        self.settings = opts;
        self._chainLinks = [];
        self._recivers = []; //Chains that 'do' things with data.
        //if not recievers are present, chain should not emit values
        //except for composition
    }
    p.addLink = function addLink(link) {
        if ( self.lastLink ) {
            self.lastLink.children.push(link);
        }
        self._chainLinks.push(link)
        self.lastLink = link
        self.lastLink.chain = self;
    }

    /**
     * Manually trigger update
     * howto: manually trigger updates - stream.trigger(val);
     * @param data
     */
    p.trigger = function trigger(data) {
        if ( self._chainLinks.length == 0 ) {
            throw new Error('No links defined')
        }

        self._chainLinks[0].outgoing(data);
    };

    /**
     * Adds new chain generate to DS class
     * howto: add new chain types
     * @param data
     */
    p.addLinkMethod = function addLinkMethod( property, fx) {
        function createNewLinkFromFx() {
            var args = sh.convertArgumentsToArray(arguments);
            var link = sh.callIfDefined(fx, args);
            return self;
        }
        self[property] = createNewLinkFromFx;
    };

    DS.addLinkMethod = p.addLinkMethod;

    function defineMathUtils() {
        p.average = function average(numElementsToAverage) {
            var link = new AngFxChain();
            link.init({numElementsToAverage:numElementsToAverage})
            link.dataCache = [];
            link.incoming = function avgIncoming(data) {
                //do have required number,
                if ( link.dataCache.length < numElementsToAverage ) {
                    link.dataCache.push(data);
                    return;
                }
                var sum = 0;
                for( var i = 0; i < link.dataCache.length; i++ ){
                    sum += /*parseInt(*/ link.dataCache[i]/*, 10 );*/
                }
                //console.log('...', sum, link.dataCache)
                var avg = sum/link.dataCache.length;
                //if yes, push out update
                link.outgoing(avg);

                link.dataCache = [];
            }
            self.addLink(link);
            return self;
        }
        p.avg = p.average;

        p.sum = function sum(numElementsToStore) {
            function sumData(dataValues) {
                var sum = 0;
                for( var i = 0; i < dataValues.length; i++ ){
                    sum +=  dataValues[i]
                }
                return sum;
            }
            return self.collect(numElementsToStore,sumData);
        };

        p.max = function max(maxValue) {
            var link = new AngFxChain();
            link.init({maxValue:maxValue})
            link.incoming = function storeIncoming(data) {
                if ( data > maxValue ) {
                    return;
                }
                link.outgoing(data);
            }
            self.addLink(link);
            return self;
        };

    }
    defineMathUtils();

    function defineTimeBasedUtils() {
        /**
         * 2 algos. 1 is check at interval , other is wait for update then check
         *
         * @param time
         * @param onlyUpdateWhenChanged - will not send values if have not changed, will only update when
         * new value comes in - default:false
         * @param updateOnInterval -
         * @param keepXValues - if set to 1, will only keep most recent value - default: true
         * @param fireCacheAsArray - if true will send entire cache as 1 block - default: false
         * @returns {DS}
         */
        p.quantize = function quantize(time, onlyUpdateWhenChanged, updateOnInterval,
                                       keepXValues, fireCacheAsArray) {
            var link = new AngFxChain();
            link.init({numElementsToStore:numElementsToStore})
            link.dataCache = [];
            link.incoming = function storeIncoming(data) {
                //do have required number,
                if ( link.dataCache.length < numElementsToStore ) {
                    link.dataCache.push(data);
                    return;
                }
                var dataSend = link.dataCache;
                dataSend = sh.callIfDefined(fxTranformData,dataSend);
                link.outgoing(dataSend);
                link.dataCache = [];
            }
            self.addLink(link);
            return self;
        };
    }
    defineTimeBasedUtils()

    function defineUtilChains() {
        p.collect = function collect(numElementsToStore, fxTranformData) {
            var link = new AngFxChain();
            link.init({numElementsToStore:numElementsToStore})
            link.dataCache = [];
            link.incoming = function storeIncoming(data) {
                //do have required number,
                if ( link.dataCache.length < numElementsToStore ) {
                    link.dataCache.push(data);
                    return;
                }
                var dataSend = link.dataCache;
                dataSend = sh.callIfDefined(fxTranformData,dataSend);
                link.outgoing(dataSend);
                link.dataCache = [];
            }
            self.addLink(link);
            return self;
        };

        p.fx = function addGenericFx(fx, sendData) {
            sendData = sh.dv(sendData,true)
            var link = new AngFxChain();
            link.init({fx:fx})
            link.incoming = function storeIncoming(data) {
                if ( data > maxValue ) {
                    return;
                }
                fx(data);
                if ( sendData != false ) {
                    link.outgoing(data);
                }
            }
            self.addLink(link);
            return self;
        };

        p.pause = function pause(numSecsToDelay) {
            var link = new AngFxChain();
            link.init({numSecsToDelay:numSecsToDelay})
            if (numSecsToDelay > 0 ) {
                setTimeout(function resumeChain() {
                    self.paused = false;
                }, numSecsToDelay*1000)
            }
            self.paused = true;
            return self;
        };

        p.resume = function resume() {
            self.paused = false;
            return self;
        };

        /**
         * Chain delays output of chain for fixed number fo seconds
         * @param numSecsToDelay
         * @returns {DS}
         */
        p.delay = function delay(numSecsToDelay) {
            numSecsToDelay = sh.dv(numSecsToDelay, 1);
            var link = new AngFxChain();
            link.init({numSecsToDelay:numSecsToDelay})
            link.incoming = function storeIncoming(data) {
                setTimeout(function delayChain() {
                    link.outgoing(data);
                }, numSecsToDelay*1000)
            }
            self.addLink(link);
            return self;
        }

        p.unique = function unique(numElementsToStore) {
            numElementsToStore = sh.dv(numElementsToStore)
            var link = new AngFxChain();
            link.init({numElementsToStore:numElementsToStore})
            link.dataCache = [];
            link.incoming = function storeIncoming(data) {

                if ( link.dataCache.indexOf(data) != -1 ) {
                    return;
                }
                link.dataCache.push(data);
                if ( link.dataCache.length > numElementsToStore ) {
                    link.dataCache.shift();
                };
                link.outgoing(data);

            }
            self.addLink(link);
            return self;
        }
    }
    defineUtilChains();

    function defineAffectors() {
        p.bindToUI = function bindToUI(jquery, prop) {
            var link = new AngFxChain();
            link.init({jquery:jquery, prop:prop})
            link.incoming = function avgIncoming(data) {
                $(jquery)[prop](data)
                link.outgoing(avg)
            }
            self.addLink(link);
            return null; //tecnically it is over
            //but the value can be reused
        }
    }
    defineAffectors();

    function defineUtils() {
        p.log = function log(preamble) {
            var link = new AngFxChain();
            link.init({preamble:preamble})
            link.incoming = function incoming(data) {
                //todo: if any arguments false, remove data
                if ( link.chain.silenceChain ) {
                    link.outgoing(data);
                    return;
                }
                var args = [data]
                if ( preamble) {
                    args.unshift(preamble)
                }
                console.log.apply(console, args)
                link.outgoing(data);
            }
            self.addLink(link);
            return self;
        }

        p.silent = function silent() {
            self.silenceChain = true;
            return self;
        }
        p.unsilent = function silent() {
            self.silenceChain = false;
            return self;
        }
    }
    defineUtils();

}

function AngFunc() {
    var self = this;
    var p = self;

}

AngFunc.createDataStream = function createDataStream_HelperMethod(name, opts) {
    var ds = new DS();
    //console.log(name.isChainLink==true)

    ds.name = name;
    ds.init(opts);

    if ( name.isChainLink ) {
        ds.addLink(name)
        ds.name = null;
    }

    if ( name.isChain ) {
        ds.addLink(name.lastLink)
        ds.parentChain = name;
        ds.name = null;
    }

    return ds;
}
AngFunc.createDS = AngFunc.createDataStream;

function defineGenerators() {
    AngFunc.sin = function sin(period, updateTime ,updatesPerSecond) {
        var link = new AngFxChain();
        updateTime = sh.dv(updateTime, 100)
        link.init({period:period, updateTime:updateTime})
        link.incoming = function avgIncoming(data) {
            throw 'no input allowed on sinwave'
        }
        link.period = 0;
        link.setInterval(
            function sendUpdate() {
                link.period++
                var val = Math.sin(link.period)
                console.log('generate...', val)
                link.outgoing(val);
            }, updateTime);
        return link;
    };

    AngFunc.incrementCounter = function createIncrementCounter(updateTime) {
        var link = new AngFxChain();
        updateTime = sh.dv(updateTime, 1000)
        link.init({updateTime:updateTime})
        link.noInput('counter up takes no input');
        link.value = 0;
        link.setInterval(
            function sendUpdate() {
                link.value++
                var val = link.value;
                //console.log('generate...')
                link.outgoing(val);
            }, updateTime);
        return link;
    }
    AngFunc.decrementCounter = function createDecrementCounter(updateTime) {
        var link = new AngFxChain();
        updateTime = sh.dv(updateTime, 1000)
        link.init({updateTime:updateTime})
        link.noInput('counter down takes no input');
        link.value = 0;
        link.setInterval(
            function sendUpdate() {
                link.value--
                var val = link.value;
                //console.log('generate...')
                link.outgoing(val);
            }, updateTime);
        return link;
    }


    AngFunc.combine = function combine(streams, requireFullSet) {
        var link = new AngFxChain();
        requireFullSet = sh.dv(requireFullSet, true);
        link.init({streams:streams});
        link.incoming = function takeInput(data, dataUpdate) {

            link.outgoing(data);
        }
        sh.each(streams, function addToLinks(i,stream) {
           stream.addLink(link);
        });
        return link;
    }



    AngFunc.monitorProperty = function monitorProperty(fxGetVal, updateTime, onlyUpdateWhenChanged) {
        var link = new AngFxChain();
        updateTime = sh.dv(updateTime, 100)
        link.init({period:period, updateTime:updateTime})
        link.noInput('counter up takes no input');
        link.value = null;
        link.lastVal = null;
        link.setInterval(
            function sendUpdate() {
                link.value++
                var val = fxGetVal();
                if (onlyUpdateWhenChanged && val == link.lastVal) {
                    return;
                }
                link.outgoing(val);
            }, updateTime);
        return link;
    }

    /**
     * Invokes jquery method to get value
     * @param jquery
     * @param prop
     * @param updateTime
     * @param onlyUpdateWhenChanged
     */
    AngFunc.jqueryUI = function monitorProperty(jquery, prop, updateTime, onlyUpdateWhenChanged) {
        function fxGetJqueryVal() {
            $(jquery)[prop]();
        }
        return AngFunc.monitorProperty(fxGetJqueryVal, updateTime, onlyUpdateWhenChanged);
    }
}
defineGenerators();

var aFx = AngFunc;
var angFunc = AngFunc;
//var x = new AngFunc();

//general from to
//aFx.createDS('#asdf').avg(2).bindToUI('#my', 'opacity');
function testBasic() {
    var dsSineWave2 = angFunc.createDS(angFunc.sin(1)).log(false).avg(2)
        .log('after avg').collect(10).log('collect 10',false)
        .delay(2).pause(2).log('paused').silent();
//var dsSineWave = angFunc.createDS(angFunc.sin(1)).avg(2).log();
    dsSineWave2.dispose();




    aFx.addLinkMethod = DS.addLinkMethod;
    aFx.addLinkMethod('addPlus1', function addPlus1(amountToAdd) {
        var link = new AngFxChain();
        amountToAdd = sh.dv(amountToAdd, 1)
        link.init({amountToAdd:amountToAdd});
        link.incoming = function (data) {
            link.outgoing(data+amountToAdd);
        }
        return link;
    })


    angFunc.createDS(dsSineWave2).log('composed stream');
}

function testDualSources () {
    var up = angFunc.createDS(angFunc.incrementCounter()).delay(0.5).log('up');
    var down = angFunc.createDS(angFunc.decrementCounter()).log('down');

     var combine = aFx.createDS(angFunc.combine([up, down], true)).log('combined')
   // var combine = aFx.createDS(angFunc.combine(up, down, false)).log('combined')
}

if ( isNode ) {
    testDualSources();
}




/*
 process.exit();



 //compose streams
 angFunc.createDS(dsSineWave).bindToUI('#my', 'opacity');
 angFunc.bindToUI('#my').sum(dsSineWave).named('update text form sinWave')

 //bind to scope
 angFunc.createDS(angFunc.sin(1)).avg(2).setScope($scope, 'sineWav').desc('sin wave on scope');

 //bind from element property  'text',
 //bind from scope propty
 angFunc.createDS($scope, 'sineWav').named('bind from scope').fx(function updatedScope(){console.log('scope')})

 //trigger a ds
 //binding from 'pump'
 //bind when user hovers over an area?
 */