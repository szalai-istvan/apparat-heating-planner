import { Rectangle } from "../../common/geometry/Rectangle/Rectangle.js";

/**
 * Egy födémfűtőt reprezentáló típus
 */
export class SlabHeater {
    /** @type {string} */
    id;
    /** @type {Rectangle} */
    boundingBox;
    /** @type {Rectangle} */
    selectionBox;
   
    /** @type {string} */
    color;
    /** @type {string} */
    groupId;
    /** @type {string} */
    pipeDriverId;
    /** @type {number} */
    pipeLength;

    constructor() {

    }
}