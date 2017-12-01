

var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');



var f = sh.runWhenFileChanged( __filename.replace('_Runner', ''))
f.settings.fileMatchFilter = 'GoogleIMDB'

  