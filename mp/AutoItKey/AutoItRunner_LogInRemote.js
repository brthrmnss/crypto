


/*

 hoist it

 */

//sdfsdf.g

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var dirC = 'C:/Users/user1/Dropbox/projects/soundboard/automate_android_store/autoit'

function BasicClass3() {
    var p = BasicClass3.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;
        self.settings.port = sh.dv(self.settings.port, 11200)

        self.method(); 
    }

    function defineX() {
        p.loadAutoIt = function loadAutoIt() {
            var initial = ""; 
            var initial = "";
            var str = initial +
                ['load \'C:/Users/user1/Dropbox/scripts/file/exec_helpers.rb\'; include ExecHelpers',
                    'require Dir.pwd+\'/\'+\'helpers/autoitwrapper.rb\'; include AutoIt',
                    'require Dir.pwd+\'/\'+\'helpers/autoit_helpers.rb\'; include AutoItHelpers',
                    'require Dir.pwd+\'/\'+\'helpers/evernote_autoit_helpers.rb\'; include EvernoteAutoItHelpers'].join("\n" +initial);
            // str =    'require Dir.pwd+\'/\'+\'helpers/autoitwrapper.rb\'; include AutoIt'

            var dirFolder = sh.qq(dirC)
            dirFolder = sh.replaceBackslash(dirFolder)
            str = sh.replace(str, 'Dir.pwd', dirFolder);
            self.push(str)
            return;
        }
 

        p.winActivate = function winActivate(window_title) {
            var str = 'WinActivate('+sh.qq("[Title:"+window_title+"]")+', "")'
            self.push(str)
            return;
        }
        p.sendKeys = function sendKeys(window_title) {
            var str = 'Send('+sh.qq(window_title)+')'
            self.push(str)
            return;
        }


        p.push = function push(cmd) {
            if (self.t) {
                var t= self.t
                t.getR(t.urls.runAISCmd).with({text:cmd, rate:20}).bodyHas('status').notEmpty();
                t.wait(1)
                return;
            }
            var EasyRemoteTester = shelpers.EasyRemoteTester;
            var baseUrl = 'http://127.0.0.1:'+self.settings.port;
            var t = EasyRemoteTester.create('Test say basics',{showBody:false, silent:true});
            var data = {}; 
            t.settings.baseUrl = baseUrl
            t.settings.fxDone = function onDone() {
                console.log('booo')
                self.t = null;
            }
            var urls = {};
            urls.runAISCmd = t.utils.createTestingUrl('runAISCmd')
            var t2 = t.clone('test an example command');
            t2.urls = urls;
            t2.getR(urls.runAISCmd).with({text:cmd, rate:20}).bodyHas('status').notEmpty();
            t2.wait(1)
            self.t = t2;

        }

    }
    defineX(); 
    
    p.method = function method(config) {


        console.log('one2')
     // self.loadAutoIt();
        //self.winActivate('TTS-Reader')
        self.winActivate('Generic - morristew')
        self.sendKeys('MoneyIsHere4Eve')
        self.sendKeys('{Enter}')

        return;
        setTimeout(function onX() {
            self.sendKeys('Generic - morristew')
        },500)
    }

    p.test = function test(config) {
        return;
        var EasyRemoteTester = shelpers.EasyRemoteTester;
        var baseUrl = 'http://127.0.0.1:'+self.settings.port;
        var t = EasyRemoteTester.create('Test say basics',{showBody:false});
        var data = {};
        t.settings.baseUrl = baseUrl
        var urls = {};
        urls.notes = {};
        urls.test = t.utils.createTestingUrl('test')
        urls.runAISCmd = t.utils.createTestingUrl('runAISCmd')
        urls.play = t.utils.createTestingUrl('play')
        urls.stop = t.utils.createTestingUrl('stop')
        urls.playCustom = t.utils.createTestingUrl('playCustom')
        urls.getJSONPath = t.utils.createTestingUrl('getJSONPath')
        urls.uploadConfig = t.utils.createTestingUrl('uploadConfig')
       // self.tests.t = t;

        //self.tests.urls = urls;

        //var t = self.tests.t ;

        var t2 = t.clone('test an example command');
        //var urls = self.tests.urls;
        t2.getR(urls.test).with({text:'test', rate:20}).bodyHas('status').notEmpty();

        var initial = "";
        var str = initial +
            ['require "Win32API"',
                'Beep = Win32API.new("kernel32", "Beep", ["I", "I"], \'v\')',
                'def beep freq, duration',
                '  Beep.call(freq, duration)',
                'end ',
                '',
                'beep 200, 400'].join("\n" +initial);

        t2.getR(urls.runAISCmd).with({text:str, rate:20}).bodyHas('status').notEmpty();

        t2.wait(1)
    }


    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.getFilePath = function getFilePath(file) {
            var file = self.settings.dir+'/'+ file;
            return file;
        }

        p.proc = function debugLogger() {
            if ( self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }
    defineUtils()
}

exports.BasicClass3 = BasicClass3;

if (module.parent == null) {
    var instance = new BasicClass3();
    var config = {};
    instance.init(config)
    instance.test();
}



