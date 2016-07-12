/**
 * Created by user2 on 8/26/15.
 */
/*
Why?: This file will launch the App.
Wraps in forever for easy restarting
 */
var sh = require('shelpers').shelpers;
var shelpers = require('shelpers');

var RunEverythingLocal = require('./RunEverythingLocal_App').RunEverythingLocal;

if (module.parent == null) {
    var m = new RunEverythingLocal();
    var args = sh.getNodeArguments();
    var fileConfig = sh.dv(args[0],'local_config.json')
    var config = sh.readJSONFile(fileConfig);
    m.init(config);
}




//http://www.jqueryscript.net/demo/Simple-SVG-Flow-Chart-Plugin-with-jQuery-flowSVG/
//http://gojs.net/latest/doc/download.html
//http://www.jointjs.com/demos/fsa

