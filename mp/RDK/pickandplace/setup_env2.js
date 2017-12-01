/**
 * Created by user1 on 12/18/2016.
 */

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var request = require('request')
var EasyRemoteTester = shelpers.EasyRemoteTester;


var RDKHelper = require('../testpython2.js').RDKHelper
function RDKHelper2() {
    var p = RDKHelper2.prototype;
    p = this;
    var self = this;

    self.settings = {}
    self.data = {};
    p.init = function init() {
        var r = new RDKHelper()
        r.init(false)
        self.data.r = r;
        self.data.r.settings.port = sh.dv(self.settings.port, 8081)
        self.test()
    }


    var m = {}
    p.m = p.machine = m


    m.add = function addMachine(name, onlyIfHere, storeIt) {

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

        if (onlyIfHere) {
            cfg.ifCmd = cfg.cmd;

            var str = storeIt + '= RDK.Item(nameOfItem)'
            var cmd = self.utils.replace(str, 'nameOfItem', name, true)
            cfg.cmd = cmd
            cfg.cmd = [cmd, storeIt]

            cfg.ifCmdFx = function onFx(result) {
                var dbg = [name, onlyIfHere];
                self.proc('result', result)
                if (result == null || result.includes == null) {
                    debugger
                }
                if (result == null) {
                    self.proc('machine is null')
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

    p.test = function test() {
        self.data.r.test(true)

       // self.data.r.m.addMachine('Bidf', true, 'r1')
       // self.data.r.m.addMachine('Table 1', true, 'frame1')
      //  self.data.r.m.addMachine('Table 2', true, 'frame2')
        self.data.r.addRDK(`
frame1 = RDK.Item('Table 1')
frame2 = RDK.Item('Table 2')
        `)

        return;
        self.data.r.addRDK(`
# Copy a ball as an object (same as CTRL+C)
ballref = RDK.Item('reference ball')
ballref.Copy()
        `)
        return
        //self.addRDK('r1')
        self.data.r.addRDK('r1.MoveJ([0,0,0,0,10,-200])')


        self.data.r.addRDK(`
# Setup global parameters
BALL_DIAMETER = 100 # diameter of one ball
APPROACH = 100      # approach distance to grab each part, in mm
nTCPs = 6           # number of TCP's in the tool
        `)


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
    }

    defineUtils();

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}

exports.RDKHelper2 = RDKHelper2;


if (module.parent == null) {

    var i = new RDKHelper2();
    i.init()

    //var i = new RDKHelper();
    //i.init()
    //i.launchSupportingTools();
}



