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


function AnotMaster() {
    var p = AnotMaster.protype;
    var p = this;
    var self = this;

    self.annotations = []
    /**
     * Convert marker coordinates into 3d post
     * @param marker
     */
    p.addAnnotation = function addAnnotation(annotationDescription) {
        self.annotations.push(annotationDescription)
    }


    p.drawMarkers = function drawMarkers(markers) {

    }

    p.drawMarker = function drawMarker(marker) {

    }

    /**
     * Convert marker coordinates into 3d post
     * @param marker
     */
    p.getPose = function getPose(marker) {
        var marker =  markers[i]
        //continue;
        corners = marker.corners;
        corners = JSON.parse(JSON.stringify(corners))
        for (y = 0; y < corners.length; ++y) {
            corner = corners[y];

            corner.x = corner.x - (canvas.width / 2);
            corner.y = (canvas.height / 2) - corner.y;
        }

        var pose = posit.pose(corners);
    }


    /**
     * Inner methods will draw the marker, using
     * various methods
     */
    function defineDrawingFunctions() {
        p.drawMarker2D = function drawMarker2D(marker) {
            var pose = self.getPose(marker)
            var annotation = self.getAnnotation(marker.id)
        }

        p.drawMarker3D = function drawMarker2D(marker) {
            var pose = self.getPose(marker)

        }

        p.drawMarkerThreeJS = function drawMarkerThreeJS(marker) {
            var pose = self.getPose(marker)

        }
    }

    /**
     * Get specified annotation for marker id
     * @param marker
     */
    p.getAnnotationForMarkerId = function getAnnotationForMarkerId(markerId) {
        var foundAnnotation = null;
        for ( var i = 0; i < self.annotations.length; i++) {
            var annotation = self.annotations[i];

            if ( markerId == annotation.markerId) {
                foundAnnotation = annotation;
            }
            if ( annotation.markerId == types.ANY ||
                annotation.markerId == "" ||
                annotation.hasOwnProperty('markerId') == false ) {
                foundAnnotation = annotation;
            }
        }
        //var annotation =globalSettings.annotations[markerId]
        //TODO: what actions are required to render component
        return foundAnnotation;
    }

    /**
     * Get specified annotation for marker id
     * @param marker
     */
    p.drawAnnotation = function drawAnnotation(annotation) {
        var annotation =globalSettings.annotations[marker_id]
        return annotation;
    }

    p.loadFakeAnnotation = function loadFakeAnnotation(markerId){

    }



    p.addMarker = function addMarker(marker, drawSettings){
        var markerId = marker.id;

        if ( drawSettings == null ) {
            drawSettings = {}
            self.drawMarker2D(marker);
        }
        if ( drawSettings.twoD   ) {
            self.drawMarker2D(marker);
        }
        if ( drawSettings.threeD   ) {
            self.drawMarker3D(marker);
        }
        if ( drawSettings.threeJS   ) {
            self.drawMarkerThreeJS(marker);
        }
    }


    p.clearAnnotations = function clearAnnotations() {
        $('#holderAnnotations').empty();
        return;
    }

    /**
     * Take a marker and draws the annotations
     * @param markers
     * var input = {pose:pose, marker:marker, id:marker.id, corners:corners4}
     */
    p.drawMarkerAnnotation = function drawMarkerAnnotation(input) {
        if ( self.posit == null ) {
           // throw 'need posit'
        }
        // var rotation = input.
        var yawPitchRoll = self.getYPR(input.pose);

        var w = 640
        var h = 480

        var x = yawPitchRoll.x;
        var y = yawPitchRoll.y
        var z = yawPitchRoll.z

        var rX = yawPitchRoll.rX;
        var rY = yawPitchRoll.rY;
        var rZ = yawPitchRoll.rZ;

        var rotations = input.rotations;
        var corners = input.corners;

        var input2 = {}
        input2.yawPitchRoll = yawPitchRoll;
        input2.rotations = input.rotations;
        input2.corners = input.corners;
        input2.w = w;
        input2.h = h;

        var annotationInfo = {}
        var annotationInfo = self.getAnnotationForMarkerId(input.id);
        console.log('for marker id', input.id, annotationInfo);
        //return
        if (annotationInfo == null ) {
            annotationInfo = {}

            annotationInfo.centerContent = false;
            annotationInfo.widthOfAnnotation = 6/12
            annotationInfo.xFeet=1
            annotationInfo.yFeet=1

            annotationInfo.alpha = 0.8

            annotationInfo.templateId = 'taskTemplate';
            annotationInfo.vars = {title:'dog'};
        }
        //asdf.g
        input2.annotationInfo = annotationInfo;

        //var kAnnotation = self.getAnnotation();
        //annotationInfo.centerContent = true;

        self.drawPoint(input2)

        //var pose = posit.pose(corners);
        /*
         if ( marker == null) {
         return
         }

         var annotation = globalSettings.annotations[marker.id];
         var pose2D = get2DPose(marker)
         var pose3D = get2DPose(marker)

         if ( annotation.type == types.IMAGE ) {
         //add to canvas image
         }
         if ( annotation.type == types.HANDLEBARS ) {
         //add to canvas image
         }
         */
    }


    /**
     * Gets rotation for pose
     */
    p.getYPR = function getYPR(pose) {
        var output = {};
        var rotation = pose.bestRotation;
        var translation = pose.bestTranslation;

        var yaw = -Math.atan2(rotation[0][2], rotation[2][2]);
        var pitch = -Math.asin(-rotation[1][2]);
        var roll = Math.atan2(rotation[1][0], rotation[1][1]);

        output.yaw = yaw;
        output.pitch = pitch;
        output.roll = roll;


        output.x =   translation[0] | 0;
        output.y =   translation[1] | 0;
        output.z =   translation[2] | 0;

        output.rY =    Math.round( yaw * 180.0/Math.PI)
        output.rX =   Math.round(-pitch * 180.0/Math.PI)
        output.rZ =    Math.round(0+(roll  )* 180.0/Math.PI)

        return output;
    }

    p.drawPoint = function drawPoint(input) {


        var yawPitchRoll = input.yawPitchRoll;
        var w = input.w;
        var h = input.h;

        var x = yawPitchRoll.x;
        var y = yawPitchRoll.y
        var z = yawPitchRoll.z

        var rX = yawPitchRoll.rX;
        var rY = yawPitchRoll.rY;
        var rZ = yawPitchRoll.rZ;

        var annotationInfo = input.annotationInfo;

        var rotations = input.rotations;

        var corners = input.corners;
        // rY = -rY
        //   rX = -rX

        function addRotationToRotations(rotations) {
            var a = 90
            var nin = [[1,0,0],[0, Math.cos(a), -Math.sin(a)],
                [0, Math.sin(a), Math.cos(a)]]

            console.log('90 degree rotation', nin)
            //asdf.g
            var vx = math.multiply(rotations, nin);
            return vx;
        }


        var vx = addRotationToRotations(rotations)
        var rotsZ = Utils.rotationArrayToAngles(vx)
        // asdf.g.d

        function convertRotation3x3ToEuler(rotations) {
            var m02 = rotations[0][2]
            var m01 = rotations[0][1]
            var m10 = rotations[1][0]
            var m12 = rotations[1][2]

            var m21 = rotations[2][1]
            var m20 = rotations[2][0]

            var rotx = (m21 - m12) / Math.sqrt(Math.pow((m21 - m12), 2) +
                Math.pow((m02 - m20), 2) + Math.pow((m10 - m01), 2))
            var roty = (m02 - m20) / Math.sqrt(Math.pow((m21 - m12), 2) +
                Math.pow((m02 - m20), 2) + Math.pow((m10 - m01), 2))
            var rotz = (m10 - m01) / Math.sqrt(Math.pow((m21 - m12), 2) +
                Math.pow((m02 - m20), 2) + Math.pow((m10 - m01), 2))

            console.log(rX, rotx, rY, roty, rZ, rotz)
            rotx = Math.round(rotx * 180.0 / Math.PI);
            roty = Math.round(roty * 180.0 / Math.PI);
            rotz = Math.round(rotz * 180.0 / Math.PI);
            console.log(rX, rotx, rY, roty, rZ, rotz)

            return [rotx, roty, rotz]
        }


        function convertRotationsToX() {
            var rotObjectMatrix = new THREE.Matrix4();
            var deg2rad = function deg2rad(degrees) {
                var rads = degrees * (Math.PI / 180)
                return rads
            }
            var currentRot = new THREE.Euler(deg2rad(rX), deg2rad(rY), deg2rad(rZ), 'XYZ');
            // THREE.asdf(rotations)
            // var a = new THREE.Euler( 0, 1, 1.57, 'XYZ' );
            function rotateAroundObjectAxis(object, axis, radians) {
                var rotObjectMatrix = new THREE.Matrix4();
                rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);
                object.matrix.multiply(rotObjectMatrix);
                object.rotation.setFromRotationMatrix(object.matrix);
            }

            function rotateAroundObjectAxis(matrix, axis, radians) {
                var rotObjectMatrix = new THREE.Matrix4();
                rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);
                matrix.multiply(rotObjectMatrix);
                // object.rotation.setFromRotationMatrix(object.matrix);
                return matrix;
            }


            var xAxis = new THREE.Vector3(1, 0, 0);
            //http://stackoverflow.com/questions/4833380/how-to-convert-a-3x3-rotation-matrix-into-4x4-matrix
            var currentRot = new THREE.Matrix4()
            currentRot.set(
                rotations[0][0], rotations[0][1], rotations[0][2], 0,
                rotations[1][0], rotations[1][1], rotations[1][2], 0,
                rotations[2][0], rotations[2][1], rotations[2][2], 0,
                0, 0, 0, 1
            );
            // currentRot.set(rotations[0][2]);
            var y = rotateAroundObjectAxis(currentRot, xAxis, deg2rad(91));


            var identity = [
                [1, 1, 1],
                [0, 1, 0],
                [0, 0, 1]
            ]
            var identity = [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ]
            console.log('starting', identity)
            var useIdentityToTest = false
            var inMat4 = Utils.convert3x3to4x4(identity)

            var inMat4 = Utils.convert3x3to4x4(rotations)
            //var xAxis = new THREE.Vector3(1,1,1);
            var xAxis = new THREE.Vector3(1, 0, 0);
            var y = rotateAroundObjectAxis(inMat4, xAxis, deg2rad(89));

            //start at beggining
            //y = inMat4;

            console.log('yyy', y, inMat4)

            var newRotMatrix = new THREE.Matrix3();
            y.extractRotation(newRotMatrix)
            console.log('newRotMatrix', newRotMatrix)

            var out2 = 0
            console.log('final', out2)

            //rX=0
            //rY=0
            //rZ=0

            var yyy4 = Utils.convert4x4to3x3Array(y)
            var yyy2 = Utils.rotationArrayToAngles(yyy4)
            //
            console.log('new stuff', yyy2)
            //rX, rY, rZ = yyy4[0], yyy4[1], yyy4[2]
            //rX, rY, rZ = yyy2[0], yyy2[1], yyy2[2]
            //x = rotx; y = roty; z = rotz;

            var eulerConfi = {
                i: 2, j: 0, k: 1,     // NOTE: KML convention is Z, X, Y!
                counterClockwise: true,
                sameAxis: false,      // third axis same as first (i == k)
                frameRelative: false  // frame-relative (vs. static)
            }

            function matToEul(m, config) {
                //var config = M33.eulerConfig;
                var i = config.i;
                var j = config.j;
                var k = config.k;

                var FLT_EPSILON = 1e-6;
                var ea = [0, 0, 0];
                if (config.sameAxis) {
                    var sy = Math.sqrt(m[i][j] * m[i][j] + m[i][k] * m[i][k]);
                    if (sy > 16 * FLT_EPSILON) {
                        ea[0] = Math.atan2(m[i][j], m[i][k]);
                        ea[1] = Math.atan2(sy, m[i][i]);
                        ea[2] = Math.atan2(m[j][i], -m[k][i]);
                    } else {
                        ea[0] = Math.atan2(-m[j][k], m[j][j]);
                        ea[1] = Math.atan2(sy, m[i][i]);
                        ea[2] = 0;
                    }
                } else {
                    var cy = Math.sqrt(m[i][i] * m[i][i] + m[j][i] * m[j][i]);
                    if (cy > 16 * FLT_EPSILON) {
                        ea[0] = Math.atan2(m[k][j], m[k][k]);
                        ea[1] = Math.atan2(-m[k][i], cy);
                        ea[2] = Math.atan2(m[j][i], m[i][i]);
                    } else {
                        ea[0] = Math.atan2(-m[j][k], m[j][j]);
                        ea[1] = Math.atan2(-m[k][i], cy);
                        ea[2] = 0;
                    }
                }
                if (!config.counterClockwise) {
                    ea[0] = -ea[0];
                    ea[1] = -ea[1];
                    ea[2] = -ea[2];
                }
                if (config.frameRelative) {
                    var t = ea[0];
                    ea[0] = ea[2];
                    ea[2] = t;
                }
                return ea;
            }

            var ccc = matToEul(rotations, eulerConfi)
            ccc[0] = Math.round(ccc[0] * 180.0 / Math.PI);
            ccc[1] = Math.round(ccc[1] * 180.0 / Math.PI);
            ccc[2] = Math.round(ccc[2] * 180.0 / Math.PI);
            console.log(ccc)

        }
        //http://westciv.com/tools/3Dtransforms/
        //document.getElementById("outerContainer").style.color = "blue";

        var transform = ''

        var xOffset = 0
        //xOffset = -165
        var yOffset =  0
        // xOffset = -150
        var translateX = (w*.5)  + x + xOffset
        var translateX = (w*.5)  + (x/z)*(w) + xOffset

        var translateY = (h*.5)  - y + yOffset

        translateY = (h*.5)  - (y/z)*(h) + yOffset

        var feet = z/150;


        var dHeight = feet*7;
        var dWidth = feet*7;

        var zPrime = z-50
        var zZ = 1/zPrime
        dWidth =zZ *  h*.90
        dHeight = dWidth;


        //y = 9.315088069·10-5 x2 - 1.534477235·10-1 x + 50

        //http://www.xuru.org/rt/PR.asp#CopyPaste
        var eqXx = z;
        //7.083833086·10-4 x2 - 9.253516337·10-1 x + 301.5039284
        var ratio =( 9.315088069*Math.pow(10,-4)* Math.pow(eqXx ,2) ) -  eqXx*Math.pow(10,-1)  + 50



        dWidth = ratio * h*.01
        var ratio =(  6.935096645*Math.pow(10,-4)* Math.pow(eqXx ,2) ) - 9.163019615 * eqXx*Math.pow(10,-1)  + 301
        dWidth = ratio*1 //20

        dHeight = dWidth = ratio*2
        dHeight = dWidth;



        // var getLargestCorner, getSmallestCorner
        // function defineCornerUtils() {
        function getSmallestCorner(corners, highest) {
            var smallestCorner = corners[0]
            var smallestArea = corners[0].x * corners[0].y;
            for (var i = 0; i < corners.length; i++) {
                var corner = corners[i];
                var area = corner.x * corner.y;
                //console.log('corner', i, area)
                if ( highest != true ) {
                    if (area < smallestArea) {
                        smallestCorner = corner;
                        smallestArea = area
                    }
                } else {
                    if (area > smallestArea) {
                        smallestCorner = corner;
                        smallestArea = area
                    }
                }
            }
//adf.g

            return smallestCorner;
        }


        function getLargestCorner(corners) {
            return getSmallestCorner(corners,true)
        }



        // }
        // defineCornerUtils()


        var cW = 100
        var scaleFactor = 1
        var useCornerWidth = true
        if (useCornerWidth) {
            var jjj = corners[0].x - corners[1].x
            if (jjj < 0) {
                jjj = corners[1].x - corners[0].x
            }


            var jjj = getLargestCorner(corners).x -  getSmallestCorner(corners).x

            console.log('j', jjj)
            dWidth = dHeight = jjj
            cW = jjj;
            //asdf.g.d

            function lineDistance( point1, point2 )
            {
                var xs = 0;
                var ys = 0;

                xs = point2.x - point1.x;
                xs = xs * xs;

                ys = point2.y - point1.y;
                ys = ys * ys;

                return Math.sqrt( xs + ys );
            }

            cW = lineDistance(corners[0], corners[1])

            var largest =    getLargestCorner(corners)
            var smallest =  getSmallestCorner(corners)
            var otherCorner = null;
            for ( var i =0; i < corners.length ; i ++) {
                var corner = corners[i];
                if ( corner == smallest )
                    continue;
                if ( corner == largest )
                    continue;
                otherCorner = corner;
            }
            cW = lineDistance(getLargestCorner(corners), otherCorner); //getSmallestCorner(corners))
            scaleFactor = cW/h
            //asdf.g
        }

        var interCenterElements = false
        interCenterElements = true
        if ( interCenterElements ) {
            //add offset , but needs to be in a manner that makes sense
            if (translateX > 0) {
                //   translateX -= dWidth * .5

            } else {
                // translateX += dWidth * .5
            }

            if (translateY > 0) {
                // translateY -= dWidth * .5
            } else {
                // translateY += dWidth * .5
            }
            // translateY -= dWidth*.5

        }

        var useCoenrs = true
        if ( useCoenrs){


            translateX =  corners[0].x
            translateY =  corners[0].y-30
            //invert upsideodnw points
            if ( corners[1].x < corners[0].x ) {
                translateX =  corners[2].x
                translateY =  corners[2].y-30
            }




            var smallestCorner= getSmallestCorner(corners)
            // asdf.g.d
            translateX = smallestCorner.x
            translateY = smallestCorner.y-30
            //translateZ = 0; //override z to handle edge 'drifting'

        }



        transform += "translateX("+translateX+"px) ";
        transform += "translateY("+translateY+"px) ";



        var translateZ =  -0//(480*.5)  - 100
        translateZ  = z*-1
        // translateZ =  -0

        //translateZ -=  200
        transform += "translateZ("+translateZ+"px) ";

        var perspective =  2//(480*.5)  - 100
        // document.getElementById("demodd").style.transform = "perspective("+perspective+")";
        //    transform += "perspective("+perspective+"px)";


        var innerTransform = ''
        //http://theboredengineers.com/2012/05/the-quadcopter-basics/
        var rotateX = -0
        rotateX = rX
        var rotateY = rY
        var rotateZ =  rZ

        innerTransform += "rotateX("+rotateX+"deg) ";
        innerTransform += "rotateY("+rotateY+"deg) ";
        innerTransform += "rotateZ("+-rotateZ+"deg) ";

        var skewY = -10
        var skewX = 40

        function translateMovementonXAxis(rotateX,rotateY, rotateZ) {

            function rotate(x,y,z, q) {
                var output

                x = x * (Math.PI/180)
                y = y * (Math.PI/180)
                z = z * (Math.PI/180)


                //y' = y*cos q - z*sin q
                //z' = y*sin q + z*cos q
                var q = q * (Math.PI/180)
                var dy = y*Math.cos(q) - z*Math.sin(q)
                var dz = y*Math.sin(q) + z*Math.cos(q)

                x = x * (180/Math.PI)
                dy = dy * (180/Math.PI)
                dz = dz * (180/Math.PI)
                output = [x,dy,dz]
                return output
            }


            var out = rotate(rotateX,rotateY,rotateZ,180)
            rotateX = out[0]
            rotateY = out[1]
            rotateZ = out[2]

            //asdf.g
            //console.error(sd)
            var newT = ''
            newT += "rotateX("+rotateX+"deg) ";
            newT += "rotateY("+rotateY+"deg) ";
            newT += "rotateZ("+rotateZ+"deg) ";
            return newT
        }

        var xyzRotation = translateMovementonXAxis(rotateX,rotateY, rotateZ)
        xyzRotation = ''
        xyzRotation += "rotateX("+180+"deg) ";
        xyzRotation += "rotateY("+0+"deg) ";
        xyzRotation += "rotateZ("+0+"deg) ";

        xyzRotation = ''
        // xyzRotation += innerTransform+ ' '
        //  xyzRotation += transform + ' '
        //xyzRotation += "translateX("+-180+"px) ";
        xyzRotation += "translateX("+-270+"px) ";
        xyzRotation += "translateY("+-180+"px) ";
        //   xyzRotation += ' scale('+scaleFactor+','+scaleFactor+') ';
        xyzRotation += ' scaleX('+scaleFactor+') ';
        xyzRotation += ' scaleY('+scaleFactor+') ';
        xyzRotation += ' scaleZ('+scaleFactor+') ';

        //rotate.attempt2
        xyzRotation += "rotateX("+(89+rX)+"deg) ";

        divIdCount++

        function addDiv(){
            var alpha = annotationInfo.alpha;
            if ( isNaN(alpha) ) {
                alpha = 1;
            }
            console.log('add div', divIdCount)

            var holderDiv = $('<div>').attr('id', 'boo').css({height:'480px',width:'640px',
                position:'absolute',top:'35px','backgroundColor': 'none', 'opacity':alpha});

            var outerContainer = $('<div>').attr('id', 'boo').css({height:'480px',width:'640px',
                position:'absolute',top:'35px','backgroundColor': 'none'})
            holderDiv.append(outerContainer)

            var innerContainer = $('<div>').attr('id', 'boo').css({height:cW+'px',width:cW+'px',
                position:'absolute',top:'0px',
                // 'backgroundColor': '#FFFF00',
                //opacity:'50%',
                background: 'rgba(54, 25, 25, .5)',
                transform:  transform + ' ' +  innerTransform})
            outerContainer.append(innerContainer);


            var bookmarks = {};
            bookmarks.scaleInnerContainer
            //need to ensure annotation is proper width in real world ...
            //100 px == how big?
            var scaleTransform = ''
            var innerScaleFactor = 1;
            scaleTransform += ' scaleX('+innerScaleFactor+') ';
            scaleTransform += ' scaleY('+innerScaleFactor+') ';

            //how wide is real world marker?
            //var annotation = anotMaster.getAnnotaion(id)
            //annotation.width
            //1 foot in real world / how many pixels
            //1/100px
            //sync back to issues

            var innerTransformContainer = $('<div>').attr('id', 'boo').css(
                {
                    height:cW+'px',width:cW+'px',
                    position:'absolute',top:'0px',
                    'backgroundColor': '#FFFF00',
                    //opacity:'50%',
                    //  background: 'rgba(54, 0, 0, .5)',
                    //   transform:  xyzRotation
                })//.addClass('Center-Container')

            innerTransformContainer.append('<img src="arrow2.png" style=" position:absolute; top:0px; '+
                'transform: '+xyzRotation+'" />');
            //will push content down ....
            //innerTransformContainer.append('-&-');


            function getSizeOfAnnotation(targetFeetOfAnnotation, overlayPixelWidth){
                //100px is how many feet?

                var realWorldWidthOfAnnotation = 6/12; //1/2 ft
                realWorldWidthOfAnnotation =  annotationInfo.widthOfAnnotation;

                var pixelWidthOfAnnotation = cW;


                var realWorldWidth_of_Overlay = 0
                realWorldWidth_of_Overlay = targetFeetOfAnnotation; //ft

                var pixelWidthOfTargetAnnotation = 0 ;


                pixelWidthOfTargetAnnotation = (realWorldWidth_of_Overlay/realWorldWidthOfAnnotation)*pixelWidthOfAnnotation


                //attempt 1
                //easiest to set width on container of overlay

                //return realWorldWidth_of_Overlay/realWorldWidthOfAnnotation
                //this is a permanent scal,e take in to account the original width

                //0.5 is to cW as 3 is to x?
                //ratio of x=6 times larger, in pixel
                //targetOverlayWidth cW*x = 600
                //cW is to 600 = ratio of scale

                //targetOverLayWidth / overlayPixelWidth = scale
                var scaleU = pixelWidthOfTargetAnnotation/overlayPixelWidth

                return scaleU;

                var scaleX = 1;
                var realScaleSize=0 ;// = div.width();

                //width of it currently ... to target width
                var y = realScaleSize/pixelWidthOfTargetAnnotation

            }

            function getSizeOfOffset( xFeet, yFeet) {
                var x,y
                var realWorldWidthOfAnnotation = annotationInfo.widthOfAnnotation;
                var pixelWidthOfAnnotation = cW;
                //x distance * x = pixelWidth
                x = (xFeet/realWorldWidthOfAnnotation)*pixelWidthOfAnnotation
                y = (yFeet/realWorldWidthOfAnnotation)*pixelWidthOfAnnotation
                //console.log(x, y)
                if ( isNaN(x)  ) {
                    x = 0 ;
                }
                if ( isNaN(y)  ) {
                    y = 0 ;
                }
                return {x:x,y:y}
            }

            var centerContent = annotationInfo.centerContent;

            var overlayScale = getSizeOfAnnotation(3, 300);

            //get offset ...

            var offset = getSizeOfOffset(annotationInfo.xFeet, annotationInfo.yFeet)

            var yyx  = {};

            //anotationInfo.whatISee;

            var x = window.template(annotationInfo.templateId)
            //var htmlAnnotation = x({title:'dog'})
            var htmlAnnotation = x(annotationInfo.vars)
            //wrap overlay in div that will scale it.

            //console.log('centerContent', centerContent, offset.y, annotationInfo, offset)
            //asdf.g
            //return;
            if ( centerContent ) {
                var divWrapperStart =  '<div class="container2" '+
                    //  ' style=" transform: scale('+overlayScale+','+overlayScale+'); xtransform-origin: 0% -0%; '+
                    // '  position:absolute; top:5px;  ' +
                    '">'
                var divWrapperEnd = '</div>'
                // divWrapperStart = '<div>'
                //innerTransformContainer.empty()
                innerTransformContainer.append(
                        '<div class="Center-Container" style="width:20px; height: 20px; border: dashed;' +
                        //   ' position:absolute; top: 0px;' +
                        ' position:absolute; top: 40%; left: 40%;' +
                        ' transform: scale('+overlayScale+','+overlayScale+'); xtransform-origin: 0% -0%; '+
                        '">'+
                        divWrapperStart+htmlAnnotation+divWrapperEnd +
                        divWrapperEnd
                );

            } else { // do nto center content
                var divWrapperStart =  '<div class="container2ZZZZZ" '+
                    '">'
                var divWrapperEnd = '</div>'
                innerTransformContainer.append(
                        '<div class="Center-Container" style="width:20px; height: 20px; border: dashed;' +
                        //   ' position:absolute; top: 0px;' +
                        ' position:absolute; top: '+offset.y+'px; left: '+offset.x+'px; ' +
                        ' transform: scale('+overlayScale+','+overlayScale+'); xtransform-origin: 0% -0%; '+
                        '">'+
                        divWrapperStart+htmlAnnotation+divWrapperEnd +
                        divWrapperEnd
                );
            }
            innerContainer.append(innerTransformContainer);

            var innerContainer2 = $('<div>').attr('id', 'boo').css({height:cW+'px',width:cW+'px',
                fontSize:'46px'
            })

            innerContainer2.text(divIdCount)
            innerContainer.append(innerContainer2);

            $('#holderAnnotations').append(holderDiv);
            return
        }

        addDiv()

    }





}


/**
 * Underscore template
 *
 * @param markers
 */

/**
 * Copy of original drawId, but understands the marker id
 * @param markers
 */
function drawId(markers){
    if ( context == null ) {
        //   context = context.getdf();
    }
    var corners, corner, x, y, i, j;

    context.strokeStyle = "blue";
    context.lineWidth = 1;

    for (i = 0; i !== markers.length; ++ i){
        corners = markers[i].corners;
        var marker = markers[i];
        drawMarkerAnnotation(marker.id)
        x = Infinity;
        y = Infinity;

        for (j = 0; j !== corners.length; ++ j){
            corner = corners[j];

            x = Math.min(x, corner.x);
            y = Math.min(y, corner.y);
        }

        context.strokeText(markers[i].id, x, y)
    }
}


function drawPose() {

}

var divIdCount =0

function drawPoint(x,y,z, rY, rX, rZ , w,h, rotations, corners) {

    var annotationInfo = {}
    annotationInfo.centerContent = false;
    annotationInfo.widthOfAnnotation = 6/12
    annotationInfo.xFeet=1
    annotationInfo.yFeet=1

    annotationInfo.centerContent = true;
    annotationInfo.alpha = 0.8


    // rY = -rY
    //   rX = -rX

    function addRotationToRotations(rotations) {
        var a = 90
        var nin = [[1,0,0],[0, Math.cos(a), -Math.sin(a)],
            [0, Math.sin(a), Math.cos(a)]]

        console.log('90 degree rotation', nin)
        //asdf.g
        var vx = math.multiply(rotations, nin);
        return vx;
    }

    var transform = ''

    var xOffset = 0
    //xOffset = -165
    var yOffset =  0
    // xOffset = -150
    var translateX = (w*.5)  + x + xOffset
    var translateX = (w*.5)  + (x/z)*(w) + xOffset

    var translateY = (h*.5)  - y + yOffset
    translateY = (h*.5)  - (y/z)*(h) + yOffset

    var feet = z/150;

    var dHeight = feet*7;
    var dWidth = feet*7;

    var zPrime = z-50
    var zZ = 1/zPrime
    dWidth =zZ *  h*.90
    dHeight = dWidth;

    //y = 9.315088069·10-5 x2 - 1.534477235·10-1 x + 50
    //http://www.xuru.org/rt/PR.asp#CopyPaste
    var eqXx = z;
    //7.083833086·10-4 x2 - 9.253516337·10-1 x + 301.5039284
    var ratio =( 9.315088069*Math.pow(10,-4)* Math.pow(eqXx ,2) ) -  eqXx*Math.pow(10,-1)  + 50

    dWidth = ratio * h*.01
    var ratio =(  6.935096645*Math.pow(10,-4)* Math.pow(eqXx ,2) ) - 9.163019615 * eqXx*Math.pow(10,-1)  + 301
    dWidth = ratio*1 //20

    dHeight = dWidth = ratio*2
    dHeight = dWidth;

    // var getLargestCorner, getSmallestCorner
    // function defineCornerUtils() {
    function getSmallestCorner(corners, highest) {
        var smallestCorner = corners[0]
        var smallestArea = corners[0].x * corners[0].y;
        for (var i = 0; i < corners.length; i++) {
            var corner = corners[i];
            var area = corner.x * corner.y;
            //console.log('corner', i, area)
            if ( highest != true ) {
                if (area < smallestArea) {
                    smallestCorner = corner;
                    smallestArea = area
                }
            } else {
                if (area > smallestArea) {
                    smallestCorner = corner;
                    smallestArea = area
                }
            }
        }
//adf.g

        return smallestCorner;
    }


    function getLargestCorner(corners) {
        return getSmallestCorner(corners,true)
    }

    var cW = 100
    var scaleFactor = 1
    var useCornerWidth = true
    if (useCornerWidth) {
        var jjj = corners[0].x - corners[1].x
        if (jjj < 0) {
            jjj = corners[1].x - corners[0].x
        }


        var jjj = getLargestCorner(corners).x -  getSmallestCorner(corners).x

        console.log('j', jjj)
        dWidth = dHeight = jjj
        cW = jjj;
        //asdf.g.d

        function lineDistance( point1, point2 )
        {
            var xs = 0;
            var ys = 0;

            xs = point2.x - point1.x;
            xs = xs * xs;

            ys = point2.y - point1.y;
            ys = ys * ys;

            return Math.sqrt( xs + ys );
        }

        cW = lineDistance(corners[0], corners[1])

        var largest =    getLargestCorner(corners)
        var smallest =  getSmallestCorner(corners)
        var otherCorner = null;
        for ( var i =0; i < corners.length ; i ++) {
            var corner = corners[i];
            if ( corner == smallest )
                continue;
            if ( corner == largest )
                continue;
            otherCorner = corner;
        }
        cW = lineDistance(getLargestCorner(corners), otherCorner); //getSmallestCorner(corners))
        scaleFactor = cW/h
        //asdf.g
    }


    var interCenterElements = false
    interCenterElements = true
    if ( interCenterElements ) {
        //add offset , but needs to be in a manner that makes sense
        if (translateX > 0) {
            //   translateX -= dWidth * .5
        } else {
            // translateX += dWidth * .5
        }

        if (translateY > 0) {
            // translateY -= dWidth * .5
        } else {
            // translateY += dWidth * .5
        }
        // translateY -= dWidth*.5
    }

    var useCorners = true
    if ( useCorners ){

        translateX =  corners[0].x
        translateY =  corners[0].y-30
        //invert upsideodnw points
        if ( corners[1].x < corners[0].x ) {
            translateX =  corners[2].x
            translateY =  corners[2].y-30
        }

        var smallestCorner= getSmallestCorner(corners)
        // asdf.g.d
        translateX = smallestCorner.x
        translateY = smallestCorner.y-30
        //translateZ = 0; //override z to handle edge 'drifting'
    }

    transform += "translateX("+translateX+"px) ";
    transform += "translateY("+translateY+"px) ";

    var translateZ =  -0//(480*.5)  - 100
    translateZ  = z*-1
    transform += "translateZ("+translateZ+"px) ";

    var perspective =  2//(480*.5)  - 100
    // document.getElementById("demodd").style.transform = "perspective("+perspective+")";
    //    transform += "perspective("+perspective+"px)";


    var innerTransform = ''
    //http://theboredengineers.com/2012/05/the-quadcopter-basics/
    var rotateX = -0
    rotateX = rX
    var rotateY = rY
    var rotateZ =  rZ

    //rotateY = 0
    //identify
    //rotateX = 0 //pushing back like card deck
    //rotateY = 50 //spinnign on vertical axis
    //rotateZ = 50 //spinning around z axis

    //  rotateX += 20
    // transform += "rotateX("+90+"deg) ";
    innerTransform += "rotateX("+rotateX+"deg) ";

    innerTransform += "rotateY("+rotateY+"deg) ";

    innerTransform += "rotateZ("+-rotateZ+"deg) ";


    var skewY = -10
    var skewX = 40
    //innerTransform += " skew("+skewX+"deg, "+skewY+"deg) ";



    var xyzRotation = null;
    xyzRotation = ''
    xyzRotation += "rotateX("+180+"deg) ";
    xyzRotation += "rotateY("+0+"deg) ";
    xyzRotation += "rotateZ("+0+"deg) ";

    xyzRotation = ''
    // xyzRotation += innerTransform+ ' '
    //  xyzRotation += transform + ' '
    //xyzRotation += "translateX("+-180+"px) ";
    xyzRotation += "translateX("+-270+"px) ";
    xyzRotation += "translateY("+-180+"px) ";
    //   xyzRotation += ' scale('+scaleFactor+','+scaleFactor+') ';
    xyzRotation += ' scaleX('+scaleFactor+') ';
    xyzRotation += ' scaleY('+scaleFactor+') ';
    xyzRotation += ' scaleZ('+scaleFactor+') ';

    //rotate.attempt2
    xyzRotation += "rotateX("+(89+rX)+"deg) ";
    // xyzRotation += "rotateY("+rotsZ[1]+"deg) ";
    //  xyzRotation += "rotateZ("+rotsZ[2]+"deg) ";
    //xyzRotation = ''
    // xyzRotation += "rotateX("+0+"deg) ";

    divIdCount++

    function addDiv(){
        console.log('add div', divIdCount)

        var iinerDiv = 'asdfdfdfdf'
        var holderDiv = $('<div>').attr('id', 'boo').css({height:'480px',width:'640px',
            position:'absolute',top:'35px','backgroundColor': 'none'});

        var outerContainer = $('<div>').attr('id', 'boo').css({height:'480px',width:'640px',
            position:'absolute',top:'35px','backgroundColor': 'none'})
        holderDiv.append(outerContainer)

        var innerContainer = $('<div>').attr('id', 'boo').css({height:cW+'px',width:cW+'px',
            position:'absolute',top:'0px',
            // 'backgroundColor': '#FFFF00',
            //opacity:'50%',
            background: 'rgba(54, 25, 25, .5)',
            transform:  transform + ' ' +  innerTransform})
        outerContainer.append(innerContainer);


        var bookmarks = {};
        bookmarks.scaleInnerContainer
        //need to ensure annotation is proper width in real world ...
        //100 px == how big?
        var scaleTransform = ''
        var innerScaleFactor = 1;
        scaleTransform += ' scaleX('+innerScaleFactor+') ';
        scaleTransform += ' scaleY('+innerScaleFactor+') ';

        //how wide is real world marker?
        //var annotation = anotMaster.getAnnotaion(id)
        //annotation.width
        //1 foot in real world / how many pixels
        //1/100px
        //sync back to issues 

        var innerTransformContainer = $('<div>').attr('id', 'boo').css(
            {
                height:cW+'px',width:cW+'px',
                position:'absolute',top:'0px',
                'backgroundColor': '#FFFF00',
                //opacity:'50%',
                //  background: 'rgba(54, 0, 0, .5)',
                //   transform:  xyzRotation
            })//.addClass('Center-Container')
        innerTransformContainer.append('<img src="arrow2.png" style=" position:absolute; top:0px; '+
            'transform: '+xyzRotation+'" />');
        innerTransformContainer.append('-&-');





        function getSizeOfAnnotation(targetFeetOfAnnotation, overlayPixelWidth){
            //100px is how many feet?

            var realWorldWidthOfAnnotation = 6/12; //1/2 ft
            realWorldWidthOfAnnotation =  annotationInfo.widthOfAnnotation;

            var pixelWidthOfAnnotation = cW;


            var realWorldWidth_of_Overlay = 0
            realWorldWidth_of_Overlay = targetFeetOfAnnotation; //ft

            var pixelWidthOfTargetAnnotation = 0 ;


            pixelWidthOfTargetAnnotation = (realWorldWidth_of_Overlay/realWorldWidthOfAnnotation)*pixelWidthOfAnnotation


            //attempt 1
            //easiest to set width on container of overlay

            //return realWorldWidth_of_Overlay/realWorldWidthOfAnnotation
            //this is a permanent scal,e take in to account the original width

            //0.5 is to cW as 3 is to x?
            //ratio of x=6 times larger, in pixel
            //targetOverlayWidth cW*x = 600
            //cW is to 600 = ratio of scale

            //targetOverLayWidth / overlayPixelWidth = scale
            var scaleU = pixelWidthOfTargetAnnotation/overlayPixelWidth

            return scaleU;

            var scaleX = 1;
            var realScaleSize=0 ;// = div.width();

            //width of it currently ... to target width
            var y = realScaleSize/pixelWidthOfTargetAnnotation

        }

        function getSizeOfOffset( xFeet, yFeet) {
            var x,y
            var realWorldWidthOfAnnotation = annotationInfo.widthOfAnnotation;
            var pixelWidthOfAnnotation = cW;
            //x distance * x = pixelWidth
            x = (xFeet/realWorldWidthOfAnnotation)*pixelWidthOfAnnotation
            y = (yFeet/realWorldWidthOfAnnotation)*pixelWidthOfAnnotation
            return {x:x,y:y}
        }

        var centerContent =   annotationInfo.centerContent;


        //centerContent = false;




        var overlayScale = getSizeOfAnnotation(3, 300);

        //get offset ...

        var offset = getSizeOfOffset(annotationInfo.xFeet, annotationInfo.yFeet)

        var x = window.template('taskTemplate')
        var htmlAnnotation = x({title:'dog'})
        //wrap overlay in div that will scale it.

        if ( centerContent ) {
            var divWrapperStart =  '<div class="container2" '+
                //  ' style=" transform: scale('+overlayScale+','+overlayScale+'); xtransform-origin: 0% -0%; '+
                // '  position:absolute; top:5px;  ' +
                '">'
            var divWrapperEnd = '</div>'
            // divWrapperStart = '<div>'
            //innerTransformContainer.empty()
            innerTransformContainer.append(
                    '<div class="Center-Container" style="width:20px; height: 20px; border: dashed;' +
                    //   ' position:absolute; top: 0px;' +
                    ' position:absolute; top: 40%; left: 40%;' +
                    ' transform: scale('+overlayScale+','+overlayScale+'); xtransform-origin: 0% -0%; '+
                    '">'+
                    divWrapperStart+htmlAnnotation+divWrapperEnd +
                    divWrapperEnd
            );

        } else { // do nto center content
            var divWrapperStart =  '<div class="container2ZZZZZ" '+
                '">'
            var divWrapperEnd = '</div>'
            innerTransformContainer.append(
                    '<div class="Center-Container" style="width:20px; height: 20px; border: dashed;' +
                    //   ' position:absolute; top: 0px;' +
                    ' position:absolute; top: '+offset.y+'px; left: '+offset.x+'px; ' +
                    ' transform: scale('+overlayScale+','+overlayScale+'); xtransform-origin: 0% -0%; '+
                    '">'+
                    divWrapperStart+htmlAnnotation+divWrapperEnd +
                    divWrapperEnd
            );
        }
        innerContainer.append(innerTransformContainer);








        var innerContainer2 = $('<div>').attr('id', 'boo').css({height:cW+'px',width:cW+'px',
            fontSize:'46px'
        })


        innerContainer2.text(divIdCount)
        innerContainer.append(innerContainer2);




        $('#holderAnnotations').append(holderDiv);
        return
        /*
         <div class="Center-Container">
         <div class="Center-Block Absolute-Center">
         <h4 class="Title">Absolute Center,<br>Within Container.</h4>
         <p>          This box is absolutely centered, horizontally and vertically, within its container using <br><code>position: relative</code></p></div>
         <p></p></div>
         */

    }

    addDiv()

    return;

    //var transformO = -55
    //  document.getElementById("innerContainer").style.transformOrigin="0 0";
    //  document.getElementById("innerContainer").style.transformOrigin=translateX+100 + "px " + translateY
    document.getElementById("innerContainer").style.transformOrigin="100 0"
    document.getElementById("innerContainer").style.transformOrigin=translateX + " " + translateY
    document.getElementById("innerContainer").style.transformOrigin=0 + " " + 0
    //  document.getElementById("innerContainer").style.transformOrigin=w/2 + " " + h/2
    // document.getElementById("innerContainer").style.transformOrigin=x + " " + y
    //http://www.w3schools.com/cssref/css3_pr_perspective.asp
    //http://css-tricks.com/almanac/properties/p/perspective/
    var perspective =  10000//(480*.5)  - 100
    //var btransform = "perspective("+perspective+"px)";

    document.getElementById("canvasBackboard").style.perspective = perspective

    document.getElementById("outerContainer").style.transform = transform

    document.getElementById("innerContainer").style.transform = innerTransform


    document.getElementById('innerContainer').style.width= dWidth+'px';
    document.getElementById('innerContainer').style.height= dHeight+'px';
    //   document.getElementById("outerContainer").setAttribute("style","width:50px");
    // document.getElementById("outerContainer").setAttribute("style","width:50px");
}


Utils = {}
/**
 * Convert 3x3 to matrix
 * @param rotation
 * @returns {*[]}
 */
Utils.rotationArrayToMatrix = function ( rotations ) {
    var matrix = new THREE.Matrix3()
    matrix.set(
        rotations[0][0],rotations[0][1],rotations[0][2],
        rotations[1][0],rotations[1][1],rotations[1][2],
        rotations[2][0],rotations[2][1],rotations[2][2]
    );

    return matrix

}

Utils.convert3x3to4x4 = function ( rotations ) {
    var matrix = new THREE.Matrix4()
    matrix.set(
        rotations[0][0],rotations[0][1],rotations[0][2],0,
        rotations[1][0],rotations[1][1],rotations[1][2],0,
        rotations[2][0],rotations[2][1],rotations[2][2],0,
        0,0,0,1
    );
    return matrix

}


Utils.convert4x4to3x3Array = function ( mat ) {
    var elements = mat.elements
    var matrix = []
    matrix = [
        [elements[0], elements[1], elements[2]],
        [elements[0+4], elements[1+4], elements[2+4]],
        [elements[0+8], elements[1+8], elements[2+8]]

    ]
    return matrix

}


/**
 * Convert 3x3 to matrix
 * @param rotation
 * @returns {*[]}
 */
Utils.rotationArrayToAngles = function ( rotation) {
    var yaw = -Math.atan2(rotation[0][2], rotation[2][2]);
    var pitch = -Math.asin(-rotation[1][2]);
    var roll = Math.atan2(rotation[1][0], rotation[1][1]);

    return [
        Math.round(-pitch * 180.0/Math.PI),
        Math.round(-yaw * 180.0/Math.PI),
        Math.round(roll * 180.0/Math.PI)
    ]
}



Utils.asdf = function () {

    var vx = addRotationToRotations(rotations)
    var rotsZ = Utils.rotationArrayToAngles(vx)
    // asdf.g.d

    function convertRotation3x3ToEuler(rotations) {
        var m02 = rotations[0][2]
        var m01 = rotations[0][1]
        var m10 = rotations[1][0]
        var m12 = rotations[1][2]

        var m21 = rotations[2][1]
        var m20 = rotations[2][0]

        var rotx = (m21 - m12) / Math.sqrt(Math.pow((m21 - m12), 2) +
            Math.pow((m02 - m20), 2) + Math.pow((m10 - m01), 2))
        var roty = (m02 - m20) / Math.sqrt(Math.pow((m21 - m12), 2) +
            Math.pow((m02 - m20), 2) + Math.pow((m10 - m01), 2))
        var rotz = (m10 - m01) / Math.sqrt(Math.pow((m21 - m12), 2) +
            Math.pow((m02 - m20), 2) + Math.pow((m10 - m01), 2))

        console.log(rX, rotx, rY, roty, rZ, rotz)
        rotx = Math.round(rotx * 180.0 / Math.PI);
        roty = Math.round(roty * 180.0 / Math.PI);
        rotz = Math.round(rotz * 180.0 / Math.PI);
        console.log(rX, rotx, rY, roty, rZ, rotz)

        return [rotx, roty, rotz]
    }


    function convertRotationsToX() {
        var rotObjectMatrix = new THREE.Matrix4();
        var deg2rad = function deg2rad(degrees) {
            var rads = degrees * (Math.PI / 180)
            return rads
        }
        var currentRot = new THREE.Euler(deg2rad(rX), deg2rad(rY), deg2rad(rZ), 'XYZ');
        // THREE.asdf(rotations)
        // var a = new THREE.Euler( 0, 1, 1.57, 'XYZ' );
        function rotateAroundObjectAxis(object, axis, radians) {
            var rotObjectMatrix = new THREE.Matrix4();
            rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);
            object.matrix.multiply(rotObjectMatrix);
            object.rotation.setFromRotationMatrix(object.matrix);
        }

        function rotateAroundObjectAxis(matrix, axis, radians) {
            var rotObjectMatrix = new THREE.Matrix4();
            rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);
            matrix.multiply(rotObjectMatrix);
            // object.rotation.setFromRotationMatrix(object.matrix);
            return matrix;
        }


        var xAxis = new THREE.Vector3(1, 0, 0);
        //http://stackoverflow.com/questions/4833380/how-to-convert-a-3x3-rotation-matrix-into-4x4-matrix
        var currentRot = new THREE.Matrix4()
        currentRot.set(
            rotations[0][0], rotations[0][1], rotations[0][2], 0,
            rotations[1][0], rotations[1][1], rotations[1][2], 0,
            rotations[2][0], rotations[2][1], rotations[2][2], 0,
            0, 0, 0, 1
        );
        // currentRot.set(rotations[0][2]);
        var y = rotateAroundObjectAxis(currentRot, xAxis, deg2rad(91));


        var identity = [
            [1, 1, 1],
            [0, 1, 0],
            [0, 0, 1]
        ]
        var identity = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]
        console.log('starting', identity)
        var useIdentityToTest = false
        var inMat4 = Utils.convert3x3to4x4(identity)

        var inMat4 = Utils.convert3x3to4x4(rotations)
        //var xAxis = new THREE.Vector3(1,1,1);
        var xAxis = new THREE.Vector3(1, 0, 0);
        var y = rotateAroundObjectAxis(inMat4, xAxis, deg2rad(89));

        //start at beggining
        //y = inMat4;

        console.log('yyy', y, inMat4)

        var newRotMatrix = new THREE.Matrix3();
        y.extractRotation(newRotMatrix)
        console.log('newRotMatrix', newRotMatrix)

        var out2 = 0
        console.log('final', out2)

        //rX=0
        //rY=0
        //rZ=0

        var yyy4 = Utils.convert4x4to3x3Array(y)
        var yyy2 = Utils.rotationArrayToAngles(yyy4)
        //
        console.log('new stuff', yyy2)
        //rX, rY, rZ = yyy4[0], yyy4[1], yyy4[2]
        //rX, rY, rZ = yyy2[0], yyy2[1], yyy2[2]
        //x = rotx; y = roty; z = rotz;

        var eulerConfi = {
            i: 2, j: 0, k: 1,     // NOTE: KML convention is Z, X, Y!
            counterClockwise: true,
            sameAxis: false,      // third axis same as first (i == k)
            frameRelative: false  // frame-relative (vs. static)
        }

        function matToEul(m, config) {
            //var config = M33.eulerConfig;
            var i = config.i;
            var j = config.j;
            var k = config.k;

            var FLT_EPSILON = 1e-6;
            var ea = [0, 0, 0];
            if (config.sameAxis) {
                var sy = Math.sqrt(m[i][j] * m[i][j] + m[i][k] * m[i][k]);
                if (sy > 16 * FLT_EPSILON) {
                    ea[0] = Math.atan2(m[i][j], m[i][k]);
                    ea[1] = Math.atan2(sy, m[i][i]);
                    ea[2] = Math.atan2(m[j][i], -m[k][i]);
                } else {
                    ea[0] = Math.atan2(-m[j][k], m[j][j]);
                    ea[1] = Math.atan2(sy, m[i][i]);
                    ea[2] = 0;
                }
            } else {
                var cy = Math.sqrt(m[i][i] * m[i][i] + m[j][i] * m[j][i]);
                if (cy > 16 * FLT_EPSILON) {
                    ea[0] = Math.atan2(m[k][j], m[k][k]);
                    ea[1] = Math.atan2(-m[k][i], cy);
                    ea[2] = Math.atan2(m[j][i], m[i][i]);
                } else {
                    ea[0] = Math.atan2(-m[j][k], m[j][j]);
                    ea[1] = Math.atan2(-m[k][i], cy);
                    ea[2] = 0;
                }
            }
            if (!config.counterClockwise) {
                ea[0] = -ea[0];
                ea[1] = -ea[1];
                ea[2] = -ea[2];
            }
            if (config.frameRelative) {
                var t = ea[0];
                ea[0] = ea[2];
                ea[2] = t;
            }
            return ea;
        }

        var ccc = matToEul(rotations, eulerConfi)
        ccc[0] = Math.round(ccc[0] * 180.0 / Math.PI);
        ccc[1] = Math.round(ccc[1] * 180.0 / Math.PI);
        ccc[2] = Math.round(ccc[2] * 180.0 / Math.PI);
        console.log(ccc)

    }
    //http://westciv.com/tools/3Dtransforms/
    document.getElementById("outerContainer").style.color = "blue";
}