import { Constants } from "../../appdata/Constants.js";

/**
 * Felrajzolja a képernyőre a téglalapot.
 * 
 * @param {Rectangle} rectangle 
 * @param {string} color
 * @param {number} thickness
 * @returns {undefined}
 */
function renderRectangle(rectangle, color = undefined, thickness = undefined) {
    if (!rectangle) {
        return;
    }

    push();

    noFill();
    stroke(color || Constants.geometry.defaultRectangleColor);
    strokeWeight(thickness || Constants.geometry.defaultRectangleStrokeWeight);
    
    for (let line_ of rectangle.lines) {
        line(line_.p0.x, line_.p0.y, line_.p1.x, line_.p1.y);
    }

    pop();
}

/**
 * Téglalap rajzolsásal kapcsolatos függvények.
 */
export const RenderRectangle = {
    renderRectangle
};