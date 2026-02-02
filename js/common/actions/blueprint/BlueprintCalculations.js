import { Blueprint } from "../../entities/Blueprint.js";
import { CreatePoint } from "../../geometry/Point/CreatePoint.js";
import { Point } from "../../geometry/Point/Point.js";
import { CreateRectangle } from "../../geometry/Rectangle/CreateRectangle.js";
import { Rectangle } from "../../geometry/Rectangle/Rectangle.js";
import { ReducerFunctions } from "../../math/ReducerFunctions.js";
import { BlueprintService } from "../../service/BlueprintService.js";
import { RoomService } from "../../service/RoomService.js";

/**
 * Visszaadja a tervrajz szögét.
 * 
 * @param {Blueprint} blueprint 
 * @returns {number}
 */
function getAngleRad(blueprint) {
    if (!blueprint) {
        return;
    }

    return blueprint.boundingBox.lines[1].angleRad;
}

/**
 * Visszaadja a tervrajz középpontját.
 * 
 * @param {Blueprint} blueprint 
 * @returns {Point}
 */
function getCenterPosition(blueprint) {
    if (!blueprint || !blueprint.boundingBox) {
        return CreatePoint.createPoint(0, 0);
    }

    return blueprint.boundingBox.middlePoint;
}

/**
 * Megállapítja, hogy vannak-e tervrajzok a rajzlapon.
 * 
 */
function blueprintDataIsPresent() {
    return BlueprintService.findAll().length > 0;
}

/**
 * Kiszámítja az összes rajzelemet befoglaló egyenes téglalap méreteit
 * 
 * @returns {Rectangle}
 */
function getDrawingBoundingBox() {
    /** @type {Point[]} */
    let points = [];

    const blueprints = BlueprintService.findAll();
    const rooms = RoomService.findAll();

    blueprints.map(bp => bp.boundingBox).map(bb => bb.points).forEach(p => points = [...points, ...p]);
    rooms.map(r => r.boundingBox).map(bb => bb.points).forEach(p => points = [...points, ...p]);

    const minX = points.map(p => p.x).reduce(ReducerFunctions.minimumFunction);
    const maxX = points.map(p => p.x).reduce(ReducerFunctions.maximumFunction);
    const minY = points.map(p => p.y).reduce(ReducerFunctions.minimumFunction);
    const maxY = points.map(p => p.y).reduce(ReducerFunctions.maximumFunction);

    const width = maxX - minX;
    const height = maxY - minY;
    const middlePoint = CreatePoint.createPoint(minX + width / 2, minY + height / 2);
    return CreateRectangle.createRectangleByMiddlePoint(middlePoint, width, height, 0.00);
}

/**
 * Tervrajzokkal kapcsolatos számítások.
 */
export const BlueprintCalculations = {
    getAngleRad,
    getCenterPosition,
    getDrawingBoundingBox,
    blueprintDataIsPresent
};