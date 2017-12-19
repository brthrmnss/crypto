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
        /*
         self.data.r.addRDK(`
         frame1 = RDK.Item('Table 1')
         frame2 = RDK.Item('Table 2')
         `)
         */
        /*self.data.r.m.addMachine('Bidf', true, 'r1')

         self.addFrame("stock");
         //return;

         self.data.r.addCircle({
         name: "circle1",
         file: self.data.r.stock.circle,
         parent: "stock"
         });
         //self.getRoot()


         self.data.r.m.home('r1')*/



        self.data.r.m.addMachine('Bidf', true, 'r1')
        self.data.r.addCircle({
            name: "circle1",
            file: self.data.r.stock.circle,
            parent: "stock"
        });

        self.data.r.rcmd('circle1.PoseAbs()')
        self.data.r.rcmd('list= Pose_2_KUKA(circle1.PoseAbs())')
        self.data.r.rcmd('list= Pose_2_KUKA(circle1.PoseAbs())')
         //return;

        self.data.r.getItemRef('Paint gun', 'tool')
        self.data.r.rcmd('item_tool = tool')

        /*
         self.data.r.rcmd('circle1.PoseAbs() - r1.PoseAbs() + r1.Pose()', 'targetPos')
         self.data.r.rcmd('r1.Pose()')
         self.data.r.rcmd('circle1.PoseAbs() - r1.PoseAbs()  ')
         */
        self.data.r.rcmd('robot = r1')
        /*   self.data.r.rcmd('Pose_2_TxyzRxyz(circle.Pos)')
         */
        self.data.r.rcmd("item_frame = RDK.Item('stock')");

        // self.data.r.rcmd('circle1.Pose()')

        // self.data.r.rcmd('circle1.Pose()')
        /*
        self.data.r.rcmd(
`
result =item_tool.AttachClosest()
result
`
        )
        */

        self.data.r.rcmd(
            `
APPROACH = 100  # approach distance in MM for each path    
home_joints = [0,0,0,0,90,0] # home joints, in deg

robot.setPoseFrame(item_frame)
robot.setPoseTool(item_tool)
robot.MoveJ(home_joints)

orient_frame2tool = invH(item_frame.Pose())*robot.SolveFK(home_joints)*item_tool.Pose()
orient_frame2tool[0:3,3] = Mat([0,0,0])


#p_0 = path.getPoint(0)
p_0 = Pose_2_KUKA(circle1.PoseAbs())
p_0 = Pose_2_KUKA(circle1.Pose())
#target0 = transl(p_0.x, p_0.y, 0)*orient_frame2tool
target0 = transl(p_0[0], p_0[1], 0)*orient_frame2tool
target0_app = target0*transl(0,0,-APPROACH)
print(target0, target0_app)
print(robot.Joints())
robot.MoveJ(target0_app)
        
`
        )

        // self.data.r.pickUp2('targetPos', 'tool', 'r1');

        return;


        self.data.r.pickUp('circle1', 'tool', 'r1')
        //self.data.start
        return;
        self.data.addBall()

        self.data.addTarget('newTarget')
        self.data.deleteItemNamed('ball')
        self.data.deleteItemNamedAny('ball')

        //pickUpdateItem
        //putItemInJar
        /*
         i classify
         localte item
         robot reaches it ...
         need conveyor bulet
         */


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

        p.addFrame = function f(name) {
            var cfg = {};

            var varName = sh.dv(name, 'r1')
            cmd = [
                varName + ' = RDK.AddFrame("' + name + '")',

                //self.r(storeIt + '.setName("name")', 'name', name)
            ];
            cfg.cmd = cmd
            cfg.returnVal = varName;

            var onlyIfHere = true;
            if (onlyIfHere) {
                cfg.ifCmd = cfg.cmd;

                var str = varName + '= RDK.Item(nameOfItem)'
                var cmd = self.utils.replace(str, 'nameOfItem', name, true)
                cfg.cmd = cmd
                cfg.cmd = [cmd, varName]

                cfg.ifCmdFx = function onFx(result) {
                    var dbg = [name, onlyIfHere];
                    //self.proc('result', result)
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
                    //process.stdout.write("hello: ");
                    console.log(sh.t, sh.t, sh.t, '(proc)-->', 'will not add machine')
                    return false;
                }
            }
            self.data.r.addRDK(cfg)
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



