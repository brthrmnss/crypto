/**
 * Created by user on 7/24/15.
 */

/*
 Downloads the file from imdb_app_breed
 why: downloads a pre-compiled download list.
 */

var ritvConfigHelper = require('ritvHelpers');
var rh = ritvConfigHelper.ritvHelpers.ritvHelper//.RitvHelper
var imdb_dl_app = require('./../imdb_dl_appV3').imdb_dl_app;
var sh = require('shelpers').shelpers;


function runWrapper(mixinConfig){






}

exports.runWrapper = runWrapper;


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var PromiseHelperV3 = shelpers.PromiseHelperV3;

function ConvertXToIMDB_PB_List() {
    var p = ConvertXToIMDB_PB_List.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;

        self.runStesps();
    }



    p.runStesps = function runStesps() {
        var chain = new PromiseHelperV3();
        var token = {};
        token.silentToken = true
        chain.wait = token.simulate == false;
        chain.startChain(token)
        chain.add(self.step1_getIMDBInfo)
        chain.add(self.step2_getPBInfo)
        chain.add(self.step3_postProcessList)
        chain.add(self.step4_moveOutputFileToProject);
        // chain.add(self.moveToOutputDir);
        self.chain = chain;
    }

    p.step1_getIMDBInfo = function step1_getIMDBInfo() {
        //content list


        //g:\Dropbox\projects\crypto\ritv\imdb_movie_scraper/IMDB_App_Output/Movies_with_Aliens_ls070079493.json
        self.data.fileOutputDlList = '';


        if ( self.settings.urlList ) {
            var listId = self.utils.getListId(self.settings.urlList);
            self.data.fileOutputDlList = rh.getRVDir('imdb_movie_scraper/IMDB_App_Output/',listId+'.json');
            self.data.fileOutputDlMagsList = rh.getRVDir('imdb_movie_scraper/IMDB_App_Output/mags/',listId+'.json');
        }

        if ( self.settings.ttList ) {
            sh.throwIfNull(self.settings.fileOutput, 'need an output file')
            self.settings.fileOutput = sh.fs.addFileExt(self.settings.fileOutput, 'json')
            self.data.fileOutputDlList = rh.getRVDir('imdb_movie_scraper/IMDB_App_Output/',self.settings.fileOutput);
            self.data.fileOutputDlMagsList = rh.getRVDir('imdb_movie_scraper/IMDB_App_Output/mags/',self.settings.fileOutput);
        }

        //  console.log('self.settings.fileOutput', self.settings.fileOutput, 'yyy')
//sh.exit('exit')
        if ( self.settings.dlConfig ) {
            sh.throwIfNull(self.settings.fileOutput, 'need an output file')
            self.settings.fileOutput = sh.fs.addFileExt(self.settings.fileOutput, 'json')
            self.data.fileOutputDlList = rh.getRVDir('imdb_movie_scraper/IMDB_App_Output/',self.settings.fileOutput);
            self.data.fileOutputDlMagsList = rh.getRVDir('imdb_movie_scraper/IMDB_App_Output/mags/',self.settings.fileOutput);
        }

        if ( self.settings.skipIfListExists ) {
            if ( sh.fs.exists(self.data.fileOutputDlList)) {
                self.proc('found existing file for ', listId);
                self.data.skipToDl = true;
                if ( self.data.skipToDl ) {
                    self.chain.nextLink();
                    return;
                }
            }
        }

        //console.log('what', self.data.fileOutputDlList)
        //sh.exit()
        var config = ritvConfigHelper.ritvHelpers.getConfig();
        process.chdir('../');

        var i = new imdb_dl_app();
        var defaultSettings = config.innerSettingsMixin;
        var imdb2MegaConfig = config.imdb_app;
        imdb2MegaConfig.directDownloadFile =  config.imdb_app_breed.directDownloadFile;

        //sh.mergeObjects(config.innerSettingsMixin
        if (config.imdb_app_breed.innerSettingsMixin) { //override mixing settings
            //var mergedInnerSettings = sh.mergeObjects2(config.imdb_app_breed.innerSettingsMixin,
            //    config.innerSettingsMixin); //Not working b/c pass in idmb2MegaConfig
            imdb2MegaConfig.breedConfigOverrides.innerSettingsMixin = {}; //tip: use breed override b/c we create mixings dirctly in imdb_app
            imdb2MegaConfig.breedConfigOverrides.innerSettingsMixin = config.imdb_app_breed.innerSettingsMixin
        }
        //_checkForExistingFileOnMegaAcct
        imdb2MegaConfig.breedConfigOverrides.innerSettingsMixin.ignoreCookies = true;

        //   if ( imdb2MegaConfig.directDownloadFile == null ) {
        //     throw new Error('need a file to download ' +  'config.imdb_app_breed.directDownloadFile' )
        //}
        //imdb_app
        var i = new imdb_dl_app();

        /*if ( sh.isFunction(mixinConfig)){
         mixinConfig(imdb2MegaConfig)
         }*/

        var cfg = {};
        cfg.doNotBreed = true;
        imdb2MegaConfig.breedStop = true; //prevent breeding hardcore
        imdb2MegaConfig.directDownloadFile = false;
        imdb2MegaConfig.stopAfterGetIMDB = true;


        if ( self.settings.dlConfig ) {
            sh.copyProps(self.settings.dlConfig, imdb2MegaConfig)
        }

        /*

         imdb2MegaConfig.urlList =  'http://www.imdb.com/list/ls056187945/'
         imdb2MegaConfig.urlList =  'http://www.imdb.com/list/ls004841913/'


         imdb2MegaConfig.urlList = 'http://www.imdb.com/list/ls051587623/?start=1&view=detail&sort=user_rating:desc';

         */

        if ( self.settings.urlList != null ) {
            imdb2MegaConfig.urlList = self.settings.urlList;
        }

        if ( self.settings.ttList != null ) {
            imdb2MegaConfig.ttList = self.settings.ttList;
            imdb2MegaConfig.output = self.settings.fileOutput;
            // imdb2MegaConfig.fileOutput = self.settings.fileOutput;
        }


        self.data.calledTimes = 0;

        imdb2MegaConfig.fxDone = function onDoneGettingList(filename) {
            self.data.filename = filename;
            console.log('filename', filename)

            self.data.calledTimes++;
            if ( self.settings.urlList ) {
                if (self.data.calledTimes != 2) {
                    self.proc('ignore 1st call')
                    //   return;
                }
            }

            if ( self.settings.getIMDBMetaDataOnly ) {
                self.proc('getIMDBMetaDataOnly', 'skip it')
                //self.chain.nextLink();
                return;
            }

            self.chain.cb();
        }
        imdb2MegaConfig.configRipper = {};
        imdb2MegaConfig.configRipper.minRating = 6;



        //  console.log(imdb2MegaConfig.type)
        //  console.log(cfg)
        // sh.exit()
        // imdb2MegaConfig['dl.imdb.shqorten.list.to.2.items'] = true;
        i.loadConfig(imdb2MegaConfig, cfg);

        // self.chain.cb()
    }


    p.step2_getPBInfo = function step2_getPBInfo(config) {
        if ( self.settings.skipPBUpdate ) {
            self.proc('skipPBUpdate', 'skip it')
            self.chain.nextLink();
            return;
        }
        //   asdf.g
        //call the program
        var filePB = '../../distillerv3/utils/JSONSet/JSONSetRunner_AddPbToList.js'
        //
        var r = require('./'+filePB)

        if ( self.data.filename == null ) {
            self.data.filename = self.data.fileOutputDlList
        }
        var skipAll = false;
        //skipAll = true;

        r.addToFile(
            {
                fileInput: self.data.filename,
                fxDone: function onFinishedConvert(file, itP) {
                    //asdf.g
                    //asdf.g
                    sh.fs.copy(file, self.data.fileOutputDlMagsList, true);
                    //
                    self.proc('file is out in', self.data.fileOutputDlMagsList)
                    //asdf.g
                    self.chain.cb();
                    //process.exit();
                    //asdf.g
                },
                itSettings:{
                    minRating:6.0
                }
            }
            , skipAll)
        //self.chain.cb()
    }


    p.step3_postProcessList = function step3_postProcessList() {
        var index = 0;
        var dictIds = {};
        var skippedCount = 0;

        sh.fs.exists(self.data.fileOutputDlMagsList, 'could not find the mag output file')
        //sh.exit('what is the list sent', listZ)
        var json = sh.readJSONFile(self.data.fileOutputDlMagsList)
        var fileContents = [];
        sh.each(json, function processItem(k,item) {
            var match = dictIds[item.imdb_id];
            if ( match ) {
                //console.log('skipped', item.name)
                skippedCount++
                return;
            }
            dictIds[item.imdb_id] = item;
            fileContents.push(item)
            index++;
            item.genIndex = index;
        })
        self.data.fileContents = fileContents;

        self.proc('processed list', ' x items', index, 'skipped', skippedCount)

        //seasons
        self.chain.cb()
        //sh.callIfDefined(self.settings.fxDone)
    }
    p.step4_moveOutputFileToProject = function step4_moveOutputFileToProject() {

        var fileOutput = self.data.fileOutputDlMagsList
        if ( self.settings.nameOfOutput ){
            var fileName = fileOutput.replace('/mags/', '/dlListsWrapC/')
            var dirFileOutput = sh.getPath(fileName);

            sh.fs.mkdirp(dirFileOutput)
            fileName  =  dirFileOutput + '/' + self.settings.nameOfOutput + '.json';

            self.proc('---',   fileName, dirFileOutput, fileOutput)
            //var content = sh.toJSONString(self.data.fileContent); //paste deduplicated content
            sh.writeJSONFile(fileName, self.data.fileContents)

            self.settings.fileOutputDlMagsListOrig =
                self.settings.fileOutputDlMagsList;

            self.settings.fileOutputDlMagsList = fileName;
            //sh.callIfDefined(fxDone, fileName);
        }
        //G:\Dropbox\projects\crypto\ritv\distillerv3\utils\JSONSet\TaskContentLists_CombineFilesInOuputDir.js
        self.chain.cb()
        sh.callIfDefined(self.settings.fxDone, self.data.fileOutputDlMagsList, self)
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


        p.utils.getListId = function listId(idUrlOrLsMissing) {

            if ( idUrlOrLsMissing.includes('?')) {
                idUrlOrLsMissing = idUrlOrLsMissing.split('?')[0]
            }
            if ( idUrlOrLsMissing.startsWith('ls')) {
                return idUrlOrLsMissing
            }
            if ( sh.isNumber(idUrlOrLsMissing)) {
                return 'ls'+idUrlOrLsMissing;
            }

            if ( idUrlOrLsMissing.includes('/list/')) {
                idUrlOrLsMissing = idUrlOrLsMissing.split('/list/')[1];

                idUrlOrLsMissing = idUrlOrLsMissing.split('/').join('')
                return idUrlOrLsMissing
            }

            sh.throw('bad input', idUrlOrLsMissing, 'could not make a listid out of this')
            return null

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

exports.ConvertXToIMDB_PB_List = ConvertXToIMDB_PB_List;


ConvertXToIMDB_PB_List.downloadLists = function downloadLists(listIdsInput, skipIfListExists,
                                                              nameOfOutput, fxDone) {

    if ( sh.isArray(listIdsInput) == false ) {
        sh.throw('what array length')
        return;
    }
    var listIds  =[]

    sh.each(listIdsInput, function onConvertIdIntoUrl(k,listId) {
        var url = listId;
        if ( listId.startsWith('http://')) {

        } else {
            url = 'http://www.imdb.com/list/'+listId;
        }
        listIds.push(url);
    })


    // sh.exit('listIds', listIds.length, listIds)

    var files = [];
    sh.async(listIds, function onDownloadList(urlList,cb){
        var instance = new ConvertXToIMDB_PB_List();
        var config = {};
        config.fxDone = function onDoneWithList(list) {
            files.push(list)
            cb()
        };
        config.urlList = urlList;
        config.skipIfListExists = skipIfListExists;
        instance.init(config)
        instance.test();
        //files.push(instance)

    }, function onDone_CombineInto1DlList() {
        var fileContent = [];

        var aFile = '';
        console.log('yyy', files)
        var index = 0;
        var dictIds = {};
        var skippedCount =0
        sh.each(files, function joinAllFiles(k,file) {
            aFile = file;
            var json = sh.readJSONFile(file)
            sh.each(json, function addItem(k,item) {
                var match = dictIds[item.imdb_id]
                if ( match ) {
                    //console.log('skipped', item.name)
                    skippedCount++
                    return;
                }
                dictIds[item.imdb_id] = item;
                fileContent.push(item)
                index++;
                item.genIndex = index;
            })

        });


        console.log('asdf length of listWr', index, skippedCount)

        if ( nameOfOutput ){
            var fileName = aFile.replace('/mags/', '/dlListsWrapC/')
            var dirFileOutput = sh.getPath(fileName);

            sh.fs.mkdirp(dirFileOutput)
            fileName  =  dirFileOutput + '/' + nameOfOutput + '.json';

            var content = sh.toJSONString(fileContent);
            sh.writeJSONFile(fileName, fileContent)

            sh.callIfDefined(fxDone, fileName);
        }
        //asdf.g
        //C:\Users\user1\Dropbox\projects\crypto\ritv\distillerv3\utils\JSONSet\TaskContentLists_CombineFilesInOuputDir.js
    })

}


ConvertXToIMDB_PB_List.downloadIds = function downloadIds(ttList, skipIfListExists,
                                                          nameOfOutput, fxDone) {

    var instance = new ConvertXToIMDB_PB_List();
    var config = {};
    config.fxDone = function onDoneWithList(list) {
        onDone_CombineInto1DlList(list)
    };
    config.fileOutput = nameOfOutput;
    if ( config.fileOutput.includes('.json') == false) {
        config.fileOutput += '.json'
    }
    config.ttList = ttList;



    config.skipIfListExists = skipIfListExists;
    instance.init(config)
    instance.test();

    function onDone_CombineInto1DlList(listZ) {
        var fileContent = [];
        var aFile = '';
        var index = 0;
        var dictIds = {};
        var skippedCount = 0;

        sh.fs.exists(listZ, 'could not find the mag output file')

        //sh.exit('what is the list sent', listZ)
        var json = sh.readJSONFile(listZ)
        sh.each(json, function addItem(k,item) {
            var match = dictIds[item.imdb_id];
            if ( match ) {
                //console.log('skipped', item.name)
                skippedCount++
                return;
            }
            dictIds[item.imdb_id] = item;
            fileContent.push(item)
            index++;
            item.genIndex = index;
        })

        console.log('asdf length of listWr', index, skippedCount)

        if ( nameOfOutput ){
            var fileName = aFile.replace('/mags/', '/dlListsWrapC/')
            var dirFileOutput = sh.getPath(fileName);

            sh.fs.mkdirp(dirFileOutput)
            fileName  =  dirFileOutput + '/' + nameOfOutput + '.json';

            var content = sh.toJSONString(fileContent);
            sh.writeJSONFile(fileName, fileContent)

            sh.callIfDefined(fxDone, fileName);
        }
        //asdf.g
        //C:\Users\user1\Dropbox\projects\crypto\ritv\distillerv3\utils\JSONSet\TaskContentLists_CombineFilesInOuputDir.js
    }

}


ConvertXToIMDB_PB_List.createIMDBList_fromSearch /*downloadFromConfig*/
    = function createIMDBList_fromSearch(dlConfig, skipIfListExists,
                                         nameOfOutput, fxDone) {

    var instance = new ConvertXToIMDB_PB_List();
    var config = {};
    config.fxDone = function onDoneWithList(fileList) {
        sh.callIfDefined(fxDone, fileList);
    };
    config.fileOutput = nameOfOutput;
    if ( config.fileOutput.includes('.json') == false) {
        config.fileOutput += '.json'
    }
    config.dlConfig = dlConfig;

    console.log('thing', dlConfig)
    //sh.exit()
    config.skipIfListExists = skipIfListExists;
    config.nameOfOutput = nameOfOutput;

    dlConfig.year =  parseInt(dlConfig.year) ;
    if ( dlConfig.yearStart) {
        console.log('need year start')
        dlConfig.year =  parseInt(dlConfig.yearStart) ;
    }
    dlConfig.yearEnd =  parseInt(dlConfig.yearEnd) ;

    instance.init(config)
    instance.test();

    return config;
}

if (module.parent == null) {

    function ImdbRipFinalTester() {
        var p = ImdbRipFinalTester.prototype;
        p = this;
        var self = this;

        self.settings = {};
        self.data = {}

        p.init = function init(config) {
            self.settings = sh.dv(config, {});
            config = self.settings;

            //self.method();
        }

        p.onDlLists = function getMetaFromListOf_Playlists() {
            var skipIfListExists = true;
            var fileOutputName = 'outputTo87'
            var list = [
                'ls070079493',
                //'http://www.imdb.com/list/ls070079493/',
                '070435844',
                'http://www.imdb.com/list/ls070000750/',
                'http://www.imdb.com/list/ls006864188/?start=1&view=detail&sort=user_rating:desc&defaults=1&scb=0.9624636702918679',
                'http://www.imdb.com/list/ls004043006/',
                'http://www.imdb.com/list/ls056870923/',
                'http://www.imdb.com/list/ls070949682/',
                'http://www.imdb.com/list/ls075559365/',
                'http://www.imdb.com/list/ls058271916/',
                'http://www.imdb.com/list/ls072780530/',
                'http://www.imdb.com/list/ls071930568/',
                'http://www.imdb.com/list/ls058479560/',
                'http://www.imdb.com/list/ls070099591/',
                'http://www.imdb.com/list/ls077889814/',
                'http://www.imdb.com/list/ls055896802/',
                'http://www.imdb.com/list/ls055731784/',
                'http://www.imdb.com/list/ls051533413/',
                'http://www.imdb.com/list/ls055592025/',
                'http://www.imdb.com/list/ls077438328/',
                'http://www.imdb.com/list/ls053637628/',
                'http://www.imdb.com/list/ls055795648/',
                'http://www.imdb.com/list/ls051393312/',
                'http://www.imdb.com/list/ls050296477/',
                'http://www.imdb.com/list/ls053184993/',
                'http://www.imdb.com/list/ls054431555/',
                'http://www.imdb.com/list/ls051118261/',
                //  ''
            ]
            list = list.slice(0, 3);
            ConvertXToIMDB_PB_List.downloadLists(list,
                skipIfListExists, fileOutputName,
                function onSaved(file) {
                    console.log(file, '...')
                })
            return;
        }

        p.onTTList = function getMedtaFromListOf_ImdbContentIds() {
            var skipIfListExists = true;
            var fileOutputName = 'outputTo86'
            var ttList = [
                'tt0068646',
                'tt0108052',
                'tt0108757'
            ]
            ConvertXToIMDB_PB_List.downloadIds(ttList,
                skipIfListExists, fileOutputName,
                function onSaved(file) {
                    console.log(onSaved.name, file, '...')
                })
        }

        /*  p.onDlConfig = function getMetaFromSearchParameters() {
         var skipIfListExists = true;
         var fileOutputName = 'bestShows1994'
         var dlConfig = {}
         dlConfig.year = 1994;
         dlConfig.yearEnd = 1995;
         dlConfig.pageCount = 1
         dlConfig.maxImdbListSize = 5
         ConvertXToIMDB_PB_List.downloadFromConfig(dlConfig,
         skipIfListExists, fileOutputName,
         function onSaved(file) {
         console.log('onDlConfig', file, '...')
         //asdf.g
         })
         }*/

        p.getMetaFromSearchParameters = function getMetaFromSearchParameters() {
            var skipIfListExists = true;
            var fileOutputName = 'bestShows1994-1996-5'
            //var fileOutputName = 'bestMovies-1994-1996-5'
            var dlConfig = {}
            dlConfig.year = 1994;
            dlConfig.yearEnd = 1995;
            dlConfig.yearEnd = 1996;
            //dlConfig.yearRange = [1995,1996]
            //dlConfig.pageCount = 1
            dlConfig.howMany = 50
            dlConfig.maxImdbListSize = 5
            dlConfig.type = 'tv'

            var imdbAppConfig = ConvertXToIMDB_PB_List.createIMDBList_fromSearch(dlConfig,
                skipIfListExists, fileOutputName,
                function onSaved(file) {
                    console.log('onDlConfig', file, '...')
                    //asdf.g
                })

            //imdbAppConfig.getIMDBMetaDataOnly = true;
        }

        p.getMetaFromSearchParameters_Movies = function getMetaFromSearchParameters_Movies() {
            var skipIfListExists = true;
            //var fileOutputName = 'bestShows1994-1996'
            var fileOutputName = 'bestMovies-1994-1996-5'
            var dlConfig = {}
            dlConfig.year = 1994;
            dlConfig.yearEnd = 1995;
            dlConfig.yearEnd = 1996;
            //dlConfig.yearRange = [1995,1996]
            //dlConfig.pageCount = 1
            dlConfig.howMany = 50
            dlConfig.maxImdbListSize = 5
            dlConfig.type = null

            var imdbAppConfig = ConvertXToIMDB_PB_List.createIMDBList_fromSearch(dlConfig,
                skipIfListExists, fileOutputName,
                function onSaved(file) {
                    console.log('onDlConfig', file, '...')
                    //asdf.g
                })
            imdbAppConfig.getIMDBMetaDataOnly = true;
        }
        p.getMetaFromSearchParameters_RCE = function getMetaFromSearchParameters_RCE() {
            var skipIfListExists = false;
            // var fileOutputName = 'bestMovies-1994-1996-5'
            var dlConfig = {
                "contentType": "Movies",
                "type": "movies",
                "maxImdbListSize": "5",
                "sortType": "Popularity",
                "yearStart": "2017",
                "yearEnd": "2017",
                "cmd": "listids",
                "wrapType": "imdbSearch",
                "listIds": [],
                "taskName": "imdbSearch_undefined_0_Sun_Apr_09_2017_16-50-25.json"
            }

            //var dlConfig = {}
            dlConfig.year = 2017;
            dlConfig.yearEnd = 2017;
            // dlConfig.maxImdbListSize = 5
            //  dlConfig.type = "movies"

            var fileOutputName = dlConfig.taskName
            fileOutputName = 'gggg';
            var imdbAppConfig = ConvertXToIMDB_PB_List.createIMDBList_fromSearch(dlConfig,
                skipIfListExists, fileOutputName,
                function onSaved(file) {
                    console.log('onDlConfig', file, '...')
                    //asdf.g
                })
            // imdbAppConfig.getIMDBMetaDataOnly = true;
        }


        function defineUtils() {
            var utils = {};
            p.utils = utils;
            utils.getFilePath = function getFilePath(file) {
                var file = self.settings.dir + '/' + file;
                return file;
            }

            p.proc = function debugLogger() {
                if (self.silent == true) {
                    return;
                }
                sh.sLog(arguments);
            };
        }

        defineUtils()
    }

    exports.ImdbRipFinalTester = ImdbRipFinalTester;

    var instance = new ImdbRipFinalTester();
    var config = {};
    instance.init(config)
    //instance.onDlLists();
    // instance.getMetaFromSearchParameters();
    // instance.getMetaFromSearchParameters_Movies();
    instance.getMetaFromSearchParameters_RCE();

}
 