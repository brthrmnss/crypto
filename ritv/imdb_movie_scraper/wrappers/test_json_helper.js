
var sh = require('shelpers').shelpers
var JSONFileHelper = require('shelpers').JSONFileHelper

var jh = new JSONFileHelper()
var config = {};
var dirLogs = sh.fs.getTrashDir()+'dl.logs/';
var filename = sh.getFileName('asdf.g')
config.file = dirLogs+filename + '.TXRun.json'
sh.mkdirp(dirLogs)

jh.init(config)
var oldCookie = {
    data:new Date()
}

console.log('what is file', config.file)
console.log('get full path', sh.fs.resolve(config.file) )

oldCookie = jh.add(oldCookie, true);
jh.saveFile();//(name)