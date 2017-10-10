/**
 * Created by smorris1 on 1/3/14.
 */
var sh = require('shelpers').shelpers;


AutoHotKeyEvernote = require('./AutoHotKeyEvernote.js').AutoHotKeyEvernote


if (module.parent == null) {
    var y = new AutoHotKeyEvernote();
    y.init();

    var name = 'morrisonstephen@gmail.com - Evernote'
    y.requireWindow(name)
    // y.goTo(  name )
    y.showCommands()

    y.actions.cloneNoteNamed('mp: template', 'mp: ')
   // y.actions.makeDailyLog();
    y.actions.setTags('mini-projects')

    y.writeAHKFile();
}




