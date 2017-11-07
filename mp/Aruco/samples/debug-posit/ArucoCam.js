
if (typeof window == 'undefined ') {
    var sh = require('shelpers').shelpers;
    var shelpers = require('shelpers');
}




function ArucoCam() {
    var p = ArucoCam.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    self.data.modelSize = 35.0; //millimeters

    p.init = function init(config) {
        self.settings = sh.dv(config, {});
        config = self.settings;



        video = document.getElementById("video");
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");

        canvas.width = parseInt(canvas.style.width);
        canvas.height = parseInt(canvas.style.height);
        self.data.canvas = canvas;

    }

    p.startCam = function startCam() {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (navigator.getUserMedia) {
            self.initCam();
        }


       // requestAnimationFrame(self.tick);
        clearInterval(window.intSnapshot)
        window.intSnapshot = setInterval(self.snapshot,1200)
    }


    p.snapshot = function snapshot() {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        //var pic = document.getElementById("pic");
        //context.drawImage(pic, 0, 0, pic.width, pic.height);


        imageData = context.getImageData(0, 0, canvas.width, canvas.height);

       /// context2 =  window.img.getContext("2d");
     //   context2.drawImage(video, 0, 0, canvas.width, canvas.height);
       // window.img.src = imageData;
        window.arucoRenderer.processQRImageData(imageData)
    };


    p.tick = function tick() {

        requestAnimationFrame(tick);

        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            /*snapshot();

            var markers = detector.detect(imageData);
            drawCorners(markers);
            updateScenes(markers);

            render();*/

        }
    };

    p.initCam = function initCam() {
        navigator.getUserMedia({video: true},
            function (stream) {
                if (window.webkitURL) {
                    video.src = window.webkitURL.createObjectURL(stream);
                } else if (video.mozSrcObject !== undefined) {
                    video.mozSrcObject = stream;
                } else {
                    video.src = stream;
                }
                window.stream = stream;
            },
            function (error) {
            }
        );
        self.data.detector = new AR.Detector();
        self.data.posit = new POS.Posit(self.data.modelSize, self.data.canvas.width);
    }

    var detector = null;
    var posit = null;
    var context = null;

    var modelSize = 35.0; //millimeters


    p.src = function src(img, id) {
        if (img.length) {
            img = img[0]
        }
        var canvas = document.getElementById("canvas_" + id);
        context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        detector = new AR.Detector();
        posit = new POS.Posit(modelSize, canvas.width);


        self.data.output1 = '#output1_' + id
        self.data.output2 = '#output2_' + id
        self.data.output3 = $('#output3_' + id);
        console.debug(self.data.output1)
        //var pic = document.getElementById("pic");
        //context.drawImage(pic, 0, 0, pic.width, pic.height);


        self.data.imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        self.detect();
    }

    p.make3d = function make3d(renderCanvas3dId) {
        var canvas = document.getElementById(renderCanvas3dId);

        self.data.br = new BabyRend()
        var config = {}
        config.canvasId = renderCanvas3dId
        self.data.br.init(config);
        self.data.br.setupStage();


        var cfg = {};
        //cfg.markerPxWidth = self.data.markerPxWidth
        cfg.markerPxWidth = self.data.markerPxWidth
        cfg.distFromCamera = self.data.distFromCamers
        cfg.markerSize = self.data.markerSize
        cfg.ypr = self.data.ypr;
        self.data.br.showAruco(cfg )
        //window.br.reloadSimpleMode(old);

        return;

        context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        detector = new AR.Detector();
        posit = new POS.Posit(modelSize, canvas.width);


        self.data.output1 = '#output1_' + id
        self.data.output2 = '#output2_' + id


        console.debug(self.data.output1)
        //var pic = document.getElementById("pic");
        //context.drawImage(pic, 0, 0, pic.width, pic.height);


        self.data.imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        self.detect();
    }


    p.detect = function detect(markersPre) {

        /*if  ( markersPre ) {
            markers = markersPre
            self.data.markers = markers;
            if (self.data.markers.length > 0) {
                self.utils.sizeInPixels(markers[0])
            }
            return;
        } else {*/
            var markers = detector.detect(self.data.imageData);
            self.drawCorners(markers);
      /*  }*/
        console.log('markers', markers)
        self.data.markers = markers;


        updateScenes(markers);
        if (self.data.markers.length > 0) {
            self.utils.sizeInPixels(markers[0])
        }

        function updateScenes(markers) {
            var corners, corner, pose, i;

            if (markers.length > 0) {
                corners = markers[0].corners;

                for (i = 0; i < corners.length; ++i) {
                    corner = corners[i];

                    corner.x = corner.x - (canvas.width / 2);
                    corner.y = (canvas.height / 2) - corner.y;
                }

                pose = posit.pose(corners); //get the pose

                updateObject(plane1, pose.bestRotation, pose.bestTranslation);
                updateObject(plane2, pose.alternativeRotation, pose.alternativeTranslation);
                updateObject(model, pose.bestRotation, pose.bestTranslation);

                //debugger
                updatePose($(self.data.output1)[0], pose.bestError, pose.bestRotation, pose.bestTranslation);
                updatePose($(self.data.output2)[0], pose.alternativeError, pose.alternativeRotation, pose.alternativeTranslation);

                return;
                step += 0.025;

                model.rotation.z -= step;
            }

            //texture.children[0].material.map.needsUpdate = true;
        };

        function updateObject(object, rotation, translation) {
            return;
            object.scale.x = modelSize;
            object.scale.y = modelSize;
            object.scale.z = modelSize;

            object.rotation.x = -Math.asin(-rotation[1][2]);
            object.rotation.y = -Math.atan2(rotation[0][2], rotation[2][2]);
            object.rotation.z = Math.atan2(rotation[1][0], rotation[1][1]);

            object.position.x = translation[0];
            object.position.y = translation[1];
            object.position.z = -translation[2];
        };

        function updatePose(id, error, rotation, translation) {
            var yaw = -Math.atan2(rotation[0][2], rotation[2][2]);
            var pitch = -Math.asin(-rotation[1][2]);
            var roll = Math.atan2(rotation[1][0], rotation[1][1]);
            //debugger
            //var d = document.getElementById(id);
            //d

            /*var dist = window.utils.distance(window.dbg.corners[0],
             window.dbg.corners[1])
             console.log('dist', dist)*/


            self.data.xyz = [(translation[0] | 0), (translation[1] | 0), (translation[2] | 0)]
            self.data.ypr = [Math.round(-yaw * 180.0 / Math.PI),
                Math.round(-pitch * 180.0 / Math.PI),
                Math.round(roll * 180.0 / Math.PI)]
            id.innerHTML = " error: " + error
                + "<br/>"
                + [(translation[0] | 0), (translation[1] | 0), (translation[2] | 0)].join(',')
                + "<br/>"
                + " ypr: " + [Math.round(-yaw * 180.0 / Math.PI),
                    Math.round(-pitch * 180.0 / Math.PI),
                    Math.round(roll * 180.0 / Math.PI)].join(',');
        };
    }

    p.drawCorners = function drawCorners(markers) {
        var corners, corner, i, j;

        context.lineWidth = 3;

        console.log(context, 'ok', markers.length)
        for (i = 0; i < markers.length; ++i) {
            corners = markers[i].corners;

            context.strokeStyle = "red";
            context.beginPath();

            for (j = 0; j < corners.length; ++j) {
                corner = corners[j];
                context.moveTo(corner.x, corner.y);
                corner = corners[(j + 1) % corners.length];
                context.lineTo(corner.x, corner.y);
            }

            context.stroke();
            context.closePath();

            context.strokeStyle = "green";
            context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
        }
    };

    p.test = function test(config) {
    }


    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.getFilePath = function getFilePath(file) {
            var file = self.settings.dir + '/' + file;
            return file;
        }

        utils.sizeInPixels = function sizeInPixels(marker) {
            //debugger
            self.data.markerPxWidth = self.utils.distance(marker.corners[0], marker.corners[1]);
            self.data.markerSize = 0;
            self.data.markerSizes = {};
            self.data.markerSizes[15] = {size: 4};
            self.data.markerSizes[33] = {size: 1};
            var sizeOfMarker = self.data.markerSizes[marker.id]
            if (sizeOfMarker) {
                self.data.markerSize = sizeOfMarker.size;

                var inchToPx = 0;
                var pxIn1Inch = self.data.markerPxWidth / self.data.markerSize

                console.log('pxIn1Inch', pxIn1Inch, self.data.markerPxWidth, self.data.markerSize)
                //  self.data.markerDockSize =
                self.data.output3.append('px: ' + self.utils.toNum(pxIn1Inch))
                self.data.output3.append('<br />')
                self.data.output3.append('size: ' + self.data.markerPxWidth)
                self.data.output3.append('<br />')
                // self.data.y = [ (translation[0] | 0), (translation[1] | 0), (translation[2] | 0)]
                var distFromCamers = self.utils.scaleXYZ(pxIn1Inch, self.data.xyz)
                //distFromCamers[1] -= (240 / 2) / pxIn1Inch
                self.data.output3.append('c: ' + JSON.stringify(distFromCamers))
                console.log('distFromCamers', self.data.xyz)
                console.log('distFromCamers', distFromCamers)

                self.data.distFromCamers = distFromCamers;

            }

        }

        utils.distance = function distance(pt1, pt2) {
            var distance = 0;
            var distance = Math.sqrt((Math.pow(pt1.x - pt2.x, 2)) + (Math.pow(pt1.y - pt2.y, 2)))
            return distance;
        }
        utils.scaleXYZ = function scaleXYZ(scale, xyz) {
            var xyz2 = [];
            $.each(xyz, function x(k, v) {
                xyz2[k] = parseFloat(utils.toNum(v / scale))
            })
            return xyz2
        }
        utils.toNum = function toNum(num, pt2) {
            return num.toFixed(2)
        }

        p.proc = function debugLogger() {
            if (self.silent == true) {
                return;
            }
            sh.sLog(arguments);
        };
    }

    defineUtils()
}

if (typeof window == 'undefined ') {
    exports.ArucoMarker = ArucoMarker;

    if (module.parent == null) {
        var instance = new ArucoMarker();
        var config = {};
        instance.init(config)
        instance.test();
    }
}
