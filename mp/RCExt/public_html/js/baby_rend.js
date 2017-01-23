//console.log('boo..x.')

function BabyRend() {
    var self = this;
    var p = self;

    self.data = {};
    self.data.x = {}; //copied
    p.init  = function init() {
        window.b = self;
    }

    p.setupStage = function setupStage() {

        // get the canvas DOM element
        var canvas = document.getElementById('renderCanvas');

        self.data.x.canvas = canvas;

        // load the 3D engine
        var engine = new BABYLON.Engine(canvas, true);
        self.data.x.engine = engine;
        // createScene function that creates and return the scene

        // call the createScene function
        var scene = self.createScene();

        // run the render loop
        engine.runRenderLoop(function onEngineRenderLoop(){
            scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', function onResizeHandler(){
            engine.resize();
        });
    }

    p.createScene = function createScene() {
        var canvas = self.data.x.canvas;

        // create a basic BJS Scene object
        var scene = new BABYLON.Scene(self.data.x.engine);
        self.data.x.scene = scene;
        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);
        self.data.x.camera = camera;
        // target the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // attach the camera to the canvas
        camera.attachControl(canvas, false);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
        self.data.x.light = light;
        // create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, scene
        var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);
        self.data.x.sphere = sphere;
        // move the sphere upward 1/2 of its height
        sphere.position.y = 1;

        // create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
        var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);

        console.log('pick', self.data.x.scene.pick)
        self.reloadInit();

        // return the created scene
        return scene;
    }

    p.reloadBabyRend = function reloadBabyRend(old) {
        self.data.x = old.data.x;
        self.init();
        old.destroyBabyRend();
        self.reloadInit();
    }
    p.destroyBabyRend = function destroyBabyRend() {

        self.data.active = false;
    }


    p.reloadInit = function reloadInit() {
        console.log('reloading....')
        console.log(self.data.x.sphere.position.y)
        self.data.x.sphere.position.y = 1.1
    }
}





if ( window.b != null ) {
    var old = window.b;
    window.b = new BabyRend()
    window.b.reloadBabyRend(old);
}