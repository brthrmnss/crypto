var shelpers = require('shelpers')
var sh = shelpers.shelpers;
var ReloadWatcher = shelpers.ReloadWatcher;

if (module.parent == null) {
    var instance = new ReloadWatcher();
    var config = {};
    instance.init(config)
    instance.watchFileAndRunner('RunDLHelper.js');
}