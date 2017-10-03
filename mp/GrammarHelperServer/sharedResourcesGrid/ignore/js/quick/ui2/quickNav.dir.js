//'use strict';
(function(){

  var reload_name = 'quickNav'
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
      url = 'g/js/quick/ui2/quickNav.dir.html'
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


  //console.log('reload', app.reloadableDirective)
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

      var config = $scope.vm.config;

      config = sh.dv(config, {});
      $scope.settings = sh.dv(config.settings, {"showSettingsButton":true});

      if ( scope.vm.config != null ) {
      }

      scope.vm.goToArea = function goToNavArea(name) {
        //console.error('what is config', scope.vm.config)
        var area = scope.vm.config.config.areas[name]
        console.info('where are you going to?', name, area)
        scope.vm.areaHelper.goToArea2(area);
      }

      function AreaHelper() {
        var self = this;
        var p = this;
        self.data = {};
        p.init = function init() {

        }

        p.hideAllAreas = function hideAllAreas(except) {
          var areas =  scope.vm.config.config.areas;
          $.each(areas, function checkIfArea(k,area){
            console.log('hiding', k, area, except)
            if ( k == except ) return
            area.ui.hide()
          });
        };

        p.showAllAreas = function showAllAreas() {
          var areas =  scope.vm.config.config.areas;
          $.each(areas, function checkIfArea(k,area){
            console.log('showing', k, area)
           // if ( k == except ) return
            area.ui.show()
          });
        };


        p.showArea = function showArea(areaName) {
          var area = scope.vm.config.getArea(areaName)
          if ( area == null ) {
            console.warn('could not find area', areaName);
            return;
          }

          self.goToArea2(area)

        };


        p.goToArea2 = function goToArea2(areaObj) {
          var currentArea = self.data.currentArea;

          if ( currentArea == areaObj) {
            console.warn('same area')
            return;
          }

          if (currentArea) {
            //ask current area to leave
            var isDirty = sh.callIfDefined(currentArea.fxDirty, currentArea, areaObj)
            if (isDirty == true) {
              console.error('is dirty')
              return;
            }

            var cannotExit = sh.callIfDefined(currentArea.fxCanExit, currentArea, areaObj)
            if (cannotExit == true) {
              console.error('cannotExit')
              return;
            }
            sh.callIfDefined(currentArea.fxExit, currentArea, areaObj)
          }
          var cannotEnter = sh.callIfDefined(areaObj.fxCanEnter, areaObj, currentArea )
          if ( cannotEnter == true ) {
            console.error('cannotEnter')
            return;
          }

          var cannotEnter = sh.callIfDefined(areaObj.fxEnter, areaObj, currentArea )
          if ( cannotEnter == true ) {
            console.error('cannotEnter')
            return;
          }

          var areas =  scope.vm.config.config.areas;
          $.each(areas, function checkIfArea(k,area){

          });

          var animate = true;

          if ( animate ) {
            if (currentArea) {
              currentArea.ui.css('position', 'absolute');
              var ui = currentArea.ui;
              ui.clearQueue();
              ui.stop(true, true);
              ui.animate({left: -250}, 300);
            }

            var ui = areaObj.ui;
            ui.css('position', 'absolute');
            ui.css('left', ui.width()+'px')
            ui.clearQueue();
            ui.stop(true, true);
            ui.animate({left: 0}, 300);

            areaObj.ui.show();

          } else {
            if (currentArea) {
              currentArea.ui.hide();
            }
            areaObj.ui.show();
          }

          self.data.currentArea = areaObj;

          //announce intention to change
          //self.broadcast('leftarea', name, areaObj);

          //notify we have left field
          //self.broadcast('leftarea', name, areaObj);

        }

      }

      var areaHelper = new AreaHelper();
      scope.vm.areaHelper = areaHelper; 

      function xGen() {
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
      }

      var b = utils.templateContent.find('#btnBar')
      function testAddingButton() {
        var btn = $('<button />');
        btn.html('lkj');
        b.append(btn)
      }
      if ( scope.vm.config && scope.vm.config.config ){
        var cfg = scope.vm.config.config;
        console.log('What is quick nav cfg', scope.vm.config, cfg);
        $.each(scope.vm.config.config.areas, function onV(k, area) {
          var btn = $('<button />');
          //btn.html('lkj');
          console.log(k, area);
          btn.html(k);
          b.append(btn)
          btn.attr('ng-click', 'vm.goToArea("'+k+'")');
        })

        areaHelper.hideAllAreas()
        
        if ( cfg.defaultAreaName ){
          areaHelper.showArea(cfg.defaultAreaName)
        }

        areaHelper.reset = function() {
          areaHelper.hideAllAreas()
          if ( cfg.defaultAreaName ){
            firstArea = cfg.defaultAreaName
          }
          else {
            var areas =  scope.vm.config.config.areas;
            var firstArea = areas[0]
          }
          areaHelper.showArea(firstArea)

        }
      }


      $scope.onExplode = function onExplode() {
        //console.log('ddd'  )
        areaHelper.showAllAreas()
      }


      $scope.onExplodeReverse = function onExplodeReverse() {
        areaHelper.reset()
      }
      

      html = utils.getFinalTemplate();
      element.html($compile(html)(scope));

    }
  }
  app
      .reloadableController(reload_name+'Ctrl',
          QuickReloadablelistController2);



}());
