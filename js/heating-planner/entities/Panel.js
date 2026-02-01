import { Rectangle } from "../../common/geometry/Rectangle/Rectangle.js";

/**
 * Egy fűtőpanelt reprezentáló entitás
 */
export class Panel {
    /** @type {string} */
    id;
    /** @type {Rectangle} */
    boundingBox;
    /** @type {Rectangle} */
    selectionBox;

   
    /** @type {string} */
    groupId;

    constructor() {}
}