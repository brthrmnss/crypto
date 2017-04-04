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

      $.each(dictAttrs, function checkAttrForInvalidName(name, attr) {
        if ( name.toLowerCase() != name ) {
          console.error('Invalid .... bad name', name, attr, 'angular will dash case names',
          'contentArea must be content-area')
          throw new Error('invalid name '+ name)
        }
      })
      //console.error('loading version', QuickUIConvertor.version, window.QuickUIConvertor.version)
      var children = elStart.find('*');
      var ifx = function ifXHasPropCallFxWithVal(x, prop, fx) {
        if ( x[prop] != null ) {
          fx(x[prop])
        }
      }

      function transformElement( el, def, type) {
        var q = $(el);
        //do before changed by changeTo
        ifx(def, 'addHTML', function(addHTML){
          q.append($(addHTML))}
        );
        ifx(def, 'fx', function(fx){fx(el, def)} );
        ifx(def, 'addClass', function(addClass){q.addClass(addClass)} );
        ifx(def, 'addCSS', function addStyles(addCSS){
          $.each(addCSS, function (k,v) {
            //why" do not override empty props
            var val = q.css(k);
            console.info('addCSS', 'val',k, val)
            if ( val == '-50%') {
              var dbg = q;
              window.dbg = q;
              var attr = {};
              console.log('left style', q[0].style,attr)
              // debugger
            }
            if ( val && val.toString().indexOf('!!!') != -1  ) {
              debugger;
            }
            q.css(k, v)
          })
          // q.css(addCSS)
        } );

        if ( def.changeTo != null ) {
          q = q.replaceTagName( def.changeTo );
        };
        if ( def.replaceWith != null  ) {
          console.log(q, q.html())
          // debugger
          q.replaceWith( def.replaceWith ); //TODO: Keep attributes?
        };

        //console.debug( 'tpes',type, def, def.wrapContentFx)
        ifx(def, 'wrapContentFx', function wrapContent(wrapContentFx){
          var content = wrapContentFx()
          content = $(content);
          var children = q.children()
          // debugger;
         // q.children().remove()
          q.append(content)
          content.append(children);
         // q.text('sdfsdsdfsdfsd')
        } );


        return q;

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

        var typeDef = dictTypes[type];
        if ( typeDef != null ) {
          el = element = transformElement(el, typeDef, type);
        }

        var ifxEq = function ifXHasPropCallFxWithVal(x, prop, val) {
          if ( x[prop] == val ) {
            return true;
          }
          return false;
        }



        $.each(attrs, function (attrName, val) {
          attrName = attrName.toLowerCase();
          //search for matching attr change definition in dictionary
          //apply dictAttrs blocks
          var attrDef =  dictAttrs[attrName]
          if ( attrDef == null ) {

            if ( attrName.indexOf('!')!= -1 ) { //why: set final settings
              console.log('matched it', attrName, val)
              attrName = attrName.replace('!', '')
              q.css(attrName, val)
            }
           // console.error('attrs', attrName, val)
            if ( attrName == 'faketext' ) {
              if ( val ==  "abc123") {
               // sdf.g
                q.text('a b c d e f g h i j k l m n '+
                    'o p q r s t u v w x y z '+'123456789')
              }
            }
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

          if ( attrDef.wrapContentFx ) { //use method to modify children
            var content = attrDef.wrapContentFx()
            content = $(content);
            var children = q.children().remove()
            debugger;
            q.append(content)
            content.append(children);
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

        if ( q.attr('id')=='positioningDiv') {
          console.log('repeatUI', attrs)
          //  debugger
        }


        //console.log('repeatUI', attrs)
        if (attrs.repeatui ) {
          var times = attrs.repeatui
          var parent = q.parent();
          console.log('repeatUI', times, q )
          for ( var i = 0; i < times; i++) {
            var cloneQ = $(q).clone();
            cloneQ.css("top",((i*45)-200)+'px');
            cloneQ.css("left",(-100)+'%');
            //cloneQ.attr("topx",(i*60)+'px');
            //cloneQ.text((i*60)+'px')
            parent.append(cloneQ)
          }
        }

        if (attrs.repeatuix ) {
          var times = attrs.repeatuix
          var parent = q.parent();
          console.log('repeatUIx', times, q )
          for ( var i = 0; i < times; i++) {
            var cloneQ = $(q).clone();
            //addeach attribute with re_ in front
            $.each(attrs, function processRepeatAttrs(k,v){
              if ( k.indexOf('re_') == 0 ) {
                var att = k.slice(3,k.length)
                cloneQ.css(att,eval(v));
              }
            })
           // cloneQ.css("top",((i*45)-200)+'px');
           // cloneQ.css("left",(-100)+'%');
            //cloneQ.attr("topx",(i*60)+'px');
            //cloneQ.text((i*60)+'px')
            parent.append(cloneQ)
          }
        }


        if ( it.debugChildren || attrs['debugChildren']) { //can debug all of type, or just one from dom
          $.each(q.children(), function addStyleChild(k,v) {
            $(v).addClass('show-child-containers')
          });
        }

      });
    }



    p.processDefaults = function processDefaults(elStart) {

      var dictTypes = {};
      var dictAttrs = {};

      //alert('d')

      dictTypes['t'] = {changeTo: 'textarea', addHTML: '<checkbox>sdfsdf', addClass: 'textarea_class'};
      dictTypes['tx'] = {changeTo: 'div', addHTML: '<checkbox>', addClass: 'textarea_class'};
      dictTypes['navbtn'] = {changeTo: 'div', addHTML: '<checkbox>', addClass: 'navBtn'};
      dictTypes['mini-panel'] = {addClass: 'mini-panel', changeTo: 'div'};

      dictTypes['center-content'] = {
        wrapContentFx: function warpContent(child, index, attrs, css) {
          return '<div class="center_content_item"><!-- auto center --></div>'
        },
        addClass: "center_content",
        changeTo: 'div'
      };

      dictAttrs['prettybtn'] = {addClass: 'mbButton marty'};
      dictTypes['spacer'] = {replaceWith: '<div style="width:10px;height:10px;"></div>'};
      dictAttrs['makeredbtn'] = {ifVal: true, addClass: 'redbtn', addHTML: '<span>red btns</span>'};
      dictAttrs['horizontal-layout'] = {
        ifVal: true, addClass: 'horizontal-flex-container',
        addClassToChildren: 'horizontal-flex-container-flex-item pad10',
        //debugChildren:true,
        modifyChildrenFx: function (child, index, attrs, css) {
          if (attrs.stretch != null) {
            child.addClass('horizontal-flex-container-flex-item-stretch');
          }
        },
        _addHTML: '<span>red btn</span>', alert: true
      }
      ;
      dictAttrs['add-class-to-children'] = {
        modifyChildrenFx: function (child, index, attrs, css, parentAttrs) {
          var addToClassChildren = parentAttrs['add-class-to-children']
          if (addToClassChildren != null) {
            child.addClass(addToClassChildren);
          }
        },
        alert: true
      };
      dictAttrs['upcase'] = {
        addCSS: {'text-transform': 'uppercase'}
      }

      dictAttrs['absolute'] = {
        addCSS: {'position': 'absolute', top: '0px', left: '0px'}
      }
      dictAttrs['bottom'] = {
        addCSS: {'position': 'absolute', top: '', bottom: '0px'}
      }
      dictAttrs['relative'] = {
        addCSS: {'position': 'relative'}
      }
      dictAttrs['aboslute-container'] = {
        addCSS: {'position': 'relative'}
      }
      dictAttrs['bg-offwhite'] = {
        addCSS: {'background-color': '#EAEAE2'}
      }
      dictAttrs['bg-blue'] = {
        addCSS: {'background-color': '#09FFFF'}
      }
      dictAttrs['bg-red'] = {
        addCSS: {'background-color': 'red'}
      }
      dictAttrs['bg-green'] = {
        addCSS: {'background-color': 'green'}
      }
      dictAttrs['bg-orange'] = {
        addCSS: {'background-color': 'orange'}
      }
      dictAttrs['bg-black'] = {
        addCSS: {'background-color': 'black'}
      }
      dictAttrs['hide'] = {
        addCSS: {'display': 'none'}
      }

      dictAttrs['wh5050'] = {
        addCSS: {
          'width': '50%',
          'height': '50%'
        }
      }

      dictAttrs['pad10'] = {
        addCSS: {'padding': '10px'}
      }
      dictAttrs['pad5'] = {
        addCSS: {'padding': '5px'}
      }

      dictAttrs['white'] = {
        addCSS: {
          'color': 'white',
        }
      }

      dictAttrs['w100'] = {
        addCSS: {
          'width': '100%',
        }
      }

      dictAttrs['h100'] = {
        addCSS: {
          'height': '100%',
        }
      }

      dictAttrs['wh100'] = {
        addCSS: {
          'width': '100%',
          'height': '100%'
        }
      }

      dictAttrs['clip'] = {
        addCSS: {
          'overflow': 'hidden',
        }
      }
      dictAttrs['w50'] = {
        addCSS: {
          'width': '50%',
        }
      };
      dictAttrs['w30'] = {
        addCSS: {
          'width': '30%',
        }
      };
      dictAttrs['h50'] = {
        addCSS: {
          'height': '50%',
        }
      }

      dictAttrs['content-area'] = {
        addCSS: {
          'height': '250px',
          'width': '250px',
        }
      }

      self.process(elStart, dictTypes, dictAttrs);
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
          if ( attrib.name.indexOf('!')!= -1 ) {
            continue;
          }
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
