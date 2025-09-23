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