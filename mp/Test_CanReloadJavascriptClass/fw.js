fsmonitor = require('fsmonitor');
fsmonitor.watch(__dirname + '/' + 'diff/', null, function(change) {
    console.log("Change detected:\n" + change); // # has a nice toString

    console.log("Added files:    %j", change.addedFiles);
    console.log("Modified files: %j", change.modifiedFiles);
    console.log("Removed files:  %j", change.removedFiles);

    console.log("Added folders:    %j", change.addedFolders);
    console.log("Modified folders: %j", change.modifiedFolders);
    console.log("Removed folders:  %j", change.removedFolders);
});


/*
var monitor = fsmonitor.watch('.', {
    // include files
    matches: function(relpath) {
        return relpath.match(/\.js$/i) !== null;
    },
    // exclude directories
    excludes: function(relpath) {
        return relpath.match(/^\.git$/i) !== null;
    }
});
monitor.on('change', function(changes) {
    console.log(changes);
});*/
