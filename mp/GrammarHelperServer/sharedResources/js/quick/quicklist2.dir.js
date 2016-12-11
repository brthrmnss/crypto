//'use strict';

(function(){
  var reload_name = 'quicklist2';
  var urlPath= 'g/js/quick/';

  var quickList2 = function quickList2_($templateRequest, $compile,
                                        $interpolate, transcludeHelper,
                                        $timeout, sh) {

    var utils = transcludeHelper.new();

    if ( reloadableHelper ) {
      reloadableHelper.saveDirectiveCtx(reload_name, arguments)
    }
    // debugger;
    var utilsParent = transcludeHelper.new(this);
    function link(scope, element, attrs, ctrl, transclude){

      var urlTemplate = '';
      urlTemplate = urlPath + reload_name + '.dir.html'
      //console.error('reload', urlTemplate);

      $templateRequest(urlTemplate ).then(
          function onCreateDomElements(html){
            var s = {};
            var ctrl = scope.vmC;
            /*var templateContent = angular.element(html);
             utils.templateContent = templateContent;
             utils.userTemplateContent = templateOriginal;
             utils.userTemplateContent = dictTemplates[attrs.title]
             utils.userContent = element;*/
            utils.loadTemplate(html, element, attrs);

            utils.copyContentGroup("header", '#headerContent');
            utils.copyContentGroup("footer", '#footerContent');

            if ( attrs.showTitle != false && attrs.showTitle != 'false'  ) {
              var showPanel = utils.ifDefinedAddTo(attrs.title, '#headerContent');
            }
            utils.copyContentGroup("subHeaderContent", '#subHeaderContent');
            utils.ifDefinedAddTo(attrs.subtitle, '#subHeaderContent');

            //remove panel styling
            utils.ifFalse(attrs.panel, function () {
              utils.templateContent/*.find('#quickListTemplate')*/.removeClass('panel');
              utils.templateContent/*.find('#quickListTemplate')*/.removeClass('panel-default');
            });
            utils.ifFalse(attrs.showPanel, function () {
              utils.templateContent/*.find('#quickListTemplate')*/.removeClass('panel');
              utils.templateContent/*.find('#quickListTemplate')*/.removeClass('panel-default');
            });

            s.copyListContentsOrListItems = function copyListContentsOrListItems(){
              //why: by default, we expect dev to make own list and pass it in
              if ( attrs.plainList == 'true') {
                utils.templateContent.find('#bodyContent').empty();
                var listContent = utils.copyContentGroup2("list", '#bodyContent');
              } else {
                var listContent = utils.copyContentGroup2("list", '#listContent');
              }

            }

            s.copyListContentsOrListItems();
            //enable user to specify listContent area

            var config = scope.vmC.config;
            config = sh.dv(config, {});
            attrs.maxHeight = sh.dv(attrs.maxHeight,  config.maxHeight );
            //console.error('l', attrs.maxHeight, config);
            //if max height
            utils.ifDefined(attrs.maxHeight, function(){
              //console.error('l')
              utils.templateContent.find('#bodyContent')
                  .css('max-height', attrs.maxHeight);
              utils.templateContent.find('#bodyContent')
                  .css('max-height', attrs.maxHeight);
              utils.templateContent.find('#bodyContent')
                  .css('overflow-y', 'scroll');
            });

            utils.ifDefined(attrs.paddingLeft, function(){
              utils.templateContent.find('#listContent')
                  .css('padding-left', attrs.paddingLeft);
            });

            attrs.paddingTop = sh.dv(attrs.paddingTop, 0);
            utils.ifDefined(attrs.paddingTop, function(){
              utils.templateContent.find('#listContent')
                  .css('padding-top', attrs.paddingLeft);
            });



            //replace repeat with vmC.items;

            //$interpolate(attrs.items)($scope);

            var wrapList = '<md-list-item class="md-3-line_ test-background" ng-repeat="item in vmC.items" ng-click="goTo(item)"></md-list-item>'
            utils.ifDefined(attrs.itemRendererClass, function () {
              wrapList = angular.element(wrapList).addClass(attrs.itemRendererClass)[0];
            });
            utils.ifContentDefinedAddTo('item-renderer', '#listContent', wrapList);

            utils.ifDefined(attrs.id, function () {
              utils.templateContent.attr(attrs.id)
            });

            //console.log('asdf', scope.title, scope.grid)
            //Turn on grid
            utils.ifTrue(ctrl.grid, function () {
              utils.templateContent.find('#grid').removeAttr('ng-non-bindable');
            })

            if ( scope.vmC.items != null ) {
              var selectedItem = scope.vmC.items[parseInt(attrs.selectedIndex)];
              //if ( selectedItem )
              //  selectedItem.selected = true;
            }

            if ( attrs.selectedIndex != null ) {
              var selectedIndex = parseInt(attrs.selectedIndex);
              utils.templateContent.find('md-tabs').attr('md-selected', 'vmC.selectedIndex');
              utils.templateContent.find('md-tabs').attr('md-selected2', '{{selectedIndex}}');
              utils.templateContent.find('md-tabs').attr('md-selected3', '{{vmC.selectedIndex}}');
              console.log('setting selected index', selectedIndex, scope.vmC.selectedIndex);
            }
            if ( scope.vmC.selectedIndex != null ) {
              if ( scope.vmC.items != null ) {
                var selectedIndex = parseInt(scope.vmC.selectedIndex);
                var selectedItem = scope.vmC.items[selectedIndex];
              }
            }

            html = utils.templateContent[0];

            console.log('QuickList.init', ctrl.title, ctrl.grid);

            element.append($compile(html)(scope));

            //will set the selected index based on value, of not already set
            if ( selectedIndex != null &&
                scope.setOnce != true &&
                config.autoSelectOnRefresh != false
            ) {
              $timeout(function setItem() {
                if ( scope._selectedItem != selectedItem) {
                  return;
                }

                scope.select(selectedItem);
              }, 10);
              scope._selectedItem = selectedItem;

              //utils.templateContent.find('md-tabs').attr('gggggg', 'selectedIndex');
              //utils.templateContent.find('md-tabs').attr('md-selected', 'selectedIndex');
            }

            console.log('html output', html)


            element.bind('click', function (event) {
              if ( event.target.id === 'btnC') {
                controllerReference.$scope.selectIndex(3);
              }
              //console.log(event.target.id, event);
              return;
              scope.model[attrs.selectedIndex] = "New value";
              scope.$apply();
            });

          }
      )

      scope.$watch('vmC.selectedIndex', function(newVal,b) {
        if ( b == undefined ) {
          return;
        }
        if ( controllerReference.items == null ) {
          return;
        }

        var item = controllerReference.items[newVal];
        console.log('vmC.selectedIndex', newVal, b, item);
        if ( controllerReference.inited != true ) {
          return;
        }
        controllerReference.$scope.select(item);
      });

      scope.$watch('items', function(a,b) {
        console.log('top items set', controllerReference.$id, controllerReference.items, controllerReference.items2, 'to' , b );
        controllerReference.$scope.items = b;
      });


      scope.$watch('selectedItem', function (v) {

      });
      scope.$watch('selectedItem2', function (v) {
        if ( v == undefined ) {
          return;
        }
        console.log('selectedItem2 changed, new value is: ' , v );
      });

      scope.$watch(function () {
        return scope.vmC.selectedItem;
      }, function (v, oldVal) {
      });
      scope.$watch('vmC.selectedItem', function (v, oldVal) {
        if ( scope.vmC.items != null ) {
          console.log('selectedItem... changed, new value is: ',
              v, scope.vmC.items.indexOf(v));
        }
        if ( angular.isString(v)){
          v = JSON.parse(v);
        }
        if ( v == undefined ) {
          return;
        }
        if ( scope.vmC.selectedItem == v ) {
          //return;
        }

        var selectedIndex = scope.vmC.items.indexOf(v);

        function findItem(items, prop, val ) {
          for (var i = 0, len = items.length; i < len; i++) {
            //lookup[array[i].id] = array[i];
            if ( items[i][prop]==val ) {
              return items[i]
            }
          }
          return null;
        }

        if ( selectedIndex == -1 ) {

          v = findItem(scope.vmC.items, 'name', v.name);
          selectedIndex = scope.vmC.items.indexOf(v);
        }

        if ( selectedIndex == -1 ) {
          console.log('could not set value to', v)
          return;
        };

        if ( scope.vmC.selectedIndex == selectedIndex) {
          console.log('selectedItem', 'id the same');
          return;
        };

        console.log('selectedItem changed, new value is: ' , v, scope.vmC.items.indexOf(v));
        scope.vmC.selectedIndex = selectedIndex;
        scope._selectedItem = v; //prevent init from setting value
        scope.select(v);
      });

      scope.selectedItem2 = 'test'
      controllerReference.$id = Math.random();
    };

    var controllerReference = null;
    var compile = function (tElem, attrs) {

      /*templateOriginal = tElem.clone();
       dictTemplates[attrs.title] = templateOriginal;
       utils.tX = templateOriginal;
       console.log('compile', attrs.title);
       */
      function defineDirectiveDefaults() {
        if ( attrs.selectedIndex == null  ) {
          attrs['selectedIndex'] = "-1";
        };
      }
      defineDirectiveDefaults();

      utils.storeTemplate(tElem, attrs);
      //utils.storeUserContent(tElem);
      return {
        pre: function(scope, element, attrs, controller){
          controllerReference = controller;
          return;
        },
        post: link
      };
    }
    return {
      scope: {
        title: '@',
        name: '@',
        items2:'@',
        items: '=',
        grid:"@",
        fxSelectItem: '&',
        fxItemSelected: '&',
        selectedIndex: '=',
        _selectedIndex2: '=',
        selectedItem: '@',
        selectedItem2: '=',
        config:'='
      },
      controller: reload_name+'Ctrl',
      controllerAs: 'vmC',
      bindToController:true,
      // button ng-click="fxSelectItem"
      //link: link ,
      compile: compile
      // templateUrl: 'scripts/core/header.menu.html'
    };
  };


  var QuickListCtrl = function QuickListCtrl_ ($scope) {

    $scope.config = $scope.vmC.config;

    var config = $scope.config;
    config = sh.dv(config, {})

    $scope.config = $scope.vmC.config = config;


    //TODO: Support watching config on scope?
    //console.error('quicklist', $scope)

    $scope.goTo=function (item) {
      console.log('goTo', item);
      if ( item === $scope.selectedItem ) {
        return;
      }
      $scope.setOnce = true;
      if ( item != null ) {
        item.selected = true;
      }
      if ( $scope.selectedItem != null ) {
        $scope.selectedItem.selected = false;
      }
      $scope.selectedItem = item;
      if ( $scope.vmC )
        if ($scope.vmC.fxItemSelected()==null) {
          return;
        }

      var selectedIndex = $scope.vmC.items.indexOf(item);

      console.log('goTo.selectedIndex',  selectedIndex);

      $scope.vmC.selectedItem = (item);
      $scope.vmC.selectedIndex = $scope.vmC.items.indexOf(item);

      $scope.vmC.fxItemSelected()(item); //onSelectMenuItem;
///debugger
      sh.callIfDefined($scope.config.fxItemSelected, item)
    }

    $scope.select = function selectItem(item) {
      console.log('select', item, '...change')
      $scope.goTo(item);
    }
 

    $scope.selectIndex = function selectIndex(index) {
      $scope.$apply(function () {
        console.log('selectIndex', index);
        var item = $scope.items[index];
        $scope.goTo(item);
      });
    }

    this.$scope = $scope;

    this.inited = true;
  }

  var Dir = quickList2;
  var Ctrl = QuickListCtrl;
  if ( window.reloadableHelper ) {
    // debugger;
    function defineQuickReloadingDir() {
      var app = angular.module('com.sync.quick');
      window.reloadableHelper.upgradeApp(app);
      return app;
    }
    var _app = defineQuickReloadingDir();
    _app.reloadableController(reload_name+'Ctrl', Ctrl);
    _app.reloadableDirective(reload_name, Dir);
  } else {
    //debugger;
    app.reloadableController(reload_name+'Ctrl',  Ctrl);
    app.reloadableDirective(reload_name, Dir);
  }

}());

