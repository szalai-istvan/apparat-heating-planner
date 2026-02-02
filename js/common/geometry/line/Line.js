import { Constants } from "../../appdata/Constants.js";
import { CreatePoint } from "../Point/CreatePoint.js";
import { Point } from "../Point/Point.js";
import { PointCalculations } from "../Point/PointCalculations.js";

/**
 * Egy vonalat reprezentáló osztály.
 */
export class Line {
    /** @type {Point} */
    p0;
    /** @type {Point} */
    p1;
    /** @type {Number} */
    angleRad;
    /** @type {Number} */
    length;
    /** @type {Point} */
    middlePoint;

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
        if (Math.abs(deltaX) > Constants.geometry.deltaXVerticalityThreshold) {
            this.n = 1;
            this.a = deltaY / deltaX;
            this.b = p0.y - this.a * p0.x;
            this.angleRad = Math.atan(this.a);
        } else {
            this.n = 0;
            this.a = 1;
            this.b = -1 * p0.x;
            this.angleRad = HALF_PI;
        }

        this.length = PointCalculations.calculateDistance(p0, p1);
        this.middlePoint = CreatePoint.createPoint((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
    }
}