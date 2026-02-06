import { Rectangle } from "../../common/geometry/Rectangle/Rectangle.js";
import { MathTools } from "../../common/math/MathTools.js";
import { SlabHeatingPlannerConstants } from "../appdata/SlabHeatingPlannerConstants.js";

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
    outlineColor;
    /** @type {string} */
    groupId;
    /** @type {string} */
    pipeDriverId;
    /** @type {number} */
    pipeLength;
    /** @type {number} */
    rowNumber;

    constructor() {
        this.outlineColor = MathTools.randomChoice(SlabHeatingPlannerConstants.slabHeater.slabHeaterColors);
    }
}