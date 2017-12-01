/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;


function AutoHotKeyEvernote() {
    var p = AutoHotKeyEvernote.prototype;
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

    p.getAHKContent = function getAHKContent(content) {
        self.data.contentStr = self.data.content.join(sh.n)
        content = self.data.contentStr;

        return content
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
            self.k.ctrlAnd('a')
        }



        k.copy = function copy() {
            self.k.ctrlAnd('c')
        }
        k.paste = function copy() {
            self.k.ctrlAnd('v')
        }

        k.ctrlAnd = k.sendControlAnd = function sendControlAnd(key) {

            self.k.sendKeys(self.k.ctrl, key)
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

        k.type = k.sendKeys = function sendKeys(keyToSend) {
            var args = sh.args(arguments);
            if (args.length > 1) {
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
        k.alt = '!'
        k.ctrl = '^'
        k.shift = '+'
        k.win = '#'

        k.backspace = function backspace() {
            k.sendKeys("{BACKSPACE}")
        }

        k.space = function space() {
            k.sendKeys("{SPACE}")
        }
        k.delete = function sendDeleteKey() {
            k.sendKeys("{DELETE}")
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


    }

    defineKeyboard();

    p.getWindowPosition = function getWinPos() {
        self.push('WinGetPos, X, Y, Width, Height')
    }
    p.math = function math(cmd) {
        self.push(cmd)
    }
    p.mouseMove = function mouseMove(x, y) {
        self.push('MouseMove, ' + x + ', ' + y + '')
    }

    p.mouseClick = function mouseClick(x, y) {
        self.push('Click')//, ' + x + ', ' + y + '')
    }

    p.getTooltip = function getTooltip(yyy) {
        self.push('ControlGetText, tooltip2,,ahk_class tooltips_class32')
        if (yyy)
            self.push('msgbox, %tooltip2%')
    }


    p.clearSearch = function clearSearc() {
        self.k.sendKeys("^+a")
    }

    p.editTags = function editTags() {
        self.k.sendKeys(self.k.ctrl, self.k.alt, 't')
    }

    p.editTags.removeAllTags = function removeAllTags() {
        self.k.sendKeys(self.k.alt, 'c')
    }

    p.editTags.ok = function ok() {
        self.accept()
    }

    p.exit = function exit() {
        self.push('Exit')
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
        sh.each(tags, function addTag(k, tag) {
            self.k.sendKeys(tag)
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

        if (setTitleTo == null) {
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


    p.wait = function wait(time) {
        time = sh.dv(time, 1);
        var timeMs = time * 1000
        var template = 'Sleep, DelayInMillisons'
        var cmd = sh.str.template(template, 'DelayInMillisons', timeMs, true)
        //console.error('---sendkes', cmd)
        self.push(cmd)
        return;
    }

    function defineChrome() {
        var chrome = {};
        p.chrome = chrome
        chrome.goToWebpageNewWindow = function goToWebpageNewWindow(url) {
            var str = 'start ' + window_title
            var str = ['C:/Program Files (x86)/Google/Chrome/Application/chrome.exe ',
                '--new-window',
                window_title].join(' ')
            self.push(str)
        }
        chrome.closeWindow = function closeWindow(url) {
            self.k.ctrlAnd('w')
        }
        chrome.goToAddressBar = function goToAddressBar(url) {
            self.k.ctrlAnd('l')
        }

    }

    defineChrome();


    p.proc = function debugLogger() {
        if (self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }
}


if (module.parent == null) {
    var y = new AutoHotKeyEvernote();
    y.init();

    var name = 'morrisonstephen@gmail.com - Evernote'
    y.requireWindow(name)
    // y.goTo(  name )
    y.showCommands()


    y.actions.makeDailyLog();
    y.actions.setTags('log')


    y.writeAHKFile();
}

exports.AutoHotKeyEvernote = AutoHotKeyEvernote;
