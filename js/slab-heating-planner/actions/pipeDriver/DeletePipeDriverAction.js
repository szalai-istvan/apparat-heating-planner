import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { ClassUtil } from "../../../common/util/ClassUtil.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { SlabHeatingPlannerConstants } from "../../appdata/SlabHeatingPlannerConstants.js";
import { PipeDriver } from "../../entities/PipeDriver.js";
import { BoxService } from "../../service/BoxService.js";
import { PipeDriverCalculations } from "./PipeDriverCalculations.js";
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

    setTimeout(() => ApplicationState.selectedObject = pipeDriver, 100);
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
    pipeDriver.points = [PipeDriverCalculations.calculateFirstPointOfPipeDriver(pipeDriver)];
    pipeDriver.segments = [];
    pipeDriver.proposedPoints = [];
    pipeDriver.proposedSegments = [];
    UpdatePipeDriverAction.setIsFinalized(pipeDriver, false);

    const box = BoxService.findById(pipeDriver.boxId);
    if (box) {
        box.pipeDriverId = null;
    }
    pipeDriver.boxId = null;

    SlabHeatingPlannerApplicationState.selectedPipeDriver = null;
    if (ClassUtil.getClassName(ApplicationState.selectedObject) === SlabHeatingPlannerConstants.classNames.pipeDriver) {
        ApplicationState.selectedObject = null;
    }
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

    if (!pipeDriver.selectedPointIndex) {
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
    UpdatePipeDriverAction.setIsFinalized(pipeDriver, false);

    UpdatePipeDriverAction.recalculateSegments(pipeDriver);
    SelectPipeDriverAction.selectLastPoint(pipeDriver);
}

/**
 * Csőnyomvonalak törlésével kapcsolatos műveletek
 */
export const DeletePipeDriverAction = {
    resetSelectedPipeDriver,
    resetPipeDriver,
    performDeleteOnSelectedPipeDriver
};