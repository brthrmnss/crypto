/**
 * Why: class is an example iterator for JSONSetIterator_Generic
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function JSONSetIterator_Generic() {
    var p = JSONSetIterator_Generic.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}
    self.data.itemCount = 0;
    self.name = 'rename';

    p.init = function init(config) {
        //self.name = JSONSetIterator_Generic.iteratorName;
        self.settings = sh.dv(config, {});
        //if ( self.settings.it ) {
        self.name = self.settings.it.iteratorName;
        //}
        config = self.settings;
        self.data.matches = [];
    }


    self.isAmz = function isAmz() {
        var validMatches = self.settings.it.matchesDefault;

        if ( self.item.description == 'Sprint PCS'){
            // debugger;
        }

        if ( self.item.description == 'Time Warner' &&
            self.settings.name == 'Utilities'){
            debugger;
        }
        var addItem = false
        if ( self.utils2.filterIfPropMatches(self.item, validMatches) )
        {
            addItem = true;
        }

        if ( addItem == false  ) {
            var validMatches = self.settings.it.matchesPersonal;
            if (validMatches &&
                self.utils2.filterIfPropMatches(self.item, validMatches)) {
                addItem = true
            }
        }
        if(self.name=='Total Deposits') {
            self.proc(self.settings.it)
            //asdf.g
        }
        if ( self.settings.it.fxFilter ) {
            //  assddf.g
            var output = sh.callIfDefined(self.settings.it.fxFilter,self.item)
            if ( output !== true  ) {
                self.fx()
                return;
            }
            if ( output  == true) {
                addItem = true;
            }
        }

        if ( self.settings.it.matchAll ) {
            addItem = true;
        }

        if ( addItem ) {
            self.item.filtered = true;
            self.data.matches.push(self.item)
            // console.log(sh.each.print.values(self.item))
        }

        self.fx()

    }



    p.fxCallback = function fxCallback(item,  fx, i, runner) {
        self.data.itemCount++
        //asdf.g
        self.isAmz();
        return;
    }

    p.fxDone = function onDone(){

        var percentage = self.utils2.percentageOfWorkList(self.data.matches , self.name)
        var sum = self.utils2.sumArray(self.data.matches, 'amount' , self.name)
        self.runner.createAdditionalFile(self.name, self.data.matches)
        JSONSetIterator_Generic.comments = sh.dv(JSONSetIterator_Generic.comments, [])
        //console.error('whole config', self.settings)
        //  process.exit()

        function padLeft(str,size,padWith) {
            padWith = sh.dv(padWith, ' ')
            if(size <= str.length) {
                return str;
            } else {
                return Array(size-str.length+1).join(padWith||'0')+str
            }
        }
        String.prototype.padRight = function(l,c) {return this+Array(l-this.length+1).join(c||" ")}
        //padRight = function(l,c) {return this+Array(l-this.length+1).join(c||" ")}


        var name2 = self.name
        if ( self.settings.includeAllItems) {
            var name2 =  self.name + ' (all)'
        }
        name2 = name2.padRight(35);

        var logLine =    sh.join('T:', name2, sh.t,
            sum,sh.t,
            self.data.matches.length, sh.t,
            percentage)

        var sumPrintable = sum.toString()
        if ( sum >= 0 ) {
            sumPrintable = ' ' + sumPrintable;
        }

        var xyx = self.data.matches.length + '/'+self.data.itemCount;

        var  listAllItemsCount = self.settings.listAllItemsCount;
        if ( listAllItemsCount) {
            xyx = self.data.matches.length + '/'+self.data.itemCount+'/' + self.settings.listAllItemsCount;

            //xyx += 'd'+self.data.itemCount
            percentage = self.utils2.percentageOfWorkList(self.data.matches , self.name, self.settings.listAllItemsCount)
            //xyx += 'd'
            // sdfg.h
        }
        //  console.error('asdf',listAllItemsCount);

        //process.exit()

        var items = [
            sumPrintable,
            xyx,
            percentage]

        if ( self.settings.includeAllItems) {
            var items = [
                sumPrintable,
                self.data.matches.length,
                //'all',
                percentage]
        }

        var logLine =    sh.join('T:', name2, sh.t)
        sh.each(items, function padAllColumns(k,v) {
            // console.log('v', v)
            v = v.toString();
            logLine +=v.padRight(12)
        })


        JSONSetIterator_Generic.comments.push(
            logLine
        )

        var output = sh.callIfDefined(self.settings.it.fxDone,self.runner,self.item)

    }
    p.test = function test(config) {
    }

    function defineUtils() {
        var utils = {};
        p.proc = function debugLogger() {
            if ( self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }
    defineUtils()
}

exports.JSONSetIterator_Generic = JSONSetIterator_Generic;
exports.IteratorClass =  JSONSetIterator_Generic

if (module.parent == null) {
    var instance = new JSONSetIterator_Generic();
    var config = {};
    instance.init(config)
    instance.test();
    instance.fxCallback({}, function done(){

    })
}


