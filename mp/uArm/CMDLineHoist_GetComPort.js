/**
 * hoist it
 * take a get to send to command line
 * and send result?
 * init test
 *
 * add server
 * startup irb and import nodejs
 * add get request
 * send command to commadn line
 * return result
 * -x modulpe requers
 *
 * //C:\Users\user1\Dropbox\projects\soundboard\automate_android_store\autoit\
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var express = require('express')

function CMDLineHoist_GetComPort() {
    var p = CMDLineHoist_GetComPort.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;
        self.settings.port = sh.dv(self.settings.port, 11200)

        self.settings.waitMode = sh.dv(self.settings.waitMode, true)

        sh.catchErrors();


        self.cmd()

    }

    p.cmd = function cmd(config) {
        //run it up ....
        //how to run a commadn and keep calling it ?
/*

        sh.runAsync('x.bat')
        return
        sh.runAsync('powershell.exe -ExecutionPolicy Bypass -Command "'+
            sh.fs.join(__dirname+'/') + '/'+
            'ports.ps1"')
        return
*/

        var cmd = new sh.CommandRunner()
        var settings = {}
        settings.silent = self.silent
        settings.fxCallback =
            function commandFinished() {
                console.log(cmd.log.output)
                sh.callIfDefined(fxDone);
            }
        settings.cmd = 'cmd';
       // settings.cmd = 'PowerShell'
        settings.doNotAddCr  = true
        settings.skipSameLine  = true

        settings.fxEcho = function fxEcho(echoContent_) {
           // console.error('what is echo', echoContent.trim())

            var lines = sh.breakStringIntoLinesSafe(echoContent_)
            sh.each(lines, function findMatchingLine(k,line) {
                var isRobo =  line.includes('Arduino')
                if ( line.includes('(COM') && isRobo
                /*  echoContent.includes('Arduino') */
                ) {
                    var addCom = sh.str.before(line, ')')
                    addCom = sh.str.after(addCom, '(')
                    console.log('>>>>find a com port:', addCom)
                    sh.cid(self.settings.fxDone, addCom )
                }
            })



            if (self.settings.waitMode ) {
                if ( self.data.fxReturn )
                self.data.fxReturn(echoContent_)
            }
        }
        var args = []
        settings.args = args;
        // settings.cwd = cd;
        cmd.execute(settings)
        //settings.enableInput = true
        console.log('run', args)


        self.cmd = cmd;



        //self.cmd.write('PowerShell')

/*        setTimeout(function onsdf() {
            //self.cmd.write('Get-WMIObject Win32_SerialPort')
            self.cmd.write(' Get-WMIObject Win32_SerialPort | Select-Object Name,DeviceID,Description')
        }, 500)*/

        setTimeout(function onsdf() {
            //self.cmd.write('Get-WMIObject Win32_SerialPort')
            self.cmd.write(   'x.bat' )
        }, 500)
/*

        setTimeout(function onsdf() {
            //self.cmd.write('Get-WMIObject Win32_SerialPort')
            self.cmd.write(' Get-WMIObject Win32_SerialPort | Select-Object Name,DeviceID,Description')
        }, 2500)
*/

        function onAcceptUserInput() {
            var stdin = process.openStdin();

            stdin.addListener("data", function onGotStdIn(d) {
                // note:  d is an object, and when converted to a string it will
                // end with a linefeed.  so we (rather crudely) account for that
                // with toString() and then trim()
                // console.log("you entered: [" +
                //    d.toString().trim() + "]");
                var userInput =   d.toString().trim();

                cmd.write(userInput)
            });
        }

        onAcceptUserInput();
    }



    p.method = function method(config) {
    }

    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.getFilePath = function getFilePath(file) {
            var file = self.settings.dir+'/'+ file;
            return file;
        }

        p.proc = function debugLogger() {
            if ( self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }
    defineUtils()


}

exports.CMDLineHoist_GetComPort = CMDLineHoist_GetComPort;


CMDLineHoist_GetComPort.getCOMPort = function gsdf(fx){
    var instance = new CMDLineHoist_GetComPort();
    var config = {};
    config.fxDone = fx;
    instance.init(config)
}

if (module.parent == null) {
    var instance = new CMDLineHoist_GetComPort();
    var config = {};
    instance.init(config)
   // instance.test();
}



