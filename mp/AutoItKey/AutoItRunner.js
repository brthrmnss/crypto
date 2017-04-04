


/*

 hoist it

 */

//sdfsdf.g

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var dirC = 'C:/Users/user1/Dropbox/projects/soundboard/automate_android_store/autoit'

function AutoItRunner() {
    var p = AutoItRunner.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;
        self.settings.port = sh.dv(self.settings.port, 11200);
        self.settings.ip = sh.dv(self.settings.ip, '127.0.0.1');
        //console.log('what is ip', self.settings.ip)
        self.runAutoItCommands();
    }

    function defineAutoItCommands() {
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
        p.winWait = function winWait(window_title, time) {
            time = sh.dv(time, 5)
            var str = 'WinWait('+sh.qq("[Title:"+window_title+"]")+', "", '+time+')'
            self.push(str)
            return;
        }

        
        
        p.sendKeys = function sendKeys(txtStr) {
            var str = 'Send(txtStr)'
            var cmd = self.utils.replace(str, 'txtStr', txtStr, true)
            self.push(cmd)
            return;
        }

        p.type = p.sendKeys;

        p.beep = function beep() {
            var cmd = 'beep 600, 400'
            self.push(cmd)
            return;
        }

        p.puts = function puts(x) {

            var cmd = 'puts ' + sh.qq(x)
            self.push(cmd)
            return;
        }

        p.accept = function accept() {
            var keys = '{ENTER}'
            self.sendKeys(keys)
            return;
        }


        p.mouse = {};
        p.mouse.click = function onclick(x,y) {
            if ( x && y ) {
                var str = 'Mouse.move(x,y)'
                var cmd = self.utils.replace(str, 'x', x)
                cmd = self.utils.replace(cmd, 'y', y)
                self.push(cmd)
            }
            var str = 'Mouse.click()'
            cmd = str
            self.push(cmd)

        }
        p.mouse.move = function move(x,y) {
            var str = 'Mouse.move(x,y)'
            var cmd = self.utils.replace(str, 'x', x)
            cmd = self.utils.replace(cmd, 'y', y)
            self.push(cmd)
        }

        var k = {};
        p.k = k
        p.keyboard = p.k;
        k.selectAll = function selectAll() {
            var str = 'send_control_and(keysToSend)'
            var cmd = self.utils.replace(str, 'keysToSend', '{a}', true)
            self.push(cmd)
            return;
        }

        k.sendControlAnd = function sendControlAnd(asdf) {
            var str = 'send_control_and(keysToSend)'
            var cmd = self.utils.replace(str, 'keysToSend', asdf, true)
            self.push(cmd)
            return;
        }

        k.sendAltAnd = function sendAltAnd(asdf) {
            var cmds = [
            'Send(ALTDOWN)',
            'Send(keys)',
            'Send(ALTUP)'
            ]
            var str = cmds.join('\n');
            var cmd = self.utils.replace(str, 'keys', asdf, true)
            self.push(cmd)
            return;
        }
        
        k.sendKeys = function sendKeys(asdf) {
            var str = 'send_keys(keysToSend)'
            var cmd = self.utils.replace(str, 'keysToSend', asdf, true)
            console.error('---sendkes', cmd)
            self.push(cmd)
            return;
        }

        k.escape = function escape() {
            k.sendKeys("{ESC}")
        }


        k.backspace = function backspace() {
            k.sendKeys("{BACKSPACE}")
        }


        p.wait = function wait(time) {
            time = sh.dv(time, 1);
            self.t.wait(time)
        }

        p.push = function push(cmd) {
            // asdf.g
            if (self.t == null) {
                var EasyRemoteTester = shelpers.EasyRemoteTester;
                var baseUrl = 'http://'+self.settings.ip+':'+self.settings.port;
                var cfg = {};
                 cfg = {showBody:false, silent:true}
                var t = EasyRemoteTester.create('Test say basics',cfg);
                var data = {};
                t.settings.baseUrl = baseUrl
                t.settings.fxDone = function onDone_SendingCmds() {
                    //  console.log('booo')
                    sh.callIfDefined(self.settings.fxDone)
                    self.t = null;
                }
                var urls = {};
                urls.runAISCmd = t.utils.createTestingUrl('runAISCmd')


                var t2 = t.clone('test an example command');
                t2.urls = urls;
                self.t = t2;
            }


            // console.log('add cmd', cmd)
            var t= self.t
            t.getR(t.urls.runAISCmd).with({text:cmd, rate:20}).bodyHas('status').notEmpty()
                .fxDone(function onDne(a,b,c) {
                    console.log('....')
                    console.log('')
                    console.log(cmd)
                    var cmdOutput = a.cmdOutput
                    var split = cmdOutput.split('\n')
                    var firstLine = split[1]
                    firstLine = sh.dv(firstLine, '')
                    var isError = firstLine.includes('Error: ');
                    // console.error('firstline', firstLine, isError)
                    //  console.error(cmdOutput)
                    if ( isError ) {
                        console.error(sh.t, cmdOutput)
                        return '>>>>>>>>>>>>>>aborting b/c of error'
                    }
                    console.log(sh.t, a.cmdOutput) //,b,c)
                })
                .fxFail(function onDne(a,b,c) {
                    //   console.log('....')
                    console.log('')
                    console.log(cmd)
                    console.log(sh.t, a.cmdOutput) //,b,c)
                })

            t.wait(0.4)
            return;

            t2.getR(urls.runAISCmd).with({text:cmd, rate:20}).bodyHas('status').notEmpty();
            t2.wait(1)


        }
    }
    defineAutoItCommands();

    p.runAutoItCommands = function runAutoItCommands(config) {
        /// self.loadAutoIt();

        return;
        console.log('one2')
        //
        //self.winActivate('TTS-Reader')
        self.winActivate('Generic - morristew')
        self.sendKeys('MoneyIsHere4Eve')
        self.sendKeys('{Enter}')

        return;
        setTimeout(function onX() {
            self.sendKeys('Generic - morristew')
        },500)
    }

    function defineTestMethods() {
        p.test = function test(config) {
            return;
            var EasyRemoteTester = shelpers.EasyRemoteTester;
            //var baseUrl = 'http://'++self.settings.port;
            var baseUrl = 'http://'+self.settings.ip+':'+self.settings.port;
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
    }
    defineTestMethods()

    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.getFilePath = function getFilePath(file) {
            var file = self.settings.dir+'/'+ file;
            return file;
        }

        utils.replace = function replace(cmd, findInStr, replaceW, isString) {
            if ( isString ) {
                replaceW = sh.qq(replaceW)
            }
            cmd = sh.replace(cmd, findInStr, replaceW)
            //console.log('cmd', cmd)
            return cmd;
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

exports.AutoItRunner = AutoItRunner;

if (module.parent == null) {
    var instance = new AutoItRunner();
    var config = {};
    instance.init(config)
    instance.test();
}



 