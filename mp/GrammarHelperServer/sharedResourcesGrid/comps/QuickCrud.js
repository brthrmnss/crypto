/**
 * Created by user1 on 10/2/2017.
 */

/*function RestHelper() {
 var p = RestHelper.prototype;
 p = this;
 var self = this;
 p.method1 = function method1(url, appCode) {
 }

 p.proc = function debugLogger() {
 if ( self.silent == true) {
 return
 }
 sh.sLog(arguments)
 }
 }*/

function QuickCrud() {
    var self = this;
    var p = this;
    self.data = {};

    self.settings = {};

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

        //self.settings = cfg;

        // return;
        self.data.ui = new UIComp(self);
        var cfg2 = self.data.ui.cloneConfig(cfg)
        cfg2.fileName = 'quickCrud.html';
        //cfg2.fxPostRender = self.render;
        cfg2.fxPostRender = self.postRender;
        self.data.ui.init(cfg2);
        self.render();


        var restHelper = new QRestHelper();
        restHelper.config = {};
        restHelper.config.baseUrl = 'http://localhost:6016' + '/api/prompts/'
        self.data.restHelper = restHelper;
        //count'
        restHelper.init(restHelper.config);
        restHelper.getQList(function on(items) {
            console.log('yyy', 'dfsdf', items)
            $.each(items, function onK(k, item) {
                if (self.settings.fxGetItems) {
                    self.settings.fxGetItems(item)
                }
            })


        })
        restHelper.createQItem({'name': 'boom'},
            function oncreatedItem(createdItem) {
                console.log('what is createdItem', createdItem)
            })
        restHelper.countQItem(function onCount(count) {
            console.log('what is count', count)
        })
        restHelper.updateQItem(
            {id: 1, 'name': 'boom' + (new Date().toString())},
            function onUpdatedItem(createdItem) {
                console.log('what is updatedItem', createdItem)
            })

        restHelper.deleteQItem({id: 2, 'name': 'boom'}, function onDeleteItem(deleteItem) {
            console.log('what is deleteItem', deleteItem)

            restHelper.createQItem(
                {id: 2, 'name': 'boom'},
                function onCreatedQItem(createdItem) {
                    console.log('what is createQItem', createdItem)

                    restHelper.deleteQItem({id: 2, 'name': 'boom'}, function onDeleteItem(deleteItem) {
                        console.log('what is deleteItem', deleteItem)
                    })
                })

        })
        //  restHelper.updateQItem({})
        //  restHelper.deleteQItem({})

    }

    p.render = function render(query) {
        sh.cid(self.settings.fxRender)
        self.data.ui.loadTemplateContent();
    };


    p.postRender = function postRender(data, body, cfg) {
        var ui = cfg.ui;

        self.data.ui.addClickToDom(ui, self)
        var dbg = [cfg.ui.find('#quickFormHolder')]
        var opts = QuickForm.createQF('name', cfg.ui.find('#quickFormHolder'))
       // opts.qfH.addTextInput('name', 'Prompt Name');
       // opts.qfH.form =  self.settings.quickForm.form
        opts.qfConfig =  self.settings.quickForm
        self.data.qf = opts.qf;
       // debugger

        var scfg = SimpleListHelper.createSimpleList('qcrud_list', 'qcrud_list')// cfg.ui.find('#demoList'))
        scfg.targetId = '#quickListHolder'
        scfg.div = cfg.ui.find('#quickListHolder')
        scfg.id = 'quickListHolder';
        scfg.idPartial = ui.find('#qcrud_list_partial')

        if (self.settings.divPartial) {
            scfg.idPartial = $(self.settings.divPartial)
            //debugger
        }

        scfg.fxProcessItem = self.settings.fxProcessItem
        scfg.fxProcessItem2 = function fxProcessItem2(item) {
           if ( self.data.currentItem == null ) {
               self.data.currentItem = item;
             //  return;
              // debugger
               opts.qf.loadObject(item);
           }
        }
        scfg.clickRouter = self.settings.clickRouter
        scfg.valueNames = ['id']
        scfg.searchUrl = self.data.restHelper.config.baseUrl;
        scfg.live = true;


        //debugger
        /*
         self.data.ui.pushVal({type:'rake', key:'txtVal', id:'#dbgRake',
         fxProcessBinding:function onProc(subItems, uiComp) {
         var formObject = {};
         $.each(subItems, function on(k, subItem) {
         formObject[subItem.settings.field]=subItem.data.ui.data.data;
         // debugger
         })
         self.data.formObject = formObject;
         },
         storeOnData:'formObject'})
         */
        //pus to some debug area

        console.log('confg', self.settings)

        uiUtils.ifShow(self.settings.showDebug, cfg.ui.find('#containerDbgPanel'))
        uiUtils.ifShow(self.settings.showCancelButton, cfg.ui.find('#btnCancel'))

    };


    p.onSave = function onSave() {
        console.log('on save', self.data.formObject)
        sh.cid(self.settings.fxSave, self.data.formObject, self)
    }


    p.onCancel = function onCancel() {
        sh.cid(self.settings.fxCancel)
    }

    p.utils = {};

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
QuickCrud.types = types;

function QuickCrudConfigHelper(cfg) {
    var self = this;
    var p = self;
    self.data = {};
    self.data.config = {}
    self.config = self.data.config;
    self.config.areas = {};

    p.init = function init(cfg) {
        var base = new BaseUIConfig(self.config);
        self.uiConfig = base;

        var qf = new QuickFormConfigHelper();
        qf.uiConfig.targetDiv(cfg.ui.find('#quickFormHolder'))
        qf.uiConfig.fxInit(function onxInit() {
            console.log('on built')
        })
        var formObject2 = {};
        qf.loadForm(formObject2)
        self.quickForm = qf;
    }
    self.init(cfg);

    self.types = types;

    //console.error('dfddf---3')
    p.init = function init() {

    };


    function defineHelpers() {

        p.addRestHelper = function addRestHelper(url, name) {
            self.restHelper = new RestHelper();
        };
        p.addClick = function addClick(cssClassName, fx) {
            self.clickRouter = sh.dv(self.clickRouter, {})
            self.clickRouter[cssClassName] = fx;
        };

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



