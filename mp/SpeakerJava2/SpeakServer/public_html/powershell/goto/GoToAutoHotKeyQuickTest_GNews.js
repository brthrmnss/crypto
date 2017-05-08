





/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;

var GoToAutoHotKeyQuick = require('./GoToAutoHotKeyQuick.js').GoToAutoHotKeyQuick


if (module.parent == null) {
    var y = new GoToAutoHotKeyQuick();
    var cfg = {} ; 
    cfg.goToWindow = 'Google News'
    cfg.launchIfNotFound = 'https://news.google.com/news?pz=1&zx=7a190glpnabf&pog=false'
    y.init(cfg);
}

