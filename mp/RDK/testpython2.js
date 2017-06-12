/**
 * Created by user1 on 12/18/2016.
 */

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var request = require('request')
var EasyRemoteTester = shelpers.EasyRemoteTester;

function RDKHelper() {
    var p = RDKHelper.prototype;
    p = this;
    var self = this;

    self.settings = {}
    self.data = {};
    p.init = function init() {
        self.settings.port = sh.dv(self.settings.port, 8081)
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

    m.add = function addMachine(name, onlyIfHere, storeIt) {

        var cfg = {};

        storeIt = sh.dv(storeIt, 'r1')

        cmd = [
            storeIt+' = RDK.AddFile("C:/RoboDK/Library/KUKA_KR_210_2.robot")',
            self.r(storeIt+'.setName("name")','name', name)
        ];
        cfg.cmd = cmd
        cfg.returnVal = storeIt;

        if ( onlyIfHere) {
            cfg.ifCmd = cfg.cmd;

            var str = storeIt+'= RDK.Item(nameOfItem)'
            var cmd = self.utils.replace(str, 'nameOfItem', name, true)
            cfg.cmd = cmd
           cfg.cmd = [cmd,storeIt]

            cfg.ifCmdFx = function onFx(result) {
                self.proc('result', result)
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

    p.test = function test(){

        var c = {};
        c.port =  self.settings.port
        c.showBody = false
        c.silent = true
        //c.fxDone = fxDone;
        var t = EasyRemoteTester.create('test search server API', c);

        self.data.t = self.t = t;
        var urls = {}
        //urls.urlgenindex = t.utils.createTestingUrl('/g/blue/index.html');
        urls.urlgenindex = t.utils.createTestingUrl('/g/blue/anyurulwilldo.html');


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
                    console.log(  data)
                    console.log(sh.t, 'results', body)



                    sh.cid(fxDone,body, cmd);
                    t.cb();
                }
            })
        }

        function runCmd(cmd, fxDone, fxNext, cfg) {

            cfg = sh.dv(cfg, {})

            fxAddToChain = t.add;
            if ( fxNext ) {
                fxAddToChain = t.addNext
            }

            cmd = cmd.replace(/\//gi, "\\");

            var lines = cmd.split('\n')
            if ( lines.length > 1) {
                lines1 = lines.slice(0,-1)
                lines2 = lines.slice(-1)[0]
                var firstLinesOutput = null
                fxAddToChain(function sendFirstLines() {
                    var data = lines1.join(sh.n)
                    t.quickRequest(urls.urlgenindex,
                        'post', result, data);
                    function result(body) {
                        console.log('1',  data)
                        firstLinesOutput = body
                        //console.log(sh.t, 'results', body)
                        //sh.cid(fxDone,body, cmd);
                        t.cb();
                    }
                })
                //cmd = lines2

                fxAddToChain(function checkLastLine() {

                    var data = lines2
                    t.quickRequest(urls.urlgenindex,
                        'post', result, data);
                    function result(body) {
                        console.log( '2', cmd)
                        //body = firstLinesOutput+sh.n+ body;
//                        console.log('....firstLinesOutput', firstLinesOutput)
                        if ( firstLinesOutput == null ) { firstLinesOutput  = 'undefined'}
                        firstLinesOutput= firstLinesOutput.toString()
                        if ( firstLinesOutput.includes('Error')) {
                            console.error(firstLinesOutput)
                        }
                        body
                        console.log('|',sh.t,'results',body,'|')


                        if ( cfg.ifCmdFx ) {
                            if ( cfg.ifCmdFx(body) === true ) {
                                var cmdInner = {};
                                cmdInner.cmd = cfg.ifCmd;
                                cmdInner.addNext = true;
                                self.addRDK(cmdInner);
                            }
                        }

                        sh.cid(fxDone,body, cmd);
                        t.cb();
                    }
                },1)

                return;
            }

            fxAddToChain(function noTryToTestContent() {

                var data = cmd
                t.quickRequest(urls.urlgenindex,
                    'post', result, data);
                function result(body) {
                    console.log(  data)
                    console.log(sh.t, 'results', body)

                    if ( cfg.ifCmdFx ) {
                        if ( cfg.ifCmdFx(body) === true ) {
                            var cmdInner = {};
                            cmdInner.cmd = cfg.ifCmd;
                            cmdInner.addNext = true;
                            self.addRDK(cmdInner);
                        }
                    }


                    sh.cid(fxDone,body, cmd);
                    t.cb();
                }
            })
        }





        self.addRDK = function addRDK(cmd, fxDone, nextFx) {
            var fxAddToTest = t.add;
            if ( nextFx || cmd.addNext ) {
                fxAddtoTest = t.addNext;
            }

            var cfg = {};
            if ( cmd.cmd == null ) {
                cfg = {cmd:cmd, fxDone:fxDone}
            } else {
                cfg = cmd;
            }


            if ( sh.isArray(cfg.cmd) ) {
                cfg.cmd = cfg.cmd.join(sh.n)
            }

            runCmd(cfg.cmd, cfg.fxDone, cfg.nextFx, cfg);


            /*fxAddToTest(function noTryToTestContent() {
                if ( sh.isArray(cfg.cmd) ) {
                    cfg.cmd = cfg.cmd.join(sh.n)
                }
                cmdStr = cfg.cmd.replace(/\//gi, "\\");
                t.quickRequest(urls.urlgenindex,
                    'post', result, cmdStr);
                function result(body) {
                    console.log(  cmdStr)
                    console.log(sh.t, 'results', body)

                    if ( cfg.ifCmdFx ) {
                        if ( cfg.ifCmdFx(body) === true ) {
                            var cmdInner = {};
                            cmdInner.cmd = cfg.ifCmd;
                            cmdInner.addNext = true;
                            self.addRDK(cmdInner);
                        }
                    }

                    sh.cid(fxDone,body, cmdStr);
                    t.cb();
                }
            })*/

            if ( cfg.returnVal ) {
                var cfg2  = {}
                cfg2.cmd = cfg.returnVal
                self.addRDK(cfg2);
            }
        }

        self.addNextRDK = function addNextRDK(cmd, fxDone) {
            self.addRDK(cmd, fxDone, true)
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


        self.m.add('Bidf', true, 'r1')
        //self.addRDK('r1')
        self.addRDK('r1.MoveJ([0,0,0,0,10,-200])')
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
            var cmd = self.utils.replace(cmd2,paramKey, paramValue, isString)
            return cmd;
        }

        p.utils = {};
        p.utils.replace = function replace(cmd, findInStr, replaceW, isString) {
            if ( isString ) {
                replaceW = sh.qq(replaceW)
            }
            cmd = sh.replace(cmd, findInStr, replaceW)
            //console.log('cmd', cmd)
            return cmd;
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

exports.RDKHelper = RDKHelper;




var i = new RDKHelper();
i.init()




if (module.parent == null) {

    //var i = new RDKHelper();
    //i.init()
    //i.launchSupportingTools();
}



