import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { BoxGroupService } from "../../service/BoxGroupService.js";
import { BoxService } from "../../service/BoxService.js";

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

    boxGroup.boxIds.forEach(pid => BoxService.removeById(pid));
    BoxGroupService.removeById(boxGroup.id);
    SlabHeatingPlannerApplicationState.selectedBoxGroup = null;
    ApplicationState.selectedObject = null;
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