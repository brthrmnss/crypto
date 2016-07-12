/**
 * Created by user2 on 8/26/15.
 */
/*
Why?: This file will launch the local encode server.
When forever-monitor fails, it can reload this file directly ...
    no need to instantia\te instances and pass them instances
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var RTMPLocalEncodeServer = require('./RTMPLocalEncodeServer').RTMPLocalEncodeServer;

if (module.parent == null) {
    var m = new RTMPLocalEncodeServer();
    var args = sh.getNodeArguments();
    var fileConfig = sh.dv(args[0],'local_config.json')
    var config = sh.readJSONFile(fileConfig);
    m.init(config);
}






