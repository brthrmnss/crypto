/**
 * Created by user2 on 8/24/15.
 * Split output of file in obs directory
 *
 */
// window.x = 'yes'
var fs = require('fs');

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var RLE_LoadConfigHelper = require('./utils/RLE_LoadConfigHelper').RLE_LoadConfigHelper
var CommandRunner = sh.CommandRunner

function OBS_Split() {

    var p = OBS_Split.prototype;
    p = this;
    var self = this;

    p.init = function start(opts, appCode) {
        var custom = true
        custom = false;
        opts = sh.dv(opts, {});
        self.settings = opts
        self.json = opts
        self.settings = self.settings.filesplitter;
        if ( self.settings.enabled == false )
            return;
        if (self.settings.dir == null)
            self.settings.dir = __dirname + '/' + 'channels/'

        self.settings.max_files_per_channel = sh.dv(self.settings.max_files_per_channel, 4);
        //var expressHttpsHelper = require('./../../nodejs-ssl-example-master/expressHttpsHelper.js')
        //expressHttpsHelper = expressHttpsHelper.expressHttpsHelper;

        self.dir = 'C:/Users/user1/Videos/cnn'


        var files = sh.getFilesInDirectory(self.dir)
        sh.each(files, function deleteAllFiles(i,file) {
            try {
                sh.deleteFile(self.dir+'/'+file)
            } catch (e) {}
        })


        var files = sh.getFilesInDirectory(self.dir)

        self.proc('files', files)



        self.count = 0;
        var file = files[0];
        self.file = self.dir + '/'+ file;

        //var fileOutput =
        self.startTime  = 0;

        setTimeout(function delayToB() {
            self.proc('started with delay')
            setInterval(self.asdf, 10000 );
        },2000)

    }

    p.asdf = function a() {
        self.startTime += 10
        if ( self.count == 0 )
            self.proc('started with delay')
        self.count++;
        var fileOutput = sh.getTimeStamp()+'video'+self.count+'.flv'
        var fileOutput = sh.getTimeStamp()+'video'+self.count+'.mp4'
        var dirUpChannel = 'channel_uploads' + '/' + self.json.channel_name + '/'
        //  var channel =  self.json.channel_name;
        fileOutput  =  dirUpChannel + '/' + fileOutput;



        var args = []
        var cmd = 'ffmpeg'
        if ( sh.isWin() ) {
            /*
             args.push(  '-ss');
             args.push(  self.startTime );
             args.push(  '-i');
             args.push(  self.file);
             args.push(  '-t' );
             args.push(  '10' );

             args = args.concat("-c:v copy -c:a copy".split(' '));
             */


            args.push(  '-i');
            args.push(  self.file);
            args.push(  '-ss');
            args.push(  self.startTime );
            args.push(  '-t' );
            args.push(  '10' );
            //args = args.concat("-c:v copy -c:a copy".split(' '));


            args.push(  fileOutput);

            var cmd = new CommandRunner()
            var settings = {}
            settings.silent = true
            settings.fxCallback =
                function commandFinished() {
                    // console.log(cmd.log.output)
                    //self.proc('file split ', self.count )
                    //sh.callIfDefined(config.fxDone);
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
            cmd = cmd.replace('$$Inputfile', config.input)
            cmd = cmd.replace('$$Outputfile', config.output)
            //cmd += ' -strict -2'
            console.log(cmd)
            var opts = {};
            opts.cwd = __dirname+'/'
            sh.runAsync(cmd, function done() {
                sh.callIfDefined(config.fxDone);
            }, opts )
        };


    }

    p.proc = function debugLogger() {
        if (self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }

}
exports.OBS_Split = OBS_Split


exports.StartOBSSplit = function StartOBSSplit(file) {
    var m = new OBS_Split();
    var config = RLE_LoadConfigHelper.readJSONFile(file);
    m.init(config);
    return m;
}

if (module.parent == null) {
    exports.StartOBSSplit('local_config.json');
}

