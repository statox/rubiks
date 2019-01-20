var cube;
var currentFace;

var angleY = 0;
var angleX = 0;

var pg;

// Inputs
var buttonClockwise;
var buttonCounterClockwise;
var selectFace;
var selectCol;
var buttonTranslateUp;
var buttonTranslateDown;

function setup() {
    createCanvas(600, 600, WEBGL);
    //rectMode(CENTER);

    pg = createGraphics(30, 30);
    pg.textSize(15);

    cube = new Cube();

    currentFace = cube.faceW;

    selectFace = createSelect();
    selectFace.position(10, 10);
    selectFace.option('White');
    selectFace.option('Green');
    selectFace.option('Yellow');
    selectFace.option('Blue');
    selectFace.option('Red');
    selectFace.option('Orange');
    selectFace.changed(changeCurrentFace);

    buttonClockwise = createButton('clockwise');
    buttonClockwise.position(80, 10);
    buttonClockwise.mousePressed(rotateClockwise);

    buttonCounterClockwise = createButton('counter clockwise');
    buttonCounterClockwise.position(170, 10);
    buttonCounterClockwise.mousePressed(rotateCounterClockwise);

    selectCol = createSelect();
    selectCol.position(10, 30);
    selectCol.option(1);
    selectCol.option(3);

    buttonTranslateUp = createButton('Up');
    buttonTranslateUp.position(80, 30);
    buttonTranslateUp.mousePressed(translateColUp);

    buttonTranslateDown = createButton('Down');
    buttonTranslateDown.position(170, 30);
    buttonTranslateDown.mousePressed(translateColDown);
}

function rotateClockwise() {
    currentFace.rotate(true);
}
function rotateCounterClockwise() {
    currentFace.rotate(false);
}
function translateColUp() {
    currentFace.translateCol("UP", selectCol.value() - 1)
}
function translateColDown() {
    currentFace.translateCol("DOWN", selectCol.value() - 1)
}

function changeCurrentFace() {
    switch(selectFace.value()) {
        case 'White':
            currentFace = cube.faceW;
            break;
        case 'Green':
            currentFace = cube.faceG;
            break;
        case 'Yellow':
            currentFace = cube.faceY;
            break;
        case 'Blue':
            currentFace = cube.faceB;
            break;
        case 'Red':
            currentFace = cube.faceR;
            break;
        case 'Orange':
            currentFace = cube.faceO;
            break;
    }
}

function draw() {
    background(100, 100, 100);
    frameRate(15)

    //angleY = map(mouseX, 0, 600, -2 * PI, 2 * PI);
    //angleX = map(mouseY, 0, 600, -2 * PI, 2 * PI);

    //angleY += radians(5)
    //angleX += radians(5)

    rotateWithKeyboard();

    //push()
    translate(-30, -30, 30);
    cube.show3D(currentFace);
    //pop()
}

function rotateWithKeyboard() {
    switch(keyCode) {
        case LEFT_ARROW:
            angleY -= radians(5);
            break;
        case RIGHT_ARROW:
            angleY += radians(5);
            break;
        case UP_ARROW:
            angleX += radians(5);
            break;
        case DOWN_ARROW:
            angleX -= radians(5);
            break;
        case " ":
            angleX = angleX;
            angleY = angleY;
    }

    rotateY(angleY);
    rotateX(angleX);
}
