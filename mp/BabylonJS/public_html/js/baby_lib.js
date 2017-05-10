

function defaultValue(input, ifNullUse) {
    if (input == null) {
        return ifNullUse
    }
    return input;
}
var dv = defaultValue;


//console.log('boo..x.')
function BabyLib() {
    var self = this;
    var p = self;

    self.data = {};
    self.data.x = {}; //copied
    p.init  = function init() {
        window.b = self;
    }
 
}

BabyLib.items = [];

if ( window.BL && window.BL.items ) {
    BabyLib.items = window.b.items;
    //debugger
}

window.b = BabyLib;
window.bl = BabyLib
window.BL = BabyLib




BabyLib.create = function defineCreation() {
    b.create.square = function square(size) {
        size = dv(size, 20)
        var blueBox = BABYLON.Mesh.CreateBox("blue", size, b.scene);
        b.last = blueBox;
        BabyLib.items.push(b.last)
    }
}
BabyLib.create()


BabyLib.mat = function defineMAterials() {
    b.mat.createMaterial = function square(a,b2,c) {
        a = dv(a, 0.4)
        b2 = dv(b2, 0.4)
        c = dv(c, 0.4)
        var blueMat = new BABYLON.StandardMaterial("ground", b.scene);
        blueMat.diffuseColor = new BABYLON.Color3(a,b2,c);
        blueMat.specularColor = new BABYLON.Color3(a,b2,c);
        blueMat.emissiveColor = BABYLON.Color3.Blue();
        b.lastMat = blueMat;
        b.last.material = blueMat;
        return blueMat;
    }
} 
BabyLib.mat()

BabyLib.definePosition = function definePosition() {
    b.pos = function setXYZ( x,y,z) {
        x = dv(x, 0)
        y = dv(y, 0)
        z = dv(z, 0)
        var bl = b.last
        bl.position.x = x;
        bl.position.y = y
        bl.position.z = z

    }
}
BabyLib.definePosition()




BabyLib.defineCameraMethods = function defineCameraMethods() {
    b.zoomToFit = function zoomToFit( camera, _cameraY) {
        if ( camera ) {
            BabyLib.camera = camera; 
        }
        camera = BabyLib.camera;


        /*    var bounds = box.getBoundingInfo();
         var min = bounds.minimum;
         var max = bounds.maximum;*/

        var min = null
        var max = null
        $.each(BabyLib.items, function onX(k,v) {

            var bounds = v.getBoundingInfo();

            var minimum = bounds.minimum.add(v.position)
            var maximum = bounds.maximum.add(v.position)

            /* if ( min == null || minimum < min) { min = minimum; }
             if ( max == null || max > maximum) { max = maximum; }

             */
            //  minimum = minimum.length();
            //  maximum = maximum.length();

            //  if ( min == null || minimum < min) { min = minimum; }
            //  if ( max == null || max > maximum) { max = maximum; }


            if ( min == null ) {
                min = minimum ;
            }

            if ( max == null ) {
                max = maximum
            }

            if ( minimum.x < min.x ) {
                min.x = minimum.x
            }
            if ( minimum.y < min.y ) {
                min.y = minimum.y
            }
            if ( minimum.z < min.z ) {
                min.z = minimum.z
            }

            if ( maximum.x > max.x ) {
                max.x = maximum.x
            }
            if ( maximum.y > max.y ) {
                max.y = maximum.y
            }
            if ( maximum.z > max.z ) {
                max.z = maximum.z
            }

            console.log('\t', '---', min, max)
            console.log('\t', '---', k,minimum,maximum)
        })


        console.log('what is min', min, max)

        var sz = new BABYLON.Vector3(Math.abs(max.x - min.x), Math.abs(max.y - min.y), Math.abs(max.z - min.z));
        var position = new BABYLON.Vector3(min.x + sz.x / 2, min.y + sz.y / 2, min.z + sz.z / 2);
        camera.setTarget(position);

        var xDist = max.x - min.x

        var cameraY = 10;
        if ( _cameraY ) { cameraY = _cameraY}
        
        camera.position = new BABYLON.Vector3(0, cameraY,-xDist*1.5);
   

    }
}
BabyLib.defineCameraMethods()


