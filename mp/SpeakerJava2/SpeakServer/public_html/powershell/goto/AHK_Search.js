/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;


AutoHotKeyAutomator = require('./AutoHotKeyAutomator.js').AutoHotKeyAutomator


if (module.parent == null) {
    var y = new AutoHotKeyAutomator();
    y.init();


   // var url = 'p'
    y.goTo('Everything')
    y.browser.reload()

    y.showCommands()


    y.writeAHKFile();
}




