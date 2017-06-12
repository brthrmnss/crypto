var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');


//sh.reload.reloadFile(__filename)

sh.runWhenFileChanged(sh.fs.join(__dirname, 'testpython2.js'));