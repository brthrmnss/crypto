

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

window.b = BabyLib;
window.bl = BabyLib
window.BL = BabyLib


BabyLib.items = [];

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



