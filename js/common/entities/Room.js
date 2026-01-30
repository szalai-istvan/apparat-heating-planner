import { Rectangle } from "../geometry/Rectangle/Rectangle.js";
import { GridDefinition } from "../geometry/Grid/GridDefinition.js";

/**
 * Egy szobát reprezentáló entitás
 */
export class Room {
    /** @type {string} */
    id;
    /** @type {Rectangle} */
    boundingBox;
    /** @type {Rectangle} */
    selectionBox;
    /** @type {boolean} */
    isSelected;
    /** @type {boolean} */
    isSelectedForDrag;

    /** @type {string} */
    name;
    /** @type {boolean} */
    tilted;

    angleRad = 0.00;
    /** @type {GridDefinition} */
    roomGridDefinition;

    /** @type {boolean} */
    cursorIsInsideCache = null;

    /** @type {string} */
    structureElementsId; // todo ez nem common

    constructor(name, tilted) {
        this.name = name || '';
        this.tilted = tilted;
    }
}