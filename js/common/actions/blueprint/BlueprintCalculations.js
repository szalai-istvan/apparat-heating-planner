import { Blueprint } from "../../entities/Blueprint.js";
import { CreatePoint } from "../../geometry/Point/CreatePoint.js";
import { Point } from "../../geometry/Point/Point.js";
import { BlueprintService } from "../../service/BlueprintService.js";
import { ElementStore } from "../../store/ElementStore.js";

/**
 * Visszaadja a tervrajz szögét.
 * 
 * @param {Blueprint} blueprint 
 * @returns {number}
 */
function getAngleRad(blueprint) {
    if (!blueprint) {
        return;
    }

    return blueprint.boundingBox.lines[1].angleRad;
}

/**
 * Visszaadja a tervrajz középpontját.
 * 
 * @param {Blueprint} blueprint 
 * @returns {Point}
 */
function getCenterPosition(blueprint) {
    if (!blueprint || !blueprint.boundingBox) {
        return CreatePoint.createPoint(0, 0);
    }

    return blueprint.boundingBox.middlePoint;
}

/**
 * Megállapítja, hogy vannak-e tervrajzok a rajzlapon.
 * 
 */
function blueprintDataIsPresent() {
    return BlueprintService.findAll().length > 0;
}

/**
 * Tervrajzokkal kapcsolatos számítások.
 */
export const BlueprintCalculations = {
    getAngleRad,
    getCenterPosition,
    blueprintDataIsPresent
};