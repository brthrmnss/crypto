function Cloth() {
    var p = Cloth.prototype;
    p = this;
    var self = this;

    self.settings = {};
    self.data = {}

    p.init = function init(config, scene) {
        // self.settings = sh.dv(config, {});
        // config = self.settings;
        self.data.scene = scene;
        self.initMaterials();
        self.data.contactPoints = [];
        //  self.method();
    }

    p.initMaterials = function initMaterials()
    {
        var clothMat = new BABYLON.StandardMaterial("texture3", self.data.scene);
        clothMat.diffuseTexture = new BABYLON.Texture("./assets/cloth-diffuse.jpg", self.data.scene);
        clothMat.bumpTexture = new BABYLON.Texture("./assets/cloth-bump.jpg", self.data.scene);
        clothMat.backFaceCulling = false;
        clothMat.zOffset = -20;
        self.data.material = clothMat;

        var matForMounted = new BABYLON.StandardMaterial("firsts", self.data.scene);
        matForMounted.diffuseColor = BABYLON.Color3.Blue();

        self.data.matForMounted = matForMounted;
    }


    p.initCloth = function initCloth(subdivisions, size, position, rotation) {
        if (self.data.cloth) {
            self.data.cloth.dispose();
        }

        self.data.size = size;
        self.data.subdivisions = subdivisions;
        self.data.distanceBetweenPoints = size / subdivisions;

        self.data.cloth = BABYLON.Mesh.CreateGround("cloth",
            self.data.size, self.data.size, self.data.subdivisions - 1, self.data.scene, true);
        self.data.cloth.material = self.data.material;
        self.data.cloth.position = position || BABYLON.Vector3.Zero();
        self.data.cloth.rotation = rotation || BABYLON.Vector3.Zero();
        self.data.cloth.computeWorldMatrix(true);
    }


    p.initPhysics = function initPhysics(mountedRows, particleMass, elasticFactor, friction) {
        self.data.contactPoints.forEach(function (c) {
            c.dispose();
        });
        var dbg = false;
        self.data.contactPoints = [];
        var positions = self.data.cloth.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        window.positions = positions;
        //modify positions hereTPDP
        var row = -1;
        for (var i = 0; i < positions.length; i = i + 3) {
            var idx = i / 3;
            var positionInRow = idx % self.data.subdivisions;
            if (!positionInRow) {
                row++;
            }
            //TOD: where is the 2nd row?
            var mountedRow = mountedRows.indexOf(row) > -1

            var v = BABYLON.Vector3.FromArray(positions, i);

            var s = BABYLON.MeshBuilder.CreateSphere("s" + i, {diameter: 0.4}, self.data.scene);
            BABYLON.Vector3.TransformCoordinatesToRef(v, self.data.cloth.getWorldMatrix(), s.position);
            if (mountedRow) {
                s.material = self.data.matForMounted;
            }
            self.data.contactPoints.push(s);

            window.s2 = s;
            function f(o) {
                return o.toFixed(1)
            }

            //create the impostors
            var mass = mountedRow ? 0 : particleMass || 1;

            if (dbg) {
                console.log('boo', i, row, '\t', f(s.position.x), f(s.position.y), f(s.position.z), mountedRow, mass)
            }

            if (row == 6) {
                //mass = 0 ;
            }


            s.physicsImpostor = new BABYLON.PhysicsImpostor(s, BABYLON.PhysicsImpostor.ParticleImpostor, {
                mass: mass,
                friction: friction || 0.2
            }, self.data.scene);
            if (row > 0) {
                if (dbg) {
                    console.error('iii', row)
                }
                self.utils.createJoint(s.physicsImpostor, self.data.contactPoints[idx - self.data.subdivisions].physicsImpostor, elasticFactor);
            }
            if (positionInRow) {
                if (dbg) {
                    console.error('positionInRow', positionInRow)
                }
                self.utils.createJoint(s.physicsImpostor, self.data.contactPoints[idx - 1].physicsImpostor, 0);
            }
        }

        var invMat = self.data.cloth.getWorldMatrix().clone().invert();
        var tmpVec = BABYLON.Vector3.Zero();
        var that = this;
        var that = self;
        self.data.cloth.registerBeforeRender(function onRegisterPsoitions () {
            var positions = [];
            self.data.contactPoints.forEach(function (c) {
                BABYLON.Vector3.TransformCoordinatesToRef(c.position, invMat, tmpVec);
                positions.push(tmpVec.x, tmpVec.y, tmpVec.z);
            });
            that.data.cloth.updateVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
            that.data.cloth.refreshBoundingInfo();
        })
    }

    p.method = function method() {
    }

    p.test = function test(config) {
    }


    function defineUtils() {
        var utils = {};
        p.utils = utils;
        utils.getFilePath = function getFilePath(file) {
            var file = self.settings.dir + '/' + file;
            return file;
        }
        p.setVisibility = function setContactPointVisibility(visible) {
            self.data.contactPoints.forEach(function setPointVisiblity(c) {
                c.isVisible = visible;
            });
        }

        utils.createJoint = function createJoint(imp1, imp2, elasticFactor) {
            var joint = new BABYLON.DistanceJoint({
                maxDistance: this.distanceBetweenPoints + elasticFactor || 0
            })
            imp1.addJoint(imp2, joint);
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
/*

 exports.BasicClass3 = BasicClass3;

 if (module.parent == null) {
 var instance = new BasicClass3();
 var config = {};
 instance.init(config)
 instance.test();
 }

 */



var CreateClothScene = function () {
   // debugger
    var scene = new BABYLON.Scene(engine);
    scene.enablePhysics();
    window.scene = scene;

    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 6, 1.3, 30, new BABYLON.Vector3(0, -5, 0), scene);
    camera.attachControl(canvas);
    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
    light.groundColor = new BABYLON.Color3(.5, .5, .5);

    var clothSimulator = new Cloth(scene);
    clothSimulator.init({},scene)
    clothSimulator.setVisibility(false);

    var params = {
        size: 16,
        subdivisions: 16,
        firstMount: 0,
        secondMount: 15,
        stretchFactor: 0.5,
        particleWeight: 1,
        particleFriction: 0.2,
        particlesVisible: false
    }


    //params.size = 12
    //params.subdivisions = 12
    /*
     var params = {
     size: 30,
     subdivisions: 30,
     firstMount: 0,
     secondMount: 15,
     stretchFactor: 0.5,
     particleWeight: 1,
     particleFriction: 0.2,
     particlesVisible: false
     }
     */

    var sceneParams = {
        movingSphere: true,
        sphereFriction: 0.5,
        throwSphere: function () {
            var newSphere = BABYLON.MeshBuilder.CreateSphere("thrown", {diameter: 3, segments: 16}, scene);
            newSphere.position.y = 5;
            newSphere.physicsImpostor = new BABYLON.PhysicsImpostor(newSphere, BABYLON.PhysicsImpostor.SphereImpostor, {
                mass: 2,
                friction: sceneParams.sphereFriction
            }, scene);

        }
    }

    function updateCloth() {
        console.log(params);
        clothSimulator.initCloth(params.subdivisions, params.size);
        clothSimulator.initPhysics([params.firstMount, params.secondMount], params.particleWeight, params.stretchFactor, params.particleFriction);
        clothSimulator.setVisibility(params.particlesVisible);
    }

    var movingSphere;

    function movingSphereToggle(display) {
        if (!display && movingSphere) {
            movingSphere.dispose();
            return;
        } else if (display) {
            movingSphere = BABYLON.MeshBuilder.CreateSphere("bigSphere", {diameter: 5, segments: 16}, scene);
            movingSphere.position.y = -7;
            movingSphere.physicsImpostor = new BABYLON.PhysicsImpostor(movingSphere, BABYLON.PhysicsImpostor.SphereImpostor, {
                mass: 0,
                friction: sceneParams.sphereFriction
            }, scene);
            var t = 0;
            movingSphere.registerBeforeRender(function () {
                t = t + 0.01;
                movingSphere.position.z = Math.sin(t) * 10
            })
        }
    }

    updateCloth();
    movingSphereToggle(true);

    var gui = new dat.GUI();
    var meshGui = gui.addFolder('Cloth');
    meshGui.open();
    meshGui.add(params, 'size', 2, 20).step(1).onFinishChange(updateCloth);
    meshGui.add(params, 'subdivisions', 2, 20).step(1).onFinishChange(updateCloth);
    var physicsGui = gui.addFolder('Physics');
    physicsGui.add(params, 'stretchFactor', 0, 1).step(0.1).onFinishChange(updateCloth);
    physicsGui.add(params, 'particleWeight', 0.1, 2).step(0.1).onFinishChange(updateCloth);
    physicsGui.add(params, 'particleFriction', 0, 1).step(0.1).onFinishChange(updateCloth);
    physicsGui.add(params, 'firstMount', -1, 20).step(1).onFinishChange(updateCloth);
    physicsGui.add(params, 'secondMount', -1, 20).step(1).onFinishChange(updateCloth);
    physicsGui.open();
    var materialGui = gui.addFolder('Materials');
    materialGui.add(clothSimulator.data.material, "wireframe")
    materialGui.add(params, 'particlesVisible').onFinishChange(function (value) {
        clothSimulator.setVisibility(value);
    });
    materialGui.open();
    var sceneGui = gui.addFolder('Scene');
    sceneGui.add(sceneParams, 'movingSphere').onFinishChange(movingSphereToggle);
    sceneGui.add(sceneParams, 'throwSphere');
    sceneGui.open();


    window.clothSimulator = clothSimulator;
    // clothSimulator.material = null;
    function changeLater() {
        window.clothSimulator.data.cloth.material.wireframe = true
      //  clothSimulator.setVisibility(true);
    }

    setTimeout(changeLater, 200)


    return scene;
}