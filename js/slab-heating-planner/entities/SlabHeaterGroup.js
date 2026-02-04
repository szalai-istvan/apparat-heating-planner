import { Point } from "../../common/geometry/Point/Point.js";
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
    
    //length;
    //width; todo ezek vajon kellenek valamire?

    constructor({ slabHeater, length, width, alignment }) {
        // this.id = createUniqueId(); todo create

        // if (slabHeater) {
            // this.slabHeaterIds.push(slabHeater.id);
            // slabHeater.groupId = this.id;
        // }

        // this.isSelected = false;
        // this.isSelectedForDrag = false;
        // this.color = BLACK;

        // this.alignment = alignment;
        // this.length = length;
        // this.lengthInPixels = length * pixelsPerMetersRatio;
        // this.width = width;
        // this.widthInPixels = width * pixelsPerMetersRatio;
        // updateSlabHeaterGroupType(this);

        // this.pipeDriverId = new PipeDriver(this).id;

        // elementStore.register(this);
    }
}