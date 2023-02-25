import p5 from 'p5';
import { selectOption, splitAmount } from './fxhashUtils.js';
import { getColorSet } from './colorSets.js';
import { LineShape, CircleShape, RingShape, RectangleShape, CrossShape, PolygonShape, GmShape, GnShape, GridShape } from './shapes.js';
import { SameShapeRegions, LineRegions, DifferentShapeRegions } from './regions.js';

// Define the main sketch options and their weights
const proportionOptions = [
    { weight: 2, value: 1, label: "square" }, // 1
    { weight: 1, value: Math.pow(2, 0.5), label: "horizontal (A series)" }, // 1.414
    { weight: 1, value: (1 + Math.pow(5, 0.5)) / 2, label: "horizontal (golden ratio)" }, // 1.618
    { weight: 1, value: 16 / 9, label: "horizontal (HD)" }, // 1.777
    { weight: 1, value: 1 / Math.pow(2, 0.5), label: "vertical (A series)" }, // 0.707
    { weight: 1, value: 2 / (1 + Math.pow(5, 0.5)), label: "vertical (golden ratio)" }, // 0.618
    { weight: 1, value: 9 / 16, label: "vertical (HD)" }]; // 0.663

const colorSetOptions = [
    { weight: 2, value: 0, label: "#0" },
    { weight: 2, value: 1, label: "#1" },
    { weight: 1, value: 2, label: "#2" },
    { weight: 1, value: 3, label: "#3" },
    { weight: 0.5, value: 4, label: "#4" },
    { weight: 0.5, value: 5, label: "#5" },
    { weight: 1, value: 6, label: "#6" },
    { weight: 1, value: 7, label: "#7" },
    { weight: 1, value: 8, label: "#8" },
    { weight: 1, value: 9, label: "#9" },
    { weight: 1, value: 10, label: "#10 (Itonk)" },
    { weight: 1, value: 11, label: "#11 (Gora)" },
    { weight: 1, value: 12, label: "#12 (Gora)" },
    { weight: 1, value: 13, label: "#13" },
    { weight: 1, value: 14, label: "#14" },
    { weight: 1, value: 15, label: "#15" },
    { weight: 1, value: 16, label: "#16" },
    { weight: 1, value: 17, label: "#17" },
    { weight: 1, value: 18, label: "#18" },
    { weight: 1, value: 19, label: "#19" },
    { weight: 1, value: 20, label: "#20" },
    { weight: 1, value: 21, label: "#21" },
    { weight: 1, value: 22, label: "#22" },
    { weight: 1, value: 23, label: "#23" },
    { weight: 1, value: 24, label: "#24" },
    { weight: 1, value: 25, label: "#25" },
    { weight: 1, value: 26, label: "#26" },
    { weight: 1, value: 27, label: "#27" },
    { weight: 1, value: 28, label: "#28" },
    { weight: 1, value: 29, label: "#29" },
    { weight: 1, value: 30, label: "#30" }];

const noiseDistributionOptions = [
    { weight: 1, value: true },
    { weight: 1, value: false }];

const useBackgroundRegionsOptions = [
    { weight: 1, value: true },
    { weight: 20, value: false }];

const useNoiseOptions = [
    { weight: 1, value: true },
    { weight: 15, value: false }];

const useDotsOptions = [
    { weight: 1, value: true },
    { weight: 9, value: false }];

const useStripesOptions = [
    { weight: 1, value: true },
    { weight: 2, value: false }];

// Select one possibility from each of the main sketch options
const selectedProportion = selectOption(proportionOptions);
const colorSet = selectOption(colorSetOptions);
const noiseDistribution = selectOption(noiseDistributionOptions).value;
const useBackgroundRegions = selectOption(useBackgroundRegionsOptions).value;
const useNoise = selectOption(useNoiseOptions).value;
const useDots = selectOption(useDotsOptions).value;
const useStripes = selectOption(useStripesOptions).value;

// Select the shapes that will be used to calculate the regions
const nMinimumShapes = (fxrand() < 0.15) ? 10 : 30;
const nRandomShapes = Math.floor(15 * fxrand());
const nExtraShapes = (fxrand() < 0.05) ? 50 : 0;
const nShapes = nMinimumShapes + nRandomShapes + nExtraShapes;
const nShapesReservedForLines = 4;
const shapeWeights = [8, 4, 4, 2, 3, 3, 0.1];
const shapeDistribution = splitAmount(nShapes - nShapesReservedForLines, 1, 3, shapeWeights);
const nLines = nShapesReservedForLines + shapeDistribution[0];
const nCircles = shapeDistribution[1];
const nRings = shapeDistribution[2];
const nRectangles = shapeDistribution[3];
const nCrosses = shapeDistribution[4];
const nPolygons = shapeDistribution[5];
const nGmGns = shapeDistribution[6];

// Select the grid shapes that will be used to calculate the regions
const nRandomGrids = Math.floor(4 * fxrand());
const gridWeights = [10, 4, 4, 4, 1];
const gridDistribution = splitAmount(nRandomGrids, 1, 1, gridWeights);
const nLineGrids = gridDistribution[0];
const nCircleGrids = gridDistribution[1];
const nCrossGrids = gridDistribution[2];
const nPolygonGrids = gridDistribution[3];
const nGmGnGrids = gridDistribution[4];

// Select the shapes that will be used for the background regions
const nMinimumBgShapes = 30;
const nRandomBgShapes = Math.floor(50 * fxrand());
const nBgShapes = nMinimumBgShapes + nRandomBgShapes;
const bgShapeWeights = [1, 1, 1, 1, 1, 1];
const bgShapeDistribution = splitAmount(nBgShapes, 10, 50, bgShapeWeights);
const nBgLines = bgShapeDistribution[0];
const nBgCircles = bgShapeDistribution[1];
const nBgRings = bgShapeDistribution[2];
const nBgRectangles = bgShapeDistribution[3];
const nBgCrosses = bgShapeDistribution[4];
const nBgPolygons = bgShapeDistribution[5];

// Decide if there should be some noisy, dotted or stripped regions
const withNoisyRegions = useNoise;
const withDottedRegions = useDots && nCircleGrids === 0;
const withStrippedRegions = useStripes && nLineGrids === 0;

// Set the rest of the sketch properties
const initialBufferSize = isFxpreview ? 1000 : 1500;
const initialPointsDensity = useBackgroundRegions ? 5 : (noiseDistribution ? 4 : 3.5);
const initalNoiseAmount = 0.05;
const pointsPerFrame = 5000;
const emptyAreaAmount = 0.2;

// Set the fxhash features
function getShapeFeatureValue(n) {
    if (n == 0) return "none";
    if (n <= 5) return "few";
    if (n <= 10) return "some";
    if (n <= 15) return "many";
    if (n <= 25) return "a lot";
    return "crazy";
}

window.$fxhashFeatures = {
    "Color palette": colorSet.label,
    "Lines": getShapeFeatureValue(nLines),
    "Circles": getShapeFeatureValue(nCircles),
    "Rings": getShapeFeatureValue(nRings),
    "Rectangles": getShapeFeatureValue(nRectangles),
    "Crosses": getShapeFeatureValue(nCrosses),
    "Polygons": getShapeFeatureValue(nPolygons),
    "GMs / GNs": getShapeFeatureValue(nGmGns),
    "Line grids": nLineGrids,
    "Circle grids": nCircleGrids,
    "Cross grids": nCrossGrids,
    "Polygon grids": nPolygonGrids,
    "GM / GN grids": nGmGnGrids,
    "Noise distribution": noiseDistribution,
    "Background regions": useBackgroundRegions,
    "With alien regions": withNoisyRegions,
    "With dotted regions": withDottedRegions,
    "With striped regions": withStrippedRegions
}

// Log the shapes details for future reference
console.log("-----------------------------------------------------------");
console.log("Main sketch parameters");
console.log("-----------------------------------------------------------");
console.log("fxhash:", fxhash);
console.log("colorSet:", window.$fxhashFeatures["Color palette"]);
console.log("proportion:", selectedProportion.label);
console.log("nShapes:", nShapes + nRandomGrids);
console.log("nLines:", nLines, "(", window.$fxhashFeatures["Lines"], ")");
console.log("nCircles:", nCircles, "(", window.$fxhashFeatures["Circles"], ")");
console.log("nRings:", nRings, "(", window.$fxhashFeatures["Rings"], ")");
console.log("nRectangles:", nRectangles, "(", window.$fxhashFeatures["Rectangles"], ")");
console.log("nCrosses:", nCrosses, "(", window.$fxhashFeatures["Crosses"], ")");
console.log("nPolygons:", nPolygons, "(", window.$fxhashFeatures["Polygons"], ")");
console.log("nGmGns:", nGmGns, "(", window.$fxhashFeatures["GMs / GNs"], ")");
console.log("nLineGrids:", window.$fxhashFeatures["Line grids"]);
console.log("nCircleGrids:", window.$fxhashFeatures["Circle grids"]);
console.log("nCrossGrids:", window.$fxhashFeatures["Cross grids"]);
console.log("nPolygonGrids:", window.$fxhashFeatures["Polygon grids"]);
console.log("nGmGnGrids:", window.$fxhashFeatures["GM / GN grids"]);
console.log("noiseDistribution:", window.$fxhashFeatures["Noise distribution"]);
console.log("useBackgroundRegions:", window.$fxhashFeatures["Background regions"]);
console.log("withNoisyRegions:", window.$fxhashFeatures["With alien regions"]);
console.log("withDottedRegions:", window.$fxhashFeatures["With dotted regions"]);
console.log("withStrippedRegions:", window.$fxhashFeatures["With striped regions"]);
console.log("-----------------------------------------------------------");

// Fix the seed for the random number generators
const seed = Math.floor(fxrand() * 1234567);

// The sketch code :)
const sketch = (p) => {
    let noiseShader;
    let pixelSortingShader;
    let proportion;
    let canvasWidth;
    let canvasHeight;
    let bufferWidth;
    let bufferHeight;
    let bufferPixels;
    let bufferSize;
    let pointsBuffer;
    let noiseBuffer;
    let pixelSortingBuffer;
    let backgroundColor;
    let pointColors;
    let darkMode;
    let regions;
    let backgroundRegions;
    let withFrame;
    let pointsDensity;
    let noiseAmount;
    let applyPixelSorting;
    let simplePixelSorting;
    let displayInfo;
    let paused;
    let points;

    p.preload = () => {
        // Load the shaders
        noiseShader = p.loadShader("vert.glsl", "noiseFrag.glsl");
        pixelSortingShader = p.loadShader("vert.glsl", "pixelSortingFrag.glsl");
    };

    p.setup = () => {
        // Calculate the canvas and buffer dimensions
        calculateCanvasDimensions();
        calculateBufferDimensions();

        // Create the sketch canvas
        const canvas = p.createCanvas(canvasWidth, canvasHeight);
        canvas.id("sketchCanvas");

        // Create the buffer where the points will be painted
        pointsBuffer = p.createGraphics(10, 10);
        pointsBuffer.elt.id = "pointsBuffer";
        pointsBuffer.pixelDensity(1);
        pointsBuffer.resizeCanvas(bufferWidth, bufferHeight);

        // Create the buffer where the noise will be added using a shader
        noiseBuffer = p.createGraphics(10, 10, p.WEBGL);
        noiseBuffer.elt.id = "noiseBuffer";
        noiseBuffer.pixelDensity(1);
        noiseBuffer.resizeCanvas(bufferWidth, bufferHeight);
        noiseBuffer.rectMode(p.CENTER);
        noiseBuffer.noStroke();
        noiseBuffer.shader(noiseShader);

        // Create the buffer where the pixel sorting will be done using a shader
        pixelSortingBuffer = p.createGraphics(10, 10, p.WEBGL);
        pixelSortingBuffer.elt.id = "pixelSortingBuffer";
        pixelSortingBuffer.pixelDensity(1);
        pixelSortingBuffer.resizeCanvas(bufferWidth, bufferHeight);
        pixelSortingBuffer.rectMode(p.CENTER);
        pixelSortingBuffer.noStroke();
        pixelSortingBuffer.shader(pixelSortingShader);

        // Get the color set that will be used in the sketch
        [backgroundColor, pointColors, darkMode] = getColorSet(colorSet.value, p);

        // Set the seed for the random number generators
        p.randomSeed(seed);
        p.noiseSeed(seed);
        pointsBuffer.randomSeed(seed);
        pointsBuffer.noiseSeed(seed);

        // Create the regions that will be used to draw the points
        regions = createRegions();
        backgroundRegions = createBackgroundRegions();

        // Initialize some of the sketch parameters
        withFrame = true;
        pointsDensity = initialPointsDensity;
        noiseAmount = initalNoiseAmount;
        applyPixelSorting = false;
        simplePixelSorting = true;
        displayInfo = false;
        paused = false;
        points = 0;

        // Set the frame rate
        p.frameRate(60);
    };

    p.draw = () => {
        // Check that the drawing is not paused
        if (!paused) {
            // Check in which drawing mode we are at the moment
            if (applyPixelSorting) {
                // Sort the pixels
                sortPixels();
            } else if (points < pointsDensity * bufferPixels) {
                // Paint the next set of points
                paintPoints();
            }
        }

        // Add the pixel noise
        addPixelNoise();

        // Show the result on the canvas
        p.image(noiseBuffer, 0, 0, canvasWidth, canvasHeight, 0, 0, bufferWidth, bufferHeight);

        // Display the sketch information if requested
        if (displayInfo) {
            writeInfo();
        }

        // Check if the drawing has finished
        if (!applyPixelSorting && points >= pointsDensity * bufferPixels) {
            // Tell fxhash to build the preview image if we are in preview mode
            if (isFxpreview) {
                fxpreview();
            }

            // Stop the loop
            p.noLoop();
        }
    };

    p.windowResized = () => {
        // Calculate the new canvas dimensions
        calculateCanvasDimensions();

        // Resize the sketch canvas
        p.resizeCanvas(canvasWidth, canvasHeight);
    };

    p.deviceTurned = () => {
        // Calculate the new canvas dimensions
        calculateCanvasDimensions();

        // Resize the sketch canvas
        p.resizeCanvas(canvasWidth, canvasHeight);
    };

    p.keyPressed = () => {
        // Check if the buffer dimensions should be updated
        if (p.keyCode === p.UP_ARROW || p.keyCode === p.DOWN_ARROW) {
            // Calculate the new buffer dimensions
            if (p.keyCode === p.UP_ARROW) {
                calculateBufferDimensions(bufferSize + 1000);
            } else if ((bufferSize - 1000) > 10) {
                calculateBufferDimensions(bufferSize - 1000);
            }

            // Resize the buffers
            pointsBuffer.resizeCanvas(bufferWidth, bufferHeight);
            noiseBuffer.resizeCanvas(bufferWidth, bufferHeight);
            pixelSortingBuffer.resizeCanvas(bufferWidth, bufferHeight);

            // Set the seed for the random number generators
            p.randomSeed(seed);
            p.noiseSeed(seed);
            pointsBuffer.randomSeed(seed);
            pointsBuffer.noiseSeed(seed);

            // Create the regions that will be used to draw the points
            regions = createRegions();
            backgroundRegions = createBackgroundRegions();

            // Initialize again some of the sketch parameters
            pointsDensity = initialPointsDensity;
            applyPixelSorting = false;
            paused = false;
            points = 0;

            // Start the loop again if it was stopped
            p.loop();
        }
    };

    p.keyTyped = () => {
        // Check if the sketch should have a frame or not
        if (p.key === "f") {
            // Switch the frame on or off
            withFrame = !withFrame;

            // Set the seed for the random number generators
            p.randomSeed(seed);
            p.noiseSeed(seed);
            pointsBuffer.randomSeed(seed);
            pointsBuffer.noiseSeed(seed);

            // Create the regions that will be used to draw the points
            regions = createRegions();
            backgroundRegions = createBackgroundRegions();

            // Initialize again some of the sketch parameters
            pointsDensity = initialPointsDensity;
            applyPixelSorting = false;
            paused = false;
            points = 0;

            // Start the loop again if it was stopped
            p.loop();
        }

        // Check if the points density should be changed
        if (p.key === "d") {
            // Increase the points density
            pointsDensity += 1;

            // Initialize again some of the sketch parameters
            applyPixelSorting = false;
            paused = false;

            // Start the loop again if it was stopped
            p.loop();
        }

        // Check if the noise amount should be changed
        if (p.key === "n" || p.key === "b") {
            // Update the noise amount
            if (p.key === "n") {
                noiseAmount = Math.min(noiseAmount + 0.05, 1.0);
            } else {
                noiseAmount = Math.max(noiseAmount - 0.05, 0.0);
            }

            // Check if the sketch is not looping
            if (!p.isLooping()) {
                // Add the pixel noise
                addPixelNoise();

                // Show the result on the canvas
                p.image(noiseBuffer, 0, 0, canvasWidth, canvasHeight, 0, 0, bufferWidth, bufferHeight);

                // Display the sketch information if requested
                if (displayInfo) {
                    writeInfo();
                }
            }
        }

        // Check if the pixel sorting mode should be changed
        if (p.key === "z" || p.key === "x") {
            // Switch the pixel sorting modes on and off
            if (applyPixelSorting) {
                if (p.key === "z") {
                    applyPixelSorting = !simplePixelSorting;
                    simplePixelSorting = true;
                } else {
                    applyPixelSorting = simplePixelSorting;
                    simplePixelSorting = false;
                }
            } else {
                applyPixelSorting = true;
                simplePixelSorting = p.key === "z";
            }

            // Start the loop again if it was stopped and we are pixel sorting
            if (applyPixelSorting) {
                paused = false;
                p.loop();
            }
        }

        // Check if the sketch information should be displayed
        if (p.key === "i") {
            // Switch the information display mode on or off
            displayInfo = !displayInfo;

            // Check if the sketch is not looping
            if (!p.isLooping()) {
                // Show the result on the canvas
                p.image(noiseBuffer, 0, 0, canvasWidth, canvasHeight, 0, 0, bufferWidth, bufferHeight);

                // Display the sketch information if requested
                if (displayInfo) {
                    writeInfo();
                }
            }
        }

        // Check if the paused mode should be changed
        if (p.key === "p") {
            // Switch the paused mode on or off
            paused = !paused;

            // Check if the sketch is paused
            if (paused) {
                // Show the result on the canvas
                p.image(noiseBuffer, 0, 0, canvasWidth, canvasHeight, 0, 0, bufferWidth, bufferHeight);

                // Display the sketch information if requested
                if (displayInfo) {
                    writeInfo();
                }

                // Stop looping
                p.noLoop();
            } else {
                // Start the loop again
                p.loop();
            }
        }

        // Check if the current frame should be saved as a png file
        if (p.key === "s") {
            noiseBuffer.save("frame.png");
        }
    };

    function calculateCanvasDimensions() {
        // Calculate the sketch proportion to use
        const userProportion = new URLSearchParams(window.location.search).get("proportion");

        if (isFinite(userProportion) && userProportion > 0) {
            proportion = userProportion;
        } else {
            proportion = selectedProportion.value;
        }

        // Calculate the canvas dimensions from the window dimensions
        canvasWidth = p.windowWidth;
        canvasHeight = p.windowHeight;

        if (canvasHeight >= canvasWidth / proportion) {
            canvasHeight = Math.floor(canvasWidth / proportion);
        } else {
            canvasWidth = Math.floor(canvasHeight * proportion);
        }
    }

    function calculateBufferDimensions(proposedBufferSize) {
        // Calculate the buffer width
        if (proposedBufferSize) {
            // Use the proposed buffer size
            bufferWidth = Math.round(proposedBufferSize * Math.pow(proportion, 0.5));
        } else {
            // Get the user provided width
            const userWidth = new URLSearchParams(window.location.search).get("width");

            if (isFinite(userWidth) && userWidth > 10) {
                // Use the user provided width
                bufferWidth = Math.round(userWidth);
            } else {
                // Use the initial buffer size to calculate the width
                bufferWidth = Math.round(initialBufferSize * Math.pow(proportion, 0.5));
            }
        }

        // Calculate the remaining buffer dimensions
        bufferHeight = Math.round(bufferWidth / proportion);
        bufferPixels = bufferWidth * bufferHeight;
        bufferSize = Math.pow(bufferPixels, 0.5);
    }

    function paintPoints() {
        // Set the buffer background color if no points have been painted yet
        if (points == 0) {
            pointsBuffer.background(backgroundColor);
        }

        // Paint the points
        const frameSize = withFrame ? 0.03 * bufferSize : 0;
        const xStart = frameSize;
        const xEnd = bufferWidth - frameSize;
        const yStart = frameSize;
        const yEnd = bufferHeight - frameSize;
        const noiseResolution = 5 / bufferSize;
        const noiseBandsSize = 0.05;
        const noiseBandsWidth = 0.042;
        const dotsSeparation = bufferSize / 100;
        const dotsRadiusSq = Math.pow(bufferSize / 300, 2);
        const linesSeparation = bufferSize / 150;
        const linesWidth = bufferSize / 600;

        for (let i = 0; i < pointsPerFrame; i += 1) {
            // Get a random position inside the buffer
            const x = p.random(bufferWidth);
            const y = p.random(bufferHeight);

            // Check if the point should be painted
            let paintPoint = false;
            const regionRandomNumber = regions.getRandomNumber(x, y);

            if (p.random() > emptyAreaAmount + regionRandomNumber) {
                // Use the background regions to filter points if necessary
                if (!useBackgroundRegions || p.random() > (backgroundRegions.getRandomNumber(x, y) - 0.2)) {
                    // Use the region noise value to filter points if necessary
                    if (!noiseDistribution || p.random() < 1.4 * regions.getRandomNoise(x, y, noiseResolution, noiseResolution)) {
                        // Paint only points that fall inside the frame region
                        if (x > xStart && x < xEnd && y > yStart && y < yEnd) {
                            // Check the kind of region we are in
                            if (withNoisyRegions && regionRandomNumber > 0.4 && regionRandomNumber < 0.5) {
                                // Paint the point if it falls inside a noise band
                                const regionOffset = 1234 * regionRandomNumber;
                                const xNoise = regionOffset + x * noiseResolution;
                                const yNoise = regionOffset + y * noiseResolution;

                                if (p.noise(xNoise, yNoise) % noiseBandsSize < noiseBandsWidth) {
                                    paintPoint = true;
                                }
                            } else if (withDottedRegions && regionRandomNumber > 0.2 && regionRandomNumber < 0.3) {
                                // Paint the point if it falls outside a dot
                                const angle = regionRandomNumber * 1234;
                                const xRot = x * Math.cos(angle) - y * Math.sin(angle);
                                const yRot = x * Math.sin(angle) + y * Math.cos(angle);
                                const xMod = (xRot % dotsSeparation) - dotsSeparation / 2;
                                const yMod = (yRot % dotsSeparation) - dotsSeparation / 2;

                                if (Math.pow(xMod, 2) + Math.pow(yMod, 2) > dotsRadiusSq) {
                                    paintPoint = true;
                                }
                            } else if (withStrippedRegions && regionRandomNumber > 0.2 && regionRandomNumber < 0.4) {
                                // Paint the point if it falls inside a line
                                const angle = regionRandomNumber * 1234;
                                const xRot = x * Math.cos(angle) - y * Math.sin(angle);
                                const xMod = xRot % linesSeparation;

                                if (xMod < linesWidth) {
                                    paintPoint = true;
                                }
                            } else {
                                paintPoint = true;
                            }
                        }
                    }
                }
            }

            // Paint the point if it satisfied all the necessary conditions
            if (paintPoint) {
                const color = regions.getRandomColor(x, y, pointColors);
                pointsBuffer.stroke(color);
                pointsBuffer.point(x, y);
            }
        }

        // Increase the points counter
        points += pointsPerFrame;
    }

    function sortPixels() {
        // Calculate the number of steps in each direction
        const minimumSteps = 2 ** Math.floor(9 * (1.0 - p.constrain(p.mouseY / canvasHeight, 0.01, 1)));
        const steps = [minimumSteps, minimumSteps / proportion];

        if (proportion > 1) {
            steps[0] = minimumSteps * proportion;
            steps[1] = minimumSteps;
        }

        // Sort the pixels
        pixelSortingShader.setUniform("source", pointsBuffer);
        pixelSortingShader.setUniform("resolution", [bufferWidth, bufferHeight]);
        pixelSortingShader.setUniform("stopValue", 1.1 * p.constrain(p.mouseX / canvasWidth, 0 , 1));
        pixelSortingShader.setUniform("steps", steps);
        pixelSortingShader.setUniform("frame", p.frameCount);
        pixelSortingShader.setUniform("simpleMode", simplePixelSorting);
        pixelSortingShader.setUniform("darkMode", darkMode);
        pixelSortingBuffer.rect(0, 0, bufferWidth, bufferHeight);

        // Paint the sorted pixels in the points buffer again
        pointsBuffer.image(pixelSortingBuffer, 0, 0, bufferWidth, bufferHeight, 0, 0, bufferWidth, bufferHeight);
    }

    function addPixelNoise() {
        // Add the pixel noise
        noiseShader.setUniform("source", pointsBuffer);
        noiseShader.setUniform("noiseSeed", seed);
        noiseShader.setUniform("noiseAmount", noiseAmount);
        noiseShader.setUniform("greyNoise", darkMode);
        noiseBuffer.rect(0, 0, bufferWidth, bufferHeight);
    }

    function writeInfo() {
        // Set the text properties
        const textSize = 14 / p.pixelDensity();
        const lineSeparation = 1.5 * textSize;
        p.textSize(textSize);
        p.textAlign(p.LEFT, p.CENTER);

        // Specify the log information
        const logInfo = [
            "Color set: " + colorSet.label,
            "Buffer dimensions: " + bufferWidth + " x " + bufferHeight,
            "Points density: " + pointsDensity,
            "Finished painting: " + (points >= pointsDensity * bufferPixels),
            "Pixel sorting: " + applyPixelSorting,
            "Paused: " + paused,
            "Painted points: " + points,
            "Frame: " + p.frameCount,
            "Frame rate: " + Math.round(p.frameRate())];

        // Calculate the text width and height considering all the lines
        const textWidth = logInfo.reduce(
            (w, line) => Math.max(w, p.textWidth(line)), 0);
        const textHeight = lineSeparation * logInfo.length;

        // Draw a semitransparent panel
        p.noStroke();
        p.fill(255, 220);
        const x = 0.03 * canvasWidth;
        const y = x;
        const padding = 10;
        p.rect(x, y, textWidth + 2 * padding, textHeight + 2 * padding);

        // Draw the log information on top of the rectangle
        p.fill(50);

        for (let i = 0; i < logInfo.length; i += 1) {
            p.text(logInfo[i], x + padding, y + padding + lineSeparation * (i + 0.5));
        }
    }

    function getLineCenter(x0, y0, angle) {
        // Consider the horizontal line case
        if (Math.abs(angle) % Math.PI == 0) {
            if (y0 >= 0 && y0 <= bufferHeight) {
                return [bufferWidth / 2, y0];
            } else {
                return undefined;
            }
        }

        // Consider the vertical line case
        if ((Math.abs(angle) + Math.PI / 2) % Math.PI === 0) {
            if (x0 >= 0 && x0 <= bufferWidth) {
                return [x0, bufferHeight / 2];
            } else {
                return undefined;
            }
        }

        // Calculate the points where the line cuts the frame
        const cuts = [];
        const a = Math.tan(angle);
        const b = y0 - a * x0;

        for (const xCut of [0, bufferWidth]) {
            const yCut = a * xCut + b;

            if (yCut >= 0 && yCut <= bufferHeight) {
                cuts.push([xCut, yCut]);
            }
        }

        for (const yCut of [0, bufferHeight]) {
            if (cuts.length < 2) {
                const xCut = (yCut - b) / a;

                if (xCut >= 0 && xCut <= bufferWidth) {
                    cuts.push([xCut, yCut]);
                }
            }
        }

        // Return the line center
        if (cuts.length < 2) {
            return undefined;
        } else {
            return [(cuts[0][0] + cuts[1][0]) / 2, (cuts[0][1] + cuts[1][1]) / 2];
        }
    }

    function createRegions() {
        const regionsList = [
            createLineRegions(nLines),
            createCircleRegions(nCircles),
            createRingRegions(nRings),
            createRectangleRegions(nRectangles),
            createCrossRegions(nCrosses),
            createPolygonRegions(nPolygons),
            createGmGnRegions(nGmGns),
            createLineGridRegions(nLineGrids),
            createCircleGridRegions(nCircleGrids),
            createCrossGridRegions(nCrossGrids),
            createPolygonGridRegions(nPolygonGrids),
            createGmGnGridRegions(nGmGnGrids)
        ];

        return new DifferentShapeRegions(regionsList, pointsBuffer);
    }

    function createBackgroundRegions() {
        const regionsList = [
            createLineRegions(nBgLines),
            createCircleRegions(nBgCircles),
            createRingRegions(nBgRings),
            createRectangleRegions(nBgRectangles),
            createCrossRegions(nBgCrosses),
            createPolygonRegions(nBgPolygons)
        ];

        return new DifferentShapeRegions(regionsList, pointsBuffer);
    }

    function createLineRegions(n) {
        const shapes = [];

        for (let i = 0; i < n; i += 1) {
            const x0 = p.random(bufferWidth);
            const y0 = p.random(bufferHeight);
            const angle = p.random(-Math.PI / 2, Math.PI / 2);
            const center = getLineCenter(x0, y0, angle);
            shapes[i] = new LineShape(center, angle);
        }

        return new LineRegions(shapes, pointsBuffer);
    }

    function createCircleRegions(n) {
        const shapes = [];

        for (let i = 0; i < n; i += 1) {
            const xCenter = p.random(bufferWidth);
            const yCenter = p.random(bufferHeight);
            const radius = p.random(0.03 * bufferSize, 0.18 * bufferSize);
            shapes[i] = new CircleShape([xCenter, yCenter], radius);
        }

        return new SameShapeRegions(shapes, pointsBuffer);
    }

    function createRingRegions(n) {
        const shapes = [];

        for (let i = 0; i < n; i += 1) {
            const xCenter = p.random(bufferWidth);
            const yCenter = p.random(bufferHeight);
            const radius = p.random(0.03 * bufferSize, 0.18 * bufferSize);
            const widthFactor = p.random(0.05, 0.4);
            const innerRadius = Math.max(0, radius * (1 - widthFactor));
            const outerRadius = radius * (1 + widthFactor);
            shapes[i] = new RingShape([xCenter, yCenter], innerRadius, outerRadius);
        }

        return new SameShapeRegions(shapes, pointsBuffer);
    }

    function createRectangleRegions(n) {
        const shapes = [];

        for (let i = 0; i < n; i += 1) {
            const xCenter = p.random(bufferWidth);
            const yCenter = p.random(bufferHeight);
            const rectangleWidth = p.random(0.1 * bufferSize, 0.4 * bufferSize);
            const rectangleHeight = p.random(0.5 * rectangleWidth, 0.8 * rectangleWidth);
            const angle = p.random(-Math.PI / 2, Math.PI / 2);
            shapes[i] = new RectangleShape([xCenter, yCenter], rectangleWidth, rectangleHeight, angle);
        }

        return new SameShapeRegions(shapes, pointsBuffer);
    }

    function createCrossRegions(n) {
        const shapes = [];

        for (let i = 0; i < n; i += 1) {
            const xCenter = p.random(bufferWidth);
            const yCenter = p.random(bufferHeight);
            const size = p.random(0.05 * bufferSize, 0.3 * bufferSize);
            const thickness = 0.333 * size;
            const angle = p.random(-Math.PI / 2, Math.PI / 2);
            shapes[i] = new CrossShape([xCenter, yCenter], size, thickness, angle);
        }

        return new SameShapeRegions(shapes, pointsBuffer);
    }

    function createPolygonRegions(n) {
        const shapes = [];

        for (let i = 0; i < n; i += 1) {
            const xCenter = p.random(bufferWidth);
            const yCenter = p.random(bufferHeight);
            const sides = Math.floor(p.random(3, 8));
            const radius = p.random(0.03 * bufferSize, 0.18 * bufferSize);
            const angle = p.random(-Math.PI / 2, Math.PI / 2);
            shapes[i] = new PolygonShape([xCenter, yCenter], sides, radius, angle);
        }

        return new SameShapeRegions(shapes, pointsBuffer);
    }

    function createGmGnRegions(n) {
        const shapes = [];

        for (let i = 0; i < n; i += 1) {
            const xCenter = p.random(bufferWidth);
            const yCenter = p.random(bufferHeight);
            const size = p.random(0.05 * bufferSize, 0.2 * bufferSize);
            const angle = p.random(-Math.PI / 4, Math.PI / 4);

            if (darkMode) {
                shapes[i] = new GnShape([xCenter, yCenter], size, angle);
            } else {
                shapes[i] = new GmShape([xCenter, yCenter], size, angle);
            }
        }

        return new SameShapeRegions(shapes, pointsBuffer);
    }

    function createLineGridRegions(n) {
        const shapes = [];

        for (let i = 0; i < n; i += 1) {
            const xCenter = p.random(bufferWidth);
            const yCenter = p.random(bufferHeight);
            const rectangleWidth = p.random(0.2 * bufferSize, bufferSize);
            const rectangleHeight = 0.0025 * bufferSize;
            const angle = 0;
            const rectangle = new RectangleShape([xCenter, yCenter], rectangleWidth, rectangleHeight, angle);
            const separation = p.random(3.5 * rectangleHeight, 6 * rectangleHeight);
            const gridWidth = rectangleWidth;
            const gridHeight = separation * (1 + 2 * Math.floor(p.random(0, 20)));
            const gridAngle = p.random(-Math.PI / 2, Math.PI / 2);
            shapes[i] = new GridShape(rectangle, separation, gridWidth, gridHeight, gridAngle);
        }

        return new SameShapeRegions(shapes, pointsBuffer);
    }

    function createCircleGridRegions(n) {
        const shapes = [];

        for (let i = 0; i < n; i += 1) {
            const xCenter = p.random(bufferWidth);
            const yCenter = p.random(bufferHeight);
            const radius = 0.008 * bufferSize;
            const circle = new CircleShape([xCenter, yCenter], radius);
            const separation = p.random(4 * radius, 7 * radius);
            const gridWidth = separation * (1 + 2 * Math.floor(p.random(0, 10)));
            const gridHeight = separation * (1 + 2 * Math.floor(p.random(0, 5)));
            const gridAngle = p.random(-Math.PI / 2, Math.PI / 2);
            shapes[i] = new GridShape(circle, separation, gridWidth, gridHeight, gridAngle);
        }

        return new SameShapeRegions(shapes, pointsBuffer);
    }

    function createCrossGridRegions(n) {
        const shapes = [];

        for (let i = 0; i < n; i += 1) {
            const xCenter = p.random(bufferWidth);
            const yCenter = p.random(bufferHeight);
            const size = p.random(0.015 * bufferSize, 0.025 * bufferSize);
            const thickness = 0.333 * size;
            const angle = p.random(-Math.PI / 2, Math.PI / 2);
            const cross = new CrossShape([xCenter, yCenter], size, thickness, angle);
            const separation = p.random(2 * size, 4 * size);
            const gridWidth = separation * (1 + 2 * Math.floor(p.random(0, 10)));
            const gridHeight = separation * (1 + 2 * Math.floor(p.random(0, 5)));
            const gridAngle = p.random(-Math.PI / 2, Math.PI / 2);
            shapes[i] = new GridShape(cross, separation, gridWidth, gridHeight, gridAngle);
        }

        return new SameShapeRegions(shapes, pointsBuffer);
    }

    function createPolygonGridRegions(n) {
        const shapes = [];

        for (let i = 0; i < n; i += 1) {
            const xCenter = p.random(bufferWidth);
            const yCenter = p.random(bufferHeight);
            const sides = Math.floor(p.random(3, 6));
            const radius = p.random(0.01 * bufferSize, 0.015 * bufferSize);
            const angle = p.random(-Math.PI / 2, Math.PI / 2);
            const polygon = new PolygonShape([xCenter, yCenter], sides, radius, angle);
            const separation = p.random(4 * radius, 7 * radius);
            const gridWidth = separation * (1 + 2 * Math.floor(p.random(0, 10)));
            const gridHeight = separation * (1 + 2 * Math.floor(p.random(0, 5)));
            const gridAngle = p.random(-Math.PI / 2, Math.PI / 2);
            shapes[i] = new GridShape(polygon, separation, gridWidth, gridHeight, gridAngle);
        }

        return new SameShapeRegions(shapes, pointsBuffer);
    }

    function createGmGnGridRegions(n) {
        const shapes = [];

        for (let i = 0; i < n; i += 1) {
            const xCenter = p.random(bufferWidth);
            const yCenter = p.random(bufferHeight);
            const size = p.random(0.025 * bufferSize, 0.04 * bufferSize);
            const angle = 0;
            let text;

            if (darkMode) {
                text = new GnShape([xCenter, yCenter], size, angle);
            } else {
                text = new GmShape([xCenter, yCenter], size, angle);
            }

            const separation = p.random(1.5 * size, 2.5 * size);
            const gridWidth = separation * (1 + 2 * Math.floor(p.random(0, 10)));
            const gridHeight = separation * (1 + 2 * Math.floor(p.random(0, 5)));
            const gridAngle = p.random(-Math.PI / 4, Math.PI / 4);
            shapes[i] = new GridShape(text, separation, gridWidth, gridHeight, gridAngle);
        }

        return new SameShapeRegions(shapes, pointsBuffer);
    }
};


// Launch the sketch
const myp5 = new p5(sketch, window.document.body);

