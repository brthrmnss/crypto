/**
 * Created by user on 7/24/15.
 */

/*
 Downloads the file from imdb_app_breed
 why: downloads a pre-compiled download list.
 */

var ritvConfigHelper = require('ritvHelpers');
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


        imdb2MegaConfig.fxDone = function onDoneGettingList(filename) {
            self.data.filename = filename;
            self.chain.cb();
        }
        imdb2MegaConfig.configRipper = {};
        imdb2MegaConfig.configRipper.minRating = 6;
        // imdb2MegaConfig['dl.imdb.shqorten.list.to.2.items'] = true;
        i.loadConfig(imdb2MegaConfig, cfg);

        // self.chain.cb()
    }


    p.step2_processDlList = function step2_processDlList(config) {
        //call the program
        var y = '../../distillerv3/utils/JSONSet/JSONSetRunner_AddPbToList.js'
        //
        var r = require('./'+y)

        var skipAll = false;
        //skipAll = true;

        r.addToFile(
            {
                fileInput: self.data.filename,
                fxDone: function onFinishedConvert() {
                    self.chain.cb();
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
        sh.callIfDefined(self.settings.fxDone)
    }
    p.step4_combineAllLIsts_Into_1List = function step4_combineAllLIsts_Into_1List(config) {
        //G:\Dropbox\projects\crypto\ritv\distillerv3\utils\JSONSet\TaskContentLists_CombineFilesInOuputDir.js
        self.chain.cb()
        sh.callIfDefined(self.settings.fxDone)
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

if (module.parent == null) {
    /*
     var instance = new IMDBOnlyDL();
     var config = {};
     instance.init(config)
     instance.test();


     */


    var y =  [
        'http://www.imdb.com/list/ls070079493/',
        'http://www.imdb.com/list/ls070435844/',
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

   /* y = [
        //'http://www.imdb.com/list/ls057704895/',
       // 'http://www.imdb.com/list/ls059288416/'
        'http://www.imdb.com/list/ls051508539/'
    ]*/

    sh.async(y, function ondoThing(urlList,cb){
        var instance = new IMDBOnlyDL();
        var config = {};
        config.fxDone = cb;
        config.urlList = urlList;
        instance.init(config)
        instance.test();

    }, function onDone_CombineInto1DlList() {
        asdf.g
        //C:\Users\user1\Dropbox\projects\crypto\ritv\distillerv3\utils\JSONSet\TaskContentLists_CombineFilesInOuputDir.js
    })



}






if ( module.parent == null ) {

    // runWrapper();

    //  i.breed(imdb2MegaConfig);
}