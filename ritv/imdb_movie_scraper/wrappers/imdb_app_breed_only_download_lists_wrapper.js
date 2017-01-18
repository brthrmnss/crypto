/**
 * Created by user on 7/24/15.
 */

/*
 Downloads the file from imdb_app_breed
 why: downloads a pre-compiled download list.
 */

var ritvConfigHelper = require('ritvHelpers');
var rh = ritvConfigHelper.ritvHelpers.ritvHelper//.RitvHelper
var imdb_dl_app = require('./../imdb_dl_app').imdb_dl_app;
var sh = require('shelpers').shelpers;


function runWrapper(mixinConfig){






}

exports.runWrapper = runWrapper;


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var PromiseHelperV3 = shelpers.PromiseHelperV3;

function IMDBOnlyDL() {
    var p = IMDBOnlyDL.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;

        self.method();
    }

    p.method = function method() {
        var chain = new PromiseHelperV3();
        var token = {};
        token.silentToken = true
        chain.wait = token.simulate == false;
        chain.startChain(token)
        chain.add(self.step1_processInput)
        chain.add(self.step2_processDlList)
        chain.add(self.step3_convertIMDBList_2_DlList)
        chain.add(self.step4_combineAllLIsts_Into_1List);
        self.chain = chain;
    }

    p.step1_processInput = function step1_processInput() {
        //content list


        //g:\Dropbox\projects\crypto\ritv\imdb_movie_scraper/IMDB_App_Output/Movies_with_Aliens_ls070079493.json
        self.data.fileOutputDlList = '';



        self.utils.getListId = function listId(idUrlOrLsMissing) {

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
        var listId = self.utils.getListId(self.settings.urlList);

        self.data.fileOutputDlList = rh.getRVDir('imdb_movie_scraper/IMDB_App_Output/',listId+'.json');
        self.data.fileOutputDlMagsList = rh.getRVDir('imdb_movie_scraper/IMDB_App_Output/mags/',listId+'.json');

        if ( self.settings.skipIfListExists ) {
            if ( sh.fs.exists(self.data.fileOutputDlMagsList)) {
                self.proc('found existing file for ', listId)
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

        imdb2MegaConfig.urlList =  'http://www.imdb.com/list/ls056187945/'
        imdb2MegaConfig.urlList =  'http://www.imdb.com/list/ls004841913/'


        imdb2MegaConfig.urlList = 'http://www.imdb.com/list/ls051587623/?start=1&view=detail&sort=user_rating:desc';


        if ( self.settings.urlList != null ) {
            imdb2MegaConfig.urlList = self.settings.urlList;
        }



        self.data.calledTimes = 0;

        imdb2MegaConfig.fxDone = function onDoneGettingList(filename) {
            self.data.filename = filename;
            console.log('filename', filename)

            self.data.calledTimes++;
            if ( self.data.calledTimes != 2) {
                return;
            }
            self.chain.cb();
        }
        imdb2MegaConfig.configRipper = {};
        imdb2MegaConfig.configRipper.minRating = 6;
        // imdb2MegaConfig['dl.imdb.shqorten.list.to.2.items'] = true;
        i.loadConfig(imdb2MegaConfig, cfg);

        // self.chain.cb()
    }


    p.step2_processDlList = function step2_processDlList(config) {
        if ( self.data.skipToDl ) {
            self.chain.nextLink();
            return;
        }
     //   asdf.g
        //call the program
        var y = '../../distillerv3/utils/JSONSet/JSONSetRunner_AddPbToList.js'
        //
        var r = require('./'+y)

        var skipAll = false;
        //skipAll = true;

        r.addToFile(
            {
                fileInput: self.data.filename,
                fxDone: function onFinishedConvert(file, itP) {
                    //asdf.g
                    sh.fs.copy(file, self.data.fileOutputDlMagsList, true);
                    //
                    self.proc('file is out in', self.data.fileOutputDlMagsList)

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


    p.step3_convertIMDBList_2_DlList = function step3_convertIMDBList_2_DlList(config) {
        //seasons
        self.chain.cb()
        //sh.callIfDefined(self.settings.fxDone)
    }
    p.step4_combineAllLIsts_Into_1List = function step4_combineAllLIsts_Into_1List(config) {
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

        p.proc = function debugLogger() {
            if ( self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }
    defineUtils()
}

exports.IMDBOnlyDL = IMDBOnlyDL;


IMDBOnlyDL.testDownload = function testDownload(listIdsInput, skipIfListExists,
                                                nameOfOutput, fxDone) {


    /* y = [
     //'http://www.imdb.com/list/ls057704895/',
     // 'http://www.imdb.com/list/ls059288416/'
     'http://www.imdb.com/list/ls051508539/'
     ]*/

    var listIds  =[]

    sh.each(listIdsInput, function onConvertIdIntoUrl(k,listId) {
        var url = listId;
        if ( listId.startsWith('http://')) {

        } else {
            url = 'http://www.imdb.com/list/'+listId;
        }
        listIds.push(listId);
    })



    var files = [];
    sh.async(listIds, function onDownloadList(urlList,cb){
        var instance = new IMDBOnlyDL();
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

if (module.parent == null) {



    var skipIfListExists = true;
    var list =  [
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
    //list = list.slice(0,3)
    IMDBOnlyDL.testDownload(list, skipIfListExists, 'outputTo87', function onSaved(file) {
        console.log(file, '...')
    })
    /*
     var instance = new IMDBOnlyDL();
     var config = {};
     instance.init(config)
     instance.test();


     */




}
 