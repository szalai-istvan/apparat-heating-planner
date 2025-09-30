class Line {
    /** @type {Point} */
    p0;
    /** @type {Point} */
    p1;
    /** @type {Number} */
    angleRad;

    // n*y = a*x+b egyenlet paraméterei nem függőleges vonal esetén
    /** @type {Number}*/
    n;
    /** @type {Number}*/
    a;
    /** @type {Number}*/
    b;

    constructor(p0, p1) {
        this.p0 = p0;
        this.p1 = p1;

        const deltaX = p1.x - p0.x;
        const deltaY = p1.y - p0.y;
        if (Math.abs(deltaX) > DELTA_X_VERTICALITY_THRESHOLD) {
            this.n = 1;
            this.a = deltaY / deltaX;
            this.b = p0.y - this.a * p0.x;
            this.angleRad = Math.atan(this.a);
        } else {
            this.n = 0;
            this.a = 1;
            this.b = -1 * p0.x;
            this.angleRad = 1000;
        }
    }
}

/**
 * 
 * @param {Line} line
 * @param {Number} x 
 * @returns {Number}
 */
function calculateY(line, x) {
    checkClass(x, CLASS_NUMBER);

    if (line.n === 0) {
        console.log('Attempt at calculating y value of vertical line!');
        return NaN;
    }

    return line.a * x + line.b;
}