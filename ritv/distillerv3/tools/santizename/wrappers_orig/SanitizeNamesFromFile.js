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
var SanitizeNamesFromDB = require('./../SanitizeNamesFromDB').SanitizeNamesFromDB;




if ( module.parent == null ) {

    var i = new SanitizeNamesFromDB();
  //  i.settings.logging = true;
    i.init();
    //i.settings.fileFilter = 'South Park'
   // i.settings.fileFilter = 'Game of'
    //i.testMode();
    //i.settings.offset = 500;
    //i.settings.maxLength = 1000;

 //   i.settings.maxLength = 100;
    //i.settings.fileFilter = 'Mr. Robot'
    //i.settings.fileFilter = 'Breaking Bad Season 2 Complete'
     //i.settings.fileFilter = 'revenge_2011/tt1837642/revenge_season_1'
   // i.settings.fileFilter = '[hdtv-480p]-msd/revenge.s01e01.480p.hdtv.x264-msd.mkv'
     //i.settings.fileFilter = 'bleach'

    i.settings.getIMDBShowInformation = false;
    i.iterateOverFiles_InMega();
  //  i.iterateOverFiles();

    //i.tests.testSaveNewMovie();

}
