


/*

 hoist it

 */

//sdfsdf.g

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var AutoItRunner = require('./AutoItRunner.js').AutoItRunner

function BasicClass3() {
    var p = BasicClass3.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;

       self.settings.baseUrl = sh.dv(self.settings.port, 11200)

        self.loop(); 
       return;
        var instance = new AutoItRunner();
        var config = {};
        instance.init(self.settings)
        self.c = instance;

        self.method();
        return;
        instance.test(); 
//AutoItRunner_Taxes_CheckVM.js "g:\Dropbox\projects\crypto\mp\AutoItKey\AutoItRunner_Taxes_CheckVM.js"
    }

    p.method = function method(config)  {

        var _self = self;
        self = self.c;
        function goToSpace() {
            //self.winActivate('New Text Document - Copy')
            self.mouse.click(212, 103)
            //   return;
            self.keyboard.selectAll()
            self.type('booty')
            self.accept('booty')
        }


        self.keyboard.escape()
        self.keyboard.sendControlAnd("{PRINTSCREEN}")
        self.mouse.move(201, 103)
        self.mouse.click()
        self.mouse.move(1000, 803)
        self.mouse.click()
        self.wait(3)
        self.keyboard.sendControlAnd("{s}")
        self.keyboard.sendKeys('1234')
        self.accept()
       // self.keyboard.escape()
        /*
        click place
        enter text
        click lace
        wait 2 seconds
        verity title of window?
        send faststone command stroke
        click
        move to x
        click
        take size
        press save
        type name number
        press enter
        press back

        so this can go off of cgoogle

        installf ast stone
         */
        return;
        self = self.c
        console.log('one2')
     //   return
     // self.loadAutoIt();
        //self.winActivate('TTS-Reader')

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
    function pointAtVM() {
        config.port = 11510
        config.ip = '192.168.1.156'
    }
    pointAtVM();

    instance.init(config)
}



