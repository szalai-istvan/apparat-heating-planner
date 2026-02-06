import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { PipeDriverService } from "../../service/PipeDriverService.js";
import { SlabHeaterGroupService } from "../../service/SlabHeaterGroupService.js";
import { SlabHeaterService } from "../../service/SlabHeaterService.js";
import { UpdateSlabHeaterGroupAction } from "./UpdateSlabHeaterGroupAction.js";

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

    const slabHeaters = SlabHeaterService.findByIdList(slabHeaterGroup.slabHeaterIds);
    slabHeaters.forEach(sh => PipeDriverService.removeById(sh.pipeDriverId));
    slabHeaterGroup.slabHeaterIds.forEach(pid => SlabHeaterService.removeById(pid));
    SlabHeaterGroupService.removeById(slabHeaterGroup.id);
    SlabHeatingPlannerApplicationState.selectedSlabHeaterGroup = null;
    ApplicationState.selectedObject = null;
    UpdateSlabHeaterGroupAction.updateNumberings();
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
    UpdateSlabHeaterGroupAction.updateNumberings();
}

/**
 * födémfűtő csoportok törlésével kapcsolatos műveletek.
 */
export const DeleteSlabHeaterGroupAction = {
    removeSelectedSlabHeaterGroup,
    clearSlabHeaterGroups
};