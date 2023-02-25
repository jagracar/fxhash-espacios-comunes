
//
// This class represents the regions defined by a group of intersecting shapes
//
export class Regions {

    //
    // Initializes the class
    //
    constructor(nShapes, pg) {
        // Save the number of shapes and the graphics instance
        this.nShapes = nShapes;
        this.pg = pg;
    }

    //
    // Returns a reproductible random number
    //
    static randomNumber(value) {
        return Math.abs(Math.sin(100 * value) * 10000) % 1;
    }

    //
    // Returns true if the given position falls inside one of the shapes
    //
    // This method should be defined in the child classes
    //
    isInsideShape(x, y) {
        return false;
    }

    //
    // Returns the region identifier at the given position
    //
    // This method should be defined in the child classes
    //
    getRegion(x, y) {
        return 0;
    }

    //
    // Returns the region approximate position
    //
    // This method should be defined in the child classes
    //
    getApproximatePosition(x, y) {
        return [this.pg.width / 2, this.pg.height / 2];
    }

    //
    // Returns the random number of the region associated to the given
    // coordinates
    //
    getRandomNumber(x, y, offset = 0) {
        return Regions.randomNumber(this.getRegion(x, y) + offset);
    }

    //
    // Returns the random color of the region associated to the given
    // coordinates
    //
    getRandomColor(x, y, colors) {
        const index = Math.floor(
            colors.length * this.getRandomNumber(x, y, 123));

        return colors[index];
    }

    //
    // Returns the random noise value of the region associated to the given
    // coordinates
    //
    getRandomNoise(x, y, xResolution, yResolution) {
        const randomNumber = this.getRandomNumber(x, y, 456);

        return this.pg.noise(
            x * xResolution + 5000 * randomNumber, y * yResolution + 5000 * randomNumber);
    }
}


//
// This class represents the regions defined by a group of intersecting shapes
// of the same kind
//
export class SameShapeRegions extends Regions {

    //
    // Initializes the class
    //
    constructor(shapes, pg) {
        // Call the super class constructor
        super(shapes.length, pg);

        // Store the shapes array
        this.shapes = shapes;

        // Initialize the random numbers used to define the region ids
        this.random = [];

        for (let i = 0; i < this.nShapes; i += 1) {
            this.random[i] = [this.pg.random(), this.pg.random()];
        }
    }

    //
    // Returns true if the given position falls inside one of the shapes
    //
    isInsideShape(x, y) {
        // Check if the position falls inside one of the shapes
        for (const shape of this.shapes) {
            if (shape.isInside(x, y)) {
                return true;
            }
        }

        return false;
    }

    //
    // Returns the region identifier at the given position
    //
    getRegion(x, y) {
        // Return the default id if there are no shapes
        if (this.nShapes === 0) {
            return super.getRegion(x, y);
        }

        // Calculate the region id
        let region = 0;

        for (let i = 0; i < this.nShapes; i += 1) {
            if (this.shapes[i].isInside(x, y)) {
                region += this.random[i][0];
            } else {
                region += this.random[i][1];
            }
        }

        return region;
    }

    //
    // Returns the region approximate position
    //
    getApproximatePosition(x, y) {
        // Return the default position if there are no shapes
        if (this.nShapes === 0) {
            return super.getApproximatePosition(x, y);
        }

        // Calculate the region approximate position
        let xRegion = 0;
        let yRegion = 0;
        let intersections = 0;

        for (let i = 0; i < this.nShapes; i += 1) {
            const shape = this.shapes[i];

            if (shape.isInside(x, y)) {
                xRegion += shape.center[0];
                yRegion += shape.center[1];
                intersections += 1;
            }
        }

        if (intersections > 0) {
            xRegion /= intersections;
            yRegion /= intersections;
        } else {
            xRegion = this.pg.width / 2;
            yRegion = this.pg.height / 2;
        }

        return [xRegion, yRegion];
    }
}


//
// This class represents the regions defined by a group of intersecting lines
//
export class LineRegions extends SameShapeRegions {

    //
    // Returns true if the given position falls inside one of the shapes
    //
    isInsideShape(x, y) {
        // We assume that line shapes cover the whole space
        return this.nShapes > 0;
    }

    //
    // Returns the region approximate position
    //
    getApproximatePosition(x, y) {
        // Return the default position if there are no shapes
        if (this.nShapes === 0) {
            return super.getApproximatePosition(x, y);
        }

        // Calculate the region approximate position
        let xRegion = this.pg.width / 2;
        let yRegion = this.pg.height / 2;
        const xShift = this.pg.width / this.nShapes;
        const yShift = this.pg.height / this.nShapes;

        for (const line of this.shapes) {
            if (line.isInside(x, y)) {
                xRegion -= xShift * line.sinAngle;
                yRegion += yShift * line.cosAngle;
            } else {
                xRegion += xShift * line.sinAngle;
                yRegion -= yShift * line.cosAngle;
            }
        }

        return [xRegion, yRegion];
    }
}


//
// This class represents the regions defined by a group of intersecting shapes
// of different shape kinds
//
export class DifferentShapeRegions extends Regions {

    //
    // Initializes the class
    //
    constructor(regions, pg) {
        // Calculate the total number of shapes
        let nShapes = 0;

        for (const r of regions) {
            nShapes += r.nShapes;
        }

        // Call the super class constructor
        super(nShapes, pg);

        // Save the regions instances
        this.regions = regions;
    }

    //
    // Returns true if the given position falls inside one of the shapes
    //
    isInsideShape(x, y) {
        // Check if the position falls inside one of the regions
        for (const r of this.regions) {
            if (r.isInsideShape(x, y)) {
                return true;
            }
        }

        return false;
    }

    //
    // Returns the region identifier at the given position
    //
    getRegion(x, y) {
        // Return the default id if there are no shapes
        if (this.shapes === 0) {
            return super.getRegion(x, y);
        }

        // Calculate the combined region id
        let region = 0;

        for (const r of this.regions) {
            region += r.getRegion(x, y);
        }

        return region;
    }

    //
    // Returns the region approximate position
    //
    getApproximatePosition(x, y) {
        // Return the default position if there are no shapes
        if (this.nShapes === 0) {
            return super.getApproximatePosition(x, y);
        }

        // Calculate the combined region approximate position
        let xRegion = 0;
        let yRegion = 0;

        for (const r of this.regions) {
            const position = r.getApproximatePosition(x, y);
            xRegion += r.nShapes * position[0];
            yRegion += r.nShapes * position[1];
        }

        return [xRegion / this.nShapes, yRegion / this.nShapes];
    }
}
