import { Line } from "../../common/geometry/Line/Line.js";
import { Point } from "../../common/geometry/point/Point.js";

/**
 * Egy csőnyomvonalat reprezentáló típus
 */
export class PipeDriver {
    /** @type {string} */
    id;
    /** @type {boolean} */
    isSelected;
    /** @type {boolean} */
    isSelectedForDrag;
    /** @type {number} */
    selectedPointIndex;
    /** @type {boolean} */
    isFinalized = false;
    
    /** @type {Point[]} */
    points = [];
    /** @type {Line[]} */
    segments = [];

    /** @type {Point[]} */
    proposedPoints = [];
    /** @type {Line[]} */
    proposedSegments = [];

    /** @type {string} */
    slabHeaterId;
    /** @type {string} */
    boxId;
    /** @type {Line[]} */
    bluePipe = [];
    /** @type {Line[]} */
    redPipe = [];

    constructor() {

    }
}