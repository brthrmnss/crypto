/**
 * Created by user2 on 8/25/15.
 */
/*
 merge all files in folder and put in folder called merged
 */


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');


function mergeVideosInDir(dirX, outputFileNAme) {
    var dir = '../vids/'
    dir = sh.dv(dirX, dir)
    outputFileNAme = sh.dv(outputFileNAme, 'merged.flv')

    var vids = sh.getFilesInDirectory(dir);
    vids = sh.each.prepend(vids, dir).map(sh.qq);
    console.log('vids', vids)

    var filesVideoInputs = vids.join(' -i ')
    filesVideoInputs = '-i ' + filesVideoInputs;
    var cmd = 'ffmpeg -f concat '+filesVideoInputs+' -c copy ' + outputFileNAme;

    console.log(cmd);
    sh.run(cmd);

}

exports.mergeVideosInDir = mergeVideosInDir



