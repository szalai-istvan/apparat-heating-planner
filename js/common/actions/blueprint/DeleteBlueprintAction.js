import { ApplicationState } from "../../appdata/ApplicationState.js";
import { BlueprintService } from "../../service/BlueprintService.js";
import { ScalingActions } from "../scaling/ScalingActions.js";
import { SelectionAction } from "../selection/SelectionAction.js";
import { UpdateBlueprintAction } from "./UpdateBlueprintAction.js";

/**
 * Törli a rajzlapon található összes tervrajzot és törli a rögzített méretarányokat.
 * 
 * @returns {undefined}
 */
function clearBlueprints() {
	BlueprintService.removeAll();
	ScalingActions.clearScaling();
}

/**
 * Eltávolítja a kiválasztott tervrajzot.
 * 
 * @returns {undefined}
 */
function removeSelectedBlueprint() {
	const selectedBlueprint = ApplicationState.selectedBlueprint;
    if (!selectedBlueprint) {
        return;
    }

	BlueprintService.removeById(selectedBlueprint.id);
    UpdateBlueprintAction.recalculateBlueprintPositions();

	SelectionAction.deselectObject();
    if (BlueprintService.findAll().length === 0) {
        ScalingActions.clearScaling();
    }
}

/**
 * Tervrajz törlő műveletek.
 */
export const DeleteBlueprintAction = {
	clearBlueprints,
	removeSelectedBlueprint
};