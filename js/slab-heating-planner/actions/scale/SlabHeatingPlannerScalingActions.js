import { ApplicationState } from "../../../common/appdata/ApplicationState.js";
import { SlabHeatingPlannerApplicationState } from "../../appdata/SlabHeatingPlannerApplicationState.js";
import { SlabHeatingPlannerConstants } from "../../appdata/SlabHeatingPlannerConstants.js";

/**
 * Projekt specifikus renderelési méretek update-elése.
 * 
 * @returns {undefined}
 */
function updateRenderSizeValuesSlabHeatingPlanner() {
    const ratio = ApplicationState.pixelsPerMetersRatio;

    SlabHeatingPlannerApplicationState.boxWidthInPixels = ratio ? SlabHeatingPlannerConstants.box.boxWidthInMeters * ratio : undefined;
    SlabHeatingPlannerApplicationState.boxLineWeightInPixels = ratio ? SlabHeatingPlannerConstants.box.boxLineWeightInMeters * ratio : undefined;
    SlabHeatingPlannerApplicationState.boxLengthInPixels = ratio ? SlabHeatingPlannerConstants.box.boxLengthInMeters * ratio : undefined;
    
    SlabHeatingPlannerApplicationState.pipeDriverNodeDiameterInPixels = ratio ? SlabHeatingPlannerConstants.pipeDriver.pipeDriverDiameterInMeters * ratio : undefined;
    SlabHeatingPlannerApplicationState.pipeDriverThicknessInPixels = ratio ? SlabHeatingPlannerConstants.pipeDriver.pipeDriverThicknessInMeters * ratio : undefined;
    SlabHeatingPlannerApplicationState.pipeLengthFirstSegmentMinimumLengthInPixels = ratio ? SlabHeatingPlannerConstants.pipeDriver.pipeLengthFirstSegmentMinimumLengthInMeters * ratio : undefined;
    SlabHeatingPlannerApplicationState.pipeDriverAdditionalOffsetSHGInPixels = ratio ? SlabHeatingPlannerConstants.pipeDriver.pipeDriverAdditionalOffsetShgInMeters * ratio : undefined;
    SlabHeatingPlannerApplicationState.pipeDriverAdditionalOffsetBGInPixels = ratio ? SlabHeatingPlannerConstants.pipeDriver.pipeDriverAdditionalOffsetBgInMeters * ratio : undefined;
    SlabHeatingPlannerApplicationState.pipeDriverPipeThicknessInPixels = ratio ? SlabHeatingPlannerConstants.pipeDriver.pipeDriverPipeThicknessInMeters * ratio : undefined;
    SlabHeatingPlannerApplicationState.pipeDriverDistanceBetweenPipesInPixels = ratio ? SlabHeatingPlannerConstants.pipeDriver.pipeDriverDistanceBetweenPipesInMeters * ratio : undefined;
    SlabHeatingPlannerApplicationState.tubeDistanceInPixels = ratio ? SlabHeatingPlannerConstants.pipeDriver.tubeDistanceInMeters * ratio : undefined;
    
    SlabHeatingPlannerApplicationState.slabHeaterLineWeightInPixels = ratio ? SlabHeatingPlannerConstants.slabHeater.slabHeaterLineWeightInMeters * ratio : undefined;
    SlabHeatingPlannerApplicationState.slabHeaterTypeRectPaddingInPixels = ratio ? SlabHeatingPlannerConstants.slabHeater.slabHeaterTypeRectPaddingInMeters * ratio : undefined;
    SlabHeatingPlannerApplicationState.slabHeaterStopDrawingThresholdInPixels = ratio ? SlabHeatingPlannerConstants.slabHeater.slabHeaterStopDrawingThresholdInMeters * ratio : undefined;
    SlabHeatingPlannerApplicationState.slabHeaterTextSizeInPixels = ratio ? SlabHeatingPlannerConstants.slabHeater.slabHeaterTextSizeInMeters * ratio : undefined;

    if (SlabHeatingPlannerApplicationState.slabHeaterTextSizeInPixels && SlabHeatingPlannerApplicationState.slabHeaterTypeRectPaddingInPixels) {
        push();

        textSize(SlabHeatingPlannerApplicationState.slabHeaterTextSizeInPixels);
        SlabHeatingPlannerApplicationState.slabHeaterTextboxWidthInPixels = ratio ? textWidth('_._ m x _._ m') + SlabHeatingPlannerApplicationState.slabHeaterTypeRectPaddingInPixels : undefined;
        SlabHeatingPlannerApplicationState.slabHeaterTextboxHeightInPixels = ratio ? 2 * SlabHeatingPlannerApplicationState.slabHeaterTextSizeInPixels + SlabHeatingPlannerApplicationState.slabHeaterTypeRectPaddingInPixels : undefined;

        pop();
    }

}

/**
 * Projekt specifikus skálázási műveletek.
 */
export const SlabHeatingPlannerScalingAction = {
    updateRenderSizeValuesSlabHeatingPlanner
};