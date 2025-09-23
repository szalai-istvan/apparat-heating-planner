/**
 * Felrajzolja a képernyőre a téglalapot.
 * 
 * @param {Rectangle} rectangle 
 * @returns {undefined}
 */
function drawRectangle(rectangle) {
    if (!rectangle) {
        return;
    }

    push();

    stroke(RECTANGLE_COLOR);
    strokeWeight(RECTANGLE_STROKE_WEIGHT);
    
    for (let line_ of rectangle.lines) {
        line(line_.p0.x, line_.p0.y, line_.p1.x, line_.p1.y);
    }

    pop();
}