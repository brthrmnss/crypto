fsmonitor = require('fsmonitor');


var socket = require('socket.io-client')('https://local.helloworld3000.com:8043/');
socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});
socket.emit('my other event', 'what?...')


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
fsmonitor.watch(dirMonitored, null, function(change) {
    console.log("Change detected:\n" + change); // # has a nice toString

    return;

    console.log("Added files:    %j", change.addedFiles);
    console.log("Modified files: %j", change.modifiedFiles);
    console.log("Removed files:  %j", change.removedFiles);

    console.log("Added folders:    %j", change.addedFolders);
    console.log("Modified folders: %j", change.modifiedFolders);
    console.log("Removed folders:  %j", change.removedFolders);
});

/**
 * Check if dir is examples, generators
 * check if file type is .js, or
 * @type {*}
 */
var monitor = fsmonitor.watch('.', {
    // include files
    matches: function(relpath) {
        if ( relpath.match(/\.js$/i) ) {

        }
        relpath = relpath.replace(/\\/g,"/")
        console.log(relpath)
        if ( relpath.match(/examples\//gi) ) {
            //console.log(relpath)
            /*console.log(relpath, relpath.match(/examples/gi) ,
                ( relpath.match(/examples/gi)   !== null )
            )*/
            return true;
        }

        if ( relpath.match(/generators\//gi) ) {
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
    excludes: function(relpath) {
        return relpath.match(/^\.git$/i) !== null;
    }
});
monitor.on('change', function(changes) {
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

    setTimeout(function() {
        console.log('Sending stdin to terminal');
        //terminal.stdin.write('echo "Hello $USER. Your machine runs since:"\n');
        //terminal.stdin.write('uptime\n');

        terminal.stdin.write('nodejs generators/ViewerGen.js ' + dirToBuild +'\n');

        console.log('Ending terminal session');
        terminal.stdin.end();
    }, 1000);

});