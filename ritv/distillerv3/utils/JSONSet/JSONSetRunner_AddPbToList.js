var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var JSONSetRunner = require('./JSONSetRunner').JSONSetRunner;



function addContentToJSONFile(cfg, fxDone, skipAll) {
    if ( sh.isObject(cfg) == false ) {
        var fileInput = cfg
        cfg = {};
        cfg.fileInput = fileInput;
        cfg.fxDone = fxDone;
        cfg.skipAll = skipAll;
    }

    cfg.filter = sh.dv(cfg.filter, false);
    cfg.fxDone = sh.dv(cfg.fxDone, fxDone);
    cfg.skipAll = sh.dv(cfg.skipAll, skipAll);

    var defaultFileInputForTesting = 'G:/Dropbox/projects/crypto/ritv/distillerv3/utils/JSONSet/output/tv_series_top_250_num_votes,desc_1994,2017.json'
    if ( cfg.fileInput == null  ) {
        cfg.fileInput = defaultFileInputForTesting;
    }
    if ( cfg.fileIterator == null ) {
        var fileIterator = 'G:/Dropbox/projects/crypto/ritv/distillerv3/utils/JSONSet/JSONSetIteratorPb2.js'
        cfg.fileIterator = fileIterator;
    }


    JSONSetRunner.runSet(
        cfg.fileInput,
        cfg.fileIterator,
        cfg
    )

}

function addContentToJSONFileXY(_fileInput, fxDone, skipAll) {
    var fileInput = 'G:/Dropbox/projects/crypto/ritv/distillerv3/utils/JSONSet/output/tv_series_top_250_num_votes,desc_1994,2017.json'
    if ( _fileInput ) {
        fileInput = _fileInput;
    }
    var fileIterator = 'G:/Dropbox/projects/crypto/ritv/distillerv3/utils/JSONSet/JSONSetIteratorPb2.js'
    JSONSetRunner.runSet(fileInput, fileIterator,
        {
            filter:false,
            skipAll:skipAll,
            fxDone:fxDone
        }
    )

}

exports.addToFile = addContentToJSONFile;


if (module.parent == null) {
    addContentToJSONFile()//

    /*
     var fileInput = 'G:/Dropbox/projects/crypto/ritv/distillerv3/utils/JSONSet/output/tv_series_top_250_num_votes,desc_1994,2017.json'
     var fileIterator = 'G:/Dropbox/projects/crypto/ritv/distillerv3/utils/JSONSet/JSONSetIteratorPb2.js'
     JSONSetRunner.runSet(fileInput, fileIterator, {filter:false})

     return;
     var fileIterator = 'G:/Dropbox/projects/crypto/ritv/distillerv3/utils/JSONSet/JSONSetIteratorPbSize.js'
     JSONSetRunner.runSet(fileInput, fileIterator, {inputIsOutput_doesNotFilter:true})
     ////JSONSetRunner.runSet(fileInput, fileIterator, {filter:false})
     */
}



