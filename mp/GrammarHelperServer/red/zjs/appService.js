'use strict';
/**
 * Helper shows vanilla reloadable helper test service
 * why: When you want to reload services with your apps
 */
( function() {
  //console.error('reloding quickUI')

  var isNode = true

  if (typeof exports === 'undefined' || exports.isNode == false) {
    isNode = false
  }

  function AppService() {
    var self = this;
    var p = this;
  }


  if ( isNode ) {
    var shelpers = require('shelpers')
    var sh = shelpers.shelpers;
  }else {
  }


  function AppService(dataGen) {
    var self = this;
    var p = this;

    p.init = function init() {

    };

    p.new = function create() {
      return new AppService();
    }

    p.gen = function gen() {
      var dataGenInst = dataGen.create();
      return dataGenInst
    }

    return self;
  }

  if ( typeof angular != 'undefined') {
  /*
    var wrapperRelodableService = window.reloadableHelper.makeServiceReloadable('AppService', AppService)
    //debugger;
    angular.module('com.sync.quick').factory('appService', wrapperRelodableService);
*/

    //var wrapperRelodableService = window.reloadableHelper.makeServiceReloadable('AppService', AppService)
    angular.module('com.sync.quick').factory('appService', AppService);
  }
}());
