/**
 * Created by user1 on 10/2/2017.
 */
function AreaHelper(quickNaveConfigHelper) {
    var self = this;
    var p = this;
    self.data = {};
    self.quickNaveConfigHelper = quickNaveConfigHelper
    //debugger
    p.init = function init() {

    }

    p.hideAllAreas = function hideAllAreas(except) {
        var areas = self.quickNaveConfigHelper.config.areas;
        $.each(areas, function checkIfArea(k,area){
            console.log('hiding', k, area, except)
            if ( k == except ) return
            area.ui.hide()
        });
    };

    p.showAllAreas = function showAllAreas(removeAbs) {
        var areas =  self.quickNaveConfigHelper.config.areas;
        $.each(areas, function checkIfArea(k,area){
            console.log('showing', k, area)
            // if ( k == except ) return
            area.ui.show()
            if ( removeAbs) {
                area.ui.css('position', 'relative')
            }
        });


    };


    p.showArea = function showArea(areaName) {
        var area =self.quickNaveConfigHelper.getArea(areaName)
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

        var areas =  self.quickNaveConfigHelper.config.areas;
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

    p.goToArea = function goToNavArea(name) {
        //console.error('what is config', scope.vm.config)
        var area = self.quickNaveConfigHelper.config.areas[name]
        console.info('where are you going to?', name, area)
        self.goToArea2(area);
    }


    p.reset = function reset() {
        self.hideAllAreas()
        if ( self.quickNaveConfigHelper.config.defaultAreaName ){
            firstArea = cfg.defaultAreaName
        }
        else {
            var areas =  self.quickNaveConfigHelper.config.areas;
            var firstArea = areas[0]
        }
        self.showArea(firstArea)
    }

}


function QuickNav() {
    var self = this;
    var p = this;
    self.data = {};

    self.settings = {};
    self.settings.pageSize = 5;

    p.init = function init(cfg) {
        var cfgOrig = cfg;
        cfg = sh.dv(cfg);
        if ( cfg.config ) {
            cfg = cfg.config;
        }
        self.settings = cfg;

       // return;
        self.data.ui = new UIComp();
        var cfg2 = u.clone(cfg);
        cfg2.fileName = 'quickNav.html';
        //cfg2.fxPostRender = self.render;
        cfg2.fxPostRender = self.postRender;
        self.data.ui.init(cfg2);
        self.render();

        var areaHelper = new AreaHelper(cfgOrig);
        self.areaHelper = areaHelper;

    }

    p.render = function render(query) {
        sh.cid(self.settings.fxRender)
        self.data.ui.loadTemplateContent();
    };


    p.postRender = function postRender(data, body, cfg) {


        var ui = cfg.ui;

        $.each(self.settings.areas, function onAddElements(k, area) {
            var btn = $('<button />');
            //btn.html('lkj');
           // console.log(k, area);
            btn.html(k);
            ui.find('#btnBar').append(btn)
            btn.attr('ng-click', 'areaHelper.goToArea("'+k+'")');
        })

        self.areaHelper.hideAllAreas()

        if ( cfg.defaultAreaName ){
            self.areaHelper.showArea(cfg.defaultAreaName)
        }


        var click = cfg.ui.find('[ng-click]')
        $.each(click, function on(k, v) {
            var ui = $(v)
            var ng = ui.attr('ng-click')
            var fx = self[ng]
            //debugger
            v.onclick = function onClick() {
                eval('self.'+ng)
            } //fx;
            console.log('....', ng)
        })

        //debugger;
        self.data.ui.pushVal({type:'rake', key:'txtVal', id:'#txtTxtVals'})
    };

    p.onExplode = function onExplode() {
        //console.log('ddd'  )
        self.areaHelper.showAllAreas(true)
    }


    p.onExplodeReverse = function onExplodeReverse() {
        self.areaHelper.reset()
    }

    p.utils = {};

}

function BaseUIConfig (config) {
    //common config elements
    var self = this;
    var p = self;
    self.config = config;

    p.init = function init() {

    }

    p.targetDiv = function targetDiv(fx) {
        self.config.div = fx;
    }

    p.fxInit = function fxInit(fx) {
        self.config.fxInit = fx;
    }


}
function QuickNavConfigHelper(){
    var self = this;
    var p = self;
    self.data = {};
    self.data.config = {}
    self.config = self.data.config;
    self.config.areas = {};

    p.init = function init() {
        var base = new BaseUIConfig(self.config);
        self.uiConfig = base;

    }
    self.init();

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


QuickNav.config = function createQuickNavConfig() {

}

