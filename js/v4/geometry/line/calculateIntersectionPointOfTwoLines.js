/**
 * Kiszámítja két vonal metszéspontját.
 * 
 * @param {Line} line0 
 * @param {Line} line1 
 * @returns {Point} a metszéspont
 */
function calculateIntersectionPointOfTwoLines(line0, line1) {
    if (Math.abs(line0.angleRad - line1.angleRad) < PARALLELITY_TRESHOLD) {
        console.log('parallel');
        return undefined;
    }

    console.log(line0);
    console.log(line1);

    let intersectionPoint = createPoint(0, 0);
    if (line0.n === 0) {
        const x = line0.p0.x;
        intersectionPoint.x = x;
        intersectionPoint.y = calculateY(line1, x);
    } else if (line1.n === 0) {
        const x = line1.p0.x;
        intersectionPoint.x = x;
        intersectionPoint.y = calculateY(line0, x);
    } else {
        const x = (line1.b - line0.b) / (line0.a - line1.a);
        intersectionPoint.x = x;
        intersectionPoint.y = calculateY(line1, x);
    }

    if (pointIsWithinLineBounds(intersectionPoint, line0) && pointIsWithinLineBounds(intersectionPoint, line1)) {
        console.log('inofbounds');
        console.log(intersectionPoint);
        console.log('-');
        return intersectionPoint;
    }
    console.log('outofbounds');
    console.log(intersectionPoint);
    console.log('-');
    return undefined;
}