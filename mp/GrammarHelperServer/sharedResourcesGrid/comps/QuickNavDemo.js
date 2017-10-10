/**
 * Created by user1 on 10/2/2017.
 */

function QuickNavDemo() {
    var self = this;
    var p = this;
    self.data = {};

    self.settings = {};
    self.settings.pageSize = 5;

    p.init = function init(cfg) {
        cfg = sh.dv(cfg);
        self.settings = cfg;


        cfg.div = '#quickNavDemo'

        self.data.ui = new UIComp();
        var cfg2 = u.clone(cfg);
        cfg2.fileName = 'quickNavDemo.html';
        //cfg2.fxPostRender = self.render;
        cfg2.fxPostRender = self.postRender;
        self.data.ui.init(cfg2);
        //
        self.render();

    }

    p.render = function render(query) {
        sh.cid(self.settings.fxRender)
        self.data.ui.loadTemplateContent();
    };

    p.postRender = function postRender(data, body, cfg) {
       // alert('bo')

        var qNC = new QuickNavConfigHelper();
        qNC.uiConfig.targetDiv('quick-nav')
        qNC.uiConfig.fxInit(function onxInit() {
            console.log('on built')
        })
        qNC.addArea('login', 'areaLogin');
        qNC.defaultArea('login');
        qNC.addArea('list')
        qNC.addArea('edit')

        var i = new QuickNav();

        i.init(qNC)
        return;
    };

    p.updateUI = function updateUI () {
        $.each(self.data.ui.data.subItems, function on(k, v) {
            console.log('....')
        })

        //self.data.ui.rake('txtVal')
    }

    p.utils = {};
    p.utils.resetSearchId = function resetSearchId() {
        self.data.searchActive = false;
        self.data.searchId = null;
    }

}

