import { SelectionAPI } from "../../../common/api/SelectionAPI.js";
import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { BoxGroupService } from "../../service/BoxGroupService.js";
import { BoxService } from "../../service/BoxService.js";
import { PipeDriverService } from "../../service/PipeDriverService.js";
import { DeletePipeDriverAction } from "../pipeDriver/DeletePipeDriverAction.js";

/**
 * Eltávolítja a kiválasztott doboz csoportot.
 * 
 * @returns {undefined}
 */
function removeSelectedBoxGroup() {
    const boxGroup = SlabHeatingPlannerApplicationState.selectedBoxGroup;
    if (!boxGroup) {
        return;
    }

    const boxes = BoxService.findByIdList(boxGroup.boxIds);
    boxes.filter(box => box.pipeDriverId).forEach(box => DeletePipeDriverAction.resetPipeDriver(PipeDriverService.findById(box.pipeDriverId)));
    boxGroup.boxIds.forEach(pid => BoxService.removeById(pid));
    BoxGroupService.removeById(boxGroup.id);

    SelectionAPI.deselectObject();
}

/**
 * Törli az összes födémfűtő csoportot.
 * 
 * @returns {undefined}
 */
function clearBoxGroups() {
    BoxGroupService.removeAll();
    BoxService.removeAll();
    
    SlabHeatingPlannerApplicationState.selectedBoxGroup = null;
    ApplicationState.selectedObject = null;
}

/**
 * födémfűtő csoportok törlésével kapcsolatos műveletek.
 */
export const DeleteBoxGroupAction = {
    removeSelectedBoxGroup,
    clearBoxGroups
};