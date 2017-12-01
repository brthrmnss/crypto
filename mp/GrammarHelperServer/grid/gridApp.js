/**
 * Created by user1 on 10/7/2017.
 */

/*


 var cfg = {
 div:'#testX'
 }
 cfg.fxInit = function on() {
 console.log('on built')
 }
 var i = new SList();
 cfg.list = ['booyt', 'bail', 'dog']
 cfg.comp = SListInner
 i.init(cfg)



 var cfg = {
 div:'#quickFormTest'
 }
 cfg.fxInit = function on() {
 console.log('on built')
 }
 var i = new SList();
 cfg.list = ['booyt', 'bail', 'dog']
 cfg.comp = SListInner2
 i.init(cfg)

 var m = new Morpher()
 var cfg = {}
 cfg.div = '#holderMorphArea'
 m.init(cfg)
 m.render();
 */

/*
 var i = new QuickNavDemo();
 var cfg = {};
 i.init(cfg)
 */

window.gridAppStart = function gridAppStart() {
 /*   var i = new QuickFormDemo();
    var cfg = {};
    i.init(cfg)
*/

    var i = new QuickCrudDemo();
    var cfg = {};
    i.init(cfg)


/*    var i = new QuickDialogDemo();
    var cfg = {};
    i.init(cfg)*/
}
window.gridAppStart();

var cfgListen = {
    str: [uiUtils.keys.space],
    fx: function ok() {
        console.log('hit space')
    },
    codeMode: true,
    ignoreText: true
}
/*
uiUtils.listenForKeyCodes(cfgListen)
uiUtils.listenForKeyCodes(' ', function ok() {
    console.log('hit space2')
}, false, true)
*/
uiUtils.listenForKeyCodes(cfgListen);

uiUtils.listenForStr(' ', function onK() {
    console.log('hit space2')
})