/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;


AutoHotKeyAutomator = require('./AutoHotKeyAutomator.js').AutoHotKeyAutomator


if (module.parent == null) {
    var y = new AutoHotKeyAutomator();
    y.init();


    var url = 'p'

    y.goToWindow('Generic - morristew7')
    y.k.sendKeysRaw('MadCash#')
    y.k.sendKeys('{Enter}')
    y.writeAHKFile();

    return;
    y.goToWindow('Extensions', 'chrome://extensions/')

    y.goToUrl(p);
    y.wait(2)
    y.tab()
    y.enterText()
    y.tab()
    y.enterText();
    y.tab()
    y.enter();

    return;


    var name = 'morrisonstephen@gmail.com - Evernote'
    y.requireWindow(name)
    // y.goTo(  name )
    y.showCommands()

    y.actions.cloneNoteNamed('mp: template', 'mp: ')
   // y.actions.makeDailyLog();
    y.actions.setTags('mini-projects')

    y.writeAHKFile();
}




