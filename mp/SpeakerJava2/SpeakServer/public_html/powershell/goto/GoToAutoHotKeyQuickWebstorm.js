





/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;


function GoToAutoHotKeyQuickWebstorm() {
    var p = GoToAutoHotKeyQuickWebstorm.prototype;
    p = this;
    var self = this;
    var fileTemplate = __filename + '.template.ahk'
    
    p.init = function init(config) {
        //var log = process.argv[1]
        config = sh.dv(config, {})

        console.log('config', config)

        self.settings =  config
        self.settings.dirStore = 'c:/trash/'
        // return;

        self.getTemplate()
    }

    p.runGTAHKQW = function asdf(cmds) {
        var cmd = ''
        cmd = ['node', sh.fs.join(__filename)] //__dirname, 'GoToAutoHotKeyQuick.js')]
        cmd = cmd.concat(cmds)
       /* cmd = ['node', sh.fs.join(__dirname, 'GoToAutoHotKeyQuick.js'), 'morrisonstephen@gmail.com',
            'https://mail.google.com/mail/u/0/#inbox/', 'regex', 'norun']*/
        cmd = cmd.join(' ')
        var output =  sh.run(cmd)
        console.log('output', output.toString())
    }

    p.getTemplate = function getTemplate() {
        var goToWindow = sh.dv(self.settings.goToWindow, process.argv[2])
        var filePathOrName = sh.dv(self.settings.filePathOrName, process.argv[3])

        var content = sh.readFile( fileTemplate)
        
        self.proc('input', 'goToWindow', goToWindow, 'filePathOrName', filePathOrName)
       
        content = content.replace('=goToWindow=', goToWindow)
        content = content.replace('=filePathOrName=', filePathOrName)
        //content = content.replace('=goToWindow=', goToWindow)

        self.utils.searchForArgOption('noRun', 'norun', 'do not run')
        self.utils.searchForArgOption_startsWith('partialMode', 'partial', 'loading a partial')

        if ( self.settings.partialMode ) {
            content = sh.replace(content, '; BlockPartialMode', '')
            content = content.replace('=partialFileName=', self.settings.partialMode)
        } else {
            content = sh.replace(content, '; BlockFullMode', '')
        }
        /*if ( launchIfNotFound ) {
            if ( launchIfNotFound.startsWith('http')) {
                launchIfNotFound = "chrome.exe --new-window " + launchIfNotFound
            }
            content = content.replace('=launchIfNotFound=', launchIfNotFound)
        } else {
            content = content.replace('run, =launchIfNotFound=', '')
        }*/

        if ( self.settings.noRun ) {
            console.log('content:', sh.n, content)
            self.proc('no run')
            return;
        }

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

    function defineUtils() {
        p.utils = {};
        p.utils.carP = function carP(currentVal, ifNullUse) {
            if ( currentVal != null ) {
                return currentVal;
            }
            if ( ifNullUse == 'true' || ifNullUse == true ) {
                return true
            }

            return undefined;
        }
        p.utils.searchForArgOption_startsWith = function searchForArgOption_startsWith(argName, setPropVal, msg){
            //asdf.g
            console.log('args', process.argv, argName)
            sh.each(process.argv, function checkAllArgs(k,v) {
                if ( v.startsWith(setPropVal+':') ) {
                    var setV = v.replace(setPropVal+':', '')
                    self.proc('found ', setV, msg)
                    self.settings[argName]  = setV
                    return false;
                }
            })
        }
        p.utils.searchForArgOption = function searchForArgOption(argName, setPropVal, msg){
            //asdf.g
            console.log('args', process.argv, argName)
            sh.each(process.argv, function checkAllArgs(k,v) {
                if ( v == setPropVal ) {
                    self.proc('found ', v, msg)
                    self.settings[argName]  = true
                    return false;
                }
            })
        }
    }
    defineUtils();

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
