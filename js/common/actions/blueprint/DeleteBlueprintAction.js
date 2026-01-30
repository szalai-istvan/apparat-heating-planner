import { Blueprint } from "../../entities/Blueprint.js";
import { BlueprintService } from "../../service/BlueprintService.js";
import { ScalingActions } from "../scaling/ScalingActions.js";

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
 * Tervrajz törlő műveletek.
 */
export const DeleteBlueprintAction = {
	clearBlueprints
};