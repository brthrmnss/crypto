





/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;


function GoToAutoHotKeyQuickWebstorm() {
    var p = GoToAutoHotKeyQuickWebstorm.prototype;
    p = this;
    var self = this;
    var file = 'gt_fileinwebstorm_template.ahk'
    
    p.init = function init(config) {


        //var log = process.argv[1]
        config = sh.dv(config, {})

        console.log('config', config)

        self.settings =  config
        self.settings.dirStore = 'c:/trash/'
        // return;

        self.getTemplate()
    }

    p.getTemplate = function getTemplate() {
        var goToWindow = sh.dv(self.settings.goToWindow, process.argv[2])
        var filePathOrName = sh.dv(self.settings.filePathOrName, process.argv[3])

        var content = sh.readFile(__dirname + '/' + file)
        
        self.proc('input', 'goToWindow', goToWindow, 'filePathOrName', filePathOrName)
       
        content = content.replace('=goToWindow=', goToWindow)
        content = content.replace('=filePathOrName=', filePathOrName)
        //content = content.replace('=goToWindow=', goToWindow)


        /*if ( launchIfNotFound ) {
            if ( launchIfNotFound.startsWith('http')) {
                launchIfNotFound = "chrome.exe --new-window " + launchIfNotFound
            }
            content = content.replace('=launchIfNotFound=', launchIfNotFound)
        } else {
            content = content.replace('run, =launchIfNotFound=', '')
        }*/

       self.writeAHKFile(content);
    }
    p.openFile = p.init;

    p.writeAHKFile  = function writeAHKFile(content) {
        var fileAHK = 'gt_autohotkey_quick.tmp.ahk'

        if ( self.settings.dirStore ) {
            fileAHK = self.settings.dirStore + '/'+fileAHK
        }

        sh.writeFile(fileAHK, content)
        console.log('writeAHKFile-Output:', sh.n, content)
        sh.run(fileAHK)
        return
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }
}


if (module.parent == null) {
    var y = new GoToAutoHotKeyQuickWebstorm();
    y.init();
}

exports.GoToAutoHotKeyQuickWebstorm = GoToAutoHotKeyQuickWebstorm;
