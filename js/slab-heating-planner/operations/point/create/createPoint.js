/**
 * Létrehoz és visszaad egy pontot.
 * 
 * @param {number} x koordináta
 * @param {number} y koordináta
 * @returns {Point} a létrehozott pont objektum
 */
function createPoint(x, y) {
    checkClass(x, CLASS_NUMBER);
    checkClass(y, CLASS_NUMBER);
    return new Point(x, y);
}