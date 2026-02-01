import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { Constants } from "../../../common/appdata/Constants.js";
import { HeatingPlannerApplicationState } from "../../appdata/HeatingPlannerApplicationState.js";
import { HeatingPlannerConstants } from "../../appdata/HeatingPlannerConstants.js";

/**
 * Projekt specifikus renderelési méretek update-elése.
 * 
 * @returns {undefined}
 */
function updateRenderSizeValuesHeatingPlanner() {
    const ratio = ApplicationState.pixelsPerMetersRatio;

    HeatingPlannerApplicationState.panelLineWeight = ratio ? HeatingPlannerConstants.panel.panelContourLineThicknessInMeters * ratio : undefined;
    HeatingPlannerApplicationState.panelTextSize = ratio ? HeatingPlannerConstants.panel.panelTextSizeInMeters * ratio : undefined;

    const panelTextSize = HeatingPlannerApplicationState.panelTextSize;
    if (HeatingPlannerApplicationState.panelTextSize) {
        push();

        textSize(panelTextSize);
        HeatingPlannerApplicationState.panelTextBoxWidth = ratio ? (textWidth(HeatingPlannerConstants.strings.F100) + 0.03 * ratio) : undefined;
        HeatingPlannerApplicationState.panelTextBoxHeight = ratio ? (panelTextSize + 0.03 * ratio) : undefined;

        pop();
    }

    HeatingPlannerApplicationState.beamLineWidthPixel = ratio ? Constants.room.roomLineWeightInMeters * ratio : undefined;
    HeatingPlannerApplicationState.beamWidthPixel = ratio ? HeatingPlannerConstants.beam.beamWidthMeter * ratio : undefined;
    HeatingPlannerApplicationState.ud30WidthPixel = ratio ? HeatingPlannerConstants.beam.ud30WidthMeter * ratio : undefined;
    HeatingPlannerApplicationState.beamTextSize = ratio ? HeatingPlannerConstants.beam.beamTextSizeInMeters * ratio : undefined;
    HeatingPlannerApplicationState.pixelsBetweenBeams = ratio ? HeatingPlannerConstants.beam.metersBetweenBeams * ratio : undefined;
    HeatingPlannerApplicationState.beamsMinimumOffset = ratio ? HeatingPlannerConstants.beam.beamsMinimumOffsetInMeters * ratio : undefined;
}

/**
 * Projekt specifikus skálázási műveletek.
 */
export const HeatingPlannerScalingActions = {
    updateRenderSizeValuesHeatingPlanner
};