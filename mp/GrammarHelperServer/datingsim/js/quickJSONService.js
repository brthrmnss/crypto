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

  function QuickJSONConvertor(sh) {
    var self = this;
    var p = this;

    p.init = function init() {
      self.settings = {};
      self.data = {};
      self.data.json = {}
    }

    p.new = function create() {
      var s = new QuickJSONConvertor();
      console.log('inside create', ',,,,,,7,,,,,,')
      // debugger;
      s.init();
      return s;
    }

    function defineSlideMethods2() {
      //why: characters, questions, deocration
      p.slide = function slide(name) {
        var s = {};
        self.currentSlide = s
        self.utils.addToObjectIf(s, name, 'name')
        //self.data.json.push(self.currentSlide)
        self.utils.addToObjectIf(self.data.json, s, 'slides', true)

        //debugger
        return self;
      }
    }
    defineSlideMethods2();

    function defineCharacterMethods() {
      //why: assets, audio, animations
      p.char = function addCharacter(name) {
        var char  = {};
        self.currentCharacter = char
        self.utils.addToObjectIf(self.currentCharacter, name, 'name')
        self.utils.addToObjectIf(self.currentSlide, char, 'characters', true)

        return self;
      }

      p.emots = function addEmotion(config) {
        var prepend = config.prepend;

        if ( prepend ) {
          delete config.prepend;
          $.each(config, function (k,src) {
            config[k] = config.prepend + src
          })
        }
        self.currentCharacter.emotions = config;
        //debugger
        return self;
      }



    }
    defineCharacterMethods();

    function defineDialogMethods() {
      //why: characters, questions, deocration
      p.dialog = function addDialog(prompt, options,
                                    correctAnswerOrIndex, fxAction) {
        var d = {};
        self.currentDialog = d
        self.utils.addToObjectIf(d, prompt, 'prompt')
        self.utils.addToObjectIf(d, options, 'options')
        self.utils.addToObjectIf(d, correctAnswerOrIndex, 'correctAnswerOrIndex')
        self.utils.addToObjectIf(d, fxAction, 'fxAction', false, true)
        self.utils.addToObjectIf(self.currentSlide, d, 'dialogs', true)
        //debugger
        //TODO: how to hanlde actions? when reposnd ... do sthings ...
        //self.currentCharacter.data.emotion = val;
        //yes embed js that can run in context
        return self;
      }
    }
    defineDialogMethods();

    function defineUtils() {
      var utils = {}
      self.utils = utils;

      utils.addToObjectIf = function addTO(obj, val, prop, isArray, toStr) {
        if ( prop == null ) throw new Error('prop not defined');
        if ( obj == null ) throw new Error('obj not defined, '+ arguments);
        if ( val == null ) return;

        if ( toStr ) {
          val = val.toString();
        }

        if ( isArray === true ) {
          var curVal = obj[prop]
          if ( curVal == null ) curVal = [];
          curVal.push(val)
          obj[prop] = curVal;
          return;
        }

        obj[prop] = val;


      }
    }
    defineUtils();


    p.json = function json() {
      var d = sh;

      /// debugger;
      //self.currentSlide = []
      return  self.data.json ;
      // return sh.toJSONString( self.data.json);
    }

  }


  if ( typeof angular != 'undefined') {
    //debugger
    var wrapperRelodableService = window.reloadableHelper.makeServiceReloadable('QuickJSONService', QuickJSONConvertor)
    //  debugger;
    angular.module('com.sync.quick').factory('quickJSON', wrapperRelodableService);
  }
  if ( isNode ) {
    //console.log('d')
    var y = new QuickJSONConvertor();
    y.init()
    y.slide('slide 1')
    y.char('mark')
    y.emots({
      happy:'happy.jpg',
      sad:'sad.jpg'

    })
    y.dialog('Yo, how are you?', ['bad', 'great'], 'great')
    y.slide('slide 2')
    //make 2 slides,
    // conform settings are correct,
    //    run //play method ... ensure

    var sh = require('shelpers').shelpers;
    var shelpers = require('shelpers');
    //console.log(y.json())
    sh.toJSONString(y.json(),true)
    var util = require('util');
    //  util.print("\u001b[2J\u001b[0;0H");

    var quickJSONServiceTest = require('./quickJSONServiceTest').quickJSONServiceTest;

    var t = new quickJSONServiceTest();
    t.init(y);
    t.hasSlides(2)
    t.hasSlide('slide 2')


    var QuickJSONServicePlay = require('./QuickJSONServicePlay').QuickJSONServicePlay;

    var p = new QuickJSONServicePlay();
    p.init(y);
    p.play()
    t.isCurrentSlide('slide 1')
    t.hasSlide('slide 2')
    p.nextSlide()
    t.isCurrentSlide('slide 2')
    p.restart()
    p.play()
    p.drawSlide() //put chars , on proper side in layout ...
    //p.dialog() //what is this for?

  }
}());