/**
 * Created by user1 on 1/28/2017.
 */


/**
 * Created by user1 on 1/28/2017.
 */

var shelpers = require('shelpers')
var sh = require('shelpers').shelpers;
var PromiseHelperV3 = shelpers.PromiseHelperV3;


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

function Workflow_GetDlProgress() {
    var p = Workflow_GetDlProgress.prototype;
    p = this;
    var self = this;
    self.data = {};

    p.init = function init(config) {
        self.settings = sh.dv(config, {});


        //self.settings.fileImport_ClearAll = true; //why: test using diffen types of files 
        //self.settings.searchOnServerName = 'testFakeMachine';

        var output = {}
        /*

         sh.throwIfNull(self.settings.fileList, 'need a list of files')
         sh.throwIfNull(self.settings.fileManifest, 'need a fileManifest')
         console.log('-verifyComplete%', self.settings.fileManifest, self.settings.fileList);

         self.settings.fileImportServerName = sh.fs.leaf(self.settings.fileList)
         if (self.settings.searchOnServerName != null) {
         } else {
         //by default
         self.settings.searchOnServerName =
         self.settings.fileImportServerName
         //sh.exit('howmany')
         }
         if (self.settings.searchAllServers) {
         self.settings.searchOnServerName = null;
         }
         */


        /*
         if (self.settings.searchOnServerName) {
         i.settings.fileImportServerName =  self.settings.searchOnServerName;
         }
         */

        //sh.x(self.settings)
        self.createRCServerInstance();
        //self.runTestWorkflow();

    }

    p.createRCServerInstance = function createRCServerInstance() {
        var RCConfigExecServer = sh.require('mp/RCExt/RC_ConfigManager_ExecServer.js').RCConfigExecServer

        var t = new RCConfigExecServer()
        // t.loadConfig({});
        // return t;
        t.appSocket = {};
        t.appSocket.emit = sh.logOp
        t.data.j2 = {};
        t.data.j2.addRecent = sh.noOp
        self.data.t = t;
    }

    p.loadFile = function loadFile(file) {
        self.data.fileConfig = file;
        var contents = sh.readJSONFile(file)
        self.data.config = contents;
        self.data.name = sh.fs.leaf(file);
    }

    p.saveConfig = function saveConfig() {
        sh.writeJSONFile(self.data.fileConfig, self.data.config)
        sh.log.file(self.data.fileConfig)
    }


    function defineStep1() {
        p.makeListFromIds = function makeListFromIds() {
            sh.throwIfNull(self.data.config.ids, 'need ides for this')


            var cmdInput = {}
            cmdInput.listIds = self.data.config.ids.join(', ')
            if ( self.data.config.listIdsFrom ) {
                var json = sh.readJSONFile(self.data.config.listIdsFrom)
                cmdInput.listIds = sh.each.collect(json, 'imdb_id')
            }
            cmdInput.taskName = self.data.name;
            cmdInput.wrapType = 'idList'
            cmdInput.wrapType = 'ttIds'
            self.data.t.cmds.listids(cmdInput, function onDone(a, b, c) {
                console.log('ok', a, b, c)
                var yyy =   sh.readJSONFile(a.fileDLManifest)
               console.log(
                   'what is this...', sh.n,
                   sh.readJSONFile(a.fileDLManifest)
               )
                //asdf.g
                //   sh.x()
                self.data.listOutput = a;
                self.data.listTTs = a.fileDLManifest;
                //  asdf.g
                self.postProcessList(self.data.listInput)


            })

        }


        p.postProcessList = function postProcessList(file) {

            var DlManifestVerifyer =
                sh.require('ritv/imdb_movie_scraper/ContentLists/PostProcessPBFile.js').DlManifestVerifyer;

            var cfg = {};


            cfg.file = self.data.listTTs
            DlManifestVerifyer.processPB(cfg)
            cfg.fxDone = function onDone(a, _selfDLMV, c) {
                // asdf.g
                var cleanedList = _selfDLMV.data.listPPPBFile
                self.data.fileDlManifest =
                    self.data.config.fileDlManifest = self.data.config
                self.saveConfig()
                // console.log('ok', a,b ,c)
                console.log('ok', cleanedList)
                // asdf.g
            }

        }
    }

    defineStep1();

    function defineStep2() {
        p.downloadDlList = function downloadDlList(reloadXManifest) {
            sh.throwIfNull(self.data.config.fileDlManifest, 'need ides for this')

            var cmdInput = {}
            cmdInput = sh.clone(self.data.config);
          //  cmdInput.listIds = self.data.config.ids.join(', ')
            cmdInput.taskName = self.data.name;
          //  cmdInput.wrapType = 'idList'
            cmdInput.fileManifest = self.data.config.fileDlManifest
            if ( reloadXManifest ) {
                sh.throwIfNull(self.data.config.listOutputJSON_ReDownloadDlManifest, 'need ides for this')
                cmdInput.fileManifest = self.data.config.listOutputJSON_ReDownloadDlManifest
            }
            /* cmdInput.url = "192.168.1.163:6022"
             cmdInput.ip = "192.168.1.163"
             cmdInput.port = 6024*/
            cmdInput.cmd = "uploadAndRun";
            //self.cmds.uploadAndRun(data, fx)
            self.data.t.cmds.uploadAndRun(cmdInput, function onDone(a, b, c) {
                console.log('ok', a, b, c)
            })

        }


        p.getProgressLite = function getProgressLite() {
            sh.throwIfNull(self.data.config.fileDlManifest, 'need ides for this')

            var cmdInput = {}
            cmdInput = sh.clone(self.data.config);
            cmdInput.listIds = self.data.config.ids.join(', ')
            cmdInput.taskName = self.data.name;
            cmdInput.wrapType = 'idList';
            cmdInput.fileFileList =
                cmdInput.fileManifest = self.data.config.fileDlManifest
            /* cmdInput.url = "192.168.1.163:6022"
             cmdInput.ip = "192.168.1.163"
             cmdInput.port = 6024*/
            cmdInput.cmd = "taskCheckProgressLite"
            //self.cmds.uploadAndRun(data, fx)
            self.data.t.handleSocket(cmdInput, function onDone(a, b, c) {
                console.log('ok', a, b, c)
            })
        }
        p.getProgressLiteStatus = function getProgressLite() {
            sh.throwIfNull(self.data.config.fileDlManifest, 'need ides for this')

            var cmdInput = {}
            cmdInput = sh.clone(self.data.config);
            cmdInput.listIds = self.data.config.ids.join(', ')
            cmdInput.taskName = self.data.name;
            cmdInput.wrapType = 'idList';
            //http://192.168.1.163:6022/getStatus_ofInProgress
            cmdInput.fileFileList =
                cmdInput.fileManifest = self.data.config.fileDlManifest
            /* cmdInput.url = "192.168.1.163:6022"
             cmdInput.ip = "192.168.1.163"
             cmdInput.port = 6024*/
            cmdInput.cmd = "taskGetDLProgressStatus"
            //self.cmds.uploadAndRun(data, fx)
            self.data.t.handleSocket(cmdInput, function onDone(a, b, c) {
                console.log('ok', a, b, c)
            })
        }

        p.postProcessList = function postProcessList(file) {

            var DlManifestVerifyer =
                sh.require('ritv/imdb_movie_scraper/ContentLists/PostProcessPBFile.js').DlManifestVerifyer;

            var cfg = {};


            cfg.file = self.data.listTTs
            DlManifestVerifyer.processPB(cfg)
            cfg.fxDone = function onDone(a, _selfDLMV, c) {
                // asdf.g
                var cleanedList = _selfDLMV.data.listPPPBFile
                self.data.fileDlManifest =
                    self.data.config.fileDlManifest = cleanedList; //self.data.config
                self.saveConfig()
                // console.log('ok', a,b ,c)
                console.log('ok', cleanedList)
                // asdf.g
            }

        }
    }

    defineStep2();

    function defineStep3() {
        p.getDownloadFileList = function getDownloadFileList(recreate) {
            sh.throwIfNull(self.data.config.fileDlManifest, 'need ides for this')

            var cmdInput = {}
            cmdInput = sh.clone(self.data.config);
            cmdInput.listIds = self.data.config.ids.join(', ')
            cmdInput.taskName = self.data.name;
            cmdInput.wrapType = 'idList';
            cmdInput.fileFileList =
                cmdInput.fileManifest = self.data.config.fileDlManifest
            cmdInput.cmd = "dlRemoteFileList" + "WithSizes"
            //self.cmds.uploadAndRun(data, fx)
            self.data.t.handleSocket(cmdInput, function onDone(a, b, c) {
                console.log('ok', a, b, c)
                self.data.config.fileDownloadedFileList = b.data
                if (recreate) {
                    self.recreateList()
                }
            })
        }

        var xDir = 'ritv/distillerv3/tools/SanitizeName2/'
        FileList_to_FullIndex_Workflow = sh.require(xDir + 'FileList_to_SanitizedFileIndex.js').FileList_to_FullIndex_Workflow
        if (FileList_to_FullIndex_Workflow.testWorkflow == null) {
            //debugger
            //FileList_to_FullIndex_Workflow.testWorkflow
        }
        DLManifest_to_FullIndex_Workflow = sh.require(xDir + 'DLManifest_to_FullIndex.js').DLManifest_to_FullIndex_Workflow

        DLManifestIndex_XCompare_SanitizedFileIndex_Workflow = sh.require(xDir + 'DlManifestIndex_XCompare_SanitizedFileIndex.js').DLManifestIndex_XCompare_SanitizedFileIndex_Workflow

        p.recreateList = function recreateList() {
            sh.throwIfNull(self.data.config.fileDlManifest, 'fileList ides for this')


            function step1() {

                var cfg = {}
                cfg.fileDlManifest = self.data.config.fileDlManifest
                cfg.repeat = true
                // cfg.countMaxDlItems = 400
                //cfg.countOffset = 400
                //cfg.skipNonEpisodes = true

                DLManifest_to_FullIndex_Workflow.explodeDLManifestToExpectedFileList(cfg, function onDone(output) {
                    console.log('testWorkflow', 'done', output)
                    step2()
                    return;
                });
            }


            step1()

            function step2() {
                var dirTrash = sh.fs.makePath(__dirname, 'trash')
                sh.fs.mkdirp(dirTrash)
                fileListOfFiles = self.data.config.fileDownloadedFileList
                var cfg = {}
                // sh.merge(cfgMerge, cfg)

                cfg.fileList = fileListOfFiles
                //cfg.countMaxFiles = 10000
                cfg.countMaxFilesToSanitize_EachIteration = 10000
                cfg.countMaxFilesToSanitize_EachIteration = 1000
                cfg.countMaxFilesToExamine = 1000
                //cfg.countMaxFilesToSanitize_EachIteration = 1
                cfg.repeat = true
                //
                // cfg.countMaxFiles = 400
                //cfg.countOffset = 400
                FileList_to_FullIndex_Workflow.testWorkflow(cfg, function onDone(output) {
                    //   asdf.g
                    console.log('testWorkflow', 'done', output)
                    step3()
                    return;
                });
            }



            function step2B() {
                var dirTrash = sh.fs.makePath(__dirname, 'trash')
                sh.fs.mkdirp(dirTrash)
                fileListOfFiles = self.data.config.fileDownloadedFileList
                var cfg = {}
                // sh.merge(cfgMerge, cfg)

                cfg.fileList = fileListOfFiles
                //cfg.countMaxFiles = 10000
                cfg.countMaxFilesToSanitize_EachIteration = 10000
                cfg.countMaxFilesToSanitize_EachIteration = 1000
                cfg.countMaxFilesToExamine = 1000
                //cfg.countMaxFilesToSanitize_EachIteration = 1
                cfg.repeat = true
                //
                // cfg.countMaxFiles = 400
                //cfg.countOffset = 400
                FileListWithSizes_to_Dupes.testWorkflow(cfg, function onDone(output) {
                    //   asdf.g
                    console.log('testWorkflow', 'done', output)
                    step3()
                    return;
                });
            }



            function step3() {


                var cfg = {}
                cfg.fileDlManifest = self.data.config.fileDlManifest
                cfg.fileList = self.data.config.fileDownloadedFileList
                //cfg.countMaxFiles = 1000
                cfg.countMaxFiles2 = 10000
                cfg.countMaxFiles2 = 100
                //cfg.maxIMDBIds = 100
                //cfg.countMaxFiles2 = 1
                cfg.repeat = true
                //
                cfg.countMaxFilesToCheck = 100

                //cfg.countOffset = 400
                DLManifestIndex_XCompare_SanitizedFileIndex_Workflow.explodeDLManifestToExpectedFileList(cfg, function onDone(output) {
                    console.log('testWorkflow', 'done', output != true)
                    output.listOutputJSON_ReDownloadDlManifest
                    self.data.listOutputJSON_ReDownloadDlManifest =
                        self.data.config.listOutputJSON_ReDownloadDlManifest = output.listOutputJSON_ReDownloadDlManifest
                    self.saveConfig()
                    return;
                    console.log('found how many?', output.foundCount);
                    sh.throwIf(output.foundCount != 2, 'did not match write count of items');
                });
            }

            /*
             function step3() {


             var cfg = {}
             cfg.fileDlManifest =  self.data.config.fileDlManifest
             cfg.fileList =  self.data.config.fileDownloadedFileList
             //cfg.countMaxFiles = 1000
             cfg.countMaxFiles2 = 10000
             cfg.countMaxFiles2 = 100
             //cfg.maxIMDBIds = 100
             //cfg.countMaxFiles2 = 1
             cfg.repeat = true
             //
             cfg.countMaxFilesToCheck = 100
             //cfg.countOffset = 400
             DLManifest_to_FullIndex_Workflow.explodeDLManifestToExpectedFileList(cfg, function onDone(output) {
             //asdf.g
             console.log('testWorkflow', 'done', output!=true)
             return;
             console.log('found how many?', output.foundCount);
             sh.throwIf(output.foundCount != 2, 'did not match write count of items');
             });
             }
             */


            return;
            var cmdInput = {}
            cmdInput = sh.clone(self.data.config);
            cmdInput.listIds = self.data.config.ids.join(', ')
            cmdInput.taskName = self.data.name;
            cmdInput.wrapType = 'idList';
            cmdInput.fileFileList =
                cmdInput.fileManifest = self.data.config.fileDlManifest
            cmdInput.cmd = "dlRemoteFileList" + "WithSizes"
            //self.cmds.uploadAndRun(data, fx)
            self.data.t.handleSocket(cmdInput, function onDone(a, b, c) {
                console.log('ok', a, b, c)
                self.data.config.fileList = b.data
                checkList
            })
        }
    }

    defineStep3();

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
            .add(self.convertDLManifest_to_FullIndex)
            .add(self.convertFileList_to_SanitizedList)
            .add(self.xcompare_DLManifest_to_SanitizedList)
            .add(self.showOutput)
            .add(self.createNewDLList)

            //.add(self.iterateOverDlManifest_and_findFiles)
            .add(self.lastStep)
            //.log()
            .end();

    }

    function defineSteps() {
        p.importFilesIntoFileDB = function importFilesIntoFileDB(token, cb) {


            if (self.settings.searchOnServerName !=
                self.settings.fileImportServerName) {
                self.proc('skipping', 'importFilesIntoFileDB')

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
                self.proc('skipping', 'importFilesIntoFileDB')
                cb();
                return;
            }

            if (self.settings.skipFileImport) {
                self.proc('skipFileImport', self.data.filesNormalized.length)
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
            if (self.settings.maxImportFileListCount) {
                i.settings.maxLength = self.settings.maxImportFileListCount;
                //asdf.g
            }

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

            i.settings.fileImportServerName = self.settings.fileImportServerName
            i.settings.searchOnServerName = self.settings.searchOnServerName;
            i.settings.fileImport_ClearAll = self.settings.fileImport_ClearAll; //why: test if this is

            var skipDBImportOfFiles = false;

            if (self.settings.skipFileImport) {
                self.proc('skipFileImport')
                skipDBImportOfFiles = true;
            }


            i.settings.fxDone = function onDoneste() {


                sh.x('breaking after step 1')
                cb()
            }

            i.addFileListToDatabase(self.settings.fileList, skipDBImportOfFiles);
            self.data.filesNormalized = i.data.filesNormalized
            self.proc('size of file list', self.data.filesNormalized.length)
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
            self.settings.fileMissingOutput = self.settings.fileManifest + '.missing.json'
            self.settings.fileDlManifestProcessedOutput = self.settings.fileManifest + '.recipet.json'
            self.data.listMissingDlRequests = [];
            self.data.listDlRequestsProcessed = [];

            self.data.countDLList = 0;
            self.data.countFound = 0;
            self.data.countMissing = 0;
            self.data.countSkipped = 0;
            self.data.countNA = 0;
            self.data.naItems = [];
            self.data.listMissingManifestFile = [];
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
                        if (h.finished) {
                            //asdf.g
                            self.proc('udpe call')
                        }
                        h.finished = true
                        sh.later(__fxDoneIteration)
                        if (index % 100 == 0) {
                            console.log('at', index,
                                sh.percent(index / dlManifestRequests.length), dlRequest.name, dlRequest.title)
                        }
                        //__fxDoneIteration()
                    }

                    index++

                    //self.proc('okokokok')
                    if (dlRequest.skip) {
                        self.data.countSkipped++
                        fxDoneIteration();
                        return;
                    }
                    if (dlRequest.urlTorrentNotFound == true) {
                        self.data.countNA++
                        self.data.naItems.push(dlRequest.name)
                        fxDoneIteration();
                        return;
                        return;
                    }

                    if (dlRequest.urlTorrent == null) {
                        self.data.countNA++
                        self.data.naItems.push(dlRequest.name)
                        fxDoneIteration();
                        return;
                        return;
                    }

                    self.data.countDLList++


                    if (self.settings.searchOnServerName) {
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


                    if (self.settings.searchOnDB) {
                        // asdf.g
                        var queryPrevFile = sh.clone(query)
                        queryPrevFile.fxDone = function onRecievedFile(files) {
                            self.proc('file', files, files.prototype, sh.isString(files))
                            console.log('~~~~~', files.length, files)
                            var file = null
                            if (files.length > 0) {
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


                            if (preMatchMode) {
                                //asdf.g
                                return preMatchedFile;
                                //asdf.g
                            }

                            self.proc('okokokok')
                            var validMatch = null;


                            console.log('potentialMatchingFiles', potentialMatchingFiles)

                            //asdf.g
                            sh.each(potentialMatchingFiles, function findMatchFileName(k, fileInfo) {
                                var localFilePath = sh.fs.norm(fileInfo.localFilePath)
                                var fileIsInList = self.data.filesNormalized.includes(localFilePath);

                                if (self.settings.searchOnDB) {
                                    console.log('()()--', fileIsInList, '--', localFilePath)
                                    sh.x()
                                }

                                if (fileIsInList) {
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


                            self.data.countFound += data.countFound;
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
                                dlRequest.index = self.data.listMissingDlRequests.length + 1;


                                dlRequestClone.origIndex = dlRequestClone.genIndex;
                                dlRequestClone.index = self.data.listMissingDlRequests.length
                                self.data.listMissingDlRequests.push(dlRequestClone)


                            }
                            fxDoneIteration()
                        }
                        //i.tests.testSaveNewMovie();
                    }
                },
                finishedAllSets)


            function finishedAllSets() {
                sh.writeJSONFile(self.settings.fileMissingOutput, self.data.listMissingDlRequests)
                sh.writeJSONFile(self.settings.fileDlManifestProcessedOutput, self.data.listDlRequestsProcessed)

                //sh.writeJSONFile(self.self.data.listMissingManifestFile)

                self.proc('file is here:', self.settings.fileDlManifestProcessedOutput)
                self.proc('fileMissingOutput is here:', self.settings.fileMissingOutput)
                //asdf.g

                self.data.percentValid = sh.percent(
                    (self.data.countFound - self.data.countMissing) /
                    (self.data.countFound))

                self.proc('percent valid', self.data.percentValid,
                    self.data.countFound - self.data.countMissing + '/' + self.data.countFound)


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
        if (self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

Workflow_GetDlProgress.testWorkflow = function testWorkflow(cfg) {

    sh.throwIfNull(cfg.fileManifest, 'only accept configs')

    var instance = new Workflow_GetDlProgress();
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

exports.Workflow_GetDlProgress = Workflow_GetDlProgress;

if (module.parent == null) {
    var dirTrash = sh.fs.makePath(__dirname, 'trash')
    sh.fs.mkdirp(dirTrash)

    var fileOutput = sh.fs.makePath(dirTrash, 'output.txt')
    var fileListOfFiles = sh.fs.join(__dirname, 'testData', 'fileListTest.txt');

    var fileDlManifest = sh.fs.join(__dirname, 'testData', 'listIds_ls051393312-b.json');

    var json = 'G:\\Dropbox\\projects\\crypto\\mp\\RCExt\\tasks\\boodtylisttest-full.6.17.2017.output.pbVerified.json.output.breed.json'
    json = sh.readJSONFile(json)

    var fileListOfFiles = json.fileFileList
    var fileDlManifest = json.listDlManifest


    var cfg = {};
    cfg.fileDlManifest = fileDlManifest;
    cfg.fileListOfFiles = fileListOfFiles;
    cfg.fxDonse = function onDone(output) {
//asdf.g
        console.log('testWorkflow', 'done', output)
        return;
        console.log('found how many?', output.foundCount);
        sh.throwIf(output.foundCount != 2, 'did not match write count of items');
    }

    SNTestWorkflow.testWorkflow(cfg);
}
//XO.runX();


//exports.BasicClass = BasicClass;

if (module.parent == null) {
    /*    var instance = new BasicClass();
     var config = {};
     instance.init(config)
     instance.test();*/
}
