var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var JSONSetRunner = require('./JSONSetRunner').JSONSetRunner;


if (module.parent == null) {
    var fileInput = 'G:/Dropbox/projects/crypto/ritv/imdb_movie_scraper/IMDB_App_Output/tv_series_top_250_num_votes,desc_1994,2017.json.dl.json.filtered.json';
    var fileIterator = 'G:/Dropbox/projects/crypto/ritv/distillerv3/utils/JSONSet/JSONSetIteratorPb.js'
    JSONSetRunner.runSet(fileInput, fileIterator, {filter:false})


    
  //  return;
    var fileInput = 'G:/Dropbox/projects/crypto/ritv/imdb_movie_scraper/IMDB_App_Output/tv_series_top_250_num_votes,desc_1994,2017.json.dl.json.filtered.json';
    var fileIterator = 'G:/Dropbox/projects/crypto/ritv/distillerv3/utils/JSONSet/JSONSetIteratorPbSize.js'
   // JSONSetRunner.runSet(fileInput, fileIterator, {inputIsOutput_doesNotFilter:true})
    //JSONSetRunner.runSet(fileInput, fileIterator, {filter:false})

}



