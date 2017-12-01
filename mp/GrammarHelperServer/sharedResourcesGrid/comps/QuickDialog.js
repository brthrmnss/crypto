/**
 * Created by user1 on 10/2/2017.
 */

function QuickDialog() {
    var self = this;
    var p = this;
    self.data = {};

    self.settings = {};
    self.settings.pageSize = 5;

    p.init = function init(cfg) {
        var cfgOrig = cfg;
        cfg = sh.dv(cfg);

        self.settings = cfg;
        //debugger
        if (cfg.uiConfig) {
            cfg = cfg.uiConfig.config;
        }
        if (cfg.config) {
            cfg = cfg.config;
        }

        self.settings = cfg;

        // return;
        self.data.ui = new UIComp(self);
        var cfg2 = u.clone(cfg);
        cfg2.fileName = 'quickDialog.html';
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
        var ui = cfg.ui;
        // var formContents = cfg.ui.find('#quickDialogContent')
        //  self.data.ui

        self.data.ui.addClickToDom(ui, self)
        self.data.ui.ifSetText(self.settings.title, '#dialogTitle')
        self.data.ui.ifSetText(self.settings.content, '#dialogContent')
        self.data.ui.data.ui.hide();
        // debugger
        /*self.data.ui.pushVal({
            type: 'rake', key: 'txtVal', id: '#dbgRake',
            fxProcessBinding: function onProc(subItems, uiComp) {
                var formObject = {};
                $.each(subItems, function on(k, subItem) {
                    formObject[subItem.settings.field] = subItem.data.ui.data.data;
                    // debugger
                })
                self.data.formObject = formObject;
            },
            storeOnData: 'formObject'
        })
*/

        //pus to some debug area

        uiUtils.ifShow(self.settings.showDebug, cfg.ui.find('#containerDbgPanel'))
        uiUtils.ifShow(self.settings.showCancelButton, cfg.ui.find('#btnCancel'))

        if (self.settings.modal) {
            self.settings.showOptions = sh.dv(self.settings.showOptions, true)
        }
        uiUtils.ifShow(self.settings.showOptions, cfg.ui.find('.optionsBar'))


        u.last(ui)
        u.makeAbs()
        ui.css('top', '50%');
        ui.css('left', '50%');
        ui.css('transform', 'translate(-50%, -50%)');
        ui.css('position', 'absolute');
        ui.css('z-index', '1001');
        if (self.settings.position == 'br') {
            u.position(null, null, 20, 20)
        }
        if (self.settings.doNotAddStyle != true) {
            ui.css('background-color', '#f2f2f2');
            ui.css('padding', '10px');
            ui.css('border', '1px #666666 solid');
        }

        if (self.settings.modal) {


            //u.center()
            //uiUtils.addDialog({ui:ui,append:false})


            var modal = $('#dialogModal');

            if (modal.length == 0) {
                var ui = u.tag('div')
                ui.hide();
                uiUtils.wH100('100%', '100%')
                u.bg('#668B8B')
                ui.css('opacity', 0.7)
                ui.css('min-width', 150)
                ui.css('min-height', 120)
                u.id('dialogModal')
                u.makeAbs()
                modal = ui;
                $('body').append(ui)

                modal.click(function onClickModalDialog() {
                    console.log('ok')
                    if (QuickDialog.lastModalDialog) {
                        QuickDialog.lastModalDialog.closeDialog()
                        QuickDialog.lastModalDialog = null;
                    }
                })
            }
            self.data.modal = ui;
            //self.data.ui = cfg.ui
        }


    };


    p.open = p.openDialog = function openDialog(toggle, title, content) {
        if (toggle != false && self.data.opened) {
            self.closeDialog()
            return;
        }
        if (title) {
            self.settings.title = title;
            self.data.ui.ifSetText(self.settings.title, '#dialogTitle')
        }
        if (content) {
            self.settings.content = content;
            self.data.ui.ifSetText(self.settings.content, '#dialogContent')
        }
        if (self.settings.modal) {
            $('#dialogModal').show();
            QuickDialog.lastModalDialog = self;
        }
        uiUtils.ifShow(false, self.data.ui.data.ui.find('.btnCancel'))
        // self.data.ui.show()
        self.data.ui.data.ui.show();
        console.log('ok', self.data.ui)
        self.data.opened = true;
        /*if () {

         }*/
    }

    p.openTimedDialog = function openConfirmDialog(content, title, time) {
        time = sh.dv(time, 5)
        //if (title) {
            self.settings.title = title;
            self.data.ui.ifSetText(self.settings.title, '#dialogTitle', true)
       // }
        if (content) {
            self.settings.content = content;
            self.data.ui.ifSetText(self.settings.content, '#dialogContent')
        }
        self.data.ui.showIf(false, '.optionsBar')
        var openedToken = self.data.openedToken = Math.random();
        setTimeout(function onHide() {
            if (self.data.openedToken != openedToken) {
                return
            }
            self.closeDialog()

        }, time * 1000)

        self.data.ui.data.ui.show();
        console.log('ok', self.data.ui)
        self.data.opened = true;
    }

    p.openConfirmDialog = function openConfirmDialog() {

    }
    p.close = p.closeDialog = function closeDialog() {
        if (self.settings.modal) {
            $('#dialogModal').hide();
            QuickDialog.lastModalDialog = null;
        }
        self.data.ui.data.ui.hide();
        self.data.opened = false
        //self.data.ui.hide()

    }
    p.onSave = function onSave() {
        console.log('on save', self.data.formObject)
        sh.cid(self.settings.fxSave, self)
    }

    p.onCancelDialog = function onCancelDialog() {
        sh.cid(self.settings.fxCancel)
        self.closeDialog()
    }
    p.onOkDialog = function onOkDialog() {
        sh.cid(self.settings.fxOk)
        self.closeDialog()
    }

    p.utils = {};

}

QuickDialog.newAlert = function newAlert(title, content) {
    var qdc = new QuickDialogConfigHelper();
    //qdc.topForm()
    //qdc.uiConfig.targetDiv('body')
    qdc.uiConfig.fxInit(function onxInit() {
       // console.log('on built')
    })
    //qdc.dialogBr();
    var i = new QuickDialog();
    title = sh.dv(title, 'alert')
    title = sh.dv(title, 'content message')
    if ( title||content) {
        qdc.setDialogText(title, content)
    }
    setTimeout(function k() {
        i.init(qdc)
    }, 250)
    var yyy = {}
    yyy.qdc = qdc;
    yyy.dialog = i
    return yyy
}
QuickDialog.newModalDialog = function newModalDialog(title, content) {
    var qdc = new QuickDialogConfigHelper();

    qdc.modalDialog()
    qdc.centerDialog();

    //qdc.topForm()
    //qdc.uiConfig.targetDiv('body')
    qdc.uiConfig.fxInit(function onxInit() {
       // console.log('on built')
    })
    //qdc.dialogBr();
    var i = new QuickDialog();

    title = sh.dv(title, 'alert')
    title = sh.dv(title, 'content message')
    if ( title||content) {
        qdc.setDialogText(title, content)
    }
    setTimeout(function k() {
        i.init(qdc)
    }, 250)
    var yyy = {}
    yyy.qdc = qdc;
    yyy.dialog = i
    return yyy
}
QuickDialog.brAlert = function brAlert(title, content) {
    var qdc = new QuickDialogConfigHelper();
    //qdc.topForm()
    //qdc.uiConfig.targetDiv('body')
    qdc.uiConfig.fxInit(function onxInit() {
       // console.log('on built')
    })
    qdc.dialogBr();
    var i = new QuickDialog();
    if ( title||content) {
        qdc.setDialogText(title, content)
    }

    i.init(qdc)

    setTimeout(function k() {
        i.init(qdc)
    }, 250)
    var yyy = {}
    yyy.qdc = qdc;
    yyy.dialog = i
    return yyy
}

var types = {}
types.textArea = 'textarea';
types.textarea = types.textArea;
types.br = 'br';
//types.textArea = 'text'
types.input = 'input';
types.radio = 'radio';
types.checkbox = 'checkbox';
types.boolean = 'boolean';
types.select = 'select'
types.tasklist = 'tasklist';
types.number = 'number';
types.stepper = 'stepper';
types.lbl = 'label';
types.label = 'label'
types.button = 'button';
types.buttonroll = 'buttonroll';
types.hr = 'hr';
types.hider = 'hider';
types.hiderClose = 'hiderClose';
QuickDialog.types = types;

function QuickDialogConfigHelper() {
    var self = this;
    var p = self;
    self.data = {};
    self.data.config = {}
    self.config = self.data.config;
    self.config.areas = {};

    p.init = function init() {
        var base = new BaseUIConfig(self.config);
        self.uiConfig = base;
        self.config.appendToDiv = $('body');

    }
    self.init();

    self.types = types;

    function defineElements() {
        p.modalDialog = function modalDialog(lbl, hr) {
            self.config.modal = true;
        }
        p.dialogBr = function dialogBr(lbl, hr) {
            self.config.position = 'br'
        }
        p.setDialogText = function setDialogText(title, text) {
            self.config.title = title;
            self.config.content = text;
        }
        p.centerDialog = function centerDialog(lbl, hr) {
            self.config.centerDialog = true;
        }
        p.targetLevel = function targetLevel(div, hr) {
            self.config.div = div
        }




    };
    defineElements();

    function defineHelpers() {
        p.addAuto = function addAuto(obj, name) {
            if (self.showIf != null) {
                obj.showIf = self.showIf.concat();
            }
            ;
            self.lastFieldName = name;
            self.lastField = obj;
        };

        p.addSection = function addSection(fx) {
            self.utils.clearAllAutos();
            fx();
            self.utils.clearAllAutos();
        };

        p.loadForm = function loadForm(newForm, dataObject, cfg) {
            //why: init with seperate object, form and data are on object
            self.formLoaded = true
            newForm = sh.dv(newForm, {})
            dataObject = sh.dv(dataObject, {})
            self.form = newForm;
            self.data = dataObject;
            if (cfg == null) {
                cfg = sh.dv(cfg, {})
            }
            self.config = cfg;
            self.loadConfig(cfg)
            self.config.formObject = newForm;
            self.config.dataObject = dataObject;
            self.utils.clearAllAutos();

        };

        p.loadConfig = function loadConfig(cfg) {
            self.config = cfg;
            if (self.formLoaded == false) {
                self.loadForm({}, {}, cfg)
                return;
            }
            if (self.config.pubSub == null) {
                defineEvents(cfg)
            }
        };


        p.onFieldChanged = function onFieldChanged(fieldName, fx, data) {
            self.config.onFieldChanged(fieldName, fx, data)
        }
        p.globalChangeHandler = function globalChangeHandler(v) {
            //why: when a ny value changed
            self.lastField.fxChange = v;
        };

        p.fxAnyChange = function fxAnyChange(v) {
            //why: when a ny value changed
            self.config.fxChange = v;
        };

        p.loadData = function loadData(data) {
            self.data = data;
        };

        p.mixLast = function mixLast(mixin) {
            sh.each(mixin, function (k, v) {
                self.lastField[k] = v;
            });
        };

        p.listenForChange = function listenForChange(fx) {

        }

        p.defaultValue = function dv(v) {
            self.lastField.defaultValue = v;
        };

        p.setValue = function setValue(v) {
            self.data[self.lastFieldName] = v;
        };

        p.temp = function temp() {
            self.lastField.temp = true;
        }
    };
    defineHelpers();

    function defineValidations() {
        p.required = function required(requiredMsg) {
            self.lastField.required = true;
            self.lastField.requiredMsg = requiredMsg;
            return self;
        }
        p.lengths = function lengths(obj) {
            self.lastField.required = true;
            return self;
        }
    };
    defineValidations();

    /**
     * Modify the code
     */
    function defineModifiers() {
        /**
         * Set last field as transient,
         * it will not be serialized
         */
        p.transient = function () {
            self.lastField.transient = true;
            return self;
        };
        p.uiOnly = p.transient;

        p.desc = function desc(desc, tooltip) {
            self.lastField.desc = desc;
            self.lastField.tooltip = tooltip;
            return self;
        }

        p.placeholder = function placeholder(desc, tooltip) {
            self.lastField.desc = desc;
            self.lastField.tooltip = tooltip;
            return self;
        }


        p.addClass = function addClass(addClasses) {
            self.lastField.classes = sh.dv(self.lastField.classes, '');
            self.lastField.classes += addClasses;
            return self;
        }

        p.addColor = function addColor(color) {
            self.lastField.color = color;
            return self;
        }

        /* p.addShowIf = function  addShowIf (property, val) {
         self.showIf = [self.utils.showIf(property, val)]
         return self;
         };*/

        p.addShowIf = function addShowIf(key, val) {
            var actionStr = '';
            if (val == null) {
                actionStr = val; //assume dev made  custom action
            } else {
                actionStr = 'object.' + key + '==' + sh.q(val);
            }
            console.debug('addshow if', actionStr)
            self.showIf = sh.dv(self.showIf, [])
            self.showIf.push(actionStr)
            return self;
        }

        p.addLastShowIf = function addLastShowIf(property, val) {
            sh.array.push(self.lastField.showIf,
                self.utils.showIf(property, sh.q(val)));
            return self;
        };

        p.addHelp = function addHelp(helpMsg) {
            //self.lastField.help = [];
            self.lastField.help =
                sh.array.push(self.lastField.help, helpMsg);
        }
        p.debugConditionals = function debugConditionals() {
            self.lastField.debugConditionals = true;
        }
    };
    defineModifiers();

    function defineUtils() {
        p.utils = {};
        p.utils.clearAllAutos = function clearAllAutos() {
            self.showIf = null;
            self.hideIf = null;
        };
        p.utils.makeRandom = function makeRandom() {
            return sh.randomizeInt(3);
        };
        p.utils.inputType = function inputType(fieldInfo) {
            var type = fieldInfo.type
            if (types.nonInputTypes.indexOf(type) != -1)
                return false
            return true;
        };

        p.utils.showIf = function showIf(property, val) {
            var val = val;
            if (val == true || val == false) {
            }
            else {
                val = sh.q(val)
            }
            return 'object.' + property + '==' + val;
        };

        p.utils.mergeValuePairs = function mergeValuePairs(op1, op2) {
            if (op2 == null) {
                return op1;
            }
            var merged = [];
            sh.each(op1, function proc(i, obj) {
                merged.push({name: obj, value: op2[i]})
            });

            return merged;
        };

        p.utils.convertObjectToArrayOfNameValuePairs =
            function convertObjectToArrayOfNameValuePairs(obj) {
                var optionList = [];
                sh.each(obj, function proc(k, v) {
                    optionList.push({name: k, value: v})
                });
                return optionList;
            };


        //self.utils = utils;
        p.utils.getObjectValues = function getObjectValues(a) {
            return Object.keys(a).map(function (key) {
                return a[key]
            });
        };


        p.utils.clearTemps = function () {
            var data = {};
            sh.each(self.form, function goThgouthFields(index, field) {
                if (field.temp == true) {
                    if (self.data != null) {
                        data[field.label] = self.data[index]
                    }
                    delete self.form[index];
                }
            });

            return data;
        }


        p.utils.flattenJSON = function flattenJSON(json) {
            if (json == null)
                return '';
            var flat = '';
            sh.each(json, function goThgouthFields(k, v) {
                if (v == null) {
                    return;
                }
                v = sh.dv(v, '');
                flat += k + ':' + '\n'
                flat += v + '\n'
            });

            return flat;
        }


        p.utils.findInDict = function findInDict(findVal, dict1, dict2) {
            var foundKey = null
            var foundVal = null;
            sh.each(dict1, function findMatch(k, v) {
                if (v == findVal) {
                    foundKey = k;
                    foundVal = dict2[foundKey]
                    return false;
                }
            })

            //debugger;
            return foundVal;
        }
    };
    defineUtils();

    /**
     * Gives event functionality to config object
     * @param config
     */
    function defineEvents(config) {
        config.pubSub = new PubSub();
        /*if ( config.utils == null ) {
         config.utils = {};
         }*/
        config.events = {};
        var events = config.events;
        var types = config.events.types = {};

        events.onClick = function onClickDispatch(field, value, fieldInfo, object) {
            config.pubSub.publish(
                types.clickedField(field), value, fieldInfo, object);
        };
        events.onChange = function onChangeDispatch(field, value) {
            config.pubSub.publish(
                types.changedField(field), value);
        };
        types.changedField = function (name) {
            return "changed_" + name;
        };
        types.clickedField = function (name) {
            return "clicked_" + name;
        };
        config.onFieldChanged = function onFieldChanged(fieldName, fx, data) {
            config.pubSub.subscribe(
                config.events.types.changedField(fieldName),
                fx);
        };
        config.onFieldClick = function onFieldClick(fieldName, fx, data) {
            config.pubSub.subscribe(
                config.events.types.clickedField(fieldName),
                fx);
        };
        config.events.onFieldChanged = config.onFieldChanged;

    }

    //defineEvents();

    p.new = function create() {
        return new QuickFormHelper(sh, pubSub);
    }


}



