/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;


function AutoHotKeyAutomator() {
    var p = AutoHotKeyAutomator.prototype;
    p = this;
    var self = this;
    var fileTemplate = __filename + '.template.ahk'

    self.data = {};

    p.init = function init(config) {
        //var log = process.argv[1]
        config = sh.dv(config, {})

        console.log('config', config)

        self.settings = config
        self.settings.dirStore = 'c:/trash/'
        // return;
        self.data.content = [];
        // self.getTemplate()


        // self.runFile();
    }


    p.runFile = function runAHKFile() {
        //store in trash dir
    }


    function defineFields() {
        p.goTo = function goTo(a, b) {
            /*IfWinExist, Untitled - Notepad
             WinActivate ; use the window found above
             else
             WinActivate, Calculator*/
            var line = 'WinActivate, ' + a;
            if (b) {
                line += ', ' + b
            }
            self.data.content.push(line)
        }
        p.goToWindow = function goToWindow(goToWindowx, openWindow) {
            /*IfWinExist, Untitled - Notepad
             WinActivate ; use the window found above
             else
             WinActivate, Calculator*/
            var line = `
            ;template for navigating to a window
            
            SetTitleMatchMode,2
            
            
            If WinExist("=goToWindow=") {
                WinActivate =goToWindow=
            }
            else
            {
                ;run, =launchIfNotFound=
                ; --new-window
            }

            `
            line = line.split('=goToWindow=').join(goToWindowx)
            if ( openWindow ) {
               // line = line.split(';run, ').join(goToWindowx)
            }
            self.data.content.push(line)
        }

        p.getTextBox = function getTextBox(fieldName, varName) {
            var lines = `
            ControlGetText, =varName= , =fieldName= ; Control name shown by WindowSpy
            `
            lines = self.utils.replace(lines, 'fieldName', fieldName)
            lines = self.utils.replace(lines, 'varName', varName)
            self.data.content.push(lines)
        }

        p.showVal = function showVal(varName, openWindow) {
            var lines = `
            MsgBox %=varName=%
            `
            lines = self.utils.replace(lines, 'varName', varName)
            self.data.content.push(lines)
        }
        p.clickButton = function clickButton(buttonName) {
            var lines = `
             ControlClick, =buttonName=
            `
            lines = self.utils.replace(lines, 'buttonName', buttonName)
            self.data.content.push(lines)
        }

        p.ifVal = function ifVal(varName, openWindow) {
            var lines = `
            MsgBox %=varName=%
            `
            lines = self.utils.replace(lines, 'varName', varName)
            self.data.content.push(lines)
        }
        p.ifContains = function ifVal(varName, ifVal) {
            var lines = `
            if =varName= contains =ifVal= 
            `
            lines = self.utils.replace(lines, 'varName', varName)
            lines = self.utils.replace(lines, 'ifVal', ifVal)
            self.data.content.push(lines)
        }
        p.showMsgBox = function showMsgBox(varName) {
            var lines = `
            MsgBox =varName=
            `
            lines = self.utils.replace(lines, 'varName', varName)
            self.data.content.push(lines)
        }

        p.requireWindow = function requireWindow(a, b) {
            var template = `
            SetTitleMatchMode, 2 ; 
            IfWinExist, =a= =b=
            {
                WinActivate  ; Automatically uses the window found above.
                ; WinMaximize  ; same
                ; Send, Some text.{Enter}
                ; return
            } else { 
                return
            }`

            b = sh.str.prepend(b, ', ', '')
            var cmd = sh.str.template(template, '=a=', a)
            cmd = sh.str.template(cmd, '=b=', b)
            self.data.content.push(cmd)

        }

    }
    defineFields();

    p.runGTAHKQW = function asdf(cmds) {
        var cmd = ''
        cmd = ['node', sh.fs.join(__filename)] //__dirname, 'GoToAutoHotKeyQuick.js')]
        cmd = cmd.concat(cmds)
        /* cmd = ['node', sh.fs.join(__dirname, 'GoToAutoHotKeyQuick.js'), 'morrisonstephen@gmail.com',
         'https://mail.google.com/mail/u/0/#inbox/', 'regex', 'norun']*/
        cmd = cmd.join(' ')
        var output = sh.run(cmd)
        console.log('output', output.toString())
    }

    p.openFile = p.init;

    p.showCommands = function showCommands(content) {
        console.log('content')
        self.data.contentStr = self.data.content.join(sh.n)
        console.log(self.data.contentStr)
    }
    p.writeAHKFile = function writeAHKFile(content) {
        var fileAHK = 'gt_autohotkey_quick2.tmp.ahk'

        if (self.settings.dirStore) {
            fileAHK = self.settings.dirStore + '/' + fileAHK
        }

        if (content == null) {
            self.data.contentStr = self.data.content.join(sh.n)
            content = self.data.contentStr;
        }
        sh.writeFile(fileAHK, content)
        console.log('writeAHKFile-Output:', sh.n, content)
        sh.run(fileAHK)
        return
    }

    p.push = function push(cmd) {
        self.data.content.push(cmd)
    }
    function defineUtils() {
        p.utils = {};
        p.utils.carP = function carP(currentVal, ifNullUse) {
            if (currentVal != null) {
                return currentVal;
            }
            if (ifNullUse == 'true' || ifNullUse == true) {
                return true
            }

            return undefined;
        }
        p.utils.replace = function replace(line, varName, varVal) {
            line = line.split('='+varName+'=').join(varVal)
            return line
        }
        p.utils.searchForArgOption_startsWith = function searchForArgOption_startsWith(argName, setPropVal, msg) {
            //asdf.g
            console.log('args', process.argv, argName)
            sh.each(process.argv, function checkAllArgs(k, v) {
                if (v.startsWith(setPropVal + ':')) {
                    var setV = v.replace(setPropVal + ':', '')
                    self.proc('found ', setV, msg)
                    self.settings[argName] = setV
                    return false;
                }
            })
        }
        p.utils.searchForArgOption = function searchForArgOption(argName, setPropVal, msg) {
            //asdf.g
            console.log('args', process.argv, argName)
            sh.each(process.argv, function checkAllArgs(k, v) {
                if (v == setPropVal) {
                    self.proc('found ', v, msg)
                    self.settings[argName] = true
                    return false;
                }
            })
        }
    }

    defineUtils();

    function defineKeyboard() {
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

        k.sendKeys = function sendKeys(keyToSend) {
            var args = sh.args(arguments);
            if (args.length > 1 ) {
               // console.log(args, 'args')
               // sh.x()
                keyToSend = args.join('');
            }
            var template = 'Send keysToSend'
            var cmd = sh.str.template(template, 'keysToSend', keyToSend, true)
            console.error('---sendkes', cmd)
            self.push(cmd)
            return;
        }
        k.sendKeysRaw = function sendKeysRaw(keyToSend) {
            var args = sh.args(arguments);
            if (args.length > 1 ) {
                keyToSend = args.join('');
            }
            var template = 'SendRaw keysToSend'
            var cmd = sh.str.template(template, 'keysToSend', keyToSend, true)
            console.error('---sendkes', cmd)
            self.push(cmd)
            return;
        }

        k.sendFKey = function sendFunctionKey(num) {
            k.sendKeys("{" + 'F' + num + "}")
        }
        k.escape = function escape() {
            k.sendKeys("{ESC}")
        }
        k.end = function end() {
            k.sendKeys("{END}")
        }
//sdf.g.d.e
        self.keys = {}
        self.keys.alt = k.alt = '!'
        self.keys.ctrl = k.ctrl = '^'
        k.shift = '+'
        k.win = '#'
        //self.keys.tab = '{Tab}'
        self.keys.esc = '{ESC}'
        self.keys.tab = '{Tab}'

        k.backspace = function backspace() {
            k.sendKeys("{BACKSPACE}")
        }

        k.space = function space() {
            k.sendKeys("{SPACE}")
        }


        k.tab = function tab() {
            k.sendKeys("{Tab}")
        }
        k.actionKey = function actionKey() {
            k.sendKeys("{AppsKey}")
        }

        p.accept = k.enter = function enterKey() {
            k.sendKeys("{Enter}")
        }

        k.selectAll = function selectAll() {
            k.sendKeys(self.keys.ctrl, 'a')
        }

        k.type = k.typeAnything = function typeAnything() {
            k.sendKeysRaw( 'random string')
        }

        k.copy = function copy() {
            k.sendKeys(self.keys.ctrl, 'c')
        }

        k.paste = function paste() {
            k.sendKeys(self.keys.ctrl, 'v')
        }
    }
    defineKeyboard();

    p.clearSearch = function clearSearc() {
        self.k.sendKeys("^+a")
    }

    p.goToLastWindow2 = function goToLastWindow2() {
        //self.k.sendKeys("^+a")
        self.k.sendKeys(self.keys.alt,self.keys.esc)
    }

    p.goToLastWindow = function goToLastWindow() {
        //self.k.sendKeys("^+a")
        self.k.sendKeys(self.keys.alt,self.keys.tab)
    }

    function defineBrowserMethods() {
        p.browser = {};
        p.browser.reload = function browserRrelowad() {
            self.k.sendKeys(self.keys.ctrl,'r')
        }

        p.browser.goToAddressBar = function goToAddressBar() {
            self.k.sendKeys(self.keys.ctrl,'l')
        }
    }
    defineBrowserMethods();

    function evernoteMethods() {
        p.editTags = function editTags() {
            self.k.sendKeys(self.k.ctrl,self.k.alt,'t')
        }

        p.editTags.removeAllTags = function removeAllTags() {
            self.k.sendKeys(self.k.alt,'c')
        }

        p.editTags.ok = function ok() {
            self.accept()
        }

        p.actions = {}
        p.actions.setTags = function setTags(tags) {
            /*
             y.editTags()
             y.editTags.removeAllTags()
             self.editTags.ok();
             self.editTags()
             self.wait(1)
             self.k.sendKeys( 'log' )
             self.k.space();
             self.wait(1)
             self.editTags.ok();
             */
            tags = sh.args(arguments)

            self.editTags()
            self.editTags.removeAllTags()
            self.editTags.ok();
            self.editTags()
            self.wait(1)
            sh.each(tags, function addTag(k,tag) {
                self.k.sendKeys( tag )
                self.k.space();
                self.wait(0.25)
            })
            //self.k.sendKeys( 'log' )

            self.wait(1)
            self.editTags.ok();

        }

        p.actions.makeDailyLog = function makeDailyLog() {
            self.actions.cloneNoteNamed('log template')
        }

        p.actions.cloneNoteNamed = function clonedNoteNamed(name, setTitleTo) {
            /*
             self.k.sendFKey('6')
             self.k.sendKeys(sh.qq("log template"))
             self.wait(0.5)
             self.accept();




             self.k.tab();
             self.k.actionKey();
             self.wait(0.5)
             self.k.sendKeys('d')
             self.wait(1)
             self.k.end()
             self.wait(1)
             self.k.tab();


             var moment = require('moment');
             self.k.sendKeys( moment().format('MM/DD/YYYY h:mm:ss a') )

             self.clearSearch()

             self.wait(1)
             self.k.tab();
             self.k.end()
             self.k.sendKeys( ' ' )

             */

            self.k.sendFKey('6')
            self.k.sendKeys(sh.qq(name))
            self.wait(0.5)
            self.accept();

            self.k.tab();
            self.k.actionKey();
            self.wait(0.5)
            self.k.sendKeys('d')
            self.wait(1)
            self.k.end()
            self.wait(1)
            self.k.tab();

            if ( setTitleTo == null ) {
                var moment = require('moment');
                self.k.sendKeys(moment().format('MM/DD/YYYY h:mm:ss a'))
            } else {
                self.k.sendKeys(setTitleTo)
            }
            self.clearSearch()

            self.wait(1)
            self.k.tab();
            self.k.end()
            self.k.space();
        }

    }
    evernoteMethods();

    p.wait = function wait(time) {
        time = sh.dv(time, 1);
        var timeMs = time * 1000
        var template = 'Sleep, DelayInMillisons'
        var cmd = sh.str.template(template, 'DelayInMillisons', timeMs, true)
        //console.error('---sendkes', cmd)
        self.push(cmd)
        return;
    }


    p.proc = function debugLogger() {
        if (self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }
}


if (module.parent == null) {
    var y = new AutoHotKeyAutomator();
    y.init();

    var name = 'morrisonstephen@gmail.com - Evernote'
    y.requireWindow(name)
    // y.goTo(  name )
    y.showCommands()


    y.actions.makeDailyLog();
    y.actions.setTags('log')



    y.writeAHKFile();
}

exports.AutoHotKeyAutomator = AutoHotKeyAutomator;
