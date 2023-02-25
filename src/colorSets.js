
//
// Returns a color set
//
export function getColorSet(id, p) {
    let backgroundColor;
    let colors;
    let darkMode;

    if (id == 0) {
        // Default #1
        backgroundColor = p.color(250, 245, 230);
        colors = [
            p.color(125, 170, 250),
            p.color(255, 100, 100),
            p.color(130, 200, 130),
            p.color(245, 220, 145),
            p.color(80, 80, 80)];
        darkMode = false;
    } else if (id == 1) {
        // Default #2
        backgroundColor = p.color(240, 235, 230);
        colors = [
            p.color(255, 240, 180),
            p.color(250, 130, 115),
            p.color(90, 110, 175),
            p.color(75, 175, 150),
            p.color(100, 75, 50)];
        darkMode = false;
    } else if (id == 2) {
        // Pink
        backgroundColor = p.color(245, 220, 235);
        colors = [
            p.color(250, 250, 250),
            p.color(255, 245, 155),
            p.color(250, 120, 120),
            p.color(90, 100, 200),
            p.color(70, 70, 60)];
        darkMode = false;
    } else if (id == 3) {
        // Orange
        backgroundColor = p.color(255, 100, 70);
        colors = [
            p.color(255, 255, 255),
            p.color(255, 255, 200),
            p.color(255, 170, 210),
            p.color(255, 160, 120),
            p.color(160, 200, 150),
            p.color(100, 50, 20)];
        darkMode = false;
    } else if (id == 4) {
        // Green
        backgroundColor = p.color(170, 220, 170);
        colors = [
            p.color(60, 155, 95),
            p.color(45, 115, 80),
            p.color(70, 60, 50),
            p.color(235, 245, 230),
            p.color(250, 255, 145)];
        darkMode = false;
    } else if (id == 5) {
        // Grey and orange
        backgroundColor = p.color(205, 220, 215);
        colors = [
            p.color(100, 120, 145),
            p.color(230, 235, 225),
            p.color(245, 170, 15),
            p.color(75, 75, 75),
            p.color(160, 135, 115)];
        darkMode = false;
    } else if (id == 6) {
        // Purple
        backgroundColor = p.color(235, 230, 230);
        colors = [
            p.color(110, 125, 185),
            p.color(85, 85, 150),
            p.color(80, 80, 110),
            p.color(40, 45, 60)];
        darkMode = false;
    } else if (id == 7) {
        // Red
        backgroundColor = p.color(255, 70, 70);
        colors = [
            p.color(255, 225, 225),
            p.color(255, 175, 175),
            p.color(255, 130, 130),
            p.color(255, 95, 95),
            p.color(255, 35, 35)];
        darkMode = false;
    } else if (id == 8) {
        // Pastel
        backgroundColor = p.color(240, 235, 220);
        colors = [
            p.color(45, 145, 205),
            p.color(240, 145, 135),
            p.color(170, 110, 175),
            p.color(115, 180, 225),
            p.color(235, 105, 125),
            p.color(245, 210, 115)];
        darkMode = false;
    } else if (id == 9) {
        // Brown
        backgroundColor = p.color(225, 215, 195);
        colors = [
            p.color(85, 65, 45),
            p.color(175, 70, 70),
            p.color(120, 155, 110),
            p.color(240, 235, 225),
            p.color(230, 180, 90)];
        darkMode = false;
    } else if (id == 10) {
        // Itonk
        backgroundColor = p.color(200, 190, 190);
        colors = [
            p.color(155, 140, 125),
            p.color(85, 120, 125),
            p.color(125, 80, 85),
            p.color(145, 165, 170),
            p.color(245, 75, 75)];
        darkMode = false;
    } else if (id == 11) {
        // Gora
        backgroundColor = p.color(245, 115, 125);
        colors = [
            p.color(180, 185, 215),
            p.color(235, 175, 100),
            p.color(195, 215, 160),
            p.color(125, 130, 215),
            p.color(205, 250, 175)];
        darkMode = false;
    } else if (id == 12) {
        // Gora
        backgroundColor = p.color(125, 150, 195);
        colors = [
            p.color(245, 185, 75),
            p.color(245, 115, 125),
            p.color(140, 190, 200),
            p.color(185, 225, 200),
            p.color(110, 80, 215),
            p.color(200, 225, 125)];
        darkMode = false;
    } else if (id == 13) {
        // Summer
        backgroundColor = p.color(230, 230, 240);
        colors = [
            p.color(170, 175, 205),
            p.color(85, 85, 85),
            p.color(5, 15, 50),
            p.color(20, 50, 130),
            p.color(255, 95, 105),
            p.color(75, 180, 255)];
        darkMode = false;
     } else if (id == 14) {
        backgroundColor = p.color(255, 245, 225);
        colors = [
            p.color(255, 85, 75),
            p.color(255, 140, 0),
            p.color(255, 100, 0),
            p.color(255, 75, 150),
            p.color(220, 70, 100),
            p.color(255, 235, 20),
            p.color(255, 220, 20)];
        darkMode = false;
    } else if (id == 15) {
        backgroundColor = p.color(155, 210, 185);
        colors = [
            p.color(215, 180, 215),
            p.color(185, 225, 220),
            p.color(250, 225, 130),
            p.color(245, 170, 145),
            p.color(245, 180, 190)];
        darkMode = false;
   } else if (id == 16) {
        // Dark red
        backgroundColor = p.color(50, 50, 50);
        colors = [
            p.color(255, 60, 60),
            p.color(255, 60, 60),
            p.color(255, 60, 60),
            p.color(255, 60, 60),
            p.color(255, 60, 60),
            p.color(255, 60, 60),
            p.color(255, 60, 60),
            p.color(255, 60, 60),
            p.color(250)];
        darkMode = true;
    } else if (id == 17) {
        // Dark cyan
        backgroundColor = p.color(40, 50, 75);
        colors = [
            p.color(250, 250, 250),
            p.color(210, 245, 245),
            p.color(255, 90, 255),
            p.color(250, 55, 90),
            p.color(65, 195, 200),
            p.color(65, 75, 105)];
        darkMode = true;
    } else if (id == 18) {
        // Dark flashy
        backgroundColor = p.color(45, 45, 45);
        colors = [
            p.color(255, 115, 225),
            p.color(255, 115, 100),
            p.color(100, 220, 255),
            p.color(75, 255, 140),
            p.color(255, 255, 90)];
        darkMode = true;
    } else if (id == 19) {
        // Dark grey
        backgroundColor = p.color(80, 80, 80);
        colors = [
            p.color(250, 250, 250),
            p.color(230, 230, 230),
            p.color(50, 50, 50),
            p.color(40, 40, 40),
            p.color(25, 25, 25)];
        darkMode = true;
    } else if (id == 20) {
        // Dark grey and red
        backgroundColor = p.color(50, 50, 50);
        colors = [
            p.color(255, 255, 255),
            p.color(240, 240, 240),
            p.color(210, 210, 210),
            p.color(180, 180, 180),
            p.color(255, 80, 80)];
        darkMode = true;
    } else if (id == 21) {
        // Dark grey and orange
        backgroundColor = p.color(60, 60, 60);
        colors = [
            p.color(20, 20, 20),
            p.color(85, 105, 130),
            p.color(40, 50, 60),
            p.color(100, 100, 100),
            p.color(255, 125, 25)];
        darkMode = true;
    } else if (id == 22) {
        // Dark grey and red
        backgroundColor = p.color(60, 60, 60);
        colors = [
            p.color(20, 20, 20),
            p.color(85, 105, 130),
            p.color(40, 50, 60),
            p.color(100, 100, 100),
            p.color(255, 50, 50)];
        darkMode = true;
    } else if (id == 23) {
        // Dark cyan
        backgroundColor = p.color(25, 85, 90);
        colors = [
            p.color(220, 220, 220),
            p.color(80, 205, 195),
            p.color(245, 255, 245),
            p.color(255, 105, 105),
            p.color(250, 235, 150)];
        darkMode = true;
    } else if (id == 24) {
        // Dark pink and yellow
        backgroundColor = p.color(30, 45, 70);
        colors = [
            p.color(255, 255, 155),
            p.color(110, 215, 245),
            p.color(245, 90, 90),
            p.color(245, 170, 215),
            p.color(120, 140, 150)];
        darkMode = true;
    } else if (id == 25) {
        // Dark blue and orange
        backgroundColor = p.color(60, 90, 130);
        colors = [
            p.color(150, 195, 215),
            p.color(225, 250, 250),
            p.color(240, 110, 75),
            p.color(40, 50, 65),
            p.color(60, 70, 90)];
        darkMode = true;
    } else if (id == 26) {
        // Dark blue and red
        backgroundColor = p.color(70, 70, 70);
        colors = [
            p.color(220, 90, 90),
            p.color(90, 115, 165),
            p.color(255, 255, 230),
            p.color(150, 180, 210),
            p.color(105, 110, 120)];
        darkMode = true;
    } else if (id == 27) {
        // Dark green cyan
        backgroundColor = p.color(125, 125, 125);
        colors = [
            p.color(0, 70, 95),
            p.color(155, 190, 185),
            p.color(65, 180, 150),
            p.color(230, 250, 220),
            p.color(0, 255, 185)];
        darkMode = true;
    } else if (id == 28) {
        // Dark green pink
        backgroundColor = p.color(20, 25, 50);
        colors = [
            p.color(50, 110, 105),
            p.color(25, 170, 145),
            p.color(40, 150, 115),
            p.color(50, 195, 150),
            p.color(190, 50, 85)];
        darkMode = true;
    } else if (id == 29) {
        backgroundColor = p.color(20, 55, 80);
        colors = [
            p.color(75, 170, 140),
            p.color(90, 125, 140),
            p.color(245, 70, 70),
            p.color(245, 130, 50),
            p.color(240, 220, 170),
            p.color(145, 190, 110)];
        darkMode = true;
    } else if (id == 30) {
        backgroundColor = p.color(70, 65, 65);
        colors = [
            p.color(240, 195, 100),
            p.color(245, 185, 245),
            p.color(225, 50, 75),
            p.color(240, 240, 240),
            p.color(0, 165, 140)];
        darkMode = true;
    }

    return [backgroundColor, colors, darkMode];
};


//
// Returns the list of colors encoded in hex format inside a string
//
export function colorsFromString(colorString, p) {
    // Make sure we use the correct part of the string
    colorString = colorString.split("/").pop();
    colorString = colorString.split("=").pop();

    // Extract all the colors
    const colors = [];

    for (const hexColor of colorString.split("-")) {
        const color = p.color("#" + hexColor);
        colors.push(color);
        console.log("p.color(", p.red(color), ",", p.green(color), ",", p.blue(color), "),");
    }

    return colors;
}


//
// Returns a string that encodes a list of colors in hex format
//
export function colorsToString(colors) {
    // Encode all the colors in hex format
    let colorString;

    for (const color of colors) {
        if (colorString) {
            colorString = colorString.concat("-", color.toString("#rrggbb").slice(1));
        } else {
            colorString = color.toString("#rrggbb").slice(1);
        }
    }

    return colorString;
}
