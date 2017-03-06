/**
 * Created by user1 on 3/4/2017.
 */

if ( window.isNode || typeof exports === 'undefined' ) {
    var sh = require('shelpers').shelpers;
    var shelpers = require('shelpers');
} else {
    sh.isObject = $.isObject
}

function TestCSV() {
    var p = TestCSV.prototype;
    p = this;
    var self = this;
    p.init = function init(config) {
        self.settings = sh.dv(config, {});
    }

    p.getTestScript = function getTestScript(file) {
        console.log('file', file)
        uiUtils.getUrl(file, function onLoad(txt) {
            console.log('test content', txt)
        })
    }

    p.method = function method(config) {
    }

    p.method = function method(config) {
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

if ( isNode ) {
    exports.TestCSV = TestCSV;

    if (module.parent == null) {
        var instance = new TestCSV();
        var config = {};
        instance.init(config)
    }

 } else {
    var instance = new TestCSV();
    var config = {};
    instance.init(config)
}


