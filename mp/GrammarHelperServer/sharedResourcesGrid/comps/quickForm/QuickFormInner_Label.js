/**
 * Created by user1 on 10/2/2017.
 */

function QuickFormInner_Label() {
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
        cfg2.fileName = 'quickForm/quickFormInner_Label.html'
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

    p.renderUI = function renderUI(a,b,c) {
        self.data.ui.data.ui
        //console.error('...8888',a,b,c)
        var ui = self.data.ui.data.ui;
        var itemData = self.settings.itemData
        var val = itemData.defaultValue;
        if (itemData.value) {
            val = itemData.value;
        }
      //debugger;
        ui.find('#labelName').text(val)
        ui.find('#txtInput').val(val)
        ui.find('#txtInput').text(val)
    }

    p.postRender = function postRender(a,b,c) {

        self.renderUI();

        self.data.ui.bind({id:'#txtInput',key:'txtVal'})
        self.data.ui.bind({id:'#txtInput',key:'data'})
        self.data.ui.pushVal({id:'#labelNameEcho',key:'txtVal'})



    }

    p.utils = {};
    p.utils.resetSearchId = function resetSearchId() {
        self.data.searchActive = false;
        self.data.searchId = null;
    }

}
