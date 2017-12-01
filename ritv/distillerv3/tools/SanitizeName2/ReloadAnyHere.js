

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');


//sh.x()
var FileWatcher = sh.require('mp/QuickJSON/FileWatcher').FileWatcher;
//sh.x()
var f = new FileWatcher();
var config = {
    //  file:__dirname + '/' + 'AutoItRunner',
    runNode:"__file__",
    action:"runFile"
};
config.file = __dirname
//config.file =fileX;
config.runAlways = true
config.runCurrentFile  = true
config.runFirst  = false
config.dir6 = __dirname
config.__filename = __filename; 

config.blockDefaultPublicHTML= true; 

/*config.initRun = [
    'G:/Dropbox/projects/crypto/mp/RCExt/RC_ConfigManager_ExecServer.js',
    'G:/Dropbox/projects/crypto/mp/RCExt/BreedHoistServer.js'
]*/


/*
config.initRun = [
    'RC_ConfigManager_ExecServer.js',
    'BreedHoistServer.js'
]

*/

config.initRun = [
    //'FileList_to_SanitizedFileIndex.js',
    'DlManifestIndex_XCompare_SanitizedFileIndex.js'
]
f.init(config)  
