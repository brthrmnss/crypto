var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function JSONSetVerifier() {
    var p = JSONSetVerifier.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}
    self.data.showDict = false;

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;

        

        
        self.data.fileOutput = sh.fs.filenameAddBefore(self.settings.fileInput, '-dl.so.far')

        self.openFileAndConvertToLines();
        self.comp();
    }

    p.openFileAndConvertToLines = function openFileAndConvertToLines() {
        var file = self.settings.fileDls //'G:/Dropbox/projects/crypto/deploy_nodejs/breedv2/server.dl.files/root_5_79_75_96.txt'

        var filesInDirs = new sh.DictArray();

        var config = {}
        config.file = file;
        config.ignore = [
            '/downloads/cookies/',
            '/extractions/',
            'sample']
        config.ignoreEnd = [
            '.jpg', '.png','.ico',
            '.nfo', '.srt',
            '.txt','.docx','.doc',
            '.sfv','.xml','.smi',
            '.st', '.sub', '.AAC', '.zip', '.7z',
            //  '.m4v','.mp4','.avi','.mkv',
            // '.rmvb','.wmv', '.mov','.flv','.mpg',
            '.htm',
        ]
        config.fxProc = function processLines(line) {

            //ignore directories
            var fileExt = line.split('.').slice(-1)[0];
            if ( fileExt.length > 4 ) {
                return; //why: is a directory
            }

            //get path from root dir
            var splitter = 'finished/incoming/finished/'
            if ( config.includes(splitter)){
                line = line.split(splitter)[1]
            }

            var dirs = line.split('/')

            var dir4 = '/'+dirs.slice(0,5).join('/')+'/';
            filesInDirs.add(dir4, line)

            var dir3 = '/'+dirs.slice(0,4).join('/')+'/';
            filesInDirs.add(dir3, line)

            return line;
            //['/downloads/cookies/']
        }
        var lines  = sh.each.lines(config)
        self.data.dictDirsToContent = filesInDirs;
        console.log('number of lines', lines.length)
        //  sh.each.print(lines)

        if ( self.data.showDict )
            filesInDirs.print();

        //config.show();

    }
    p.comp = function comp() {
        self.data.fileInput = self.settings.fileInput;
        self.data.fileInput = self.settings.fileInput;
        self.data.list = sh.fs.readJSONFile(self.data.fileInput);

        self.data.listFiltered = [];
        self.index = 0;
        var missingCount = 0;
        sh.async(self.data.list, function procEachItem(item, _fxDone) {
            function fxDone(){
                if ( self.settings.delayEachInvocation != true  ) {
                    _fxDone();
                } else {
                    setTimeout(function delayForStackSizeExceede() {
                        _fxDone();
                    })
                }

            }
            self.index ++;
            // console.log( self.index , item)
            var files = self.data.dictDirsToContent[item.dirRemoteMega]
            var foundFiles = files!=null;


            if ( foundFiles == false ) {
                missingCount++
                console.log(missingCount, self.index, foundFiles, self.index, item.dirRemoteMega)
                self.data.listFiltered.push(item);
                //console.log(self.index, foundFiles, self.index, item.dirRemoteMega)
            }
            else {
                var fileFirst = ('/'+files[0]).replace(item.dirRemoteMega, '')
                self.proc( 'found', self.index , item.dirRemoteMega, fileFirst);
                //make sure year is correct
            }
            fxDone()
        }, function allDone() {
            //sh.callIfDefined(inst.fxDone)
            //self.proc('what is length', self.data.listFiltered.length)
            self.finishedWriting2()
        })
        return;
    }


    p.finishedWriting2 = function finishedWriting2() {
       
        sh.fs.writeJSONFile(self.data.fileOutput, self.data.listFiltered)
        sh.callIfDefined(self.settings.fxDone)
    }

    p.finishedWriting = function finishedWriting() {
        sh.each(self.data.listFiltered, function (k,v) {
            v.index = k;
        });
        if ( self.settings.inputIsOutput_doesNotFilter ) {
            //why: do not save file
            self.proc('not saving the output file again')
            sh.callIfDefined(self.settings.fxDone)
            //self.data.work.list = sh.fs.readJSONFile(self.data.fileOutput ,null, false )
            return;
        }
        if ( self.settings.storeOutputFileElsewhere ) {
            sh.fs.writeJSONFile(self.data.fileOutput2, self.data.listFiltered  )
            sh.callIfDefined(self.settings.fxDone)
            return;
        }
        //asdf.g
        self.proc('...', 'finished')
        self.data.work.info.count =  self.data.work.list.length;
        self.data.work.info.filterCount = self.data.listFiltered.length;
        sh.fs.writeJSONFile(self.data.fileWork, self.data.work )
        sh.fs.writeJSONFile(self.data.fileOutput, self.data.listFiltered  )

        sh.callIfDefined(self.settings.fxDone)
    }

    p.createAdditionalFile = function createAdditionalJSONFile(name, data) {
        var fileStore = self.data.fileOutputTemplate+'.'+name+''+'.json';
        //self.proc('...', 'finished')
        sh.fs.writeJSONFile(fileStore, data);
    }
    p.createAdditionalFlatFile = function createAdditionalFlatFile(name, data) {
        var fileStore = self.data.fileOutputTemplate+'.'+name+''+'.txt';
        //self.proc('...', 'finished')
        if ( sh.isArray(data)) {data = data.join("\n")};
        sh.writeFile(fileStore, data);
    }

    p.test = function test(config) {
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

exports.JSONSetVerifier = JSONSetVerifier;

if (module.parent == null) {
    var instance = new JSONSetVerifier();
    var config = {};
    config.fileInput = 'G:/Dropbox/projects/crypto/ritv/distillerv3/utils/JSONSet/output/tv_series_top_250_num_votes,desc_1994,2017.json.dl.list.json'
    config.fileDls = 'G:/Dropbox/projects/crypto/deploy_nodejs/breedv2/server.dl.files/root_5_79_75_96.txt'

    config.fileInput = 'G:/Dropbox/projects/crypto/ritv/distillerv3/utils/JSONSet/all.json'
    config.fileDls = 'G:/Dropbox/projects/crypto/deploy_nodejs/breedv2/server.dl.files/root_37_48_94_161.txt'



    //    'G:/Dropbox/projects/crypto/ritv/imdb_movie_scraper/IMDB_App_Output/tv_series_top_250_num_votes,desc_1994,2017.json.dl.json.filtered.json';
    config.fileIterator = 'G:/Dropbox/projects/crypto/ritv/distillerv3/utils/JSONSet/JSONSetTestIterator.js'
    instance.init(config)
    instance.test();
}



