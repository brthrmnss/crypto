


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

    p.loop = function loop(){
        var items = [1,2,3]
        var items = sh.each.times(2 ,null,1128)
        //items = [1128]
        var items = sh.each.times(20 ,null,1128)
        var items = sh.each.times(35 ,null,1143)
        var items = sh.each.times(50 ,null,1177)
        var items = sh.each.times(50 ,null,1226)
        sh.async(items, function onItems(item, fxIterationEnd) {
            self.proc('item', item)

           // return;
            /*
            fxIterationEnd()
            return;
            */
            var instance = new AutoItRunner();
            var config = sh.clone(self.settings);
            instance.init(config)
            self.c = instance;

            var oldSelf = self;
            self.method(item)
            instance.test();
            self = oldSelf;

            setTimeout(function onTest() {
                config.fxDone = function onFx() {
                    self.proc('done with', item)
                    fxIterationEnd();
                }
            },300);


            /* setTimeout(function onwhatThis() {
             fx()
             }, 150)*/
        }, function onDone() {
            self.proc('all done')
        })
    }

    p.method = function method( _number)  {

        var _self = self;
        self = self.c;

        //console.log(self)


        var number = 1128
        number = sh.dv(_number, 1128)

        self.beep()

        self.proc('n', number)
       // self.wait(3)
      //  return;
        //self.puts('sdf' )

        function goToThing() {
            self.winWait('eDocumentsList', 3)
            self.winActivate('eDocumentsList')
            self.mouse.click(121, 280)
            self.wait(0.2)
            self.mouse.click(371, 332)
            self.wait(0.2)
            self.keyboard.sendControlAnd("{a}")
            self.keyboard.sendKeys(number)
            self.wait(0.2)
            self.mouse.click(483, 359)

            self.winWait('eChecks View', 6)
          //  self.wait(6)
        }
        goToThing()


        self.beep();
       // self.beep()
       // return
        function step2GetImage() {
            self.winWait('eChecks View', 6)
            self.keyboard.escape()
            self.keyboard.sendControlAnd("{PRINTSCREEN}")
            self.mouse.move(16, 346)
            self.mouse.click()
            var initX = 16
            var initY = 346
            self.mouse.move(650+initX, 295+initY)
            self.mouse.click()
            self.wait(2)
            self.keyboard.sendControlAnd("{s}")
            self.keyboard.sendKeys(number)
            self.accept()
            //if confirm
            self.accept()
            self.keyboard.escape()
            self.keyboard.escape()
        }
        step2GetImage()


        //go back
        self.keyboard.sendAltAnd('{LEFT}')
        self.winWait('eDocumentsList', 3)
        //self.wait(10)


        return;

        self.winActivate('booty')

        self.wait(2)
        self.winActivate('Calculator')

        return;
        // 16 346
        //650 295

        function goToSpace() {
            //self.winActivate('New Text Document - Copy')
            self.winActivate('booty')

            self.mouse.click(212, 103)
            //   return;
            self.keyboard.selectAll()
            self.type('booty')
            self.accept('booty')
        }

        goToSpace()

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



