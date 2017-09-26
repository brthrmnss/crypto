
/**
 * Monitor port 3
 */
//var dirMonitored2 = __dirname+'/'+'../'+'../'+'../'+'learn angular/port3/';
var path = require('path')


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');


sh.isFileType = function isFileType(file, type) {
    var path = require('path');
    var ext = path.extname(file);

    ext = ext.slice(1).toLowerCase();
    if ( ext == type ) {
        return true;
    }

    return false;
}


fsmonitor = require('fsmonitor');



function FileWatcher() {
    var p = FileWatcher.prototype;
    p = this;
    var self = this;
    self.data = {};

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        if ( self.settings.__filename ) {
            self.settings.__filename = sh.replaceBackslash(self.settings.__filename);
        }

        console.log('config', self.settings);

        if ( self.settings.delayStart ) {
            setTimeout(function onX_waitForstgOverrides() {
                initStart()
            },50)
        } else{
            initStart()
        }
        function initStart() {
            self.watchDirs();
            self.setupSocket();
            self.handleInitRunSettings();

            self.data.count = 0;
        }




    }

    p.watchDirs = function watchDirs(config) {
        if ( self.settings.dir ) {
            self.watchWinDir(self.settings.dir)

            return;
        }
        self.watchWinDir(self.settings.file)
    }

    p.handleInitRunSettings = function handleInitRunSettings() {
        if ( self.settings.runFirst != false &&
            self.settings.action == 'runFile') {
            var file = self.settings.file;
            self.proc('running.runFirst', self.settings.file);
            self.utils.runFile(file);
        }

        if ( self.settings.initRun ) {
            sh.each(self.settings.initRun, function onRunInitFile(k,file) {
                self.proc('running.initRun', file);
                self.utils.runFile(file);
                return;
            })
        }
    }

    p.trigger = function trigger(file, changes) {
        if ( changes.addedFiles && changes.addedFiles.length == 1 ) {
            var fileFirst = changes.addedFiles[0];
            if ( fileFirst.includes('_tmp__') ) {
                if ( self.settings.debugChanges )
                    console.log('skip temp file')
                return;
            }
        }
        if ( self.settings.tellAboutFile ) {
            if ( changes ) {
                var file = null;
                if (changes.addedFiles.length > 0) {
                    file = changes.addedFiles[0];
                }
                if (changes.modifiedFiles.length > 0) {
                    file = changes.modifiedFiles[0];
                }
                if ( file == null ) {
                    return;
                }
                if (file.indexOf('_old___') != -1)
                    return;
                if (file.indexOf('_tmp___') != -1)
                    return;
                file = self.settings.dir + '/' + file
            }
            else {
                return;
            }
        }
        if ( self.settings.debugChanges )
            self.proc('hit file', file)
        if ( self.settings.fxTransformFile ) {
            file = self.settings.fxTransformFile(file);
        }
        if ( self.settings.action == 'runFile') {
            // self.proc('runFile', file, self.settings.__filename)
            if ( self.settings.runAlways != true ) {
                var leaf = sh.fs.leaf(file);
                leaf = leaf.trim()
                if ( self.settings.file.includes(leaf) == false ) {
                    var skipFile = true;
                    if ( self.settings.fxValidFileLike ) {

                    }
                    var otherValidFiles = self.settings.otherValidFiles;
                    if ( otherValidFiles ) {
                        console.log('otherValidFiles', otherValidFiles, leaf);
                        if ( otherValidFiles.includes(leaf)) {
                            skipFile = false;
                            self.proc('other valid file');
                        }
                    }
                    if (skipFile) {
                        if ( self.settings.fileMatchFilter ) {
                            if ( leaf.includes(self.settings.fileMatchFilter)) {
                                self.proc('saved by wildcard', leaf, self.settings.fileMatchFilter)
                                file = self.settings.file;
                                skipFile = false;
                            }
                        }
                        if ( skipFile )  {
                            self.proc('not same file', leaf, sh.qq(self.settings.file), self.settings.file.indexOf(leaf))
                            return
                        }

                    }

                }
            }
            if ( self.settings.fxTestFile ) {
                var ok = sh.cid(self.settings.fxTestFile, file)

                if ( ok != true ) {
                    if ( self.settings.runAnyFilter ) {
                        ok = sh.filterCheck(self.settings.runAnyFilter, file, sh.fs.norm)
                    }
                }

                if ( ok == false ) {
                    return;
                }
            }
            var fileToRun = self.settings.file;

            self.proc('dbg.trigger', file, 'filename:', self.settings.__filename)
            if ( self.settings.__filename == file ) {
                self.proc('same file')
                return;
            }
            if ( file == null ) {
                console.log('is null')
                return
            }
            if ( sh.fs.exists(file) == false )
            {
                console.log('no exist', file)
                return
            }
            if ( self.settings.runCurrentFile ) {
                fileToRun = file;

            }

            self.utils.runFile(file)

        }
        self.socket.emit('window.invoke', file)
        return;
    }

    p.setupSocket = function setupSocket(config) {
        var socket = require('socket.io-client')('https://local.helloworld3000.com:8043/');
        var socket = require('socket.io-client')('http://localhost:3001/');

        socket.on('connect', function(){});
        socket.on('event', function(data){});
        socket.on('disconnect', function(){});
        socket.emit('my other event', __filename + ' is listening')
        self.socket = socket;
    }

    p.test = function testTrigger() {
        self.trigger('somerandomfile')
    }

    function defineWatchers( ){
        //why: different modules for different operating systems

        function macWatch() {
            var terminal = require('child_process').spawn('fswatch', [dirMonitored2]);

            terminal.stdout.on('data', function (data) {
                data = data.toString().split("\n");
                console.log('stdout: ' + data);
                sh.each ( data, function (i, file) {
                    if ( sh.isFileType(file, 'js') ) {
                        helper.trigger(file)
                    }
                    if ( sh.isFileType(file, 'html') ) {
                        helper.trigger(file)
                    }
                    //var split = file.split("");
                })

            });

            terminal.on('exit', function (code) {
                console.log('child process exited with code ' + code);
            });

        }

        p.watchWinDir = function other(dir) {
            /**
             * Check if dir is examples, generators
             * check if file type is .js, or
             * @type {*}
             */
            if ( path.extname(dir)!= '' ) {
                dir = path.dirname(dir) ; //why: get path only
            }
            self.proc('dir', dir)

            var debug = false
            var monitor = fsmonitor.watch(dir, {
                // include files
                matches: function (relpath) {
                    relpath = relpath.replace(/\\/g, "/")

                    if (relpath.match(/.js/gi)) {
                        if ( debug )   console.log('valid flie', relpath);
                        return true;
                    }
                    if (relpath.match(/.css/gi)) {
                        if ( debug )   console.log('valid flie', relpath);
                        return true;
                    }

                    return false;

                    if (relpath.match(/examples\//gi)) {
                        return true;
                    }

                    if (relpath.match(/generators\//gi)) {
                        return true;
                    }
                    return false;

                    // return relpath.match(/\.js$/i) !== null;
                },
                // exclude directories
                excludes: function (relpath) {
                    return relpath.match(/^\.git$/i) !== null;
                }
            });

            monitor.on('change', function onChange(changes) {
                // var file = dirMonitored2 + '/' + changes.modifiedFiles[0]
                var file = /*dirMonitored2 + '/' +*/ changes.modifiedFiles[0]
                if ( self.settings.dir6) {
                    var file = self.settings.dir6 + '/' + changes.modifiedFiles[0]
                }
                //file = sh.fs.norm2(file);

                if ( changes.modifiedFiles.length == 0 ) {
                    file = changes.addedFiles[0]
                }
                if ( file == null ) { file = ''}
                file = sh.replaceBackslash(file);

                if ( self.settings.debugChanges )
                    console.log(file, changes);

                self.trigger(file, changes);
                // asdf.g
                return;
            });
        }

    }
    defineWatchers();

    function defineUtils () {
        p.utils = {}
        p.utils.runFile = function runFile(file) {

            fileToRun = file;

            if  ( self.settings.blockDefaultPublicHTML ) {
                if ( fileToRun.includes('/public_html/') ) {
                    console.log('skip public file', fileToRun)
                    return;
                }
            }


            if ( fileToRun.endsWith('.js') == false ) {
                self.proc('does not end with .js, so ignore')
                return;
            }

            //self.proc('running.runFile', file, self.settings.);

            var isDir =  sh.fs.isDir(file);
            self.proc('isdir', isDir)
            if (isDir ) {
                self.proc('skip dir', file)
            }


            var dirFile = sh.dirname(file)
            ///var process = var require('process')
            process.chdir(dirFile)

            if ( self.settings.runParams ) {
                var runParams = self.settings.runParams;
                runParams = runParams.join(' ')
                fileToRun += ' ' + runParams
            }

            self.data.count ++;
            self.proc('running', fileToRun, self.data.count)
            var cmdNode = 'node';
            if ( sh.isWin() == false ) {
                cmdNode = '/home/user/.nvm/versions/node/v6.9.5/bin/node'
            }
            cmdNode = sh.dv(self.settings.cmdNode, cmdNode)
            var  y= sh.runAsync(cmdNode + ' '+ fileToRun)

           // var  y = sh.runAsync('node '+ fileToRun)
            //spit stdout to screen
            y.stdout.on('data', function (data) {   process.stdout.write(data.toString());  });
            //spit stderr to screen
            y.stderr.on('data', function (data) {   process.stderr.write(data.toString());  });


        }

    }
    defineUtils();

    p.proc = function debugLogger() {
        if ( self.silent == true) {
            return;
        }
        sh.sLog(arguments);
    };
}

exports.FileWatcher = FileWatcher;

if (module.parent == null) {
    var instance = new FileWatcher();
    var config = {};
    instance.init(config)

}







var helper = {};
helper.trigger = function trigger(file) {
    console.log('matched', file)
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

