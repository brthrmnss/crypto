/**
 * Created by user on 7/4/15.
 */
/**
why: look at mega files
 import into database
 see what portion of database we have in mega
 ... does not reguire queries to run ... ?

 */
//var rh = require('rhelpers')
var SanitizeNamesFromDB = require('./SanitizeNamesFromDB').SanitizeNamesFromDB;




if ( module.parent == null ) {

    var i = new SanitizeNamesFromDB();
    i.init();
    //i.testMode();
   // i.iterateOverFiles_InMega();
   // i.iterateOverFiles();
    i.settings.maxFiles = null
    i.settings.logging = true
    i.compareDB()
    //i.tests.testSaveNewMovie();

}
