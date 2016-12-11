'use strict';
/**
 * Helper shows vanilla reloadable helper test service
 * why: When you want to reload services with your apps
 */
( function() {

    var isNode = true

    if (typeof exports === 'undefined' || exports.isNode == false) {
        isNode = false
    } else {

    }

    function QuickJSONServicePlay(sh) {
        var self = this;
        var p = this;

        if ( sh == null && isNode ) {
            var sh = require('shelpers').shelpers;
        }

        p.init = function init(qs) {
            self.settings = {};
            self.data = {};
            self.data.qs = qs;
            self.target = self.data.qs.data.json;
        }

        p.play = function play() {
            var p = {};
            self.data.playback = p;
            p.currentIndex = 0;
            p.currentSlide = self.target.slides[p.currentIndex]
            p.isPlaying = true;
            self.data.qs.data.playback = p;
            self.content = p;
        }

        p.nextSlide = function nextSlide() {
            var p = self.data.playback;
            p.currentIndex++;
            p.currentSlide = self.target.slides[p.currentIndex]
        }

        p.restart = function restart() {
            var p = self.data.playback;
            p.currentIndex-1;
            self.nextSlide()
        }

        function defineSlideMethods2() {
            //why: characters, questions, deocration
            p.drawSlide = function drawSlide(count) {
                //why: show represetnation of slide
                console.log('slide', self.content.currentSlide)
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


            utils.assert = function assert(exp, msg, prop, isArray, toStr) {
                if ( exp === false ) {
                    if ( sh.isArray(msg )) {
                        msg = msg.join(' ');
                    }
                    throw new Error(msg)
                }

            }
            utils.searchByName = function searchByName(array, searchVal) {
                return utils.searchArrayByProp(array, searchVal, 'name')
            }

            utils.searchArrayByProp = function searchArrayByProp(array, searchVal, prop) {
                var item = null;
                if (prop == null) {
                    throw new Error('need prop')
                }
                sh.each(array, function(k,v) {
                    var val = v[prop]
                    if ( val == searchVal ) {
                        item  =  v;
                    }
                })

                return item
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

        exports.QuickJSONServicePlay = QuickJSONServicePlay;
        return;
        console.log('d')
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
        console.log(y.json())
        sh.toJSONString(y.json(),true)



    }
}());