/**
 * hoist it
 * take a get to send to command line
 * and send result?
 * init test
 * 
 * add server
 * startup irb and import nodejs
 * add get request 
 * send command to commadn line 
 * return result 
 * -x modulpe requers
 *
 * //C:\Users\user1\Dropbox\projects\soundboard\automate_android_store\autoit\
 */ //MoneyIsHere4Eve

var AutoItServer = require('./AutoItServer.js').AutoItServer

if (module.parent == null) {
    var instance = new AutoItServer();
    var config = {};
    config.port = 11510;
    config.monitor = false;
    instance.init(config)
    instance.test();
}



