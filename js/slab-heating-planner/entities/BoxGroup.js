import { Point } from "../../common/geometry/point/Point.js";
import { Rectangle } from "../../common/geometry/Rectangle/Rectangle.js";

/** 
 * Egy csoportnyi födémátvezető dobozt reprezentáló típus
 */
export class BoxGroup {
    /** @type {string} */
    id;
    /** @type {Rectangle} */
    boundingBox;
    /** @type {boolean} */
    isSelected;
    /** @type {boolean} */
    isSelectedForDrag;
    /** @type {number} */
    alignment;
    /** @type {number} */
    angleRad = 0.00;
    /** @type {number} */
    clickedMemberIndex = undefined;
    /** @type {Point} */
    middlePoint;
    /** @type {Point} */
    pipeDriverEndNodeCoordinates = null;
    
    /** @type {string[]} */
    boxIds = [];

    constructor() {
        this.alignment = 1;
    }
}