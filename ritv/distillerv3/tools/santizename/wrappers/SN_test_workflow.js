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


        //self.settings.fileImport_ClearAll = true; //why: test using diffen types of files 
        //self.settings.searchOnServerName = 'testFakeMachine';

        var output = {}

        sh.throwIfNull(self.settings.fileList, 'need a list of files')
        sh.throwIfNull(self.settings.fileManifest, 'need a fileManifest')
        console.log('-verifyComplete%', self.settings.fileManifest, self.settings.fileList);

        self.settings.fileImportServerName = sh.fs.leaf(self.settings.fileList)
        if ( self.settings.searchOnServerName != null ) {
        } else {
            //by default
            self.settings.searchOnServerName =
                self.settings.fileImportServerName
            //sh.exit('howmany')
        }
        if ( self.settings.searchAllServers ) {
            self.settings.searchOnServerName = null;
        }
      
        
        /*
         if (self.settings.searchOnServerName) {
         i.settings.fileImportServerName =  self.settings.searchOnServerName;
         }
         */

        //sh.x(self.settings)
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
            // return;b
            //go through all files and make sure files exist
            .add(self.iterateOverDlManifest_and_findFiles)
            .add(self.lastStep)
            //.log()
            .end();

    }

    function defineSteps() {
        p.importFilesIntoFileDB = function importFilesIntoFileDB(token, cb) {


            if ( self.settings.searchOnServerName !=
                self.settings.fileImportServerName) {
                self.proc('skipping','importFilesIntoFileDB')

                self.settings.searchOnDB = true;
                /*   var i = new SanitizeNamesFromDB();
                 //  i.settings.logging = true;
                 i.init();
                 self.data.searchRc = i;
                 //self.data.filesNormalized = i.getFilesFromMachines();
                 */
                cb();
                return;
            }


            if (self.settings.doNotImport_fileList) {
                self.settings.searchOnDB = true;
                self.proc('skipping','importFilesIntoFileDB')
                cb();
                return;
            }

            if ( self.settings.skipFileImport ) {
                self.proc('skipFileImport', self.data.filesNormalized.length )
                cb();
                return;
            }
           // asdf.g

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

            i.settings.fileImportServerName =  self.settings.fileImportServerName
            i.settings.searchOnServerName = self.settings.searchOnServerName;
            i.settings.fileImport_ClearAll = self.settings.fileImport_ClearAll; //why: test if this is

            var skipDBImportOfFiles = false;

            if ( self.settings.skipFileImport ) {
                self.proc('skipFileImport')
                skipDBImportOfFiles = true;
            }


            i.settings.fxDone = function onDoneste() {
                cb()
            }

            i.addFileListToDatabase(self.settings.fileList, skipDBImportOfFiles);
            self.data.filesNormalized = i.data.filesNormalized
            self.proc('size of file list', self.data.filesNormalized.length )
            //console.log('this was the list', i.data.filesNormalized)
            //sh.x()


            //  i.iterateOverFiles();

            //i.tests.testSaveNewMovie();




            //cb();
        }


        p.iterateOverDlManifest_and_findFiles = function iterateOverDlManifest_and_findFiles(token, cb2) {
            self.proc('iterateOverDlManifest_and_findFiles');
//asdf.g
            var dlManifestRequests = sh.fs.readJSONFile(self.settings.fileManifest);
            self.settings.fileMissingOutput = self.settings.fileManifest+'.missing.json'
            self.settings.fileDlManifestProcessedOutput = self.settings.fileManifest+'.recipet.json'
            self.data.listMissingDlRequests = [];
            self.data.listDlRequestsProcessed = [];

            self.data.countDLList = 0;
            self.data.countFound = 0;
            self.data.countMissing = 0;
            self.data.countSkipped = 0;
            self.data.countNA = 0;
            self.data.naItems = [];
            self.data.listMissingManifestFile= [];
            //asdf.g

            var index = 0

            self.proc('okokokok');
            var i = new SanitizeNamesFromDB();
            i.init();


            // sh.exit('size', dlManifestRequests.length )
            sh.async(dlManifestRequests,
                function checkIfRequestFound(dlRequest, __fxDoneIteration) {
                    var h = {};
                    function fxDoneIteration() {
                        if ( h.finished ) {
                            //asdf.g
                            self.proc('udpe call')
                        }
                        h.finished = true
                        __fxDoneIteration()
                    }
                    index++

                    //self.proc('okokokok')
                    if (dlRequest.skip) {
                        self.data.countSkipped++
                        fxDoneIteration(); return;
                    }
                    if (dlRequest.urlTorrentNotFound == true) {
                        self.data.countNA++
                        self.data.naItems.push(dlRequest.name)
                        fxDoneIteration(); return;
                        return;
                    }

                    if (dlRequest.urlTorrent == null) {
                        self.data.countNA++
                        self.data.naItems.push(dlRequest.name)
                        fxDoneIteration(); return;
                        return;
                    }

                    self.data.countDLList++


                    if ( self.settings.searchOnServerName ) {
                        i.settings.searchOnServerName = self.settings.searchOnServerName;
                    }


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


                    if (  self.settings.searchOnDB ) {
                        // asdf.g
                        var queryPrevFile = sh.clone(query)
                        queryPrevFile.fxDone = function onRecievedFile(files) {
                            self.proc('file', files, files.prototype, sh.isString(files))
                            console.log('~~~~~', files.length, files)
                            var file = null
                            if ( files.length > 0  ) {
                                file = files[0];
                            }
                            //asdf.g
                            fxSearchForFile(true, file);//

                        }
                        queryPrevFile.serverName = self.settings.searchOnServerName;
                        i.searchRcDbForFile(queryPrevFile)
                    } else {
                        fxSearchForFile();

                    }



                    function fxSearchForFile(preMatchMode, preMatchedFile) {

                    //console.error('pre---yyy', preMatchedFile)
                       //sh.x()
                        //i.testMode();
                        // i.iterateOverFiles_InMega();
                        // i.iterateOverFiles();
                        i.settings.maxFiles = null
                        i.settings.logging = true
                        i.settings.mode2 = true;
                        //this method will search all files, and look to match the item info
                        i.settings.fxFilterFile = function fxFilterFile_OnlyValidImdbs(potentialMatchingFiles) {


                            if ( preMatchMode   ) {
                                //asdf.g
                                return preMatchedFile;
                                //asdf.g
                            }

                            self.proc('okokokok')
                            var validMatch = null;


                            console.log('potentialMatchingFiles', potentialMatchingFiles)

                            //asdf.g
                            sh.each(potentialMatchingFiles, function findMatchFileName(k,fileInfo) {
                                var localFilePath = sh.fs.norm(fileInfo.localFilePath)
                                var fileIsInList = self.data.filesNormalized.includes(localFilePath);

                                if (  self.settings.searchOnDB ) {
                                    console.log('()()--', fileIsInList, '--', localFilePath)
                                    sh.x()
                                }

                                if ( fileIsInList ) {
                                    validMatch = fileInfo;
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

                        // if ( i.settings.mode2 == true ) {


                        //console.log('what is imdg', dlRequest)

                        var imdbIds = [] //realy a movie object
                        imdbIds.push(query)

                        self.proc('compareDB');
                        //console.log('imdbdids', imdbIds)
                        //sh.exit('imdbds')



                        //dl manifest to dl again
                        //what files missing?
                        //what files found, and what are proper names
                        i.compareDB(imdbIds);
                        i.settings.fxDoneErrors = function onFinishedProcessingDlRequest(missingItems, data) {
                            i.settings.fxDoneErrors = null;
                            
                            var dlRequestProcessed = sh.clone(dlRequest);
                            dlRequestProcessed.found = data.foundImdbContent
                            self.data.listDlRequestsProcessed.push(dlRequestProcessed)


                            self.data.countFound  += data.countFound;
                            self.data.countMissing += data.countMissing;

                            if (missingItems.length > 0) {

                                var dlRequestClone = sh.clone(dlRequest);
                                //self.data.listMissingManifestFile.push(dlRequestClone) TODO: dleete this file

                                dlRequest.errors = missingItems
                                dlRequestProcessed.errors = missingItems
                                dlRequest.urlTorrentBad = dlRequest.urlTorrent;
                                delete dlRequest.urlTorrent;
                                delete dlRequest.genIndex;
                                delete dlRequest.size;
                                delete dlRequest.filtered;
                                delete dlRequest.seeders;
                                dlRequest.index = self.data.listMissingDlRequests.length+1;


                                dlRequestClone.origIndex = dlRequestClone.genIndex;
                                dlRequestClone.index =self.data.listMissingDlRequests.length
                                self.data.listMissingDlRequests.push(dlRequestClone)


                            }
                            fxDoneIteration()
                        }
                        //i.tests.testSaveNewMovie();
                    }
                },
                finishedAllSets )



            function finishedAllSets()     {
                sh.writeJSONFile(self.settings.fileMissingOutput, self.data.listMissingDlRequests)
                sh.writeJSONFile(self.settings.fileDlManifestProcessedOutput, self.data.listDlRequestsProcessed)

                //sh.writeJSONFile(self.self.data.listMissingManifestFile)

                self.proc('file is here:', self.settings.fileDlManifestProcessedOutput)
                self.proc('fileMissingOutput is here:', self.settings.fileMissingOutput)
                //asdf.g

                self.data.percentValid = sh.percent(
                    (self.data.countFound-self.data.countMissing)/
                    (self.data.countFound))

                self.proc('percent valid', self.data.percentValid,
                    self.data.countFound-self.data.countMissing+'/'+self.data.countFound)


                cb2();
            }

        }

        /*
         extra:
         go through each item and state if it is found and store as output file ....
         */

        p.lastStep = function lastStep() {
            //asdf.g
           // sd.ggg
             //sh.exit('what is fxdone', self.settings.fxDone)
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


SNTestWorkflow.testWorkflow = function testWorkflow(cfg) {

    sh.throwIfNull(cfg.fileManifest, 'only accept configs')

    var instance = new SanitizeList_FileWorkflow();
    var config = {};
    config = cfg;
    /*config.fileManifest = cfg.fileManifest;
     config.fileList = cfg.fileList
     config.fxDone = cfg.fxDone
     config.skipFileImport = cfg.cfg;*/
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
