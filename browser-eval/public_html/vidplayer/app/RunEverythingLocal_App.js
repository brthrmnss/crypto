/**
 * Created by user2 on 8/28/15.
 */
/*
 Runs all three parts
 Local encode
 Uploader
 channel split
 */

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
process.chdir(__dirname)
function RunEverythingLocal() {
    var p = RunEverythingLocal.prototype;
    p = this;
    var self = this;
    p.init = function init(config) {
        self.settings = sh.dv(config, {});

        var dirUpChannel = 'channel_uploads' + '/' + 'cnn' + '/'
        //sh.fs.deleteDir(dirUpChannel);
        sh.mkdirp(dirUpChannel);

        var dirChannel = 'channels' + '/' + 'cnn' + '/'
        //sh.fs.deleteDir(dirChannel);
        sh.mkdirp(dirChannel);

        var fileJSON = 'local_config.json';
        //fileJSON = 'local_config_using_ripper.json';
        //fileJSON = sh.dv(sh.progArg(0), fileJSON);
        var RLE_LoadConfigHelper = require('./utils/RLE_LoadConfigHelper').RLE_LoadConfigHelper
        var jsonConfig = RLE_LoadConfigHelper.loadConfig(fileJSON);
        var jsonConfigPath = RLE_LoadConfigHelper.loadConfigPath(fileJSON);

        var foreverUseToRestart = false;

        if ( foreverUseToRestart ) {
            var forever = require('forever-monitor');
            var child = new (forever.Monitor)('RTMPLocalEncodeServerWrapper.js', {
                max: 10,
                silent: true,
                args: [fileJSON]
            });
            child.on('exit', function () {
                console.log('RTMPLocalEncodeServerWrapper has exited after 10 restarts');
            });
            child.start();
        } else {
            //run local encode
            var RTMPLocalEncodeServer = require('./RTMPLocalEncodeServer').RTMPLocalEncodeServer;
            var r  = RTMPLocalEncodeServer.createRTMPLocalEncodeServer(fileJSON);
        }


        //run channel server
        var ChannelServer = require('./ChannelServer').ChannelServer;
        var c = ChannelServer.createChannelServer(fileJSON);
        //run splitter
        var MonitorDir = require('./MonitorDir_UploadTo').MonitorDir;
        var m  = MonitorDir.createMonitorDir(fileJSON);
        //start odbs
        var StartOBS = require('./StartOBS').StartOBS;
        var m  = StartOBS.startOBS(fileJSON);
        //start file splitter
        var StartOBSSplit = require('./OBS_Split');//.StartOBSSplit;
        var m  = StartOBSSplit.StartOBSSplit(fileJSON);
    }

    p.test = function test(config) {
        setTimeout(function () {
            self.proc('testing by fake uploads')
            //clear uploads
            var dirUpChannel = 'channel_uploads' + '/' + 'cnn' + '/'
            //sh.fs.deleteDir(dirUpChannel);
            sh.mkdirp(dirUpChannel);

            var dirChannel = 'channels' + '/' + 'cnn' + '/'
            //sh.fs.deleteDir(dirChannel);
            sh.mkdirp(dirChannel);

            var dirCopyFrom = '../public_html/test_vids/brent/b/';
            var files = sh.getFilesInDirectory(dirCopyFrom , false, true);//, false, null, null, false)
            self.proc('files', files)
            sh.async(files, function copyFile(fileName, fxDone) {
                console.log('.file', fileName)

                var fileFrom = dirCopyFrom + fileName;
                var contents = sh.readFile(fileFrom,null, true);
                var fileTo = dirUpChannel + fileName;
                sh.writeFile(fileTo, contents);
                //sh.copyFile2(fileFrom, fileTo);
                console.log('copied', fileFrom, fileTo);
                setTimeout(function () {
                    console.log('...')
                    fxDone();
                }, 5000);
            })
        }, 2000);


    }
    p.method = function method(config) {
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.RunEverythingLocal = RunEverythingLocal;

if (module.parent == null) {
    var instance = new RunEverythingLocal();
    var config = {};
    instance.init(config);
}



