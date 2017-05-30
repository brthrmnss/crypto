if ( window.sh == null || window.shIsNew  ) {
    var sh = {}
    window.sh = sh;
}

if ( window.sh.each == null ) {

    sh.each = $.each;
    sh.each.times = function times(number, fx, startAt0) {
        var numbers = [];
        var number = parseInt(number);
        var numStart = 1;
        if (startAt0 == true) { //by default 10 times give syou 0-1, here we use 1- 10
            numStart = 0;
        }
        if ( sh.isNumber(startAt0) ) {
            numStart = startAt0
        }
        for (var i = 0; i < number; i++) {
            var num = i;
            num += numStart
            numbers.push(num);
        }

        if (fx != null) {
            sh.each(numbers, fx)
        }
        else {
            return numbers;
        }
    }

    sh.isNumber = $.isNumeric
    window.shIsNew = true;

}


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


b.setPos = function setPos(x,y,z) {
    var obj = {x:x, y:y, z:z}
    b.cursorModePosition = obj;
}

BabyLib.create = function defineCreation() {
    b.create.cube = b.create.square = function square(size) {
        size = dv(size, 20)
        var blueBox = BABYLON.Mesh.CreateBox("blue", size, b.scene);


        if ( b.cursorMode ) {
            b.pos(b.last, blueBox)
            //blueBox.position.x += b.last.getBoundingInfo().boundingBox.extendSize.x;

            var vectorsWorld = blueBox.getBoundingInfo().boundingBox.vectorsWorld;
            width = Number(vectorsWorld[1].x-(vectorsWorld[0].x))
            blueBox.position.x += width

            blueBox.position.y += b.last.getBoundingInfo().boundingBox.extendSize.y;
            //debugger
            blueBox.position.z += b.last.getBoundingInfo().boundingBox.extendSize.z;
            if ( b.cursorModePosition ) {
                b.pos(b.cursorModePosition)
                b.cursorModePosition = null;
            }
        }

        b.last = blueBox;

        BabyLib.items.push(b.last)
    }

}
BabyLib.create()


BabyLib.mat = function defineMAterials() {
    b.mat.createMaterial = function createMaterial(a,b2,c) {

        a = dv(a, 0.4)
        b2 = dv(b2, 0.4)
        c = dv(c, 0.4)

        var blueMat = new BABYLON.StandardMaterial("ground", b.scene);
        blueMat.diffuseColor = new BABYLON.Color3(a,b2,c);
        blueMat.specularColor = new BABYLON.Color3(a,b2,c);
        blueMat.emissiveColor = BABYLON.Color3.Blue();
        if ( a == 'red' ) {
            blueMat.emissiveColor = BABYLON.Color3.Red();
            a =b2 =c = 0.7
        }
        b.lastMat = blueMat;
        b.last.material = blueMat;
        return blueMat;
    }
}
BabyLib.mat()

BabyLib.definePosition = function definePosition() {
    b.pos = function setXYZ( x,y,z, targetOveride) {
        x = dv(x, 0)
        y = dv(y, 0)
        z = dv(z, 0)
        if ( x.x != null ) {
            var xAsPoint = x;
        }
        if ( y.position  ) {
            targetOveride = y
           // debugger
        }
        if ( x.position && x.position.x != null ) {
            var xAsPoint = x.position;
        }
        if ( xAsPoint ) {
            x = xAsPoint.x
            y = xAsPoint.y
            z = xAsPoint.z
        }

        var bl = b.last

        if ( targetOveride ) {
            bl = targetOveride
        }

        bl.position.x = x;
        bl.position.y = y
        bl.position.z = z
        console.log('bl', bl.position)

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

    b.getMaxXYZ = function getMaxXYZ(asdf) {
        var min = null
        var max = null
        var fxName = 'what?'
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

            return;
            console.log(fxName, '\t', '---', min, max)
            console.log(fxName, '\t', '---', k,minimum,maximum)
        })


        console.log('what is min', min, max)
        var obj = {}
        obj.min = min
        obj.max = max;



        var xDist = max.x - min.x
        var yDist = max.y - min.y
        var zDist = max.z - min.z
        obj.xDist = xDist;
        obj.yDist = yDist;
        obj.zDist = zDist;
        //var viewDist = Math.max(xDist, yDist);
        obj.xMid = min.x + ( obj.xDist/2)
        obj.yMid = min.y + ( obj.yDist/2)
        obj.zMid = min.z + ( obj.zDist/2)
        // var cameraY = obj.yMid;
        obj.center = new BABYLON.Vector3(obj.xMid,obj.yMid,obj.zMid);


        return obj
    }

    b.zoomFront = function zoomFront( camera, _cameraY) {
        if ( camera ) {
            BabyLib.camera = camera;
        }
        camera = BabyLib.camera;


        /*    var bounds = box.getBoundingInfo();
         var min = bounds.minimum;
         var max = bounds.maximum;*/

        var obj = b.getMaxXYZ()
        var min = obj.min;
        var max = obj.max;

        var sz = new BABYLON.Vector3(Math.abs(max.x - min.x), Math.abs(max.y - min.y), Math.abs(max.z - min.z));
        var position = new BABYLON.Vector3(min.x + sz.x / 2, min.y + sz.y / 2, min.z + sz.z / 2);
        //var position = new BABYLON.Vector3(min.x + sz.x / 2, min.y + sz.y / 2, min.z + sz.z / 2);


        b.create.square(2)
        b.mat.createMaterial('red')
        b.pos(position)




        var xDist = max.x - min.x
        var yDist = max.y - min.y
        obj.yDist = yDist;
        var viewDist = Math.max(xDist, yDist);

        //obj.yMid = min.y + ( obj.yDist/2)
        var cameraY = obj.yMid;
        if ( _cameraY ) { cameraY = _cameraY}


        camera.position = new BABYLON.Vector3(0, cameraY,-viewDist*2);
        camera.setTarget(position);
        console.log('moved camear to', camera.position)

    }

    b.zoomTop = function zoomTop( camera, _cameraY) {
        if ( camera ) {
            BabyLib.camera = camera;
        }
        camera = BabyLib.camera;


        /*    var bounds = box.getBoundingInfo();
         var min = bounds.minimum;
         var max = bounds.maximum;*/

        var obj = b.getMaxXYZ()
        var min = obj.min;
        var max = obj.max;

        var sz = new BABYLON.Vector3(Math.abs(max.x - min.x), Math.abs(max.y - min.y), Math.abs(max.z - min.z));
        var position = new BABYLON.Vector3(min.x + sz.x / 2, min.y + sz.y / 2, min.z + sz.z / 2);
        //var position = new BABYLON.Vector3(min.x + sz.x / 2, min.y + sz.y / 2, min.z + sz.z / 2);


        b.create.square(2)
        b.mat.createMaterial('red')
        b.pos(position)



        var xDist = max.x - min.x
        var yDist = max.y - min.y
        obj.yDist = yDist;
        var viewDist = Math.max(obj.xDist, obj.zDist);

        //obj.yMid = min.y + ( obj.yDist/2)
        var cameraY = obj.yMid;
        if ( _cameraY ) { cameraY = _cameraY}


        camera.position = new BABYLON.Vector3(0, viewDist*2, 0);


        camera.setTarget(position);

        console.log('moved camear to', camera.position)

    }
}
BabyLib.defineCameraMethods()



BabyLib.defineLayoutMethods = function defineLayoutMethods() {
    b.layout = {};
    b.layout.makeTileMosaic = function makeTileMosaic( radius, numCircles, plane) {

        //return;
        numCircles = dv(numCircles, 24)
        radius = dv(radius, 12)
        var fxName = 'makeTileMosaic'
        b.cursorMode = true;

        b.setPos(0,15,0)

        sh.each.times(numCircles, function g(i) {
            //console.log(fxName, i);
            b.create.cube(2);
            console.log(fxName, b.last.getBoundingInfo().boundingBox.extendSize)
            // b.pos(5,1+(i*2),0);

            var deg = (360/numCircles)*i;
            var rad = deg * Math.PI / 180;
            var adj = adjacent = Math.cos(rad)*radius
            var opp = Math.sin(rad)*radius
            //console.log(fxName,deg, 'z', opp, 'x', adj )
            console.log('b', b.last.position)
            return;

            b.pos(adj,opp,0);

            if (plane == 'xz') {
                b.pos(adj,0, opp);
            }

            // b.pos(adj,1+(i*2),opp);
            //console.log(fxName, '...', )
        })

        b.cursorMode = false
    }
    b.layout.makeTotem = function makeTotem(asdf) {
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
        var obj = {}
        obj.min = min
        obj.max = max;



        var xDist = max.x - min.x
        var yDist = max.y - min.y
        var zDist = max.z - min.z
        obj.xDist = xDist;
        obj.yDist = yDist;
        obj.zDist = zDist;
        //var viewDist = Math.max(xDist, yDist);
        obj.xMid = min.x + ( obj.xDist/2)
        obj.yMid = min.y + ( obj.yDist/2)
        obj.zMid = min.z + ( obj.zDist/2)
        // var cameraY = obj.yMid;
        obj.center = new BABYLON.Vector3(obj.xMid,obj.yMid,obj.zMid);


        return obj
    }
    b.layout.putItemsInACircle =  function putItemsInACircle(radius, numCircles, plane) {

        numCircles = dv(numCircles, 24)
        radius = dv(radius, 12)
        var fxName = 'xName'
        sh.each.times(numCircles, function g(i) {
            console.log(fxName, i);
            b.create.square(0.2);
            // b.pos(5,1+(i*2),0);
            var deg = (360/numCircles)*i;
            var rad = deg * Math.PI / 180;
            var adj = adjacent = Math.cos(rad)*radius
            var opp = Math.sin(rad)*radius
            console.log(fxName,deg, 'z', opp, 'x', adj )
            b.pos(adj,opp,0);

            if (plane == 'xz') {
                b.pos(adj,0, opp);
            }

            // b.pos(adj,1+(i*2),opp);
            //console.log(fxName, '...', )
        })

    }
    b.layout.loadMesh = function loadMesh( camera, _cameraY) {
        if ( camera ) {
            BabyLib.camera = camera;
        }
        camera = BabyLib.camera;


        /*    var bounds = box.getBoundingInfo();
         var min = bounds.minimum;
         var max = bounds.maximum;*/

        var obj = b.getMaxXYZ()
        var min = obj.min;
        var max = obj.max;

        var sz = new BABYLON.Vector3(Math.abs(max.x - min.x), Math.abs(max.y - min.y), Math.abs(max.z - min.z));
        var position = new BABYLON.Vector3(min.x + sz.x / 2, min.y + sz.y / 2, min.z + sz.z / 2);
        //var position = new BABYLON.Vector3(min.x + sz.x / 2, min.y + sz.y / 2, min.z + sz.z / 2);


        b.create.square(2)
        b.mat.createMaterial('red')
        b.pos(position)



        var xDist = max.x - min.x
        var yDist = max.y - min.y
        obj.yDist = yDist;
        var viewDist = Math.max(obj.xDist, obj.zDist);

        //obj.yMid = min.y + ( obj.yDist/2)
        var cameraY = obj.yMid;
        if ( _cameraY ) { cameraY = _cameraY}


        camera.position = new BABYLON.Vector3(0, viewDist*2, 0);


        camera.setTarget(position);

        console.log('moved camear to', camera.position)
 
    }
}
BabyLib.defineLayoutMethods()



if ( window.fullReload ) {
    window.fullReload()
}
