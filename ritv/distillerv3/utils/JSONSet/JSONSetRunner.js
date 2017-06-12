var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');
var JSONSet = require('./JSONSet').JSONSet;
var SchedulerX = require('./SchedulerX').SchedulerX;
var JSONSetRunner = {};






exports.JSONSetRunner = JSONSetRunner;

exports.JSONSetRunner.runSetDir = function runSet(fileInput, dirIterators, cfg ) {
    dirIterators =  sh.fs.resolve(dirIterators);
    var files = sh.fs.getFilesInDirectory2(dirIterators);
    sh.each(files, function processEachFile(k,file) {
        var cfg = {};
        if ( k == 0 ) {
            cfg.resetList = true;
        } else {
            cfg.announce = false; //prevent needless messages from cluttering stack
        }
        JSONSetRunner.runSet(fileInput, file, cfg);
    })


}

exports.JSONSetRunner.runSet = function runSet(fileInput, fileIterator, cfg ){
    //sh.throwErrorIfFileNotFound(fileIterator, 'need an iterator')
    if ( JSONSetRunner.sch == null) {
        JSONSetRunner.sch = new SchedulerX();
        JSONSetRunner.sch.init(); 
    }
    var active = JSONSetRunner.active
    
    var instance = new JSONSet();
    var config = sh.dv(cfg, {})
    config.fileInput    =   fileInput;
    config.fileIterator =   fileIterator;


   /* if ( active == null ){
        JSONSetRunner.active = instance; 
    }
    config.fxDone = function goToNext() {
        var y = JSONSetRunner.items
    }
    instance.init(config);*/
    
    
    function runTask() {

        var fxDoneOriginal = cfg.fxDone; 
        console.error('running JSONSetRunner')
        function finishedTask() {
            console.error('JSONSetRunnerFinished done')
            console.error('JSONSetRunnerFinished arguments', arguments)
            JSONSetRunner.sch.nextTask();
            var args = sh.convertArgumentsToArray(arguments)
            sh.callIfDefined2(fxDoneOriginal, arguments)
            //sh.callIfDefined(fxDoneOriginal, args)
            
        }
        config.fxDone = finishedTask;
        
        setTimeout(function delayIt() {
            instance.init(config);
        }, 0)

    }

    JSONSetRunner.sch.addTask(runTask)

}






if (module.parent == null) {
    var fileInput = 'G:/Dropbox/projects/crypto/ritv/imdb_movie_scraper/IMDB_App_Output/tv_series_top_250_num_votes,desc_1994,2017.json.dl.json.filtered.json';
    var fileIterator = 'G:/Dropbox/projects/crypto/ritv/distillerv3/utils/JSONSet/JSONSetIteratorTest.js'
    exports.runSet(fileInput, fileIterator, {filter:false})
}



