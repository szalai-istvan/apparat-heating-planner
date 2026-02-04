import { Point } from "../../common/geometry/Point/Point.js";
import { Rectangle } from "../../common/geometry/Rectangle/Rectangle.js";

/**
 * Egy panelcsoportot reprezentáló osztály.
 */
export class PanelGroup {
    /** @type {string} */
    id;
    /** @type {Rectangle} */
    boundingBox;
    /** @type {Rectangle} */
    boundingBoxIncludingPipes;
    /** @type {boolean} */
    isSelected;
    /** @type {boolean} */
    isSelectedForDrag;
    
    /** @type {string} */
    type;
    /** @type {object} */
    details;
    /** @type {Point} */
    middlePoint;
    /** @type {number} */
    lengthInPixels;
    /** @type {number} */
    widthInPixels;
    /** @type {number} */
    alignment;
    /** @type {number} */
    angleRad = 0.00;
    /** @type {number} */
    clickedMemberIndex = undefined;
    
    /** @type {string} */
    roomId = null;
    /** @type {string[]} */
    panelIds = [];

    constructor() {
        this.alignment = 1;
    }
}