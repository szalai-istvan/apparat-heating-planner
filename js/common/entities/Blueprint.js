import { Rectangle } from "../geometry/Rectangle/Rectangle.js";

/**
 * Tervrajz entitás osztály.
 */
export class Blueprint {
    /** @type {string} */
    id;
    /** @type {Rectangle} */
    boundingBox;
    /** @type {Rectangle} */
    selectionBox;
    /** @type {boolean} */
    isSelected;
    /** @type {boolean} */
    isSelectedForDrag = false;

    /** @type {object} */
    data;

    constructor(data) {
        this.data = data;
    }
}