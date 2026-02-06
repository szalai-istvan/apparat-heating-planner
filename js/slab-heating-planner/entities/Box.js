import { Rectangle } from "../../common/geometry/Rectangle/Rectangle.js";

/**
 * Egy födémátvezető dobozt reprezentáló osztály.
 */
export class Box {
    /** @type {string} */
    id;
    /** @type {Rectangle} */
    boundingBox;
    /** @type {Rectangle} */
    selectionBox;
   
    /** @type {string} */
    groupId;
    /** @type {string} */
    pipeDriverId;

    constructor() {}
}