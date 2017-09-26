/**
 * Created by user1 on 10/24/2014.
 */


var globalSettings = {}
globalSettings.annotations = {}
var markerAnnotations  ={}
globalSettings.annotations = markerAnnotations;

/**
 * Object that stores annotation types
 * @type {{}}
 */
var types = {}
types.HANDLEBARS = 'HANDLEBARS'
types.IMAGES = 'IMAGES'
/**
 * Add a text element ....
 * @type {string}
 */
types.TEXT = 'TEXT'

types.ANY = 'anyMarker'

mA = markerAnnotations;
mA[808]={
    type:'image',
    data:'image.png'
}

mA[605]={
    type:'image',
    data:'image.png',
    rotateX:90
}


function Calibrator() {
    var p = Calibrator.protype;
    var p = this;
    var self = this;

    self.markers = []

    p.addCalibration = function addCalibration(input, markerId) {
        if ( markerId != input.id ) {
            return;
        }

        self.markers.push(input.marker)

    }

    p.toArray = function toArray(){
        return JSON.stringify(self.markers)
    }


}

