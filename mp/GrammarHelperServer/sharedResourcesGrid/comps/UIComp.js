/**
 * Created by user1 on 10/2/2017.
 */

function UIComp(__parent) {
    var self = this;
    var p = this;
    self.data = {};

    self.settings = {};
    self.settings.pageSize = 5;


    p.init = function init(cfg) {
        cfg = sh.dv(cfg)
        self.settings = cfg;

        self.data.subItems = [];
        self.data.configs = [];
        self.data.bindingsPull = [];
        self.data.bindingsPush = []
        self.data.callWhenFx = [];
        self.data.self = __parent

        if (cfg.parent) {

        }


        if (__parent) {
            var clazz = __parent.__proto__.constructor.name;
            window.compList = sh.dv(window.compList, {})
            var comp = window.compList[clazz]
            if (comp == null) {
                comp = {name: clazz, instances: []};
                window.compList[clazz] = comp
            }
            comp.instances.push(self)
        }
    }

    p.loadTemplate = function loadTemplate(query) {
        sh.cid(self.settings.fxRender)
    };

    p.preloadTemplateContent = function preloadTemplateContent() {
        self.loadTemplateContent(null, true);
    }

    p.loadTemplateContent = function loadTemplateContent(fx, preload) {
        // return;
        var cfg = {}
        cfg = u.copyNonObjProps(self.settings)
        u.copyObjProps(self.settings, cfg);

        cfg.baseUI = self.settings.baseUI;
        cfg.parentUI = self.settings.parentUI;

        cfg.preload = preload;
        if (self.data.preloadedTemplate != null) {
            cfg.preloadedTemplate = self.data.preloadedTemplate
        }
        cfg.preloadedTemplate_StoreOn = self.data;
        //cfg.div = '.modal-contact .content'
        // cfg.append = true
        // cfg.divCreatable = u.join2('holder', self.settings.id)
        cfg.id = self.settings.targetId;
        if (self.settings.divMakeIfNotFound) {
            if ($(self.settings.div).length == 0) {
                var div = u.tag('div')
                var divId = self.settings.div;
                divId = divId.replace('#', '')
                u.id(divId)
                $('body').append(div)
            }
        }
        else if (self.settings.div) {
            cfg.div = self.settings.div; //set target div
        }
        else if (self.settings.appendToDiv) {
            cfg.div = self.settings.appendToDiv; //set target div
            cfg.append = true;
        }
        //cfg.url = "/themes/minimal_v0" + "/js/comps/simpleList.html"
        cfg.url = '/grid/grid/sharedResourcesGrid/' + 'comps/' + self.settings.fileName;
        //simpleList.html'
        //console.log('log', '...', document.currentScript)
        //debugger
        cfg.fxDone = function fxDoneRender(data, body, cfg) {
            //var ui = $(data);
            //debugger
            if (self.settings.updateComp != false && cfg.ui) {
                var qc = new QuickUIConvertor();
                //qc.settings.doNotModify = true;
                if (cfg.ui.length == 0) {
                    // debugger
                    cfg.ui = $(cfg.newHTML); //why was this not converted?
                }
                qc.processDefaults(cfg.ui)
            }
            self.data.ui = cfg.ui;
            sh.cid(fx, self);

            if (self.settings.parentUI) {
                var ui = $(data);
                if (self.settings.updateComp != false) {
                    //var m = new Morpher()
                    //var cfg = {}
                    //cfg.div = ui

                    var qc = new QuickUIConvertor();
                    qc.settings.doNotModify = true;
                    // var ui = $(self.settings.div);
                    qc.processDefaults(ui)

                    // m.init(cfg)
                    // m.render();
                }
                self.data.ui = ui;
                self.settings.parentUI.append(ui)
                /*
                 if ( self.settings.updateComp != false ) {
                 var qc = new QuickUIConvertor();
                 qc.settings.doNotModify = true;
                 qc.processDefaults(ui)
                 }*/

            }
            /* var ui = $(html);
             debugger;
             ui.find('#labelName').text(v)

             listContents.append(ui)*/

            sh.cid(self.settings.fxPostRender, data, body, cfg)
            sh.cid(self.settings.fxPostRender2, data, body, cfg)

            self.calcBindings(false)
            self.updatePushBindings()
        }
        cfg.replaceThis = self.settings.replaceThis;
        cfg.withThis = self.settings.id;
        uiUtils.utils.loadPage(cfg)
    }

    p.render = function render(query) {
        sh.cid(self.settings.fxRender)
    };

    function defineUtils() {
        p.utils = {};
        p.utils.resetSearchId = function resetSearchId() {
            self.data.searchActive = false;
            self.data.searchId = null;
        }
        p.utils.cloneConfig = p.cloneConfig = function cloneConfig(cfg) {
            var cfg2 = u.clone(cfg)
            /*sh.each(cfg, function copyCertainProps(k,v) {
             if ( $.isFunction(v)) return;
             if ( $.isObject(v)) {
             if ( v.jquery ) {
             cfg2[prop]=v; //copy?
             }
             }
             })*/
            if (cfg.div) {
                cfg2.div = cfg.div; //target div copy
            }
            u.copyPropIf = function copyPropIf(c, c2, prop, doNotForce) {
                var val = c[prop]
                var oldVal = c2[prop]
                if (val == null) {
                    return null
                }
                if (doNotForce && oldVal) {
                    return oldVal
                }

                c2[prop] = val;
                return val;
            }
            u.copyPropIf(cfg, cfg2, 'appendToDiv')
            return cfg2;
        }
    }

    defineUtils();

    p.setText = function setText(id, val) {
        var ui = self.data.ui.find(id)
        u.setText(ui, val)
    }


    function defineClick() {
        p.addClickToDom = function addClickToDom(ui, self) {
            var click = ui.find('[ng-click]')
            $.each(click, function on(k, v) {
                var ui = $(v)
                var ng = ui.attr('ng-click')
                var fx = self[ng]
                //debugger
                v.onclick = function onClick() {
                    var dbg = [self, ng]
                    eval('self.' + ng)
                } //fx;
                //console.log('....', ng)
            })
        }
        p.ifSetText = function ifSetText(val, id, hideIfFalse) {
            //self.data.self
            var ui = self.data.ui.find(id)
            if (val == null) {
                val = '';
            }
            ui.text(val)
            if (val == null || val == '') {
                if (hideIfFalse) {
                    ui.hide();
                }
            }
        }
        p.showIf = function showIf(showHide, id) {
            //self.data.self
            var ui = self.data.ui.find(id)
            if (showHide == null) {
                showHide = false;
            }
            if (showHide == true) {
                ui.show();
            } else {
                ui.hide();
            }
        }
    }

    defineClick();

    function defineBindings() {
        p.copyValToData = p.bind = function bind_copyValTo(cfg) {
            // var cfg = {}
            // cfg.a = a
            // cfg.propName = propName
            cfg.type = 'copyValTo'
            cfg.ui = self.data.ui.find(cfg.id)
            self.data.bindingsPull.push(cfg)
            cfg.isRadio = cfg.ui.is('input[type=radio]')
            //  debugger
            u.addChange(cfg.ui, function onUpdated(val) {
                console.debug('watching', cfg, val)
                self.calcBindings(true);
                if (self.data.parentUI) {
                    debugger
                    self.data.parentUIComp.data.ui.childCompChanged()
                }
            })
        }

        p.pushVal = function pushVal(cfg) {
            // var cfg = {}
            // cfg.a = a
            // cfg.propName = propName
            if (cfg.type == null) {
                cfg.type = 'pushValTo'
            }
            if ( cfg.id ) {
                cfg.ui = self.data.ui.find(cfg.id)
                if ( cfg.ui.length == 0 ){
                    sh.throw('not valid', cfg.id)
                }
            }
            //debugger
            self.data.bindingsPush.push(cfg)
            //debugger
            /* u.addChange(cfg.ui, function onUpdated(val) {
             console.debug('watching', a, val)
             self.calcBindings(true);
             if ( self.data.parentUI ) {
             debugger
             self.data.parentUIComp.data.ui.childCompChanged()
             }
             })*/
        }

        p.callWhenChangedUIDataChanged = function callWhenChangedUIDataChanged(fx) {

            self.data.callWhenFx.push(fx)

        }

        p.remove = function remove() {

        }

        p.calcBindings = function calcBindings(procChildren) {
            $.each(self.data.bindingsPull, function on(k, v) {
                //v.calcBindings()
                if (v.type == 'copyValTo') {
                    var ui = v.ui
                    var val = ui.val();
                    if (v.isRadio) {
                        val = self.data.ui.find(v.ui.selector + ':checked').val()
                    }
                    self.data[v.key] = val;

                }
            })
            if (procChildren != false) {
                $.each(self.data.subItems, function on(k, v) {
                    v.data.ui.calcBindings()
                    v.data.ui.updatePushBindings();
                })
            }
            self.updatePushBindings()
            self.updateParent();
        }


        p.updatePushBindings = function updatePushBindings() {
            //debugger
            $.each(self.data.bindingsPush, function on(k, v) {
                if (v.type == 'pushValTo') {
                    //debugger
                    var ui = v.ui;
                    var val = self.data[v.key]
                    if (v.eval) {
                        val = eval(v)
                    }
                    u.setText(ui, val)
                }
                if (v.type == 'rake') {
                    //  debugger

                    var items = []
                    var vals = [];
                    $.each(self.data.subItems, function on(k, subItem) {
                        vals.push(subItem.data.ui.data[v.key])
                        items.push(subItem)
                    })
                    val = vals.join(', ')
                    //var val =  self.data[v.a]
                    if (v.eval) {
                        val = eval(v)
                    }
                    if (v.fxProcessBinding) {
                        v.fxProcessBinding(items, self)
                    }
                    //console.error('y', v.ui)
                    if ( v.ui ) {
                        u.setText(v.ui, val)
                    }
                }

                if (v.storeOnData) {
                    self.data[v.storeOnData] = val;
                }
            })
            //self.updatePushBindings();

            $.each(self.data.callWhenFx, function onK(k, fx) {
                fx(self)
            })

        }

        p.updateParent = function updateParent() {
            if (self.settings.parent) {
                self.settings.parent.data.ui.updatePushBindings()
            }
        }
    }

    defineBindings()

}

UIComp.copyCfg = function copyCfg(cfg, cfg2) {
    if (cfg2 == null) {
        cfg2 = {}
    }
    u.copyNonObjProps(cfg, cfg2);
    u.copyObjProps(cfg, cfg2);
    //u.copyObjProps(  cfg, cfg2)

    cfg2.baseUI = cfg.baseUI
    cfg2.parentUI = cfg.parentUI;
    cfg2.parent = cfg.parent;

    return cfg2;
}