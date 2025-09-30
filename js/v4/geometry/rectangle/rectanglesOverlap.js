/**
 * Megvizsgálja, hogy van-e metszete a két paraméterül megadott téglalapnak.
 * 
 * @param {Rectangle} rectangle1 
 * @param {Rectangle} rectangle2 
 * @returns {boolean} true, ha van metszet.
 */
function rectanglesOverlap(rectangle1, rectangle2) {
    for (let p of rectangle1.points) {
        if (pointIsInsideRectangle(p, rectangle2)) {
            return true;
        }
    }

    for (let p of rectangle2.points) {
        if (pointIsInsideRectangle(p, rectangle1)) {
            return true;
        }
    }

    return false;
}