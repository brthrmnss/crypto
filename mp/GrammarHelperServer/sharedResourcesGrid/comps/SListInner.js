/**
 * Created by user1 on 10/2/2017.
 */

function SListInner() {
    var self = this;
    var p = this;
    self.data = {};

    self.settings = {};
    self.settings.pageSize = 5;

    p.init = function init(cfg) {
        cfg = sh.dv(cfg)
        self.settings = cfg;
        self.data.ui = new UIComp()

        var cfg2 =  UIComp.copyCfg(cfg)
        cfg2.fileName = 'sListInner.html'



        self.data.ui.init(cfg2)
        //debugger
       // cfg2.fxRender = postRender;
        if ( self.settings.preload ) {
            self.data.ui.preloadTemplateContent();
        } else {
            self.render()
        }



        // debugger
    }

    p.render = function render(query) {
        sh.cid(self.settings.fxRender)
        self.data.ui.loadTemplateContent();
    };

/*    p.postRender = function postRender(query) {

        var listContents = self.data.ui.data.ui.find('#listContents')
        $.each(self.settings.list, function on(k,v){

            console.error('ok', v)
            var i = new self.settings.comp;
            var cfg = {};
            i.init(cfg)
        })
    };*/

    p.utils = {};
    p.utils.resetSearchId = function resetSearchId() {
        self.data.searchActive = false;
        self.data.searchId = null;
    }

}

