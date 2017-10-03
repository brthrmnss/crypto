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

  function QuickUIConvertor() {
    var self = this;
    var p = this;

    p.getAttributes = function (el) {
      var nodes=[], values=[];
      var attrs = {};
      for (var att, i = 0, atts = el.attributes, n = atts.length; i < n; i++){
        att = atts[i];
        nodes.push(att.nodeName);
        values.push(att.nodeValue);
        attrs[att.nodeName]=att.nodeValue
      }
      attrs.$names = nodes;
      return attrs
    };

    p.getCSS = function (el) {
      var nodes=[], values=[];
      var css = {};
      for (var att, i = 0, atts = el.attributes, n = atts.length; i < n; i++){
        att = atts[i];
        nodes.push(att.nodeName);
        values.push(att.nodeValue);
        css[att.nodeName]=att.nodeValue
      }
      css.$names = nodes;
      return css
    };


    p.process = function process(elStart, dictTypes, dictAttrs) {
      console.info('process quick inf', dictAttrs)
      //console.error('loading version', QuickUIConvertor.version, window.QuickUIConvertor.version)
      var children = elStart.find('*');
      var ifx = function ifXHasPropCallFxWithVal(x, prop, fx) {
        if ( x[prop] != null ) {
          fx(x[prop])
        }
      }

      function transformElement( el, def) {
        var q = $(el);
        //do before changed by changeTo
        ifx(def, 'addHTML', function(addHTML){
              q.append($(addHTML))}
        );
        ifx(def, 'fx', function(fx){fx(el, def)} );
        ifx(def, 'addClass', function(addClass){q.addClass(addClass)} );
        ifx(def, 'addCSS', function(addCSS){q.css(addCSS)} );

        if ( def.changeTo != null ) {
          q.replaceTagName( def.changeTo );
        };
        if ( def.replaceWith != null ) {
          console.log(q, q.html())
          // debugger
          q.replaceWith( def.replaceWith ); //TODO: Keep attributes?
        };
      }

      //debugger
      //todo run jquery to find elements to apply transforms
      $.each(children, function (i,inputElement) {
        //console.log(i);
        var q = $(inputElement);
        var element = null;
        var el = element = q[0];
        var type = element.tagName.toLowerCase();
        var attrs = self.getAttributes(element);////.attr();

        var it = {};

        var typeDef = dictTypes[type]
        if ( typeDef != null ) {
          transformElement(el, typeDef);
        }

        var ifxEq = function ifXHasPropCallFxWithVal(x, prop, val) {
          if ( x[prop] == val ) {
            return true;
          }
          return false;
        }

        $.each(attrs, function (attrName, val) {
          //search for matching attr change definition in dictionary
          //apply dictAttrs blocks
          var attrDef =  dictAttrs[attrName]
          if ( attrDef == null ) {
            return;
          }
          if ( attrDef.keep !== true ) {
            q.attr(attrName, null);
          }
          if ( attrDef.alert )
            console.warn('alert triggered', q, attrName, val);
          if ( attrDef.addClassToChildren ) {
            $.each(q.children(), function addStyleChild(k,v) {
              $(v).addClass(attrDef.addClassToChildren)
            });
          }

          if ( attrDef.modifyChildrenFx ) { //use method to modify children
            $.each(q.children(), function addStyleChild(k,v) {
              var childAttrs = self.getAttributes(v);////.attr();
              var css = self.getCSS(v)
              attrDef.modifyChildrenFx($(v),k,childAttrs, css, attrs)
              //$(v).addClass('show-child-containers')
            });
          }

          if ( attrDef.debugChildren ) {
            it.debugChildren = true;
          }


          var skipAttr = false;
          //TODO: what was purpose of ifVal?
          /*if ( ifxEq(attrDef, 'ifVal', true ) ) {
           if ( val == 'true' || val == true ) {

           } else {
           return;
           }
           };*/
          if ( skipAttr == true )
            return;
          transformElement(el, attrDef);

        })

        if ( it.debugChildren || attrs['debugChildren']) { //can debug all of type, or just one from dom
          $.each(q.children(), function addStyleChild(k,v) {
            $(v).addClass('show-child-containers')
          });
        }

      });
    }

  }




  if ( isNode ) {
    var shelpers = require('shelpers')
    var sh = shelpers.shelpers;
    var PromiseHelperV3 = shelpers.PromiseHelperV3;

    $ = function jqueryImpersonator() {
      return $;
    }
    $.click = function () {

    }
    $.click = function () {

    }
    $.attr = function () {

    }
    $.val = function () {

    }
    console.log($, '$')
  }else {
    $.fn.replaceTagName = function(replaceWith) {
      var tags = [],
          i    = this.length;
      while (i--) {
        var newElement = document.createElement(replaceWith),
            thisi      = this[i],
            thisia     = thisi.attributes;
        for (var a = thisia.length - 1; a >= 0; a--) {
          var attrib = thisia[a];
          newElement.setAttribute(attrib.name, attrib.value);
        };
        newElement.innerHTML = thisi.innerHTML;
        $(thisi).after(newElement).remove();
        tags[i] = newElement;
      }
      return $(tags);
    };

  }


  function QuickUIService() {
    var self = this;
    var p = this;

    p.init = function init() {

    };

    p.new = function create() {
      return new QuickUIService();
    }
  }

  //alert('reloaded then')
  //window.QuickUIService != QuickUIService;

  /*  if ( window.QuickUIConvertorVersion == null ) window.QuickUIConvertorVersion = 0;
   window.QuickUIConvertorVersion++;
   window.QuickUIConvertor.version =  window.QuickUIConvertorVersion;
   console.error('reloading', window.QuickUIConvertor.version)

   var reloadableHelperTestService = function reloadableHelperTestService( sh, pubSub ) {
   function createService() {
   var service = new QuickUIService();
   if ( window.QuickUIService != null ) {
   service = new window.QuickUIService();
   };
   service.QuickUIConvertor = QuickUIConvertor;
   return service
   }
   var service = createService();
   service.create = function create() {
   return createService();
   };

   return service;
   };*/


  if ( typeof angular != 'undefined') {
     //debugger
    var wrapperRelodableService = window.reloadableHelper.makeServiceReloadable('QuickUIService', QuickUIConvertor)

     // debugger;
    angular.module('com.sync.quick').factory('quickUI', wrapperRelodableService);
  }
}());
