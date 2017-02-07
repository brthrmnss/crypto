/**
 * Created by user on 7/4/15.
 */
/**
 why: same as prev
 check the directfile
 */
var SanitizeNamesFromDB = require('./SanitizeNamesFromDB').SanitizeNamesFromDB;

var shelpers = require('shelpers');
var sh = shelpers.shelpers;
/*
 var shelpers = require('shelpers');
 var sh = shelpers.shelpers;
 var imdb_api_get_content = sh.fs.resolve(__dirname + '/' + '../../../imdb_api_get_content.js');
 var path = sh.fs.resolve(imdb_api_get_content);
 console.log('path', path )
 var imdb_api_get_content = require(imdb_api_get_content).imdb_api_get_content
 */

//var rh = require('ritvHelpers')


var ritvConfigHelper = require('ritvHelpers');
var defaultConfig = ritvConfigHelper.ritvHelpers.getConfig();

defaultConfig.imdb_app_breed.directDownloadFile ;
var imdb_api_get_content = sh.fs.resolve(__dirname + '/' + '../../../imdb_movie_scraper/' + defaultConfig.imdb_app_breed.directDownloadFile );
var path = sh.fs.resolve(imdb_api_get_content);

console.log(path)
path = 'G:/Dropbox/projects/crypto/ritv/distillerv3/utils/JSONSet/output/tv_series_top_250_num_votes,desc_1994,2017.json.dl.list-dl.so.far.json'
path = 'G:/Dropbox/projects/crypto/mp/RCExt/testData/listIds_ls051393312.json'
console.log("G:/Dropbox/projects/crypto/ritv/imdb_movie_scraper/IMDB_App_Output/tv_series_top_250_num_votes,desc_1994,2017.json")


var file = sh.readJSONFile(path)


if ( module.parent == null ) {

    var i = new SanitizeNamesFromDB();
    i.init();
    //i.testMode();
    // i.iterateOverFiles_InMega();
    // i.iterateOverFiles();
    i.settings.maxFiles = null
    i.settings.logging = true
    i.settings.mode2 = true;
    //i.settings.maxComparisons = 100
    var collect = file.map(function (x ) { return x.imdb_id})
    var imdbIds = []
    if ( i.settings.mode2 == true ) {
        sh.each(file, function addId(i, imdb) {
            if ( imdb.skip ) {
                return;
            }
            if ( imdb.urlTorrentNotFound == true )
                return;
            var query = imdb;
            query.imdb_id= imdb.imdb_id
            if ( imdb.series) {
                asdf.g
                query.seasonNumber = imdb.query.split(' ').slice(-1)[0]
            }
            if ( imdb.seasonNumber) {
                query.seasonNumber = imdb.seasonNumber;
            }
            query.query = imdb.query

    
            console.log(imdb.name, query.imdb_id)
            imdbIds.push(query)
        })
    } else {
        sh.each(file, function addId(i, imdb) {
            var imdbId = imdb.imdb_id
            if ( imdbIds.indexOf(imdbId) != -1 ) {
                return;
            }
            if ( imdb.urlTorrentNotFound == true )
                return;

            console.log(imdb.name, imdbId)
            imdbIds.push(imdbId)
        })
    }

    i.compareDB(imdbIds)
    //i.tests.testSaveNewMovie();

}
