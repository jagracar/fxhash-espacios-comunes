precision highp float;

// Get the geometry position
attribute vec3 aPosition;

// Get the texture coordinate
attribute vec2 aTexCoord;

//Get the model view matrix
uniform mat4 uModelViewMatrix;

//Get the projection matrix
uniform mat4 uProjectionMatrix;

// Define the varying that will contain the texture coordinate
varying vec2 vTexCoord;


/*
 * The main program
 */
void main(void) {
	// Save the varyings
    vTexCoord = aTexCoord;

    // Vertex shader output
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
