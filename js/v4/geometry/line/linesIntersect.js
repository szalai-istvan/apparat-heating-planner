/**
 * Megvizsgálja, hogy a paraméterül kapott két vonal metszi-e egymást.
 * 
 * @param {Line} line0 
 * @param {Line} line1
 * @returns {boolean} true, ha a két vonal metszi egymást. 
 */
function linesIntersect(line0, line1) {
    if (Math.abs(line0.angleRad - line1.angleRad) < PARALLELITY_TRESHOLD) {
        return false;
    }

    let intersectionPoint = createPoint(0, 0);
    if (line0.n === 0) {
        const x = line0.p0.x;
        intersectionPoint.x = x;
        intersectionPoint.y = line1.calculateY(x);
        return pointIsWithinLineBounds(intersectionPoint, line0) && pointIsWithinLineBounds(intersectionPoint, line1);
    }

    if (line1.n === 0) {
        const x = line1.p0.x;
        intersectionPoint.x = x;
        intersectionPoint.y = line0.calculateY(x);
        return pointIsWithinLineBounds(intersectionPoint, line0) && pointIsWithinLineBounds(intersectionPoint, line1);
    }

    intersectionPoint.x = (line1.b - line0.b) / (line0.a - line1.a);
    intersectionPoint.y = line1.calculateY(intersectionPoint.x);
    return pointIsWithinLineBounds(intersectionPoint, line0) && pointIsWithinLineBounds(intersectionPoint, line1);
}

/**
 * Megállapítja, hogy a megadott pont a vonal határain belül található-e.
 * 
 * @param {Point} point 
 * @param {Line} line 
 * @returns {boolean}
 */
function pointIsWithinLineBounds(point, line) {
    const x = point.x;
    const y = point.y;

    if (line.n === 0) {
        const yMax = Math.max(line.p0.y, line.p1.y);
        const yMin = Math.min(line.p0.y, line.p1.y);
        return y < yMax && y > yMin;
    }
    
    const xMax = Math.max(line.p0.x, line.p1.x);
    const xMin = Math.min(line.p0.x, line.p1.x);
    return x > xMin && x < xMax;
}