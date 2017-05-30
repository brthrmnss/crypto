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



    function defaultValue(input, ifNullUse) {
        if (input == null) {
            return ifNullUse
        }
        return input;
    }
    var dv = defaultValue;

    sh.dv = uiUtils.dv;

    sh.isNumber = $.isNumeric
    window.shIsNew = true;


    sh.cid = uiUtils.cid;

}



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

BabyLib.reloadLib = function reloadLib() {
    BabyLib.items = [];
    BabyLib.loader = null;
}


if ( window.BL && window.BL.items ) {
    BabyLib.items = window.b.items;
    //debugger
}

window.b = BabyLib;
window.bl = BabyLib
window.BL = BabyLib

b.getName = function getName(pre) {
    pre = sh.dv(pre, '')
    pre = pre + '_' + b.items.length
    return pre;
}

b.setPos = function setPos(x,y,z) {
    var obj = b.new.pt(x,y,z)
    if ( x.x != null ) {
        obj = x;
    }
    b.cursorModePosition = obj;
}

BabyLib.create = function defineCreation() {
    b.create.cuboid =    function  CreateCuboid(name, length,  height,width, scene) {
      //  b.create.cuboid =    function  CreateCuboid(name, length, width, height,  scene) {
        //length x, width z, height y
        /*length = length/2
        height = height/2
        width = width/2*/
        var cuboid = new BABYLON.Mesh(name, scene);
        var normalsSource = [
            new BABYLON.Vector3(0, 0, 1),
            //z
            new BABYLON.Vector3(0, 0, -1),
            new BABYLON.Vector3(1, 0, 0), //x
            new BABYLON.Vector3(-1, 0, 0), //x
            new BABYLON.Vector3(0, 1, 0), //y
            new BABYLON.Vector3(0, -1, 0) //y
        ];
        var indices = [];
        var positions = [];
        var normals = [];
        var uvs = [];
        // Create each face in turn.
        for (var index = 0; index < normalsSource.length; index++) {
            var normal = normalsSource[index];
            // Get two vectors perpendicular to the face normal and to each other.
            var side1 = new BABYLON.Vector3(normal.y, normal.z, normal.x);
            var side2 = BABYLON.Vector3.Cross(normal, side1);
            // Six indices (two triangles) per face.
            var verticesLength = positions.length / 3;
            indices.push(verticesLength);
            indices.push(verticesLength + 1);
            indices.push(verticesLength + 2);
            indices.push(verticesLength);
            indices.push(verticesLength + 2);
            indices.push(verticesLength + 3);
            // Four vertices per face.
            var vertex = normal.subtract(side1).subtract(side2);
            positions.push(vertex.x*length/2, vertex.y*height/2, vertex.z*width/2);
            normals.push(normal.x, normal.y, normal.z);
            uvs.push(1.0, 1.0);
            vertex = normal.subtract(side1).add(side2);
            positions.push(vertex.x*length/2, vertex.y*height/2, vertex.z*width/2);
            normals.push(normal.x, normal.y, normal.z);
            uvs.push(0.0, 1.0);
            vertex = normal.add(side1).add(side2);
            positions.push(vertex.x*length/2, vertex.y*height/2, vertex.z*width/2);
            normals.push(normal.x, normal.y, normal.z);
            uvs.push(0.0, 0.0);
            vertex = normal.add(side1).subtract(side2);
            positions.push(vertex.x*length/2, vertex.y*height/2, vertex.z*width/2);
            normals.push(normal.x, normal.y, normal.z);
            uvs.push(1.0, 0.0);
        }
        cuboid.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
        cuboid.setVerticesData(BABYLON.VertexBuffer.NormalKind, normals);
        cuboid.setVerticesData(BABYLON.VertexBuffer.UVKind, uvs);
        cuboid.setIndices(indices);
        return cuboid;
    };

    b.create.cube = b.create.square = function square(size,h,d, name) {

        name = sh.dv(name, 'box ' + BabyLib.getName() )
        size = dv(size, 20)
        if ( h || d ) {
          //  size = {width:size, height:h, depth:d}
            var blueBox =  b.create.cuboid(name, size, h, d , b.scene)
        } else {
            var blueBox = BABYLON.Mesh.CreateBox("blue", size, b.scene);
        }



        b.last2 = b.last;
        b.last = blueBox;

        if ( b.cursorMode ) {
            
           // b.pos(b.last, blueBox)
            //blueBox.position.x += b.last.getBoundingInfo().boundingBox.extendSize.x;
            /*

             var vectorsWorld = blueBox.getBoundingInfo().boundingBox.vectorsWorld;
             width = Number(vectorsWorld[1].x-(vectorsWorld[0].x))
             height = Number(vectorsWorld[1].y-(vectorsWorld[0].y))
             depth = Number(vectorsWorld[1].z-(vectorsWorld[0].z))

             blueBox.position.x += width;

             blueBox.position.y += height;
             //debugger
             blueBox.position.z += depth;*/
            if ( b.cursorModePosition ) {
                console.debug('cursorModeMoveto', b.cursorModePosition)
                //special mode
              //  var dim = b.lastDim(blueBox)
                //b.cursorModePosition.x += dim.width/2;
               // b.cursorModePosition.y += dim.height/2;
                b.pos(b.cursorModePosition, blueBox)
                // b.cursorModePosition = null;
                b.cursorSetting = true;
                u.cid(b.cursorNextAction)
                b.cursorSetting = false;
            }
        }


        BabyLib.items.push(b.last)

        return b.last;
    }

/*    b.up = function up(nudge) {
        var blueBox = b.last2;
        var vectorsWorld = blueBox.getBoundingInfo().boundingBox.vectorsWorld;
        width = Number(vectorsWorld[1].x-(vectorsWorld[0].x))
        height = Number(vectorsWorld[1].y-(vectorsWorld[0].y))
        depth = Number(vectorsWorld[1].z-(vectorsWorld[0].z))
        //blueBox.position.x += width;
        var targetMesh = b.last;
        nudge = uiUtils.dv(nudge, 0)
        targetMesh.position.y += height + nudge;
    }
    */


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
        //console.log('set position to', bl.position)

    }
}
BabyLib.definePosition()

b.new = {}
b.new.pt = function createNewPoint(x,y,z) {
    var pt = new BABYLON.Vector3(x,y,z)
    return pt;
}

b.types = {}
b.types.origin = b.new.pt(0,0,0)

BabyLib.defineOrientation = function defineOrientation() {

// The enemy look at the given position, but rotates only along Y-axis
    b.lookAt = function lookAt(mesh, pt) {
        //debugger
        if ( pt == null ) {
            pt = b.types.origin;
        }
        // return;
        mesh.lookAt(pt)
        sh.cid(mesh.fxRotExt, mesh)
        // debugger;
    };

    b.rotateX = function rotateX(mesh, rads) {
        mesh.rotate(BABYLON.Axis.X,rads, BABYLON.Space.LOCAL);
        //  mesh.translate(BABYLON.Axis.X, 1.0, BABYLON.Space.WORLD);
    }

    b.rotateAboutY = function rotateAboutY(mesh, rads) {
        mesh.rotate(BABYLON.Axis.Y, rads, BABYLON.Space.LOCAL);
    }

    b.lookAtY = function lookAtY(mesh, pos) {
        if ( pos == null ) {
            pos = b.new.pt(0,0,0)
            pos = b.types.origin;
        }
        // return;
        var dv = pos.subtract(mesh.position);
        var yaw = -Math.atan2(dv.z, dv.x) - Math.PI / 2;
        mesh.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(yaw, 0, 0);
    };
    /*
     3 things
     move ac
     add tags
     modify tags - bring up a UI to modify tag
     go to new line
     everything occurs before the colon, how to edit it later?
     x on a tag
     bug - something with positon f tag

     work:
     wait for any feedback on subsites
     wait for other work to be complete:

     annouce smoke test
     new email

     cerify ccrt_ui
     ask Tibor to verify env
     ensure Rafi can use it
     check in subsites to new version
     confirm with Geof new repo is ready and team will move
     1 bug with subsites
     upload documentaiton
     take 3 pictures

     */
}
BabyLib.defineOrientation();



BabyLib.defineCameraMethods = function defineCameraMethods() {
    b.zoomToFit = function zoomToFit( camera, _cameraY) {
        if ( camera ) {
            BabyLib.camera = camera;
        }
        camera = BabyLib.camera;


        var dbg = false

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

            if ( dbg ) {
                console.log('\t', '---', min, max)
                console.log('\t', '---', k, minimum, maximum)
            }
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


        console.log('what is min', '\t', min, max)
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

//console.log('obj', obj)
        sh.capRange = function capRange(o, prop, maxVal) {
            var val = o[prop];
            if ( val > maxVal) {
                console.warn('huge val', prop, val, '~'+maxVal)
            }

        }
        sh.capRange(obj, 'xDist', 1000)
        sh.capRange(obj, 'yDist', 1000)
        sh.capRange(obj, 'zDist', 1000)

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



        camera.position = new BABYLON.Vector3(0, viewDist*2*1.5, 0);


        camera.setTarget(b.types.origin);

        console.log('top:', camera.position, 'target', position )

    }
}
BabyLib.defineCameraMethods()



BabyLib.defineLayoutMethods = function defineLayoutMethods() {
    b.c = b.cursor = {}
    b.setCursor = b.cursor.setCursor = function setCursor(x,y,z) {
        b.cursorMode = true;
        if ( x == null ) {
            x = b.types.origin;
        }
        b.setPos(x,y,z)
    }

    b.cursor.setX = function setCursor(x,y,z) {
        b.cursorModePosition.x = 0
    }

    b.clearCursor = b.cursor.clearCursor = function clearCursor(x,y,z) {
        b.cursorMode = false;
        if ( x == null ) {
            x = b.types.origin;
        }
        b.setPos(x,y,z)
    }

    b.cursor.moveCloser = function moveCloser(amt) {
        amt = sh.dv(amt, 0.1)
        b.cursorModePosition.z -= amt;
    }

    b.cursor.right = function right(amt) {
        if ( b.cursorMode == false ) {
            throw 'no no'
        }

        if ( b.cursorSetting != true ) {
            b.cursorNextAction = b.cursor.right;
            return;
        }

        b.last
       // console.log('right',b.last, b.last.width)
        var dim = b.lastDim(b.last)
        var dim2 = b.lastDim(b.last2)
        //dim.width += 0.1
     //   dim.width += 4
       // debugger
        var diff = (dim.width - dim2.width) / 2
        console.log('right',b.last, dim)
        b.cursorModePosition.x += dim.width -+diff;
        b.pos( b.cursorModePosition.clone(), b.last)
        //b.last.position = b.
    }


    b.cursor.leftAlign = function leftAlign(meshTarget, meshRef) {
        // console.log('right',b.last, b.last.width)
        var dim = b.lastDim(meshTarget)
        var dim2 = b.lastDim(meshRef)
        //dim.width += 0.1
        //   dim.width += 4
        // debugger
        var diff = (dim.width - dim2.width) / 2
        console.log('right',b.last, dim)
        meshTarget.position.x = meshRef.position.x + diff;

        b.cursorModePosition = meshTarget.position.clone();
        //b.pos( meshTarget, b.last)
        //b.last.position = b.
    }

    b.cursor.up = function up(amt) {
        if ( b.cursorMode == false ) {
            throw 'no no'
        }

        if ( b.cursorSetting != true ) {
            b.cursorNextAction = b.cursor.up;
            return;
        }

        // console.log('right',b.last, b.last.width)
        var dim = b.lastDim(b.last)
        var dim2 = b.lastDim(b.last2)
        //dim.width += 0.1
        //   dim.width += 4
        // debugger
        var diff = (dim.height - dim2.height) / 2
        console.log('up',b.last, dim)
        b.cursorModePosition.y += dim.height -+diff;
        b.pos( b.cursorModePosition.clone(), b.last)
        //b.last.position = b.
    }

    b.cursor.last = b.lastDim = function lastDim(meshToUse) {
        var blueBox = b.last;
        if ( meshToUse ) {
            blueBox = meshToUse;
        }
        var vectorsWorld = blueBox.getBoundingInfo().boundingBox.vectorsWorld;
        width = Number(vectorsWorld[1].x-(vectorsWorld[0].x));
        height = Number(vectorsWorld[1].y-(vectorsWorld[0].y));
        depth = Number(vectorsWorld[1].z-(vectorsWorld[0].z));
        var box = {width:width, height:height, depth:depth};
        return box;
    }


    b.layout = {};
    b.layout.makeTileMosaic = function makeTileMosaic( radius, numCircles, plane) {

        //return;
        numCircles = dv(numCircles, 24)
        radius = dv(radius, 12)
        var fxName = 'makeTileMosaic'
        b.setCursorMode(0,15,0)
        //cursorMode = true;

        //b.setPos(0,15,0)

        sh.each.times(numCircles, function g(i) {
            //console.log(fxName, i);
            b.create.cube(2);
            console.log(fxName, b.last.getBoundingInfo().boundingBox.extendSize)
            // b.pos(5,1+(i*2),0);

            b.up(0.1);
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


    b.layout.putItemsInASquare =  function putItemsInASquare(radius, numCircles, plane) {

        sh.num = function num(sdf) {
            return sdf.toFixed(2)
        }

        numCircles = dv(numCircles, 24)
        radius = dv(radius, 12)
        var fxName = 'putItemsInASquare'
        sh.each.times(numCircles, function g(i) {
            if ( i > numCircles/4) {
                return;
            }

            console.log(fxName, i);
            b.create.square(0.2);
            // b.pos(5,1+(i*2),0);
            var deg = (360/numCircles)*i;
            var rad = deg * Math.PI / 180;
            // sin = opp / hyp
            // cos = adj / hyp
            // adj = cos * hyp
            var adj = adjacent = Math.cos(rad)*radius
            // opp = sin * hyp
            var opp = Math.sin(rad)*radius

            //tan = opp / adj
            // opp = tan * adj
            var opp = Math.tan(rad)*radius


            x = radius
            y = opp
            z = 0

            console.log(fxName, i, deg, 'x', sh.num(x), 'y', sh.num(y ) )
            //console.log(fxName, i, deg, 'z', sh.num(opp), 'x', sh.num(adj ) )

            if ( y > radius ) {
                y = radius
            }

            b.pos(x,y,z);

            if (plane == 'xz') {
                b.pos(adj,0, opp);
            }

            // b.pos(adj,1+(i*2),opp);
            //console.log(fxName, '...', )
        })

    }

    b.layout.putItemsInASquare2 =  function putItemsInASquare2(radius, numCircles, plane) {

        /*
         get all lines segmenets
         find count
         get lenght of all segments
         calculate distance to travel
         calculate point by point on distance
         */
        sh.num = function num(sdf) {
            return sdf.toFixed(2)
        }

        numCircles = dv(numCircles, 24)
        radius = dv(radius, 12)
        var fxName = 'putItemsInASquare2'

        function makeSegements() {

            var center = new BABYLON.Vector3(0,0,0);

            var segger = {}
            segger.segments = [];
            segger.segments2 = [];
            segger.distance = 0 ;
            segger.lastPt = center;//new BABYLON.Vector3(center.x+radius, center.y, center.z);
            function addSegements(x,y,z) {
                x = u.dv(x,0)
                y = u.dv(y,0)
                z = u.dv(z,0)
                var lastPt = lpt = segger.lastPt;

                var nextPt = new BABYLON.Vector3(x+lpt.x,y+lpt.y,z+lpt.z);

                if ( segger.segments.length > 0) {
                    var distance = BABYLON.Vector3.Distance(lpt, nextPt);
                    segger.distance += distance;
                    //console.log('---',segger.segments.length, segger.distance, distance, nextPt)
                }

                var obj = {};
                obj.a = lastPt;
                obj.b = nextPt;
                segger.segments2.push(obj);
                segger.segments.push(nextPt);
                segger.lastPt = nextPt;
                //makeTestElement
                b.create.square(0.2);
                b.pos(nextPt);

            }
            addSegements(radius,0,0)
            addSegements(0,radius,0)

            addSegements(-radius,0,0)
            addSegements(-radius,0,0)
            addSegements(0,-radius,0)
            addSegements(0,-radius,0)
            addSegements(radius,0,0)
            addSegements(radius,0,0)
            addSegements(0,radius,0) //closed

            sh.each(segger.segments, function onK(k,v) {
                console.log(k, v.x, v.y, v.z)
            })
            console.log('what is distance', segger.distance ) ; //.segments)
            return segger;
        }
        var segger = makeSegements();

        var distBetweenCircles = segger.distance/numCircles
        console.log('distBetweenCircles', distBetweenCircles)

        //get all ponts
        //24 times do x into an array


        return;


        sh.each.times(numCircles, function g(i) {
            if ( i > numCircles/4) {
                return;
            }

            console.log(fxName, i);
            b.create.square(0.2);
            // b.pos(5,1+(i*2),0);
            var deg = (360/numCircles)*i;
            var rad = deg * Math.PI / 180;
            // sin = opp / hyp
            // cos = adj / hyp
            // adj = cos * hyp
            var adj = adjacent = Math.cos(rad)*radius
            // opp = sin * hyp
            var opp = Math.sin(rad)*radius

            //tan = opp / adj
            // opp = tan * adj
            var opp = Math.tan(rad)*radius


            x = radius
            y = opp
            z = 0

            console.log(fxName, i, deg, 'x', sh.num(x), 'y', sh.num(y ) )
            //console.log(fxName, i, deg, 'z', sh.num(opp), 'x', sh.num(adj ) )

            if ( y > radius ) {
                y = radius
            }

            b.pos(x,y,z);

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


    b.loadMesh = function loadMesh( name, dir, file, fxEachMesh, fxAllMeshes) {

        // if ( b.loader == null ) {
        b.loader = new BABYLON.AssetsManager(b.scene);
        // }

        var  loader = b.loader;
        var position = -5;

        if ( name == null ) {
            name = 'bane'
        }
        if ( dir == null ) {
            dir = "../data/"
        }
        if ( file == null ) {
            file = "landlord.obj"
        }

        //  debugger;
        var pos = function(t) {
            //debugger;
            t.loadedMeshes.forEach(function(m) {
                m.position.x -= position;
                BabyLib.items.push(m)
                u.cid(fxEachMesh, m)
            });

            u.cid(fxAllMeshes, t.loadedMeshes)

            //position += 5;
        };
        console.log('loading', name, dir, file)
        var bane = loader.addMeshTask(name, "", dir, file);
        bane.onSuccess = pos;


        bane.onFailure = function onFailure(df) {
            console.error('ok', df)
            alert('ok')
            debugger
        }
        bane.onTaskError = function asdf(sdf) {
            console.error('ok', df)
            alert('ok')
            debugger
        }
        bane.onError = function asdf(sdf) {
            console.error('error on loading', dir, file, sdf)
        }

        loader.load();
        return;

        if ( b.asdf != true ) {

            var bane = loader.addMeshTask("bane", "", "https://dl.dropboxusercontent.com/u/17799537/objFileLoader/Bane/", "Bane_3.obj");
            bane.onSuccess = pos;
            var batman = loader.addMeshTask("batman", "", "https://dl.dropboxusercontent.com/u/17799537/objFileLoader/Batman/", "Batman_Injustice.obj");
            batman.onSuccess = pos;
            var penguin = loader.addMeshTask("penguin", "", "https://dl.dropboxusercontent.com/u/17799537/objFileLoader/Penguin/", "Penguin.obj");
            penguin.onSuccess = pos;


            b.asdf = true;
        }
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
