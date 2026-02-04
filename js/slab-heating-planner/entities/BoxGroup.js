import { Point } from "../../common/geometry/Point/Point.js";
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
    pipeDriverEndNodeCoordinates = null;
    
    
    /** @type {string[]} */
    boxIds = [];
    /** @type {string} */
    pipeDriverId = null;

    constructor({box, alignment}) {
        // this.id = createUniqueId();

        // checkClass(box, CLASS_BOX, true);

        // if (box) {
            // this.boxIds.push(box.id);
            // box.groupId = this.id;
        // }
        // this.alignment = alignment;

        // elementStore.register(this); todo ez create
    }
}