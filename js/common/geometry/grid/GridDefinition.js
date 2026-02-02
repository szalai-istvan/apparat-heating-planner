import { Point } from "../Point/Point.js";

/**
 * Egy négyzetrácsot reprezentáló osztály.
 */
export class GridDefinition {
    /** @type {Point} */
    referencePoint;
    /** @type {Number} */
    angleRad;
    /** @type {Number} */
    cosAlpha;
    /** @type {Number} */
    sinAlpha

    constructor() {}
}