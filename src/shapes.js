
//
// This class represents a line
//
export class LineShape {

    //
    // Initializes the class
    //
    constructor(center, angle) {
        this.center = center;
        this.a = Math.tan(angle);
        this.b = center[1] - this.a * center[0];
        this.cosAngle = Math.cos(angle);
        this.sinAngle = Math.sin(angle);
    }

    //
    // Returns true if the point is under the line
    //
    isInside(x, y) {
        return y > (this.a * x + this.b);
    }
}


//
// This class represents a circle
//
export class CircleShape {

    //
    // Initializes the class
    //
    constructor(center, radius) {
        this.center = center;
        this.radiusSq = radius ** 2;
    }

    //
    // Returns true if the point is inside the circle
    //
    isInside(x, y) {
        const distSq = (x - this.center[0]) ** 2 + (y - this.center[1]) ** 2;

        return distSq < this.radiusSq;
    }
}


//
// This class represents a ring
//
export class RingShape {

    //
    // Initializes the class
    //
    constructor(center, innerRadius, outerRadius) {
        this.center = center;
        this.innerRadiusSq = innerRadius ** 2;
        this.outerRadiusSq = outerRadius ** 2;
    }

    //
    // Returns true if the point is inside the ring
    //
    isInside(x, y) {
        const distSq = (x - this.center[0]) ** 2 + (y - this.center[1]) ** 2;

        return (distSq > this.innerRadiusSq) && (distSq < this.outerRadiusSq);
    }
}


//
// This class represents a rectangle
//
export class RectangleShape {

    //
    // Initializes the class
    //
    constructor(center, width, height, angle) {
        this.center = center;
        this.width = width;
        this.height = height;
        this.cosAngle = Math.cos(angle);
        this.sinAngle = Math.sin(angle);
    }

    //
    // Returns true if the point is inside the rectangle
    //
    isInside(x, y) {
        const xOffset = x - this.center[0];
        const yOffset = y - this.center[1];
        const xRot = +this.cosAngle * xOffset + this.sinAngle * yOffset;
        const yRot = -this.sinAngle * xOffset + this.cosAngle * yOffset;

        return (Math.abs(xRot) < this.width / 2) && (Math.abs(yRot) < this.height / 2);
    }
}


//
// This class represents a cross
//
export class CrossShape {

    //
    // Initializes the class
    //
    constructor(center, size, thickness, angle) {
        this.center = center;
        this.size = size;
        this.thickness = thickness;
        this.cosAngle = Math.cos(angle);
        this.sinAngle = Math.sin(angle);
    }

    //
    // Returns true if the point is inside the cross
    //
    isInside(x, y) {
        const xOffset = x - this.center[0];
        const yOffset = y - this.center[1];
        const xRot = +this.cosAngle * xOffset + this.sinAngle * yOffset;
        const yRot = -this.sinAngle * xOffset + this.cosAngle * yOffset;
        const isInsideFirstRectangle = (Math.abs(xRot) < this.size / 2) && (Math.abs(yRot) < this.thickness / 2)
        const isInsideSecondRectangle = (Math.abs(xRot) < this.thickness / 2) && (Math.abs(yRot) < this.size / 2)

        return isInsideFirstRectangle || isInsideSecondRectangle;
    }
}


//
// This class represents a polygon
//
export class PolygonShape {

    //
    // Initializes the class
    //
    constructor(center, sides, radius, angle) {
        this.center = center;
        this.radius = radius;
        this.cosAngle = Math.cos(angle);
        this.sinAngle = Math.sin(angle);
        this.verticesAngle = 2 * Math.PI / sides;
    }

    //
    // Returns true if the point is inside the polygon
    //
    isInside(x, y) {
        const xOffset = x - this.center[0];
        const yOffset = y - this.center[1];
        const xRot = +this.cosAngle * xOffset + this.sinAngle * yOffset;
        const yRot = -this.sinAngle * xOffset + this.cosAngle * yOffset;
        const angle = Math.abs(Math.atan2(yRot, xRot) % this.verticesAngle);
        const r = this.radius * Math.cos(this.verticesAngle / 2) / Math.cos(angle - this.verticesAngle / 2);

        return (xRot ** 2 + yRot ** 2) < r ** 2;
    }
}


//
// This class represents some pixelated text
//
export class TextShape {

    //
    // Initializes the class
    //
    constructor(center, pixelSize, angle, pixels) {
        this.center = center;
        this.pixelSize = pixelSize;
        this.cosAngle = Math.cos(angle);
        this.sinAngle = Math.sin(angle);
        this.pixels = pixels;
    }

    //
    // Returns true if the point is inside the pixel
    //
    isInsidePixel(x, y, pixel) {
        const xOffset = x - pixel[0] * this.pixelSize;
        const yOffset = y - pixel[1] * this.pixelSize;

        return (Math.abs(xOffset) < this.pixelSize / 2) && (Math.abs(yOffset) < this.pixelSize / 2)
    }

    //
    // Returns true if the point is inside the GM
    //
    isInside(x, y) {
        const xOffset = x - this.center[0];
        const yOffset = y - this.center[1];
        const xRot = +this.cosAngle * xOffset + this.sinAngle * yOffset;
        const yRot = -this.sinAngle * xOffset + this.cosAngle * yOffset;

        for (const pixel of this.pixels) {
            if (this.isInsidePixel(xRot, yRot, pixel)) {
                return true;
            }
        }

        return false;
    }
}


//
// This class represents a GM
//
export class GmShape extends TextShape {

    //
    // Initializes the class
    //
    constructor(center, size, angle) {
        // Define the GM text pixels
        const pixels = [
            // G
            [-5, -2], [-5, -1], [-5, +0], [-5, +1], [-5, +2],
            [-4, -3], [-4, +3],
            [-3, -3], [-3, +3],
            [-2, -3], [-2, +0], [-2, +3],
            [-1, -2], [-1, +0], [-1, +1], [-1, +2],
            // M
            [+1, -3], [+1, -2], [+1, -1], [+1, +0], [+1, +1], [+1, +2], [+1, +3],
            [+2, -2],
            [+3, -1], [+3, +0],
            [+4, -2],
            [+5, -3], [+5, -2], [+5, -1], [+5, +0], [+5, +1], [+5, +2], [+5, +3]];

        // Call the super class constructor
        super(center, size / 11, angle, pixels);
    }
}


//
// This class represents a GN
//
export class GnShape extends TextShape {

    //
    // Initializes the class
    //
    constructor(center, size, angle) {
        // Define the GN text pixels
        const pixels = [
            // G
            [-5, -2], [-5, -1], [-5, +0], [-5, +1], [-5, +2],
            [-4, -3], [-4, +3],
            [-3, -3], [-3, +3],
            [-2, -3], [-2, +0], [-2, +3],
            [-1, -2], [-1, +0], [-1, +1], [-1, +2],
            // N
            [+1, -3], [+1, -2], [+1, -1], [+1, +0], [+1, +1], [+1, +2], [+1, +3],
            [+2, -2],
            [+3, -1], [+3, +0], [+3, +1],
            [+4, +2],
            [+5, -3], [+5, -2], [+5, -1], [+5, +0], [+5, +1], [+5, +2], [+5, +3]];

        // Call the super class constructor
        super(center, size / 11, angle, pixels);
    }
}


//
// This class represents a grid of shapes
//
export class GridShape {

    //
    // Initializes the class
    //
    constructor(baseShape, separation, width, height, angle) {
        this.baseShape = baseShape;
        this.center = baseShape.center;
        this.separation = separation;
        this.cosAngle = Math.cos(angle);
        this.sinAngle = Math.sin(angle);
        this.halfWidth = width / 2;
        this.halfHeight = height / 2;
    }

    //
    // Calculates the modulo of a number in a more logical way than the
    // javascript default
    //
    static modulo(n, m) {
        return ((n % m) + m) % m;
    }

    //
    // Returns true if the point is inside the grid of shapes
    //
    isInside(x, y) {
        // Calculate the position relative to the base shape
        const xOffset = x - this.center[0];
        const yOffset = y - this.center[1];
        const xRot = +this.cosAngle * xOffset + this.sinAngle * yOffset;
        const yRot = -this.sinAngle * xOffset + this.cosAngle * yOffset;

        // Check if the position is outside the grid dimensions
        if (Math.abs(xRot) > this.halfWidth || Math.abs(yRot) > this.halfHeight) {
            return false;
        }

        // Check if the point falls inside the base shape
        const xModulo = GridShape.modulo(xRot + this.separation / 2, this.separation) - this.separation / 2;
        const yModulo = GridShape.modulo(yRot + this.separation / 2, this.separation) - this.separation / 2;

        return this.baseShape.isInside(xModulo + this.center[0], yModulo + this.center[1]);
    }
}
