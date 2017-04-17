//'use strict';

(function(){

  var reload_name = 'quickcrud2';
  var urlPath= 'g/js/quick/';

  var quickCrud2 = function quickCrud2($templateRequest,
                                       $compile,
                                       $interpolate,
                                       transcludeHelper2
  ) {

    reloadableHelper.saveDirectiveCtx(reload_name, arguments)


    //quickUI = quickUI.create();
    //var utilsParent = transcludeHelper2.create();

    function link(scope, element, attrs, ctrl, transclude){
      var urlTemplate = '';
      urlTemplate = urlPath + reload_name + '.dir.html'
      $templateRequest(urlTemplate ).then(
          function onCreateDomElements(html){
            var $scope = scope;

            element.on('$destroy', function(){
              //alert('qf destroyed');
            })
            scope.id = Math.random();
            //alert('created ' +  scope.id);

            //var utilsParentDict = utils.dictTemplates;
            var tH2 = transcludeHelper2.create(this);
            tH2.setupTransclution(reload_name, scope, $compile, element, html, attrs);
            scope.render(tH2);
            
            return;
            utils.dictTemplates = utilsParent.dictTemplates; //copy over dictionary of templates
            utils.$compile = $compile;

            utilsParent.destroyDuplicateScopes(element,scope);
            utils.loadTemplate(html, element, attrs);
            utils.setupTransclution(scope, $compile, element)
            //console.error('qf', 'pre-', scope.vm)
            scope.render(utils, attrs, element);

          }
      )

    };

    var compile = function (tElem, attrs, repeat) {


      var newerDdo = reloadableHelper.recompileDirective(reload_name,arguments, this,  repeat)
      if ( newerDdo ) {
        return newerDdo
      }

      TransclutionHelper2.addInitStuff(reload_name, tElem, attrs)

      console.error('what is -element', 'par', tElem[0].outerHTML.length )
     // utilsParent.storeTemplate(tElem, attrs);
     // debugger

      function defineDirectiveDefaults() {
        if ( attrs.selectedIndex === null  ) {
          attrs['selectedIndex'] = "-1";
        };
        if ( attrs.views == null  ) {
          attrs['views'] = {
            'a': 'comp:#viewA',
            'b': '<test-comp id="viewB">View B</test-comp>',
            'c': 'dom:#viewC'
          };
        };
      }
      defineDirectiveDefaults();
     // utilsParent.defaultAttr('testAttr', '5', attrs)
    //  utilsParent.storeUserContent(tElem);
      //console.log('fxCompile','url',attrs);
      return {
        pre: function(scope, element, attrs, controller){
          return;
        },
        post: link
      };
    }

    var ddo = {
      scope: {
        urlSrc:'@',
        title: '@',
        showTitle2: '@',
        fxItemSelected: '&',
        fxItemSaved: '&',
        fxsaved: '&',
        //  testAttr: '@',
        // datainput: '=',
        // formObject: '=',
        //  dataObject:'=',
        config: '=',
        refresh: '='
        //id: '@',
        //where objects come from
      },
      controller: reload_name+'Ctrl',
      controllerAs: 'vm',
      bindToController:true,
      compile: compile
    };

    return ddo;
  };


  var quickCrud2Controller2 =
      function quickCrud2Controller2 ($scope,
                                      $log,
                                      $restHelper,
                                      sh,
                                      dialogService
      ) {
        this.$scope = $scope;
        var scope = $scope;
        var ctrl = this;

        var config = $scope.vm.config;
        //sh.throwIfNull(config, 'config must be set')
        if ( config == null ) { config = {} };
        $scope.vm.config = config;
        console.log('QuickCrudController', 'url', $scope.vm);
        // dialogService.openDialog('testCrudDialog')


        config.quickListConfig = sh.dv(config.quickListConfig, {});
        config.quickFormConfig = sh.dv(config.quickFormConfig, {});

        $scope.render = function render( tH2,   attrs, element  ) {
          if ( $scope.tH2 == null ) {
            $scope.tH2 = tH2;
          } else {
            tH2 = $scope.tH2;
          }

          tH2.resetTemplate()
 
         // utils.renderAttempt($scope)
         // utils.showElements(element)

          var config = scope.vm.config;


          //  debugger
          if (config == null) {
            throw new Error('null config')
          }

          //debugger
          config.fxReRender = function onReRender() {
            $scope.render();
          }

          config.quickListConfig = sh.dv(config.quickListConfig, {});
          config.quickFormConfig = sh.dv(config.quickFormConfig, {});

          config.fxRefresh = function onRefresh() {

            var config = scope.vm.config;
            console.log('refresh', config.dataObject);

            if (config.dataObject != null) {
              scope.dataObject = config.dataObject;
            }
            ;
            if (config.formObject != null) {
              scope.formObject = config.formObject;
            }
            ;


            if (config.quickFormConfig != null) {
              scope.quickFormConfig = config.quickFormConfig;
            } ;
            if (config.quickListConfig != null) {
              scope.quickListConfig = config.quickListConfig;
            } ;

            //do not need this, set defaults instead
            //scope.formObject.reload = true;
            scope.refresh = Math.random();


            setTimeout(function () {
              console.log('refresh later')
              scope.$apply(function () {
              });
              return;
            }, 200);
            /*
             setTimeout(function () {
             console.log('refresh later')
             scope.$apply(function () {
             scope.refresh = Math.random();
             });
             return;
             }, 200);
             */
          }
          config.fxSaveCurrentItem = function fxSaveCurrentItem(newItem) {
            if ( newItem != null ) {
              config.dataObject = newItem;
              $scope.dataObject = newItem;
            };


            return $scope.saveFormObject($scope.dataObject);


          }


          if ( attrs ) {
            if (attrs.showTitle != null) {
              attrs.showTitle = attrs.showTitle
                  .split('[[').join('{{')
                  .split(']]').join('}}');
            }
            utils.ifContentDefinedAddTo(attrs.showTitle,
                '#qCTitle', null, true, true);
            utils.ifContentDefinedAddTo(config.title,
                '#qCTitle', null, true, true);
            console.debug('showtitle', attrs.showTitle);
          }

          function removeLayoutCols() {
            utils.templateContent.find('#containerCols').removeClass('quick-crud-container');
          }
          tH2.ifFalseHide(config.showList, '#quick-crud-leftcol');
          tH2.ifFalse(config.showList, removeLayoutCols);
          tH2.ifFalseHide(config.showList, '#btnRefresh');
          tH2.ifFalseHide(config.canCreate, '#btnNew');

          tH2.ifFalseHide(config.showForm, '#colRight');
          tH2.ifFalse(config.showForm, removeLayoutCols);

          tH2.ifTrueShow(config.showFilter,
              '#filterSelect');
          tH2.ifTrueShow(config.showSettings,
              '#btnSettings');

          /*
           utils.transclude('item-renderer', '#listHolder', true,
           function (str) {

           }, true, false
           );
           */

          tH2.transclude('item-renderer', '#listHolder', true,
              null, false, false
          );


          var config = scope.vm.config;
          if ( config != null ) {
            if (config.dataObject != null) {
              console.debug('setting data object', config.dataObject)
              //scope.vm.dataObject = config.dataObject;
              scope.dataObject = config.dataObject;
            }
            ;
            if (config.formObject != null) {
              console.debug('setting formObject', config.formObject)

              //scope.vm.formObject = config.formObject;
              scope.formObject = config.formObject;
            }
            ;
            if (config.quickFormConfig != null) {
              scope.quickFormConfig = config.quickFormConfig;
            };
            if (config.quickListConfig != null) {
              scope.quickListConfig = config.quickListConfig;
            };


          } 


          $scope.createWatchers(tH2);

          html = tH2.getFinalOutput();

          var a = $('<div>empty</div>')
          a = null;

          tH2.finishContent(a)

          return;

         // utils.finishContent(html)
          // element.append($compile(html)(scope));
          scope.element = element;


        }



        $scope.createWatchers =  function createWatchers(utils) {
          sh.checkIfTrueAndSet= function s(o, prop) {
            var val = o[prop];
            if ( val ) {
              return true;
            }
            o[prop];
          }
          if ( sh.checkIfTrueAndSet($scope, 'createdWatchers' ) ) {
            return; //$scope.createdWatchers
          }
          /*     scope.$watch('vm.formObject', function (v, oldVal) {
           if (scope.vm.formObject != null) {
           console.log('scope.vm.formObject... changed: ',
           scope.vm.formObject, v);
           }
           console.log('quickCrud',
           'scope.vm.formObject... changed: ',
           scope.vm, v,oldVal);
           });

           scope.$watch('vm.formObject2', function (v, oldVal) {
           if (scope.vm.formObject2 != null) {
           console.log('scope.vm.formObject2... changed: ',
           scope.vm.formObject2, v);
           }
           console.log('quickCrud',
           'scope.vm.formObject2... changed: ',
           scope.vm, v,oldVal);
           });*/
          /*

           //when data input is from parent ... copy object to
           //scope
           scope.$watch('vm.datainput', function (v, oldVal) {
           if (scope.vm.datainput != null) {
           console.log('scope.vm.datainput... changed: ',
           scope.vm.datainput, v);
           //scope.vm.dataObject = v;
           scope.dataObject = v;
           }
           console.log('quickCrud',
           'scope.vm.datainput... changed: ',
           scope.vm, v,oldVal);
           });

           scope.$watch('vm.dataObjectB', function (v, oldVal) {
           if (scope.vm.dataObjectB != null) {
           console.log('scope.vm.dataObject... changed: ',
           scope.vm.dataObjectB, v);
           //scope.vm.dataObject = v;
           scope.dataObject = v;
           }
           console.log('quickCrud',
           'scope.vm.dataObjectB... changed: ',
           scope.vm, v,oldVal);
           });
           */

          /*
           scope.$watch('vm.formObject', function (v, oldVal) {
           if (scope.vm.formObject != null) {
           console.log('scope.vm.formObject... changed: ',
           scope.vm.formObject, v);
           }
           console.log('quickCrud',
           'scope.vm.formObject... changed: ',
           scope.vm, v,oldVal);
           });
           */
          utils.$scope = scope;
          utils.watch_copyToScope('vm.formObject', 'formObject');
          utils.watch_copyToScope('vm.dataObject', 'dataObject');

          //copy form config from objects
          scope.$watch('vm.config', function (v, oldVal) {

            if (v == null) {
              return
            }
            $scope.initQCrud()
            $scope.onRefresh();
            $scope.setFormOnListToggle = true
            return;//
          });

          scope.$watch('vm.refresh', function (v, oldVal) {
            if (v != null) {
              console.log('config refresh', v);
              var c = scope.config;
              scope.config = null;
              scope.config = c;
            }
            ;
            /*
             console.log('quickCrud',
             'scope.vm.dataObjectB... changed: ',
             scope.vm, v,oldVal);
             */
          });


          /*scope.$watch('vm.config.dataObject', function (v, oldVal) {
           if (v != null) {
           console.log('config dataObject changed', v);
           };
           });*/
        }

        $scope.url = 'http://127.0.0.1:10001/api/test_contacts';
        function loadUrl() {
          if ( $scope.vm.urlSrc != null ) {
            $scope.url = $scope.vm.urlSrc;
          }
        }
        loadUrl();


        //  $scope.dataObject = {test:'y'};
        $scope.selectedIndex = 0;


        $scope.initQCrud = function initQCrud() {
          var config = $scope.vm.config;
          if ( config == null ) { config = {} };
          if ( config.reloadOnRefresh == null){
            config.reloadOnRefresh = true;
          }
          config.fxRefreshList = $scope.onRefresh
          $scope.vm.config = config;
          if ( $scope.restHelper == null) {
            var restHelper = $restHelper._create();
            $scope.restHelper =
                restHelper ;
          } else {
            restHelper = $scope.restHelper;
          };



          var pg = config.paginatorConfig;
          pg = sh.dv(pg, {});
          $scope.paginatorConfig = pg;
          restHelper.fxListResults = function results(objs) {
            pg.paginator = restHelper.paginator;
            pg.restHelper = restHelper;
            //console.error('fx results...')
            sh.callIfDefined(pg.fxRefresh, objs);
            $scope.updateListData(objs)
            $scope.selectedIndex = 0;
          };

          restHelper.url = $scope.url;
          if ( /*config.remote == false ||*/
          config.restHelperConfig != null ) {
            // restHelper.inMemory = true;
            var restHelperConfig = config.restHelperConfig;
            if ( restHelperConfig == null ) { restHelperConfig = {}}

            restHelper.config = restHelperConfig;
            if ( restHelperConfig.dataSrc != null ) {
              restHelper.$http = restHelperConfig.dataSrc;
            }

            //config.dataSrc = self.dataSrc;
          };
          restHelper.initRestHelper();
          if ( config.formWidth != null  ) {
            $scope.vm.colRightStyle = {};
            //debugger;
            // $scope.vm.colRightStyle = {'background-color':'blue'}
            $scope.vm.colRightStyle['flex'] = '0 1 '+config.formWidth+'';
          }


          return restHelper;
        }
        var restHelper = $scope.initQCrud()


        $scope.updateListData = function updateListData(data ) {
          //why: when list updated,
          $scope.listData = data;
          var config = $scope.vm.config;
          config.list = data;

          if ( config.quickListConfig) {
            config.quickListConfig.list = data;
          }
          //why: persist selected item (refresh item in form)
          if ( $scope.selectedItem == null ) {
            return
          }
          sh.each($scope.listData, function(i,obj){

            if ( obj.id == $scope.selectedItem.id ) {
              if ( config.reloadOnRefresh
                  && config.autoSelectOnRefresh != false )
                $scope.onSelectListItem(obj);
            }
          })
        }



        function initCrudList(refreshMode) {
          if ( config != $scope.vm.config && $scope.vm.config ) {
            console.warn('replacing null config with non-null config')
            config = $scope.vm.config
            if ( restHelper.url == null )
              restHelper.url = config.restHelperConfig.url;
          }
          console.log('init crud list',  config.name, config)
          if ( config.paginate != false ) {
            restHelper.list2(0,10,{}).success(
                function (data) {
                  $scope.updateListData(data, refreshMode)
                  $scope.selectedIndex = 0;
                  $scope.paginator = restHelper.paginator
                  //debugger;
                  if ( $scope.setFormOnListToggle ) {
                    //debugger;
                    $scope.setFormOnListToggle = false;
                    if ( data.length > 0 )
                      $scope.onSelectListItem(data[0]);
                  }

                });
          } else {
            restHelper.list().success(function (data) {
              /* data = [{
               first_name: 'sean'
               }, {
               first_name: 'daktos'
               }];*/
              if ( config.listResultListProp != null ){
                var dataOrig = data;
                data = data[config.listResultListProp];
                if ( data == null ) {
                  console.warn('listResultsListProp' ,
                      'ruined, did not have prop',
                      data,config.listResultListProp, dataOrig )
                }
              }

              if ( config.listResults_ItemProp != null ) {
                var y = [];
                $.each(data, function copyProp(k, v) {
                  var dataModified = data[config.listResults_ItemProp];
                  y.push(dataModified);
                });
                /// debugger
                data = y;
              }



              $scope.updateListData(data)
              $scope.selectedIndex = 0;
            });
          }


        }
        // if ( config.remote != false ) {
        if ( config.noRemote != true ) {
          initCrudList();
        } else {
          $scope.updateListData(config.items)
        }
        //} else {
        //   $scope.listData = config.list;
        $scope.selectedIndex = 0;
        // }

        $scope.clickListItem = function (item ) {
          scope.item = item;
          //update quick-form;
        }

        $scope.onRefresh = function onRefresh() {
          initCrudList(true);
        }

        $scope.onNew = function onNew() {
          //restHelper.get();
          console.log('new');
          $scope.newMode = true;
          $scope.dataObject = {};
          $scope.selectedIndex = -1;
          if ( config.fxNew != null ) {
            config.fxNew($scope.dataObject);
          }

        }


        $scope.isNew = function isNew(o) {
          if ( config.showNewIndicator != true  ) {
            return false;
          }
          if ( $scope.dataObject.id == 0
              || $scope.dataObject.id == null ) {
            return true
          }
          return false;
        }

        $scope.onSettings = function onSettings() {
          sh.callIfDefined(config.fxSettings);
        };


        $scope.saveFormObject = function saveFormObject(o) {
          $log.log('save', o);

          if ( config.fxSave == null ) {
            if ($scope.newMode == true || o.id == null) {
              restHelper.save(o,false)
                  .success(function onSaved(id) {
                    console.log('saved', id);
                    //sh.copyProps(data, o);
                    sh.callIfDefined(config.fxSaveTemp, o);
                    config.fxSaveTemp = null;
                    $scope.onRefresh();
                    $scope.newMode = false
                  }).error(function oError(data) {
                console.log('error', data)
              })
            } else {
              restHelper.update(o).success(function onSaved(data) {
                console.log('updated');
                sh.callIfDefined(config.fxSaveTemp, o);
                config.fxSaveTemp = null;
                $scope.onRefresh();
              }).error(function oError(data) {
                console.log('error', data);
              })
            }

            if ($scope.vm.fxItemSaved != null &&
                $scope.vm.fxItemSaved() != null) {
              $scope.vm.fxItemSaved()(o);
            }
          } else {
            //will handle externally
            config.fxSave(o);
            $scope.newMode = false
          }
        }

        $scope.deleteItemC = function deleteItemC(item) {
          //console.log('delete', item)
          restHelper.delete(item.id).success(function onSaved(data) {
            //console.log('deleted');
            $scope.onRefresh();
          }).error(function oError(data, status) {
            if ( status== 410 ) { //(gone)
              $scope.onRefresh();
              return;
            }
            console.log('error', data)
          });
        };


        $scope.deleteItem = function deleteItem(item) {
          dialogService.showConfirm(
              'Are you sure you want to delete?',
              'This cannot be undone', function onDeleteItem() {
                //TODO fix implementation so it can pass objects
                $scope.deleteItemC(item)
              });
        };

        $scope.onSelectListItem = function onSelectListItem(item) {
          //$scope.dataObject=item;
          //$scope.formObject2 = item;
          console.debug('on selected', 'quick', item);
          $scope.testBind = {test:'y99'};
          var yyy = angular.copy(item);
          yyy = item;
          //delete yyy['$$hashKey'];
          //var yyy = {};
          // angular.extend(yyy, item);
          $scope.selectedItem = yyy;
          if ( config.fxClick ) {
            config.fxClick(yyy, item);
          }
          //asdf.g
          $scope.testBind = yyy;
          $scope.dataObject = yyy;

          $scope.vm.config.selectedItem = yyy;
          $scope.vm.config.selectedItemOrig = item;

          console.error('what is config?',  $scope.vm.config.quickFormConfig)
          //debugger;
          $scope.vm.config.quickFormConfig.fxChangeDataObject(item)
        };

        $scope.vm.config.quickListConfig.fxItemSelected = $scope.onSelectListItem;

        function autoComplete() {
          var self = $scope;
          self.simulateQuery = false;
          self.isDisabled    = false;
          // list of `state` value/display objects
          self.states        = loadAll();
          self.querySearch   = querySearch;
          self.selectedItemChange = selectedItemChange;
          self.searchTextChange   = searchTextChange;
          // ******************************
          // Internal methods
          // ******************************
          /**
           * Search for states... use $timeout to simulate
           * remote dataservice call.
           */
          function querySearch (query) {
            self.states =  $scope.listData;
            $log.info('query ...');
            var results = query ? self.states.filter( createFilterFor(query) ) : self.states
            return results;
          }
          function searchTextChange(text) {
            $log.info('Text changed to ' + text);
          }
          function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
            sh.callIfDefined(config.fxFilterSelect, item)
          }
          /**
           * Build `states` list of key/value pairs
           */
          function loadAll() {
            return  $scope.listData;

            var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
            return allStates.split(/, +/g).map( function (state) {
              return {
                value: state.toLowerCase(),
                display: state
              };
            });


            // sh.each()


          }
          /**
           * Create filter function for a query string
           */
          function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
              var query = state.name;
              if (query == null) {
                query = ''
              }
              query = query.toString()
              var result  =  query.toLowerCase()
                      .indexOf(lowercaseQuery.toLowerCase()) != -1 ;
              return result

            };
          }
        }
        autoComplete();



      };

  var Dir = quickCrud2;
  var Ctrl = quickCrud2Controller2;
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
