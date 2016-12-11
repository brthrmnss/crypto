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

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;
        self.data.matches = [];
    }


    self.isAmz = function isAmz() {
        var validMatches =  ['Preserve']
        if ( sh.isAnyInAny(self.item.description,
                validMatches)){
            self.data.matches.push(self.item)
            self.item.filtered = true;
        }
        self.fx()
    }

    p.fxCallback = function fxCallback(item,  fx, i, runner) {
        self.isAmz()
        return;
    }


    p.getAmountTotal = function getAmountTotal() {
        var amt = 0;
        sh.each(self.data.matches, function asdf(k,item) {
            amt += parseFloat(item.amount);
        })
        amt = amt.toFixed(2)
        self.proc('amount amz', '$', amt)
        return amt;
    }


    p.fxDone = function onDone(){

        self.proc('house got', self.data.matches.length,
            sh.percent(
                self.data.matches.length/
                self.runner.data.work.list.length
            )
        )

        self.getAmountTotal()
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



