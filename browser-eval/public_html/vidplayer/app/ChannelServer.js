/**
 * Created by user2 on 8/26/15.
 */
/*
 public
 all downloads
 video player


 dir to get file
 dir to get most recent

 route to updaate
 */

/**
 * Created by user on 8/2/15.
 */

/**
 * This is a mini server, that allows users to
 * append to notes
 *
 * Expects everest to be running.
 */


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var express = require('express');
var config = global.config;
var RLE_LoadConfigHelper = require('./utils/RLE_LoadConfigHelper').RLE_LoadConfigHelper


/**
 * Created by user on 7/30/15.
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var EasyRemoteTester = shelpers.EasyRemoteTester;



function ChannelServer() {
    var p = ChannelServer.prototype;
    p = this;
    var self = this;

    /**
     * Setup middleware and routes
     * @param url
     * @param appCode
     */
    p.start = function start(opts, appCode) {
        var custom = true
        custom = false;
        opts = sh.dv(opts, {});
        self.settings = opts
        self.json = opts
        self.settings = self.settings.channel_server;
        if ( self.settings.dir == null )
            self.settings.dir = __dirname+'/'+'channels/'
      //  else
       //     self.settings.dir = __dirname+'/'+self.settings.dir;
        //not goood if user set abs path ... but why would you do that?
        //if ( self.settings.dir, '/') == false )

        self.settings.max_files_per_channel = sh.dv(self.settings.max_files_per_channel, 4);
        //var expressHttpsHelper = require('./../../nodejs-ssl-example-master/expressHttpsHelper.js')
        //expressHttpsHelper = expressHttpsHelper.expressHttpsHelper;
        var express = require("express");
        var app = express();

        function setupApp() {
            //var bodyParser = require('body-parser');
            //app.use(bodyParser());

            app.use(express.multipart({ limit: '12mb', defer: true }));


            //Add middleware for cross domains
            app.use(function(req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });

            //app.post('/append_named', self.appendNoteNamed);
            // app.get('/getRecent', self.say)
            app.get('/getRecent', self.getRecent)
            app.get('/getRecent/:channel', self.getRecent)
            app.get('/deleteChanZ', self.deleteChannelFiles)
            app.post('/upload', self.upload)

            self.setupSession();

            //    if ( custom == false )
            //       app.listen(port)


            var path= require('path').resolve(__dirname+'/../public_html')
            var dirX = require('path').resolve(__dirname+'/channels')
            app.use('/channels',express.static(dirX));
            app.use(express.static(path));

            return app;
        }

        if ( custom ) {
            expressHttpsHelper(port,port+1, setupApp)
        } else {
            setupApp();
            app.listen(self.settings.port)
        }
    }

    self.setupSession = function setupSession() {
        setTimeout(function x() {
            self.test();
        }, 50)
    }

    function defineRoutes() {

        self.upload = function uploadFileToChannel (req, res) {
            var channel = req.query.channel;

            //listen for form upload
            req.form.on('end', function() {
                console.log('end', req.files);
                //res.send("well done");
            });
            req.form.on('file', function() {
                console.log('file',req.files);
                //res.send("well done");
            });
            req.form.on('close', function fileClose() {
                var channel = req.body.channel;
                if ( channel == null ) {
                    throw 'to what chan?'
                }
                var uploadInfo = req.form.openedFiles[0];
                var path = uploadInfo.path;
                var originalFilename = uploadInfo.originalFilename;
                if ( req.body.renameUploadedFileTo != null ) {
                    //asdf.g
                    originalFilename = req.body.renameUploadedFileTo;
                }
                var filename = uploadInfo.filename;
                //console.log('uploaded', originalFilename ,req.form.openedFiles[0]);

                var dirChannel = self.settings.dir+channel+'/'
                sh.mkdirp(dirChannel)
                var files= sh.getFilesInDirectory(dirChannel, false, true)

                //sort alphabetically: Modfied time cannot be trusted, as uploads may come in any order ...
                //must rely on timestamp in filename
                files = files.sort(function (a, b) {
                    return a.toLowerCase().localeCompare(b.toLowerCase());
                });

                self.proc('files', files);
                self.proc('files.max', self.settings.max_files_per_channel,files.length)

                if ( files.length > self.settings.max_files_per_channel ) {
                    //get the last (x) files in the list
                    var indexOfFirstFileToKeep = files.length - (self.settings.max_files_per_channel-1);
                    //Delete everything upto indexOfFirstFileToKeep
                    var deleteFiles = files.slice(0,indexOfFirstFileToKeep);
                    //Delete everything after indexOfFirstFilesToKeep
                    //var deleteFiles = files.slice(indexOfFirstFileToKeep);
                    self.proc('deleting files before index', indexOfFirstFileToKeep)
                    self.proc('deleting list:', deleteFiles.length, deleteFiles)
                    //asdf.g
                    sh.each(deleteFiles, function deleteFile(i,fileToDelete) {
                        sh.deleteFile(dirChannel+fileToDelete, true, true);
                        console.log('deleting', fileToDelete)
                    })
                    /*var startIndex = files.length - (self.settings.max_files_per_channel-1);
                     var deleteFiles = files.slice(startIndex);
                     self.proc('deleting files from', startIndex)
                     self.proc('deleting list:', deleteFiles)
                     asdf.g
                     sh.each(deleteFiles, function deleteFile(i,fileToDelete) {
                     sh.deleteFile(dirChannel+fileToDelete, true, true);
                     console.log('deleting', fileToDelete)
                     })*/
                };
//asdf.g
                var fileTo = self.settings.dir+channel+'/'+originalFilename;
                sh.makePathIfDoesNotExist(sh.getPath(fileTo))
                console.log('store upload for', channel, fileTo);
                sh.copyFile2(path, fileTo,false, null, true);
                sh.deleteFile(path, true, true);
                var json = {};
                json.status = 'ok';
                res.json(json);
            });

        };

        self.getRecent = function (req, res) {
            var channel = req.query.channel;
            channel = sh.dv(channel, req.params.channel);
            if ( channel == null ) {
                throw 'to what chan?'
            }
            var dirChannel = self.settings.dir+channel+'/'
            var files= sh.getFilesInDirectory(dirChannel, false, true)


            files = sh.eachHelper(files).prepend(
                self.settings.dir.replace(__dirname+'/', '')+channel+'/').items
            files = files.sort(function (a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });

            var json = {}
            json.files = files;

            json.status = 'ok'
            res.json(json)
            //console.log(files)
        };

        /**
         * Removes files in chanel dir, should be secured.
         * @param req
         * @param res
         */
        self.deleteChannelFiles = function (req, res) {
            var channel = req.query.channel;
            channel = sh.dv(channel, req.params.channel);
            if ( channel == null ) {
                throw 'to what chan?'
            }
            var dirChannel = self.settings.dir+channel+'/'
            sh.fs.deleteDir(dirChannel);

            var json = {}
            json.status = 'ok'
            res.json(json)
        };



    }
    defineRoutes();

    p.test = function test() {
        var baseUrl = 'http://127.0.0.1:'+self.settings.port;
        var t = EasyRemoteTester.create('Test Channel Server basics',{showBody:false});
        var data = {};
        t.settings.baseUrl = baseUrl;
        var urls = {};
        urls.notes = {};
        urls.upload = t.utils.createTestingUrl('upload');
        urls.getRecent = t.utils.createTestingUrl('getRecent');
        urls.deleteChannel = t.utils.createTestingUrl('deleteChanZ');
        urls.streamI = t.utils.createTestingUrl('index.html');

        var localDir = __dirname + '/';
        var fileTestVidUpload =  'test_vid.mp4';


        var dirChannel =  localDir + 'channels/cnn/'
        //sh.copyFile2(fileTestVidUpload, dirChannel+ 'video4.flv')
        //sh.copyFile2(fileTestVidUpload, dirChannel + 'video1.flv')

        var t2 = t.clone('test a few voices notes');
        t2.getR(urls.upload).with({channel:'cnn'}).upload(localDir+fileTestVidUpload)
            .bodyHas('status').notEmpty()
            .fxDone(function deleteFileafterTest() {
                sh.deleteFile(localDir + 'channels/cnn/'+fileTestVidUpload)
            })
        //t2.getR(urls.say)n.upload('config.json').bodyHas('status').notEmpty()
        var nextSet = t2.getR(urls.getRecent).with({channel:'cnn'}).bodyHas('status').notEmpty()
        function testUploadingFiles_Simple() {

            if (self.settings.testResizingChannelDir == true ) {
                //copy files over ... or use temp dir and move temp dir back
                //we forced max files to be 2, so the 4h video should appear
                nextSet.bodyHas('files').includesAsString('video4.flv')
                    //we forced max files to be 2 so the first video should not appear in the recent files
                    .bodyHas('files').doesNotHaveAsString('video1.flv')
                //remove files afterwards
            }
        }


        t2.getR(urls.streamI).with(); //isValidFile

        //commented out ot prevent deleting automatically
        //t2.getR(urls.deleteChannel+'?channel'+'='+'cnn').bodyHas('status').notEmpty()
        //place 10 uploads in dir

        var timeOfFileCreation = new Date();
        function test_UploadAndDeletingUploadedFiles() {
            //place uploads in dirs
            //goal: does sorting work as expected?
            function uploadANewFile () {
                console.log('new file')
                var t2 = t.clone('test a file upload');
                //timeOfFileCreation.setTime(new Date().getTime() - Math.random() * 24 * 60 * 60 * 1000)
                timeOfFileCreation.setTime(new Date().getTime() + 1.5 * 60 * 60 * 1000)
                var newName = sh.getTimeStamp(timeOfFileCreation) + '.flv'
                t2.getR(urls.upload).with({channel: 'cnn', renameUploadedFileTo: newName})
                    .upload(localDir + fileTestVidUpload)
                    .bodyHas('status').notEmpty()
                    .fxDone(function deleteFileafterTest() {
                        console.log('uploaded ...')
                        //sh.deleteFile(localDir + 'channels/cnn/'+newName)
                    })
                var nextSet = t2.getR(urls.getRecent).with({channel: 'cnn'}).bodyHas('status').notEmpty()

            }
            uploadANewFile()
            setInterval( uploadANewFile,  1000)
        }

        //test_UploadAndDeletingUploadedFiles();

        // t2.getR(urls.fileChannel).with(); //isValidFile
        return;

    }


    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}

ChannelServer.createChannelServer = function createMonitor(file){
    var m = new ChannelServer();
    var config = RLE_LoadConfigHelper.readJSONFile(file);
    m.start(config);
    return m;
}



exports.ChannelServer = ChannelServer;

if (module.parent == null) {
    var e = new ChannelServer();
    //is default? config.max_files_per_channel = 3;

    var fse = require("fs-extra");
    var dirChannel  = __dirname+'/channels/cnn/';
    fse.copySync(__dirname+'/../public_html/test_vids/vids/', dirChannel );
    // return

    var config = RLE_LoadConfigHelper.loadConfig('local_config.json');
    config.channel_server.max_files_per_channel = 3
    config.channel_server.testResizingChannelDir = true;
    e.start(config);
};



