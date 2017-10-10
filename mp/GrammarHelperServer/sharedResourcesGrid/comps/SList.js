/**
 * Created by user1 on 10/2/2017.
 */

function SList() {
    var self = this;
    var p = this;
    self.data = {};

    self.settings = {};
    self.settings.pageSize = 5;

    p.init = function init(cfg) {
        cfg = sh.dv(cfg);
        self.settings = cfg;


        self.data.ui = new UIComp();
        var cfg2 = u.clone(cfg);
        cfg2.fileName = 'slist.html';
        //cfg2.fxPostRender = self.render;
        cfg2.fxPostRender = self.postRender;
        self.data.ui.init(cfg2);
        //self.render();


        var i = new self.settings.comp;
        var cfg = {};
        cfg.fxPreloadTemplate = function fxPreloadTemplate(cfg2) {
            //console.error('plreaded inner template', cfg.preload)
            self.data.cfg2 = cfg2;
            self.render();
        }
        cfg.preload = true;
        i.init(cfg)



    }

    p.render = function render(query) {
        sh.cid(self.settings.fxRender)
        self.data.ui.loadTemplateContent();
    };


    p.postRender = function postRender(data, body, cfg) {
        //debugger
        var listContents = cfg.ui.find('#listContents')
        $.each(self.settings.list, function on(k, v) {
            // var div = u.tag('div');
            var i = new self.settings.comp;
            var cfg  = u.clone(self.data.cfg2)

            UIComp.copyCfg(  self.data.cfg2, cfg)
            cfg.itemData = v;
            cfg.preload = null;
            //u.copyObjProps(self.data.cfg2, cfg);
            cfg.baseUI = listContents
            cfg.fxPostRender = function fxPostRender(html) {
               /* var ui = $(html);
                debugger;
                ui.find('#labelName').text(v)

                listContents.append(ui)*/
            }
            cfg.parentUI = listContents;
            cfg.parent = self;
            i.init(cfg)
            self.data.ui.data.subItems.push(i)
            self.data.ui.data.configs.push(cfg)
            //listContents.append(div)
        })
        self.data.ui.pushVal({type:'rake', key:'txtVal', id:'#txtTxtVals'})
    };


    p.utils = {};
    p.utils.resetSearchId = function resetSearchId() {
        self.data.searchActive = false;
        self.data.searchId = null;
    }

}

