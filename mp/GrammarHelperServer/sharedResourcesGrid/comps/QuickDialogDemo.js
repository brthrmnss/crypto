/**
 * Created by user1 on 10/2/2017.
 */


function QuickDialogDemo() {
    var self = this;
    var p = this;
    self.data = {};

    self.settings = {};
    self.settings.pageSize = 5;

    p.init = function init(cfg) {
        cfg = sh.dv(cfg);
        self.settings = cfg;
        cfg.div = '#quickDialogDemo'
        cfg.divMakeIfNotFound = true;
        self.data.ui = new UIComp();
        var cfg2 = u.clone(cfg);
        cfg2.fileName = 'quickDialogDemo.html';
        //cfg2.fxPostRender = self.render;
        cfg2.fxPostRender = self.postRender;
        self.data.ui.init(cfg2);
        self.render();
    }

    p.render = function render(query) {
        sh.cid(self.settings.fxRender)
        self.data.ui.loadTemplateContent();
    };

    p.postRender = function postRender(data, body, cfg) {

        self.createDialog1();
        self.createDialog2();
        self.createDialog3();

        self.data.ui.addClickToDom(cfg.ui, self)

        return;
    };

    p.createDialog1 = function createDialog1() {
     /*
     var qdc = new QuickDialogConfigHelper();
        //qdc.uiConfig.targetDiv('body')
        qdc.uiConfig.fxInit(function onxInit() {
            console.log('on built')
        })

        qdc.setDialogText('test 1', 'this is the dialog info')
        qdc.modalDialog()
        qdc.centerDialog();
        var i = new QuickDialog();

        i.init(qdc)

        self.data.msg1 = i;
*/

        var b = QuickDialog.newModalDialog('test 1', 'this is the dialog info')
        var i = b.dialog;
        var qdc = b.qdc;
        self.data.msg1 = i;
    }


    p.createDialog2 = function createDialog2() {
        var b = QuickDialog.newAlert('alert text', 'Alert')
        var i = b.dialog;
        var qdc = b.qdc;
        self.data.msg2 = i;
    }

    p.createDialog3 = function createDialog3() {

        var b = QuickDialog.brAlert('test 2', 'this is a br dialog')
        var i = b.dialog;
        var qdc = b.qdc;
        self.data.msg3 = i;

    }


    p.onCenter = function onCenter() {
        console.log('center')
        self.data.msg1.openDialog()
    }

    p.onLeft = function onLeft() {
        self.data.msg2.openDialog()
    }

    p.onAlert = function onAlert() {
        self.data.msg3.openTimedDialog('runnig low')
    }

    p.utils = {};
    p.utils.resetSearchId = function resetSearchId() {
        self.data.searchActive = false;
        self.data.searchId = null;
    }

}

