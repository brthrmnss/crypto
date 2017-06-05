





/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;

var GoToAutoHotKeyQuickWebstorm = require('./GoToAutoHotKeyQuickWebstorm.js').GoToAutoHotKeyQuickWebstorm

if (module.parent == null) {
    var y = new GoToAutoHotKeyQuickWebstorm();
    var cfg = {};
    var cmd = ['crypto - [',
        'partial:db2_ui.js', 'norun']
    //y.init()
    y.runGTAHKQW(cmd)

    /* 
     //cfg.goToWindow = 'Extensions';
     cfg.goToWindow = 'crypto - [';
     cfg.partial = 'db2_ui.js';
     y.init(cfg);


     function asdf1() {
     var cmd = ''
     cmd = ['node', sh.fs.join(__dirname, 'GoToAutoHotKeyQuick.js'), 'morrisonstephen@gmail.com',
     'https://mail.google.com/mail/u/0/#inbox/', 'regex', 'norun']
     cmd = cmd.join(' ')
     var output =  sh.run(cmd)
     console.log('output', output.toString())
     }
     asdf1();*/
    
   
    
}

