precision highp float;

// Get the shader uniforms
uniform sampler2D source;
uniform vec2 resolution;
uniform float stopValue;
uniform vec2 steps;
uniform float frame;
uniform bool simpleMode;
uniform bool darkMode;

// Get the varying with the texture coordinates
varying vec2 vTexCoord;

// Global variables
bvec2 sortingMode;


/*
 * Random number generator with a vec2 seed
 *
 * Credits:
 * http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0
 * https://github.com/mattdesl/glsl-random
 */
highp float random2d(vec2 co) {
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt = dot(co.xy, vec2(a, b));
    highp float sn = mod(dt, 3.14);
    return fract(sin(sn) * c);
}


/*
 * Calculates the sorting mode for the given texture coordinate.
 *
 * The first value is the direction mode (true for vertical), and the second the
 * weight mode (true for heavier pixels going down).
 *
 */
bvec2 calculateSortingMode(vec2 uv) {
	if (simpleMode) {
	    return bvec2(true, true);
	}

	vec2 step = floor(uv * steps);
	vec2 stepSize = resolution / steps;
	vec2 frameJump = steps * floor(frame / (3.0 * max(stepSize.x, stepSize.y)));
	bool directionMode = random2d(step + frameJump) < 0.5;
    bool weightMode = random2d((step + frameJump) * 123.456) < 0.5;

    return bvec2(directionMode, weightMode);
}


/*
 * Calculates the pixel resistance based on the pixel color
 */
float calculatePixelResistance(vec4 color) {
	if (darkMode) {
		return min(min(color.r, color.g), color.b);
	} else {
		return 1.0 - max(max(color.r, color.g), color.b);
	}
}


/*
 * Calculates the pixel weight based on the pixel color and the different modes
 */
float calculatePixelWeight(vec4 color) {
    float weightCondition = 2.0 * float(sortingMode[1]) - 1.0;
    float darkCondition = 2.0 * float(darkMode) - 1.0;

	return dot(color, vec4(-1.0, 1.0, 1.0, 0.0)) * weightCondition * darkCondition;
}


/*
 * Swaps the color with another pixel uv position if certain conditions are met
 */
vec4 swapColor(vec2 uv, vec2 swapUv, bool whenSwapHevier) {
    // Check if the swap position is outside the texture or it has a different
	// sorting mode
    if (any(lessThan(swapUv, vec2(0.0))) ||
    	any(greaterThanEqual(swapUv, vec2(1.0))) ||
		sortingMode != calculateSortingMode(swapUv)) {
        // Return the original color
    	return texture2D(source, uv);
    }

	// Get the pixel colors
    vec4 color = texture2D(source, uv);
	vec4 swapColor = texture2D(source, swapUv);

	// Calculate the pixel resistances
	float resistance = calculatePixelResistance(color);
	float swapResistance = calculatePixelResistance(swapColor);

	// Swap the colors only if their resistances are lower than the stop value
	if (resistance < stopValue && swapResistance < stopValue) {
		// Calculate the pixel weights
		float weight = calculatePixelWeight(color);
		float swapWeight = calculatePixelWeight(swapColor);

		// Swap the colors depending of their weight
		if ((whenSwapHevier && (weight < swapWeight)) || (!whenSwapHevier && (weight > swapWeight))) {
			color = swapColor;
		}
	}

    return color;
}


/*
 * Swaps the current pixel color with the color bellow
 */
vec4 swapColorBellow(vec2 uv) {
    // Get the texture uv coordinates of the pixel bellow
	// Remember that in p5.js the y axis is inverted
    vec2 uvBellow = uv + vec2(0.0, 1.0) / resolution;

    // Swap the pixel colors
    return swapColor(uv, uvBellow, false);
}


/*
 * Swaps the current pixel color with the color above
 */
vec4 swapColorAbove(vec2 uv) {
    // Get the texture uv coordinates of the pixel above
	// Remember that in p5.js the y axis is inverted
    vec2 uvAbove = uv + vec2(0.0, -1.0) / resolution;

    // Swap the pixel colors
    return swapColor(uv, uvAbove, true);
}


/*
 * Swaps the current pixel color with the color to the right
 */
vec4 swapColorRight(vec2 uv) {
    // Get the texture uv coordinates of the right pixel
    vec2 uvRight = uv + vec2(1.0, 0.0) / resolution;

    // Swap the pixel colors
    return swapColor(uv, uvRight, false);
}


/*
 * Swaps the current pixel color with the color to the left
 */
vec4 swapColorLeft(vec2 uv) {
    // Get the texture uv coordinates of the left pixel
    vec2 uvLeft = uv + vec2(-1.0, 0.0) / resolution;

    // Swap the pixel colors
    return swapColor(uv, uvLeft, true);
}


/*
 * The main program
 */
void main() {
	// Calculate the sorting mode
	sortingMode = calculateSortingMode(vTexCoord);

	// Calculate the new pixel color
    vec4 pixelColor;

    if (sortingMode[0]) {
		// Check if we are in an even pixel row
		bool evenRow = mod(floor(gl_FragCoord.y), 2.0) == 0.0;

		if (mod(frame, 2.0) == 0.0) {
			if (evenRow) {
				pixelColor = swapColorBellow(vTexCoord);
			} else {
				pixelColor = swapColorAbove(vTexCoord);
			}
		} else {
			if (evenRow) {
				pixelColor = swapColorAbove(vTexCoord);
			} else {
				pixelColor = swapColorBellow(vTexCoord);
			}
		}
    } else {
		// Check if we are in an even pixel column
		bool evenColumn = mod(floor(gl_FragCoord.x), 2.0) == 0.0;

		if (mod(frame, 2.0) == 0.0) {
			if (evenColumn) {
				pixelColor = swapColorRight(vTexCoord);
			} else {
				pixelColor = swapColorLeft(vTexCoord);
			}
		} else {
			if (evenColumn) {
				pixelColor = swapColorLeft(vTexCoord);
			} else {
				pixelColor = swapColorRight(vTexCoord);
			}
		}
    }

    // Fragment shader output
    gl_FragColor = pixelColor;
}
