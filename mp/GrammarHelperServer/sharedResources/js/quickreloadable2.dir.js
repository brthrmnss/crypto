//'use strict';
/*
 /Users/user2/Dropbox/projects/crypto/mp/GrammarHelperServer/red/js/quickreloadable2.dir.js
 /Users/user2/Dropbox/projects/crypto/mp/GrammarHelperServer/red/js/quickreloadable2.dir.js
 */
(function(){

  var reload_name = 'quickReloadable3'
  //do redirections
  function defineQuickReloadingDir() {
    var app = angular.module('com.sync.quick'); //should not be hardcoded
    window.reloadableHelper.upgradeApp(app)
    return app;

  }
  var app = defineQuickReloadingDir();

//debugger
  console.log('reload', app.reloadableDirective)
  //debugger;

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

                                                          /*angFunc,*/
                                                          xUI
  ) {

    reloadableHelper.saveDirectiveCtx(reload_name, arguments)
    //window.ddoFxArgs = Array.prototype.slice.call(arguments);
    // debugger; //only invoked 1x
    var utilsParent = transcludeHelper.new(this);
    function link(scope, element, attrs, ctrl, transclude){
      console.warn('lc', 'l.in.k.1');
      //debugger;
      var url = '';
      url = 'g/red/js/quickreloadable2.dir.js'
      //http://localhost:10110/g/red/js/quickreloadable2.dir.js
      url = 'scripts/quick_module/quick/quickreloadable.dir.html';
      url = 'g/red/js/quickreloadable2.dir.html'
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


            var x = xUIHelper;
            x.startOn('#divOutput2',utils.templateContent)
            x.size('100%')//, '200px')
            x.background('gray');
            x.padding('10px')
            x.makeInnerDiv('#innerDiv', 'hello world');
            //x.margin('10px')
            x.size('100%', '100%');
            x.background('red');

            x.makeInnerDiv('#output1Val', 'output here')
            x.setElement();
            x.makeInnerDiv('#chainOutput', 'chain here')
            x.a('layout', 'row');
            x.setElement();
            x.makeAbsContainer();

            x.makeInnerDiv('#paper', 'chain here')

            function lb() {
              var self = this;
              var p = this;

              p.init = function () {
                var x = xUI.create();
                x.startOn('#divOutput2',utils.templateContent);
                x.makeAbsContainer();
                x.addImage('scripts/quick_module/bulb_PNG1251.png');
                x.makeAbs();
                x.size(null,'40px');
                x.positionAbs(null, 0, 0,null);
                self.x = x;
                self.element = x.element;
                self.lightOn= true;
              }
              p.off = function off() {
                if ( self.lightOn == false ) {
                  return
                }
                self.lightOn = false;
                self.x.css('opacity', '0.2')
              }
              p.on = function on() {
                if ( self.lightOn == true ) {
                  return
                }
                self.lightOn = true;

                self.x.css('opacity', '1')
              }
              p.toggle = function toggle() {
                // self.lightOn = ! self.lightOn
                if ( self.lightOn == false ) {
                  self.on();
                } else {
                  self.off();
                }
              }
            }

            var lb1 = new lb();
            lb1.init();
            scope.lb1 = lb1;

            function testBaconJS() {

              var up   = $('#up').asEventStream('click');
              var down = $('#down').asEventStream('click');

              var counter =
                // map up to 1, down to -1
                  up.map(1).merge(down.map(-1))
                    // accumulate sum
                      .scan(0, function(x,y) { return x + y });

// assign observable value to jQuery pr
              var up   = $('#up').asEventStream('click');
              var down = $('#down').asEventStream('click');

              var counter =
                // map up to 1, down to -1
                  up.map(1).merge(down.map(-1))
                    // accumulate sum
                      .scan(0, function(x,y) { return x + y });

// assign observable value to jQuery property text
              counter.assign($('#counter'), 'text');

            }
            testBaconJS();

            var x = xUI.create();
            x.startOn('#divOutput2',utils.templateContent)
            x.size('100%', '150px')//,'40px');

            x.makeInnerDiv('#containerPanel' );
            x.css({'border-radius': '4px',
              'margin-bottom': '16px',
              'position': 'relative' })
            x.class('md-whiteframe-z1')
            x.storeTop();
            //x.setElement();

            x.add('md-toolbar')
                .div()
                .class('md-toolbar-tools')
                .content('Title');

            x.goToTop();
            x.add('md-content')
                .attr('flex', null)
              // .class('md-toolbar-tools')
                .content('Title');

            function Panel() {
              var self = this;
            }
            Panel.p = Panel.prototype;
            Panel.p.init = function initPanel(name, content, divId) {
              var x = xUI.create();
              x.startOn('#divOutput2',utils.templateContent)
              x.size('100%')//, '150px')//,'40px');
              x.makeInnerDiv('#containerPanel' );
              x.css({'border-radius': '4px',
                'margin-bottom': '16px',
                'position': 'relative' })
              x.class('md-whiteframe-z1')
              x.storeTop();
              //x.setElement();

              x.add('md-toolbar')
                  .div()
                  .class('md-toolbar-tools')
                  .content(name);

              x.goToTop();
              x.add('md-content')
                  .attr('flex', null)
                  .attr('id', divId)
                // .class('md-toolbar-tools')
                  .content(content);
            }


            var slide = [];
            slide = [
              {t:"img", src:"asdf.jpg"},
              {t:"char", name:"andre", pos:"left"}
            ]
            function renderSlide() {

              var p = new Panel();
              p.init('Slide 1', null, "divSlideContent")


              var x = xUI.create();
              x.startOn('#divSlideContent',utils.templateContent)
              //x.size('100%', '150px')//,'40px');
              x.makeInnerDiv('#containerPanel3')

              //.append("YO YO YO");
              x.addImage( "images/anime/f_tool.jpg" )
              x.css('max-width', '100%')

              var x = xUI.create();
              x.startOn('#divSlideContent',utils.templateContent)
              x.makeInnerDiv('#characterHolder')
              x.addImage( "images/anime/peter_glad.png" );
              x.attr("id", 'characterAndre')
              x.css({'max-height': '60%',
                'top': '0px',
                'position': 'absolute' })
              x.margin(60,0)
              x.shadow();

              var pics= ["images/anime/peter_angry.png",
                "images/anime/peter_smile.png",
                "images/anime/peter_neutral.png",
                "images/anime/peter_glad.png"]
              rotatePics({pics:pics,
                interval:500,
                id:'#characterAndre'})
              function rotatePics(config)
              {
                function flipPic() {
                  var picSrc = config.pics[Math.floor(Math.random()*config.pics.length)];
                  $(config.id ).attr('src',picSrc);
                }

                function run() {
                  flipPic();
                  if( scope.destroyed ) {
                    return;
                  }
                  setTimeout(run, 1500+Math.random()*1000)
                }
                run();
              }


              function TextArea() {
                var self = this;
              }
              TextArea.p = TextArea.prototype;
              TextArea.p.init = function initPanel(name, content, divId) {
                var x = xUI.create();
                //x.startOn('#divOutput2',utils.templateContent)
                // x.size('100%')//, '150px')//,'40px');
                x.startOn('#divSlideContent',utils.templateContent)
                x.makeInnerDiv('#'+divId );
                //
                self.divId = divId;
                x.attr("id", divId)
                x.css({'height': '60%',
                  //'top': '0px',
                  fontSize:'24px',
                  fontWeight:'bold',
                  'position': 'absolute' })
                //x.margin(60,0)
                x.shadow();
                x.content(content);
                x.background('white')
                x.size('60%','70%')
                x.positionAbs('null',20,20,20)
                x.padding('20px')

              }

              TextArea.p.text = function text(txt) {
                function rerunText(txt_) {

                  var lastTxt = '';
                  var txtSize = 0
                  function runTxtAni(){
                    txtSize++
                    var length = lastTxt.length;
                    if ( txtSize >= txt_.length) {
                      lastTxt = '';
                      txtSize = 0
                    }
                    var newTxt = txt_.slice(0,txtSize+1)
                    lastTxt = newTxt
                    if( scope.destroyed ) {
                      return;
                    }
                    //console.log('newTxt', newTxt, self.divId)
                    $('#'+self.divId).text(newTxt)
                    var extra = 0
                    if ( newTxt.length >= txt_.length ) { extra = 2400 }
                    //console.log('newTxt', newTxt, self.divId)
                    setTimeout(runTxtAni, 150+extra)
                  }

                  runTxtAni() ;
                }
                rerunText(txt)
                $().text()
              }

              var p = new TextArea();
              p.init('Slide 1', null, "textArea")
              p.text('Hello Ranger .... what you up to? ')

              /*  //http://codepen.io/turbohz/pen/jFxqw
               setTimeout(function () {
               console.log('gooo.....')
               $('#characterAndre').attr('src',"images/anime/peter_angry.png");
               }, 500 )

               setTimeout(function () {
               $('#characterAndre').attr('src',"images/anime/peter_smile.png");
               }, 5000 )


               setTimeout(function () {
               $('#characterAndre').attr('src',"images/anime/peter_glad.png");
               }, 1000 )*/

            }
            renderSlide();


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
        _addHTML:'<span>red btn</span>', alert:true};
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
      dictAttrs['aboslute-container']={
        addCSS:{'position':'relative'}
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
