
function RenderHelper() {
    var self = this;
    self.data = {}
    self.settings = {};
    self.data.insts = [];

    var p = this;

    p.init = function init(__self) {
        if (__self == null) {
            throw 'need self'
        }
        self.data.self = __self;
    }


    p.pushData = function pushDataToUIElement(dataStr, idOrUI) {
        var inst = {};

        if ( idOrUI == null ) {
            idOrUI = uiUtils.lastUI;
        }
        inst.id = idOrUI;
        //debugger
        if ( $.isArray(dataStr) ) {
            dataStr = dataStr.join('_');
        }
        inst.evalFx = dataStr;
        inst.type = pushDataToUIElement.name;
        self.data.insts.push(inst)
    }

    p.pushData2 = function pushDataToUIElement(dataStr, idOrUI) {
        var inst = {};
        if ( idOrUI == null ) {
            idOrUI = uiUtils.lastUI;
        }
        inst.id = idOrUI;
        inst.evalFx = dataStr;
        inst.type = pushDataToUIElement.name;
        self.data.insts.push(inst)
    }

    p.blockIfNull = function blockIfNull(id, evalFx) {
        var inst = {};
        inst.id = id;
        inst.evalFx = evalFx;
        inst.type = blockIfNull.name;
        self.data.insts.push(inst)
    }

    p.idRequires = function idRequires(id, evalFx) {
        var inst = {};
        inst.id = id;
        inst.evalFx = evalFx;
        inst.type = idRequires.name;
        self.data.insts.push(inst)
    }



    p.idRequiresVal = function idRequiresVal(id, idValMustBeDefined) {
        var inst = {};
        inst.id = id;
        inst.idValMustBeDefined = idValMustBeDefined;
        inst.type = idRequiresVal.name;
        self.data.insts.push(inst)
        uiUtils.addChange(idValMustBeDefined, function onChangeIt(a,b,c) {
            console.log('change', a,b,c)
            self.testVal( a, id)
        })
    }


    p.testVal = function testVal(val, setUI) {
        var disabled = false;
        if ( val == null || val == ''){
            disabled = true
        }

        var uiSet = u.getUI(setUI)

        console.log(uiSet, val, disabled)

        if (disabled) {
            uiSet.css('opacity', '0.3')
        } else {
            uiSet.css('opacity', '1')
        }
    }

    p.render2 = function render2() {

    };

    p.render = function render() {
        $.each(self.data.insts, function onActInst(k, v) {
            var inst = v;
            var ui = null;
            if (inst.id) {
                if ( $.isArray(inst.id )) {
                    ui = $(inst.id)
                    //$(ui).map (function () {return this.toArray(); } );
                    var x = $();  // empty jQuery object
                    $.each(ui, function(i, o) {x = x.add(o)});
                    ui = x;
                    //    debugger
                } else {
                    if ( $.isString(inst.id) &&
                        inst.id.startsWith('#') == false) {
                        inst.id = '#' + inst.id
                    }
                    var ui = $(inst.id)

                }
            }

            var __self = self.data.self;
            if ( inst.evalFx )
                var evalFx = inst.evalFx.replace('self', '__self')
            //console.debug('eval', __self,  inst.evalFx, inst.type , p.idRequires.name)
            if (inst.type == p.idRequires.name) {
                var y = eval(evalFx)
                if (y == null || y == '') {
                    ui.css('opacity', '0.3')
                    /*    $.each(ui, function onApplyAll(k, ui) {
                     if ( ui.jquery ) {
                     ui.css('opacity', '0.3')
                     }
                     })*/
                } else {

                    ui.css('opacity', '1')
                }
            }

            if (inst.type == p.blockIfNull.name) {
                var y = eval(evalFx)
                if (y == null || y == '') {
                    ui.css('opacity', '0.3')

                } else {
                    ui.css('opacity', '1')

                }
            }

            if (inst.type == p.idRequiresVal.name) {
                var ui = uiUtils.getUI(inst.idValMustBeDefined)
                var y = u.getVal2(ui)
                if (y == null || y == '') {
                    ui.css('opacity', '0.3')
                } else {
                    ui.css('opacity', '1')
                }
            }

            if (inst.type == p.pushData.name) {
                console.info('p.pushData', evalFx)
                var valOfX = eval(evalFx)
                //ui.val(valOfX)
                uiUtils.setText(ui, valOfX)
                //ui.text('sdfsdf..sd.fs.df.sd.fs.df.sd..fs.df.s.df.sd.fs.dfsdsdfsdf')
                //debugger
                //asdf.g
            }


            //console.debug('y', y)
            //console.debug('ui', ui, ui.css('opacity'))

        })
    }
}

var rH = new RenderHelper()
rH.init({})
rH.render();

