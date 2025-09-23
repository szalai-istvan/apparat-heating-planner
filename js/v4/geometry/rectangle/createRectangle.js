/**
 * Létrehoz egy téglalapot és visszaadja.
 * 
 * @param {Point} middlePoint 
 * @param {Number} width 
 * @param {Number} height 
 * @param {Number} angleRad 
 * 
 * @returns {Rectangle}
 */
function createRectangleByMiddlePoint(middlePoint, width, height, angleRad) {
    const vector0 = multiplyPoint(createPoint(Math.cos(angleRad), Math.sin(angleRad)), width/2);
    const vector1 = multiplyPoint(createPoint(Math.sin(angleRad), -1 * Math.cos(angleRad)), height/2);
    const vector0Negative = multiplyPoint(vector0, -1);
    const vector1Negative = multiplyPoint(vector1, -1);

    const points = [];
    points.push(addPoints([middlePoint, vector0, vector1]));
    points.push(addPoints([middlePoint, vector0, vector1Negative]));
    points.push(addPoints([middlePoint, vector0Negative, vector1Negative]));
    points.push(addPoints([middlePoint, vector0Negative, vector1]));

    return new Rectangle(points);
}