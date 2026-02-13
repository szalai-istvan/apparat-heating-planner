import { SelectionAction } from "../../../common/actions/selection/SelectionAction.js";
import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { PipeDriver } from "../../entities/PipeDriver.js";
import { BoxService } from "../../service/BoxService.js";
import { SelectPipeDriverAction } from "./SelectPipeDriverAction.js";
import { UpdatePipeDriverAction } from "./UpdatePipeDriverAction.js";

/**
 * Függően a kiválasztott pipedriver állapotától vagy resetteli, vagy törli az utolsó pontot.
 * 
 * @returns {undefined}
 */
function performDeleteOnSelectedPipeDriver() {
    const pipeDriver = SlabHeatingPlannerApplicationState.selectedPipeDriver;
    if (!pipeDriver) {
        return;
    }

    if (pipeDriver.isSelectedForDrag) {
        removeLastPoint(pipeDriver);
    } else {
        resetPipeDriver(pipeDriver);
    }

    SelectionAction.deselectObject();
}

/**
 * Visszaállítja eredeti állapotába a kiválasztott csőnyomvonalat
 * 
 * @returns {undefined}
 */
function resetSelectedPipeDriver() {
    resetPipeDriver(SlabHeatingPlannerApplicationState.selectedPipeDriver);
}

/**
 * Visszaállítja eredeti állapotába a paraméteürl kapott csőnyomvonalat
 * 
 * @param {PipeDriver} pipeDriver
 * @returns {undefined}
 */
function resetPipeDriver(pipeDriver) {
    if (!pipeDriver) {
        return;
    }

    pipeDriver.bluePipe = [];
    pipeDriver.redPipe = [];
    pipeDriver.points = [pipeDriver.points[0]];
    pipeDriver.segments = [];
    pipeDriver.proposedPoints = [];
    pipeDriver.proposedSegments = [];
    pipeDriver.isFinalized = false;

    const box = BoxService.findById(pipeDriver.boxId);
    if (box) {
        box.pipeDriverId = null
    }
    pipeDriver.boxId = null;

    SlabHeatingPlannerApplicationState.selectedPipeDriver = null;
    ApplicationState.selectedObject = null;
    pipeDriver.isSelected = false;
    pipeDriver.isSelectedForDrag = false;
}

/**
 * Törli a pipeDriver utolsó pontját.
 * 
 * @param {PipeDriver} pipeDriver 
 * @returns {undefined}
 */
function removeLastPoint(pipeDriver) {
    if (pipeDriver.points.length <= 1) {
        return;
    }

    if (pipeDriver.selectedPointIndex < pipeDriver.points.length - 2) {
        return;
    }

    const lastPoint = pipeDriver.points[pipeDriver.points.length - 1];
    const lastSegment = pipeDriver.segments[pipeDriver.segments.length - 1];

    pipeDriver.points = pipeDriver.points.filter(p => p !== lastPoint);
    pipeDriver.segments = pipeDriver.segments.filter(s => s !== lastSegment);
    pipeDriver.bluePipe = [];
    pipeDriver.redPipe = [];
    pipeDriver.proposedPoints = [];
    pipeDriver.proposedSegments = [];
    pipeDriver.isFinalized = false;

    UpdatePipeDriverAction.recalculateSegments(pipeDriver);
}

/**
 * Csőnyomvonalak törlésével kapcsolatos műveletek
 */
export const DeletePipeDriverAction = {
    resetSelectedPipeDriver,
    resetPipeDriver,
    performDeleteOnSelectedPipeDriver
};