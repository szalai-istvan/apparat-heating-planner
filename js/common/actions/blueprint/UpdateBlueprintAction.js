import { Blueprint } from "../../entities/Blueprint.js";
import { CreatePoint } from "../../geometry/Point/CreatePoint.js";
import { CreateRectangle } from "../../geometry/Rectangle/CreateRectangle.js";
import { RectangleCalculations } from "../../geometry/Rectangle/RectangleCalculations.js";
import { BlueprintService } from "../../service/BlueprintService.js";
import { BlueprintCalculations } from "./BlueprintCalculations.js";

/**
 * Újraszámítja a paraméterül kapott tervrajz befoglaló adatait.
 * 
 * @param {Blueprint} blueprint 
 * @returns {undefined}
 */
function initializePosition(blueprint) {
    if (!blueprint || blueprint.boundingBox) {
        return;
    }

    const boundingBox = CreateRectangle.createRectangleByMiddlePoint(
        CreatePoint.createPoint(0, 0),
        blueprint.data.width,
        blueprint.data.height,
        0
    );

    blueprint.boundingBox = boundingBox;
    blueprint.selectionBox = boundingBox;
}

/**
 * Újraszámolja az összes tervrajz pozícióját
 * 
 * @returns {undefined}
 */
function recalculateBlueprintPositions() {
    const blueprints = BlueprintService.findAll();
    const allBlueptintsHaveBoundingBoxSet = blueprints.filter(bp => bp.boundingBox).length === blueprints.length;
    if (!allBlueptintsHaveBoundingBoxSet) {
        return;
    }

    let centerPoint = CreatePoint.createPoint(0, 0);

    if (blueprints.length > 0) {
        const blueprint = blueprints[0];
        blueprint.boundingBox = CreateRectangle.createRectangleByMiddlePoint(
            centerPoint,
            blueprint.data.width,
            blueprint.data.height,
            BlueprintCalculations.getAngleRad(blueprint)
        );
        blueprint.selectionBox = blueprint.boundingBox;
    } 
    
    if (blueprints.length > 1) {
        let index = 1;
        while (index < blueprints.length) {
            const previousBlueprint = blueprints[index - 1];
            const blueprint = blueprints[index];

            const xProjectionPrevious = RectangleCalculations.getProjectedSizeX(previousBlueprint.boundingBox);
            const xProjection = RectangleCalculations.getProjectedSizeX(blueprint.boundingBox);
            centerPoint.x = centerPoint.x + (xProjectionPrevious + xProjection) / 2;

            blueprint.boundingBox = CreateRectangle.createRectangleByMiddlePoint(
                centerPoint,
                blueprint.data.width,
                blueprint.data.height,
                BlueprintCalculations.getAngleRad(blueprint)
            );
            blueprint.selectionBox = blueprint.boundingBox;
            index++;
        }
    }
}

/**
 * Inkrementálja a megadott értékkel a tervrajz szögét.
 * 
 * @param {Blueprint} blueprint 
 * @param {number} angleRad
 * 
 * @returns {undefined}
 */
function incrementBlueprintAngle(blueprint, angleRad) {
    if (!blueprint) {
        return;
    }

    const blueprintMiddlePoint = blueprint.boundingBox.middlePoint;
    blueprint.angleRad = BlueprintCalculations.getAngleRad(blueprint) + angleRad;
    blueprint.boundingBox = CreateRectangle.createRectangleByMiddlePoint(
        CreatePoint.createPoint(blueprintMiddlePoint.x, blueprintMiddlePoint.y),
        blueprint.data.width,
        blueprint.data.height,
        blueprint.angleRad
    );

    recalculateBlueprintPositions();
}

/**
 * Tervrajzok módosításával kapcsolatos műveletek gyüjteménye.
 */
export const UpdateBlueprintAction = {
    initializePosition,
    recalculateBlueprintPositions,
    incrementBlueprintAngle
};