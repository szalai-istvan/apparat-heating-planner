import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { SlabHeaterGroupService } from "../../service/SlabHeaterGroupService.js";
import { SlabHeaterService } from "../../service/SlabHeaterService.js";

/**
 * Eltávolítja a kiválasztott kapott födémfűtő csoportot.
 * 
 * @returns {undefined}
 */
function removeSelectedSlabHeaterGroup() {
    const slabHeaterGroup = SlabHeatingPlannerApplicationState.selectedSlabHeaterGroup;
    if (!slabHeaterGroup) {
        return;
    }

    slabHeaterGroup.slabHeaterIds.forEach(pid => SlabHeaterService.removeById(pid));
    SlabHeaterGroupService.removeById(slabHeaterGroup.id);
    SlabHeatingPlannerApplicationState.selectedSlabHeaterGroup = null;
    ApplicationState.selectedObject = null;
}

/**
 * Törli az összes födémfűtő csoportot.
 * 
 * @returns {undefined}
 */
function clearSlabHeaterGroups() {
    SlabHeaterGroupService.removeAll();
    SlabHeaterService.removeAll();
    
    SlabHeatingPlannerApplicationState.selectedSlabHeaterGroup = null;
    ApplicationState.selectedObject = null;
}

/**
 * födémfűtő csoportok törlésével kapcsolatos műveletek.
 */
export const DeleteSlabHeaterGroupAction = {
    removeSelectedSlabHeaterGroup,
    clearSlabHeaterGroups
};