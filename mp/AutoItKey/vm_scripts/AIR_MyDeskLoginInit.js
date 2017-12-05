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

        p.readChromeWindow = function readChromeWindow(urlToRead) {
            var AutoHotKeyEvernote = sh.require('mp/SpeakerJava2/SpeakServer/public_html/powershell/goto/AutoHotKeyEvernote.js').AutoHotKeyEvernote
            var y = new AutoHotKeyEvernote();
            y.init();
            // self.goToWebpageNewWindow(urlToRead)

            // y.wait(4);
            /*
            if (module.parent == null) {
                name = 'Mike Schur'
                y.requireWindow(name)
            }
            */
            //y.wait(0.5);

            console.log('one2')
            // self.loadAutoIt();
            //self.winActivate('TTS-Reader')
            y.goTo('Windows Security') //why?
            y.wait(0.5);
            y.k.sendKeysRaw('MakeMoney!')
            y.wait(0.5);
            y.k.enter()
            y.wait(5);
            y.k.enter()

            var str = y.getAHKContent();

            //y.runGTAHKQW()
            y.writeAHKFile(str)

            return



            return;

        }

    }

    defineX();

    p.runRemoteCommands = function runRemoteCommands(config) {
        self.proc('runRemoteCommands')
        //var url = 'https://blog.zenkit.com/a-beginners-guide-to-getting-things-done-3cc1a5123b98'
        self.readChromeWindow()
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
    // config.port = 11510
    //config.ip = '192.168.1.172'
    instance.init(config)
    instance.test();
    instance.runRemoteCommands();

}



