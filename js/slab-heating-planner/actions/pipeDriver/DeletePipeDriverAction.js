import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { BoxService } from "../../service/BoxService.js";

/**
 * Visszaállítja eredeti állapotába a kiválasztott csőnyomvonalat
 * 
 * @returns {undefined}
 */
function resetSelectedPipeDriver() {
    const pipeDriver = SlabHeatingPlannerApplicationState.selectedPipeDriver;
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
 * Csőnyomvonalak törlésével kapcsolatos műveletek
 */
export const DeletePipeDriverAction = {
    resetSelectedPipeDriver
};