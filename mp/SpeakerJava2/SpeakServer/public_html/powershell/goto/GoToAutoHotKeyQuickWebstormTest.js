





/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;

var GoToAutoHotKeyQuickWebstorm = require('./GoToAutoHotKeyQuickWebstorm.js').GoToAutoHotKeyQuickWebstorm

if (module.parent == null) {
    var y = new GoToAutoHotKeyQuickWebstorm();
    var cfg = {}; 
    cfg.goToWindow = 'Extensions';
    cfg.webstorm = 'crypto = - [';
    cfg.file = 'baby_rend.js';
    y.init(cfg);
}

