precision highp float;

// Get the shader uniforms
uniform sampler2D source;
uniform float noiseSeed;
uniform float noiseAmount;
uniform bool greyNoise;

// Get the varying with the texture coordinates
varying vec2 vTexCoord;


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
 * Calculates the pixel noise associated to a given texture coordinate
 */
vec3 calculateNoise() {
	if (greyNoise) {
		return vec3(noiseAmount * (random2d(noiseSeed * vTexCoord) - 0.5));
	} else {
		return noiseAmount * (vec3(
				random2d(noiseSeed * vTexCoord),
				random2d(noiseSeed * vTexCoord * 123.456),
				random2d(noiseSeed * vTexCoord * 678.910)) - 0.5);
	}
}

/*
 * The main program
 */
void main() {
	// Get the texture pixel color
    vec4 pixelColor = texture2D(source, vTexCoord);

    // Calculate the noise to add to the pixel color
    vec3 noise = calculateNoise();

    // Fragment shader output
    gl_FragColor = pixelColor + vec4(noise, 0.0);
}
