//console.log('boo..x.')



function BabyRend() {
    var self = this;
    var p = self;

    self.data = {};
    self.data.x = {}; //copied
    p.init  = function init() {
        window.br = self;
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

        self.createExtrasUI();

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

        //debugger;
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


        window.sss = sphere

        BabyLib.items = [];
        //BabyLib
        b.scene = scene;
        b.create.square(5)
        b.mat.createMaterial()

        b.pos(0,0,0)
/*
        b.create.square(16)
        b.mat.createMaterial('red')
        b.pos(position)*/
        

        b.scene = scene;
        b.create.square(5)
        b.mat.createMaterial()

        b.pos(0,0,1)


        b.scene = scene;
        b.create.square(2)
        b.mat.createMaterial()

        b.pos(5,1,0)

        b.scene = scene;
        b.create.square(2)
        b.mat.createMaterial()

        b.pos(-8,1,0)


        b.layout.putItemsInACircle();
        b.layout.putItemsInACircle(null, null, 'xz');


        b.layout.makeTileMosaic();
        
        setTimeout(function () {
            //return;
            BabyLib.zoomFront(self.data.x.camera)
           // BabyLib.zoomTop(self.data.x.camera)
            //BabyLib.zoomToFit(self.data.x.camera, 10)
        }, 500)

        // return the created scene 
        return scene;
    }


    p.createExtrasUI = function createExtrasIU() {
        var container = $('#boxStuff')
        container.html('')
        container.remove()

        /*
         uiUtils.makePanel({
         id:'boxStuff',
         newBaseContainer:true
         })
         */

        //var div = $('#divSaveArea');
        var div = uiUtils.addDiv('boxStuff').ui;
        div.css('top', '0px')
        div.css('left', '0px')
        $('body').append(div);
        uiUtils.addDefaultCfg( {addTo:div} );


        uiUtils.makeAbs(div)
        uiUtils.addBtn({text:'testOnOff'}, function onF() {
            console.log(
                'onF'
            )
        })

        uiUtils.addBtn({text:'t'}, function onZoomTop() {
            BabyLib.zoomTop(self.data.x.camera)
            return;
        })
        uiUtils.addBtn({text:'b'}, function onZoomFront() {
            BabyLib.zoomFront(self.data.x.camera)
            return;
        })

        uiUtils.addBtn({text:'zoomfit'}, function onF() {
            console.log(
                'onF'
            )

            BabyLib.zoomToFit(self.data.x.camera)
            return;
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
            self.data.x.camera.setTarget(position);


            var xDist = max.x - min.x

            self.data.x.camera.position = new BABYLON.Vector3(0, 10,-xDist*1.5);

        })

        // $('body')
    }

    p.dispose = function () {
        self.data.x.scene.dispose();
    }
    p.reloadSimpleMode =function  reloadSimpleMode(old) {
        //var old = window.br;

        old.dispose()

        //console.log(xBabyRend == BabyRend, xBabyRend)

        var br = new BabyRend();
        br.init();
        br.setupStage()
        window.br = br;

        //copy stuff
        //self.data.x = old.data.x;


    }
    p.reloadBabyRend = function reloadBabyRend(old) {
        self.data.x = old.data.x;
        self.init();
        old.destroyBabyRend();
        //self.reloadInit();

        window.br = new BabyRend()
        window.br.reloadBabyRend(old);

    }
    p.destroyBabyRend = function destroyBabyRend() {

        self.data.active = false;
        self.scene.dispose();
    }


    p.reloadInit = function reloadInit() { //test references
        console.log('reloading....')
        console.log(self.data.x.sphere.position.y)
        self.data.x.sphere.position.y = 2
    }
}


window.fullReload = function fullReload() {
    console.log('d')
    var old = window.br;
    window.br = new BabyRend()
    window.br.reloadSimpleMode(old);
}
if ( window.br != null ) {
    window.fullReload();
}


