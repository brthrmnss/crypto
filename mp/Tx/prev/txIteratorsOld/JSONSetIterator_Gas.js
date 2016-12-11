/**
 * Why: class is an example iterator for jsonsettestiterator
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function JSONSetTestIterator() {
    var p = JSONSetTestIterator.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    self.name = 'JunkFood'

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;
        self.data.matches = [];
    }


    self.isAmz = function isAmz() {
        var validMatches =  ['Sunoco',
            'Texaco']
        if ( self.utils2.filterIfPropMatches(self.item, validMatches) )
            self.data.matches.push(self.item)
        self.fx()
    }

    p.fxCallback = function fxCallback(item,  fx, i, runner) {
        self.isAmz()
        return;
    }

    p.fxDone = function onDone(){
        self.utils2.percentageOfWorkList(self.data.matches , self.name)
        self.utils2.sumArray(self.data.matches, 'amount' , self.name)
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

exports.JSONSet = JSONSetTestIterator;
exports.IteratorClass =  JSONSetTestIterator

if (module.parent == null) {
    var instance = new JSONSetTestIterator();
    var config = {};
    instance.init(config)
    instance.test();
    instance.fxCallback({}, function done(){

    })
}



