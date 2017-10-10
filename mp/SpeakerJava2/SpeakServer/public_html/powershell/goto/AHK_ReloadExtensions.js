/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;


AutoHotKeyAutomator = require('./AutoHotKeyAutomator.js').AutoHotKeyAutomator


if (module.parent == null) {
    var y = new AutoHotKeyAutomator();
    y.init();


    var url = 'p'

    // y.goToWindow('Extensions', 'chrome://extensions/')
    y.goTo('Extensions')
    y.browser.reload()
    /*
     return;
     y.goToUrl(p);
     y.wait(2)
     y.tab()
     y.enterText()
     y.tab()
     y.enterText();
     y.tab()
     y.enter();
     "mp: template"
     d   mp:
     return;

     "mp: template"mini-projects
     d
     var name = 'morrisonstephen@gmail.com - Evernote'
     y.requireWindow(name)
     // y.goTo(  name )*/
    y.showCommands()

    //y.actions.cloneNoteNamed('mp: template', 'mp: ')
    // y.actions.makeDailyLog();
    // y.actions.setTags('mini-projects')

    y.writeAHKFile();
}




