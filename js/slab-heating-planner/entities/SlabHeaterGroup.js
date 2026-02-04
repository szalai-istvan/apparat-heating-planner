import { Point } from "../../common/geometry/point/Point.js";
import { Rectangle } from "../../common/geometry/Rectangle/Rectangle.js";

/**
 * Egy födémfűtő csoportot reprezentáló típus.
 */
export class SlabHeaterGroup {

    /** @type {string} */
    id;
    /** @type {Rectangle} */
    boundingBox;
    /** @type {boolean} */
    isSelected;
    /** @type {boolean} */
    isSelectedForDrag;
    
    /** @type {string} */
    type;
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
    slabHeaterIds = [];

    /** @type {string} */
    pipeDriverId;
    /** @type {number} */
    pipeLength = null;

    /** @type {number} */
    length;
    /** @type {number} */
    width;

    constructor() {
        this.alignment = 1;
       // this.pipeDriverId = new PipeDriver(this).id; todo
    }
}