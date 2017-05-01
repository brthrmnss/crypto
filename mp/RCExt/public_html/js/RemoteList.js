/*
 var sh = require('shelpers').shelpers;
 var shelpers = require('shelpers');
 */

function RemoteList() {
    var p = RemoteList.prototype;
    p = this;
    var self = this;

    p.init = function init(config) {
        self.settings = u.dv(config, {});
       // self.method();
    }

    p.listList = function listList(fx) {
        
    }

    p.addtoList = function addtoList(config) {

    }


    p.removeFromList = function removeFromList(config) {

    }


    p.test = function test(config) {
    }
}

var instance = new RemoteList();
var config = {};
instance.init(config)
instance.test();



