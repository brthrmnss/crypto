//'use strict';
(function(){
  var reload_name = 'progBtn'
  //do redirections
  function defineQuickReloadingDir() {
    var app = angular.module('com.sync.quick'); //should not be hardcoded
    window.reloadableHelper.upgradeApp(app)
    return app;
  }
  var app = defineQuickReloadingDir();
  //console.log('reload', app.reloadableDirective)

  /** s
   * Component take data form and data object
   * @param $templateRequest
   * @param $compile
   * @param $interpolate
   * @param transcludeHelper
   * @private
   */
  var quickReloadableDir2 = function quickReloadableDir2_($templateRequest,
                                                          $compile, $interpolate,
                                                          transcludeHelper,
                                                          $templateCache,
                                                          reloadableHelperTestService,
                                                          quickUI,
                                                          /*angFunc,*/
                                                          xUI
  ) {

    reloadableHelper.saveDirectiveCtx(reload_name, arguments)
    var utilsParent = transcludeHelper.new(this);
    function link(scope, element, attrs, ctrl, transclude){
      var url = '';
      url = 'g/red/js/progBtnDir.html'
      $templateRequest(url ).then(
          function(html){
            var xUIHelper = xUI.create();
            element.on('remove', function(){
              scope.destroyStreams = true;
              scope.destroyed = true;
              scope.$destroy();
            })
            scope.destroyStreams = false
            //var utilsParentDict = utils.dictTemplates;
            var utils = transcludeHelper.new();
            utils.dictTemplates = utilsParent.dictTemplates; //copy over dictionary of templates
            utils.$compile = $compile;
            utils.loadTemplate(html, element, attrs);
            scope.render(utils);

            //stuff

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
                                      quickUI) {

    var config = $scope.vm.config;
    if ( config == null ) { config = {} };

    this.$scope = $scope;


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

      var dictTypes = window.dictTypes;
      var dictAttrs = window.dictAttrs;

      quickUI = quickUI.create();
      var q = quickUI;
      //var children = utils.templateContent.find('*');
      q.process(utils.templateContent, dictTypes, dictAttrs)

      var config = $scope.vm.config;

      config = sh.dv(config, {});
      $scope.settings = sh.dv(config.settings, {"showSettingsButton":true});

      if ( scope.vm.config != null ) {
      }


      html = utils.getFinalTemplate();
      element.html($compile(html)(scope));

    }
  }
  app
      .reloadableController(reload_name+'Ctrl',
      QuickReloadablelistController2);


}());



//'use strict';
(function() {



  function reloadableDirHelper(reload_name, scopeForDir, fx1) {


    if ( reloadableHelper.scopes == null) {
      reloadableHelper.scopes = {}
      reloadableHelper.directives = {}
    }

    console.error('reloaded thing')
    var oldScope = reloadableHelper.scopes[reload_name];
    var ddoOld = reloadableHelper.directives[reload_name];
    if ( oldScope ) {
      //debugger;
      $.each(scopeForDir, function fx(k,v) {
        oldScope[k] = v;
      })
      console.error('reloaded thing', ddoOld, oldScope)
    } else {
      reloadableHelper.scopes[reload_name] = scopeForDir;
    }

    //var reload_name = 'progBtn'
    //do redirections
    function defineQuickReloadingDir() {
      var app = angular.module('com.sync.quick'); //should not be hardcoded
      window.reloadableHelper.upgradeApp(app)
      return app;
    }

    var app = defineQuickReloadingDir();
    //console.log('reload', app.reloadableDirective)

    /** s
     * Component take data form and data object
     * @param $templateRequest
     * @param $compile
     * @param $interpolate
     * @param transcludeHelper
     * @private
     */
    var quickReloadableDir2 = function quickReloadableDir2_($templateRequest,
                                                            $compile, $interpolate,
                                                            transcludeHelper,
                                                            $templateCache,
                                                            reloadableHelperTestService,
                                                            quickUI,
                                                            /*angFunc,*/
                                                            xUI) {



      reloadableHelper.saveDirectiveCtx(reload_name, arguments)
      var utilsParent = transcludeHelper.new(this);

      function link(scope, element, attrs, ctrl, transclude) {
        var url = '';
        url = 'g/red/js/progBtnDir.html'
        url = 'g/red/js/'+reload_name+'Dir.html'

        $templateRequest(url).then(
            function (html) {
              var xUIHelper = xUI.create();
              element.on('remove', function () {
                scope.destroyStreams = true;
                scope.destroyed = true;
                scope.$destroy();
              })
              scope.destroyStreams = false
              //var utilsParentDict = utils.dictTemplates;
              var utils = transcludeHelper.new();
              utils.dictTemplates = utilsParent.dictTemplates; //copy over dictionary of templates
              utils.$compile = $compile;
              utils.loadTemplate(html, element, attrs);
              scope.render(utils);

              //stuff

              scope.$watch('vm.config',
                  function (v, oldVal) {
                    if (v != null) {
                      v.fxRefresh = function refreshQuickReloadableList() {
                        //utilsParent.debug('inside fxrefresh')
                        console.log('debug inside fxresfresh')
                        scope.render();
                      }

                      v.onSettings = function () {
                        scope.onSettings();
                      }
                    }
                    if (oldVal == null) {
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

        var newerDdo = reloadableHelper.recompileDirective(reload_name, arguments, this, repeat)
        if (newerDdo) {
          return newerDdo
        }

        utilsParent.storeTemplate(tElem, attrs);
        utilsParent.reloadTemplate = tElem.clone();
        //alert('defined ddo')
        function defineDirectiveDefaults() {
          if (attrs.selectedIndex === null) {
            attrs['selectedIndex'] = "-1";
          }
          ;
          //utils.defaultAttr('dataObject', "{}", attrs);
        }

        defineDirectiveDefaults();
        console.warn('compile.2');

        return {
          pre: function (scope, element, attrs, controller, transclude) {
            console.log('transclude', transclude)
            return;
          },
          post: link
        };
      }
      //var dirScope = null
      if ( scopeForDir == null ) {
        scopeForDir = {
          config:'=',
          refresh: '='
        }
      }
      var ddo = {
        scope: scopeForDir,
        controller: reload_name+'Ctrl',
        controllerAs: 'vm',
        bindToController:true,
        compile: compile
      };
      reloadableHelper.directives[reload_name] = ddo;
      return ddo;
    };


    console.log('reload', app.reloadableDirective)
    //debugger;

    app
        .reloadableDirective(reload_name, quickReloadableDir2);


    var QuickReloadablelistController2 = function
        QuickReloadablelistController_($scope,
                                       transcludeHelper,
                                       sh,
                                       quickFormHelper,
                                       dialogService,
                                       pubSub,
                                       quickUI) {

      var config = $scope.vm.config;
      if (config == null) {
        config = {}
      }
      ;

      this.$scope = $scope;


      $scope.render = function render(utils) {
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

        var dictTypes = window.dictTypes;
        var dictAttrs = window.dictAttrs;


        quickUI = quickUI.create();
        var q = quickUI;
        //var children = utils.templateContent.find('*');
        q.process(utils.templateContent, dictTypes, dictAttrs)

        var config = $scope.vm.config;

        config = sh.dv(config, {});
        $scope.settings = sh.dv(config.settings, {"showSettingsButton": true});

        if (scope.vm.config != null) {
        }

        if ( fx1) {
          fx1(element, scope, utils)
        }

        html = utils.getFinalTemplate();


        element.html($compile(html)(scope));

      }
    }
    app
        .reloadableController(reload_name + 'Ctrl',
        QuickReloadablelistController2);

  }
  reloadableDirHelper('progBtn2',
      {lblX:'@'},
      function x(element, scope, utils) {
        utils.templateContent.find('#lblyyy').text('s');
        utils.templateContent.find('#lbl2').text('s');
      }
  )

  reloadableDirHelper('progBarList',
      {lblX:'@', name:'@',
        progressBarProgress: "@",
        progressType:'@', leftText:'@',
        rightText:'@',
       // txt2:'@',
        //txt:'@',
      //  ppp:'@'
      },
      function x(element, scope, utils) {
        utils.templateContent.find('#lblyyy').text('s');
        utils.templateContent.find('#lbl2').text('s');
      }
  )

}());
