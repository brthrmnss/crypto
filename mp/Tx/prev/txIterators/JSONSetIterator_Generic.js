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
            console.log(self.settings.it)
            //asdf.g
        }
        if ( self.settings.it.fxFilter ) {
        //  assddf.g
            var output = sh.callIfDefined(self.settings.it.fxFilter,self.item)
            if ( output == false ) {
                self.fx()
                return;
            }
            if ( output  == true) {
                addItem = true;
            }
        }


        if ( addItem ) {
            self.item.filtered = true;
            self.data.matches.push(self.item)
            // console.log(sh.each.print.values(self.item))
        }

        self.fx()

    }



    p.fxCallback = function fxCallback(item,  fx, i, runner) {
        self.isAmz()
        return;
    }

    p.fxDone = function onDone(){
        var percentage = self.utils2.percentageOfWorkList(self.data.matches , self.name)
        var sum = self.utils2.sumArray(self.data.matches, 'amount' , self.name)
        self.runner.createAdditionalFile(self.name, self.data.matches)
        JSONSetIterator_Generic.comments = sh.dv(JSONSetIterator_Generic.comments, [])
        JSONSetIterator_Generic.comments.push(
            sh.join('Total for', self.name, sum, self.data.matches.length, percentage)
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



