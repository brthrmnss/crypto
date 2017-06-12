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
        self.data.engine = engine;
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
        BabyLib.camera = camera;



        this._camera = self.data.x.camera;
        //var blurH = new BABYLON.BlurPostProcess("blurH", new BABYLON.Vector2(1, 0), 2, 0.5, this._camera);
        //var blurV = new BABYLON.BlurPostProcess("blurV", new BABYLON.Vector2(0, 1), 4, 0.5, this._camera);
        //var bw = new BABYLON.BlackAndWhitePostProcess("bw", 1.0, this._camera);


        //var postProcess = new BABYLON.FxaaPostProcess("fxaa", 1.0, null, null, self.data.engine, true);


        var engine = self.data.engine;

        //var postProcess = new BABYLON.BlackAndWhitePostProcess("bandw", 1.0, this._camera); //, null, engine, true);

        var sepiaKernelMatrix = BABYLON.Matrix.FromValues(
            0.393, 0.349, 0.272, 0,
            0.769, 0.686, 0.534, 0,
            0.189, 0.168, 0.131, 0, 
            0, 0, 0, 0
        );
      //  var postProcess = new BABYLON.ConvolutionPostProcess("Sepia", sepiaKernelMatrix, 1.0,  this._camera, null, null, true);
        //var postProcess = new BABYLON.FxaaPostProcess("fxaa", 1.0, this._camera, null, self.data.engine, true);

       // var postProcess = new BABYLON.ColorCorrectionPostProcess("color_correction",
      //      "./js/color_correction_poisterize.png", 1.0,  this._camera, null, engine, true);
       // var postProcess = new BABYLON.ColorCorrectionPostProcess("color_correction",
        //    "./js/color_correction_inverted.png", 1.0,  this._camera, null, engine, true);

        //var postProcess = new BABYLON.PostProcess("Down sample", "XShader.txt", ["screenSize", "highlightThreshold"], null, 0.25, null, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, true);
       // console.error('...')


        //http://localhost:6015/Scenes/Customs/postprocesses/compose.fragment.fx

        function setupFrax() {
            
            
            
            var blurWidth = 1.0;

            var postProcess0 = new BABYLON.PassPostProcess("Scene copy", 1.0, camera);
            var postProcess1 = new BABYLON.PostProcess("Down sample", "XShader.txt", ["screenSize", "highlightThreshold"], null, 0.25, camera, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
            postProcess1.onApply = function (effect) {
                effect.setFloat2("screenSize", postProcess1.width, postProcess1.height);
                effect.setFloat("highlightThreshold", 0.90);
            };
            var postProcess2 = new BABYLON.BlurPostProcess("Horizontal blur", new BABYLON.Vector2(1.0, 0), blurWidth, 0.25, camera);
            var postProcess3 = new BABYLON.BlurPostProcess("Vertical blur", new BABYLON.Vector2(0, 1.0), blurWidth, 0.25, camera);
            var postProcess4 = new BABYLON.PostProcess("Final compose", "postprocesses/compose", ["sceneIntensity", "glowIntensity", "highlightIntensity"], ["sceneSampler"], 1, camera);
            postProcess4.onApply = function (effect) {
                effect.setTextureFromPostProcess("sceneSampler", postProcess0);
                effect.setFloat("sceneIntensity", 0.5);
                effect.setFloat("glowIntensity", 0.4);
                effect.setFloat("highlightIntensity", 1.0);
            };
        }

        //setupFrax();

        function setupFrax2() {

            var blurWidth = 1.0;

            var postProcess0 = new BABYLON.PassPostProcess("Scene copy", 1.0, camera);
            /*
            var postProcess1 = new BABYLON.PostProcess("Down sample", "XShader.txt", ["screenSize", "highlightThreshold"], null, 0.25, camera, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
            postProcess1.onApply = function (effect) {
                effect.setFloat2("screenSize", postProcess1.width, postProcess1.height);
                effect.setFloat("highlightThreshold", 0.90);
            };
            var postProcess2 = new BABYLON.BlurPostProcess("Horizontal blur", new BABYLON.Vector2(1.0, 0), blurWidth, 0.25, camera);
            var postProcess3 = new BABYLON.BlurPostProcess("Vertical blur", new BABYLON.Vector2(0, 1.0), blurWidth, 0.25, camera);
            */
            var postProcess4 = new BABYLON.PostProcess("Final compose", "postprocesses/compose2", ["sceneIntensity", "glowIntensity", "highlightIntensity"], ["sceneSampler"], 1, camera);
            postProcess4.onApply = function (effect) {
                effect.setTextureFromPostProcess("sceneSampler", postProcess0);
                effect.setFloat("sceneIntensity", 0.5);
                effect.setFloat("glowIntensity", 0.4);
                effect.setFloat("highlightIntensity", 1.0);
            };
        }

        setupFrax2();


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

        BabyLib.reloadLib();
        BabyLib.items = [];
        //BabyLib
        b.scene = scene;

        b.create.square(1)
        b.mat.createMaterial()
        b.pos(2, 0, 0)

        //self.testBasicGeom()


        //b.layout.putItemsInACircle();
        // b.layout.putItemsInACircle(null, null, 'xz');

        // b.layout.putItemsInASquare2();
        //b.layout.putItemsInASquare(null, null, 'xz');

        //b.layout.makeTileMosaic();

        self.cursorModeTest();

        function zY() {
            // return;
            //BabyLib.zoomFront(self.data.x.camera)

            BabyLib.zoomToFit(self.data.x.camera)
            // BabyLib.zoomTop(self.data.x.camera )
            // BabyLib.zoomTop(self.data.x.camera)
            //BabyLib.zoomToFit(self.data.x.camera, 10)
        }
        setTimeout(zY, 500)
        setTimeout(zY, 1500)




        // return the created scene 
        return scene;
    }

    p.testBasicGeom = function testBasicGeom() {

        /*
         b.create.square(16)
         b.mat.createMaterial('red')
         b.pos(position)*/


        b.scene = scene;
        b.create.square(5)
        b.mat.createMaterial()

        b.pos(0, 0, 1)


        b.scene = scene;
        b.create.square(2)
        b.mat.createMaterial()

        b.pos(5, 1, 0)

        b.scene = scene;
        b.create.square(2)
        b.mat.createMaterial()

        b.pos(-8, 1, 0)
    }
    //basicGeom();

    p.testMesh = function testMesh() {
        b.loadMesh('bane', '../data/', 'landlord.obj')
        b.loadMesh('bane2', '../data/', 'landlord.obj', function onMesh(m) {

                /// m.diffuseTexture = new BABYLON.Texture("../data/LandLord_diffuse.png", scene);
                //  m.material = new BABYLON.Texture("../data/LandLord_normal.png", scene);


                //http://www.babylonjs-playground.com/#EKFLA#13

                var url = '../data/LandLord_normal.png'
                var url = '../data/LandLord_diffuse.png'
                var materialSphere3 = new BABYLON.StandardMaterial("texture3", scene);
                materialSphere3.diffuseTexture = new BABYLON.Texture(url, scene);

                m.material = materialSphere3
                // .material = new BABYLON.StandardMaterial("texture1", scene);
                m.position.x += 10


                //b.rotateX(m)
                m.fxRotExt = function roateAboutY(m) {
                    //  asdf.g
                    b.rotateAboutY(m, Math.PI)
                }
                b.lookAt(m)


                //   b.rotateAboutY(m, Math.PI/2)
                // b.rotateAboutY(m, 0.5)
                //  b.rotateAboutY(m, 0.5)
                //b.rotateAboutY(m, Math.PI)

                // BabyLib.zoomTop( )
            }
        )

    }

    p.cursorModeTest = function cursorModeTest() {
        // return;
        // b.create.cube(5)
        //  b.create.cube(3,8,0.5)
        // b.create.cube(3,0.5,8)
        // return;
        //ad origin

        /*  b.setCursor(1,0,0);
         var width = 3+4+3
         b.create.cube(3,8,0.5)*/
       // b.setCursor(-3,0,0);
        b.setCursor(0,0,0);
        var width = 3+4+3
        var startingPanel = b.create.cube(3,8,0.5)

        //return;
        //return;
        // return;
        b.c.moveCloser(-0.5)
        b.c.right()
        b.create.cube(4,8,0.5);

        b.mat.makeColor('#f0f0f0')
        b.mat.makeColor('#ff0000')

        b.c.moveCloser(0.5)
        b.c.right()
        b.create.cube(3,8,0.5)


        b.c.up();
        b.c.setX(0);
        b.create.cube(1.8,3,0.5)
        b.c.leftAlign(b.last, startingPanel);

        b.c.moveCloser(0.1)
        b.c.right()
        b.create.cube(width-(2*1.8),3,0.5)
        b.mat.makeColor('#5C4033')

        b.c.moveCloser(-0.1)
        b.c.right()
        b.create.cube(1.8,3,0.5)

        b.clearCursor()
        return;

        b.c.right()
        b.create.cube(width-(2*1.8),4,0.5)
        b.c.right()
        b.create.cube(1.8,4,0.5)
        b.c.up();
        b.setX(0);
        b.create.cube(width,4,1)
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

        uiUtils.addBtn({text:'top'}, function onZoomTop() {
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

        if ( old )
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


