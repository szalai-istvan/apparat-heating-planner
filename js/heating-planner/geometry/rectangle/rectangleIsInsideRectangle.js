/**
 * Megállapítja, hogy a paraméterül kapott téglalap teljes mértékig benne van-e a másik téglalapban.
 * 
 * @param {Rectangle} insideRectangle
 * @param {Rectangle} outsideRectangle
 * @returns {boolean}
 */
function rectangleIsInsideRectangle(insideRectangle, outsideRectangle) {
    for (let point of insideRectangle.points) {
        if (!pointIsInsideRectangle(point, outsideRectangle)) {
            return false;
        }
    }

    return true;
}