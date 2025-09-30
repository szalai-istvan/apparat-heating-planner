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

/**
 * Létrehoz egy vonalat a megadott pont és a dőlésszög alapján és visszaadja.
 * 
 * @param {Point} p0 
 * @param {Number} angleRad 
 * @returns {Line}
 */
function createLineByPointAndAngle(p0, angleRad) {
    const vector = createUnitVector(angleRad);
    const offsetPositive = multiplyPoint(vector, INFINITE_LINE_LENGTH);
    const offsetNegative = multiplyPoint(vector, -1 * INFINITE_LINE_LENGTH);
    const p1 = addPoints([offsetPositive, p0]);
    const p2 = addPoints([offsetNegative, p0]);
    return createLine(p1, p2);
}