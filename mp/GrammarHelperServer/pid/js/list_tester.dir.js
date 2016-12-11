//'use strict';
(function(){

  var reload_name = 'listTester'
  function defineQuickReloadingDir() {
    var app = angular.module('com.sync.quick');
    window.reloadableHelper.upgradeApp(app)
    return app;

  }
  var app = defineQuickReloadingDir();

  console.log('reload', app.reloadableDirective)
  /** s
   * Component take data form and data object
   * @param $templateRequest
   * @param $compile
   * @param $interpolate
   * @param transcludeHelper
   * @returns {{scope: {title: string, fxItemSelected: string}, controller: string, controllerAs: string, bindToController: boolean, compile: Function}}
   * @private
   */
  var quickReloadableDir2 = function quickReloadableDir2_($templateRequest,
                                                          $compile, $interpolate,
                                                          transcludeHelper,
                                                          $templateCache,
                                                          reloadableHelperTestService,
                                                          quickUI,
                                                          appService,
                                                          quickFormHelper,
                                                          quickCrudHelper,

                                                          /*angFunc,*/
                                                          xUI
  ) {

    reloadableHelper.saveDirectiveCtx(reload_name, arguments)
    //window.ddoFxArgs = Array.prototype.slice.call(arguments);
    // debugger; //only invoked 1x
    var utilsParent = transcludeHelper.new(this);
    function link(scope, element, attrs, ctrl, transclude){
      var url = '';
      url = 'g/pid/js/list_tester.dir.html'
      $templateRequest(url ).then(
          function(html){
            //reloadableHelperTestService = reloadableHelperTestService.create();
            /*angFunc = angFunc.create();*/
            var xUIHelper = xUI.create();

            element.on('remove', function(){
              //debugger;
              //alert('destroyed');
              scope.destroyStreams = true;
              scope.destroyed = true;
              scope.$destroy();
            })
            scope.destroyStreams = false
            console.warn('link.2');

            //var utilsParentDict = utils.dictTemplates;
            var utils = transcludeHelper.new();
            utils.dictTemplates = utilsParent.dictTemplates; //copy over dictionary of templates
            utils.$compile = $compile;
            utils.loadTemplate(html, element, attrs);
            scope.render(utils);


            var server = 'http://10.211.55.4'
            server = 'http://127.0.0.1'
            var urlDataServer = server+':10001/';

            var $scope = scope;

            function define1_promptLog() {

              var types = {};
              types.prompt_types = {};
              types.prompt_types.prompt = 'prompt';
              types.prompt_types.checklist_single = 'checklist-single';
              types.prompt_types.checklist = 'checklist';
              types.prompt_types.counter = 'counter';

              types.prompt_types2 = {};
              types.prompt_types2.prompt = 'Enter text, standard prompt';
              types.prompt_types2.checklist_single = 'Select one option for dropdown list';
              types.prompt_types2.checklist = 'Select multiple objects option for dropdown list';
              types.prompt_types2.counter = 'Track when an event happens. optional text';


              var qf = quickFormHelper.create().new();
              var formObject2 = {};
              $scope.formObject2 = formObject2;
              qf.loadForm(formObject2)

              qf.addTextInput('name', 'Prompt Name');
              qf.required();
              qf.addTextInput('desc', 'Description');

              qf.addLabel('Prompt Type'); 
              qf.addSelectList_FromObj('prompt_type',types.prompt_types,
                  'TType', types.prompt_types.checklist);
              qf.addLabel('{{formObject.data.promptInfo}}');
              qf.globalChangeHandler(function changePromptInfo(o,fieldInfo,y,formObject){
                formObject.data = sh.dv(formObject.data,{} )
                formObject.data.promptInfo = qf.utils.findInDict(o.prompt_type, types.prompt_types, types.prompt_types2)
              });

              qf.addSection(function checkListsOnly() {
                //qf.showIf=["object.prompt_type=='checklist'",
                //   "object.prompt_type=='checklist-single'"] //this is an auto

                //why: show this section when:
                qf.addShowIf('prompt_type', types.prompt_types.checklist)
                qf.addShowIf('prompt_type', types.prompt_types.checklist_single)

                qf.addTextArea( 'listOptions', 'List Options');
                qf.required('Enter a few list items');
                qf.placeholder('Item 1, Item 2, Item 3')
                qf.lastField.msgs = ['no', 'yes'];

                var customListPreview = qf.addSelectList('listOptionsPreview',null,
                    'List Options Preview');
                qf.globalChangeHandler(function populateList(o,fieldInfo){
                  var txt = o.listOptions;
                  if ( txt == fieldInfo.lastText ) {
                    return;
                  }
                  fieldInfo.lastText = txt;
                  if ( txt == null ) { txt = ''; };
                  var split = txt.split("\n");
                  customListPreview.options =  split;
                  fieldInfo.options = split;
                  if ( fieldInfo.baseLabel ) {
                    fieldInfo.baseLabel =fieldInfo.label;
                  }
                  sh.paren = function paren(text) {
                    return "(" + text + ")"
                  }
                  fieldInfo.label = fieldInfo.baseLabel +" " + sh.paren(split.length);
                  //console.log('created demo list items for user item');
                  fieldInfo.listOptions = null;
                });
                qf.uiOnly()
                qf.desc('Placeholder for list, preview of all options', 'preview of all options will appear here')

                // formObject2.listOptionsPreview.showIf = qf.showIf;
              })


              var qCrudLogList = {};
              $scope.qCrudPromptList = qCrudLogList;
              qCrudLogList.qLC = {};
              qCrudLogList.title = 'LLL';
              qCrudLogList.quickListConfig = qCrudLogList.qLC
              qCrudLogList.qLC.fxEditItem = function (o) {
                console.log('edit item', o);
                return;
                qCrudCreateLog.dataObject = o;
                qCrudCreateLog.fxRefresh();
              };
              qCrudLogList.qLC.maxHeight = 150;
              qCrudLogList.qLC.showNext = true;
              var qFC = {};
              qCrudLogList.quickFormConfig = qFC;
              //qCrudLogList.showForm = false;
              qCrudLogList.dataObject = {};
              qCrudLogList.remote = false;
              qCrudLogList.canCreate = false;
              qCrudLogList.formObject = angular.copy(formObject2);

              //generate stuff
              //var template = {};
              var template = {name:'', date:null};


              var server = 'http://10.211.55.4'
              server = 'http://127.0.0.1'
              var urlDataServer = server+':10001/';

              var rHC = {}
              var t// = $restHelper.createInMemory();
              //t.loadItems(gen.items);
              var inMemory = false
              if ( inMemory ) {
                rHC.dataSrc = t;
              } else {
                rHC.url = urlDataServer+'api/promptlog'
              }
              qCrudLogList.restHelperConfig = rHC;
            }
            define1_promptLog();

            function define1_promptLog2() {

              var types = {};
              types.prompt_types = {};
              types.prompt_types.prompt = 'prompt';
              types.prompt_types.checklist_single = 'checklist-single';
              types.prompt_types.checklist = 'checklist';
              types.prompt_types.counter = 'counter';

              types.prompt_types2 = {};
              types.prompt_types2.prompt = 'Enter text, standard prompt';
              types.prompt_types2.checklist_single = 'Select one option for dropdown list';
              types.prompt_types2.checklist = 'Select multiple objects option for dropdown list';
              types.prompt_types2.counter = 'Track when an event happens. optional text';


              var qf = quickFormHelper.create().new();
              var formObject2 = {};
              $scope.formObject2 = formObject2;
              qf.loadForm(formObject2)






              //var formObject_createLog = {};
              //qf.form = formObject_createLog;
              qf.addLabelField('prompt.name');
              qf.addLabelField('prompt.desc');
              qf.addTextField('data');
              qf.required();

              qf.form.reminder_time = {label:'Every Hours',
                type:'stepper',
                defaultValue:15,
                min:5,
                max:60*12,
                showIf:["object.prompt_type=='prompt'"]};

              qf.addShowIf('prompt.prompt_type',types.prompt_types.checklist_single);
              //qf.showIf =["object.prompt.prompt_type=='checklist-single'"];
              qf.addButtonRoll('singleCheckList', function(o){
                    return sh.strToArray(o.prompt.listOptions);
                  },
                  'op', true );
              qf.mixLast({
                noGutterSpace:true,
                setProp:'data',
                classes:'md-accent md-raised md-button md-default-theme'
              });


              qf.addShowIf('prompt.prompt_type',types.prompt_types.checklist);
              qf.addButtonRoll('multipleCheckList', function(o){
                return sh.strToArray(o.prompt.listOptions);
              }, null, true, true);
              qf.mixLast({
                noGutterSpace:true,
                setProp:'data',
                classes:'md-accent md-raised md-button md-default-theme'
              });
              qf.mixLast({
                showVal:true,
                //setSelf:true,
                //confirmDeselect:true
              });
              qf.listenForChange(function onChange_SingleCheckList(val){

              });


              qf.addTextInput('name', 'Prompt Name');
              qf.required();
              qf.addTextInput('desc', 'Description');

              qf.addLabel('Prompt Type');
              qf.addSelectList_FromObj('prompt_type',types.prompt_types,
                  'TType', types.prompt_types.checklist);
              qf.addLabel('{{formObject.data.promptInfo}}');
              qf.globalChangeHandler(function changePromptInfo(o,fieldInfo,y,formObject){
                formObject.data = sh.dv(formObject.data,{} )
                formObject.data.promptInfo = qf.utils.findInDict(o.prompt_type, types.prompt_types, types.prompt_types2)
              });

              qf.addSection(function checkListsOnly() {
                //qf.showIf=["object.prompt_type=='checklist'",
                //   "object.prompt_type=='checklist-single'"] //this is an auto

                //why: show this section when:
                qf.addShowIf('prompt_type', types.prompt_types.checklist)
                qf.addShowIf('prompt_type', types.prompt_types.checklist_single)

                qf.addTextArea( 'listOptions', 'List Options');
                qf.required('Enter a few list items');
                qf.placeholder('Item 1, Item 2, Item 3')
                qf.lastField.msgs = ['no', 'yes'];

                var customListPreview = qf.addSelectList('listOptionsPreview',null,
                    'List Options Preview');
                qf.globalChangeHandler(function populateList(o,fieldInfo){
                  var txt = o.listOptions;
                  if ( txt == fieldInfo.lastText ) {
                    return;
                  }
                  fieldInfo.lastText = txt;
                  if ( txt == null ) { txt = ''; };
                  var split = txt.split("\n");
                  customListPreview.options =  split;
                  fieldInfo.options = split;
                  if ( fieldInfo.baseLabel ) {
                    fieldInfo.baseLabel =fieldInfo.label;
                  }
                  sh.paren = function paren(text) {
                    return "(" + text + ")"
                  }
                  fieldInfo.label = fieldInfo.baseLabel +" " + sh.paren(split.length);
                  //console.log('created demo list items for user item');
                  fieldInfo.listOptions = null;
                });
                qf.uiOnly()
                qf.desc('Placeholder for list, preview of all options', 'preview of all options will appear here')

                // formObject2.listOptionsPreview.showIf = qf.showIf;
              })


              var crudConfig = {};
              var qC = quickCrudHelper.create().new();
              qC.config = crudConfig;
              $scope.qCrudList1 = crudConfig

              qC.showTitle('Log List')
              qC.addQuickFormConfig(formObject2);
              var url = urlDataServer+'api/promptlog';
              qC.connectToQuickRest(url);
              qC.showCreateButton(false)

              var template = {name:'', date:null};
              qC.addNewItemTemplate(template)
              
              qC.showHelpButton(true, 'this is help')
              qC.showRefreshButton(true, 'refresh')


              qC.showHelpButton(true, 'this is help')
              qC.showRefreshButton(true, 'refresh')


              console.error('cont')


              return;
              var qCrudCreateLog_QuickFormConfig = {};
              qf.loadConfig(qCrudCreateLog_QuickFormConfig);
              qf.onFieldChanged("data", function(s){
                console.log('changed data row');
              });
              qCrudCreateLog_QuickFormConfig.onFieldClick("multipleCheckList", function(s){
                console.log('multipleCheckList');
              });
              qCrudCreateLog_QuickFormConfig.onFieldClick("singleCheckList", function(val, event){
                console.log('singleCheckList');

                var o = event.dataObject;
                if ( $scope.qCrudCreateLog.quickFormConfig.isActive != true ) {
                  return;
                }

                if (o.prompt.save_on_click) {
                  //config.fxSave();
                  $scope.qCrudCreateLog.quickFormConfig.isActive = false;
                  $scope.qCrudCreateLog.quickFormConfig.fxSave2(
                      function onTryToRecreate() {
                        console.log('recreate...')
                        setTimeout(function () {
                          if (o.prompt.keep_open_until_cancel ) {
                            console.log('try to save again')
                            qCListPrompts.qLC.fxAddItem(o.prompt);
                          }
                        },500)
                      }
                  );
                }
              });


              qf.showIf=[];
              qf.addTasklist('taskList', function(o){
                return sh.strToArray(o.prompt.listOptions);
              }, null, true, true);
              qf.mixLast({
                noGutterSpace:true,
                setProp:'data',
                //classes:'md-accent md-raised md-button md-default-theme'
              });


              qf.addTextField('comments');
              qf.defaultValue();

              var dataObject2 = {};
              $scope.dataObject4 = dataObject2
              dataObject2.first_name = 'Data';
              dataObject2.start = 1500
              dataObject2.last_name = 'Object 2';
              
              
              
              
              
              
              return;
 

            }
            define1_promptLog2();


            function defineListOfEntries() {

              var qf = quickFormHelper.create().new();
              var formObject2 = {};
              $scope.formObject2 = formObject2;
              qf.loadForm(formObject2)


              var crudConfig = {};
              var qC = quickCrudHelper.create().new();
              //qC.config = crudConfig;
              qC.loadCrudConfig(crudConfig);
              $scope.qCrud_ListOfEntries = crudConfig

              qC.onQuickList_fxEditItem(function onEditListItem(o) {
                console.log('edit item', o);
                return;
                qCrudCreateLog.dataObject = o;
                qCrudCreateLog.fxRefresh();
              });

              qC.showTitle('List Entries');
              qC.quickList_ShowNextButton(true);
              qC.quickList_MaxHeight(150);
              qC.showForm(false);
              //qC.remoteable(false);
              qC.showHelpButton(true, 'this is help')
              qC.showRefreshButton(true, 'refresh');

              var url = urlDataServer+'api/prompt';
              qC.connectToQuickRest(url);
              return;
            }
            defineListOfEntries();

            function defineListOfPrompts() {

              var qf = quickFormHelper.create().new();
              var formObject2 = {};
              $scope.formObject2 = formObject2;
              qf.loadForm(formObject2)


              var crudConfig = {};
              var qC = quickCrudHelper.create().new();
              //qC.config = crudConfig;
              qC.loadCrudConfig(crudConfig);
              $scope.qCrud_ListOfPrompts = crudConfig

              qC.onQuickList_fxEditItem(function onEditListItem(o) {
                console.log('edit item', o);
                return;
                qCrudCreateLog.dataObject = o;
                qCrudCreateLog.fxRefresh();
              });

              qC.showTitle('List Entries');
              qC.quickList_ShowNextButton(true);
              qC.quickList_MaxHeight(150);
              qC.showForm(false);
              //qC.remoteable(false);
              qC.showHelpButton(true, 'this is help')
              qC.showRefreshButton(true, 'refresh');

              var url = urlDataServer+'api/prompt';
              qC.connectToQuickRest(url);
              return;
            }
            defineListOfPrompts();

            scope.$watch('vm.config',
                function (v, oldVal) {
                  if ( v != null ) {
                    v.fxRefresh = function refreshQuickReloadableList() {
                      //utilsParent.debug('inside fxrefresh')
                      console.log('debug inside fxresfresh')
                      scope.render();
                    }

                    v.onSettings = function () {
                      scope.onSettings();
                    }
                  }
                  if ( oldVal == null ) {
                    return;
                  }
                  console.log('quickform.vm.config',
                      'scope.vm.dataObject... changed: ')

                  scope.render();
                });
          }

      )

    };

    var compile = function (tElem, attrs, repeat) {
      console.warn('lc', 'compiling..s.dd.');
      // debugger;

      var newerDdo = reloadableHelper.recompileDirective(reload_name,arguments, this,  repeat)
      if ( newerDdo ) {
        return newerDdo
      }

      utilsParent.storeTemplate(tElem, attrs);
      utilsParent.reloadTemplate = tElem.clone();
      //alert('defined ddo')
      function defineDirectiveDefaults() {
        if ( attrs.selectedIndex === null  ) {
          attrs['selectedIndex'] = "-1";
        };
        //utils.defaultAttr('dataObject', "{}", attrs);
      }
      defineDirectiveDefaults();
      console.warn('compile.2');

      return {
        pre: function(scope, element, attrs, controller, transclude){
          console.log('transclude', transclude)
          return;
        },
        post: link
      };
    }
    var ddo = {
      scope: {
        config:'=',
        refresh: '='
      },
      controller: reload_name+'Ctrl',
      controllerAs: 'vm',
      bindToController:true,
      compile: compile,
    };
    return ddo;
  };


  console.log('reload', app.reloadableDirective)
  //debugger;

  app
      .reloadableDirective(reload_name, quickReloadableDir2);


  var QuickReloadablelistController2 = function
      QuickReloadablelistController_ ($scope,
                                      transcludeHelper,
                                      sh,
                                      quickFormHelper,
                                      dialogService,
                                      pubSub,
                                      quickUI,
                                      appService) {
    //alert('...dddh')
    var pubSub = pubSub.create();

    pubSub.subscribe('no', function onNo(arg){
      console.log('who is saying no?', arg)
    })

    pubSub.publish('no', 'ia am')
    var config = $scope.vm.config;
    if ( config == null ) { config = {} };

    this.$scope = $scope;


    console.log('asdf', appService)
    //appService.

    $scope.render = function render( utils ) {
      if ($scope.utils == null) {
        $scope.utils = utils;
        $scope.templateContent = utils.templateContent.clone();
        $scope.userTemplateContent = utils.userTemplateContent.clone();
      } else {
        utils = $scope.utils;
      }

      $scope.errors = [];
      var element = utils.element;
      var $compile = utils.$compile;

      var scope = $scope;

      utils.templateContent = $scope.templateContent.clone()
      utils.userTemplateContent = $scope.userTemplateContent.clone()

      var dictTypes = {};
      var dictAttrs = {};

      //alert('d')

      dictTypes['t']={changeTo:'textarea', addHTML:'<checkbox>sdfsdf', addClass:'textarea_class'};
      dictTypes['tx']={changeTo:'div', addHTML:'<checkbox>', addClass:'textarea_class'};
      dictTypes['navbtn']={changeTo:'div', addHTML:'<checkbox>', addClass:'navBtn'};
      dictTypes['mini-panel']={ addClass:'mini-panel', changeTo:'div'};

      dictTypes['center-content']={
        wrapContentFx: function warpContent(child, index, attrs, css ) {
          return '<div class="center_content_item"><!-- auto center --></div>'
        },
        addClass:"center_content",
        changeTo:'div'};


      dictAttrs['prettybtn']={addClass:'mbButton marty'};
      dictTypes['spacer']={replaceWith:'<div style="width:10px;height:10px;"></div>'};
      dictAttrs['makeredbtn']={ifVal:true, addClass:'redbtn', addHTML:'<span>red btns</span>'};
      dictAttrs['horizontal-layout']={ifVal:true, addClass:'horizontal-flex-container',
        addClassToChildren: 'horizontal-flex-container-flex-item pad10',
        //debugChildren:true,
        modifyChildrenFx: function (child, index, attrs, css ) {
          if ( attrs.stretch != null ) {
            child.addClass('horizontal-flex-container-flex-item-stretch');
          }
        },
        _addHTML:'<span>red btn</span>', alert:true}
      ;
      dictAttrs['add-class-to-children']={
        modifyChildrenFx: function (child, index, attrs, css , parentAttrs ) {
          var addToClassChildren =  parentAttrs['add-class-to-children']
          if ( addToClassChildren != null ) {
            child.addClass(addToClassChildren);
          }
        },
        alert:true
      };
      dictAttrs['upcase']={
        addCSS:{'text-transform':'uppercase'}
      }

      dictAttrs['absolute']={
        addCSS:{'position':'absolute', top:'0px', left:'0px'}
      }
      dictAttrs['bottom']={
        addCSS:{'position':'absolute', top:'', bottom:'0px'}
      }
      dictAttrs['relative']={
        addCSS:{'position':'relative'}
      }
      dictAttrs['aboslute-container']={
        addCSS:{'position':'relative'}
      }
      dictAttrs['bg-offwhite']={
        addCSS:{'background-color':'#EAEAE2'}
      }
      dictAttrs['bg-blue']={
        addCSS:{'background-color':'#09FFFF'}
      }
      dictAttrs['bg-red']={
        addCSS:{'background-color':'red'}
      }
      dictAttrs['bg-green']={
        addCSS:{'background-color':'green'}
      }
      dictAttrs['bg-orange']={
        addCSS:{'background-color':'orange'}
      }
      dictAttrs['bg-black']={
        addCSS:{'background-color':'black'}
      }
      dictAttrs['hide']={
        addCSS:{'display':'none'}
      }

      dictAttrs['wh5050']={
        addCSS:{'width':'50%',
          'height':'50%'}
      }

      dictAttrs['pad10']={
        addCSS:{'padding':'10px'  }
      }
      dictAttrs['pad5']={
        addCSS:{'padding':'5px'  }
      }

      dictAttrs['white']={
        addCSS:{'color':'white',
        }
      }

      dictAttrs['w100']={
        addCSS:{'width':'100%',
        }
      }

      dictAttrs['h100']={
        addCSS:{'height':'100%',
        }
      }

      dictAttrs['wh100']={
        addCSS:{'width':'100%',
          'height':'100%'}
      }

      dictAttrs['clip']={
        addCSS:{'overflow':'hidden',
        }
      }
      dictAttrs['w50']={
        addCSS:{'width':'50%',
        }
      };
      dictAttrs['w30']={
        addCSS:{'width':'30%',
        }
      };
      dictAttrs['h50']={
        addCSS:{'height':'50%',
        }
      }







      window.dictTypes = dictTypes;
      window.dictAttrs = dictAttrs;

      quickUI = quickUI.create();
      var q = quickUI;
      //var children = utils.templateContent.find('*');
      q.process(utils.templateContent, dictTypes, dictAttrs)

      var config = $scope.vm.config;

      config = sh.dv(config, {});
      $scope.settings = sh.dv(config.settings, {"showSettingsButton":true});

      if ( scope.vm.config != null ) {
      }

      scope.vm.y = ['yy', 'kddd', 'fff']
      scope.vm.listData = ['yy', 'kddd', 'fff']

      scope.vm.app = appService;
      scope.vm.app.tabs = ['aaa', 'bbb', 'ccc', 'ddd'];


      var y = appService.gen()
      //console.error('y', y);
      /**/
      var x = new appService.gen();
      var template = {name:'', date:null, age:0}
      x.createObjects(template, 10)
      x.randomizeStr('name')
      x.randomizeNumber('age', 0,120, 2)
      x.randomizeDate('date', 365*2)
      x.show()
      /**/
      scope.vm.listData = x.items;


      html = utils.getFinalTemplate();
      element.html($compile(html)(scope));

    }
  }
  app
      .reloadableController(reload_name+'Ctrl',
          QuickReloadablelistController2);



}());
