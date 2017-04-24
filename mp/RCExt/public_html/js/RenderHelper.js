
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


    p.render = function render() {
        $.each(self.data.insts, function onActInst(k, v) {
            var inst = v;
            var ui = null;
            if (inst.id) {
                if ( inst.id.startsWith('#') == false ) {
                     inst.id = '#' + inst.id
                }
                var ui = $( inst.id)
            }

            var __self = self.data.self;
           var evalFx = inst.evalFx.replace('self', '__self')
            console.debug('eval', __self,  inst.evalFx, inst.type , p.idRequires.name)
            if (inst.type == p.idRequires.name) {
                var y = eval(evalFx)
                if (y == null || y == '') {
                    ui.css('opacity', '0.3')
                    
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
            console.debug('y', y)
            console.debug('ui', ui, ui.css('opacity'))

        })
    }
}

var rH = new RenderHelper()
rH.init({})
rH.render();

