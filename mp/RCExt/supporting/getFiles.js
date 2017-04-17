

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
/*
 var RitvHelper = require(__dirname + '/../../ritv/node_modules/ritvHelpers/index.js').ritvHelpers;
 var rch = RitvHelper.ritvHelper;
 */

var RitvHelper = require('ritvHelpers').ritvHelpers;
var rch = RitvHelper.ritvHelper;

function GetFiles() {
    var p = GetFiles.prototype;
    p = this;
    var self = this;
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        self.method();

        var cfg = rch.getConfig()
        var y = cfg.innerSettingsMixin
        var dirs = y.dir_downloads
        if ( sh.isWin() ) {
            dirs = y.dir_downloads_win
        }

        var os = require("os");
        var hostname = os.hostname();

        var fileJoinList = sh.fs.getFilename(os.hostname(),
            self.settings.name,
            //sh.getTimeStamp(),
            'list.files.txt'
        )
        fileJoinList = fileJoinList.toLowerCase();
        // console.log('----', fileJoinList)

        var dirOutput = sh.fs.join(__dirname, 'outputFileLists')
        var fileOutput = sh.fs.join(dirOutput, fileJoinList);

        // console.log('asdf', fileJoinList)
        console.log('asdf', fileOutput)

        self.data.fileOutput = sh.dv(self.settings.fileOutput, fileOutput)

        self.data.files = []
        self.proc('crg', dirs)

        sh.fs.mkdirp(dirOutput)
        sh.async(dirs, function onGetDir(dir, fx ) {

                var dirExists = sh.fs.fileExists(dir)
                self.proc(dir, dirExists)

                var fileOutput = sh.fs.getFilename(dir, 'list.txt')
                fileOutput = sh.fs.join(dirOutput, fileOutput)

                var cmd = 'find ' + dir + ' -name "*.*"  -print ' + ' >> ' + fileOutput //+ '; echo;';


                if ( sh.isWin() ) {
                    var cmd = sh.join('dir ', sh.qq(dir), " /s /b /o:gn ",
                        '>', fileOutput)
                }

                self.data.files.push(fileOutput);

                sh.runAsync(cmd, function onK(a,b,c){
                    fx()
                })
                //>//dir /s /b /o:gn "i:/down/"
                //fx()
            },
            function onDone(){
                sh.fs.joinFiles(self.data.files, self.data.fileOutput);
                sh.callIfDefined(self.settings.fxDone, self.data.fileOutput)
            })

    }

    p.method = function method(config) {
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }


}

exports.GetFiles = GetFiles;

if (module.parent == null) {
    var instance = new GetFiles();
    var config = {};

    config.fxDone = function fxDone(file) {
        console.log('file', file);
        var filename = sh.getFileName(file)
        console.log('file', file, filename);
        //var url = 'http://'
    }
    instance.init(config)
    //instance.test();
}



