





/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;

var GoToAutoHotKeyQuick = require('./GoToAutoHotKeyQuick.js').GoToAutoHotKeyQuick


if (module.parent == null) {
    function asdf() {
        var y = new GoToAutoHotKeyQuick();
        var cfg = {};
        cfg.goToWindow = 'morrisonstephen@gmail.com'
        cfg.regEx = true;
        y.init(cfg);
    }
    //asdf()


    function asdf1() {
        var cmd = ''
        cmd = ['node', sh.fs.join(__dirname, 'GoToAutoHotKeyQuick.js'), 'morrisonstephen@gmail.com', 
            'https://mail.google.com/mail/u/0/#inbox/', 'regex', 'bnorun']
        cmd = cmd.join(' ')
       var output =  sh.run(cmd)
        console.log('output', output.toString())
    }
    asdf1();
}

