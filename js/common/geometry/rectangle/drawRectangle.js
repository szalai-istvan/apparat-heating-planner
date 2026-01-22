/**
 * Felrajzolja a képernyőre a téglalapot.
 * 
 * @param {Rectangle} rectangle 
 * @param {string} color
 * @param {number} thickness
 * @returns {undefined}
 */
function drawRectangle(rectangle, color = undefined, thickness = undefined) {
    if (!rectangle) {
        return;
    }

    push();

    stroke(color || RECTANGLE_COLOR);
    strokeWeight(thickness || RECTANGLE_STROKE_WEIGHT);
    
    for (let line_ of rectangle.lines) {
        line(line_.p0.x, line_.p0.y, line_.p1.x, line_.p1.y);
    }

    pop();
}