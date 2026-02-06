import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { CreatePoint } from "../../../common/geometry/point/createPoint.js";
import { Point } from "../../../common/geometry/point/Point.js";
import { PointCalculations } from "../../../common/geometry/point/PointCalculations.js";
import { RectangleCalculations } from "../../../common/geometry/Rectangle/RectangleCalculations.js";
import { MathTools } from "../../../common/math/MathTools.js";
import { MouseCursor } from "../../../common/ui/MouseCursor.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { Box } from "../../entities/Box.js";
import { PipeDriver } from "../../entities/PipeDriver.js";
import { BoxService } from "../../service/BoxService.js";
import { SlabHeaterGroupService } from "../../service/SlabHeaterGroupService.js";
import { SlabHeaterService } from "../../service/SlabHeaterService.js";
import { SlabHeaterGroupCalculations } from "../slabHeaterGroup/SlabHeaterGroupCalculations.js";

/**
 * Kiszámítja a csővezető első pontját.
 * 
 * @param {PipeDriver} pipeDriver 
 * @returns {Point}
 */
function calculateFirstPointOfPipeDriver(pipeDriver) {
    const slabHeater = SlabHeaterService.findById(pipeDriver.slabHeaterId);
    const slabHeaterGroup = SlabHeaterGroupService.findById(slabHeater.groupId);
    const slabHeaterGroupRadius = MathTools.roundNumber(SlabHeatingPlannerApplicationState.tubeDistanceInPixels, 2);

    if (!slabHeater.boundingBox) {
        return undefined;
    }

    const middlePoint = slabHeater.boundingBox.middlePoint;
    const offsetVector = PointCalculations.rotatePoint(
        CreatePoint.createPoint((slabHeaterGroupRadius * 1.5 + slabHeaterGroup.lengthInPixels / 2), 0),
        // @ts-ignore
        SlabHeaterGroupCalculations.getTotalAngleRad(slabHeaterGroup) + PI
    );

    return PointCalculations.addPoints([middlePoint, offsetVector]);
}

/**
 * Megállapítja, hogy az egérkurzor valamelyik csőnyomvonal node-on belül van-e
 * 
 * @param {PipeDriver} pipeDriver 
 */
function mouseCursorIsInsidePipeDriversPoint(pipeDriver) {
    if (MouseCursor.mouseCursorIsInsideUi()) {
        return false;
    }

    const points = pipeDriver.points;
    const mousePos = MouseCursor.getMousePositionAbsolute();
    const maxDistance = SlabHeatingPlannerApplicationState.pipeDriverNodeDiameterInPixels / 2;
    const selectablePoints = points.filter(p => PointCalculations.calculateDistance(p, mousePos) < maxDistance);

    return selectablePoints.length > 0;
}

/**
 * Újrakalkulálja a constrainteket.
 * 
 * @param {{pipeDriver: PipeDriver, secondToLastPoint: Point, lastPoint: Point}} param0 
 * @returns {Point}
 */
function calculateNextPointConstraint({pipeDriver, secondToLastPoint, lastPoint}) {
    const constraints = {
        x: undefined,
        y: undefined
    };

    if (!secondToLastPoint) {
        const slabHeater = SlabHeaterService.findById(pipeDriver.slabHeaterId);
        const slabHeaterGroup = SlabHeaterGroupService.findById(slabHeater.groupId);
        const alignment = slabHeaterGroup.alignment;
        if (alignment % 2 === 0) {
            constraints.y = slabHeater.boundingBox.middlePoint.y;
        } else {
            constraints.x = slabHeater.boundingBox.middlePoint.x;
        }
    } else {
        if (MathTools.floatingPointEquals(lastPoint.x, secondToLastPoint.x)) {
            constraints.y = lastPoint.y;
        } else if (MathTools.floatingPointEquals(lastPoint.y, secondToLastPoint.y)) {
            constraints.x = lastPoint.x;
        }
    }

    return constraints;
}

/**
 * Visszaadja a ponthoz legközelebbi rácspontot a csőnyomvonal rácson
 * 
 * @param {Point} point 
 * @returns {Point}
 */
function mapPointToPipeDriverGrid(point) {
    const gridSeed = ApplicationState.gridSeed;
    const gridResolutionPixel = SlabHeatingPlannerApplicationState.pipeDriverGridResolutionInPixels;

    if (!gridSeed || !gridResolutionPixel) {
        return point;
    }

    const x = gridSeed.x + Math.round((point.x - gridSeed.x) / gridResolutionPixel) * gridResolutionPixel;
    const y = gridSeed.y + Math.round((point.y - gridSeed.y) / gridResolutionPixel) * gridResolutionPixel;

    return CreatePoint.createPoint(x, y);
}

/**
 * Visszaadja az egér pozícióját a csőnyomvonal rácsra igazítva
 * 
 * @returns {Point}
 */
function getMousePositionOnPipeDriverGrid() {
    const point = MouseCursor.getMousePositionAbsolute();
    return mapPointToPipeDriverGrid(point);
}

/**
 * Visszaadja azokat a pontokat, amelyek az egér közelében vannak.
 * 
 * @param {PipeDriver} pipeDriver
 * @returns {Point[]}
 */
function getPointsCloseToMouse(pipeDriver) {
    const minimumSegmentLength = SlabHeatingPlannerApplicationState.pipeDriverSegmentMinimumLengthInPixels;
    const mousePosition = PipeDriverCalculations.getMousePositionOnPipeDriverGrid();

    return pipeDriver.points.filter(p => PointCalculations.calculateDistance(p, mousePosition) < minimumSegmentLength);
}

/**
 * Visszaadja a csőnyomvonalba csatolható doboz középpontját, ha van ilyen.
 * 
 * @param {Point} point 
 * @returns {Box}
 */
function getAttachableBox(point) {
    const boxes = BoxService.findAll();
    const boxesToConsider = boxes.filter(b => RectangleCalculations.pointIsInsideRectangle(point, b.selectionBox));
    return boxesToConsider[0];
}

/**
 * Visszaadja, hogy a jelen beállítások mellett a csőnyomvonal bővíthető-e.
 * 
 * @param {PipeDriver} pipeDriver 
 * @returns {boolean}
 */
function pipeDriverIsSetUpForExtension(pipeDriver) {
    if (pipeDriver.isFinalized) {
        return false;
    }

    return pipeDriver.isSelectedForDrag && pipeDriver.selectedPointIndex === (pipeDriver.points.length - 1);
}

/**
 * Csőnyomvonal kalkulációk
 */
export const PipeDriverCalculations = {
    getAttachableBox,
    getPointsCloseToMouse,
    mapPointToPipeDriverGrid,
    calculateNextPointConstraint,
    pipeDriverIsSetUpForExtension,
    calculateFirstPointOfPipeDriver,
    getMousePositionOnPipeDriverGrid,
    mouseCursorIsInsidePipeDriversPoint
};