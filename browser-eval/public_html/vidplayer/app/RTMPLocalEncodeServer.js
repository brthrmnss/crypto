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

function RTMPLocalEncodeServer() {
    var p = RTMPLocalEncodeServer.prototype;
    p = this;
    var self = this;
    p.init = function init(config, firstIteration) {
        config = sh.dv(config, {});
        self.json = config;
        self.settings = config.upload_monitor;
        if ( self.settings == null || self.settings.enabled == false ) {
            console.log('exiting', 'RTMPLocalEncodeServer');
            return;
        }
        console.log(self.settings)
        //asdf.g
        //self.settings.dir_uploads += '/'
        self.settings.check_dir_uploads_every_x_secs = sh.dv(self.settings.check_dir_uploads_every_x_secs, 10);
        self.settings.check_dir_uploads_every_x_secs *= 1000;

        if ( self.json.ripper.enabled == false ) {
//disable encoding server
        } else {

            if ( self.json.ripper.useNodeJSServer != false )
                var server = require('./node-rtsp-rtmp-server/server.js')
            var RTMPSplit = require('./rtmp3_split').RTMPSplit

            var ripperConfig = self.json.ripper;
            if ( ripperConfig.timeout == false ) {
                ripperConfig.timeout = 24*60*60*100;
            }


            var channel =  self.json.channel_name;
            return; //TODO: Re,pve frpk 3/18/20015
            setTimeout(function setup() {
                RTMPSplit('channel_uploads/'+channel+'/','rtmp://127.0.0.1:1935/live/'+channel,ripperConfig.timeout, firstIteration );
            }, 500)
        }
        return;
        /*
         self.int = setInterval(self.checkForNewFiles, self.settings.check_dir_uploads_every_x_secs);
         self.seenFiles = [];
         self.baseUrl = 'http://'+self.json.channel_server.ip+':'+self.json.channel_server.port;

         self.settings.dir = self.settings.dir_uploads+self.json.channel_name+'/';
         sh.mkdirp(self.settings.dir);

         self.concurrentFailures = 0;

         var t = EasyRemoteTester.create('Test say basics',{showBody:false});
         t.settings.baseUrl = self.baseUrl
         var urls = {};
         urls.notes = {};
         urls.upload = t.utils.createTestingUrl('upload')
         self.urls = urls;
         self.t = t;*/
    }

    p.checkForNewFiles = function checkForNewFiles() {
        var files = sh.getFilesInDirectory(self.settings.dir, false, true);
        /* sh.each(files, function (i,x) {
         if ( self.seenFiles.indexOf(x) == -1 ) {
         self.uploadFile(x);
         };
         });*/

        //console.log(files, 'files')
        // return;
        sh.async(files,
            function uploadFileA(file, fxDone) {
                self.uploadFile(file, fxDone)
            },
            function doneUploadingFiles() {
                console.log('done upload files ')
            }
        )
    }

    p.uploadFile = function uploadFile(fileToUpload, fxDone) {
        fileToUpload_ = fileToUpload;
        fileToUpload = self.settings.dir + fileToUpload
        console.log('upload file', fileToUpload);

        var t2 = self.t.clone('test upload route');
        t2.getR(self.urls.upload).with({channel: 'cnn', test: 'true'})
            .upload(fileToUpload)
            .bodyHas('status').notEmpty()
            .makeOptional()
            .fxDone(function deleteFile() {
                sh.deleteFile(fileToUpload);
                self.seenFiles.push(fileToUpload_);
                fxDone()
            })
            .fxFail(function incrementFailures() {
                asfd.g.is.this.valid
                self.concurrentFailures++;
                if ( self.concurrentFailures > self.settings.max_concurrent_upload_failures) {
                    console.error('failed too many times... unload')
                    setTimeout(function () {
                        process.exit();
                    }, 50)

                }
                // fxDone();
            })

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

RTMPLocalEncodeServer.createRTMPLocalEncodeServer = function createMonitor(file){
    var m = new RTMPLocalEncodeServer();
    //var config = sh.readJSONFile(file);
    var config = RLE_LoadConfigHelper.loadConfig(file);
   // m.init(config)

    //TODO: This is copy and paste, move elswhere
    var channels = config.channel_names;
    if ( channels != null ) {
        sh.each( channels, function (i, channel ){
            var m = new RTMPLocalEncodeServer();
            var configIterate = sh.clone(config);
            configIterate.channel_name = channel;
            m.init(configIterate, i==0)
        })

    } else {
        m.init(config)
    }

    return m;

}

exports.RTMPLocalEncodeServer = RTMPLocalEncodeServer;

if ( module.parent == null) {
    var m = new RTMPLocalEncodeServer();
    var config = sh.readJSONFile('configs/local_config.json');
    //var dirChannel = __dirname+'/channel_uploads/cnn/';
    //config.dir_uploads = dirChannel
    m.init(config);
    //m.test();
}






