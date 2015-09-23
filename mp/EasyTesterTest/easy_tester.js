/**
 * Created by user on 8/20/15.
 */

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

//open script....
//    does not js have eval?


///specify script to run
//ivoke methods

/*
define file to test
define input params (as cli for now)
setup watch to do it again
 */

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function EasyTester() {
    var p = EasyTester.prototype;
    p = this;
    var self = this;
    p.initEasyTester = function initEasyTester(url, appCode) {
    }

    p.go = function go(url, appCode) {
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}

exports.EasyTester = EasyTester;

if (module.parent == null) {

    var config = {};
    config = sh.readJSONFile('test2_dir.json')
    var e = new EasyTester();
    e.initEasyTester(config);
    e.go();
}





if ( isNode &&  module.parent == null ) {

}
