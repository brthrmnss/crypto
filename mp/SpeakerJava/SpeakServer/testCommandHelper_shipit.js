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



var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');






function BasicClass() {
    var p = BasicClass.prototype;
    p = this;
    var self = this;
    p.init = function init(url, appCode) {

        var self = {}
        var args = [];

        var cmdtxt = 'say'
        args = ['snark snark snark .... what is this? ']

        cmdtxt = 'cmd'
        args =  [__dirname+'/'+ 'public_html/'+'testscript.js']
        cd = __dirname+'l';

        cmdtxt = 'ssh'
        args = ['-tt', '127.0.0.1']


        cmdtxt = 'su'
        args = ['-c', 'whoami', 'user']

        cmdtxt = 'shipit'
        cd = '/media/psf/Dropbox/projects/crypto/deploy_nodejs/ritv/'

        cmdtxt = './x.sh'


        //cmdtxt = '/home/user/.nvm/versions/node/v0.12.5/bin/shipit staging list'

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

    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}

exports.BasicClass = BasicClass;

if (module.parent == null) {
/*

    // http://nodejs.org/api.html#_child_processes
    var sys = require('sys')
    var exec = require('child_process').exec;
    var child;
// executes `pwd`
    child = exec("shipit", function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.error('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
*/



    var b = new BasicClass();
    b.init();
}


