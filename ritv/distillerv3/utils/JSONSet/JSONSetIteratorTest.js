/**
 * Why: class is an example iterator for jsonsettestiterator
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function JSONSetIteratorTest() {
    var p = JSONSetIteratorTest.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    self.data.i = 0;

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;
        self.getFiles();
    }

    p.getFiles = function getFiles(config) {
    }

    p.fxCallback = function fxCallback(item,  fx) {
        //why: invoked when action processed
        self.data.i ++
        console.log(self.data.i, item)
        fx();
    }

    p.test = function test(config) {
    }

    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.getFilePath = function getFilePath(file) {
            var file = self.settings.dir+'/'+ file;
            return file;
        }

        p.proc = function debugLogger() {
            if ( self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }
    defineUtils()
}

exports.JSONSetIteratorTest = JSONSetIteratorTest;
exports.IteratorClass =  JSONSetIteratorTest

if (module.parent == null) {
    var instance = new JSONSetIteratorTest();
    var config = {};
    instance.init(config)
    instance.test();
    instance.fxCallback({}, function done(){

    })
}



