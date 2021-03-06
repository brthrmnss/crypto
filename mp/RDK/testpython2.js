/**
 * Created by user1 on 12/18/2016.
 */

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var request = require('request')
var EasyRemoteTester = shelpers.EasyRemoteTester;

var colors = require('colors/safe');

/*console.log(colors.bgBlack('The style of this text will be modified'));
 console.log(colors.bgMagenta('The style of this text will be modified'));
 console.log(colors.bgCyan('The style of this text will be modified'));
 console.log(colors.bgWhite('The style of this text will be modified'));
 info = 'sdf'
 path = 'sdfsdfs'
 console.log('\x1b[36m%s\x1b[0m', info);  //cyan
 console.log('\x1b[33m%s\x1b[0m: ', path);  //yellow*/

var styleme = require('styleme')

/*console.log(styleme.red("a string"))
 console.log(styleme.blu("another string"))*/
//console.log(styleme.end());

var oldLog = console.log;
console.log = function logRedirect_output(d) { //
    // var msg = sh.args(arguments).join(' ')
    // log_file.write(util.format(msg) + '\n');
    var args = sh.args(arguments)
    oldLog.apply(console, args)
};

function RDKHelper() {
    var p = RDKHelper.prototype;
    p = this;
    var self = this;

    self.settings = {}
    self.data = {};

    self.data.count = 0;
    p.init = function init(runTests) {
        self.settings.port = sh.dv(self.settings.port, 8081)
        if (runTests != false)
            self.test()
    }


    var m = {}
    p.m = p.machine = m
    /*   m.add = function addMachine(name, double) {
     t.add(function noTryToTestContent() {
     cmd = cmd
     cmd = cmd.replace(/\//gi, "\\");
     var data = cmd
     t.quickRequest(urls.urlgenindex,
     'post', result, data);
     function result(body) {
     console.log(  data)
     console.log(sh.t, 'results', body)
     t.cb();
     }
     })
     }

     */

    m.add = m.addMachine = function addMachine(name, onlyIfHere, storeIt, fileName) {

        var cfg = {};

        storeIt = sh.dv(storeIt, 'r1')
        var fileRobot = "C:/RoboDK/Library/KUKA_KR_210_2.robot"
        var fileRobot = "C:\\RoboDK\\Library\\KUKA-KR-16-2.robot"
        cmd = [
            '#ok',
            ' #ok',
            storeIt + ' = RDK.AddFile("' + fileRobot + '")',

            self.r(storeIt + '.setName("name")', 'name', name)
        ];
        cfg.cmd = cmd
        cfg.returnVal = storeIt;

        if (onlyIfHere == true) {
            cfg.ifCmd = cfg.cmd;

            var str = storeIt + '= RDK.Item(nameOfItem)'
            var cmd = self.utils.replace(str, 'nameOfItem', name, true)
            cfg.cmd = cmd
            cfg.cmd = [cmd, storeIt]

            cfg.ifCmdFx = function onFx(result) {
                self.proc('result', result)
                if (result == null) {
                    console.log('result is invalid')
                    return false;
                }
                if (result.includes('INVALID')) {
                    return true;
                }
                self.proc('will not add machine')
                return false;
            }
        }
        self.addRDK(cfg)
        return;
    }
    m.home = m.homeMachine = function homeMachine(varMachine) {

        var cfg = {};

        varMachine = sh.dv(varMachine, self.data.currentMachine)
        cmd = [
            //'#ok',
            'home_joints = $varMachine.JointsHome()',
            'home_joints',
            '$varMachine.MoveJ(home_joints)',
            //  self.r(storeIt + '.setName("name")', 'name', name)
        ];
        self.utils.replaceCmd = function cmd(cmd, dictRepl) {
            sh.each(cmd, function replace(k, line) {
                sh.each(dictRepl, function replaceWord(str, repStr) {
                    cmd[k] = sh.replace(cmd[k], str, repStr)
                })
            })

        }

        self.utils.replaceCmd(cmd, {$varMachine: varMachine})
        cfg.cmd = cmd
        cfg.returnVal = varMachine;


        self.addRDK(cfg)
        return;
    }
    p.getItemRef = function getItem(itemName, varName) {
        var cfg = {};
        // varMachine = sh.dv(varMachine, self.data.currentMachine)
        cmd = [
             '#ok',
            'varName = RDK.Item("itemName")',
            'varName'
            //  self.r(storeIt + '.setName("name")', 'name', name)
        ];

        var args = sh.fxInfo.getArgs(getItem);
        var dict = sh.fxInfo.makeDict(args, sh.args(arguments))
        console.log('dict', dict)
        //console.log(getItem.toString())
        //get args from function name
        // asdf.g
        self.utils.replaceCmd(cmd, dict) ; //{varName: varName, itemName: itemName})
        cfg.cmd = cmd
        cfg.returnVal = 'df';
        self.addRDK(cfg)
        return;
    }
    p.rcmd = function rcmd(cmdStr, varName) {
        var cfg = {};
        cmd = [
             '#ok',
            'o2 = '+cmdStr,
            'o2',
        ];
        if ( cmdStr.includes(sh.n) ) {
            cmd = cmdStr.split(sh.n)
        }

        if ( varName ) {
            cmd.push(varName+'='+'o2')
        }
        cfg.cmd = cmd
        cfg.returnVal = 'o2';
        self.addRDK(cfg)
        return;
    }

    p.pickUp = function pickUp(itemToPickup, withTool, robotVar) {
        var cfg = {};
        // varMachine = sh.dv(varMachine, self.data.currentMachine)
        cmd = [
             '#ok',
            'robotVar.MoveJ(itemToPickup.PoseAbs())',
            //'result = itemToPickup.setParentStatic(withTool)',
            //'result'
            //  self.r(storeIt + '.setName("name")', 'name', name)
        ];

        var dict = sh.fxInfo.makeDict2(pickUp, arguments)
        console.log('dict', dict)
        self.utils.replaceCmd(cmd, dict) ; //{varName: varName, itemName: itemName})
        cfg.cmd = cmd
        cfg.returnVal = 'df';
        self.addRDK(cfg)
        return;
    }
    p.pickUp2 = function pickUp2(itemToPickup, withTool, robotVar) {
        var cfg = {};
        // varMachine = sh.dv(varMachine, self.data.currentMachine)
        cmd = [
             '#ok',
            'robotVar.MoveJ(itemToPickup)',
            //'result = itemToPickup.setParentStatic(withTool)',
            //'result'
            //  self.r(storeIt + '.setName("name")', 'name', name)
        ];

        var dict = sh.fxInfo.makeDict2(pickUp2, arguments)
        console.log('dict', dict)
        self.utils.replaceCmd(cmd, dict) ; //{varName: varName, itemName: itemName})
        cfg.cmd = cmd
        cfg.returnVal = 'df';
        self.addRDK(cfg)
        return;
    }

    self.stock = {};
    self.stock.circle = 'circle';

    p.addCircle = function f(cfg2) {
        var cfg = {};

        var varName = sh.dv(cfg2.name, 'r1')

        filePath = "C:\\Users\\user1\\Desktop\\reference ball.stl"

        filePath = "C:\\\\Users\\\\user1\\\\Desktop\\\\reference ball.stl"

        cmd = [
            varName + ' = RDK.AddFile("' + filePath + '")',
            //self.r(storeIt + '.setName("name")', 'name', name)
        ];

        if (cfg2.parent) {
            cmd.push(varName + '.setParent(' + cfg2.parent + ')')
        }

        //"C:\Users\user1\Desktop\reference ball.stl"

        cfg.cmd = cmd
        cfg.returnVal = varName;

        var onlyIfHere = true;
        if (onlyIfHere) {
            cfg.ifCmd = cfg.cmd;

            var str = varName + ' = RDK.Item(nameOfItem)'
            var cmd = self.utils.replace(str, 'nameOfItem', varName, true)
            cfg.cmd = cmd
            cfg.cmd = [cmd, varName]

            cfg.preAmble = sh.str.times(4, '\t')

            cfg.ifCmdFx = function onFx(result) {
                // var dbg = [name, onlyIfHere];
                //self.proc('result', result)
                if (result == null || result.includes == null) {
                    debugger
                }
                if (result == null) {
                    console.log(cfg.preAmble, 'machine is null')
                    return false;
                }
                if (result.includes('INVALID')) {
                    return true;
                }
                console.log(cfg.preAmble, '(fxproc)', 'will not add file')
                return false;
            }
        }
        self.addRDK(cfg)
    }


    p.addRDK = function addRDK(cmd, fxDone, nextFx) {
        var fxAddToTest = self.t.add;
        if (nextFx || cmd.addNext) {
            fxAddtoTest = t.addNext;
        }

        var cfg = {};
        if (cmd.cmd == null) {
            cfg = {cmd: cmd, fxDone: fxDone}
        } else {
            cfg = cmd;
        }


        if (sh.isArray(cfg.cmd)) {
            cfg.cmd = cfg.cmd.join(sh.n)
        }

        self.runCmd(cfg.cmd, cfg.fxDone, cfg.nextFx, cfg);

        if (cfg.returnVal) {
            var cfg2 = {}
            cfg2.cmd = cfg.returnVal
            self.addRDK(cfg2);
        }
    }

    p.addNextRDK = function addNextRDK(cmd, fxDone) {
        self.addRDK(cmd, fxDone, true)
    }


    p.runCmd = function runCmd(cmd, fxDone, fxNext, cfg) {

        var t = self.t;
        cfg = sh.dv(cfg, {})

        fxAddToChain = t.add;
        if (fxNext) {
            fxAddToChain = t.addNext
        }

        cmd = cmd.replace(/\//gi, "\\");

        cfg.cmd = cmd;

        cfg.lines = cmd.split('\n')
        if (cfg.lines.length > 1) {
            cfg.lines1 = cfg.lines.slice(0, -1)
            cfg.lines2 = cfg.lines.slice(-1)[0]
            //var firstLinesOutput = null
            fxAddToChain(function execFirstLines() {
                //console.log('zzz', cfg.cmd, 'x', cfg.lines1, cfg.lines2)
                self.data.count++
                cfg.firstLines = cfg.lines1.join(sh.n)
                t.quickRequest(t.urls.urlgenindex,
                    'post', result, cfg.firstLines);
                function result(body) {
                    console.log('')
                    //console.log(self.data.count + '' + ':')
                    process.stdout.write(self.data.count + '' + ':');

                    self.utils.logCmd(cfg.firstLines, 0, styleme.blu)
                    bodyStr = '';
                    if (body != null) {
                        self.utils.logCmd(bodyStr, 1)
                    }

                    cfg.firstLinesOutput = body
                    // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz')
                    //console.log(sh.t, 'results', body)
                    //sh.cid(fxDone,body, cmd);
                    t.cb();
                }
            })
            //cmd = lines2

            fxAddToChain(function execLastLine() {

                t.quickRequest(t.urls.urlgenindex,
                    'post', result, cfg.lines2);
                function result(body_2nd) {
                    console.log(sh.t, sh.t, '2cmd:')

                    /*
                     self.utils.logCmd(cfg.lines2, 2)
                     self.utils.logCmd('--->' + body_2nd, 3)
                     */
                    self.utils.logCmd(styleme.mag(cfg.lines2) +
                        ' ---> ' + styleme.cya(body_2nd), 2)

                    //body = firstLinesOutput+sh.n+ body;
//                        console.log('....firstLinesOutput', firstLinesOutput)
                    if (cfg.firstLinesOutput == null) {
                        cfg.firstLinesOutput = 'undefined'
                    }
                    cfg.firstLinesOutput = cfg.firstLinesOutput.toString()
                    if (cfg.firstLinesOutput.includes('Error')) {
                        var errorStr = cfg.firstLinesOutput;
                        var split = 'During handling of the above exception, another exception occurred:'
                        if ( errorStr.includes(split)) {
                            errorStr = sh.str.after(errorStr, split)
                        }
                       // errorStr = errorStr.trim()
                        console.error('7', errorStr)
                    }

                    //if failed, run ifCmdFx
                    if (cfg.ifCmdFx) {
                        if (cfg.ifCmdFx(body_2nd) === true) {
                            var cmdInner = {};
                            cmdInner.cmd = cfg.ifCmd;
                            cmdInner.addNext = true;
                            self.addRDK(cmdInner);
                        }
                    }

                    sh.cid(fxDone, body_2nd, cmd);
                    t.cb();
                }
            }, 1)

            return;
        }


        return
        /*
        else {
            fxAddToChain(function runAllCommands() {

                var data = cmd
                t.quickRequest(urls.urlgenindex,
                    'post', result, data);
                function result(body) {
                    //console.log(data)
                    console.log(sh.t, '~~~results:')
                    self.utils.logOutput(data, body)

                    if (cfg.ifCmdFx) {
                        if (cfg.ifCmdFx(body) === true) {
                            var cmdInner = {};
                            cmdInner.cmd = cfg.ifCmd;
                            cmdInner.addNext = true;
                            self.addRDK(cmdInner);
                        }
                    }

                    sh.cid(fxDone, body, cmd);
                    t.cb();
                }
            })
        }
        */
    }


    p.test = function test(returnX) {

        var c = {};
        c.port = self.settings.port
        c.showBody = false
        c.silent = true
        //c.fxDone = fxDone;
        var t = EasyRemoteTester.create('test search server API', c);


        self.data.t = self.t = t;
        t.settings.baseUrl = 'http://192.168.1.172';
        var urls = {}
        //urls.urlgenindex = t.utils.createTestingUrl('/g/blue/index.html');
        urls.urlgenindex = t.utils.createTestingUrl('/g/blue/anyurulwilldo.html');

        self.t.urls = urls;

        //t.testsDisable()
        /*   t.getR(urls.urlgenindex_userTemplate)
         .why('test with user template')
         .fxDone(function onUrl(result) {
         });

         t.getR(urls.urlgenindex)
         .why('create test product')
         .fxDone(function onUrl(result) {
         //t.assert(_.isObject(result.payment))
         //t.assert(!_(result.payment.invoice_id).isNull(), 'test product not created')
         });*/

        /*
         t.add(function noTryToTestContent() {
         var data = 'y = 5 + 2'
         //var data = '5 + 2'
         t.quickRequest(urls.urlgenindex,
         'post', result, data);
         function result(body,b,c) {
         console.log(sh.t, 'results', body)
         // t.assert(body.error == null , 'bad data ')
         //   sh.callIfDefined(fxDone, body.credit)
         t.cb();
         }
         })

         // return;
         t.add(function noTryToTestContent() {
         var data = 'print(y)'
         t.quickRequest(urls.urlgenindex,
         'post', result, data);
         function result(body) {
         console.log(sh.t, '', data)
         console.log(sh.t, 'results', body)
         t.cb();
         }
         })

         t.add(function noTryToTestContent() {
         var data = 'y'
         t.quickRequest(urls.urlgenindex,
         'post', result, data);
         function result(body) {
         console.log(sh.t, '', data)
         console.log(sh.t, 'results', body)
         t.cb();
         }
         })

         t.add(function noTryToTestContent() {
         var data = 'print(RDK.AddFile)'
         t.quickRequest(urls.urlgenindex,
         'post', result, data);
         function result(body) {
         console.log(sh.t, '', data)
         console.log(sh.t, 'results', body)
         t.cb();
         }
         })*/

        function runCmd1(cmd, fxDone) {

            t.add(function noTryToTestContent() {
                cmd = cmd
                cmd = cmd.replace(/\//gi, "\\");
                var data = cmd
                t.quickRequest(urls.urlgenindex,
                    'post', result, data);
                function result(body) {
                    /*
                     console.log(data)
                     console.log(sh.t, 'results', body)
                     */
                    console.log(data)
                    var body = body.split('\n').join('\n\t')
                    if (body.includes('exception')) {
                        console.error(body)
                    } else {
                        console.log(body)
                    }


                    sh.cid(fxDone, body, cmd);
                    t.cb();
                }
            })
        }


        //runCmd(['1;', 'r1;'].join(sh.n));

        //return;


        /*

         var y = `
         5==1
         `
         runCmd(y);

         return;
         var y = `y = 5 + 4 `
         runCmd(y);
         var y = `y
         y`
         runCmd(y);
         return;



         */
        if (returnX) {
            return t;
        }


        return;


        /*
         runCmd('y = 5 + 2');
         runCmd('print(y)');
         runCmd('print(RDK.AddFile) ');
         runCmd('print(RDK.AddFile) ');
         */


        var y = `
5==1
`
        var y = `y = 5 + 4 `
        runCmd(y);
        var y = `y`
        runCmd(y);


        self.addRDK("RDK.Item('bovoty')")


        /*

         runCmd('RDK')
         runCmd('RDK.AddFile("C:/Ro' +
         'boDK/Library/KUKA_KR_210_2.robot")');

         */

        return;
        var y = `
#print(RDK.AddFile)  
#print(RDK.AddFile) 
r1 = RDK.AddFile("C:/RoboDK/Library/KUKA_KR_210_2.robot")
r1.setName("booty")
r1b = RDK.Item("booty")
print("is sname?",r1==r1b)
r1
`

        runCmd(y);


        return
        runCmd('r1 = RDK.AddFile("C:/RoboDK/Library/KUKA_KR_210_2.robot")');


        return;

        var y = `
#print(RDK.AddFile)  
#print(RDK.AddFile) 
r1 = RDK.AddFile("C:/RoboDK/Library/KUKA_KR_210_2.robot")
r1.setName("booty")
r1b = RDK.Item("booty")
print("is sname?",r1==r1b)
r1
`
        //console.log('y', y)
        runCmd(y);
        runCmd('');
        t.wait(3)
        runCmd('r1.Delete()');


        return;
        var contents = sh.readFile('C:/Users/user1/Dropbox/projects/learndk/py.txt')
        t.add(function noTryToTestContent() {
            var data = contents
            t.quickRequest(urls.urlgenindex,
                'post', result, data);
            function result(body) {
                t.cb();
            }
        })


    }

    function defineUtils() {
        p.r = function r(cmd2, paramKey, paramValue, isString) {
            var cmd = self.utils.replace(cmd2, paramKey, paramValue, isString)
            return cmd;
        }

        p.utils = {};
        p.utils.replace = function replace(cmd, findInStr, replaceW, isString) {
            if (isString) {
                replaceW = sh.qq(replaceW)
            }
            cmd = sh.replace(cmd, findInStr, replaceW)
            //console.log('cmd', cmd)
            return cmd;
        }

        p.utils.logOutput = function logOutput(cmd, output) {
            console.log(sh.t, cmd)
            var outputStr = sh.t + '' + output.split('\n').join('\n\t')
            if (output.includes('exception')) {
                console.error('dhh',outputStr)
            } else {
                console.log(outputStr)
            }

        }

        p.utils.replaceCmd = function cmd(cmd, dictRepl) {
            sh.each(cmd, function replace(k, line) {
                sh.each(dictRepl, function replaceWord(str, repStr) {
                    cmd[k] = sh.replace(cmd[k], str, repStr)
                })
            })

        }

        p.utils.logCmd = function logCmd(output, tabCount, fxP) {
            //  console.log(sh.t, 'input:',cmd)
            var tab = '\t'
            if (tabCount) {
                sh.each.times(tabCount, function ok() {
                    tab += sh.t
                })
            }
            var outputStr = tab + '' + output.split('\n').join('\n' + tab)
            if (output.includes('exception')) {
                console.error('d', outputStr)
            } else {
                //fxP = sh.div(fxP, sh.noOp)
                if (fxP) {
                    outputStr = fxP(outputStr)
                }
                console.log(outputStr)
            }

        }
    }

    defineUtils();

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}

exports.RDKHelper = RDKHelper;


if (module.parent == null) {


    var i = new RDKHelper();
    i.init()


    //var i = new RDKHelper();
    //i.init()
    //i.launchSupportingTools();
}



