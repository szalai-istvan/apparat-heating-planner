import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { ErrorCodes } from "../../../common/errors/ErrorCodes.js";
import { Errors } from "../../../common/errors/Errors.js";
import { CreateLine } from "../../../common/geometry/Line/CreateLine.js";
import { CreatePoint } from "../../../common/geometry/point/createPoint.js";
import { PointCalculations } from "../../../common/geometry/point/PointCalculations.js";
import { MathTools } from "../../../common/math/MathTools.js";
import { MouseCursor } from "../../../common/ui/MouseCursor.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { Box } from "../../entities/Box.js";
import { PipeDriver } from "../../entities/PipeDriver.js";
import { BoxGroupService } from "../../service/BoxGroupService.js";
import { SlabHeaterService } from "../../service/SlabHeaterService.js";
import { PipeDriverCalculations } from "./PipeDriverCalculations.js";
import { PipeDriverPipeCalculations } from "./PipeDriverPipeCalculation.js";

/**
 * Újrakalkulálja a paraméterül kapott csőnyomvonal első pontját.
 * 
 * @param {PipeDriver} pipeDriver 
 */
function updatePipeDriverFirstPointPosition(pipeDriver) {
    const firstPoint = PipeDriverCalculations.calculateFirstPointOfPipeDriver(pipeDriver);
    if (pipeDriver.points.length === 0) {
        pipeDriver.points.push(firstPoint)
    } else {
        pipeDriver.points[0] = firstPoint;
    }
}

/**
 * Újraszámolja a javasolt következő pontot és szegmenseket
 * 
 * @param {PipeDriver} pipeDriver 
 * @returns {undefined}
 */
function updatePropositions(pipeDriver) {
    if (!PipeDriverCalculations.pipeDriverIsSetUpForExtension(pipeDriver)) {
        return;
    }

    const minimumSegmentLength = SlabHeatingPlannerApplicationState.pipeDriverSegmentMinimumLengthInPixels;
    const cursorPosition = PipeDriverCalculations.getMousePositionOnPipeDriverGrid();
    const box = PipeDriverCalculations.getAttachableBox(cursorPosition);
    if (box) {
        cursorPosition.x = box.boundingBox.middlePoint.x;
        cursorPosition.y = box.boundingBox.middlePoint.y;
    }

    const lastPoint = pipeDriver.points[pipeDriver.points.length - 1];
    const secondToLastPoint = pipeDriver.points.length > 1 ? pipeDriver.points[pipeDriver.points.length - 2] : undefined;
    if (PointCalculations.calculateDistance(lastPoint, cursorPosition) < minimumSegmentLength) {
        pipeDriver.proposedPoints = [];
        pipeDriver.proposedSegments = [];
        return;
    }

    let nextPoint = undefined;
    let nextPointConstraints = undefined;
    if (pipeDriver.points.length === 1) {
        nextPoint = PipeDriverCalculations.calculateSecondPoint(pipeDriver);
    } else {
        nextPointConstraints = PipeDriverCalculations.calculateNextPointConstraint({ pipeDriver, secondToLastPoint, lastPoint });
        nextPoint = CreatePoint.createPoint(
            nextPointConstraints.x || cursorPosition.x,
            nextPointConstraints.y || cursorPosition.y
        );
    }

    if (PointCalculations.calculateDistance(lastPoint, nextPoint) < minimumSegmentLength) {
        pipeDriver.proposedPoints = [];
        pipeDriver.proposedSegments = [];
        return;
    }

    if (PointCalculations.calculateDistance(cursorPosition, nextPoint) < minimumSegmentLength) {
        pipeDriver.proposedPoints = [nextPoint];
        pipeDriver.proposedSegments = [CreateLine.createLine(lastPoint, nextPoint)];
        return;
    }

    nextPointConstraints = PipeDriverCalculations.calculateNextPointConstraint({
        pipeDriver: pipeDriver,
        secondToLastPoint: lastPoint,
        lastPoint: nextPoint
    });

    const secondNextPoint = CreatePoint.createPoint(
        nextPointConstraints.x || cursorPosition.x,
        nextPointConstraints.y || cursorPosition.y
    );

    pipeDriver.proposedPoints = [nextPoint, secondNextPoint];
    pipeDriver.proposedSegments = [
        CreateLine.createLine(lastPoint, nextPoint),
        CreateLine.createLine(nextPoint, secondNextPoint)
    ];

}

/**
 * Hozzáadja a javasolt pontokat és szegmenseket a kiválasztott csőnyomvonalhoz.
 * 
 * @returns {undefined}
 */
function addProposedElementsToSelectedPipeDriver() {
    const pipeDriver = SlabHeatingPlannerApplicationState.selectedPipeDriver;
    if (!pipeDriver) {
        return;
    }

    for (let pp of pipeDriver.proposedPoints) {
        pipeDriver.points.push(pp);
    }

    for (let ps of pipeDriver.proposedSegments) {
        pipeDriver.segments.push(ps);
    }

    pipeDriver.selectedPointIndex += pipeDriver.proposedPoints.length;
    pipeDriver.proposedPoints = [];
    pipeDriver.proposedSegments = [];

    const lastPoint = pipeDriver.points[pipeDriver.points.length - 1];
    const box = PipeDriverCalculations.getAttachableBox(lastPoint);
    if (box) {
        finalizePipeDriver(pipeDriver, box);
    }
}

/**
 * Véglegesíti a pipeDrivert.
 * 
 * @param {PipeDriver} pipeDriver 
 * @param {Box} box 
 */
function finalizePipeDriver(pipeDriver, box) {
    const boxGroup = BoxGroupService.findById(box.groupId);
    const lastSegment = pipeDriver.segments[pipeDriver.segments.length - 1];
    const p0 = lastSegment.p0;
    const p1 = lastSegment.p1;

    if (MathTools.floatingPointEquals(p0.x, p1.x)) {
        if (boxGroup.alignment % 2 === 1) {
            popPipeDriver(pipeDriver);
            Errors.throwError(ErrorCodes.INVALID_DIRECTION_TO_BOX);
        }
    } else if (MathTools.floatingPointEquals(p0.y, p1.y)) {
        if (boxGroup.alignment % 2 === 0) {
            popPipeDriver(pipeDriver);
            Errors.throwError(ErrorCodes.INVALID_DIRECTION_TO_BOX);
        }
    }

    pipeDriver.boxId = box.id;
    box.pipeDriverId = pipeDriver.id;
    pipeDriver.isFinalized = true;

    SlabHeatingPlannerApplicationState.selectedPipeDriver = null;
    ApplicationState.selectedObject = null;
    pipeDriver.isSelected = false;
    pipeDriver.isSelectedForDrag = false;
    PipeDriverPipeCalculations.calculatePipesForPipeDriver(pipeDriver);

    const slabHeater = SlabHeaterService.findById(pipeDriver.slabHeaterId);
    slabHeater.pipeLength = PipeDriverCalculations.calculateLength(pipeDriver);
}

/**
 * Utolsó pont és szegmens eltávolítása
 * 
 * @param {PipeDriver} pipeDriver 
 * @returns {undefined}
 */
function popPipeDriver(pipeDriver) {
    pipeDriver.points.pop();
    pipeDriver.segments.pop();
    pipeDriver.selectedPointIndex = Math.min(pipeDriver.selectedPointIndex, pipeDriver.points.length - 1);
}

/**
 * A kiválasztott pont helyzetének updatelése.
 * 
 * @param {PipeDriver} pipeDriver 
 * @returns {undefined}
 */
function updateSelectedPointPosition(pipeDriver) {
    if (!pipeDriver || !pipeDriver.isSelectedForDrag) {
        return;
    }

    if (MouseCursor.mouseCursorIsInsideUi()) {
        return;
    }

    const index = pipeDriver.selectedPointIndex;
    if (index < 2 || index >= pipeDriver.points.length - 2) {
        return;
    }

    const point = pipeDriver.points[index];
    const mouseCursor = PipeDriverCalculations.mapPointToPipeDriverGrid(MouseCursor.getMousePositionAbsolute());

    const violatingPoints = pipeDriver.points
        .filter(p => p !== point)
        .map(p => PointCalculations.calculateDistance(p, mouseCursor))
        .filter(dist => dist < SlabHeatingPlannerApplicationState.pipeDriverSegmentMinimumLengthInPixels);

    if (violatingPoints.length > 0) {
        return;
    }

    const previousPoint = pipeDriver.points[index - 1];
    const nextPoint = pipeDriver.points[index + 1];

    if (MathTools.floatingPointEquals(previousPoint.x, point.x)) {
        previousPoint.x = mouseCursor.x;
    } else if (MathTools.floatingPointEquals(previousPoint.y, point.y)) {
        previousPoint.y = mouseCursor.y;
    }

    if (MathTools.floatingPointEquals(nextPoint.x, point.x)) {
        nextPoint.x = mouseCursor.x;
    } else if (MathTools.floatingPointEquals(nextPoint.y, point.y)) {
        nextPoint.y = mouseCursor.y;
    }

    pipeDriver.points[index] = mouseCursor;
    pipeDriver.segments[index - 2] && (pipeDriver.segments[index - 2] = CreateLine.createLine(pipeDriver.points[index - 2], previousPoint));
    pipeDriver.segments[index - 1] = CreateLine.createLine(previousPoint, point);
    pipeDriver.segments[index] = CreateLine.createLine(point, nextPoint);
    pipeDriver.segments[index + 1] && (pipeDriver.segments[index + 1] = CreateLine.createLine(nextPoint, pipeDriver.points[index + 2]));
}

/**
 * Szegmensek újrakalkulálása, gyors egérmozgás közbeni deselect esetén szükséges.
 * 
 * @param {PipeDriver} pipeDriver 
 * @returns {undefined}
 */
function recalculateSegments(pipeDriver) {
    let index = 0;
    while (index < pipeDriver.points.length - 2) {
        const p0 = pipeDriver.points[index];
        const p1 = pipeDriver.points[index + 1];
        pipeDriver.segments[index] = CreateLine.createLine(p0, p1);
        index++;
    }
}

/**
 * Csőnyomvonal updatelő műveletek
 */
export const UpdatePipeDriverAction = {
    updatePropositions,
    recalculateSegments,
    updateSelectedPointPosition,
    updatePipeDriverFirstPointPosition,
    addProposedElementsToSelectedPipeDriver
};