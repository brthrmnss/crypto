var fsmonitor = require('fsmonitor');
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');





var ProjectFileWatcher = sh.require3('projectFileWatcher')

//console.log('what', projectFileWatcher)


/*var p = new projectFileWatcher();
p.init();*/
var instance = new ProjectFileWatcher();
var config = {};




var dirF = sh.fs.join(__dirname, '..', '..','..', 'ritv2/videoproject/Code/code-yeti')

sh.fs.exists(dirF, 'could not find dir')
var dirDB = 'Users/user2/Dropbox/'
var dirDB = 'Users/user2/Dropbox/'
dirDB = '/media/sf_Dropbox/';

if (sh.isWin()) {
    dirDB = 'C:/Users/user1/Dropbox/'
    dirDB = 'G:/Dropbox/'
}
var dir_aruco = dirDB + 'projects/crypto/mp/Aruco/';

config.dirs = [
    dir_aruco
]
instance.init(config)
instance.test();
