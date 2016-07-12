/**
 * Created by user2 on 8/25/15.
 */
/*
 merge all files in folder and put in folder called merged
 */


var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var dir = '../vids/'
var dirConvert = dir+'../vids.converted/'
var vids = sh.getFilesInDirectory(dir);
sh.makePathIfDoesNotExist(dirConvert)
sh.each(vids, function convertVideo(i,vid) {
    var vidInput = dir + vid;
    var cmd = 'ffmpeg -i $$Inputfile $$Outputfile';
    cmd = cmd.replace('$$Inputfile', vidInput)
    cmd = cmd.replace('$$Outputfile', dirConvert+vid+'.mp4')
    //console.log(cmd)
    sh.run(cmd)
})



