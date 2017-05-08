





/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;

var GoToAutoHotKeyQuick = require('./GoToAutoHotKeyQuick.js').GoToAutoHotKeyQuick


if (module.parent == null) {
    var y = new GoToAutoHotKeyQuick();
    var cfg = {} ; 
    cfg.goToWindow = 'Extensions'
    y.init(cfg);
}

