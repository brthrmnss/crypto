





/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;

function GoToAutoHotKeyQuick() {
    var p = GoToAutoHotKeyQuick.prototype;
    p = this;
    var self = this;
    p.init = function init(config) {

        //var log = process.argv[1]
        config = sh.dv(config, {})

        console.log('config', config)

       // return;

        var goToWindow = process.argv[2]
        var launchIfNotFound = process.argv[3]
        
        if ( config.goToWindow ) {
            goToWindow = config.goToWindow;
        }
        if ( config.launchIfNotFound ) {
            launchIfNotFound = config.launchIfNotFound;
        }
        self.settings =  config
        self.settings.dirStore = 'c:/trash/'
        var file = 'gt_autohotkey_quick.ahk'
        var content = sh.readFile(__dirname + '/' + file)
        
        self.proc('goToWindow', goToWindow, 'launchIfNotFound', launchIfNotFound)
       
        content = content.replace('=goToWindow=', goToWindow)
        content = content.replace('=goToWindow=', goToWindow)

        if ( launchIfNotFound ) {
            if ( launchIfNotFound.startsWith('http')) {
                launchIfNotFound = "chrome.exe --new-window " + launchIfNotFound
            }
            content = content.replace('=launchIfNotFound=', launchIfNotFound)
        } else {
            content = content.replace('run, =launchIfNotFound=', '')
        }

        var fileAHK = 'gt_autohotkey_quick.tmp.ahk'

        if ( self.settings.dirStore ) {
            fileAHK = self.settings.dirStore + '/'+fileAHK
        }

        sh.writeFile(fileAHK, content)
        console.log(content)
        sh.run(fileAHK)
        return
    }
    p.openFile = p.init;

    p.init3 = function init3(url, appCode) {
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }
}


if (module.parent == null) {
    var y = new GoToAutoHotKeyQuick();
    y.init();
}

exports.GoToAutoHotKeyQuick = GoToAutoHotKeyQuick;
