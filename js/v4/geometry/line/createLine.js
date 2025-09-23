/** @type {Point}, Ellenőrzésekhez használható pont. */
let testPoint;

/**
 * Létrehoz és visszaad egy egyenest.
 * 
 * @param {Point} p0 
 * @param {Point} p1 
 * @returns {Line}
 */
function createLine(p0, p1) {
    return new Line(p0, p1);
}

/**
 * Létrehoz és visszaad egy tesztvonalat.
 * 
 * @param {Point} p0 
 * @returns {Line}
 */
function createTestLine(p0) {
    return new Line(p0, testPoint);
}