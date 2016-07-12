/**
 * Created by user2 on 8/26/15.
 */
/*
 Every x secs ....
 check if folder is around ...
 and upload the file

 */



var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var EasyRemoteTester = shelpers.EasyRemoteTester;
var RLE_LoadConfigHelper = require('./utils/RLE_LoadConfigHelper').RLE_LoadConfigHelper;

function ManyCamMonitorFile() {
    var p = ManyCamMonitorFile.prototype;
    p = this;
    var self = this;
    p.init = function init(config) {
        config = sh.dv(config, {});
        var config = RLE_LoadConfigHelper.loadConfig('local_config.json');
        self.json = config;
        self.settings = config.manycam;
        if ( self.settings == null || self.settings.enabled == false ) {
            console.log('exiting', 'RTMPLocalEncodeServer');
            return;
        }
        console.log(self.settings)
        //asdf.g
        //self.settings.dir_uploads += '/'
        self.settings.check_dir_uploads_every_x_secs = sh.dv(self.settings.check_dir_uploads_every_x_secs, 10);
        self.settings.check_dir_uploads_every_x_secs *= 1000;


        self.int = setInterval(self.checkForNewFiles, self.settings.check_dir_uploads_every_x_secs);
        self.timeEnd = 0;
        self.count= 0;
        self.checkForNewFiles();

    }

    p.checkForNewFiles = function checkForNewFiles() {

        if ( sh.fileExists(self.settings.file_input) == false ) {
            console.log('cant see u... can read the file')
           // process.exit();
            return;
        }

        var dir = 'cnn'
        var fileInput = self.settings.file_input;
        fileInput = sh.qq(fileInput);
        var ffmpeg = 'ffmpeg'
        self.count++;
        var fileOutput = sh.getTimeStamp()+'_video_'+self.count+'.mp4'
        fileOutput = sh.getPath(fileInput) + '/' + fileOutput;
        fileOutput += '"'
        self.timeStart = self.timeEnd;
        self.timeEnd += 10;
        //ffmpeg -i "/Users/user2/Movies/ManyCam/My Recording.mp4" -ss 0 -t 10 -c:v copy -c:a copy   "/Users/user2/Movies/ManyCam/10-7-2015_20_21_38_video_1.mp4"

        var args = []
        var cmd = 'ffmpeg'
        if ( sh.isWin() ) {

            args.push(  '-i');
            args.push(  config.input);
            args.push(  config.output);
// -ss [start] -i in.mp4 -t [duration] -c:v copy -c:a copy out.mp4
            var cmd = new CommandRunner()
            var settings = {}
            settings.silent = true
            settings.fxCallback =
                function commandFinished() {
                    console.log(cmd.log.output)
                    sh.callIfDefined(config.fxDone);
                }
            settings.cmd = 'bin/ffmpeg.exe';
            settings.args = args;
            cmd.execute(settings)
            console.log('run', args)
            setTimeout(function() {
                console.log('... in middle of cmd')
            }, 800)
        } else {
            var cmd = 'ffmpeg'
            if ( sh.isWin() ) {
                cmd = '"'+__dirname+'/'+'bin/ffmpeg.exe"'
            }
            cmd += ' -i $$Inputfile $$Outputfile';
            cmd = cmd.replace('$$Inputfile', fileInput)
            cmd = cmd.replace('$$Outputfile', fileOutput)
            cmd += ' '+'-ss ' + self.timeStart+ ' ' + '-t 10'
            cmd +=     ' -c:v copy -c:a copy'
            //cmd += ' -strict -2'
            console.log(cmd)
            var opts = {};
            opts.cwd = __dirname+'/'
            sh.runAsync(cmd, function done() {
                sh.callIfDefined(config.fxDone);
            }, opts )
        }

    }

    p.uploadFile = function uploadFile(fileToUpload, fxDone) {


    }

    p.method = function method(config) {
    }

    p.test = function test() {
        var t2 = self.t.clone('test upload route');
        //t2.getR(self.urls.upload).with({channel:'cnn',test:true}).upload('config.json').bodyHas('status').notEmpty()

        self.int = setInterval(function addFile() {
            sh.writeFile(self.settings.dir+Math.random()+'.txt', 'some random file');
        }, self.settings.check_dir_uploads_every_x_secs/2);
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

ManyCamMonitorFile.createRTMPLocalEncodeServer = function createMonitor(file){
    var m = new ManyCamMonitorFile();
    //var config = sh.readJSONFile(file);
    var config = RLE_LoadConfigHelper.loadConfig(file);
    m.init(config)
    return m;

}

exports.ManyCamMonitorFile = ManyCamMonitorFile;

if (module.parent == null) {
    var m = new ManyCamMonitorFile();
    var config = sh.readJSONFile('configs/local_config.json');
    //config
    //var dirChannel = __dirname+'/channel_uploads/cnn/';
    //config.dir_uploads = dirChannel
    m.init(config);
    //m.test();
}






