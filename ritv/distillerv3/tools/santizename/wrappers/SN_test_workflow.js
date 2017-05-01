/**
 * Created by user1 on 1/28/2017.
 */


/**
 * Created by user1 on 1/28/2017.
 */

var shelpers = require('shelpers')
var sh = require('shelpers').shelpers;
var PromiseHelperV3  = shelpers.PromiseHelperV3;

var SNTestWorkflow = {}

var SanitizeNamesFromDB = require('./SanitizeNamesFromDB').SanitizeNamesFromDB;


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function SanitizeList_FileWorkflow() {
    var p = SanitizeList_FileWorkflow.prototype;
    p = this;
    var self = this;
    self.data = {};

    p.init = function init(config) {
        self.settings = sh.dv(config, {});



        var output = {}

        sh.throwIfNull(self.settings.fileList, 'need a list of files')
        sh.throwIfNull(self.settings.fileManifest, 'need a fileManifest')
        console.log('-verifyComplete%', self.settings.fileManifest, self.settings.fileList);

        //sh.exit('howmany')


        self.runTestWorkflow();



    }


    p.runTestWorkflow = function runTestWorkflow() {
        var token = {}

        var work = new PromiseHelperV3();
        token.silentToken = true
        work.wait = token.simulate == false;


        console.log('what is', self.importFilesIntoFileDB)
        work.startChain(token)
        //import files, santizie, put in database toDB
            .add(self.importFilesIntoFileDB)
            //go through all files and make sure files exist
            .add(self.searchForFileInDlManifest)
            .add(self.lastStep)
            //.log()
            .end();

    }

    function defineSteps() {
        p.importFilesIntoFileDB = function importFilesIntoFileDB(token, cb) {

            self.proc('importFilesIntoFileDB')
            // fx(fx.data.taskName, 'size');
            //create manifest and return manifest name


            var i = new SanitizeNamesFromDB();
            //  i.settings.logging = true;
            i.init();
            //i.settings.fileFilter = 'South Park'
            // i.settings.fileFilter = 'Game of'
            //i.testMode();
            //i.settings.offset = 500;
            //i.settings.maxLength = 1000;

            //   i.settings.maxLength = 100;
            //i.settings.fileFilter = 'Mr. Robot'
            //i.settings.fileFilter = 'Breaking Bad Season 2 Complete'
            //i.settings.fileFilter = 'revenge_2011/tt1837642/revenge_season_1'
            // i.settings.fileFilter = '[hdtv-480p]-msd/revenge.s01e01.480p.hdtv.x264-msd.mkv'
            //i.settings.fileFilter = 'bleach'

            ///TODO: Filer the list so it only includes directories from teh manifest for speed
            //i.settings.getIMDBShowInformation = false;

            //do not ignore previous files
            i.ignorePreviouslyProcessedFiles = true
            i.settings.allowMoviesWithNoEpisodes = true;

            i.settings.dbg = true;


            var skipDBImportOfFiles = false;

            if ( self.settings.skipFileImport ) {
                self.proc('skipFileImport')
                skipDBImportOfFiles = true;
            }

            i.addFileListToDatabase(self.settings.fileList, skipDBImportOfFiles);
            self.data.filesNormalized = i.data.filesNormalized
            self.proc('size of file list', self.data.filesNormalized.length )
            //console.log('this was the list', i.data.filesNormalized)
            //sh.x()
            if ( self.settings.skipFileImport ) {
                self.proc('skipFileImport', self.data.filesNormalized.length )
                cb();
                return;
            }

            //  i.iterateOverFiles();

            //i.tests.testSaveNewMovie();


            i.settings.fxDone = function onDoneste() {
                cb()
            }

            //cb();
        }

        /*  p.searchForFileInDlManifest2 = function searchForFileInDlManifest2(token, cb) {
         self.proc('searchForFileInDlManifest', self.settings.fileManifest);

         var json = sh.fs.readJSONFile(self.settings.fileManifest);
         var i = new SanitizeNamesFromDB();
         i.init();
         //i.testMode();
         // i.iterateOverFiles_InMega();
         // i.iterateOverFiles();
         i.settings.maxFiles = null
         i.settings.logging = true
         i.settings.mode2 = true;
         //i.settings.maxComparisons = 100
         //var collect = file.map(function (x ) { return x.imdb_id})
         var imdbIds = []
         // if ( i.settings.mode2 == true ) {
         sh.each(json, function addId(i, imdb) {
         if (imdb.skip) {
         return;
         }
         if (imdb.urlTorrentNotFound == true)
         return;
         var query = imdb;
         query.imdb_id = imdb.imdb_id
         if (imdb.series) {
         //   asdf.gcontent
         query.seasonNumber = imdb.query.split(' ').slice(-1)[0]
         }
         if (imdb.seasonNumber) {
         // asdf.g
         query.seasonNumber = imdb.seasonNumber;
         }
         query.query = imdb.query

         self.proc(imdb.name, query.imdb_id)
         imdbIds.push(query)
         })

         self.proc('compareDB');
         console.log('imdbdids', imdbIds)
         //sh.exit('imdbds')
         i.compareDB(imdbIds);
         //i.tests.testSaveNewMovie();
         cb();
         }
         */
        p.searchForFileInDlManifest = function searchForFileInDlManifest(token, cb) {
            self.proc('searchForFileInDlManifest');
//asdf.g
            var dlManifestRequests = sh.fs.readJSONFile(self.settings.fileManifest);
            self.settings.fileMissingOutput = self.settings.fileManifest+'.missing.json'
            self.settings.fileDlManifestProcessedOutput = self.settings.fileManifest+'.recipet.json'
            self.data.listMissingDlRequests = [];
            self.data.listDlRequestsProcessed = [];

            self.data.countFound = 0;
            self.data.countMissing = 0;
            self.data.countSkipped = 0;
            self.data.countNA = 0;
            //asdf.g

           // sh.exit('size', dlManifestRequests.length )
            sh.async(dlManifestRequests, function checkIfRequestFound(dlRequest, fxDoneIteration) {
                    i++
                    //self.proc('okokokok')
                    if (dlRequest.skip) {
                        self.data.countSkipped++
                        fxDoneIteration(); return;
                    }
                    if (dlRequest.urlTorrentNotFound == true) {
                        self.data.countNA++
                        fxDoneIteration(); return;
                        return;
                    }

                    self.proc('okokokok')
                    var i = new SanitizeNamesFromDB();
                    i.init();
                    //i.testMode();
                    // i.iterateOverFiles_InMega();
                    // i.iterateOverFiles();
                    i.settings.maxFiles = null
                    i.settings.logging = true
                    i.settings.mode2 = true;
                    i.settings.fxFilterFile = function fxFilterFile_OnlyValidImdbs(imdbs) {
                        // asdf.g
                        self.proc('okokokok')
                        var validMatch = null;
                        sh.each(imdbs, function findMatchFileName(k,imdbInfo) {
                            var file = sh.fs.norm(imdbInfo.localFilePath)
                            var fileIsInList = self.data.filesNormalized.includes(file);
                            if ( fileIsInList ) {
                                validMatch = imdbInfo;
                                return false;
                            }
                            //console.log('can match',file,fileIsInList)
                        })
                        self.proc('okokokok')

                        //sh.exit('find', imdbs)
                        //asdf.g

                        return validMatch;


                    }
                    //i.settings.maxComparisons = 100
                    //var collect = file.map(function (x ) { return x.imdb_id})
                    var imdbIds = []
                    // if ( i.settings.mode2 == true ) {


                    //console.log('what is imdg', dlRequest)
                    var query = sh.clone(dlRequest);
                    query.imdb_id = dlRequest.imdb_id
                    if (dlRequest.series) {
                        //   asdf.gcontent
                        query.seasonNumber = dlRequest.query.split(' ').slice(-1)[0]
                    }
                    if (dlRequest.seasonNumber) {
                        // asdf.g
                        query.seasonNumber = dlRequest.seasonNumber;
                    }
                    query.query = dlRequest.query

                    console.log(dlRequest.name, query.imdb_id)
                    imdbIds.push(query)

                    self.proc('compareDB');
                    console.log('imdbdids', imdbIds)
                    //sh.exit('imdbds')

                    //dl manifest to dl again
                    //what files missing?
                    //what files found, and what are proper names
                    i.compareDB(imdbIds);
                    i.settings.fxDoneErrors = function onFinishedProcessingDlRequest(missingItems, data) {


                        var dlRequestProcessed = sh.clone(dlRequest);
                        dlRequestProcessed.found = data.foundImdbContent
                        self.data.listDlRequestsProcessed.push(dlRequestProcessed)


                        self.data.countFound  += data.countFound;
                        self.data.countMissing += data.countMissing;

                        if (missingItems.length > 0) {
                            dlRequest.errors = missingItems
                            dlRequestProcessed.errors = missingItems
                            dlRequest.urlTorrentBad = dlRequest.urlTorrent;
                            delete dlRequest.urlTorrent;
                            delete dlRequest.genIndex;
                            delete dlRequest.size;
                            delete dlRequest.filtered;
                            delete dlRequest.seeders;
                            dlRequest.index = self.data.listMissingDlRequests.length+1;

                            self.data.listMissingDlRequests.push(dlRequest)
                        }
                        fxDoneIteration()
                    }
                    //i.tests.testSaveNewMovie();
                },
                finishedAllSets        )
            function finishedAllSets()     {
                sh.writeJSONFile(self.settings.fileMissingOutput, self.data.listMissingDlRequests)
                sh.writeJSONFile(self.settings.fileDlManifestProcessedOutput, self.data.listDlRequestsProcessed)

                self.proc('file is here:', self.settings.fileDlManifestProcessedOutput)
                //asdf.g

                self.data.percentValid = sh.percent(
                    (self.data.countFound-self.data.countMissing)/
                    (self.data.countFound))

                self.proc('percent valid', self.data.percentValid,
                    self.data.countFound-self.data.countMissing+'/'+self.data.countFound)


                cb();
            }

        }

        /*
         extra:
         go through each item and state if it is found and store as output file ....
         */

        p.lastStep = function lastStep() {
            //asdf.g
         //   sh.exit('what is fxdone', self.settings.fxDone)
            sh.callIfDefined(self.settings.fxDone, self.data)
        }
    }
    defineSteps();


    p.test = function test(config) {
    }

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

var RestHelperSQLTest = require('shelpers').RestHelperSQLTest;
var MySQLAdapater = RestHelperSQLTest.MySQLAdapater

MySQLAdapater.cacheEnabled = true;



//MySQLAdapater


SNTestWorkflow.testWorkflow = function testWorkflow(fileManifest, fileList, fxDone, skipFileImport) {


    var instance = new SanitizeList_FileWorkflow();
    var config = {};
    config.fileManifest = fileManifest;
    config.fileList = fileList
    config.fxDone = fxDone
    config.skipFileImport
    instance.init(config)
    //instance.test();
    return;

}

exports.SNTestWorkflow = SNTestWorkflow;

if ( module.parent == null ) {
    var dirTrash = sh.fs.makePath(__dirname, 'trash')
    sh.fs.mkdirp(dirTrash)

    var fileOutput = sh.fs.makePath(dirTrash, 'output.txt')
    var fileListOfFiles = sh.fs.join(__dirname, 'testData', 'fileListTest.txt');

    var fileDlManifest = sh.fs.join(__dirname, 'testData', 'listIds_ls051393312-b.json');

    SNTestWorkflow.testWorkflow(fileDlManifest, fileListOfFiles, function onDone(output) {
//asdf.g
        console.log('testWorkflow', 'done', output)
        return;
        console.log('found how many?', output.foundCount);
        sh.throwIf(output.foundCount != 2, 'did not match write count of items');
    });
}
//XO.runX();


//exports.BasicClass = BasicClass;

if (module.parent == null) {
    /*    var instance = new BasicClass();
     var config = {};
     instance.init(config)
     instance.test();*/
}
