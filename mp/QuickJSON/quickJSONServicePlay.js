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
            console.log('new slide', JSON.stringify(p.currentSlide)

            )
            if (p.currentSlide == null) {
                self.atEnd();
            }
            p.currentAction = null;
            p.currentActionIndex = 0;
        }

        p.restart = function restart() {
            var p = self.data.playback;
            p.currentIndex-1;
            self.nextSlide()
        }

        p.atEnd = function atEnd() {
            self.proc('at end')
        }

        function defineSlideMethods2() {
            //why: characters, questions, deocration
            p.drawSlide = function drawSlide(count) {
                //why: show represetnation of slide
                console.log('slide', JSON.stringify(self.content.currentSlide))
            }

            p.drawAction = function drawAction(count) {
                //why: show represetnation of slide
                self.proc('action', JSON.stringify(self.content.currentAction))
            }

            p.nextAction = function nextAction(count) {
                var s = self.content.currentSlide;
                if (  self.content.currentAction == null ) {
                    self.content.currentActionIndex = 0;
                    self.content.currentAction =  self.content.currentSlide.actions[0];
                    if (self.content.currentSlide.actions.length == 0) {
                        self.proc('next slide')
                        self.nextSlide();
                        return;
                    }
                } else {
                    self.content.currentActionIndex++;
                    self.content.currentAction =  s.actions[self.content.currentActionIndex];

                    if ( self.content.currentActionIndex > s.actions.length -1 ) {
                        self.proc('last action, next slide')
                        self.nextSlide();
                        return;
                    }
                }
                //why: show represetnation of slide
                self.proc('current action is', JSON.stringify(self.content.currentAction))
                self.drawAction();
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

        function defineActionMethods() {
            var actions = {};
            p.actions = actions;
            actions.userAction = function userActions(select) {
                var a = self.content.currentAction
                var index = a.options.indexOf(select)
                console.error('choice', select)
                if ( index == a.correctAnswerOrIndex ) {
                    self.actionComplete(index)
                    return;
                }
                if ( select == a.correctAnswerOrIndex ) {
                    actions.actionComplete(select)
                    return;
                }
                self.proc('wrong choice', select)
            }
            actions.actionComplete = function anyResponse() {
                console.error("\t","\t",'actionComplete', 'ok..')
                var a = self.content.currentAction
                self.nextAction()
            }

            actions.wrongResponse = function wrongResponse() {
                var a = self.content.currentAction
                if (a.options) {
                    if ( sh.isNumber(a.correctAnswerOrIndex)) {
                        var options = a.options.concat()
                        options = options.splice(a.correctAnswerOrIndex-1,1)
                        var choice = options[0];
                    } else {
                        var options = a.options.concat()
                        var index = options.indexOf(a.correctAnswerOrIndex)
                        options = options.splice(index-1,1)
                        console.error('waht is array',index, options, a.options.concat())
                        var choice = options[0];
                    }
                }
                return choice
            }

            actions.correctResponse = function correctResponse(select) {
                var a = self.content.currentAction
                if (a.options) {
                    if ( sh.isNumber(a.correctAnswerOrIndex)) {
                        var options = a.options; //.concat()
                        var choice = options[a.correctAnswerOrIndex];
                    } else {
                        choice = a.correctAnswerOrIndex;
                    }
                }
                return choice
            }
        }
        defineActionMethods();

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


        p.proc = function debugLogger() {
            if ( isNode ) {
                if ( self.silent == true) {
                    return
                }
                sh.sLog(arguments)
                return; 
            }
            var args = Array.prototype.slice.call(arguments, 0);

            console.log(args)
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



    }
}());