/**
 * Created by user2 on 8/29/15.
 */


//open ffmpeg
//input and output


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var RLE_LoadConfigHelper = require('./utils/RLE_LoadConfigHelper').RLE_LoadConfigHelper
var CommandRunner = sh.CommandRunner

function ConvertFLV() {
    var p = ConvertFLV.prototype;
    p = this;
    var self = this;
    p.init = function init(config) {
        config = sh.dv(config, {});
        self.json = config;
        self.settings = config.obs;
        /*if ( self.settings == null || self.settings.enabled == false ) {
            console.log('exiting', 'ConvertFLV');
            return;
        };*/



        var args = []
        var cmd = 'ffmpeg'
        if ( sh.isWin() ) {

           // args.push(  '-ss');
           // args.push(  '0.100');
            args.push(  '-i');
            args.push(  config.input);
            args.push(  config.output);

            var cmd = new CommandRunner()
            var settings = {}
            settings.silent = true
            settings.fxCallback =
                function commandFinished() {

                    //console.log(cmd.log.output)
                    console.log('output of command ... ')
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
            cmd = cmd.replace('$$Inputfile', config.input)
            cmd = cmd.replace('$$Outputfile', config.output)
            //cmd += ' -strict -2'
            console.log(cmd)
            var opts = {};
            opts.cwd = __dirname+'/'
            sh.runAsync(cmd, function done() {
                sh.callIfDefined(config.fxDone);
            }, opts )
        }
       // cmd = 'echo'



    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.ConvertFLV = ConvertFLV;

ConvertFLV.convert = function ConvertFLV_(from, to, fxDone){
    var m = new ConvertFLV();
    //var config = RLE_LoadConfigHelper.readJSONFile(file);
    var config = {};
    config.input = from;
    config.output = to;
    config.fxDone = fxDone;
    m.init(config);
    return m;
}

if (module.parent == null) {
    var fileTo = 'video.flv.mp4'
    sh.deleteFile(fileTo, true)
    ConvertFLV.convert('video.flv', fileTo, function doneIt() {
        console.log('conversion finished');
    });
    return;
    var m = new ConvertFLV();
    var config = RLE_LoadConfigHelper.readJSONFile('config.json');
    m.init(config)
    //m.test();
}
