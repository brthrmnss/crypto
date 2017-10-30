/**
 * Created by user1 on 10/2/2017.
 */

function QuickForm() {
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

        //self.settings = cfg;

        // return;
        self.data.ui = new UIComp(self);
        var cfg2 = self.data.ui.cloneConfig(cfg)
        cfg2.fileName = 'quickForm2.html';
        //cfg2.fxPostRender = self.render;
        cfg2.fxPostRender = self.postRender;
        self.data.ui.init(cfg2);
        self.render();

        var areaHelper = new AreaHelper(cfgOrig);
        self.areaHelper = areaHelper;

    }

    p.render = function render(query) {
        sh.cid(self.settings.fxRender)
        self.data.ui.loadTemplateContent();
    };


    p.postRender = function postRender(data, body, cfg) {
        var ui = cfg.ui;
        var formContents = cfg.ui.find('#quickFormContent')
        $.each(self.settings.form, function addEachItem(k, v) {
            var holderDiv = u.tag('div');
            formContents.append(holderDiv)
            var i = new QuickFormInner_TextInput(); //self.settings.comp;

            if ( v.type == QuickForm.types.radio ) {
                i = new QuickFormInner_Radio();
            }

            var cfg = u.clone(v)

            cfg.name = k;
            //UIComp.copyCfg(  self.data.cfg2, cfg)
            cfg.itemData = v;
            //cfg.preload = null;
            //u.copyObjProps(self.data.cfg2, cfg);
            cfg.noGet = true; // = 'none'
            cfg.fxPostRender2 = function fxPostRender(html, b, cfg) {
                //  var ui = $(html);
                var ui = cfg.ui;
               // debugger;
                // ui.find('#labelName').text(v)
                if ( self.settings.showLabels) {
                    holderDiv.append(k );//+ ':')
                    holderDiv.append(u.tag('br'))
                }

                holderDiv.append(ui)

                self.data.ui.data.subItems.push(i)
                self.data.ui.data.configs.push(cfg)

                if ( self.settings.showValues != true ) {
                    ui.find('#labelNameEcho').hide()
                }
            }


            //self.data.ui.addClickToDom(ui, self)

            //cfg.parentUI = formContents;
            cfg.parent = self;
            i.init(cfg)



            //listContents.append(div)
        })

        self.data.ui

        self.data.ui.addClickToDom(ui, self)

        if ( self.settings.showOutput ) {
            var storeDbgId = '#dbgRake'
            cfg.ui.find('#dbgRake').show()
        } else {
            cfg.ui.find('#dbgRake').hide()
        }
        // debugger
        self.data.ui.pushVal({type:'rake', key:'txtVal', id:storeDbgId,
            fxProcessBinding:function onProc(subItems, uiComp) {
                var formObject = {};
                $.each(subItems, function on(k, subItem) {
                    formObject[subItem.settings.field]=subItem.data.ui.data.data;
                   // debugger
                })
                self.data.formObject = formObject;
            },
            storeOnData:'formObject'})


        //pus to some debug area

        uiUtils.ifShow(self.settings.showDebug, cfg.ui.find('#containerDbgPanel'))
        uiUtils.ifShow(self.settings.showCancelButton, cfg.ui.find('#btnCancel'))

    };



    p.onSave = function onSave() {
        console.log('on save', self.data.formObject)
        sh.cid(self.settings.fxSave,  self.data.formObject, self)
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
QuickForm.types = types;

function QuickFormConfigHelper() {
    var self = this;
    var p = self;
    self.data = {};
    self.data.config = {}
    self.config = self.data.config;
    self.config.areas = {};

    p.init = function init() {
        var base = new BaseUIConfig(self.config);
        self.uiConfig = base;

    }
    self.init();

    p.addArea = function addARea(name, id) {
        if (id == null) {
            id = 'area_' + name;
        }
        if (id.includes('#') == false) {
            id = '#' + id;
        }
        var areaConfig = {};
        areaConfig.name = name;
        areaConfig.id = id;
        areaConfig.ui = $(id)
        if (areaConfig.ui == null) {
            console.warning('it is missing', areaConfig.id)
        }
        self.config.areas[name] = areaConfig;
        console.debug('adding an area info', name, id)
    }
    p.getArea = function getArea(name) {
        var area = self.config.areas[name];
        return area;
    }
    p.defaultArea = function defaultArea(name, id) {

        var defaultArea = self.config.areas[name];
        sh.throw = function (err) {
            throw new Error(err)
        }

        sh.throwIfNull = function throwIfNull(val, err) {
            if (val != null)
                return
            throw new Error(err)
        }

        sh.throwIfNull(defaultArea, 'Name is not valid default area');

        self.config.defaultAreaName = defaultArea.name;
        console.debug('adding defaultArea area', name, defaultArea.name);

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

    var nonInputTypes = [
        types.lbl,
        types.hr,
        types.hider,
        types.hiderClose
    ];
    types.nonInputTypes = nonInputTypes;

    /*      types.textArea = 'textarea'
     //types.textArea = 'text'
     types.input = 'input'
     types.radio = 'radio'
     types.checkbox = 'checkbox';
     types.boolean = 'boolean';
     types.select = 'select'
     types.number = 'number';
     types.stepper = 'stepper';
     types.lbl = 'label';
     types.label  = 'label'*/

    self.types = types;

    //console.error('dfddf---3')
    p.init = function init() {

    };
    function defineElements() {
        p.addLabel = function labl(lbl, hr) {
            hr = sh.dv(hr);
            var obj = {
                label: lbl,
                type: self.types.label,
                hr: hr
            }
            self.form['lbl_' + sh.randomizeInt(3)] = obj;
            self.addAuto(obj);
        }
        p.addLabelField = function addLabelField(prop, noGutterSpace) {
            noGutterSpace = sh.dv(noGutterSpace, true);
            var obj = {
                field: prop,
                type: self.types.label,
                reduceGutterSpace: noGutterSpace
            };
            self.form['lbl_' + sh.randomizeInt(3)] = obj;
            self.addAuto(obj);
        }

        p.addBr = function addBr(noGutterSpace) {
            noGutterSpace = sh.dv(noGutterSpace, true);
            var obj = {
                field: prop,
                type: self.types.br,
                reduceGutterSpace: noGutterSpace
            };
            self.form['br_' + sh.randomizeInt(3)] = obj;
            self.addAuto(obj);
        }

        p.addTextField = function addTextField(prop, label) {
            var obj = {
                label: label,
                field: prop,
                type: self.types.textarea
            };
            self.form[prop] = obj;
            self.addAuto(obj);
            return self;
        }
        p.addTextArea = p.addTextField;
        p.addTextInput = function addTextInput(prop, label) {
            var obj = {
                label: label,
                field: prop,
                type: self.types.input
            };
            self.form[prop] = obj;
            self.addAuto(obj);
            return self;
        }
        p.addInput = p.addTextInput;

        p.addButton = function addButton(name, fx, label,
                                         setProp, val) {
            var prop = name;
            label = sh.dv(label, name)
            var obj = {
                field: name,
                label: label,
                fx: fx,
                type: self.types.button,
                setProp: setProp,
                val: val
            };
            self.form[name] = obj;
            self.addAuto(obj);
            return self;
        }

        p.addCheckbox = function addCheckbox(name, label) {
            var obj = {
                label: label,
                type: self.types.checkbox//,
                //options: values
            };
            self.form[name] = obj;
            self.addAuto(obj);
            return self;
        };

        p.addHr = function addHr(name, label) {
            var name = 'hr_' + self.utils.makeRandom();
            var obj = {
                label: label,
                type: self.types.hr//,
                //options: values
            };
            self.form[name] = obj;
            self.addAuto(obj);
            return self;
        };

        p.addHider = function addHider(label) {
            var name = 'hider_' + self.utils.makeRandom();
            var obj = {
                label: label,
                type: self.types.hider
            };
            self.form[name] = obj;
            self.addAuto(obj);
            return self;
        };
        p.addHiderClose = function addHiderClose(label) {
            var name = 'hiderClose_' + self.utils.makeRandom();
            var obj = {
                label: label,
                type: self.types.hiderClose
            };
            self.form[name] = obj;
            self.addAuto(obj);
            return self;
        };


        p.addRadioGroup = function addRadioGroup(name, values, label) {
            var obj = {
                label: label,
                type: self.types.radio,
                options: values,
                field:name
            };
            self.form[name] = obj;
            self.addAuto(obj)
            return self;
        };

        p.addCheckboxGroup = function addCheckboxGroup(name, values, label) {
            var obj = {
                label: label,
                type: self.types.checkbox,
                options: values,
                field:name
            };
            self.form[name] = obj;
            self.addAuto(obj)
            return self;
        };


        p.addSelectList = function addSelectList(name, values, label, valueNames) {
            if (valueNames) {
                var options = self.utils.mergeValuePairs(values, valueNames);
            } else {
                if (sh.isObject(values)) {
                    options =
                        self.utils.convertObjectToArrayOfNameValuePairs(values)
                }
            }
            //debugger
            var obj = {
                label: label,
                type: self.types.select,
                options: options
            };
            self.form[name] = obj;
            self.addAuto(obj);
            return self;
        };

        p.addSelectList_FromObj = function addSelectList_FromObj(name, objectKV, label, defaultValue) {
            var options = self.utils.convertObjectToArrayOfNameValuePairs(objectKV);
            var obj = {
                label: label,
                defaultValue: defaultValue,
                type: self.types.select,
                options: options
            };
            self.form[name] = obj;
            self.addAuto(obj);
            return self;
        };

        p.addButtonRoll = function addButtonRoll(name, values,
                                                 label, colors,
                                                 multipleSelect) {
            var obj = {
                label: label,
                type: self.types.buttonroll,
                options: values,
                field: name,
                optionsColors: colors,
                multipleSelect: multipleSelect
            };
            if (angular.isFunction(values)) {
                obj.options = null;
                obj.fxOptions = values;
            }
            if (colors == true) {
                var arr = "#000000,#101416,#20292C,#303D42,#405259,#50676F,#607B85,#70909C,#80A4B2,#90B9C8,#A1CEDF,#A1CEDF,#AAD2E2,#B3D7E5,#BDDCE8,#C6E1EB,#D0E6EF,#D9EBF2,#E2F0F5,#ECF5F8,#F5FAFB,#FFFFFF"
                arr = arr.split(',').reverse();
                arr = arr.slice(3)
                obj.optionsColors = arr;
            }
            if (multipleSelect) {

            }
            self.form[name] = obj;
            self.addAuto(obj, name)
            return self;
        };


        p.addTasklist = function addTasklist(name, values, label, valueNames) {
            var options = self.utils.mergeValuePairs(values, valueNames);
            var obj = {
                label: label,
                type: self.types.tasklist,
                options: options
            };
            self.form[name] = obj;
            self.addAuto(obj);
            return self;
        };
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



QuickForm.createQF = function createQF(name, div){
    var opts = {};

    var qf = new QuickFormConfigHelper();
    qf.uiConfig.targetDiv(div)
    qf.uiConfig.fxInit(function onxInit() {
        console.log('on built')
    })
    /*  qNC.addArea('login', 'areaLogin');
     qNC.defaultArea('login');
     qNC.addArea('list')
     qNC.addArea('edit')*/
    var formObject2 = {};
    qf.loadForm(formObject2)

    /*qf.addTextInput('name', 'Prompt Name');
    qf.defaultValue('Sean')
    qf.required();
    qf.addTextInput('desc', 'Description');
    qf.defaultValue('')


    qf.addRadioGroup('desc2', ['a','b', 'c']);
    qf.defaultValue('c')*/

    /*   qf.addRadioGroup('desc2', ['a','b', 'c']);
     qf.defaultValue('c')
     */
    var i = new QuickForm();

    setTimeout(function () {
        if ( opts.doNotInit == true )
            return;
        i.init(qf)
        i.data.ui.callWhenChangedUIDataChanged(function onUpdated(o) {
            console.debug('boo', i.data,  i.data.formObject)
        })
    }, 250)


    //self.data.ui.pushVal({type:'rake', key:'txtVal', id:'#dbgRake', storeOnData:'formObject'})

    opts.qf = opts.quickForm = i;
    opts.qfH = qf;
    return opts;
}