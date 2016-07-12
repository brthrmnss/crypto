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
var ConvertFLV = require('./ConvertFLV').ConvertFLV;
function MonitorDir() {
    var p = MonitorDir.prototype;
    p = this;
    var self = this;
    p.init = function init(config) {
        config = sh.dv(config, {});
        self.json = config;
        self.settings = config.upload_monitor;

        if ( self.settings == null || self.settings.enabled == false ) {
            console.log('exiting', 'MonitorDir');
            return;
        };

        //self.settings.dir_uploads += '/'
        self.settings.check_dir_uploads_every_x_secs = sh.dv(self.settings.check_dir_uploads_every_x_secs, 10);
        self.settings.check_dir_uploads_every_x_secs *= 1000;

        self.listFilesUploaded = [];
        self.listFilesPassedForConversion = [];
        self.listFilesConverted2x = []; //store files that have fialed conversion at least 1x
        self.baseUrl = 'http://'+self.json.channel_server.ip+':'+self.json.channel_server.port;

        self.settings.dir = self.settings.dir_uploads+self.json.channel_name+'/';
        sh.mkdirp(self.settings.dir);
        self.settings.dirUploading = __dirname + '/' +
            self.settings.dir_uploads+self.json.channel_name+'.uploading/';
        sh.fs.deleteDir(self.settings.dirUploading);
        sh.mkdirp(self.settings.dirUploading);
        //sh.fs.deleteDir = sh.fs.removeDir2
        self.concurrentFailures = 0;

        var t = EasyRemoteTester.create('Smoke Test MonitorUploadDir',{showBody:false});
        t.settings.baseUrl = self.baseUrl;
        var urls = {};
        urls.notes = {};
        urls.upload = t.utils.createTestingUrl('upload')
        self.urls = urls;
        self.t = t;

        self.urlsToUploadTo = [];
        self.urlsToUploadTo.push(self.urls.upload);
        if ( self.settings.upload_to != null ) {
            /* Sanitizes url and appends text */
            sh.createUrl = function createTestingUrl(baseUrl, end, port){
                //var url = 'http://localhost:' + self.settings.port ;//+ '/' + end;
                var url = baseUrl;
                //add protocol to front
                if (  sh.includes(url, '//') == false ) {
                    url = 'http://' + url
                }
                //console.log(url, '...')
                //if ( url)
                //add /
                if ( ! sh.endsWith(url, '/') && ! sh.startsWith(end , '/')){
                    url += '/';
                }

                url += end;
                return url;
            }

            sh.each(self.settings.upload_to, function addUrlTo_UrlsToUploadTo(i, baseUrl) {
                var newUrl = sh.createUrl(baseUrl, 'upload');
                self.urlsToUploadTo.push(newUrl);
            });
        };

        self.int2 = setInterval(self.checkForNewFiles_Verify,
            self.settings.check_dir_uploads_every_x_secs*3);
        self.int = setInterval(self.checkForNewFiles,
            self.settings.check_dir_uploads_every_x_secs);
        self.checkForNewFiles();
    }

    /**
     * Recreate setInterval
     */
    p.checkForNewFiles_Verify = function checkForNewFiles_Verify() {
        if (  sh.time.diff2(self.lastTime_CheckForNewFiles_Invoked,
                self.settings.check_dir_uploads_every_x_secs/1000  )
            ) {
            //recreate interval
            clearInterval(self.int);
            self.int = setInterval(self.checkForNewFiles,
                self.settings.check_dir_uploads_every_x_secs);
            self.proc(self.settings.dir, 'reset');
            self.checkForNewOnNext = true;
            self.processingQueue = false;
            self.checkForNewFiles();
            return;
        }

        //warn user
        self.proc(self.settings.dir, 'is having issues')
        return;



        }
    p.checkForNewFiles = function checkForNewFiles() {
        /*console.error('>>>>>')
        console.error('check for new files', self.json.channel_name, self.settings.dir)
        console.error('>>>>>')*/
        //sh.debugger.('check for new files', self.json.channel_name, self.settings.dir)
        self.lastTime_CheckForNewFiles_Invoked = new Date();
        if ( self.processingQueue == true ) {
            self.checkForNewOnNext = true;
            self.proc('still procesing... wait until later')
            return;
        }
        self.checkForNewOnNext = false;
        self.processingQueue = true;
        //console.log('checking...')
        var files = sh.getFilesInDirectory(self.settings.dir, false, true, false, null, null, true);
        var convert = self.settings.convert;
        /* sh.each(files, function (i,x) {
         if ( self.listFilesUploaded.indexOf(x) == -1 ) {
         self.uploadFile(x);
         };
         });*/

        //console.log(files, 'files')
        // return;
        //console.log('self.settings.dir', self.settings.dir, files, 'files')
        // return;
        sh.async(files,
            function uploadFileA(fileToUpload, fxDone_) {

                var iterationCompleted = false
                function fxDone() {
                    if ( iterationCompleted )
                        return;
                    else {
                        self.proc('failed to upload ... ',fileToUpload);
                        iterationCompleted = true;
                        fxDone_();
                    }
                }


                if ( self.listFilesPassedForConversion.indexOf(fileToUpload) != -1 ) {
                    fxDone_();
                    return;
                }
                self.listFilesPassedForConversion.push(fileToUpload);

                // fileToUpload = __dirname + '/'+ fileToUpload;
                /*
                 self.proc()
                 self.proc('XXX',filePath.split('.').slice(-1)[0],

                 fileToUpload, sh.fileExt(fileToUpload,'.mp4'))
                 self.proc()
                 */


                if ( convert != true ) {
                    self.proc('no conversion');
                    self.uploadFile(fileToUpload, fxDone)
                } else {
                    //skip files being converted
                    if ( sh.fileExt(fileToUpload,'mp4')) {
                        console.log('fileNameHas.mp4 in it')
                        fxDone();
                        return;
                    };


                    //convert file to mp4
                    var fileToUpload_OriginalFilename = fileToUpload; //store for later comparison
                    fileToUpload = __dirname + '/' + fileToUpload;
                    var fileConvertTo = fileToUpload + '.mp4';
                    //invoked later ... enables retrying of conversion 1x time ...
                    function retryConversion() {
                        //retry conversion 1 time only
                        if ( sh.includes(self.listFilesConverted2x, fileToUpload_OriginalFilename ) == false ) {
                            sh.removeFromArray(self.listFilesPassedForConversion, fileToUpload_OriginalFilename); //remove file from seen files
                            self.listFilesConverted2x.push(fileToUpload_OriginalFilename);
                            //self.listFilesPassedForConversion_retried.push(fileToUpload);
                        } else {
                            self.proc('tried 2x to convert file, skipping  ... ', fileToUpload_OriginalFilename)
                        }
                    }




                    //self.uploadFile(file, fxDone);
                    console.log('...', fileToUpload, fileConvertTo)
                    setTimeout(function onTimeOutConversion() {
                        self.proc('timedout on', fileToUpload)
                        retryConversion();
                        fxDone()
                    }, 12000) // timeout_conversion_secs
                    //  asdfg.g
                    self.proc('file still here...', sh.fileExists(fileToUpload) );
                    ConvertFLV.convert(fileToUpload, fileConvertTo, function doneConverting() {
                        //if conversion worked ... upload converted file
                        var conversionOK = sh.fileExists(fileConvertTo);
                        // console.log('file there', conversionOK)


                        if (  conversionOK ){
                            //console.log('file there');
                            self.uploadFile(fileConvertTo, fxDone);
                            sh.deleteFile(fileToUpload);
                        } else {
                            self.proc('conversion failed ....');

                            if ( self.settings.endOnConversionError ) {
                                process.exit();
                                throw new Error('conversion failed');

                            } else {
                                sh.each.times(10, function () {
                                    self.proc('conversion failed ....');
                                    console.error('--->failed to convert the file', fileConvertTo)
                                })

                                retryConversion();
                                fxDone()

                            }
                            //self.uploadFile(fileToUpload, fxDone);
                        }
                    });
                }

            },
            function doneUploadingFiles() {
                console.log('done upload files ')
                self.processingQueue = false;
                if ( self.checkForNewOnNext ) {
                    self.checkForNewFiles();
                }
            }
        )
    }

    p.uploadFile = function uploadFile(fileToUpload, fxDone) {
        //move to upload to folder
        var fileToUpload_ = fileToUpload;
        //asdf.gd.j
        if ( self.listFilesUploaded.indexOf(fileToUpload_) != -1 ) {
            //why would this condition occur? 
           asdf.g
            return;
        }
        self.listFilesUploaded.push(fileToUpload_);

        sh.fs.move(fileToUpload, self.settings.dirUploading);
        fileToUpload = sh.fs.changeDir(fileToUpload, self.settings.dirUploading );

        //upload is done
        fxDone();

        //fileToUpload = self.settings.dir + fileToUpload
        console.log('upload file', fileToUpload, sh.paren(fileToUpload_));
        var t2 = self.t.clone('test upload route');
//asdf.g
        var index = 0;
        sh.async(self.urlsToUploadTo,
            function uploadFile_Iteration( urlToUploadTo, fxDoneUpload_ ) {
                var iterationHelper = {};

                iterationHelper.iterationCompleted = false;
                self.proc('upload to ....', urlToUploadTo)
               // asdf.g
                function fxDoneUpload() {
                    if (  iterationHelper.iterationCompleted )
                        return;
                    else {
                        self.proc('failed to upload to url: ... ',urlToUploadTo)
                        iterationHelper.iterationCompleted = true;
                        fxDoneUpload_();
                    }
                }
                index++;
                setTimeout(function skipIterationAndMoveOne() {
                    fxDoneUpload();
                }, 3000)
                var i = index
                t2.getR(urlToUploadTo).with({channel: self.json.channel_name, test: 'true'})
                    .upload(fileToUpload)
                    .bodyHas('status').notEmpty()
                    .makeOptional()
                    .timeout(3)
                    .fxSuccess(function uploadSuccesful() {
                        fxDoneUpload()
                        //the rest don't matter.
                    })
                    .fxFail(function incrementFailures() {
                        /*if ( i == 0 ) {
                            self.proc('failed to upload ... but not first ...')
                            return;
                        }*/
                        self.concurrentFailures++;
                        console.error('failed toupload file', self.urls.upload)
                        if (  null != self.settings.max_concurrent_upload_failures &&
                            self.concurrentFailures > self.settings.max_concurrent_upload_failures) {
                            console.error('failed too many times... unload')
                            setTimeout(function () {
                                process.exit();
                            }, 50);

                        }
                        fxDoneUpload();
                        // fxDone();
                    });
            },
            function doneUploadAllUrls() {
                if ( self.settings.deleteUploadedFiles != false ) {
                    sh.deleteFile(fileToUpload,true,true);
                };
                //sh.fs.delete(fileToUpload);
                //if ( i == 0 )  {
                //fxDone();
                //}
            },
            self.urlsToUploadTo.length
        );

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

exports.MonitorDir = MonitorDir;

MonitorDir.createMonitorDir = function createMonitor(file){
    var m = new MonitorDir();
    var config = {};
    config = RLE_LoadConfigHelper.readJSONFile(file);

    var channels = config.channel_names;
    if ( channels != null ) {
        sh.each( channels, function (i, channel ){
            var m = new MonitorDir();
            var configIterate = sh.clone(config);
            configIterate.channel_name = channel;
            m.init(configIterate)
        })

    } else {
        m.init(config)
    }



    return m;
}

if (module.parent == null) {
    function test() {

        var items = ['a', 'b', 'c'];

        sh.async(items,
            function iteration(item,fxDone) {
                console.log('proc', item);
                fxDone()
            }
            ,
            function doneAllItems() {
                console.log('finisehd all')
            }, items.length)
        //return;

        var m = new MonitorDir();
        var config = {};
        config = RLE_LoadConfigHelper.readJSONFile('local_config.json');
        m.init(config)
        m.test();
    }


    test();
}






