var fsmonitor = require('fsmonitor');
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');


sh.catchErrors()

function ProjectFileWatcher() {
    var p = ProjectFileWatcher.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;

        self.method();
        self.setupSocket();
        self.getDirsToMonitor();


        self.monitorAllDirs();
    }

    p.method = function method(config) {
    }

    p.trigger = function trigger(file) {
        console.log('matched tr', file)
        var split = "\\GrammarHelperServer\\"
        if (file.indexOf(split) != -1) {
            fi = file.split(split)[1];
            file = '/g/' + fi
        } else {
            split = sh.fs.slash(split)
            if (file.includes(split)) {
                fi = file.split(split)[1];
                file = '/g/' + fi
            }
        }

        file = sh.replaceBackslash(file)

        self.data.socket.emit('window.invoke', file)
    }

    p.setupSocket = function setupSocket() {


        var useSecureServer = false;
        if (useSecureServer) {
            //var socket = require('socket.io-client')('https://local.helloworld3000.com:8043/');
        } else {
            var socket = require('socket.io-client')('http://127.0.0.1:14002/');
        }
        socket.on('connect', function () {
        });
        socket.on('event', function (data) {
        });
        socket.on('disconnect', function () {
        });
        socket.emit('my other event', __filename + ' is listening')

        self.data.socket = socket;
    }


    p.getDirsToMonitor = function getDirsToMonitor() {


        /**
         * Monitor port 3
         */
        var dirMonitored2 = __dirname + '/' + '../' + '../' + '../' + 'learn angular/port3/';
        var path = require('path')

        var dirDB = 'Users/user2/Dropbox/'
        var dirDB = 'Users/user2/Dropbox/'
        dirDB = '/media/sf_Dropbox/';

        if (sh.isWin()) {
            dirDB = 'C:/Users/user1/Dropbox/'
            dirDB = 'G:/Dropbox/'
        }

        var dirMonitored2 = dirDB + "projects/learn angular/port3/"
        var dir_PDFReader = dirDB + "projects/delegation/Reader/TTS-Reader/www/";
        var dir_MP = dirDB + "projects/ritv2/videoproject/Code/code-yeti";
        var dir_RCExtBab = dirDB + 'projects/crypto/mp/RCExt/'
        var dir_TestingFramework = dirDB + 'projects/crypto/mp/testingFramework/'
        var y = dirDB + 'projects/crypto/mp/GrammarHelperServer/';
        var dir_babylonjs = dirDB + 'projects/crypto/mp/BabylonJS/';
        var dir_aruco = dirDB + 'projects/crypto/mp/Aruco/';



        //, 'G:\Dropbox\projects\crypto\mp\RCExt'
        var dirsToMonitor = [
            //dirDB+'projects/crypto/mp/ThreeJS/chp2',
            dir_PDFReader,
            dir_MP,
            dirDB + 'projects/crypto/mp/GrammarHelperServer/',
            dir_RCExtBab,
            dir_TestingFramework,
            dir_babylonjs,
            dir_aruco,
            dirDB + 'projects/crypto/mp/ExtProxy/chomeExtDebug/'
            //dirDB+'projects/crypto/mp/ExtProxy/ggnampgigkndjmbbjlodenmpbamidgeo/0.5_0/js/',
            //dirDB+'projects/crypto/mp/ExtProxy/bookzzext/0.5_0/js/'
        ]




        self.proc('what is dirname that is monitored?', __dirname, process.argv[2]);
        var dirMonitored = __dirname;
        var dirMonitored_Override = process.argv[2];

        if (dirMonitored2 != null) {
            dirMonitored = dirMonitored2
        }

        if (dirMonitored_Override != null) {
            dirMonitored = dirMonitored_Override
        }

        if ( self.settings.dirs ) {
            dirsToMonitor = self.settings.dirs
        }

        self.proc('will wtach', dirMonitored)

        self.data.dirsToMonitor = dirsToMonitor;

    }

    p.monitorAllDirs = function monitorAllDirs() {

         console.log(',,,')
        var dirsToMonitor_ = self.data.dirsToMonitor;
        var list_dirsToMonitor = []
        sh.each(dirsToMonitor_, function monitorDirs(k, dirToMonitor) {
            var dirX = sh.fs.resolve(dirToMonitor);
            /*console.log('x', dirToMonitor,
                sh.fileExists(dirToMonitor), dirX,
                sh.fileExists(dirX))*/
            if (sh.isMac()) {
                dirToMonitor = '/' + dirToMonitor;
            }
            if (sh.fileExists(dirToMonitor) == false) {
                throw new Error('broken ' + dirToMonitor)
            }
            list_dirsToMonitor.push(dirToMonitor);
        });

        if (sh.isWin()) { //win takes eveyrthing ...
            self.fm.monitorDirWin(list_dirsToMonitor)
            return;
        }

        sh.each(list_dirsToMonitor, function monitorFileDir(k, dirToMonitor__) {

            if (sh.isMac()) {
                self.fm.monitorDirMac(dirToMonitor__)
                return;
            }
            self.fm.monitorDir(dirToMonitor__)
        });


    }


    function defineMonitoring() {
        self.fm = {};

        self.fm.monitorDir = function monitorDir(dirMonitored2) {



            console.log('dir', dirMonitored2)

            var monitor = fsmonitor.watch(dirMonitored2, {
                // include files
                matches: function (relpath,b,c) {
                    relpath = relpath.replace(/\\/g, "/")


                     console.log('ok', relpath)
                    if (relpath.match(/.js/gi)) {
                        if ( self.settings.debugChangesHiy )   console.log('valid flie', relpath);
                        return true;
                    }
                    if (relpath.match(/.css/gi)) {
                        if ( self.settings.debugChangesHiy )   console.log('valid flie', relpath);
                        return true;
                    }

                    if ( relpath.endsWith('.html')) {
                        return true;
                    }

                    return false;
                },
                excludes: function (relpath) {
                    return relpath.match(/^\.git$/i) !== null;
                }
            });

            monitor.on('change', function onChange(changes, sdf) {
                // var file = dirMonitored2 + '/' + changes.modifiedFiles[0]
                var file = /*dirMonitored2 + '/' +*/ changes.modifiedFiles[0]
                if ( self.settings.dir6) {
                    var file = self.settings.dir6 + '/' + changes.modifiedFiles[0]
                }
                //file = sh.fs.norm2(file);

                console.log('change', changes, sdf)

                if ( changes.modifiedFiles.length == 0 ) {
                    file = changes.addedFiles[0]
                }
                if ( file == null ) { file = ''}
                file = sh.replaceBackslash(file);

                if ( sh.isWin() == false ) { //linux drops full paths
                    file = dirMonitored2 + file;
                }

                if ( self.settings.debugChanges ) {
                    console.log(file, changes);
                }


                self.fm.checkTriggers(file)
                // asdf.ggs
                return;
            });


        }
        self.fm.monitorDirMac = function monitorDirMac(dirMonitored2) {

            var terminal = require('child_process').spawn('fswatch', [dirMonitored2]);
            terminal.stdout.on('data', function (data) {
                data = data.toString().split("\n");
                console.log('stdout: ' + data);
                sh.each(data, function (i, file) {
                    self.data.fm.checkTriggers(file)
                })

            });

            terminal.on('exit', function (code) {
                console.log('child process exited with code ' + code);
            });

        }
        self.fm.monitorDirWin = function monitorDirWin(monX) {


            /**
             * Check if dir is examples, generators
             * check if file type is .js, or
             * @type {*}
             */
            self.proc('monitor', monX)


            // Require
            var watchr = require('watchr');

            // Watch a directory or file
            self.proc('Watch our paths');
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
                    change: function onChange(changeType, filePath, fileCurrentStat, filePreviousStat) {
                         console.log('a change event occured:',arguments);
                        try {
                            var file = arguments[1];
                            console.log('changed-->', file)
                            var x = self.fm.checkTriggers;

                            self.fm.checkTriggers(file)
                        } catch ( E ) {
                            console.error('could not trigger', E)
                        }
                    }
                },
                next: function (err, watchers) {
                    if (err) {
                        return console.log("watching everything failed with error", err);
                    } else {
                        //console.log('watching everything completed', watchers);
                    }

                    // Close watchers after 60 seconds
                    setTimeout(function () {
                        return;
                        var i;
                        console.log('Stop watching our paths');
                        for (i = 0; i < watchers.length; i++) {
                            watchers[i].close();
                        }
                    }, 60 * 1000);
                }
            });
        }

        self.fm.checkTriggers = function checkTriggers(file) {
            self.proc('check triggers', file)
            if (sh.isFileType(file, 'js')) {
                console.log('go js file')
                self.trigger(file)
            }

            if (file.endsWith('.fragment.fx')) {
                console.log('got fragment')
                self.trigger(file);
            }

            if (sh.isFileType(file, 'html')) {
                console.log('go')
                self.trigger(file)
            }
            if (sh.isFileType(file, 'css')) {
                console.log('go')
                self.trigger(file)
            }
            file = sh.fixPath(file)
            console.log('file', file)
            if (file.includes('test3/csvScripts')) {
                console.log('go test')
                self.trigger(file)
            }
            //var split = file.split("");
        }
    }

    defineMonitoring();

    p.test = function test(config) {
    }


    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.getFilePath = function getFilePath(file) {
            var file = self.settings.dir + '/' + file;
            return file;
        }

        p.proc = function debugLogger() {
            if (self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }

    defineUtils()
}

exports.ProjectFileWatcher = ProjectFileWatcher;
exports.projectFileWatcher = ProjectFileWatcher
if (module.parent == null) {
    var instance = new ProjectFileWatcher();
    var config = {};
    instance.init(config)
    instance.test();
}