/**
 * Created by user1 on 10/2/2017.
 */

function SListInner2() {
    var self = this;
    var p = this;
    self.data = {};

    self.settings = {};
    self.settings.pageSize = 5;

    p.init = function init(cfg) {
        cfg = sh.dv(cfg)
        self.settings = cfg;
        self.data.ui = new UIComp();

        var cfg2 = UIComp.copyCfg(  cfg)
        cfg2.fileName = 'sListInner2.html'
        //self.settings.fxPostRender = p.postRender;

        self.data.ui.init(cfg2)

        //debugger
         //cfg2.fxRender = self.postRender;
        cfg2.fxPostRender = p.postRender;
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
       // console.error('boo')

    };

    p.postRender = function postRender(a,b,c) {
        self.data.ui.data.ui
        //console.error('...8888',a,b,c)
        var ui = self.data.ui.data.ui;
        var v = self.settings.itemData
        //debugger;
        ui.find('#labelName').text(v)
        ui.find('#txtInput').val(v)

        //self.data.ui.bind('#txtInput')

        self.data.ui.bind({id:'#txtInput',key:'txtVal'})
        self.data.ui.pushVal({id:'#labelNameEcho',key:'txtVal'})



    }

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

