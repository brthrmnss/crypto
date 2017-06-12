/**
 * Created by user on 7/4/15.
 */
/**
 */
//var rh = require('rhelpers')
var shelpers = require('shelpers');
var sh = shelpers.shelpers;
var RestHelperSQLTest = require('shelpers').RestHelperSQLTest;
var Sequelize = RestHelperSQLTest.Sequelize;
var PromiseHelperV3 = shelpers.PromiseHelperV3;
var PromiseHelper = require('shelpers').PromiseHelperV3;
//Example Commands:


function SanitizeNamesFromDB() {
    var p = SanitizeNamesFromDB.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.settings.logging = false;
    self.settings.logging = true;
    self.data = {};
    self.data.errors = []


    p.init = function init(url, appCode) {

        self.makeDBConnections();
    }

    p.testMode = function testMode() {
        self.settings.testMode = true;
    }


    p.searchRcDbForFile = function searchRcDbForFile(cfg/*imdb, serverName, filePath, fxDone*/) {

        var query = {}; //sh.clone(cfg)

        if (cfg.file) {
            query.localFilePath = cfg.file;
        }

        if ( cfg.dirRemoteMega && cfg.nameTorrent ) {
            //var j = [cfg.dirRemoteMega, cfg.nameTorrent].join('/')
            var j = cfg.dirRemoteMega
            j = sh.replace(j, '//', '/')
            j = sh.fs.clean2(j)
            query.localFilePath = { $like: '%'+j+'%' }
            /*  query.localFilePath = { $or: [
             { $like: '%'+sh.fslash(j)+'%' },
             { $like: '%'+sh.slash(j)+'%' }
             ] }*/
        }

        if ( cfg.serverName )
            query.serverName = cfg.serverName
        query.imdb_id = cfg.imdb_id
        if (cfg.seasonNumber) {
            query.seasonNumber = cfg.seasonNumber;
        }

        console.log('==>query', sh.toJSONString(query) )
        console.log(cfg)
        //  sh.x()
        self.dbTo.dbHelper2.search(query, function onGetIt (objs) {
            console.log('found files in  in new db', objs.length  )
            //sh.exit('ddd')
            //self.proc('query', );
            sh.cid(cfg.fxDone, objs);
        });

    }

    function defineTests() {
        p.tests = {};
        p.tests.testSaveNewMovie = function testSaveNewEpisode() {
            var episodeToSave = {
                "tvMode": true,
                "epi": "{\"s\":2,\"e\":44,\"dbg\":\"Episode number only in Name \",\"seasonNumber\":\"2\"}",
                "i": 72,
                "leaf": "One Piece -44- Fantastic Voyage.avi",
                "sanitized": "One Piece -44- Fantastic Voyage  ",
                "imdb_id": "tt0982395",
                "line": "/media/sdb/incoming/finished/Root/tv/Wan_p_su__One_Piece_1999/tt0388629/Wan_p_su__One_Piece_Season_2/Season 2/One Piece -44- Fantastic Voyage.avi",
                "episode_name": "Farewell, Drum Island! I'm Going Out to Sea!",
                "imdb_series_id": "tt0388629"
            }

            self.addNewEpisodeToDatabase(episodeToSave, function onCompletedTest_episodeToSave () {
                self.proc('item updated')
            });
        }


        p.addNewEpisodeToDatabase = function addNewEpidoeToDatabase_copyFromOldToNew(episodeToSave, fxDoneAddingEpisode) {
            //asdf.g
            var token = {};
            token.silentToken = true;
            var query = {};
            query.localFilePath = episodeToSave.line;

            if ( self.settings.searchOnServerName ) {
                query.serverName = self.settings.searchOnServerName;
            }

            //yyy.episodeName = episodeToSave.episode_name;

            var helper = {};

            helper.getEpisodeFromOldDb = function getEpisodeFromOldDb(t, cb) {
                self.dbFrom.dbHelper2.search(query, function onGetIt (objs) {
                    //console.log(objs, 'found matching file in old DB')

                    if ( objs.length > 0 ) {
                        var oldEpisode = objs[0];

                        token.oldEpisode = oldEpisode;
                        //console.log('datavalues', obj.values, obj.dataValues)
                        //sh.mergeObjectsForce(yyy, obj.dataValues)

                        //helper.updateEpidoe(obj.dataValues)

                        self.proc('old episode', sh.toJSONString(oldEpisode) )

                        cb()
                        return;
                    } else {
                        if ( self.settings.testMode || self.settings.fromFile ){
                            var fakeDbResult = query;
                            fakeDbResult.adminNotes = '';//TODO: remove defaults
                            token.oldEpisode = fakeDbResult;
                            cb()
                            return;
                        }

                        console.warn('in old DB for file :', query)
                        //why: cannot copy records from original db ... this is issue
                        sh.callIfDefined(cb) //no match nothing to update
                        //cb()

                    }




                }, true);

                return;
            };

            helper.updateEpidoe = function update_imdb_Episode(newEpisode) {
                //why: copy imdb information to file-record
                sh.mergeObjects(token.oldEpisode, newEpisode) //update current

                newEpisode.episodeName = episodeToSave.episode_name;
                newEpisode.episodeName = episodeToSave.episodeName;
                var epi = JSON.parse(episodeToSave.epi)
                newEpisode.imdb_id = episodeToSave.imdb_id;

                //  console.log('{%P$^..', 'update_imdb_Episode', newEpisode)
                //sh.x()
                newEpisode.serverName = self.settings.fileImportServerName

                newEpisode.imdb_series_id = episodeToSave.imdb_series_id;
                newEpisode.episodeNumber = epi.e;
                newEpisode.seasonNumber = epi.s;
                newEpisode.originalFilename = episodeToSave.line; //TODO: fix originalFilename, to be path
                newEpisode.localFilePath = episodeToSave.line;

                console.log('{%P$^..', 'update_imdb_Episode', newEpisode)

                //asdf.g
                /*
                 task:get size, get size from teh fie list
                 see:  var records =  sh.each.copyArrayItemsToItemProp(files, "localFilePath") //create fake records for game of thones

                 var size = sh.fs.getFileSize(newEpisode.localFilePath)
                 self.proc('size', size)



                 if (true) {

                 }*/

                //sh.exit()
            }



            helper.updateEpisodeInNewDb = function updateEpisodeInNewDb(cb) {
                self.dbTo.dbHelper2.search(query, function onGetIt (objs) {
                    //console.log(objs.length, 'found matching item in new db')
                    // sh.exit('ddd')
                    //self.proc('query', )

                    if ( objs.length > 0 ) {
                        var obj = objs[0];

                        //console.error(query, obj.dataValues)
                        // process.exit()
                        //console.log('datavalues', obj.values, obj.dataValues)
                        //sh.mergeObjectsForce(yyy, obj.dataValues)

                        var dbg ={}
                        dbg.query = query;

                        helper.updateEpidoe(obj.dataValues)
// asdf.g
                        if ( token.oldEpisode == null  ) {
                            self.proc('Warning: old episode is null, so to avoid empty update, ... ginore this ', fxDoneAddingEpisode)
                            sh.callIfDefined(fxDoneAddingEpisode)
                            console.error(fxDoneAddingEpisode, 'is null')
                            return;
                        }

                        console.error('update', obj)
                        sh.exit('why does it miss fields?')
                        self.dbTo.dbHelper2.updateRecord(obj, function onUpdated (obj) {
                            //self.dbTo.dbHelper2.addNewRecord(yyy)
                            self.proc('obj', obj)
                            sh.callIfDefined(fxDoneAddingEpisode)
                        });
                        return;
                    }

                    var newEpi = sh.clone(episodeToSave);
                    helper.updateEpidoe(newEpi)

                    if (    self.settings.fromFile )
                    {
                        newEpi.adminNotes = '';
                    }
//asdf.g
                    self.dbTo.dbHelper2.addNewRecord(newEpi, function onItemSaved(){
                        sh.callIfDefined(fxDoneAddingEpisode)
                        // process.exit()
                    })
                }, false);

            }



            var work = new PromiseHelper();
            work.name = 'Update Episode'
            work.wait = token.simulate==false;
            work.startChain(token)
            //.add(helper.updateEpidoe)
                .add(helper.getEpisodeFromOldDb)
                .add(helper.updateEpisodeInNewDb)




            // helper.updateEpidoe(newEpi);





        }
    }
    defineTests();

    p.makeDBConnections = function makeDBConnections() {
        //var dbname = 'imdb_info';
        var DBHelper = require('./../IMDB_DB_Helper').DBHelper
        var dbFrom = new DBHelper();
        //var cfg = i.utils.make()

        var cfg = {
            tableName: 'file',
            databasename	: 'oldRCdb',
            password: 'password',
            logging: self.settings.logging,
            tableOptions:{
                freezeTableName: true,
                tableName: 'file',
                //timestamps:false
            },
            fields:{
                episode_name:'',
                originalFilename:'',
                localFilePath:'',
                serverName:'',
                id:0,
                fileType:'',
                extension: '',
                //    imdb_id: ''
            }
        }


        if ( sh.isWin() == false ) {
            cfg.password = null;
            cfg.user = 'root'
            cfg.password = 'your_password667'
            //cfg.user ='yetidbuser';
            // cfg.password = 'aSDDD545y';
        }

        self.dbFrom = dbFrom;
        self.dbFrom.init(cfg);
        self.dbFrom.createRESTHelper();

        // return
        //var dbname = 'imdb_info';
        var dbTo = new DBHelper();
        //var cfg = i.utils.make()
        var cfg = {
            databasename	: 'rcLive',
            password: 'password',
            tableName: 'file',
            logging: self.settings.logging,
            tableOptions:{
                freezeTableName: true,
                tableName: 'file',
                //timestamps:false,
                indexes: [{unique: true, fields: ['id']}]
            },
            fields:{
                // id:0,//why:cannot bulk create records if id field is not specified
                originalFilename:'',
                episode_name:'',
                show_name:'',
                name:'',
                localFilePath:'longText',
                imdb_id: "",
                imdb_series_id: "",
                seasonNumber: 0, episodeNumber: 0,
                adminNotes:"",
                episode:true,
                series:true,
                serverName:'',

                //user_id: 0,
                //year: "",
                //rating: ""

            }
        }

        if ( sh.isWin() == false ) {
            cfg.password = null;
            cfg.user = 'root'
            cfg.password = 'your_password667'
        }



        cfg.logging = true;
        self.dbTo = dbTo;
        self.dbTo.init(cfg);
        self.dbTo.createRESTHelper();


        self.imdbDB = new DBHelper()
        self.imdbDB.init();
        self.imdbDB.createRESTHelper()
        //self.dbHelper.fxDone = fxDone;

    }

    p.addFileListToDatabase =function addFileListToDatabase(fileList, skipDBImport ) {
        var contents = sh.readFile(fileList);
        //contents = contents.replace(/\r/g, "");
        var files = sh.breakStringIntoLinesSafe(contents)
        files = self.utils.filterFilesOnly(files)
        files = self.utils.filterStrings(files, self.settings.fileFilter)

        self.data.files = files;
        var filesNormalized = [];
        sh.each(files, function noramlizeFile(k,file) {
            var file2 =  sh.fs.norm(file)
            filesNormalized.push(file2);
        })
        self.data.filesNormalized = filesNormalized;

        if ( skipDBImport || self.settings.fileImport_ClearAll ) {
            self.proc('skipDBImport')
            sh.callIfDefined(self.settings.fxDone)
            return;
        }

        self.addFilesToDatabase(files)
    }


    p.iterateOverFileListsIn_dirMega = function iterateOverFileListsIn_dirMega() {
        //why: read all mega files to see what is missing
        self.settings.fromFile = true; //why: setup flag to ignore db specific steps
        var maxFilesToGet = null;
        if (self.settings.testMode) {
            maxFilesToGet = 1; //only get one page
        }


        var dirMega = __dirname + '' + '/../../../megals/';


        //if ( self.fileMegaContents == null ) {
        var contents = sh.fs.getAllFilesInDir(dirMega);

        var files = contents.split(sh.n)
        files = self.utils.filterFilesOnly(files)
        files = self.utils.filterStrings(files, self.settings.fileFilter)


        self.addFilesToDatabase(files)
    }



    p.addFilesToDatabase = function addFilesToDatabase(files) {

        if ( self.settings.ignorePreviouslyProcessedFiles ) {
            files = self.utils.filterFilesSuccessfullyProcessed(files);
        } else {
            self.data.succOldFilePaths = {};
        }

        var records =  sh.each.copyArrayItemsToItemProp(files, "localFilePath", sh.fs.slash) //create fake records for game of thones
        //  records = records.map(function convertToSlash(record) { relo sh.fs.slash(record.localFilePath) })

        //console.log('records', records, 'is slash gone?')
        // asdf.g
        //return
        self.processSetOfRecordFilenames(records, function onEndMega() {
            var errorRows =  self.data.errors;
            var stg = {};
            stg.name = 'missing files-ex.json';

            stg.name =   stg.name

            if ( self.settings.fileFilter ) {
                stg.name = self.settings.fileFilter +  stg.name;
            }
            stg.dir = 'output/'
            // stg.dir = 'logs';
            var arr = ['self.data.countFound',
                self.data.countFound,
                errorRows.length,  (errorRows.length/ self.data.countFound).toFixed(2)
            ];

            errorRows = errorRows.sort()
            errorRows.unshift(sh.join(arr))
            stg.json = errorRows;
            sh.writeFile2(stg);
            console.error( arr );
            self.proc('done with sets')

            sh.writeJSONFile('output/succOldFilePaths.json', self.data.succOldFilePaths);//


            sh.callIfDefined(self.settings.fxDone)
        })

    }
    p.iterateOverFiles = function iterateOverFiles() {




        var maxFilesToGet = null;
        if ( self.settings.testMode ) {
            maxFilesToGet = 1; //only get one page
        }
        self.dbFrom.sequelize.count;
        self.dbFrom.dbHelper2.getUntilDone({}, 200,
            function processNamesIntoDB(records, x, fxAsyncContinue) {
                // asdf.g
                //self.proc('recs', rec)
                self.processSetOfRecordFilenames(records, fxAsyncContinue)
                return true;
            },
            function onDoneGoingingThroughFiles(done) {
                self.proc('completed iterating over files')

                console.error( self.data.errors)
            },
            maxFilesToGet)
    }

    p.compareFileRaw = function compareFileRaw(dbFileRecords, fxDone_processingFilenames) {

        var NameSanitizer = require('./NameSanitizer').NameSanitizer
        var nS = new NameSanitizer();
        nS.initRemote();
        nS.initIMDB_DB();

        self.proc('processing ', dbFileRecords.length, 'files');


        var filteredDbRecords = [];
        sh.each(dbFileRecords, function process_DbFileRecord(i,localFilePath, fxDone) {


            if (sh.endsWith(localFilePath, '.txt')) {
                return
            }
            if (sh.endsWith(localFilePath, '.srt')) {
                return
            }
            if (sh.endsWith(localFilePath, '.nfo')) {
                return
            }
            if ( localFilePath == 'no episode info ') {
                return
            }
            if (sh.includes(localFilePath, '.sample.')) {
                return
            }
            var fifthCharFromEnd = localFilePath.slice(-5, -4)
            var fourth = localFilePath.slice(-4, -3)
            if ( fifthCharFromEnd != '.' &&
                fourth != '.') {
                return; //not a standard file
            }
            filteredDbRecords.push(localFilePath)
        })
        dbFileRecords = filteredDbRecords;

        if ( self.settings.setCount) {
            var startIndex = self.settings.setCount*100;
            var endIndex = startIndex+100;
            dbFileRecords = dbFileRecords.slice(startIndex,endIndex)
        }



        var i = 0
        sh.async(dbFileRecords, function process_DbFileRecord(localFilePath, fxDone) {
                i++;
                var record = {};
                record.localFilePath = localFilePath;


                /*if ( sh.endsWith(localFilePath,'.txt')) {
                 fxDone();
                 }
                 if ( sh.endsWith(localFilePath, '.srt')) {
                 fxDone();
                 }
                 if ( sh.endsWith(localFilePath,'.nfo')) {
                 fxDone();
                 }*/

                console.error(i,';;;', record.localFilePath)
                function fxFault_CouldNotProcessName(msg, eJSON, fileName) {

                    console.error(fileName)
                    if (fileName == null ) {
                        self.data.errors.push(sh.join(msg,eJSON))
                    } else {
                        self.data.errors.push(sh.join(msg,fileName))
                    }
                    fxDone()
                }

                var token = {};
                token.record = record;


                var helper = {};
                helper.santizeName = function santizeName_convertFileNameToEpiAndSeasonNumber(t,cb) {
                    //  i.loadFiles(records)

                    var fileNames = [record.localFilePath]; //search for local path
                    //input filenames,
                    var fileList = nS.utils.filterFileList(fileNames); //convert filenames to epi/season #

                    token.episode = fileList[0];
                    if ( sh.isString(token.episode ) || fileList.length == 0  ) {
                        //cb()
                        fxFault_CouldNotProcessName('no episode info', '', fileNames);
                        return;
                    }
                    var eJSON = JSON.parse(token.episode.epi)
                    if ( sh.isNumber(eJSON.s)  == false || eJSON.s == 0) {
                        fxFault_CouldNotProcessName('no season', eJSON, fileNames); //no season
                        return;
                    }

                    if ( sh.isNumber(eJSON.e) == false || eJSON.e == 0) {
                        fxFault_CouldNotProcessName('no episode', eJSON, fileNames); //no season
                        return;
                    }

                    cb()
                }

                var work = new PromiseHelper();
                work.name = 'Update Episode'
                token.silentToken = true;
                work.wait = token.simulate==false;
                work.startChain(token)
                    .add(helper.santizeName)
                    .add(function doneWithChain(t, cb){
                        console.log('done with iteration', i)
                        fxDone();
                        cb()
                    })

            },
            function recordsProcessed() {
                sh.callIfDefined(fxDone_processingFilenames)
            }
        )


    }

    p.processSetOfRecordFilenames = function processSetOfRecordFilename_step1_updateExisting_files(dbFileRecords, fxDone_processingFilenames) {

        //TODO: Rename, update existing files with episode information
        //why: see above

        var NameSanitizer = require('./../NameSanitizer').NameSanitizer
        var nS = new NameSanitizer();
        nS.initRemote();
        nS.initIMDB_DB();
        nS.settings.asdf = true;
        nS.settings.showAllItemsAtEnd = false;
        nS.settings.log = false;

        self.data.completionsCorrect=   {};
        self.data.completionsErrors=   {}


        /*
         store file
         store all completions , add to file
         if found in file, skip

         store in file at end
         load file at beggining

         store errors
         */


        console.log(sh.n, sh.n, sh.n, sh.n)
        self.proc('processing ','(Name Sanitizing)', dbFileRecords.length, 'files');
        //console.error(dbFileRecords)

        if ( self.settings.testMode) {
            i = 105;
            dbFileRecords = dbFileRecords.slice(105,105+10)

            var y =
                [
                    "/Root/tv/Game_of_Thrones_2011/tt0944947/Game_of_Thrones_Season_3/Game of Thrones Season 3/Game of Thrones Season 3/game of thrones s3e07.mkv",
                    "/Root/tv/Game_of_Thrones_2011/tt0944947/Game_of_Thrones_Season_3/Game of Thrones Season 3/Game of Thrones Season 3/game of thrones s3e08.mkv",
                    "/Root/tv/Game_of_Thrones_2011/tt0944947/Game_of_Thrones_Season_3/Game of Thrones Season 3/Game of Thrones Season 3/game of thrones s3e09.mkv"
                ]

            dbFileRecords =  sh.each.copyArrayItemsToItemProp(y, "localFilePath") //create fake records for game of thones

        }
        if ( self.settings.offset) {
            var st = 5700
            //var size =
            dbFileRecords = dbFileRecords.slice(st, st + 200);
        }

        if ( self.settings.maxLength) {
            dbFileRecords = dbFileRecords.slice(0, self.settings.maxLength);
        }

        self.proc('processing dbFileRecords', dbFileRecords.length)
        var i = 0
        sh.async(dbFileRecords, function process_DbFileRecord(record, fxDone) {
                i++;

                //console.error(i,';;;', record.localFilePath)
                if ( self.settings.gameOfThronesOnly ) {
                    if (record.localFilePath.toLowerCase().indexOf('game_of') == -1) {
                        setTimeout(function () {
                            fxDone()
                        }, 1)
                        // console.error(i,'>>>', record.localFilePath)
                        return;
                    }
                }

                console.error(i,';;;', record.localFilePath)
                //console.error(i,';;;--->', record )





                function fxFault_CouldNotProcessName(msg, eJSON, fileName) {

                    eJSON = sh.dv(eJSON, {})
                    eJSON.msgE = msg;

                    // if (fileName == null ) {
                    self.data.errors.push(sh.join(msg,fileName) +sh.n+JSON.stringify(eJSON))
                    // } else {
                    //  self.data.errors.push(sh.join(msg,fileName))
                    //  }
                    if( sh.isArray(fileName))
                        var fileName = fileName[0]
                    self.data.completionsErrors[fileName] = eJSON
                    if ( eJSON ) {
                        // asdf.g
                        var y = {}
                    }
                    fxDone()
                }

                var token = {};
                token.record = record;

                var helperAddFileToDB = {};
                helperAddFileToDB.santizeName_convertFileNameToEpiAndSeasonNumber = function santizeName_convertFileNameToEpiAndSeasonNumber(t,cb) {


                    //  i.loadFiles(records)

                    var file = record.localFilePath
                    var fileNames = [record.localFilePath]; //search for local path
                    //input filenames,
                    var fileList = nS.utils.filterFileList(fileNames); //convert filenames to epi/season #
                    if ( self.settings.dbg ) {
                        self.proc('issue with input', fileNames, 'no match')
                    }
                    token.episode = fileList[0];

                    if ( sh.isString(token.episode ) || fileList.length == 0  ) {

                        if (   self.settings.allowMoviesWithNoEpisodes ) {
                            var ttId = self.utils.getTTId(file)
                            if ( ttId ) {
                                if (self.settings.dbg) {
                                    self.proc('ttId only', ttId)
                                }

                                var episodeImpersonator = {}
                                episodeImpersonator.series = false;
                                episodeImpersonator.standaloneContent = true;
                                episodeImpersonator.imdb_id = ttId;
                                episodeImpersonator.epi = '{}'
                                episodeImpersonator.line = file;
                                token.episode = episodeImpersonator
                                console.log('00000000000000000000000000000000000000000000', file)
                                cb();

                            } else {
                                fxFault_CouldNotProcessName('no tt id imdb id found', token.episode, fileNames);
                                // return;
                            }

                            return;
                        }
                        //cb()
                        fxFault_CouldNotProcessName('no episode info', token.episode, fileNames);
                        return;
                    }
                    var eJSON = JSON.parse(token.episode.epi)
                    if ( sh.isNumber(eJSON.s)  == false || eJSON.s == 0) {
                        fxFault_CouldNotProcessName('no season', eJSON, fileNames); //no season
                        return;
                    }

                    if ( sh.isNumber(eJSON.e) == false || eJSON.e == 0) {
                        fxFault_CouldNotProcessName('no episode', eJSON, fileNames); //no season
                        return;
                    }

                    console.log('00000000000000000000000000000000000000000000', file)
                    cb()
                }
                helperAddFileToDB.getIMDBEpisodeInformation    = function getIMDBEpisodeInformation(t,cb) {
                    var episode = token.episode;
                    var epi = JSON.parse(episode.epi);
                    /* if ( epi.s == '') {
                     fxFault_CouldNotProcessName();
                     return;
                     }*/
                    if (self.settings.logConsole != false) {
                        self.proc('episode', episode.imdb_id, JSON.stringify(episode.epi), epi["s"], epi.e)
                    }
                    var fileName = token.record.localFilePath;
                    self.data.completionsCorrect[fileName] = epi
                    self.data.succOldFilePaths[fileName] = epi

                    var overrideForceDB= true
                    //process.exit()
                    nS.dbHelper.getIMDBContentByID(episode.imdb_id,
                        function onGot_IMDB_ShowInfo_From_Db_Content(content){
                            //why: find IMDB info for show from database
                            // self.proc(content)
                            //process.exit();
                            if ( content.length == 0 ) {
                                console.error('could not find in imdb db ... cannot continue. re-import','imdbid', episode.imdb_id, episode.epi.s, episode.epi.e)
                                cb()
                                return;
                                //fxDone();
                                //bail on it all
                                //return // fuck ...
                            }
                            content = content[0];

                            episode.imdb_id = content.imdb_id;

                            if ( episode.standaloneContent != true ) {
                                episode.episode_name = content.episode_name;
                                episode.imdb_series_id = content.imdb_series_id;
                                episode.episode = true;
                                // console.log('sdf', 'what', episode)
                                // sh.exit('..why is imdb_id not saved?')
                            } else {
                                sh.copyProps(content, token.episode,null, true)
                                //token.episode = content; //replace with what was in database ...
                            }
                            cb();
                        }
                        , epi.s, epi.e, self.settings.getIMDBShowInformation, overrideForceDB )

                };
                helperAddFileToDB.updateDatabase_WithEpisode   = function updateDatabase_WithEpisode(t, cbB) {
                    var episodeToSave = t.episode
                    //self.proc('save new show...', episodeToSave)
                    console.log('1111111111111111111111111111111111111');

                    self.addNewEpisodeToDatabase(episodeToSave,
                        function onCompletedTest_addNewEpisodeToDatabase () {
                            //self.proc('item updated');
                            console.log('22222222222222222222222222222222222222222')
                            cbB();
                        });
                }

                var work = new PromiseHelper();
                work.name = 'Update Episode';
                token.silentToken = true;
                work.wait = token.simulate==false;
                work.startChain(token)
                    .add(helperAddFileToDB.santizeName_convertFileNameToEpiAndSeasonNumber)
                    .add(helperAddFileToDB.getIMDBEpisodeInformation)
                    .add(helperAddFileToDB.updateDatabase_WithEpisode)
                    .add(function doneWithChain(t, cb3){
                        //console.log('done with iteration', i)
                        cb3()
                        console.log('3333333333333333333333333333333333333333')
                        fxDone();
                    })

            },
            function recordsProcessed() {
                sh.callIfDefined(fxDone_processingFilenames)
            }
        )


    }

    p.saveEpisodesInNewDB = function saveEpisodesInNewDB(list) {
        //why: any new records are saved in db
        self.proc('saveEpisodesInNewDB', list)

        sh.each(list, function addToDatabase(i, v) {
            v.line
            v.imdb_id
            v.imdb_series_id
            if (v.imdb_id == v.imdb_series_id ) {
                return;
            }
            if (v.imdb_series_id == null ) {
                return;
            }
            v.episode_name;
            //look for file in database, if found, update it
            //if not found ... ignore
            //if found, update with new record ...


            return;
            //if ()
        });
        return;
    }

    function defineSection3CompareResultsInDb_q_What_Has_downloaded() {


        p.compareDB = function compareDB(imdbIds) {
            //why: verify imdb contents are in the files. run after import all files
            var maxLimit = sh.dv(self.settings.maxFiles, null);
            //go through all imdb items
            //check if season and episode in database
            //store if not in database

            if ( self.settings.maxComparisons ) {
                imdbIds = imdbIds.slice(0,self.settings.maxComparisons);
            }

            self.data  = {};
            self.data.notFound = []
            self.data.foundImdbContent = []
            self.data.countFound = 0;
            self.data.countValid = 0;
            self.data.countMissing = 0;
            self.data.imdbInfosNotFound = []
            if ( imdbIds) {
                sh.async(imdbIds, function compare_IMDBINDB(imdb_id, fxDoneComparisons) {
                        var imdbInfo = imdb_id
                        if ( self.settings.mode2 ) {
                            imdb_id = imdbInfo.imdb_id;
                        }
                        //i++;
                        var query_FindIMDBItem = {imdb_series_id: imdb_id}

                        if ( self.settings.mode2 ) {
                            query_FindIMDBItem.seasonNumber = imdbInfo.seasonNumber;
                        }

                        if ( imdbInfo.series != true ) {
                            var query_FindIMDBItem = {imdb_id: imdb_id}
                        }

                        self.imdbDB.dbHelper2.search(query_FindIMDBItem,
                            function processAllEpisodesInShow(imdbItemResults, x) {
                                // asdf.g
                                self.proc('how many imdbItems for', imdb_id,
                                    self.utils.getNameForImdb(imdbInfo), imdbItemResults.length )
                                var dbg = [query_FindIMDBItem]
                                if ( imdbItemResults.length == 0 ) {
                                    self.proc('0 episodes for item', JSON.stringify(imdbInfo), JSON.stringify(query_FindIMDBItem) )
                                    console.error('TODO verify is not tv show')
                                    //sh.x('sdffddffffff')
                                    fxDoneComparisons()
                                    return;
                                    //asdf.g
                                }

                                self.crossCompare_DlFile_with_IMDB(imdbItemResults,
                                    fxDoneComparisons, imdbInfo)
                                //fxDone() //TODO: why not wait for verifications? this has to be wrong ...
                            })

                    },
                    self.onDoneGoingingThroughFiles
                )


            } else {

                self.proc('checking the whole dtabase')
                //self.dbFrom.sequelize.count;
                self.imdbDB.dbHelper2.getUntilDone({}, 200,
                    function processNamesIntoDB(records, x, fxAsyncContinue) {
                        // asdf.g
                        //self.proc('recs', rec)
                        self.crossCompare_DlFile_with_IMDB(records, fxAsyncContinue)
                        return true;
                    },
                    self.onDoneGoingingThroughFiles,
                    maxLimit)

            }


        }

        p.onDoneGoingingThroughFiles =  function onDoneGoingingThroughFiles(done) {
            self.proc('mode 2', 'coundFound', self.data.countFound)
            self.proc('completed iterating over files')
            // sh.exit('why is countFound always 0count is always 0')
            var errorRows = [];
            sh.each(self.data.notFound, function showItem(i,error) {
                var row =[
                    /*i,*/ error.name, error.imdb_id, sh.str.pad(error.seasonNumber, 2)+'x'+sh.str.pad(error.episodeNumber,2),
                    ' ', error.episode_name];
                //console.error(i, error)
                if (error.imdb_series_id == null  ) {
                    var row =[
                        error.name,  error.imdb_id,
                        ' ', error.name];
                }
                // console.error( sh.join(row) );
                errorRows.push(sh.join(row));
            });

            //  sh.exit('stop after seeing errors')
            if ( self.settings.mode2 == true ) {
                if (self.settings.fxDoneErrors) {
                    self.settings.fxDoneErrors( errorRows , self.data)
                }


                if ( self.settings.skipOutputFileForErrors ) {
                    self.proc('self.settings.skipOutputFileForErrors')
                    return;
                }

                self.proc('mode 2', 'coundFound', self.data.countFound)
                self.data.imdbInfosNotFound
                var stg = {};
                stg.name = 'missing imdb info.json';
                stg.dir = 'output/'
                // stg.dir = 'logs';
                var arr = [
                    'self.data.countFound:',
                    self.data.countFound,
                    errorRows.length,
                    'missing:',
                    sh.toPercent(errorRows.length/ self.data.countFound)
                ];
                errorRows = errorRows.sort()
                errorRows.unshift(sh.join(arr))
                stg.json = self.data.imdbInfosNotFound;
                sh.writeFile2(stg);



                var stg = {};
                stg.name = 'missing imdb info_raw_list.json';
                stg.dir = 'output/'
                errorRows.unshift('this file tells what files were missig')
                stg.json = errorRows;
                sh.writeFile2(stg);




                console.error( arr );
                self.proc('done with sets')
                return;
            }
            var stg = {};
            stg.name = 'missing files.json';
            stg.dir = 'output/'
            // stg.dir = 'logs';
            var arr = [
                'self.data.countFound',
                self.data.countFound,
                errorRows.length,
                (errorRows.length/ self.data.countFound).toFixed(2),

            ];
            errorRows = errorRows.sort()
            errorRows.unshift(sh.join(arr))
            stg.json = errorRows;
            sh.writeFile2(stg);
            console.error( arr );


            //write imdb file

            // console.error( self.data.errors)
        }


        p.crossCompare_DlFile_with_IMDB =
            function crossCompare_DlFile_with_IMDB(episodesOrMovieIn_IMDBInfoDB,
                                                   fxDone_processingFilenames, imdbInfoQuery){

                if ( episodesOrMovieIn_IMDBInfoDB.length == 0 ) {
                    self.proc('episodesOrMovieIn_IMDBInfoDB is 0', episodesOrMovieIn_IMDBInfoDB)
                    asdf.g; //should never have no items, fix ImdbIfno
                }
                self.proc(sh.t, '>>>', 'tocks', episodesOrMovieIn_IMDBInfoDB.length, imdbInfoQuery.imdb_id)
                var i = 0;

                sh.async(episodesOrMovieIn_IMDBInfoDB, function compare_IMDBINDB(lookFor_imdbInfo, fxDone) {
                        i++;
                        self.proc(sh.t,  'searching for episode', i, JSON.stringify(lookFor_imdbInfo) )
                        function fxFault_CouldNotProcessName(msg, eJSON) {
                            self.data.errors.push(sh.join(msg,eJSON))
                            sdf.g
                            fxDone()
                        }


                        var jsonInfo = {};
                        jsonInfo.imdb_id = lookFor_imdbInfo.imdb_series_id;//c
                        jsonInfo.seasonNumber = parseInt( lookFor_imdbInfo.seasonNumber);
                        jsonInfo.episodeNumber = parseInt(lookFor_imdbInfo.episodeNumber);
                        jsonInfo.searchEpisode = true;
                        jsonInfo.tv  = true;

                        if ( lookFor_imdbInfo.series != true ) {
                            if (  lookFor_imdbInfo.imdb_series_id ==null ) {
                                //asdf.g
                                //fxDone()
                                //  return;
                            }
                            var jsonInfo = {};
                            jsonInfo.imdb_id = lookFor_imdbInfo.imdb_id;//c
                        }

                        //self.proc('searching for', JSON.stringify(lookFor_imdbInfo))
                        self.proc('searching for', self.utils.getNameForImdb(lookFor_imdbInfo))
                        //todo, search for file based on filename? b/c might have mirrored files
                        //query = {};
                        //  query.imdb_series_id = jsonInfo.imdb_id;
                        self.findFileInToDB(jsonInfo, function onFoundResultsInSantiziedDatabase(imdbs) {
                            var dbg = [jsonInfo, 0]
                            self.data.countFound++ //number of sea
                            //asdf.g// rch

                            self.proc(sh.t, 'found', imdbs.length, jsonInfo)



                            var imdbInfoMatch = imdbs[0];

                            if ( self.settings.fxFilterFile) {
                                imdbInfoMatch = self.settings.fxFilterFile(imdbs)
                                // imdbInfoMatch.localFilePath.startsWith('') //TODO match to dir name
                            }

                            //IOW: Get alll matchin imdb, then filter it late4r for proper match based on filename ... input?
                            //from input to settings of path?
                            if ( imdbInfoMatch ) {
                                self.data.countValid++ //

                                //sh.exit('no records in db')
                                self.data.foundImdbContent.push(imdbInfoMatch)
                                fxDone()
                            } else {
                                console.error('missing')
                                self.data.countMissing++ //

                                //sdf.g
                                //sh.x('no records in db');
                                if ( self.settings.findIMDBIfMissing ) {
                                    var imdbInfo = lookFor_imdbInfo
                                    var title = [ imdbInfo.name, sh.qq( imdbInfo.imdb_series_id),
                                        imdbInfo.seasonNumber, 'x', imdbInfo.episodeNumber,
                                        imdbInfo.episode_name,
                                        imdbInfo.imdb_id].join(' ')

                                    if ( imdbInfo.seasonNumber == 0 || imdbInfo.episodeNumber == 0 ) {
                                        console.error('got 0 epixode ', title)
                                        fxDone()
                                        return;
                                    }
                                    if ( ! sh.includes(self.data.imdbInfosNotFound,imdbInfoQuery)) {
                                        self.data.imdbInfosNotFound.push(imdbInfoQuery)
                                        imdbInfoQuery.index = self.data.imdbInfosNotFound.length
                                    }

                                    imdbInfoQuery.missingFiles = sh.dv(imdbInfoQuery.missingFiles, [])
                                    imdbInfoQuery.missingFiles.push(title)
                                    imdbInfoQuery.missingFiles = imdbInfoQuery.missingFiles.sort();
                                } else {
                                    console.error("why don't use ahve imdb info? lookFor_imdbInfo");
                                }
                                self.data.notFound.push(lookFor_imdbInfo)
                                fxDone()
                            }
                        });
                    },
                    function recordsProcessed() {
                        // sh.exit('no records in db 3')
                        sh.callIfDefined(fxDone_processingFilenames)

                    }
                )
            }

    }

    defineSection3CompareResultsInDb_q_What_Has_downloaded();

    function defineUtils() {
        p.getInfoFromJSON = function get(x, doNotLog) {
            var dirRemoteMega = x.dirRemoteMega;
            var output = {};
            output.tv = dirRemoteMega.indexOf('/Root/tv/') ==  0;

            var split = dirRemoteMega.split('/')

            sh.each(split, function getTT(k, dir) {
                if (dir.indexOf('tt') == 0) {
                    output.imdb_id = dir;
                }
            });

            if ( output.tv ) {
                if ( doNotLog != true )
                    console.error(x,output, dirRemoteMega)
                if (x.query.indexOf(' Season ') == -1 ) {
                    var epSeason = x.query.split(' ').slice(-1)[0]
                    epSeason = epSeason.slice(1)
                    var split = epSeason.split('E')
                    output.seasonNumber = split[0]
                    output.episodeNumber = split[1]
                    output.searchEpisode = true
                    if (x.seasons != null)  { // && x.ended == true ){
                        output.seasonNumber = 1;
                        output.seasonNumberEnd = x.seasons;
                        output.episodeNumber =1

                    }
                } else {
                    var str = dirRemoteMega.split('_Season_')[1];
                    str = str.replace('/', '')
                    output.seasonNumber = str;
                }
            }

            return output;
        }


        p.findFileInToDB = function getItemFromDatabase(jsonInfo, fxD ) {

            var query = {}
            query.imdb_id = jsonInfo.imdb_id;
            if ( jsonInfo.tv ) {
                query = {};
                query.imdb_series_id = jsonInfo.imdb_id;
                query.episodeNumber = 1;
                query.seasonNumber = jsonInfo.seasonNumber;

                if ( jsonInfo.searchEpisode ) {
                    query.episodeNumber = jsonInfo.episodeNumber
                }
            }



            if ( self.settings.searchOnServerName ) {
                query.serverName = self.settings.searchOnServerName;
            }




            //asdf.g
            // console.error('query', query)
            //self.dbTo.dbHelper2.settings.logConsole =  self.settings.logConsole
            self.dbTo.dbHelper2.search(query, function onGetIt (objs) {
                // if ( self.settings.logConsole != false )
                //   console.log('{}||found results ... ' , objs)
                //  sh.x()
                if ( objs.length > 0 ) {
                    var oldEpisode = objs[0];

                }
                fxD(objs)
            },null, null, null, true)
        }



        p.utils = {};
        p.utils.filterFilesOnly = function filterFilesOnly(files) {
            var filteredFiles = [];
            sh.each(files, function removeFileIfNotValidVid(i,localFilePath) {
                if (sh.endsWith(localFilePath, '.txt')) {
                    return
                }
                if (sh.endsWith(localFilePath, '.srt')) {
                    return
                }
                if (sh.endsWith(localFilePath, '.nfo')) {
                    return
                }
                if ( localFilePath == 'no episode info ') {
                    return
                }
                if (sh.includes(localFilePath, '.sample.')) {
                    return
                }

                var  skipBc = null;
                var removeFileTypes = ['.icon', '.epub', '.pdf', '.ico', '.mobi',
                    '.jpg', '.png', '.htm', '.rar', '.xml',
                    '.smi']
                sh.each(removeFileTypes, function onFile(k,v) {
                    if (sh.endsWith(localFilePath,v)) {
                        skipBc = v
                        return false;
                    }
                });

                var removeFileTypes = ['.sample.', '-sample.' ]
                sh.each(removeFileTypes, function onFile(k,v) {
                    if (sh.includes(localFilePath,v)) {
                        skipBc = v
                        return false;
                    }
                });

                if ( skipBc ) {
                    return
                }


                var includeFileType =   ['.mp4',
                    '.mkv', '.avi',  '.m4v'  ]
                var includesFileType = null
                sh.each(includeFileType, function onFile(k,v) {
                    if (sh.includes(localFilePath,v)) {
                        includesFileType = v
                        return false;
                    }
                });

                if ( includesFileType == null ) {
                    return
                }
                var fifthCharFromEnd = localFilePath.slice(-5, -4)
                var fourth = localFilePath.slice(-4, -3)
                if ( fifthCharFromEnd != '.' &&
                    fourth != '.') {
                    return; //not a standard file
                }
                filteredFiles.push(localFilePath)
            })
            var showRemovedItems = false;
            //showRemovedItems = true
            if ( showRemovedItems ) {
                sh.each(files, function showRemovedFiles(i,origfile) {
                    if (filteredFiles.indexOf(origfile) == -1 ) {
                        console.error(origfile)
                    }
                })
                process.exit()
            }
            var showIncludedItems = false;
            //showIncludedItems = true
            if ( showIncludedItems ) {
                sh.each(filteredFiles, function showAllIncludedFiles(i,origfile) {
                    // if ( i < 9000 )
                    console.log(i,origfile)
                })
                process.exit()
            }
            return filteredFiles;
        }
        p.utils.filterFilesSuccessfullyProcessed = function filterFilesOnly(files) {
            var filteredFiles = [];

            self.data.succOldFilePaths = sh.readJSONFile('output/succOldFilePaths.json',{}, true);//




            sh.each(files, function removeFileIfNotValidVid(i,localFilePath) {
                if ( self.data.succOldFilePaths ) {
                    var old = self.data.succOldFilePaths[localFilePath];
                    if ( old != null ) {
                        //asdf.g
                        // fxDone();
                        return;
                    }
                }
                filteredFiles.push(localFilePath)
            })
            var showRemovedItems = false;
            //showRemovedItems = true
            if ( showRemovedItems ) {
                sh.each(files, function showRemovedFiles(i,origfile) {
                    if (filteredFiles.indexOf(origfile) == -1 ) {
                        console.error(origfile)
                    }
                })
                process.exit()
            }
            var showIncludedItems = false;
            //showIncludedItems = true
            if ( showIncludedItems ) {
                sh.each(filteredFiles, function showAllIncludedFiles(i,origfile) {
                    // if ( i < 9000 )
                    console.log(i,origfile)
                })
                process.exit()
            }
            return filteredFiles;
        }


        p.utils.filterStrings = function filterStrings(files, filterStr) {

            if ( filterStr == null){
                return files;
            }
            var filteredFiles = [];
            sh.each(files, function process_DbFileRecord(i,localFilePath, fxDone) {
                if (sh.includes(localFilePath.toLowerCase(), filterStr.toLowerCase())) {
                    filteredFiles.push(localFilePath)
                }
            })
            return filteredFiles;
        }

        p.utils.getTTId = function getTTId(f){


            console.log('what is f', f)
            f = sh.fixPath(f)
            if ( f.includes('tt') == false) {
                return null;
            }

            var tt = 'tt'+f.split('tt')[1]
            tt = sh.fixSlash(tt)
            if ( f.includes('/')) {
                tt = tt.split('/')[0]
            }

            return tt
        }

        p.utils.getNameForImdb = function getNameForImdb(imdb) {
            var name = null;
            name = sh.join(imdb.name, imdb.imdb_id)
            if ( imdb.series) {
                name = sh.join(imdb.name, imdb.imdb_id, 'TVShow')
            }
            //console.error('getNameForImdb', sh.t, sh.t, sh.t, imdb)
            if ( imdb.episodeNumber ) {
                name = sh.join(imdb.name, imdb.imdb_id, 'Episode',
                    's'+imdb.seasonNumber+'x'+ 'e'+imdb.episodeNumber)
                //sh.exit('what is the espideo thing?', imdb)
                // asdf.g
            }
            //   name = sh.join(imdb.name, imdb.imdb_id)
            return name
        }
        //files = self.utils.filterStrings(files, self.settings.filterFiles )

    }
    defineUtils();

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return
        }
        sh.sLog(arguments)
    }






}

exports.SanitizeNamesFromDB = SanitizeNamesFromDB;
if ( module.parent == null ) {

    var i = new SanitizeNamesFromDB();
    i.init();
    i.testMode();
    i.iterateOverFiles();

    //i.tests.testSaveNewMovie();

}
