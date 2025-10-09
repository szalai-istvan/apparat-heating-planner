class Point {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

/** @param {Point[]} points, @returns {Point} */
function addPoints(points) {
    const x = points.map(p => p.x).reduce(sumFunction);
    const y = points.map(p => p.y).reduce(sumFunction);
    return createPoint(x, y);
}

/** @param {Point} point, @param {Number} mul, @returns {Point} */
function multiplyPoint(point, mul) {
    return createPoint(point.x * mul, point.y * mul);
}

/** @param {Point} point, @param {Number} angleRad, @returns {Point} */
function rotatePoint(point, angleRad) {
    const absValue = calculateDistanceFromOrigin(point);
    const x = point.x;
    const y = point.y;

    let angle;
    if (x === 0) {
        if (y >= 0) {
            angle = HALF_PI;
        } else {
            angle = HALF_PI * 3;
        }
    } else {
        angle = Math.atan(y / x);
    }

    angle += angleRad;
    return multiplyPoint(createUnitVector(angle), absValue);
}