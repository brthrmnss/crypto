/**
 * Created by user1 on 7/16/2014.
 */




var sh = require('shelpers').shelpers;
var OptionsHelper = require('shelpers').OptionsHelper

/*
NODES:
    nodes = 3
inputs = 2
outputs = 1
output node is 3
CONNECTIONS:
    groups = 0
1-3 from 0
1-2 from i1-i2
3 from 1-2
SPECIAL:
    selected = 1-2
weight_limit = 1.0

alias
asdfasdf=1
sdfsdf=3
basic toploogy:
1x2x6
1->5
sdfsdf->6

input=1
hidden=2
output=3
2x2x1
input->hidden
hidden->output
->

*/


function   makeConfig() {
    var types = {}
    types.nodes = 'NODES:'
    types.connections = 'CONNECTIONS:'
    types.special = 'SPECIAL:'

    var options = {}
    options.topology = '2x2x4'
    options.callback = function () {}
    var paramsHelper = new OptionsHelper();
    paramsHelper.loadOptions(options)
    var fxCallback = paramsHelper.addOption('callback', 'completion callback', true)
    var topology = paramsHelper.addOption('topology', 'what torrent to look for', true)
    //var inputs = paramsHelper.addOption('inputs', 'number of inputs', true)
    //var inputs = paramsHelper.addOption('inputs', 'what torrent to look for', true)


    var split = topology.split('x')

    var query = paramsHelper.addOption('query', 'what torrent to look for', true)


}

makeConfig()

return


function BasicClass() {
    var p = BasicClass.prototype;
    p = this;
    var self = this;
    p.method1 = function method1(url, appCode) {
    }


    p.train = function method1(url, appCode) {
    }

    p.run = function method1(runSettings) {


        var weightsFile
        var activationFile
        //run oen more time with -V (jus toutput notes)
        //-P any nodes
        // self.getActivations()
    }

    p.list = function method1(url, appCode) {
    }


    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}
/*
 transpost e network
 set activatiosn in middle of network
 */
function testB() {
    var b = new BasicClass()
    var runSettings = {}
    runSettings.baseDir = ''
    runSettings.name = ''
    runSettings.weights = ''
    runSettings.inputs = '.data'
    runSEttings.teach = +'.teach'
    //config '.cf'

    runSettings.callback = function callback(v) {
        console.log(v)

    }
    b.run(runSettings)
}

testB()




function BasicClass2() {
    var p = BasicClass.prototype;
    p = this;
    var self = this;
    p.method1 = function method1(url, appCode) {
    }


    p.train = function method1(url, appCode) {
    }

    p.run = function method1(url, appCode) {
    }

    p.list = function method1(url, appCode) {
    }


    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}


function testRunningANetwork() {
    var CommandRunner = sh.CommandRunner;

    var cmd = new CommandRunner()

    var settings = {}
//settings.cmd = 'create.bat '+ title + ' ' +  content
    settings.cmd = 'create.bat'
//settings.args =[ title , content]

    settings.cmd = '/mnt/hgfs/Dropbox/projects/linux/xcompile/tlearn_unix/tlearn/Xor'
//$ ./../tlearn -f Xor -s 10

    settings.cmd = '/mnt/hgfs/Dropbox/projects/linux/xcompile/tlearn_unix/tlearn/Xor' +
        '/../../tDlearn'// -f Xor -s 10


    settings.cmd = './cmds.sh'// -f Xor -s 10



    settings.fxCallback = function () {
        console.log('completed the run')
    }

    cmd.execute(settings)
}

if (module.parent == null) {
    testRunningANetwork();
}


exports.BasicClass = BasicClass;



