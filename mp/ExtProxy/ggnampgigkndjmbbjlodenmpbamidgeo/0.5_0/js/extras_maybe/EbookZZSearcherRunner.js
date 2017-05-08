

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');



//var file =
//console.log(__filename)
//sh.exit()

var fileToReload = __filename;
fileToReload = fileToReload.replace('Runner', '');
sh.runWhenFileChanged(fileToReload)

//sh.runWhenFileChanged(__dirname, 'ListExtractorScraper.js')

