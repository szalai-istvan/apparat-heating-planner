import { Line } from "../../common/geometry/Line/Line.js";
import { Point } from "../../common/geometry/Point/Point.js";

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
    
    /** @type {Point[]} */
    points = [];
    
    /** @type {boolean} */
    isFullyConfigured = false;
    /** @type {string} */
    slabHeaterId;
    /** @type {string} */
    boxId;
    /** @type {Line[]} */
    pipes = [];

    constructor(slabHeaterGroup) {
        this.id = createUniqueId();

        const firstPoint = calculatePipeDriverFirstPoint(slabHeaterGroup);
        this.slabHeaterGroupId = slabHeaterGroup.id;

        firstPoint && this.points.push(firstPoint);

        elementStore.register(this);
    }
}