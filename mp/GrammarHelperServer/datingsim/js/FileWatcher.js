

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');



var fsmonitor = require('fsmonitor');



function FileWatcher() {
    var p = FileWatcher.prototype;
    p = this;
    var self = this;
    p.init = function init(config) {
        self.settings = sh.dv(config, {});

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
        }
    }

    p.watchDirs = function watchDirs(config) {
        self.watchWinDir(self.settings.file)
    }

    p.trigger = function method(file) {
        if ( self.settings.fxTrigger ) {
            self.settings.fxTrigger(file)
            return;
        }
        /*
         var yyy = sh.runAsync2('node',
         [self.settings.file])
         */
        var cmdNode = 'node';
        asdf.g
        cmdNode = sh.dv(self.settings.cmdNode, 'node')
        var  y= sh.runAsync(cmdNode + ' '+ self.settings.file)
        //  var  yy= sh.run('node '+ self.settings.file)
//spit stdout to screen
        y.stdout.on('data', function (data) {   process.stdout.write(data.toString());  });

//spit stderr to screen
        y.stderr.on('data', function (data) {   process.stdout.write(data.toString());  });

        return;
/*
        var spawn = require('child_process').spawn;

//kick off process
        var child = spawn('node', ['-latkR', '/']);

//spit stdout to screen
        child.stdout.on('data', function (data) {   process.stdout.write(data.toString());  });

//spit stderr to screen
        child.stderr.on('data', function (data) {   process.stdout.write(data.toString());  });

        child.on('close', function (code) {
            console.log("Finished with code " + code);
        });

        return;*/
    }

    p.setupSocket = function setupSocket(config) {
        var socket = require('socket.io-client')('https://local.helloworld3000.com:8043/');
        socket.on('connect', function(){});
        socket.on('event', function(data){});
        socket.on('disconnect', function(){});
        socket.emit('my other event', __filename + ' is listening')

        /*
         var sh = require('shelpers').shelpers;
         var shelpers = require('shelpers');
         */
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

                    if ( relpath.includes('___jb_tmp___')) {
                        return false;
                    }

                    if ( self.settings.match ) {

                        //self.settings.match
                        if (relpath.match(/.py/gi)) {
                            if ( debug )   console.log('valid flie', relpath);
                            return true;
                        }
                        
                        return false 
                    }
                    
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

            monitor.on('change', function (changes) {
                var file = dirMonitored2 + '/ ' + changes.modifiedFiles[0]

                if ( self.settings.match) {
                    var file = self.settings.file  + '/' + changes.modifiedFiles[0]
                }

                if ( changes.modifiedFiles.length == 0 ) {
                    if ( self.settings.db ){
                        console.log('no love file')
                    }
                    return;
                }
                console.log(file, changes);

                self.trigger(file);
                // asdf.g
                return;
            });
        }

    }
    defineWatchers();

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





/**
 * Monitor port 3
 */
var dirMonitored2 = __dirname+'/'+'../'+'../'+'../'+'learn angular/port3/';
var path = require('path')


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



