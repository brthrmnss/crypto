'use strict';
/**
 * Helper wraps quickCrud config to simplify configuration of config objects
 */
( function () {
    function QuickCrudConfigHelper(sh, pubSub,
                                   $restHelper, quickFormHelper,
                                   appService) {
        var self = this;
        var p = this;

        var args = sh.args(arguments)
        var types = {}

        self.types = types;

        //console.debug('qCHS','dfddf---3')
        p.init = function init() {

        };

        function defineBasics() {
            p.loadConfig = function loadConfig(config) {
                self.config = config;

                self.config.quickListConfig = sh.dv(self.config.quickListConfig, {});
                //quickListHelper = quickListHelper.create();

                quickFormHelper = quickFormHelper.create();
                self.qFH = self.quickFormHelper =
                    self.form = quickFormHelper;
                self.config.quickFormConfig = sh.dv(self.config.quickFormConfig, {});
                quickFormHelper.loadForm({}, {}, self.config.quickFormConfig)

                self.config.restHelperConfig = sh.dv(self.config.restHelperConfig, {});
            }

            p.loadCrudConfig = p.loadConfig;

            p.showTitle = function showTitle(title) {
                self.config.title = title;
            }
            p.addQuickFormConfig = function addQuickFormConfig(formConfig) {
                self.config.formObject = angular.copy(formConfig);
            }
            p.addQuickListConfig = function addQuickFormConfig(quickListConfig) {
                self.config.quickListConfig = angular.copy(quickListConfig);
            }

            p.onQuickList_fxEditItem = function addQuickFormConfig(fxEdit) {
                self.config.quickListConfig.fxEditItem = fxEdit
            }

            p.quickList_MaxHeight = function quickList_MaxHeight(maxHeight) {
                self.config.quickListConfig.maxHeight = maxHeight
            }
            p.quickList_ShowNextButton = function quickList_ShowNextButton(showNext) {
                self.config.quickListConfig.showNext = showNext
            }

            p.showCreateButton = function showCreateButton(canCreate) {
                self.config.canCreate = canCreate
            }


            p.addNewItemTemplate = function addNewItemTemplate(template) {
                self.config.template = template
            }


            p.showHelpButton = function showHelpButton(showHelp) {
                self.config.showHelp = showHelp
            }


            p.showRefreshButton = function showRefreshButton(showRefreshButton) {
                self.config.showRefreshButton = showRefreshButton
            }


            p.cleanInterface = function cleanInterface() {
                self.showHelp(false)
                self.showRefreshButton(false)
                self.showTitle(false)
            }


            p.setListItems = function setListItems(listItems) {
                self.config.items = listItems;
                self.config.noRemote = true;
                console.warn('this is very odd, only use for testing asn list will not work well')
            }


            p.connectToQuickRest = function connectToQuickRest(serverUrl) {
                var rHC = {}
                var t// = $restHelper.createInMemory();
                //t.loadItems(gen.items);
                var inMemory = false
                if (inMemory) {
                    rHC.dataSrc = t;
                } else {
                    rHC.url = serverUrl; //urlDataServer+'api/promptlog'
                }
                self.config.restHelperConfig = rHC;
            }


            p.connectToInMemory = function connectToInMemory(items) {
                var rHC = {}
                var t = $restHelper.createInMemory();
                t.loadItems(items);
                rHC.dataSrc = t;
                self.config.restHelperConfig = rHC;
            }

        };
        defineBasics();

        function definePagination() {
            p.addPaginatorConfig = function addPaginatorConfig(paginatorConfig) {
                self.config.paginatorConfig = paginatorConfig
            }
            p.addPaginatorConfig = function addPaginatorConfig(paginatorConfig) {
                self.config.paginatorConfig = paginatorConfig
            }
        }

        definePagination()


        function defineLayout() {
            p.showForm = function showForm(showForm) {
                self.config.showForm = showForm
            }
            p.showList = function showList(showList) {
                self.config.showList = showList
            }
            p.showFilter = function showFilter(showList) {
                self.config.showFilter = showList
            }

            p.showPaginator = function showPaginator() {
                self.config.showPaginator = showPaginator
            }
            p.onClick = function fxClick(showList) {
                self.config.fxClick = showList
            }
        }

        defineLayout()


        function defineHooks() {
            //why: convient to control items later on
            p.refresh = function refresh() {
                self.config.fxRefresh();
            }
            p.viewItem = function viewItem(item) {
                self.config.fxViewItem(item)
            }

        }

        defineHooks()


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
            /*
            p.loadForm = function loadForm(newForm, dataObject, cfg) {
              self.form = newForm;
              self.data = dataObject;
              if ( cfg != null ) {
                self.config = cfg;
                self.loadConfig(cfg)
              }
              self.utils.clearAllAutos();
            };


            p.loadConfig = function loadConfig(cfg) {
              self.config = cfg;
              if ( self.config.pubSub == null ) {
                defineEvents(cfg)
              }

            };
      */

            p.onFieldChanged = function onFieldChanged(fieldName, fx, data) {
                self.config.onFieldChanged(fieldName, fx, data)
            }
            p.globalChangeHandler = function globalChangeHandler(v) {
                //why: when a ny value changed
                self.lastField.fxChange = v;
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
            config.pubSub = pubSub.create();
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


        function defineQuickCrudConfig() {
            p.asdf = function asdf() {
                var x = new appService.gen();
                var template = {name: '', date: null, age: 0}
                x.createObjects(template, 10)
                x.randomizeStr('name')
                x.randomizeNumber('age', 0, 120, 2)
                x.randomizeDate('date', 365 * 2)
                return x;
            }
            p.quickCHS = function quickCHS(url, cfg) {
                console.log('....... dddd')
                //self.lastField.required = true;
                //self.lastField.requiredMsg = requiredMsg;

                // x.show()
                //    scope.vm.listData = x.items;

                /*
                if (scope.configCrud) {
                    cfg = scope.configCrud;
                } else {
                    //debugger
                    console.warn('these should be combined')
                    var cfg = {}
                    cfg.asdf = 'sdfs';
                }
                */

                console.log('self', self)
                var quickCrudHelper = self.new();
                var h = quickCrudHelper;

               // debugger
                cfg = sh.dv(cfg, {})
                quickCrudHelper.loadConfig(cfg)

                h.showTitle('ListZZZ-->');
                //asdf.g

                //x.items = x.items.slice(0, 10)
                //x.items = [];

                if ( url != null) {
                    //'http://127.0.0.1:6016/api/tags')
                    h.connectToQuickRest(url);
                    // h.connectToInMemory(x.items)
                } else {
                    var x = self.asdf();
                    h.connectToInMemory(x.items)
                }

                h.form = h.quickFormHelper
                h.quickFormHelper.addTextInput('name', 'Name')
                h.quickFormHelper.addTextInput('desc', 'Desc')
                //configList
                h.config.quickFormConfig.fxFilterRefresh = function fxFilterRefresh(n, o) {
                    console.debug('qCHS','quickFormConfig', 'boo2')
                    console.debug('qCHS','ooo', o, n)
                    return false;
                }
                h.config.quickListConfig.fxFilterRefresh = function fxFilterRefresh(n, o) {
                    console.debug('qCHS','quickListConfig', 'boo')
                    debugger
                    return false;
                }

                h.config.quickListConfig.fxFilterRefresh = function fxFilterRefresh(n, o) {
                    console.debug('qCHS','quickListConfig', 'boo')
                    debugger
                    return false;
                }

                //h.showFilter(true)

                return quickCrudHelper;
            }
        }

        defineQuickCrudConfig();

        p.new = function create() {
            //debugger
            //var y =  QuickCrudConfigHelper.apply(this, args)
            /*var y = QuickCrudConfigHelper(sh, pubSub,
                $restHelper, quickFormHelper,
                appService)*/

            var y = new QuickCrudConfigHelper(
                args[0], args[1], args[2],
                args[3],args[4],args[5])

            return y
        }
    }

    if (window.reloadableHelper) {
        // debugger;
        var wrapperRelodableService = window.reloadableHelper
            .makeServiceReloadable('QuickCrudConfigHelper', QuickCrudConfigHelper);
        angular.module('com.sync.quick').factory('quickCrudHelper', wrapperRelodableService);
        angular.module('com.sync.quick').factory('qCH', wrapperRelodableService);
    } else {
        debugger;
        angular.module('com.sync.quick').factory('quickCrudHelper', QuickCrudConfigHelper);
        angular.module('com.sync.quick').factory('qCH', QuickCrudConfigHelper);
    }
    // debugger

}());
