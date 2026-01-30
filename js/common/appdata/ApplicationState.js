import { Point } from "../geometry/Point/Point.js";
import { Blueprint } from "../entities/Blueprint.js";
import { Room } from "../entities/Room.js";

/**
 * Az alkalmazás állapotát tároló objektum.
 */
export const ApplicationState = {
    canvas: null,
    /** @type {Point} */
    testPoint: null,
    /** @type {Point} */
    originPoint: null,
    /** @type {Array} */
    roomPrefillButtons: [],
    /** @type {boolean} */
    controlsAreEnabled: true,
    /** @type {Point} */
    screenSumDrag: null,
    /** @type {Point} */
    screenZoom: 1,
    /** @type {boolean} */
    screenDraggingInProgress: false,
    /** @type {boolean} */
    debugEnabled: false,
    /** @type {Array} */
    delimiterPositions: [],
    /** @type {Array} */
    uiTexts: [],
    /** @type {number} */
    pixelsPerMetersRatio: null,
    /** @type {number} */
    gridResolutionPixel: null,
    /** @type {number} */
    roomTextSize: null,
    /** @type {number} */
    roomLineWeight: null,
    /** @type {number} */
    roomNameOutlineWidth: null,
    /** @type {number} */
    gridResolutionInPixels: null,
    /** @type {boolean} */
    scalingInProgress: null,
    /** @type {Point} */
    gridSeed: null,
    /** @type {boolean} */
    roomCreatingInProgress: false,
    /** @type {string} */
    keyStrokeRecord: null,
    /** @type {boolean} */
    uncensorBoobs: false,
    
    roomCreationTemp: {
        width: null,
        height: null,
        first: null,
        second: null,
        third: null,
        angleRad: null,
        tilted: null
    },

    /** @type {any} */
    selectedObject: null,
    /** @type {Blueprint} */
    selectedBlueprint: null,
    /** @type {Room} */
    selectedRoom: null

};