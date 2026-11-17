import { Rectangle } from "../geometry/rectangle/Rectangle.js";
import { GridDefinition } from "../geometry/grid/GridDefinition.js";
import { Point } from "../geometry/point/Point.js";

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

    /** @type {number} */
    width;
    /** @type {number} */
    height;
    /** @type {Point} */
    firstPoint;

    /** @type {string} */
    structureElementsId; // todo ez nem common

    constructor(name, tilted) {
        this.name = name || '';
        this.tilted = tilted;
    }
}