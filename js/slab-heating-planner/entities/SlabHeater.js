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

    constructor() {
        // this.id = createUniqueId();
        // this.centerPosition = getCorrectedMousePositionAbsolute();
        // elementStore.register(this); todo create ...
    }
}