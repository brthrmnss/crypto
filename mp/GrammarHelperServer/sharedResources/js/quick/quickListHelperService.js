'use strict';
/**
 * Helper wraps quickCrud config to simplify configuration of config objects
 */
( function() {
  function QuickListConfigHelper( sh, pubSub ) {
    var self = this;
    var p = this;

    var types = {}

    self.types = types;

    //console.error('dfddf---3')
    p.init = function init() {

    };
    function defineBasics() {
      p.loadConfig = function loadConfig(config ) {
        self.config = config;
        /*
        self.config.quickListConfig = sh.dv(self.config.quickListConfig,{});
        self.config.formObject = sh.dv(self.config.formObject,{});
        self.config.restHelperConfig = sh.dv(self.config.restHelperConfig,{});
        */
      }

      p.loadCrudConfig = p.loadConfig;

      p.listTitle = function showTitle(title ) {
        self.config.title =title;
      }
      p.list_fxEditItem = function addQuickFormConfig(fxEdit ) {
        self.config.fxEditItem = fxEdit
      }
      p.list_addItems = function addQuickFormConfig(_items ) {
        self.config.listItems = _items;
      }


      p.listMaxHeight = function quickList_MaxHeight(maxHeight ) {
        self.config.maxHeight = maxHeight
      }
      p.listShowNextButton = function quickList_ShowNextButton(showNext ) {
        self.config.showNext = showNext
      }


      p.showCreateButton = function showCreateButton(canCreate ) {
        self.config.canCreate = canCreate
      }

      p.addNewItemTemplate = function addNewItemTemplate(template ) {
        self.config.template = template
      }

      p.showHelpButton = function showHelpButton(showHelp ) {
        self.config.showHelp = showHelp
      }

      p.showRefreshButton = function showRefreshButton(showRefreshButton ) {
        self.config.showRefreshButton = showRefreshButton
      }

      p.cleanInterface = function cleanInterface( ) {
        self.showHelp(false)
        self.showRefreshButton(false)
        self.showTitle(false)
      }




      p.connectToQuickRest = function connectToQuickRest(serverUrl ) {
        var rHC = {}
        var t// = $restHelper.createInMemory();
        //t.loadItems(gen.items);
        var inMemory = false
        if ( inMemory ) {
          rHC.dataSrc = t;
        } else {
          rHC.url =  serverUrl ; //urlDataServer+'api/promptlog'
        }
        self.config.restHelperConfig = rHC;
      }


    };
    defineBasics();

    function definePagination() {
      p.addPaginatorConfig = function addPaginatorConfig( paginatorConfig ) {
        self.config.paginatorConfig = paginatorConfig
      }
      p.addPaginatorConfig = function addPaginatorConfig( paginatorConfig ) {
        self.config.paginatorConfig = paginatorConfig
      }
    }
    definePagination()


    function defineLayout() {
      p.showForm = function showForm( showForm) {
        self.config.showForm = showForm
      }
      p.showList = function showList( showList) {
        self.config.showList = showList
      }

      p.showPaginator = function showPaginator( ) {
        self.config.showPaginator = showPaginator
      }
    }
    defineLayout()


    function defineHooks() {
      //why: convient to control items later on 
      p.refresh = function refresh( ) {
        self.config.fxRefresh();
      }
      p.viewItem = function viewItem( item ) {
        self.config.fxViewItem(item)
      }

    }
    defineHooks()




    function defineHelpers() {
      p.addAuto = function addAuto(obj, name) {
        if (self.showIf != null) {
          obj.showIf = self.showIf.concat();
        } ;
        self.lastFieldName = name;
        self.lastField = obj;
      };

      p.addSection = function addSection(fx) {
        self.utils.clearAllAutos();
        fx();
        self.utils.clearAllAutos();
      };

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

      p.onFieldChanged = function onFieldChanged(fieldName,fx, data) {
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
        sh.each(mixin, function ( k, v) {
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


      p.addClass = function  addClass (addClasses) {
        self.lastField.classes = sh.dv(self.lastField.classes, '');
        self.lastField.classes += addClasses;
        return self;
      }

      p.addColor = function  addColor (color) {
        self.lastField.color = color;
        return self;
      }

      /* p.addShowIf = function  addShowIf (property, val) {
       self.showIf = [self.utils.showIf(property, val)]
       return self;
       };*/

      p.addShowIf = function addShowIf(key, val) {
        var actionStr = '';
        if ( val == null ) {
          actionStr = val; //assume dev made  custom action
        } else {
          actionStr = 'object.'+key+'=='+sh.q(val);
        }
        console.debug('addshow if', actionStr)
        self.showIf = sh.dv(self.showIf, [])
        self.showIf.push(actionStr)
        return self;
      }

      p.addLastShowIf = function  addLastShowIf(property, val) {
        sh.array.push( self.lastField.showIf,
            self.utils.showIf(property, sh.q(val) ) );
        return self;
      };

      p.addHelp = function addHelp(helpMsg) {
        //self.lastField.help = [];
        self.lastField.help =
            sh.array.push(self.lastField.help, helpMsg);
      }
      p.debugConditionals = function debugConditionals() {
        self.lastField.debugConditionals=true;
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
        if ( types.nonInputTypes.indexOf(type) != -1 )
          return false
        return true;
      };

      p.utils.showIf = function  showIf(property, val) {
        var val = val;
        if ( val == true || val== false  ) {
        }
        else {
          val = sh.q(val)
        }
        return 'object.'+property+'=='+val;
      };

      p.utils.mergeValuePairs = function mergeValuePairs(op1, op2) {
        if ( op2 == null ) {
          return op1;
        }
        var merged = [];
        sh.each(op1, function proc(i, obj) {
          merged.push({name:obj, value:op2[i]})
        });

        return merged;
      };

      p.utils.convertObjectToArrayOfNameValuePairs =
          function convertObjectToArrayOfNameValuePairs(obj) {
            var optionList = [];
            sh.each(obj, function proc(k, v) {
              optionList.push({name:k, value:v})
            });
            return optionList;
          };


      //self.utils = utils;
      p.utils.getObjectValues = function getObjectValues(a) {
        return Object.keys(a).map(function(key){return a[key]});
      };



      p.utils.clearTemps = function () {
        var data = {};
        sh.each(self.form, function goThgouthFields(index, field) {
          if ( field.temp == true ) {
            if ( self.data != null ) {
              data[field.label] = self.data[index]
            }
            delete self.form[index];
          }
        });

        return data;
      }


      p.utils.flattenJSON = function flattenJSON (json) {
        if ( json == null )
          return '';
        var flat = '';
        sh.each(json, function goThgouthFields(k, v) {
          if ( v == null ) {
            return;
          }
          v = sh.dv(v, '');
          flat += k+':' + '\n'
          flat += v+'\n'
        });

        return flat;
      }


      p.utils.findInDict = function findInDict(findVal, dict1, dict2) {
        var foundKey = null
        var foundVal = null;
        sh.each(dict1, function findMatch(k,v) {
          if ( v == findVal ) {
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
        return "changed_"+name;
      };
      types.clickedField = function (name) {
        return "clicked_"+name;
      };
      config.onFieldChanged = function onFieldChanged(fieldName,fx, data) {
        config.pubSub.subscribe(
            config.events.types.changedField(fieldName),
            fx);
      };
      config.onFieldClick = function onFieldClick(fieldName,fx, data) {
        config.pubSub.subscribe(
            config.events.types.clickedField(fieldName),
            fx);
      };
      config.events.onFieldChanged = config.onFieldChanged;

    }
    //defineEvents();

    p.new = function create() {
      return new QuickCrudConfigHelper(sh, pubSub);
    }
  }

  if ( window.reloadableHelper ) {
    // debugger;
    var wrapperRelodableService = window.reloadableHelper
        .makeServiceReloadable('QuickListConfigHelper', QuickListConfigHelper);
    angular.module('com.sync.quick').factory('quickListHelper', wrapperRelodableService );
    angular.module('com.sync.quick').factory('qLH', wrapperRelodableService );
  } else {
    angular.module('com.sync.quick').factory('quickListHelper', QuickListConfigHelper );
    angular.module('com.sync.quick').factory('qLH', QuickListConfigHelper );
  }
  // debugger

}());
