/**
 * Created by user2 on 3/29/16.
 */
/*
* why: b/c i want it ......
* run the sh command helper
* for late input
* for moving to different directories
* is there a better way ?
* */

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var CommandRunner = sh.CommandRunner


var self = {}
var args = [];

var cmdtxt = 'say'
args = ['snark snark snark .... what is this? ']

  cmdtxt = 'node'
args =  [__dirname+'/'+ 'public_html/'+'testscript.js']
cd = __dirname+'l';


function fxDone () {

}

var cmd = new CommandRunner()
var settings = {}
settings.silent = self.silent
settings.fxCallback =
    function commandFinished() {
        console.log(cmd.log.output)
        sh.callIfDefined(fxDone);
    }
settings.cmd = cmdtxt
settings.args = args;
settings.cwd = cd;
cmd.execute(settings)
console.log('run', args)





setTimeout(function endProcess() {
     cmd.terminal.kill(sh.pid, 'SIGINT');
    //cmd.write("\x03");
    //cmd.write2("\x03");
    console.log('end...')
}, 1000)
