fsmonitor = require('fsmonitor');







var useSecureServer = false;
if ( useSecureServer ) {
//var socket = require('socket.io-client')('https://local.helloworld3000.com:8043/');
} else {
    var socket = require('socket.io-client')('http://127.0.0.1:14002/');
}
socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});
socket.emit('my other event', __filename + ' is listening')

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');


/**
 * Monitor port 3
 */
var dirMonitored2 = __dirname+'/'+'../'+'../'+'../'+'learn angular/port3/';
var path = require('path')

var dirDB = 'Users/user2/Dropbox/'
var dirDB = 'Users/user2/Dropbox/'

dirDB = '/media/sf_Dropbox/';
if ( sh.isWin() ) {
    dirDB = 'C:/Users/user1/Dropbox/'
    //dirDB = 'G:/Dropbox/'
}

var dirMonitored2       =   dirDB+"projects/learn angular/port3/"
var dir_PDFReader       =   dirDB+"projects/delegation/Reader/TTS-Reader/www/";
var dir_MP              =   dirDB+"projects/ritv2/videoproject/Code/code-yeti";
var dir_RCExtBab        =   dirDB+'projects/crypto/mp/RCExt/'
var dir_TestingFramework=   dirDB+'projects/crypto/mp/testingFramework/'
var y                   =   dirDB+'projects/crypto/mp/GrammarHelperServer/';
var dir_babylonjs       =   dirDB+'projects/crypto/mp/BabylonJS/';


    //, 'G:\Dropbox\projects\crypto\mp\RCExt'
var dirsToMonitor = [
    //dirDB+'projects/crypto/mp/ThreeJS/chp2',
    dir_PDFReader,
    dir_MP,
    dirDB+'projects/crypto/mp/GrammarHelperServer/',
    dir_RCExtBab,
    dir_TestingFramework,
    dir_babylonjs,
    dirDB+'projects/crypto/mp/ExtProxy/'
    //dirDB+'projects/crypto/mp/ExtProxy/ggnampgigkndjmbbjlodenmpbamidgeo/0.5_0/js/',
    //dirDB+'projects/crypto/mp/ExtProxy/bookzzext/0.5_0/js/'
]


console.log('what is dirname that is monitored?', __dirname, process.argv[2]);
var dirMonitored = __dirname;
var dirMonitored_Override = process.argv[2];

if ( dirMonitored2 != null ) {
    dirMonitored = dirMonitored2
}

if ( dirMonitored_Override != null ) {
    dirMonitored = dirMonitored_Override
}
console.log('will wtach', dirMonitored)


var helper = {};
helper.trigger = function trigger(file) {
    console.log('matched tr', file)
    var split = "\\GrammarHelperServer\\"
    if ( file.indexOf(split) != -1  ) {
       fi =  file.split(split)[1];
        file = '/g/'+fi
    }

    file = sh.replaceBackslash(file)

    socket.emit('window.invoke', file)
}

/*(function() {
 var childProcess = require("child_process");
 var oldSpawn = childProcess.spawn;
 function mySpawn() {
 console.log('spawn called');
 console.log(arguments);
 var result = oldSpawn.apply(this, arguments);
 return result;
 }
 childProcess.spawn = mySpawn;
 })();*/

sh.isFileType = function isFileType(file, type) {
    var path = require('path');
    var ext = path.extname(file);

    ext = ext.slice(1).toLowerCase();
    if ( ext == type ) {
        return true;
    }

    return false;
}

function checkTriggers (file) {
    if (sh.isFileType(file, 'js')) {
        console.log('go js file')
        helper.trigger(file)
    }

    if ( file.endsWith('.fragment.fx')) {
        console.log('got fragment')
        helper.trigger(file);
    }

    if (sh.isFileType(file, 'html')) {
        console.log('go')
        helper.trigger(file)
    }
    if (sh.isFileType(file, 'css')) {
        console.log('go')
        helper.trigger(file)
    }
    file = sh.fixPath(file)
    console.log('file', file)
    if ( file.includes('test3/csvScripts')) {
        console.log('go test')
        helper.trigger(file)
    }
    //var split = file.split("");
}

function monitorDir(dirMonitored2) {



    var terminal = require('child_process').spawn('fswatch', [dirMonitored2]);
    terminal.stdout.on('data', function (data) {
        data = data.toString().split("\n");
        console.log('stdout: ' + data);
        sh.each(data, function (i, file) {
            checkTriggers(file)
        })

    });

    terminal.on('exit', function (code) {
        console.log('child process exited with code ' + code);
    });

}
//monitorDir(dirMonitored2);

//monitorDir(dirMonitored2b);


function monitorDirWin(monX) {


    /**
     * Check if dir is examples, generators
     * check if file type is .js, or
     * @type {*}
     */
    console.log('monitor', monX)


    // Require
    var watchr = require('watchr');

// Watch a directory or file
    console.log('Watch our paths');
    watchr.watch({
        paths: monX,
        listeners: {
            /*log: function(logLevel){
                console.log('a log message occured:', arguments);
            },
            error: function(err){
                console.log('an error occured:', err);
            },
            watching: function(err,watcherInstance,isWatching){
                if (err) {
                    console.log("watching the path " + watcherInstance.path + " failed with error", err);
                } else {
                    console.log("watching the path " + watcherInstance.path + " completed");
                }
            },*/
            change: function(changeType,filePath,fileCurrentStat,filePreviousStat){
                //console.log('a change event occured:',arguments);
                var file = arguments[1];
                console.log('changed', file)
                checkTriggers(file)
            }
        },
        next: function(err,watchers){
            if (err) {
                return console.log("watching everything failed with error", err);
            } else {
                //console.log('watching everything completed', watchers);
            }

            // Close watchers after 60 seconds
            setTimeout(function(){
                return;
                var i;
                console.log('Stop watching our paths');
                for ( i=0;  i<watchers.length; i++ ) {
                    watchers[i].close();
                }
            },60*1000);
        }
    });
}


function monitorAllDirs() {

    //console.log(',,,')
    var dirsToMonitor_ = dirsToMonitor;
    dirsToMonitor = []
    sh.each(dirsToMonitor_, function monitorDirs(k,dirToMonitor){
        var dirX = sh.fs.resolve(dirToMonitor);
        /*console.log('x', dirToMonitor,
            sh.fileExists(dirToMonitor), dirX,
            sh.fileExists(dirX))*/
        if ( sh.isMac() ) {
            dirToMonitor = '/'+dirToMonitor;
        }
        if ( sh.fileExists(dirToMonitor)== false ) {
            throw new Error('broken ' + dirToMonitor)
        }
        dirsToMonitor.push(dirToMonitor);
    });


    if ( sh.isWin() ) {
        monitorDirWin(dirsToMonitor)
        return;
    }

   // asdf.g
    sh.each(dirsToMonitor, function monitorDirs(k,dirToMonitor){
        monitorDir(dirToMonitor);
    })
}
monitorAllDirs()