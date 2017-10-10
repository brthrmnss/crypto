/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;


AutoHotKeyAutomator = require('./AutoHotKeyAutomator.js').AutoHotKeyAutomator


if (module.parent == null) {
    var y = new AutoHotKeyAutomator();
    y.init();


    var url = 'p'

    var testMode = false;
    //testMode = true;
    function defineActions() {
        //y.goToWindow('Paste - TinyMCE Reader', 'http://127.0.0.1:8080/tinymce_paste_yahoo.html')
        // y.goToWindow('Extensions', 'chrome://extensions/')
        //return;
        if (testMode == true) {
            y.goToWindow('sulphur in seafood')
            y.goToWindow('crypto')
        }
        y.goToLastWindow()
        y.wait(1)
        //y.goTo('Extensions')
        // y.browser.reload()
        y.k.selectAll()
        y.k.copy()
        y.wait2 = function wait2() {
            y.wait(0.1)
        }
        y.wait2()
        y.goToWindow('Paste - TinyMCE Reader', 'http://127.0.0.1:8080/tinymce_paste_yahoo.html')
        y.wait(1)
        y.wait2()


        y.browser.goToAddressBar()
        y.wait2()
        y.k.tab();
        y.wait2()
        y.k.selectAll()
        y.wait2()
     /*   y.k.type()
        y.k.enter()*/
        y.wait2()
        // y.k.tab();
        // y.wait(1)
        y.k.paste()
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
    }

    defineActions()
    y.showCommands()

    //y.actions.cloneNoteNamed('mp: template', 'mp: ')
    // y.actions.makeDailyLog();
    // y.actions.setTags('mini-projects')

    y.writeAHKFile();
}




