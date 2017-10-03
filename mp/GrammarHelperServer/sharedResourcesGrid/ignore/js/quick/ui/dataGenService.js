'use strict';
/**
 * dataGen provides service for basic inmemory
 * data generation
 */
( function() {


  var isNode = true
  if (typeof exports === 'undefined' || exports.isNode == false) {
    isNode = false
  }

  if ( isNode ) {
    var sh = require('./shelpersService').shelpers
    exports.shelpers = sh;
    window = {};
    //var properties = require('properties')
    //var fs = require('fs')
    //var path = require('path')
  } else {
  }

    function DataGenerator() {
      var self = this;
      var p = self;

      self.items = [];

      p.createObjects = function createObjects(temp, number, field) {
        var item = null;
        for ( var i =0 ; i < number; i++ ) {
          item = JSON.parse(JSON.stringify(temp));
          self.items.push(item);
        }
        //return fieldLbl;
      }
      p.randomizeStr = function (field) {
        for ( var i =0 ; i < self.items.length; i++ ) {
          var item = self.items[i];
          item[field] = 'aabbbccc'
          item[field] = Math.random().toString(36).substring(7);
        }
      };

      p.loadItems = function loadItems(items) {
        for ( var i = 0; i < items.length; i++ ) {
          var item = JSON.parse(JSON.stringify(items[i]));
          self.items.push(item);
        };
      };

      p.convertStrToObjects = function convertStrToObjects(field) {
        var newItems = [];
        for ( var i =0 ; i < self.items.length; i++ ) {
          var item = self.items[i];
          var newItem = {};
          newItems.push(newItem);
          newItem[field] = item
        }
        self.items = newItems;
      };

      p.addProp = function addProp(field, fx) {
        for ( var i =0 ; i < self.items.length; i++ ) {
          var item = self.items[i];
          item[field] = fx(item);
        }
      };

      p.convertToDictionary = function convertToDictionary(key, value) {
        var dict = {};
        for ( var i = 0; i < self.items.length; i++ ) {
          var item = self.items[i];
          var k = item[key];
          var v = item;
          if ( value != null ) {
            v = item[value];
          }
          dict[k] = v;
        }
        return dict;
      }

      p.randomizeNumber = function (field, min, max, prec) {
        for ( var i =0 ; i < self.items.length; i++ ) {
          var item = self.items[i];

          if ( min == null ) { min = 0 }
          if ( max == null ) { max = 100 }
          var range = max-min;

          var temp = Math.random() * range
          temp += min;
          if ( prec != null ) {
            temp = temp.toFixed(prec);
          }
          item[field] = temp
        }
      }

      p.randomizeDate = function (field, spread) {
        for ( var i =0 ; i < self.items.length; i++ ) {
          var item = self.items[i];
          var newDate = new Date();
          var days = 1000*60*60*24
          var diff = new Date().getTime()+
          (spread*days)
          var diff = diff*Math.random();
          if ( Math.random() < 0.5 ) {
            diff*= -1;
          }
          newDate.setTime(diff);
          item[field] = newDate;
        }
      }
      /**
       * Mock 1 to 1 connection
       * @param field
       */
      p.distribute = function distribute(field,
        list, sttgs
      ) {
        sttgs = p.utils.dv(sttgs,{});
        for ( var i =0 ; i < self.items.length; i++ ) {
          var item = self.items[i];
          var associatedItem = service.getRandom(list)
          item[field] = self.utils.clone(associatedItem);
          if ( sttgs.prop_id != null ) {
            item[sttgs.prop_id] = associatedItem.id;
          };
        }
      }
      p.show = function () {
        for ( var i =0 ; i < self.items.length; i++ ) {
          var item = self.items[i];
          console.log(1+i+'.','\t', item)
        }
      }

      p.productDescription = 'CIS mobile can display a range of product information. Aside from technical data the names of the product can be shown. Due to the fact that the internal name is not always the same as the name a customer uses, it may make sense to request both names from the ERP system and show them in CIS mobile. In this add-on we look at the name that the customer uses for the product.'
       +'<br />'+
      'The additional information is to be displayed in the detailed view of the product. On activating the test output for add-ons in the settings, orange colored placeholders are shown and these can be replaced by an add-on. In our example we need "ProductAddon3".'


      var service = {};
      p.utils = service;
      service.dv = function defaultValue( val, defaultVal) {
        if ( val == null ) {
          return defaultVal;
        }
        return val;
      }
      service.defaultValue = service.dv;

      service.getRandom = function getRandom( items, defaultVal) {
        return items[
          Math.floor(
            Math.random()*items.length
          )];
      }

      service.clone = function clone( items, defaultVal) {
        return   JSON.parse(JSON.stringify(items));
      }



    }



  //handle node debugging
  if ( typeof require  != 'undefined' ) {
    var x = new dataGen();
    var template = {name:'', date:null, age:0}
    x.createObjects(template, 10)
    x.randomizeStr('name')
    x.randomizeNumber('age', 0,120, 2)
    x.randomizeDate('date', 365*2)
    x.show()
    return
  }




  DataGenerator.$inject = [ ];
/*
    var module = angular.module('com.sync.quick');
    module.factory('dataGen', dataGen );
    angular.module('com.sync.quick').factory('dataGen', dataGen );
  */

  if ( isNode == false ) {
    var wrapperRelodableService = window.reloadableHelper.makeServiceReloadable('dataGenService', DataGenerator)
    angular.module('com.sync.quick').factory('dataGen', wrapperRelodableService)
  }


}());
