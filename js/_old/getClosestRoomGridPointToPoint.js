import { ApplicationState } from "../common/appdata/ApplicationState.js";
import { Room } from "../common/entities/Room.js";
import { GridCalculations } from "../common/geometry/Grid/GridCalculations.js";
import { CreatePoint } from "../common/geometry/Point/CreatePoint.js";
import { Point } from "../common/geometry/Point/Point.js";
import { MouseCursor } from "../common/ui/MouseCursor.js";

/**
 * Visszaadja a paraméterül kapott ponthoz legközelebbi, szobához rögzített grid pontot
 * 
 * @param {Point} point paraméter
 * @param {Room} room paraméter
 * @returns {Point} A legközelebbi grid pont
 */
function getClosestRoomGridPoint(point, room) {
    if (!ApplicationState.gridSeed) {
        return point;
    }

    if (!room) {
        return GridCalculations.getClosestGlobalGridPoint(point);
    }

    const p0 = room.roomGridDefinition.referencePoint;

    const deltaX = point.x - p0.x;
    const deltaY = point.y - p0.y;
    const cosAlpha = room.roomGridDefinition.cosAlpha;
    const sinAlpha = room.roomGridDefinition.sinAlpha;
    
    let a = deltaX * cosAlpha + deltaY * sinAlpha;
    let b = (a * sinAlpha - deltaY) / cosAlpha;

    const gridResolutionPixel = ApplicationState.gridResolutionInPixels;
    a = Math.round(a / gridResolutionPixel) * gridResolutionPixel;
    b = Math.round(b / gridResolutionPixel) * gridResolutionPixel;
    
    const x = p0.x + a * cosAlpha + b * sinAlpha;
    const y = p0.y + a * sinAlpha - b * cosAlpha;
    return CreatePoint.createPoint(x, y);
}

/**
 * Visszaadja a kurzorhoz legközelebbi, szobához rögzített grid pontot
 * 
 * @param {Room} room paraméter
 * @returns {Point} A legközelebbi grid pont
 */
function getClosestRoomGridPointToCursor(room) {
    if (!room || room.angleRad === 0) {
        return GridCalculations.getClosestGlobalGridPoint(MouseCursor.getMousePositionAbsolute());
    }

    return GridCalculations.getClosestRoomGridPoint(MouseCursor.getMousePositionAbsolute());
}

/**
 * Visszaadja a kurzorhoz legközelebbi, szobához rögzített grid pontot, korrigálva, ha UI alatt van a kurzor
 * 
 * @param {Room} room paraméter
 * @returns {Point} A legközelebbi grid pont
 */
function getClosestRoomGridPointToCursorsCorrectedPosition(room) {
    if (!room || room.angleRad === 0) {
        return GridCalculations.getClosestGlobalGridPoint(MouseCursor.getCorrectedMousePositionAbsolute());
    }

    return GridCalculations.getClosestRoomGridPoint(MouseCursor.getCorrectedMousePositionAbsolute());
}