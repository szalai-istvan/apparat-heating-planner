/**
 * Megállapítja, hogy a paraméterül kapott pont a paraméterül kapott téglalapban található-e.
 * 
 * @param {Point} point Pont
 * @param {Rectangle} rectangle Téglalap
 * @returns {boolean} true, ha a pont a téglalapon belül van
 */
function pointIsInsideRectangle(point, rectangle) {
    const lines = rectangle.lines;
    const testerLine = createTestLine(point);
    let intersectedLines = 0;
    for (let line of lines) {
        if (linesIntersect(line, testerLine)) {
            intersectedLines += 1;
        }
    }

    return (intersectedLines % 2) === 1;
}