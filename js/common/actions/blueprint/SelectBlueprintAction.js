import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Constants } from "../../appdata/Constants.js";
import { Blueprint } from "../../entities/Blueprint.js";
import { BlueprintService } from "../../service/BlueprintService.js";
import { Validators } from "../../validators/Validators.js";
import { SelectionAction } from "../selection/SelectionAction.js";
import { SelectionCriteria } from "../selection/SelectionCriteria.js";

/** @type {Blueprint} */
let cachedSelectableBlueprint = null;

/**
 * Megkeresi a kiválasztható tervrajzot és visszaadja.
 * 
 * @param {Blueprint} blueprint, opcionális paraméter.
 * @returns {Blueprint}
 */
function selectBlueprint(blueprint = undefined) {
    Validators.checkClass(blueprint, Constants.classNames.blueprint, true);

    blueprint = blueprint || checkForSelectableBlueprint();
    if (!blueprint) {
        return undefined;
    }

    if (SelectionAction.deselectObject()) {
        blueprint.isSelected = true;
        ApplicationState.selectedBlueprint = blueprint;
        return blueprint;
    }

    return undefined;
}

/**
 * Kiválasztható tervrajz megkeresése.
 * 
 * @returns {Blueprint}
 */
function checkForSelectableBlueprint() {
    if (cachedSelectableBlueprint) {
        return cachedSelectableBlueprint;
    }

    const selection = BlueprintService.findAll().filter(bp => SelectionCriteria.evaluateSelectionCriteria(bp));
    const blueprint = selection[0];
    if (blueprint) {
        cachedSelectableBlueprint = blueprint;
        return blueprint;
    }

    return undefined;
}

/**
 * Megszűnteti a kiválasztott tervrajz kijelöltségét.
 * 
 * @returns {boolean} true, ha a megszűntetés sikeres
 */
function deselectBlueprint() {
    ApplicationState.selectedBlueprint.isSelected = false;
    ApplicationState.selectedBlueprint = null;
    return true;
}

/**
 * Törli a kiválasztásra cachelt tervrajzot
 * 
 * @returns {undefined}
 */
function clearBlueprintSelectionCache() {
    cachedSelectableBlueprint = null;
}

/**
 * Tervrajzok kiválasztásával kapcsolatos műveletek
 */
export const SelectBlueprintAction = {
    selectBlueprint,
    deselectBlueprint,
    clearBlueprintSelectionCache
};