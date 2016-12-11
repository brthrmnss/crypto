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

if ( module.parent == null ) {
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
    
    if ( imdb2MegaConfig.directDownloadFile == null ) {
        throw new Error('need a file to download ' +  'config.imdb_app_breed.directDownloadFile' )
    }

    imdb2MegaConfig.breedConfigOverrides.innerSettingsMixin.downloadsSimulate = true;
    //imdb2MegaConfig.breedConfigOverrides.innerSettingsMixin.downloadsSimulate = false;
    imdb2MegaConfig.breedConfigOverrides.innerSettingsMixin.fail_GetJSONLink = true;
    //imdb2MegaConfig.breedConfigOverrides.innerSettingsMixin.skipExistingDirCheck = true;
    //imdb2MegaConfig.breedConfigOverrides.innerSettingsMixin.skipExistingDirCheck = true;
    imdb2MegaConfig.breedConfigOverrides.innerSettingsMixin.skipDirSizeCheck = false;
    //imdb2MegaConfig.breedConfigOverrides.innerSettingsMixin.filterQuery = 'true blood';


    //imdb2MegaConfig.breedConfigOverrides.innerSettingsMixin.stopOnFirstOne = true; //improving this features

    // imdb2MegaConfig.breedConfigOverrides.innerSettingsMixin.canSkipBasedOnStep2Cookie = false; //do dir size check

    //imdb2MegaConfig.breedConfigOverrides.innerSettingsMixin.skipExistingDirCheck = true;

    imdb2MegaConfig.breedConfigOverrides.innerSettingsMixin.minFreeSpaceGB = 0.1;
    imdb2MegaConfig.breedConfigOverrides.innerSettingsMixin.ignoreCookies = true; //improving this features


    //imdb_app
    var i = new imdb_dl_app();
    i.loadConfig(imdb2MegaConfig);

  //  i.breed(imdb2MegaConfig);
}