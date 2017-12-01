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


function runWrapper(mixinConfig) {


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

        console.log(
            'config', config
        )
        //   asdf.g
        //   return
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


        if (self.settings.urlList) {
            // asdf.g
            var listId = self.utils.getListId(self.settings.urlList);
            self.data.fileOutputDlList = rh.getRVDir('imdb_movie_scraper/IMDB_App_Output/', listId + '.json');
            self.data.fileOutputDlMagsList = rh.getRVDir('imdb_movie_scraper/IMDB_App_Output/mags/', listId + '.json');
        }


        if (self.settings.ttList) {
            //    asdf.g
            sh.throwIfNull(self.settings.fileOutput, 'need an output file')
            self.settings.fileOutput = sh.fs.addFileExt(self.settings.fileOutput, 'json')

            self.data.fileOutputDlList = rh.getRVDir('imdb_movie_scraper/IMDB_App_Output/', self.settings.fileOutput);
            self.data.fileOutputDlMagsList = rh.getRVDir('imdb_movie_scraper/IMDB_App_Output/mags/', self.settings.fileOutput);
        }

        //  console.log('self.settings.fileOutput', self.settings.fileOutput, 'yyy')
//sh.exit('exit')
        if (self.settings.dlConfig) {
            sh.throwIfNull(self.settings.fileOutput, 'need an output file')
            self.settings.fileOutput = sh.fs.addFileExt(self.settings.fileOutput, 'json')
            self.data.fileOutputDlList = rh.getRVDir('imdb_movie_scraper/IMDB_App_Output/', self.settings.fileOutput);
            self.data.fileOutputDlMagsList = rh.getRVDir('imdb_movie_scraper/IMDB_App_Output/mags/', self.settings.fileOutput);
        }

        if (self.settings.skipIfListExists) {
            if (sh.fs.exists(self.data.fileOutputDlList)) {
                self.proc('found existing file for ', listId);
                self.data.skipToDl = true;
                if (self.data.skipToDl) {
                    self.chain.nextLink();
                    return;
                }
            } else {
                self.proc('file doe snto exist ... oik')
            }
        }
        self.proc(self.settings.skipIfListExists, self.data.fileOutputDlList)


        if (self.settings.skipFirstFile) {
            self.data.filename = self.settings.skipFirstFile;
            self.proc('found existing file for ', self.data.filename);
            self.chain.nextLink();
            return;
        }

        //sdfsdf.g

        //     asdf.skipIfListExists

        //console.log('what', self.data.fileOutputDlList)
        //sh.exit()
        var config = ritvConfigHelper.ritvHelpers.getConfig();
        process.chdir('../');

        var i = new imdb_dl_app();
        var defaultSettings = config.innerSettingsMixin;
        var imdb2MegaConfig = config.imdb_app;
        imdb2MegaConfig.directDownloadFile = config.imdb_app_breed.directDownloadFile;

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


        if (self.settings.dlConfig) {
            sh.copyProps(self.settings.dlConfig, imdb2MegaConfig)
        }

        /*

         imdb2MegaConfig.urlList =  'http://www.imdb.com/list/ls056187945/'
         imdb2MegaConfig.urlList =  'http://www.imdb.com/list/ls004841913/'


         imdb2MegaConfig.urlList = 'http://www.imdb.com/list/ls051587623/?start=1&view=detail&sort=user_rating:desc';

         */

        if (self.settings.urlList != null) {
            imdb2MegaConfig.urlList = self.settings.urlList;
        }

        if (self.settings.ttList != null) {
            imdb2MegaConfig.ttList = self.settings.ttList;
            imdb2MegaConfig.output = self.settings.fileOutput;
            // imdb2MegaConfig.fileOutput = self.settings.fileOutput;
        }

        //asdf.g
        self.data.calledTimes = 0;

        var y = new sh.TwoCallHelper();
        var count = 0;

        imdb2MegaConfig.fxDone = function onDoneGettingList(filename) {
            // asdf.g
            self.data.filename = filename;
            console.log('onDoneGettingList', 'filename', filename)
            y.addX('called once')
            self.data.calledTimes++;
            if (self.settings.urlList) {
                if (self.data.calledTimes != 2) {
                    self.proc('ignore 1st call')
                    //   return;
                }
            }

            if (self.settings.getIMDBMetaDataOnly) {
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
        if (self.settings.skipPBUpdate) {
            self.proc('skipPBUpdate', 'skip it')
            self.chain.nextLink();
            return;
        }
        //asdf.g
        //   asdf.g
        //call the program
        var filePB = '../../distillerv3/utils/JSONSet/JSONSetRunner_AddPbToList.js'
        //
        var r = require('./' + filePB)

        if (self.data.filename == null) {
            self.data.filename = self.data.fileOutputDlList
        }
        var skipAll = false;
        //skipAll = true; //to reset imdb info asdf.g bookmark.rest ites

        self.proc('what is file', self.data.filename)
        //return;

        r.addToFile(
            {
                fileInput: self.data.filename,
                fxDone: function onFinishedConvert(file, itP) {
                    //asdf.g
                    //asdf.g
                    self.proc('output of the list ', file)

                    self.proc('file is out in', self.data.fileOutputDlMagsList)
                    sh.fs.copy(file, self.data.fileOutputDlMagsList, true);

                    sh.log.file(file)
                    //
                    //asdf.f
                    //asdf.g
                    self.chain.cb();
                    //process.exit();
                    //asdf.g
                },
                itSettings: {
                    minRating: 6.0
                }
            }
            , skipAll)
        //self.chain.cb()
    }


    p.step3_postProcessList = function step3_postProcessList() {
        var index = 0;
        var dictIds = {};
        var dictSeriesNamesWithIds = {};
        var skippedCount = 0;
        var missingNames = [];
        var namesFound = [];
        console.log('type', self.settings)
        if (self.settings.urlList != null && sh.fs.exists(self.data.fileOutputDlMagsList) == false) {
            self.proc('wanring, this one failed .... so ... aborting ...', self.data.fileOutputDlMagsList)

            sh.callIfDefined(self.settings.fxDone, 'missingfile', self)
            return;
        }

        sh.fs.exists(self.data.fileOutputDlMagsList, 'could not find the mag output file')
        //sh.exit('what is the list sent', listZ)
        var jsonDLManifestItems = sh.readJSONFile(self.data.fileOutputDlMagsList)
        var totalSize = 0;

        var fileContents = [];
        sh.each(jsonDLManifestItems, function removeDuplicates(k, item) {
            var match = dictIds[item.imdb_id];
            if (item.urlTorrentNotFound) {
                missingNames.push(item.title + ' | ' + item.name)
            } else {
                namesFound.push(item.title + ' | ' + item.name)
            }
            if (match) {
                var isDupe = true;
                if (item.series) { //tv shows can have same id, but must have differetn name
                    if (item.name == null) {
                        sh.throw('what is name null, is this skip?')
                    }
                    var keyInSeries = item.imdb_id + '_' + item.name
                    var existing = dictSeriesNamesWithIds[keyInSeries]
                    if (existing == null) {
                        dictSeriesNamesWithIds[keyInSeries] = item
                        isDupe = false
                    }
                }
                if (isDupe) {
                    //console.log('skipped', item.name)
                    item.filteredDupe = true
                    item.filteredDupeReason = 'imdb the same'
                    skippedCount++
                    return;
                }
            }
            dictIds[item.imdb_id] = item;
            fileContents.push(item)
            index++;
            item.genIndex = index;
            if (item.size)
                totalSize += item.size;


        })
        self.data.fileContents = fileContents;

        self.data.fileOutputDlMagsList_DupeFiltered3 = self.data.fileOutputDlMagsList + '.dupe.filtered3.json'
        sh.writeJSONFile(self.data.fileOutputDlMagsList_DupeFiltered3, jsonDLManifestItems)
        self.proc('processed list', ' x items', index, 'skipped', skippedCount, sh.percent(skippedCount / jsonDLManifestItems.length))
        self.proc('at processed list', ' skipped dupe id items here-->', self.data.fileOutputDlMagsList_DupeFiltered3)
        sh.log.file(self.data.fileOutputDlMagsList_DupeFiltered3)


        self.data.fileOutputDlMagsList_missing = self.data.fileOutputDlMagsList + '.missing.json'
        sh.writeJSONFile(self.data.fileOutputDlMagsList_missing, missingNames)
        self.data.fileOutputDlMagsList_missing = self.data.fileOutputDlMagsList + '.namesFound.json'
        sh.writeJSONFile(self.data.fileOutputDlMagsList_missing, namesFound)


        self.proc('totalSize', totalSize);

        //seasons
        self.chain.cb()
        //sh.callIfDefined(self.settings.fxDone)
    }
    p.step4_moveOutputFileToProject = function step4_moveOutputFileToProject() {

        var fileOutput = self.data.fileOutputDlMagsList
        if (self.settings.nameOfOutput) {
            var fileName = fileOutput.replace('/mags/', '/dlListsWrapC/')
            var dirFileOutput = sh.getPath(fileName);

            sh.fs.mkdirp(dirFileOutput)
            fileName = dirFileOutput + '/' + self.settings.nameOfOutput + '.json';

            self.proc('---', fileName, dirFileOutput, fileOutput)
            //var content = sh.toJSONString(self.data.fileContent); //paste deduplicated content
            sh.writeJSONFile(fileName, self.data.fileContents)

            self.settings.fileOutputDlMagsListOrig =
                self.settings.fileOutputDlMagsList;

            self.settings.fileOutputDlMagsList = fileName;
            self.proc('changing name to', fileName, self.settings.fileOutputDlMagsListOrig)
            //sh.callIfDefined(fxDone, fileName);
        } else {
            self.proc('changing name to-->', fileOutput, self.settings.fileOutputDlMagsListOrig)

        }


        //sh.log.file(__filename)

        // sh.log.file(__dirname)
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
            var file = self.settings.dir + '/' + file;
            return file;
        }


        p.utils.getListId = function listId(idUrlOrLsMissing) {

            if (idUrlOrLsMissing.includes('?')) {
                idUrlOrLsMissing = idUrlOrLsMissing.split('?')[0]
            }
            if (idUrlOrLsMissing.startsWith('ls')) {
                return idUrlOrLsMissing
            }
            if (sh.isNumber(idUrlOrLsMissing)) {
                return 'ls' + idUrlOrLsMissing;
            }

            if (idUrlOrLsMissing.includes('/list/')) {
                idUrlOrLsMissing = idUrlOrLsMissing.split('/list/')[1];

                idUrlOrLsMissing = idUrlOrLsMissing.split('/').join('')
                return idUrlOrLsMissing
            }

            sh.throw('bad input', idUrlOrLsMissing, 'could not make a listid out of this')
            return null

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

exports.ConvertXToIMDB_PB_List = ConvertXToIMDB_PB_List;


ConvertXToIMDB_PB_List.downloadLists = function downloadLists(listIdsInput, skipIfListExists,
                                                              nameOfOutput, fxDone) {

    // asdf.g
    if (sh.isArray(listIdsInput) == false) {
        sh.throw('what array length')
        return;
    }
    var listIds = []

    global.ignoreDupesIMDBPB = sh.newDict();
    global.cacheEpisodesInJSFile = true;
    global.JSONSetNoEndIt = true
//asd.g
    sh.each(listIdsInput, function onConvertIdIntoUrl(k, listId) {
        var url = listId;
        console.log('onConvertIdIntoUrl', listId)
        if (listId.startsWith('http://')) {

        } else {
            url = 'http://www.imdb.com/list/' + listId;
        }
        listIds.push(url);
    })


    // sh.exit('listIds', listIds.length, listIds)

    var cfg = {};
    var files = [];

    cfg.files = files;

    sh.async(listIds, function onDownloadList(urlList, cb) {
            var instance = new ConvertXToIMDB_PB_List();
            var config = {};
            config.fxDone = function onDoneWithList(list) {
                files.push(list)
                setTimeout(function onSkip_to_breakStack() {
                    cb();
                }, 200)
                //cb()
            };
            config.urlList = urlList;
            config.skipIfListExists = skipIfListExists;
            instance.init(config)
            instance.test();
            //files.push(instance)

        },
        function onDone_CombineInto1DlList() {
            var fileContent = [];
            var fileContentCol = [];

            var aFile = '';
            console.log('yyy', files)
            var index = 0;
            var dictIds = {};
            var skippedCount = 0
            var sizeAfterFiltered = 0;
            var columnify = require('columnify')
            sh.each(files, function joinAllFiles(k, file) {
                aFile = file;
                if (file == 'missingfile') {
                    console.log('missing file....')
                    return;
                }
                var json = sh.readJSONFile(file)
                sh.each(json, function addItem(k, item) {

                    var key = item.imdb_id;
                    if (item.series) {
                        key += '_series_' + item.name
                    }

                    var match = dictIds[key]
                    if (match) {
                        //console.log('skipped', item.name)
                        skippedCount++
                        return;
                    }
                    if (item.size) {
                        item.size = parseFloat(parseFloat(item.size).toFixed(2))
                        sizeAfterFiltered += item.size;
                    }
                    dictIds[key] = item;
                    fileContent.push(item)
                    index++;
                    item.genIndex = index;

                    var props = ['title', 'imdb_id', 'year', 'series', 'name', 'size', 'nameTorrent'];
                    var newItem = {};
                    newItem.title = 'first'
                    newItem.name = ' '
                    /*  if ( item.size == null ) {
                     newItem.listName = item.name
                     }*/
                    var clonedItem = sh.copyProps(item, newItem, props);
                    if (item.urlTorrentNotFound) {
                        clonedItem.query = item.query
                    }
                    if (clonedItem.title == null) {
                        clonedItem.title = ''
                    }
                    if (newItem.title == newItem.name) {
                        newItem.name = ' '
                    }
                    fileContentCol.push(clonedItem)
                })

            });


            console.log('final size', sizeAfterFiltered)
            console.log('asdf length of listWr', index, skippedCount)

            if (nameOfOutput) {
                var fileName = aFile.replace('/mags/', '/dlListsWrapC/')
                var dirFileOutput = sh.getPath(fileName);

                sh.fs.mkdirp(dirFileOutput)
                fileName = dirFileOutput + '/' + nameOfOutput + '.json';

                var content = sh.toJSONString(fileContent);
                sh.writeJSONFile(fileName, fileContent)

                sh.sortByName(fileContentCol, 'title', 'name')
                var columns = columnify(fileContentCol);
                // if ( self.settings. showAllItemsAtEnd)
                //console.log(columns)
                var fileCSV = fileName + '.col.csv';
                sh.writeFile(fileCSV, columns)
                sh.log.file(fileCSV)
                sh.callIfDefined(fxDone, fileName);
            }
            //asdf.g
            //C:\Users\user1\Dropbox\projects\crypto\ritv\distillerv3\utils\JSONSet\TaskContentLists_CombineFilesInOuputDir.js
        })


    return cfg
}


ConvertXToIMDB_PB_List.downloadIds = function downloadIds(ttList, skipIfListExists,
                                                          nameOfOutput, fxDone) {

    var instance = new ConvertXToIMDB_PB_List();
    var config = {};
    config.fxDone = function onDoneWithList(list) {
        onDone_CombineInto1DlList(list)
    };
    config.fileOutput = nameOfOutput;
    var dirFiles = sh.fs.join('list_v3_ids')
    sh.fs.mkdirp(dirFiles)
    config.fileOutput = sh.fs.join(dirFiles, nameOfOutput);
    if (config.fileOutput.includes('.json') == false) {
        config.fileOutput += '.json'
    }
    config.ttList = ttList;

    config.skipIfListExists = skipIfListExists;
    instance.init(config)
    instance.test();

    function onDone_CombineInto1DlList(listZ) {
        var fileContent = [];
        var aFile = '';
        aFile = listZ;
        var index = 0;
        var dictIds = {};
        var skippedCount = 0;

        sh.fs.exists(listZ, 'could not find the mag output file')

        //sh.exit('what is the list sent', listZ)
        var json = sh.readJSONFile(listZ)
        sh.each(json, function addItem(k, item) {
            var match = dictIds[item.imdb_id];
            if (match) {
                //console.log('skipped', item.name)
                skippedCount++
                return;
            }
            dictIds[item.imdb_id] = item;
            fileContent.push(item)
            index++;
            item.genIndex = index;
        })

        console.log('asdf length of listWr', index, skippedCount, listZ)

        if (nameOfOutput) {
            var fileName = aFile.replace('/mags/', '/dlListsWrapC/')
            var dirFileOutput = sh.getPath(fileName);

            sh.fs.mkdirp(dirFileOutput)
            fileName = dirFileOutput + '/' + nameOfOutput + '.json';

            var content = sh.toJSONString(fileContent);
            sh.writeJSONFile(fileName, fileContent)
            console.log('fileName listWr', fileName)
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
    if (config.fileOutput.includes('.json') == false) {
        config.fileOutput += '.json'
    }
    config.dlConfig = dlConfig;

    console.log('thing', dlConfig)
    //sh.exit()
    config.skipIfListExists = skipIfListExists;
    config.nameOfOutput = nameOfOutput;

    dlConfig.year = parseInt(dlConfig.year);
    if (dlConfig.yearStart) {
        console.log('need year start')
        dlConfig.year = parseInt(dlConfig.yearStart);
    }
    dlConfig.yearEnd = parseInt(dlConfig.yearEnd);

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

        p.onDlLists = function onDlLists() {
            var skipIfListExists = true;
            //skipIfListExists= false;
            var fileOutputName = 'outputTo87_onDlLists_XTest'
            var list = [
                'ls070079493',
                'ls070079493',
                'ls076560573',
                //'http://www.imdb.com/list/ls070079493/',
                //'070435844',
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

            list = ['ls079202726', 'ls070079493']
            fileOutputName = 'outputTo87_onDlLists_XTestB'
            //  list = ['ls055731784', 'ls076560573', 'ls076560573']

            ConvertXToIMDB_PB_List.downloadLists(list,
                skipIfListExists, fileOutputName,
                function onSaved(file) {
                    console.log(file, '...')
                    sh.log.file(file)
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


        p.getMetaFromUrl = function getMetaFromUrl() {
            var skipIfListExists = false;
            skipIfListExists = true
            // var fileOutputName = 'bestMovies-1994-1996-5'
            var dlConfig = {
                "contentType": "tv",
                "type": "tv",
                "maxImdbListSize": 100,
                "sortType": "Popularity",
                //"yearStart": "1994",
                //"yearEnd": "2017",
                // "years": "1994,555555",
                //"yearEnd": "2017",
                "cmd": "listids",
                "wrapType": "imdbSearch",
                "listIds": [],
                "taskName": "imdbSearch_top_tv.json"
            }

            //var dlConfig = {}
            dlConfig.year = 2017;
            dlConfig.yearEnd = 2017;
            dlConfig.years = 'were2017';
            dlConfig.maxImdbListSize = null
            //   dlConfig.maxImdbListSize = 5
            //  dlConfig.type = "movies"

            var fileOutputName = dlConfig.taskName
            fileOutputName = 'top250-show-manual';
            var imdbAppConfig = ConvertXToIMDB_PB_List.createIMDBList_fromSearch(dlConfig,
                skipIfListExists, fileOutputName,
                function onSaved(file) {
                    console.log('onDlConfig', file, '...')
                    sh.log.file(file)
                    //asdf.g
                })
            // imdbAppConfig.getIMDBMetaDataOnly = true;
            //imdbAppConfig.skipIfListExists = true;
            // imdbAppConfig.skipFirstFile = 'g:\\Dropbox\\projects\\crypto\\ritv\\imdb_movie_scraper\\IMDB_App_Output/tv_top_250_2017_2017_rating.json.bak'
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

    function onTest() {
        var instance = new ImdbRipFinalTester();
        var config = {};
        instance.init(config)
        instance.onDlLists();

        //return;
        // instance.getMetaFromSearchParameters();
        // instance.getMetaFromSearchParameters_Movies();
        //instance.getMetaFromSearchParameters_RCE();
        //instance.getMetaFromUrl();
    }

    onTest();

}
 