import { CreateLine } from "../../../common/geometry/Line/CreateLine.js";
import { Line } from "../../../common/geometry/Line/Line.js";
import { LineCalculations } from "../../../common/geometry/line/LineCalculations.js";
import { CreatePoint } from "../../../common/geometry/point/createPoint.js";
import { Point } from "../../../common/geometry/point/Point.js";
import { PointCalculations } from "../../../common/geometry/point/PointCalculations.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { PipeDriver } from "../../entities/PipeDriver.js";
import { SlabHeater } from "../../entities/SlabHeater.js";
import { SlabHeaterGroup } from "../../entities/SlabHeaterGroup.js";
import { SlabHeaterGroupService } from "../../service/SlabHeaterGroupService.js";
import { SlabHeaterService } from "../../service/SlabHeaterService.js";
import { SlabHeaterGroupCalculations } from "../slabHeaterGroup/SlabHeaterGroupCalculations.js";

/**
 * Kiszámítja a csőnyomvonalakat.
 * 
 * @param {PipeDriver} pipeDriver 
 * @returns {undefined}
 */
function calculatePipesForPipeDriver(pipeDriver) {
    if (!pipeDriver) {
        return;
    }

    const slabHeater = SlabHeaterService.findById(pipeDriver.slabHeaterId);
    const slabHeaterGroup = SlabHeaterGroupService.findById(slabHeater.groupId);
    const redPipeStartingPoint = calculateRedPipeStartingPoint(slabHeater, slabHeaterGroup);
    const bluePipeStartingPoint = calculateBluePipeStartingPoint(slabHeater, slabHeaterGroup);

    pipeDriver.bluePipe = calculatePipe(pipeDriver, bluePipeStartingPoint);
    pipeDriver.redPipe = calculatePipe(pipeDriver, redPipeStartingPoint);
    // applyRadiusToPipes(pipeDriver.bluePipe);
    // applyRadiusToPipes(pipeDriver.redPipe);
}

/**
 * Kiszámítja a paraméterül kapott födémfűtő vörös csövének kezdőpontját.
 * 
 * @param {SlabHeater} slabHeater 
 * @param {SlabHeaterGroup} slabHeaterGroup 
 * @returns {Point}
 */
function calculateRedPipeStartingPoint(slabHeater, slabHeaterGroup) {
    const angleRad = SlabHeaterGroupCalculations.getTotalAngleRad(slabHeaterGroup);
    const middlePoint = slabHeater.boundingBox.middlePoint;
    const lengthOffset = slabHeaterGroup.lengthInPixels / 2;
    const widthOffset = (slabHeaterGroup.widthInPixels - SlabHeatingPlannerApplicationState.tubeDistanceInPixels) / 2;
    const rotatedOffsetVector = PointCalculations.rotatePoint(
        PointCalculations.rotatePoint(
            // @ts-ignore
            CreatePoint.createPoint(lengthOffset, widthOffset), PI
        ), 
    angleRad);


    return PointCalculations.addPoints([middlePoint, rotatedOffsetVector]);
}

/**
 * Kiszámítja a paraméterül kapott födémfűtő kék csövének kezdőpontját.
 * 
 * @param {SlabHeater} slabHeater 
 * @param {SlabHeaterGroup} slabHeaterGroup 
 * @returns {Point}
 */
function calculateBluePipeStartingPoint(slabHeater, slabHeaterGroup) {
    const angleRad = SlabHeaterGroupCalculations.getTotalAngleRad(slabHeaterGroup);
    const middlePoint = slabHeater.boundingBox.middlePoint;
    const lengthOffset = slabHeaterGroup.lengthInPixels / 2;
    const widthOffset = -1 * (slabHeaterGroup.widthInPixels - SlabHeatingPlannerApplicationState.tubeDistanceInPixels) / 2;
    const rotatedOffsetVector = PointCalculations.rotatePoint(
        PointCalculations.rotatePoint(
            // @ts-ignore
            CreatePoint.createPoint(lengthOffset, widthOffset), PI
        ), 
    angleRad);


    return PointCalculations.addPoints([middlePoint, rotatedOffsetVector]);
}

/**
 * Kiszámítja az egyik cső nyomvonalát.
 * 
 * @param {PipeDriver} pipeDriver 
 * @param {Point} startingPoint 
 * @returns {Line[]}
 */
function calculatePipe(pipeDriver, startingPoint) {
    const pipePoints = [startingPoint];

    let i = 1;
    while (i < pipeDriver.points.length) {
        const cornerLine = calculateCornerLineAtIndex(pipeDriver, i);
        const pipeLine = calculatePipeLineAtIndex(pipeDriver, pipePoints, i);
        const offsetLines = calculateOffsetLinesAtIndex(pipeDriver, i);

        const cornerLinePipeLineIntersection = LineCalculations.calculateIntersectionPointOfTwoLines(cornerLine, pipeLine);
        const offsetLinePipeLineIntersections = offsetLines.map(offsetLine => LineCalculations.calculateIntersectionPointOfTwoLines(offsetLine, pipeLine));
        const intersection = offsetLinePipeLineIntersections.sort((ip1, ip2) => compareDistanceFromIntersection(ip1, ip2, cornerLinePipeLineIntersection))[0];
        pipePoints.push(intersection);

        i++;
    }

    const pipeLines = [];
    i = 1;
    while (i < pipePoints.length) {
        pipeLines.push(CreateLine.createLine(pipePoints[i - 1], pipePoints[i]))
        i++;
    }
    return pipeLines;
}

/**
 * Kiszámítja az i-edik node sarokvonalát.
 * 
 * @param {PipeDriver} pipeDriver 
 * @param {number} i 
 * @returns {Line}
*/
function calculateCornerLineAtIndex(pipeDriver, i) {
    if (i === 0) {
        throw new Error('Cornerline at node 0 is not defined!');
    }

    const points = pipeDriver.points;
    const p0 = points[i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];

    if (!p2) {
        const lastSegment = pipeDriver.segments[pipeDriver.segments.length - 1];
        return CreateLine.createPerpendicularLine(lastSegment, p1);
    }

    const deltaX = p2.x - p0.x;
    const deltaY = p2.y - p0.y;
    const direction = Math.sign(deltaX * deltaY) * -1;

    // @ts-ignore
    return CreateLine.createLineByPointAndAngle(p1, direction * HALF_PI / 2);
}

/**
 * Kiszámítja az i-edik csővonalat.
 * 
 * @param {PipeDriver} pipeDriver 
 * @param {Point[]} pipePoints
 * @param {number} i 
 * @returns {Line}
*/
function calculatePipeLineAtIndex(pipeDriver, pipePoints, i) {
    const pipePoint = pipePoints[i - 1];
    const segment = pipeDriver.segments[i - 1];

    return CreateLine.createLineParallelTo(segment, pipePoint);
}

/**
 * Kiszámítja az i-edik szegmens offset vonalait.
 * 
 * @param {PipeDriver} pipeDriver 
 * @param {number} i 
 * @returns {Line[]}
*/
function calculateOffsetLinesAtIndex(pipeDriver, i) {
    const offsetDistance = SlabHeatingPlannerApplicationState.pipeDistanceFromMiddleLineInPixels;
    const segment = pipeDriver.segments[i];

    if (!segment) {
        const lastPoint = pipeDriver.points[pipeDriver.points.length - 1];
        const lastSegment = pipeDriver.segments[pipeDriver.segments.length - 1];
        return [CreateLine.createPerpendicularLine(lastSegment, lastPoint)];
    }

    return [
        CreateLine.createOffsetParallelLine(segment, offsetDistance),
        CreateLine.createOffsetParallelLine(segment, -1 * offsetDistance),
    ];
}

/**
 * Komparátor függvény
 * 
 * @param {Point} p1 
 * @param {Point} p2 
 * @param {Point} intersection 
 * @returns {number}
 */
function compareDistanceFromIntersection(p1, p2, intersection) {
    return PointCalculations.calculateDistance(p1, intersection) - PointCalculations.calculateDistance(p2, intersection);
}

/**
 * Lerádiuszolja a csőnyomvonal sarkait
 * 
 * @param {Line[]} pipes 
 * @returns {undefined}
 */
function applyRadiusToPipes(pipes) {
    const clipSize = SlabHeatingPlannerApplicationState.pipeRadiusInPixels;
    const lastIndex = pipes.length - 1;
    const firstPipe = pipes[0];
    const lastPipe = pipes[lastIndex];

    pipes[0] = CreateLine.clipLinesEnd(firstPipe, clipSize);
    pipes[lastIndex] = CreateLine.clipLinesBeginning(lastPipe, clipSize);
    let i = 1;
    while (i < lastIndex) {
        pipes[i] = CreateLine.clipLine(pipes[i], clipSize);
        i++;
    }

}

/**
 * Csőnyomvonal újrakalkuláló műveletek
 */
export const PipeDriverPipeCalculations = {
    calculatePipesForPipeDriver
};