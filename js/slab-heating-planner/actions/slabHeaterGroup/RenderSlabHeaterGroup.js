import { SelectionCriteria } from "../../../common/actions/selection/SelectionCriteria.js";
import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { Constants } from "../../../common/appdata/constants.js";
import { MathTools } from "../../../common/math/MathTools.js";
import { Validators } from "../../../common/validators/Validators.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { SlabHeatingPlannerConstants } from "../../appdata/SlabHeatingPlannerConstants.js";
import { SlabHeater } from "../../entities/SlabHeater.js";
import { SlabHeaterGroup } from "../../entities/SlabHeaterGroup.js";
import { SlabHeaterService } from "../../service/SlabHeaterService.js";
import { SlabHeaterGroupCalculations } from "./SlabHeaterGroupCalculations.js";
import { UpdateSlabHeaterGroupAction } from "./UpdateSlabHeaterGroupAction.js";

/**
 * Felrajzolja a rajzlapra a paraméterül kapott födémfűtő csoportot
 * 
 * @param {SlabHeaterGroup} slabHeaterGroup födémfűtő csoport
 * @returns {undefined}
 */
function renderSlabHeaterGroup(slabHeaterGroup) {
    Validators.checkClass(slabHeaterGroup, SlabHeatingPlannerConstants.classNames.slabHeaterGroup);
    if (slabHeaterGroup.isSelectedForDrag) {
        UpdateSlabHeaterGroupAction.updateAngleRadAndCenterPositions(slabHeaterGroup);
    }
    const slabHeaters = SlabHeaterService.findByIdList(slabHeaterGroup.slabHeaterIds);
    slabHeaters.forEach(sh => renderSlabHeater(sh, slabHeaterGroup));
}

/**
 * Felrajzolja a rajzlapra a paraméterül kapott födémfűtőt
 * 
 * @param {SlabHeater} slabHeater födémfűtő
 * @param {SlabHeaterGroup} group
 * @returns {undefined}
 */
function renderSlabHeater(slabHeater, group) {
    const alignment = group.alignment;
    const centerPosition = slabHeater.boundingBox.middlePoint;
    const lineWeight = SlabHeatingPlannerApplicationState.slabHeaterLineWeightInPixels;
    const width = group.widthInPixels;
    const length = group.lengthInPixels;
    const tubeDistance = MathTools.roundNumber(SlabHeatingPlannerApplicationState.tubeDistanceInPixels, 2);
    const lengthFrom = - group.lengthInPixels / 2;
    const lengthTo = group.lengthInPixels / 2;
    const diameter = tubeDistance;
    const stopThreshold = SlabHeatingPlannerApplicationState.slabHeaterStopDrawingThresholdInPixels;
    const textSizePixels = SlabHeatingPlannerApplicationState.slabHeaterTextSizeInPixels;
    const type = group.type;
    const rectWidth = SlabHeatingPlannerApplicationState.slabHeaterTextboxWidthInPixels;
    const rectHeight = SlabHeatingPlannerApplicationState.slabHeaterTextboxHeightInPixels;
    const isSelected = group.isSelected;
    const p = SlabHeatingPlannerConstants.slabHeater.slabHeaterTextPopFactor;
    const pointIsInsideGroupMemberTextBox = SelectionCriteria.evaluateSelectionCriteria(slabHeater);
    const rowNumber = slabHeater.rowNumber;

    if (!centerPosition) {
        return;
    }

    // @ts-ignore
    push();

    // @ts-ignore
    translate(centerPosition.x, centerPosition.y);
    // @ts-ignore
    rotate(alignment * HALF_PI);

    // @ts-ignore
    strokeWeight(lineWeight);
    // @ts-ignore
    noFill();

    let tube = MathTools.roundNumber(- width / 2 + tubeDistance / 2, 2);
    // @ts-ignore
    let angles = [HALF_PI * 3, HALF_PI];
    let arcX = lengthTo;
    // @ts-ignore
    stroke(Constants.strings.red);
    const limit = MathTools.roundNumber(-1 * tube, 2);

    let i = 0;
    let pipeCount = MathTools.roundNumber(Math.abs(tube - limit) / tubeDistance, 0);
    let middlePipeIndex = MathTools.roundNumber(pipeCount / 2, 1) + 0.5;
    while (Math.abs(tube - limit) > stopThreshold) {
        if (i === middlePipeIndex) {
            // @ts-ignore
            stroke(Constants.strings.blue);
        }
        // @ts-ignore
        line(lengthFrom, tube, lengthTo, tube);


        // @ts-ignore
        arc(arcX, tube + tubeDistance / 2, diameter, diameter, angles[0], angles[1]);

        angles = [angles[1], angles[0]];
        arcX *= -1;
        tube = MathTools.roundNumber(tube + tubeDistance, 2);
        i++;
    }
    // @ts-ignore
    line(lengthFrom, tube, lengthTo, tube);

    // @ts-ignore
    textAlign(CENTER, CENTER);

    // @ts-ignore
    textSize(textSizePixels * (1 + p * Number(isSelected) + p * Number(pointIsInsideGroupMemberTextBox)));
    // @ts-ignore
    stroke(Constants.strings.black);
    // @ts-ignore
    fill(Constants.strings.white);
    // @ts-ignore
    rectMode(CENTER);
    // @ts-ignore
    rect(0, 0, rectWidth, rectHeight);

    if (isSelected || (pointIsInsideGroupMemberTextBox)) {
        // @ts-ignore
        fill(Constants.ui.selectedTextColor);
    } else {
        // @ts-ignore
        fill(Constants.ui.defaultTextColor);
    }
    // @ts-ignore
    noStroke();

    if (alignment > 1) {
        // @ts-ignore
        rotate(PI);
    }

    const label = slabHeater.pipeLength > 0 ? type + '\n' + slabHeater.pipeLength + ' m' : type;
    // @ts-ignore
    text(label, 0, 0);

    
    stroke(slabHeater.outlineColor);
    noFill();
    rect(0, 0, length + SlabHeatingPlannerApplicationState.tubeDistanceInPixels * 1.5, width - 0.02 * ApplicationState.pixelsPerMetersRatio);
    
    const bubbleDiameter = SlabHeatingPlannerApplicationState.rowNumberBubbleDiameterInPixels;
    const numberCoordX = -1 * (alignment < 2 ? -1 : 1) * (bubbleDiameter / 2 + rectWidth / 2 + SlabHeatingPlannerApplicationState.rowNumberBubbleDistanceFromLabelInPixels);
    stroke(Constants.strings.black);
    fill(slabHeater.outlineColor);
    ellipse(numberCoordX, 0, bubbleDiameter, bubbleDiameter);
    fill(Constants.strings.black);
    textSize(textSizePixels);
    noStroke();
    text(rowNumber, numberCoordX, 0);

    // @ts-ignore
    pop();
}

/**
 * Födémfűtő csoportok renderelési műveletei
 */
export const RenderSlabHeaterGroup = {
    renderSlabHeaterGroup
};