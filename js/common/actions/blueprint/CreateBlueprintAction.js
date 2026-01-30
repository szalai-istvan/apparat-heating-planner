import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Blueprint } from "../../entities/Blueprint.js";
import { CreatePoint } from "../../geometry/Point/CreatePoint.js";
import { BlueprintService } from "../../service/BlueprintService.js";
import { ElementStore } from "../../store/ElementStore.js";
import { BlueprintCalculations } from "./BlueprintCalculations.js";
import { UpdateBlueprintAction } from "./UpdateBlueprintAction.js";

/**
 * Tervrajz hozzáadása a rajzlaphoz.
 * 
 * @param {any} data adatcsomag
 * @returns {undefined}
 */
function createBlueprint(data) {
    const blueprint = new Blueprint(data);
    ElementStore.save(blueprint);
    // todo select blueprint
    tryUntilSuccessfulRecalculatePositions(blueprint);
}

/** @param {Blueprint} blueprint */
function tryUntilSuccessfulRecalculatePositions(blueprint) {
    if (blueprint.data.width > 1 && blueprint.data.height > 1) {
        UpdateBlueprintAction.initializePosition(blueprint);
        UpdateBlueprintAction.recalculateBlueprintPositions();
        ApplicationState.screenSumDrag = CreatePoint.createPoint(-1 * BlueprintCalculations.getCenterPosition(blueprint).x, 0);
    } else {
        setTimeout(() => tryUntilSuccessfulRecalculatePositions(blueprint), 50);
    }
}

/**
 * Tervrajzok létrehozásával kapcsolatos műveletek.
 */
export const CreateBlueprintAction = {
    createBlueprint
};