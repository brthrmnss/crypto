/**
 * Created by user on 7/24/15.
 */

/*
 Breeds + stops when zip files messed up
 */

var runWrapper = require('./imdb_app_breed_wrapper').runWrapper;
var sh = require('shelpers').shelpers;




if ( module.parent == null ) {

    runWrapper(function modifyConfig(imdb2MegaConfig, config) {
        //imdb2MegaConfig.breedConfigOverrides.removeOldExtractionDirs = true;
        imdb2MegaConfig.breedConfigOverrides.directDownloadFile =
            '../distillerv3/utils/JSONSet/all.json';
        imdb2MegaConfig.breedConfigOverrides.directDownloadFile =
            '../distillerv3/utils/JSONSet/all.json';
        imdb2MegaConfig.directDownloadFile =
            '../distillerv3/utils/JSONSet/all.json';
        config.imdb_app_breed.directDownloadFile =
            '../distillerv3/utils/JSONSet/all.json';
      //  config.imdb_app_breed.concurrency = 4;
       // config.concurrency = 4;
        imdb2MegaConfig.breedConfigOverrides.concurrency = 4;
       // imdb2MegaConfig.concurrency = 4;
      //  directDownloadFile
      //  imdb_app_breed_wrapper_clear_extract_dir.js
    });

    //  i.breed(imdb2MegaConfig);
}