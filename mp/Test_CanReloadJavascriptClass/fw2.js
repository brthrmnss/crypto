fsmonitor = require('fsmonitor');
var dir = '/media/sf_Dropbox/projects/crypto/mp/GrammarHelperServer'
/*
fsmonitor.watch(dir, null, function(change) {
    console.log("Change detected:\n" + change); // # has a nice toString

    console.log("Added files:    %j", change.addedFiles);
    console.log("Modified files: %j", change.modifiedFiles);
    console.log("Removed files:  %j", change.removedFiles);

    console.log("Added folders:    %j", change.addedFolders);
    console.log("Modified folders: %j", change.modifiedFolders);
    console.log("Removed folders:  %j", change.removedFolders);
});

*/


var monitor = fsmonitor.watch(dir, {
    // include files
    matches: function(relpath) {


        if ( relpath.includes('.html')) {
            return true;
        }

        return relpath.match(/\.js$/i) !== null;
    },
    // exclude directories
    excludes: function(relpath) {
        return relpath.match(/^\.git$/i) !== null;
    }
});
monitor.on('change', function(changes) {
    console.log(changes);
});
