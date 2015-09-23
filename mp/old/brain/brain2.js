/**
 * Created by user1 on 7/16/2014.
 */




setTimeout( function s () {

}, 6*1000*10 )





var sh = require('shelpers').shelpers;






function   makeConfig() {

}

makeConfig()

return


function BasicClass() {
    var p = BasicClass.prototype;
    p = this;
    var self = this;
    var types  = {}
    types.tlearn = {}
    types.learn.dir = 's'
    p.method1 = function method1(url, appCode) {
    }


    p.inputPatterns = function inputPatterns() {
        return self.file + '.data'
    }

    p.networkConfiguration = function networkConfiguration() {
        return self.file + '.cf'
    }

    p.weights = function weights() {
        return self.file + '.wts'
    }



    p.teachFile = function teachFile() {
        return self.file + '.teach'
    }

    p.train = function method1(options) {
        var opts = options


        //write inputs
        //write outputs
        var cmdArgs = []
        var cmdOpts = {}
        cmdArgs.push('-f', options.fileRoot) //store file temprariliy

        //
        cmdArgs.push('-s', options.sweeps) //number of spweets
        cmdArgs.push('-C', options.checkpoint) //store file temprariliy
        //weights file
        cmdArgs.push('-l', options.weights) //store file temprariliy


        cmdOpts.cmd = 'tlearn'
        cmdOpts.dir = 'safsdfa'
        cmdOpts.args = cmdArgs.join(' ')
        CommandRunner.run(cmdOpts)
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
    config '.cf'

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



