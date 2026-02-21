import { SelectionCriteria } from "../../../common/actions/selection/SelectionCriteria.js";
import { Constants } from "../../../common/appdata/constants.js";
import { Validators } from "../../../common/validators/Validators.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { SlabHeatingPlannerConstants } from "../../appdata/SlabHeatingPlannerConstants.js";
import { Box } from "../../entities/Box.js";
import { BoxGroup } from "../../entities/BoxGroup.js";
import { BoxService } from "../../service/BoxService.js";
import { UpdateBoxGroupAction } from "./UpdateBoxGroupAction.js";

/**
 * Felrajzolja a képernyőre a paraméterül kapott doboz csoportot
 * 
 * @param {BoxGroup} boxGroup
 * @returns {undefined} 
 */
function renderBoxGroup(boxGroup) {
    Validators.checkClass(boxGroup, SlabHeatingPlannerConstants.classNames.boxGroup);

    if (boxGroup.isSelectedForDrag) {
        UpdateBoxGroupAction.updateAngleRadAndCenterPositions(boxGroup);
    }

    const boxes = BoxService.findByIdList(boxGroup.boxIds);
    boxes.forEach(b => renderBox(b, boxGroup));
}

/**
 * Felrajzolja a paraméterül kapott dobozt a képernyőre
 * 
 * @param {Box} box
 * @param {BoxGroup} boxGroup
 * @returns {undefined}
 */
function renderBox(box, boxGroup) {
    Validators.checkClass(box, SlabHeatingPlannerConstants.classNames.box);

    if (!box.boundingBox) {
        return;
    }

    const center = box.boundingBox.middlePoint;
    const alignment = boxGroup.alignment;
    const width = SlabHeatingPlannerApplicationState.boxWidthInPixels;
    const length = SlabHeatingPlannerApplicationState.boxLengthInPixels;
    const mouseIsInside = SelectionCriteria.evaluateSelectionCriteria(box);

    // @ts-ignore
    push();
    
    // @ts-ignore
    translate(center.x, center.y);
    // @ts-ignore
    rotate(alignment * HALF_PI);
    // @ts-ignore
    rectMode(CENTER);
    if (mouseIsInside || boxGroup.isSelected) {
        // @ts-ignore
        stroke(Constants.strings.red);
    } else {
        // @ts-ignore
        stroke(Constants.strings.black);
    }
    
    // @ts-ignore
    strokeWeight(SlabHeatingPlannerApplicationState.boxLineWeightInPixels);
    
    // @ts-ignore
    fill(Constants.strings.white);
    // @ts-ignore
    rect(0, 0, width, length);
    
    // @ts-ignore
    pop();
}

/**
 * Dobozcsoportok felrajzolásával kapcsolatos műveletek.
 */
export const RenderBoxGroup = {
    renderBoxGroup
};