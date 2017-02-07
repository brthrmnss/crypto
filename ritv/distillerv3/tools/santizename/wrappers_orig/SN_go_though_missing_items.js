/**
 * Created by user on 7/4/15.
 */
/**
why: same as prev
 loads failed files from file
 */
var SanitizeNamesFromDB = require('./../SanitizeNamesFromDB').SanitizeNamesFromDB;

var shelpers = require('shelpers');
var sh = shelpers.shelpers;



var ritvConfigHelper = require('ritvHelpers');
var defaultConfig = ritvConfigHelper.ritvHelpers.getConfig();

defaultConfig.imdb_app_breed.directDownloadFile ;
var fileMissingFiles = sh.fs.resolve(__dirname + '/' + 'output/'+ 'missing files-ex.json');
var path = sh.fs.resolve(fileMissingFiles);

console.log(path)

var file = sh.readJSONFile(path)


if ( module.parent == null ) {

    var i = new SanitizeNamesFromDB();
    i.init();
    //i.testMode();
   // i.iterateOverFiles_InMega();
   // i.iterateOverFiles();
    i.settings.maxFiles = null
    i.settings.logging = true
 
    i.settings.setCount = 20
    i.compareFileRaw(file)
    //i.tests.testSaveNewMovie();

}
