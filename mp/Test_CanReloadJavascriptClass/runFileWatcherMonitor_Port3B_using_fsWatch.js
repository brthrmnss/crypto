fsmonitor = require('fsmonitor');


var socket = require('socket.io-client')('https://local.helloworld3000.com:8043/');
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

dirMonitored2 = "/Users/user2/Dropbox/projects/learn angular/port3/"

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

sh.isFileType = function isFileType(file, type) {
    var path = require('path');
    var ext = path.extname(file);

    ext = ext.slice(1).toLowerCase();
    if ( ext == type ) {
        return true;
    }

    return false;
}

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





function other() {


    /**
     * Check if dir is examples, generators
     * check if file type is .js, or
     * @type {*}
     */
    var monitor = fsmonitor.watch('.', {
        // include files
        matches: function (relpath) {
            if (relpath.match(/\.js$/i)) {

            }
            relpath = relpath.replace(/\\/g, "/")
            console.log(relpath)
            if (relpath.match(/examples\//gi)) {
                //console.log(relpath)
                /*console.log(relpath, relpath.match(/examples/gi) ,
                 ( relpath.match(/examples/gi)   !== null )
                 )*/
                return true;
            }

            if (relpath.match(/generators\//gi)) {
                //console.log(relpath)
                /*console.log(relpath, relpath.match(/examples/gi) ,
                 ( relpath.match(/examples/gi)   !== null )
                 )*/
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
        //console.log(changes);
        asdf.g
        return;
        console.log('changed ... ')
        var terminal = require('child_process').spawn('cmd');

        terminal.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });

        terminal.on('exit', function (code) {
            console.log('child process exited with code ' + code);
        });

        setTimeout(function () {
            console.log('Sending stdin to terminal');
            //terminal.stdin.write('echo "Hello $USER. Your machine runs since:"\n');
            //terminal.stdin.write('uptime\n');

            terminal.stdin.write('nodejs generators/ViewerGen.js ' + dirToBuild + '\n');

            console.log('Ending terminal session');
            terminal.stdin.end();
        }, 1000);

    });
}