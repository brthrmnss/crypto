//'use strict';
(function () {

    var reload_name = 'pid3Demo'
    var urlPath = 'g/pid3/js/';

    var quickReloadableDir2 = function quickReloadableDir2_($templateRequest,
                                                            $compile, $interpolate,
                                                            transcludeHelper2,
                                                            $templateCache,
                                                            reloadableHelperTestService,
                                                            quickUI,
                                                            appService,
                                                            quickFormHelper,
                                                            quickCrudHelper,
                                                            /*angFunc,*/
                                                            xUI) {

        reloadableHelper.saveDirectiveCtx(reload_name, arguments)
        //window.ddoFxArgs = Array.prototype.slice.call(arguments);
        // debugger; //only invoked 1x


        function link(scope, element, attrs, ctrl, transclude) {
            var urlTemplate = '';
            urlTemplate = urlPath + reload_name + '.dir.html'
            $templateRequest(urlTemplate).then(
                function onRenderDir(html) {
                    //reloadableHelperTestService = reloadableHelperTestService.create();
                    /*angFunc = angFunc.create();*/
                    var xUIHelper = xUI.create();

                    var tH2 = transcludeHelper2.create(this);
                    //debugger;

                    element.on('remove', function () {
                        //debugger;
                        //alert('destroyed');
                        scope.destroyStreams = true;
                        scope.destroyed = true;
                        scope.$destroy();
                    })
                    scope.destroyStreams = false
                    console.warn('link.2');

                    //var utilsParentDict = utils.dictTemplates;
                    // var utils = utilsParent.create();
                    //utils.dictTemplates = utilsParent.dictTemplates; //copy over dictionary of templates
                    tH2.setupTransclution(reload_name, scope, $compile, element, html, attrs);
                    scope.render(tH2);

                    var $scope = scope;


                    scope.$watch('vm.config',  function (v, oldVal) {
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
            // debugger;

            var newerDdo = reloadableHelper.recompileDirective(reload_name, arguments, this, repeat)
            if (newerDdo) {
                return newerDdo
            }

            //utilsParent.storeTemplate(tElem, attrs);
            //utilsParent.reloadTemplate = tElem.clone();

            //transcludeHelper2.
            TransclutionHelper2.addInitStuff(reload_name, tElem, attrs)

            //alert('defined ddo')
            function defineDirectiveDefaults() {
                if (attrs.selectedIndex === null) {
                    attrs['selectedIndex'] = "-1";
                }
                ;
                //utils.defaultAttr('dataObject', "{}", attrs);
            }

            defineDirectiveDefaults();

            return {
                pre: function (scope, element, attrs, controller, transclude) {
                    console.log('transclude', transclude)
                    return;
                },
                post: link
            };
        }
        var ddo = {
            scope: {
                config: '=',
                refresh: '='
            },
            controller: reload_name + 'Ctrl',
            controllerAs: 'vm',
            bindToController: true,
            compile: compile,
        };
        return ddo;
    };


    var QuickReloadablelistController2 = function
        QuickReloadablelistController_($scope,
                                       transcludeHelper2,
                                       sh,
                                       dialogService,
                                       pubSub,
                                       quickUI,
                                       appService,
                                       quickFormHelper,
                                       quickCrudHelper,
                                       quickListHelper) {
        //alert('...dddh')
        //var pubSub = pubSub.create();

        /*  pubSub.subscribe('no', function onNo(arg){
         console.log('who is saying no?', arg)
         })

         pubSub.publish('no', 'ia am')*/
        var config = $scope.vm.config;
        if (config == null) {
            config = {}
        }
        ;

        this.$scope = $scope;


        //console.log('asdf', appService)
        //appService.

        $scope.render = function render(utils) {
            if ($scope.utils == null) {
                $scope.utils = utils;
            } else {
                utils = $scope.utils;
            }

            $scope.errors = [];
            var element = utils.element;
            var $compile = utils.$compile;

            var scope = $scope;
            var config = $scope.vm.config;
            config = sh.dv(config, {});


            scope.generateListConfig = function generateListConfig() {
                var y = appService.gen()

                var cfg = {}
                cfg.asdf = 'sdfs';

                quickListHelper = quickListHelper.create();
                quickListHelper.loadConfig(cfg)
                var h = quickListHelper;
                h.listTitle('asdfddd')
                // h.list_addItems(x.items)

                /*
                 h.listItems =
                 h.listitemsBindable(asdf)
                 showInstantfilter
                 domFOrRow is here
                 maxRows
                 fxFilter?
                 */

                scope.configList = cfg;
                scope.configList.fxFilterRefresh = function fxFilterRefresh(n, o ) {
                    debugger
                    return false;
                }

                // debugger;

            }
            scope.generateListConfig();

            scope.generateCrudEditorFormConfig = function generateCrudEditorFormConfig() {
                var y = appService.gen()

                var cfgCrud = {};
                scope.configCrud = cfgCrud;


                var cfgCrudEditorForm = {}
                scope.configForm = cfgCrudEditorForm;

                quickFormHelper = quickFormHelper.create();
                // quickFormHelper.loadConfig(cfg)
                quickFormHelper.loadForm({}, cfgCrud, cfgCrudEditorForm)
                var h = quickFormHelper;
                // h.showTitle('List shit bost');

                cfgCrudEditorForm.fxRender = function fxRender(tH2, config) {

                }

                cfgCrud.quickListConfig = {};
                cfgCrud.quickListConfig.fxRender = function fxRender(tH2, config) {
                    //debugger
                    console.error('fxRender', tH2, config, cfgCrudEditorForm)
                    if ( cfgCrud.useTemplate ) {
                        console.error('fxRender', 'useTemplate',  cfgCrud.useTemplate )

                        //var utils = tH2;

                        utils.dev = {};
                        utils.dev.getContent = function getContentFromDevTemplate(jq) {
                            return utils.contentDev.find(jq)
                        }
                        var c = utils.dev.getContent('list_'+cfgCrud.useTemplate)

                        utils.template = {};
                        utils.template.getContent = function getContentFromComponentTemplate(jq) {
                            return utils.contentDefault.find(jq)
                        }
                        var fromContent = utils.template.getContent('list_'+cfgCrud.useTemplate)

                        if ( fromContent.length == 0 ) {
                            console.error('could not find it....', 'useTemplate',  fromContent )
                            return;
                        }

                        console.error('fxRender', 'useTemplate',  fromContent )

                        var fxName = 'fxRender'

                        utils.showElements()


                        var to = '#listContent'
                        tH2.templateContent.find(to).html('');
                        tH2.templateContent.find(to).append(fromContent.clone());
                        //tH.templateContent.find(to).show();


                        // utils.showElem(utils.contentDev,fxName)
                        // var listContent = utils.copyContentGroup2("list", '#listContent');
                        return;
                        var listContent = utils.copyContentGroup2("list", '#listContent');


                        //debugger
                    }
                }



                //cfg.dataObject = cfgCrud;


                quickFormHelper.addLabel('yeah')
                quickFormHelper.addCheckbox('showList', 'Show List')
                quickFormHelper.defaultValue(true)
                quickFormHelper.addCheckbox('showFilter', 'Show Filter')
                quickFormHelper.addRadioGroup('useTemplate', ['Use Template', 'dark'], 'What this?')
                quickFormHelper.defaultValue('dark')
                quickFormHelper.addTextInput('title', 'List Title')
                quickFormHelper.addLabel('Test Label')

                quickFormHelper.addCheckbox('showTitle', 'Show Title')
                quickFormHelper.defaultValue(true)

                /*
                 quickFormHelper.addButton('Change', function onClickChangeButton() {
                 console.info('hit')
                 cfgCrud.fxReRender()
                 })
                 */

                quickFormHelper.fxAnyChange(function thingCjhangd() {
                    console.info('hit')
                    if ( cfgCrud.fxReRender )
                        cfgCrud.fxReRender()
                })




                cfgCrudEditorForm.fxFilterRefresh = function fxFilterRefresh(n, o ) {
                    console.error('cfgCrudEditorForm','boo', n,o)
                    var diff = null;
                    sh.each(n, function compare(k,val) {
                        if ( $.isFunction(val)) {
                            return;
                        }
                        if ( $.isObject(val)) {
                            return;
                        }

                        var otherVal = o[k]

                        if ( otherVal !== val ) {
                            console.error('diff val', k, val, otherVal)
                            diff = otherVal;
                            return false;
                        }

                    })

                    if ( diff != null ) {
                        return false;
                    }
                   // debugger
                    return true;
                }

            }
            scope.generateCrudEditorFormConfig();

            scope.generateCrudConfig = function generateCrudConfig() {
                var y = appService.gen()
                console.error('generateCrudConfig', y);

                var x = new appService.gen();
                var template = {name: '', date: null, age: 0}
                x.createObjects(template, 10)
                x.randomizeStr('name')
                x.randomizeNumber('age', 0, 120, 2)
                x.randomizeDate('date', 365 * 2)
                // x.show()
                //    scope.vm.listData = x.items;

                if (scope.configCrud) {
                    cfg = scope.configCrud;
                } else {
                    //debugger
                    console.warn('these should be combined')
                    var cfg = {}
                    cfg.asdf = 'sdfs';
                }

                quickCrudHelper = quickCrudHelper.create();
                quickCrudHelper.loadConfig(cfg)
                var h = quickCrudHelper;
                h.showTitle('List Boost-->');

                //asdf.g

                x.items = x.items.slice(0, 10)
                //x.items = [];

                //h.connectToInMemory(x.items)
                h.connectToQuickRest('http://127.0.0.1:6016/api/tags')

                h.quickFormHelper.addTextInput('name', 'Name')
                h.quickFormHelper.addTextInput('desc', 'Desc')
                //configList
                h.config.quickFormConfig.fxFilterRefresh = function fxFilterRefresh(n, o ) {
                    console.error('quickFormConfig', 'boo2')

                    console.error('ooo', o, n)

                    return true;
                    //debugger
                    return false;
                }
                h.config.quickListConfig.fxFilterRefresh = function fxFilterRefresh(n, o ) {
                    console.error('quickListConfig', 'boo')
                    debugger
                    return false;
                }

                h.config.quickListConfig.fxFilterRefresh = function fxFilterRefresh(n, o ) {
                    console.error('quickListConfig', 'boo')
                    debugger
                    return false;
                }


                h.showFilter(true)
                /*
                 h.listItems =
                 h.listitemsBindable(asdf)
                 showInstantfilter
                 domFOrRow is here
                 maxRows
                 fxFilter?
                 */

                scope.configCrud.fxFilterRefresh = function fxFilterRefresh(n, o ) {
                    console.error('configCrud', 'boo')
                    debugger
                    return false;
                }

                scope.configCrud = cfg;


            }
            scope.generateCrudConfig();

            scope.createPromptsScreen = function createPromptsScreen() {


                quickCrudHelper = quickCrudHelper.new();
                quickCrudHelper.quickCHS()

                debugger
                return;


                var y = appService.gen()
                console.error('generateCrudConfig', y);

                var x = new appService.gen();
                var template = {name: '', date: null, age: 0}
                x.createObjects(template, 10)
                x.randomizeStr('name')
                x.randomizeNumber('age', 0, 120, 2)
                x.randomizeDate('date', 365 * 2)
                // x.show()
                //    scope.vm.listData = x.items;

                if (scope.configCrud) {
                    cfg = scope.configCrud;
                } else {
                    //debugger
                    console.warn('these should be combined')
                    var cfg = {}
                    cfg.asdf = 'sdfs';
                }

                quickCrudHelper = quickCrudHelper.create();
                quickCrudHelper.loadConfig(cfg)
                var h = quickCrudHelper;
                h.showTitle('List Boost-->');

                //asdf.g

                x.items = x.items.slice(0, 10)
                //x.items = [];

                //h.connectToInMemory(x.items)
                h.connectToQuickRest('http://127.0.0.1:6016/api/tags')

                h.quickFormHelper.addTextInput('name', 'Name')
                h.quickFormHelper.addTextInput('desc', 'Desc')
                //configList
                h.config.quickFormConfig.fxFilterRefresh = function fxFilterRefresh(n, o ) {
                    console.error('quickFormConfig', 'boo2')

                    console.error('ooo', o, n)

                    return true;
                    //debugger
                    return false;
                }
                h.config.quickListConfig.fxFilterRefresh = function fxFilterRefresh(n, o ) {
                    console.error('quickListConfig', 'boo')
                    debugger
                    return false;
                }

                h.config.quickListConfig.fxFilterRefresh = function fxFilterRefresh(n, o ) {
                    console.error('quickListConfig', 'boo')
                    debugger
                    return false;
                }


                h.showFilter(true)
                /*
                 h.listItems =
                 h.listitemsBindable(asdf)
                 showInstantfilter
                 domFOrRow is here
                 maxRows
                 fxFilter?
                 */

                scope.configCrud.fxFilterRefresh = function fxFilterRefresh(n, o ) {
                    console.error('configCrud', 'boo')
                    debugger
                    return false;
                }

                scope.configCrud = cfg;


            }
            scope.createPromptsScreen();

            scope.addUIEm = function addUIEm() {
                quickUI = quickUI.create();
                var q = quickUI;
                q.processDefaults(utils.contentOutput);
                // utils.contentOutput.css('background', '#f2f2f2')
                //debugger
            }
            scope.addUIEm();

            html = utils.getFinalOutput();

            //throw(u)
            //console.log('html', html);
            // debugger;
            element.html($compile(html)(scope));

        }
    }


    var Dir = quickReloadableDir2;
    var Ctrl = QuickReloadablelistController2;
    if (window.reloadableHelper) {


        function defineQuickReloadingDir() {
            var app = angular.module('com.sync.quick');
            window.reloadableHelper.upgradeApp(app)
            return app;
        }

        var app = defineQuickReloadingDir();


        // debugger;
        function defineQuickReloadingDir() {
            var app = angular.module('com.sync.quick');
            window.reloadableHelper.upgradeApp(app);
            return app;
        }

        var _app = defineQuickReloadingDir();
        _app.reloadableController(reload_name + 'Ctrl', Ctrl);
        _app.reloadableDirective(reload_name, Dir);
    } else {
        //debugger;
        app.reloadableController(reload_name + 'Ctrl', Ctrl);
        app.reloadableDirective(reload_name, Dir);
    }

}());
