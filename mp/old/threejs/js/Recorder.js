/**
** Take recorded items, and play them back at proper time
 */ ;

var settings = {}
//var sh = exports.shelpers
//var TableHelpers = exports.TableHelpers;

function PlaybackEvents() {
    var self = this;
    var p = self;

    self.values = []
    self.currentIndex = 0;
    self.play = function play(callback) {
        self.callback = callback;
        //start at current index.
        self.mode = types.play;
    }

    /**
     * Go through items, if item for time is found,
     * invoke callback with that item
     * @param time
     */
    self.playhead = function playhead(time) {
        for ( var i =  0 ; i < 10; i++) {
            if ( obj.time > time ) {
                self.callback(obj)
                return;
            }
        }
        self.callback(null)
    }

    self.rec = function recrod(time, va) {

        self.mode = types.record
        var obj = {}
        obj.time = time
        obj.val = val
        self.vals.push(obj)
    }

    self.save = function save() {
        self.proc('saving', self.values.length)
    }

    self.load = function load(url) {
        self.values = []
    }

    self.proc  = function proc(){
        console.log.apply(arguments)
    }
}


function RecordEventsTester() {
    var self = this;
    var p = self;

    self.values = []
    self.currentIndex = 0;
    self.play = function play(callback) {
        self.callback = callback;
        //start at current index.
        self.mode = types.play;
    }

    /**
     * Go through items, if item for time is found,
     * invoke callback with that item
     * @param time
     */
    self.playhead = function playhead(time) {
        for ( var i =  0 ; i < 10; i++) {
            if ( obj.time > time ) {
                self.callback(obj)
                return;
            }
        }
        self.callback(null)
    }

    self.rec = function recrod(time, va) {

        self.mode = types.record
        var obj = {}
        obj.time = time
        obj.val = val
        self.vals.push(obj)
    }

    self.save = function save() {
        self.proc('saving', self.values.length)
    }

    self.load = function load(url) {
        self.values = []
    }
    /**
     * Emit values
     * @returns {*}
     */
    self.emit = function createRandomValue() {
        var obj ={}
        var obj.stuff = [1,2,34]
        return obj
    }

    self.createRandomValue = function createRandomValue() {
        var obj ={}
        var obj.stuff = [1,2,34]
        return obj
    }


    self.proc  = function proc(){
        console.log.apply(arguments)
    }
}




function test() {
    var x = new PlaybackEvents()
    var y = new RecordEventsTester()
    x.record()
    //when done show values
    y.fxCallback = function odne() {
        console.log(x.values)
        return;
    }
    y.emit(1/2, x.addVal)
}

test()
