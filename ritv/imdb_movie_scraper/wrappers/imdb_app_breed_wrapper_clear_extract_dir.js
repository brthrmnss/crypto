/**
 * Created by user on 7/24/15.
 */

/*
 Breeds + stops when zip files messed up
 */

var runWrapper = require('./imdb_app_breed_wrapper').runWrapper;
var sh = require('shelpers').shelpers;




if ( module.parent == null ) {

    runWrapper(function modifyConfig(imdb2MegaConfig) {
        imdb2MegaConfig.breedConfigOverrides.removeOldExtractionDirs = true; 
    });

    //  i.breed(imdb2MegaConfig);
}