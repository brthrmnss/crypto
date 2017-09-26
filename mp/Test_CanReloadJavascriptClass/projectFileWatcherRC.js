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


config.dirs = [
    dirF
]
instance.init(config)
instance.test();
