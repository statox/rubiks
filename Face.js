function Face(color) {
    this.values = [ [{"color": color, "id": "A"}, {"color": color, "id": "B"}, {"color": color, "id": "C"}], [{"color": color, "id": "D"}, {"color": color, "id": "E"}, {"color": color, "id": "F"}], [{"color": color, "id": "G"}, {"color": color, "id": "H"}, {"color": color, "id": "I"}]]
    this.right;
    this.left;
    this.above;
    this.under;
    this.opposite;
    this.s = 30;
}

Face.prototype.translateCol = function(direction, index) {
    console.log("transalteCol face", this.values[1][1].color, "col", index, "dir", direction);
    var faceToRotate = (index === 0 ? this.left : this.right);
    var clockWise = direction !== "UP"
    if (index === 2) {
        clockWise = !clockWise;
    }

    faceToRotate.rotate(clockWise);
}

Face.prototype.rotate = function(clockwise) {
    console.log("Turn face", this.values[1][1].color, (clockwise ? "clockwise" : "counter-clockwise"));
    var matrix = [];
    var newMatrix = [];

    for (var i=0; i<5; i++) {
        var line = [];
        var newMatrixLine = [];
        for (var j=0; j<5; j++) {
            line.push(undefined);
            newMatrixLine.push(undefined);
        }
        matrix.push(line);
        newMatrix.push(newMatrixLine);
    }

    // Create a matrice with the current face
    // and one line of the adjacent faces
    for (var i=0; i<3; i++) {
        // Add the bottom line of the face above
        //matrix[0][1+i] = this.above.values[i][2];
        matrix[0][1+i] = this.above.values[2][i];
        // Add the top of the under face
        //matrix[4][1+i] = this.under.values[i][0];
        matrix[4][1+i] = this.under.values[0][i];
        // Add the right of the left face
        //matrix[1+i][0] = this.left.values[2][i];
        matrix[1+i][0] = this.left.values[i][2];
        // Add the left of the right face
        //matrix[1+i][4] = this.right.values[0][i];
        matrix[1+i][4] = this.right.values[i][0];

        // Add the current face in the center
        for (var j=0; j<3; j++) {
            matrix[1+i][1+j] = this.values[j][i];
        }
    }
    console.log(matrix);

    // Rotate the original to newMatrix
    for (var y=0; y<matrix.length; y++) {
        for (var x=0; x<matrix[y].length; x++) {
            // Sens trigo
            if (clockwise) {
                newMatrix[y][matrix.length - 1 - x] = matrix[x][y];
            } else {
                newMatrix[matrix.length - 1 - y][x] = matrix[x][y];
            }
        }
    }
    console.log(newMatrix);

    // Put back the new matrix into the cube
    for (var i=0; i<3; i++) {
        // Add the bottom line of the face above
        this.above.values[i][2] = newMatrix[0][1+i] 
        // Add the top of the under face
        this.under.values[i][0] = newMatrix[4][1+i]
        // Add the right of the left face
        this.left.values[2][i] = newMatrix[1+i][0]
        // Add the left of the right face
        this.right.values[0][i] = newMatrix[1+i][4]

        // Add the current face in the center
        for (var j=0; j<3; j++) {
            this.values[j][i] = newMatrix[1+i][1+j]
        }
    }
}

Face.prototype.show = function(x, y, base) {
    for (var i=0; i<this.values.length; i++) {
        var line = this.values[i];

        // Draw the face
        for (var j=0; j<line.length; j++) {
            fill(color(this.values[i][j].color));
            var xscreen = x + (i * this.s);
            var yscreen = y + (j * this.s);
            rect(xscreen, yscreen, this.s, this.s);
            fill(50)
            text(this.values[i][j].id, xscreen + this.s/2, yscreen + this.s/2);
        }

        // Draw the other faces
        if (base) {
            this.above.show(x, y - 3 * this.s, false);
            this.under.show(x, y + 3 * this.s, false);

            this.left.show(x - 3 * this.s, y, false);
            this.right.show(x + 3 * this.s, y, false);
        }
    }
}

Face.prototype.show3D = function() {
    push();
    for (var y=0; y<this.values.length; y++) {
        var line = this.values[y];

        for(var x=0; x<line.length; x++) {
            pg.background(this.values[y][x].color);
            pg.text(this.values[y][x].id, 10, 10);
            texture(pg);
            plane(this.s);

            /*
             *fill(this.values[y][x].color);
             *plane(this.s);
             */
            translate(this.s, 0, 0)
        }
        translate(-line.length * this.s, this.s, 0)
    }
    pop();
}
