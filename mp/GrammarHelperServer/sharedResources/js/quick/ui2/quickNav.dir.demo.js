//'use strict';
(function(){

  var reload_name = 'quickNavDemo'
  function defineQuickReloadingDir() {
    var app = angular.module('com.sync.quick');
    window.reloadableHelper.upgradeApp(app)
    return app;

  }
  var app = defineQuickReloadingDir();

  console.log('reload', app.reloadableDirective)

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
      url = 'g/js/quick/ui2/quickNav.dir.demo.html'
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


            var $scope = scope;


            function QuickNavConfigHelper(){
              var self = this;
              var p = self;
              self.data = {};
              self.data.config = {}
              self.config = self.data.config;
              self.config.areas = {};

              p.init = function init() {

              }
              p.addArea = function addARea(name, id) {
                if ( id == null ) {
                  id = 'area_'+name;
                }
                if ( id.includes('#') == false ) {
                  id = '#'+id;
                }
                var areaConfig = {};
                areaConfig.name = name;
                areaConfig.id = id;
                areaConfig.ui = $(id)
                if ( areaConfig.ui == null ) {
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
                sh.throw  = function (err) {
                  throw new Error(err)
                }

                sh.throwIfNull  = function throwIfNull(val, err) {
                  if ( val != null )
                    return
                  throw new Error(err)
                }

                sh.throwIfNull(defaultArea, 'Name is not valid default area');

                self.config.defaultAreaName = defaultArea.name;
                console.debug('adding defaultArea area', name, defaultArea.name);

              }
            }



            function defineConfigForQuickNave() {
              var qNC = new QuickNavConfigHelper();
              var cfg = {};
              qNC.addArea('login', 'areaLogin');
              qNC.defaultArea('login');
              qNC.addArea('list')
              qNC.addArea('edit')
              scope.configNavBar = qNC;
            }
            defineConfigForQuickNave();

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


    //console.log('asdf', appService)
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

      function addUIEm() {
        quickUI = quickUI.create();
        var q = quickUI;
        q.processDefaults(utils.templateContent ); 
      }
      addUIEm();

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
