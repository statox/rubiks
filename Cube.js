function Cube() {
    this.faceW = new Face("white");
    this.faceG = new Face("green");
    this.faceY = new Face("yellow");
    this.faceB = new Face("blue");
    this.faceR = new Face("red");
    this.faceO = new Face("orange");

    this.faceW.above = this.faceR;
    this.faceW.under = this.faceO;
    this.faceW.right = this.faceG;
    this.faceW.left  = this.faceB;
    this.faceW.opposite = this.faceY;

    this.faceG.above = this.faceR;
    this.faceG.under = this.faceO;
    this.faceG.right = this.faceY;
    this.faceG.left  = this.faceW;
    this.faceG.opposite = this.faceB;

    this.faceY.above = this.faceR;
    this.faceY.under = this.faceO;
    this.faceY.right = this.faceB;
    this.faceY.left  = this.faceG;
    this.faceY.opposite = this.faceW;

    this.faceB.above = this.faceR;
    this.faceB.under = this.faceO;
    this.faceB.right = this.faceW;
    this.faceB.left  = this.faceY;
    this.faceB.opposite = this.faceG;

    this.faceR.above = this.faceY;
    this.faceR.under = this.faceW;
    this.faceR.right = this.faceG;
    this.faceR.left  = this.faceB;
    this.faceR.opposite = this.faceO;

    this.faceO.above = this.faceW;
    this.faceO.under = this.faceY;
    this.faceO.right = this.faceG;
    this.faceO.left  = this.faceB;
    this.faceO.opposite = this.faceR;
}

Cube.prototype.show = function(currentFace) {
    var x = 300;
    var y = 300;
    //this.faceW.show(x, y, true);
    //this.faceB.show(x, y, true);
    currentFace.show(x, y, true);
    y -= 6 * this.faceW.s;
    //this.faceY.show(x, y, false);
    //this.faceG.show(x, y, false);
    currentFace.opposite.show(x, y, false);
}

Cube.prototype.show3D = function(currentFace) {
    var size = currentFace.s;

    //push();
    currentFace.show3D();

    rotateY(-PI/2);
    translate(- 2.5 * size, 0, size/2);
    currentFace.left.show3D();

    rotateY(-PI/2);
    translate(- 2.5 * size, 0, size/2);
    currentFace.opposite.show3D();

    rotateY(-PI/2);
    translate(- 2.5 * size, 0, size/2);
    currentFace.right.show3D();

    rotateY(-PI/2);
    translate(- 2.5 * size, 0, size/2);
    rotateX(PI/2);
    translate(0, - 2.5 * size, size/2);
    currentFace.above.show3D();

    translate(0, 0, - 3 * size);
    currentFace.under.show3D();

    //pop();
}
