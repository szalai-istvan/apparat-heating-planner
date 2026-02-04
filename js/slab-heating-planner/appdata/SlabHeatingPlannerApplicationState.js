import { OptionsBar } from "../../common/ui/OptionsBar/OptionsBar.js";
import { BoxGroup } from "../entities/BoxGroup.js";
import { PipeDriver } from "../entities/PipeDriver.js";
import { SlabHeaterGroup } from "../entities/SlabHeaterGroup.js";

/**
 * Projekt specifikus alkalmazás állapot.
 */
export const SlabHeatingPlannerApplicationState = {
    /** @type {SlabHeaterGroup} */
    selectedSlabHeaterGroup: null,
    /** @type {PipeDriver} */
    selectedPipeDriver: null,
    /** @type {BoxGroup} */
    selectedBoxGroup: null,

    /** @type {Number} */
    boxWidthInPixels: null,
    /** @type {Number} */
    boxLengthInPixels: null,
    /** @type {Number} */
    boxLineWeightInPixels: null,
    /** @type {Number} */
    pipeDriverNodeDiameterInPixels: null,
    /** @type {Number} */
    pipeDriverThicknessInPixels: null,
    /** @type {Number} */
    pipeLengthFirstSegmentMinimumLengthInPixels: null,
    /** @type {Number} */
    pipeDriverAdditionalOffsetSHGInPixels: null,
    /** @type {Number} */
    pipeDriverAdditionalOffsetBGInPixels: null,
    /** @type {Number} */
    slabHeaterLineWeightInPixels: null,
    /** @type {Number} */
    slabHeaterTextSizeInPixels: null,
    /** @type {Number} */
    slabHeaterTypeRectPaddingInPixels: null,
    /** @type {Number} */
    pipeDriverDistanceBetweenPipesInPixels: null,
    /** @type {Number} */
    pipeDriverPipeThicknessInPixels: null,    
    /** @type {Number} */
    tubeDistanceInPixels: null,
    /** @type {Number} */
    slabHeaterStopDrawingThresholdInPixels: null,
    /** @type {Number} */
    slabHeaterTextboxWidthInPixels: null,
    /** @type {Number} */
    slabHeaterTextboxHeightInPixels: null,
    /** @type {OptionsBar} */
    widthMenu: null,
    /** @type {OptionsBar} */
    lengthMenu: null
};

window.slabHeatingPlannerApplicationState = SlabHeatingPlannerApplicationState;