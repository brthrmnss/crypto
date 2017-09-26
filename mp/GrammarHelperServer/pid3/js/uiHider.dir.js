//'use strict';
(function(){

  var reload_name = 'uiHider'
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
    var utilsParent = transcludeHelper.new(this);
    function link(scope, element, attrs, ctrl, transclude){
      var url = '';
      url = 'g/pid/js/uiHider.dir.html'
      $templateRequest(url ).then(
          function(html){
            var xUIHelper = xUI.create();

            element.on('remove', function(){
              //debugger;
              scope.$destroy();
            })

            //var utilsParentDict = utils.dictTemplates;
            var utils = transcludeHelper.new();
            utils.dictTemplates = utilsParent.dictTemplates; //copy over dictionary of templates
            utils.$compile = $compile;
            utils.loadTemplate(html, element, attrs);
            scope.render(utils);

            var $scope = scope;

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

      var newerDdo = reloadableHelper.recompileDirective(reload_name,arguments, this,  repeat)
      if ( newerDdo ) {
        return newerDdo
      };

      utilsParent.storeTemplate(tElem, attrs);
      utilsParent.reloadTemplate = tElem.clone();
      //alert('defined ddo')
      function defineDirectiveDefaults() {
        if ( attrs.selectedIndex === null  ) {
          attrs['selectedIndex'] = "-1";
        };
        if ( attrs.config == null  ) {
          attrs['config'] = "{}";
        };
        if ( attrs.yyy == null  ) {
          attrs['yyy'] = "hhh";
        };
        //utils.defaultAttr('dataObject', "{}", attrs);
      }
      defineDirectiveDefaults();

      return {
        pre: function(scope, element, attrs, controller, transclude){
          return;
        },
        post: link
      };
    }
    var ddo = {
      scope: {
        config:'=',
        title:"@",
        refresh: '=',
        yyy:"="
      },
      controller: reload_name+'Ctrl',
      controllerAs: 'vm',
      bindToController:true,
      compile: compile,
    };
    return ddo;
  };

  app
      .reloadableDirective(reload_name, quickReloadableDir2);


  var QuickReloadablelistController2 = function
      QuickReloadablelistController_ ($scope,
                                      transcludeHelper,
                                      sh,
                                      quickFormHelper,
                                      dialogService,
                                      quickUI,
                                      appService) {
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

      function asdf() {
        var dictTypes = {};
        var dictAttrs = {};

        //alert('d')

        dictTypes['t'] = {changeTo: 'textarea', addHTML: '<checkbox>sdfsdf', addClass: 'textarea_class'};
        dictTypes['tx'] = {changeTo: 'div', addHTML: '<checkbox>', addClass: 'textarea_class'};
        dictTypes['navbtn'] = {changeTo: 'div', addHTML: '<checkbox>', addClass: 'navBtn'};
        dictTypes['mini-panel'] = {addClass: 'mini-panel', changeTo: 'div'};

        dictTypes['center-content'] = {
          wrapContentFx: function warpContent(child, index, attrs, css) {
            return '<div class="center_content_item"><!-- auto center --></div>'
          },
          addClass: "center_content",
          changeTo: 'div'
        };


        dictAttrs['prettybtn'] = {addClass: 'mbButton marty'};
        dictTypes['spacer'] = {replaceWith: '<div style="width:10px;height:10px;"></div>'};
        dictAttrs['makeredbtn'] = {ifVal: true, addClass: 'redbtn', addHTML: '<span>red btns</span>'};
        dictAttrs['horizontal-layout'] = {
          ifVal: true, addClass: 'horizontal-flex-container',
          addClassToChildren: 'horizontal-flex-container-flex-item pad10',
          //debugChildren:true,
          modifyChildrenFx: function (child, index, attrs, css) {
            if (attrs.stretch != null) {
              child.addClass('horizontal-flex-container-flex-item-stretch');
            }
          },
          _addHTML: '<span>red btn</span>', alert: true
        }
        ;
        dictAttrs['add-class-to-children'] = {
          modifyChildrenFx: function (child, index, attrs, css, parentAttrs) {
            var addToClassChildren = parentAttrs['add-class-to-children']
            if (addToClassChildren != null) {
              child.addClass(addToClassChildren);
            }
          },
          alert: true
        };
        dictAttrs['upcase'] = {
          addCSS: {'text-transform': 'uppercase'}
        }

        dictAttrs['absolute'] = {
          addCSS: {'position': 'absolute', top: '0px', left: '0px'}
        }
        dictAttrs['bottom'] = {
          addCSS: {'position': 'absolute', top: '', bottom: '0px'}
        }
        dictAttrs['relative'] = {
          addCSS: {'position': 'relative'}
        }
        dictAttrs['aboslute-container'] = {
          addCSS: {'position': 'relative'}
        }
        dictAttrs['bg-offwhite'] = {
          addCSS: {'background-color': '#EAEAE2'}
        }
        dictAttrs['bg-blue'] = {
          addCSS: {'background-color': '#09FFFF'}
        }
        dictAttrs['bg-red'] = {
          addCSS: {'background-color': 'red'}
        }
        dictAttrs['bg-green'] = {
          addCSS: {'background-color': 'green'}
        }
        dictAttrs['bg-orange'] = {
          addCSS: {'background-color': 'orange'}
        }
        dictAttrs['bg-black'] = {
          addCSS: {'background-color': 'black'}
        }
        dictAttrs['hide'] = {
          addCSS: {'display': 'none'}
        }

        dictAttrs['wh5050'] = {
          addCSS: {
            'width': '50%',
            'height': '50%'
          }
        }

        dictAttrs['pad10'] = {
          addCSS: {'padding': '10px'}
        }
        dictAttrs['pad5'] = {
          addCSS: {'padding': '5px'}
        }

        dictAttrs['white'] = {
          addCSS: {
            'color': 'white',
          }
        }

        dictAttrs['w100'] = {
          addCSS: {
            'width': '100%',
          }
        }

        dictAttrs['h100'] = {
          addCSS: {
            'height': '100%',
          }
        }

        dictAttrs['wh100'] = {
          addCSS: {
            'width': '100%',
            'height': '100%'
          }
        }

        dictAttrs['clip'] = {
          addCSS: {
            'overflow': 'hidden',
          }
        }
        dictAttrs['w50'] = {
          addCSS: {
            'width': '50%',
          }
        };
        dictAttrs['w30'] = {
          addCSS: {
            'width': '30%',
          }
        };
        dictAttrs['h50'] = {
          addCSS: {
            'height': '50%',
          }
        }


        window.dictTypes = dictTypes;
        window.dictAttrs = dictAttrs;

        console.log('wat is quickUI', quickUI)
        if (quickUI.create)
          quickUI = quickUI.create();
        else
          console.log('what is this quickui ...')
        var q = quickUI;
        //var children = utils.templateContent.find('*');
        q.process(utils.templateContent, dictTypes, dictAttrs)
      };

      var config = $scope.vm.config;

      config = sh.dv(config, {});
      $scope.settings = sh.dv(config.settings, {"showSettingsButton":true});

      scope.vm.config = config;

      function ifPropOnXCopyToY(prop, x, y ){
        var val = x[prop];
        if ( val ){
          y[prop] = val;
        }
      }

      ifPropOnXCopyToY('title', $scope.vm, config)

      //scope.vm.btnMsg = 'Show'+config.titleTxt;
      scope.vm.onShow = function onShow(name) {
        scope.vm.showing = ! scope.vm.showing;
        scope.vm.updateMsg();
      }
      scope.vm.updateMsg = function updateMsg(name) {
        scope.vm.btnMsg = 'Show';
        if (   scope.vm.showing ) {
          scope.vm.btnMsg = 'Hide';
        }
        if ( scope.vm.config.title ) {
          scope.vm.btnMsg += ' ' + scope.vm.config.title
        }
      }
      scope.vm.updateMsg()

      //console.log('uiHider data',utils.userContent.html());
      var html = utils.devContent.html();
      /*
      console.error('user content on hider', html, utils.userContent)
      console.error('templateContent',
          utils.templateContent.html());
      console.error('userTemplateContent',
          utils.userTemplateContent.html());
      console.error('userContent',
          utils.userContent.html());
      */
      //var oldContent =
      utils.templateContent.find('#content')
          .html(html);

      utils.templateContent.find('#holderDebug')
          .html(utils.userTemplateContent.html());

      var devContent = utils.devContent.html();
      var devContentInParentScope = devContent.trim();
      if ( devContentInParentScope.startsWith('{{')) {
        devContentInParentScope = devContent.replace('{{','{{'+'vm.$scope.$parent.')
      }

      function debugX_Text() {
        console.error('asdf', devContent, devContentInParentScope)
        var t = devContentInParentScope.replace(/\{/gi, '\\{');
        //console.error('what is t', t)
        utils.templateContent.find('#holderDebug2')
            .html( t );
        scope.vm.showDebug = true;
      }
      utils.templateContent.find('#content')
          .html(devContentInParentScope);


      html = utils.getFinalTemplate();
      element.html($compile(html)(scope));

    }
  }
  app
      .reloadableController(reload_name+'Ctrl',
          QuickReloadablelistController2);




  app.filter('prettyJSON', function () {
    function prettyPrintJson(json) {
      return JSON ? JSON.stringify(json, null, '  ') : 'your browser doesnt support JSON so cant pretty print';
    }
    return prettyPrintJson;
  });

}());
