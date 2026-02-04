import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Constants } from "../../appdata/Constants.js";
import { Blueprint } from "../../entities/Blueprint.js";
import { RenderRectangle } from "../../geometry/rectangle/RenderRectangle.js";
import { UnitConversions } from "../../math/UnitConversions.js";
import { RotateBlueprintDialog } from "../../ui/dialog/RotateBlueprintDialog.js";
import { Validators } from "../../validators/Validators.js";
import { BlueprintCalculations } from "./BlueprintCalculations.js";

/**
 * Felrajzol egy tervrajzot a rajzlapra.
 * 
 * @param {Blueprint} blueprint tervrajz adat
 * @returns {undefined}
 */
function renderBlueprint(blueprint) {
    Validators.checkClass(blueprint, Constants.classNames.blueprint);
    
    if (!blueprint.boundingBox) {
        return;
    }
    
    const centerPoint = blueprint.boundingBox.middlePoint;
    const data = blueprint.data;
    const boundingBox = blueprint.boundingBox;

    push();

    imageMode(CENTER);
    rectMode(CENTER);
    translate(centerPoint.x, centerPoint.y);
    rotate(getRotationAngle(blueprint));

    image(data,
        0,
        0,
        data.width,
        data.height
    );

    pop();

    if (blueprint.isSelected && boundingBox) {
        RenderRectangle.renderRectangle(boundingBox, Constants.ui.selectedTextColor, 5);
    }


}

/**
 * Megállapítja a tervrajz teljes elforgatottságát.
 * 
 * @param {Blueprint} blueprint 
 * @returns {Number}
 */
function getRotationAngle(blueprint) {
    let angleRad = BlueprintCalculations.getAngleRad(blueprint);

    if (blueprint === ApplicationState.selectedBlueprint) {
        angleRad += RotateBlueprintDialog.getAngle();
    }

    return angleRad;
}

/**
 * Tervrajz renderelő függvények.
 */
export const RenderBlueprint = {
    renderBlueprint
};