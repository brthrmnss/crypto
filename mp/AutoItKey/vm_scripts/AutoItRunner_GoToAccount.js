/*

 hoist it

 */

//sdfsdf.g

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var dirC = 'C:/Users/user1/Dropbox/projects/soundboard/automate_android_store/autoit'

function AIR_GotoAccount() {
    var p = AIR_GotoAccount.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;
        self.settings.port = sh.dv(self.settings.port, 11510)
        self.settings.ip = sh.dv(self.settings.ip, '127.0.0.1')

    }

    function defineX() {
        p.loadAutoIt = function loadAutoIt() {
            var initial = "";
            var initial = "";
            var str = initial +
                ['load \'C:/Users/user1/Dropbox/scripts/file/exec_helpers.rb\'; include ExecHelpers',
                    'require Dir.pwd+\'/\'+\'helpers/autoitwrapper.rb\'; include AutoIt',
                    'require Dir.pwd+\'/\'+\'helpers/autoit_helpers.rb\'; include AutoItHelpers',
                    'require Dir.pwd+\'/\'+\'helpers/evernote_autoit_helpers.rb\'; include EvernoteAutoItHelpers'].join("\n" + initial);
            // str =    'require Dir.pwd+\'/\'+\'helpers/autoitwrapper.rb\'; include AutoIt'

            var dirFolder = sh.qq(dirC)
            dirFolder = sh.replaceBackslash(dirFolder)
            str = sh.replace(str, 'Dir.pwd', dirFolder);
            self.push(str)
            return;
        }

        p.goToWebpage = function goToWebpage(window_title) {
            var str = 'start ' + window_title
            var str = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe ' + window_title
            self.push(str)
            return;
        }

        p.goToWebpageNewWindow = function goToWebpageNewWindow(window_title) {
            var str = 'start ' + window_title
            var str = [
                sh.qq('C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'),
                '--new-window',
                window_title].join(' ')
            self.push(str)
            return;
        }

        p.copyPaste = function copyPaste(window_title) {
            var AutoHotKeyEvernote = sh.require('mp/SpeakerJava2/SpeakServer/public_html/powershell/goto/AutoHotKeyEvernote.js').AutoHotKeyEvernote
            var y = new AutoHotKeyEvernote();
            y.init();

            var name = 'morrisonstephen@gmail.com - Evernote'
            name = 'Google'
            y.requireWindow(name)
            // y.goTo(  name )
            y.showCommands()
            y.k.ctrlAnd('l')
            y.k.type('running')

            // y.actions.makeDailyLog();
            // y.actions.setTags('log')


            var str = y.getAHKContent();

            self.pushAHK(str)
            return;
        }

        p.readArticle = function readArticle(urlToRead) {
            var AutoHotKeyEvernote = sh.require('mp/SpeakerJava2/SpeakServer/public_html/powershell/goto/AutoHotKeyEvernote.js').AutoHotKeyEvernote
            var y = new AutoHotKeyEvernote();
            y.init();

            /*  var name = 'morrisonstephen@gmail.com - Evernote'

             // y.goTo(  name )
             y.showCommands()
             y.k.ctrlAnd('l')
             y.k.type('running')
             */
            self.goToWebpageNewWindow(urlToRead)
            y.wait(4);

            // WinGetPos, X, Y, Width, Height, Calculator

            y.getWindowPosition()
            y.math('MouseX=X')
            y.math('MouseY=Y')
            y.math('MouseX+=75')
            y.math('MouseY+=65')
            y.mouseMove('MouseX', 'MouseY')
            y.wait(1)
            y.getTooltip(false)
            y.math(`
            retryCount=0
            while tooltip2 != Reload this page
            {
                ControlGetText, tooltip2,,ahk_class tooltips_class32
                Sleep, 1
                if (retryCount>50)
                    Exit
            }            
            ; msgbox, goth through %retryCount%
            `
            )
            //ControlGetText, tooltip2,,ahk_class tooltips_class32
            //msgbox, %tooltip2%


            y.chrome.goToAddressBar()
            y.wait(0.5);
            y.k.tab()
            y.wait(0.5);
            y.k.selectAll()
            y.wait(0.5);
            y.k.copy()
            y.wait(0.5);
            y.chrome.closeWindow();


            name = 'Paste - TinyMCE Reader'
            y.requireWindow(name)
            y.wait(0.5);
            y.chrome.goToAddressBar()
            y.wait(0.5);
            y.k.tab()
            y.wait(0.5);
            y.k.selectAll()
            y.k.paste();


            var str = y.getAHKContent();

            self.pushAHK(str)
            return;
        }

        p.winActivate = function winActivate(window_title) {
            var str = 'WinActivate(' + sh.qq("[Title:" + window_title + "]") + ', "")'
            self.push(str)
            return;
        }
        p.sendKeys = function sendKeys(window_title) {
            var str = 'Send(' + sh.qq(window_title) + ')'
            self.push(str)
            return;
        }

        p.sendKeysRaw = function sendKeysRaw(window_title) {
            var str = 'Send(' + sh.qq(window_title) + ', 1)'
            self.push(str)
            return;
        }

        p.pushAHK = function pushAHK(cmd) {
            self.push(cmd, 'ahk')
        }

        p.push = function push(cmd, fileExt) {
            if (self.t) {
                var t = self.t
                var params = {
                    cmdObj2: true,
                    text: cmd,
                    rate: 20
                }
                if (fileExt) {
                    params.runAsFileType = fileExt;
                    //   runAsFileType:'.bat',
                }
                t.getR(t.urls.runAISCmd).with(
                    params
                ).bodyHas('status').notEmpty();
                t.wait(1)
                return;
            }
            var EasyRemoteTester = shelpers.EasyRemoteTester;
            var baseUrl = 'http://' + self.settings.ip + ':' + self.settings.port;
            var silentTest = false;
            var t = EasyRemoteTester.create('Remote Commands', {
                showBody: false, silent: silentTest
            });
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
            self.t = t2;
            self.push(cmd, fileExt)
        }

    }

    defineX();

    p.runRemoteCommands = function runRemoteCommands(config) {
        self.proc('runRemoteCommands')
        // self.loadAutoIt();
        //self.winActivate('TTS-Reader')
        // self.winActivate('Windows Security') //why?
        //self.winActivate('Generic - morristew')
        // self.sendKeysRaw('MadCash#')
        // self.sendKeys('{Enter}')

        // self.goToWebpage('www.google.com')
        // self.copyPaste('www.google.com')
        //self.goToWebpageNewWindow('www.google.com')
        var url = 'https://blog.zenkit.com/a-beginners-guide-to-getting-things-done-3cc1a5123b98'
        self.readArticle(url)
        return;
        setTimeout(function onX() {
            self.sendKeys('Generic - morristew')
        }, 500)
    }

    p.test = function test(config) {
        return;
    }


    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.getFilePath = function getFilePath(file) {
            var file = self.settings.dir + '/' + file;
            return file;
        }

        p.proc = function debugLogger() {
            if (self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }

    defineUtils()
}

exports.AIR_GotoAccount = AIR_GotoAccount;

if (module.parent == null) {
    var instance = new AIR_GotoAccount();
    var config = {};
    config.port = 11510
    config.ip = '192.168.1.172'
    instance.init(config)
    instance.test();
    self.runRemoteCommands();

}



