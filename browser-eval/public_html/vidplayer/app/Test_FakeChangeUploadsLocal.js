/**
 * Created by user2 on 8/28/15.
 */
/*
 Why: Represents a TV stream that is uploaded to the server
 */

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function Test_FakeChangeUploadsLocal() {
    var p = Test_FakeChangeUploadsLocal.prototype;
    p = this;
    var self = this;
    p.init = function init(config) {
        self.settings = sh.dv(config, {});

        var fileJSON = 'local_config.json'

        //self.test();
        self.test_fakeUploads();
    }

    p.test = function test(config) {
        setTimeout(function () {
            self.proc('testing by fake uploads')
            //clear uploads
            var dirUpChannel = 'channel_uploads' + '/' + 'cnn' + '/'
            sh.fs.deleteDir(dirUpChannel);
            sh.mkdirp(dirUpChannel);

            var dirChannel = 'channels' + '/' + 'cnn' + '/'
            sh.fs.deleteDir(dirChannel);
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
                }, 4000);
            })
        }, 2000);


    }

    p.test_fakeUploads = function test(config) {
        self.proc('testing by fake uploads')
        //clear uploads
        var dirUpChannel = 'channel_uploads' + '/' + 'cnn' + '/'
        sh.fs.deleteDir(dirUpChannel);
        sh.mkdirp(dirUpChannel);

        var dirChannel = 'channels' + '/' + 'cnn' + '/'
        sh.fs.deleteDir(dirChannel);
        sh.mkdirp(dirChannel);

        var dirCopyFrom = '../public_html/test_vids/brent/b/';
        var files = sh.getFilesInDirectory(dirCopyFrom , false, true);//, false, null, null, false)
        var fileFirst = files[2];
        var count = 0;

        setInterval( function copyFile(fileName, fxDone) {
            console.log('.file', fileName)
            var fileFrom = dirCopyFrom + fileFirst;

            var contents = sh.readFile(fileFrom,null, true);
            var fileTo = dirUpChannel + sh.getTimeStamp()+'_random'+count+'.flv';
            sh.writeFile(fileTo, contents);
            //sh.copyFile2(fileFrom, fileTo);
            console.log('copied', fileFrom, fileTo);
            count++;
        },5000)

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

exports.Test_FakeChangeUploadsLocal = Test_FakeChangeUploadsLocal;

if (module.parent == null) {
    var instance = new Test_FakeChangeUploadsLocal();
    var config = {};
    instance.init(config);
    //instance.test();
    //grab brent files, and ever 3 secods put them in folder

}



