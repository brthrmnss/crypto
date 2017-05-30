 
BabyLib.defineExtras = function defineExtras() {
    b.create2   = function square(size,h,d, name) {
    }

    //http://www.babylonjs-playground.com/#VYM1E#5
    b.drawAxis = function drawAxis(nudge) {
        // world axis visualization
        var size = 10;
        var worldOrigin = BABYLON.Vector3.Zero();
        var xAxis = BABYLON.Mesh.CreateLines("x", [worldOrigin, (BABYLON.Axis.X).scale(size)], scene);
        var yAxis = BABYLON.Mesh.CreateLines("y", [worldOrigin, (BABYLON.Axis.Y).scale(size)], scene);
        var zAxis = BABYLON.Mesh.CreateLines("z", [worldOrigin, (BABYLON.Axis.Z).scale(size)], scene);
        xAxis.color = BABYLON.Color3.Red();
        yAxis.color = BABYLON.Color3.Green();
        zAxis.color = BABYLON.Color3.Blue();
    }

    b.pointAtCircleB = function pointAtCircleB() {
        //http://www.babylonjs-playground.com/#VYM1E#5
        var sphere1 = BABYLON.Mesh.CreateSphere("sphere1", 10, 3, scene);
        sphere1.material = new BABYLON.StandardMaterial("mat1", scene);
        sphere1.material.diffuseColor = BABYLON.Color3.Red();
        sphere1.position = new BABYLON.Vector3(10, 10, 5);

        var sphere2 = BABYLON.Mesh.CreateSphere("sphere2", 10, 3, scene);
        sphere2.material = new BABYLON.StandardMaterial("mat2", scene);
        sphere2.material.diffuseColor = BABYLON.Color3.Green();
        sphere2.position = new BABYLON.Vector3(-10, -10, -5);

        var axis1, axis2, axis3;

        scene.registerBeforeRender(function() {
            axis1 = (sphere1.position).subtract(sphere2.position);
            axis2 = camera.position;
            axis3 = BABYLON.Vector3.Cross(axis2, axis1);
            mesh.rotation = BABYLON.Vector3.RotationFromAxis(axis1, axis2, axis3);
            mesh.scaling.x = axis1.length();
            mesh.position = ((sphere2.position).add(sphere1.position)).scale(0.5);
            pl.position = camera.position;
        });
    }

}
BabyLib.defineExtras()

BabyLib.defineOrbiting = function defineOrbiting() {
    //http://www.html5gamedevs.com/topic/7104-rotate-a-mesh-about-a-given-axis/
    //http://www.babylonjs-playground.com/#1UR1XA#0
    b.create2   = function square(size,h,d, name) {
    }



    b.rotateObjects = function rotateObjects() {

        var newPoint = r_y(sphere.position, 1 * Math.PI / 180., { x: 0, y: 0, z: 0 });

        sphere.position.x = newPoint.x;
        sphere.position.y = newPoint.y;
        sphere.position.z = newPoint.z;

        newPoint = r_z(box.position, 1 * Math.PI / 180., { x: 2, y: 0, z: 2 });

        box.position.x = newPoint.x;
        box.position.y = newPoint.y;
        box.position.z = newPoint.z;

    };


    function def(a, d) {
        if (a != undefined && a != null) return (d != undefined && d != null ? a : true);
        else
        if (d != _null)
            return (d != undefined && d != null ? d : false);
        return null;
    }

    function rotate_xy(pr1, pr2, alpha) {
        pp2 = { x: pr2.x - pr1.x, y: pr2.y - pr1.y };

        return {
            x: pr1.x + pp2.x * Math.cos(alpha) - pp2.y * Math.sin(alpha),
            y: pr1.y + pp2.x * Math.sin(alpha) + pp2.y * Math.cos(alpha)
        };
    }

    function r_y(n, a, c) {

        c = def(c, { x: 0, y: 0, z: 0 });
        var c1 = { x: c.x, y: c.y, z: c.z };
        c1.x = c1.x;
        c1.y = c1.z;

        var p = rotate_xy(c1, { x: n.x, y: n.z }, a);

        n.x = p.x;
        n.z = p.y;

        return n;

    }

    function r_x(n, a, c) {

        c = def(c, { x: 0, y: 0, z: 0 });
        var c1 = { x: c.x, y: c.y, z: c.z };
        c1.x = c1.y;
        c1.y = c1.z;

        var p = rotate_xy(c1, { x: n.y, y: n.z }, a);

        n.y = p.x;
        n.z = p.y;

        return n;

    }

    function r_z(n, a, c) {

        c = def(c, { x: 0, y: 0, z: 0 });
        var c1 = { x: c.x, y: c.y, z: c.z };
        var p = rotate_xy(c1, { x: n.x, y: n.y }, a);

        n.x = p.x;
        n.y = p.y;

        return n;

    }

    b.zrrr = function up(nudge) {
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

}
BabyLib.defineOrbiting()
