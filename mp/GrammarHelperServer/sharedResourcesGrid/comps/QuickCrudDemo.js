/**
 * Created by user1 on 10/2/2017.
 */


function QuickCrudDemo() {
    var self = this;
    var p = this;
    self.data = {};

    self.settings = {};
    self.settings.pageSize = 5;

    p.init = function init(cfg) {
        cfg = sh.dv(cfg);
        self.settings = cfg;
        cfg.div = '#quickCrudDemo'
        cfg.divMakeIfNotFound = true;
        self.data.ui = new UIComp();
        var cfg2 = u.clone(cfg);
        cfg2.fileName = 'quickCrudDemo.html';
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

        /*var opts = QuickForm.createQF()
        qf = opts.qf;
        var i = opts.quickCrud()*/

        var qf = new QuickFormConfigHelper();
        qf.uiConfig.targetDiv(cfg.ui.find('#qCDemoContents'))
        qf.uiConfig.fxInit(function onxInit() {
            console.log('on built')
        })
        var formObject2 = {};
        qf.loadForm(formObject2)

        qf.addTextInput('name', 'Prompt Name');
        qf.defaultValue('Sean')
        qf.required();
        qf.addTextInput('desc', 'Description');
        qf.defaultValue('')

        qf.addRadioGroup('desc2', ['a','b', 'c']);
        qf.defaultValue('c')

     /*   qf.addRadioGroup('desc2', ['a','b', 'c']);
        qf.defaultValue('c')
        */
        var i = new QuickCrud();

        i.init(qf)

        self.data.qf = self.data.quickForm = i;
        i.data.ui.callWhenChangedUIDataChanged(function onUpdated(o) {
            console.debug('boo', i.data)
            //self.data.ui.setText('#dbgRake', o.data.formObject)
            //self.data.ui.setText('#dbgRake', self.data.qf.data.formObject)
            self.data.ui.setText('#formObject', sh.toJSONString(
                self.data.qf.data.formObject
            ) )
            // debugger;
        })
        //self.data.ui.pushVal({type:'rake', key:'txtVal', id:'#dbgRake', storeOnData:'formObject'})


        return;
    };


    p.utils = {};
    p.utils.resetSearchId = function resetSearchId() {
        self.data.searchActive = false;
        self.data.searchId = null;
    }

}
