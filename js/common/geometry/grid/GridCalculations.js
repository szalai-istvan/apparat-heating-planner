import { ApplicationState } from "../../appdata/ApplicationState.js";
import { MouseCursor } from "../../ui/MouseCursor.js";
import { CreatePoint } from "../Point/CreatePoint.js";
import { Point } from "../Point/Point.js";

/**
 * Visszaadja a paraméterül kapott ponthoz legközelebbi globális grid pontot
 * 
 * @param {Point} point paraméter
 * @returns {Point} A legközelebbi grid pont
 */
function getClosestGlobalGridPoint(point) {
    const gridSeed = ApplicationState.gridSeed;
    const gridResolutionPixel = ApplicationState.gridResolutionInPixels;

    if (!gridSeed || !gridResolutionPixel) {
        return point;
    }

    const x = gridSeed.x + Math.round((point.x - gridSeed.x) / gridResolutionPixel) * gridResolutionPixel;
    const y = gridSeed.y + Math.round((point.y - gridSeed.y) / gridResolutionPixel) * gridResolutionPixel;

    return CreatePoint.createPoint(x, y);
}

/**
 * Visszaadja a kurzorhoz legközelebbi globális grid pontot
 * 
 * @returns {Point} A legközelebbi grid pont
 */
function getClosestGlobalGridPointToCursor() {
    return getClosestGlobalGridPoint(MouseCursor.getMousePositionAbsolute());
}

/**
 * Visszaadja a kurzorhoz legközelebbi globális grid pontot, korrigálva, ha UI alatt van a kurzor
 * 
 * @returns {Point} A legközelebbi grid pont
 */
function getClosestGlobalGridPointToCursorsCorrectedPosition() {
    return getClosestGlobalGridPoint(MouseCursor.getCorrectedMousePositionAbsolute());
}

/**
 * Négyzetrács kalkuláció műveletek.
 */
export const GridCalculations = {
    getClosestGlobalGridPoint,
    getClosestGlobalGridPointToCursor,
    getClosestGlobalGridPointToCursorsCorrectedPosition
};