/** @type {Number} */
let boxWidthInPixels = undefined;
/** @type {Number} */
let boxLengthInPixels = undefined;
/** @type {Number} */
let boxLineWeightInPixels = undefined;
/** @type {Number} */
let pipeDriverDiameterInPixels = undefined;
/** @type {Number} */
let pipeDriverThicknessInPixels = undefined;
/** @type {Number} */
let pipeLengthFirstSegmentMinimumLengthInPixels = undefined;
/** @type {Number} */
let pipeDriverAdditionalOffsetSHGInPixels = undefined;
/** @type {Number} */
let pipeDriverAdditionalOffsetBGInPixels = undefined;
/** @type {Number} */
let slabHeaterLineWeightInPixels = undefined;
/** @type {Number} */
let slabHeaterTextSizeInPixels = undefined;
/** @type {Number} */
let slabHeaterTypeRectPaddingInPixels = undefined;
/** @type {Number} */
let pipeDriverDistanceBetweenPipesInPixels = undefined;
/** @type {Number} */
let pipeDriverPipeThicknessInPixels = undefined
/** @type {Number} */
let tubeDistanceInPixels = undefined;
/** @type {Number} */
let slabHeaterStopDrawingThresholdInPixels = undefined;
/** @type {Number} */
let slabHeaterTextboxWidthInPixels = undefined;
/** @type {Number} */
let slabHeaterTextboxHeightInPixels = undefined;

/**
 * Projekt specifikus renderelési méretek update-elése.
 * 
 * @returns {undefined}
 */
function updateRenderSizeValuesSlabHeatingPlanner() {
    const ratio = pixelsPerMetersRatio;

    boxWidthInPixels = ratio ? BOX_WIDTH_IN_METERS * ratio : undefined;
    boxLineWeightInPixels = ratio ? BOX_LINE_WEIGHT_IN_METERS * ratio : undefined;
    boxLengthInPixels = ratio ? BOX_LENGTH_IN_METERS * ratio : undefined;
    
    pipeDriverDiameterInPixels = ratio ? PIPE_DRIVER_DIAMETER_IN_METERS * ratio : undefined;
    pipeDriverThicknessInPixels = ratio ? PIPE_DRIVER_THICKNESS_IN_METERS * ratio : undefined;
    pipeLengthFirstSegmentMinimumLengthInPixels = ratio ? PIPE_LENGTH_FIRST_SEGMENT_MINIMUM_LENGTH_IN_METERS * ratio : undefined;
    pipeDriverAdditionalOffsetSHGInPixels = ratio ? PIPE_DRIVER_ADDITIONAL_OFFSET_SHG_METERS * ratio : undefined;
    pipeDriverAdditionalOffsetBGInPixels = ratio ? PIPE_DRIVER_ADDITIONAL_OFFSET_BG_METERS * ratio : undefined;
    pipeDriverPipeThicknessInPixels = ratio ? PIPE_DRIVER_PIPE_THICKNESS_IN_METERS * ratio : undefined;
    pipeDriverDistanceBetweenPipesInPixels = ratio ? PIPE_DRIVER_DISTANCE_BETWEEN_PIPES_IN_METERS * ratio : undefined;
    tubeDistanceInPixels = ratio ? TUBE_DISTANCE_IN_METER * ratio : undefined;
    
    slabHeaterLineWeightInPixels = ratio ? SLAB_HEATER_LINE_WEIGHT_IN_METER * ratio : undefined;
    slabHeaterTypeRectPaddingInPixels = ratio ? SLAB_HEATER_TYPE_RECT_PADDING_IN_METER * ratio : undefined;
    slabHeaterStopDrawingThresholdInPixels = ratio ? SLAB_HEATER_STOP_DRAWING_THRESHOLD_IN_METERS * ratio : undefined;
    slabHeaterTextSizeInPixels = ratio ? SLAB_HEATER_TEXT_SIZE_IN_METER * ratio : undefined;

    if (slabHeaterTextSizeInPixels && slabHeaterTypeRectPaddingInPixels) {
        push();

        textSize(slabHeaterTextSizeInPixels);
        slabHeaterTextboxWidthInPixels = ratio ? textWidth('_._ m x _._ m') + slabHeaterTypeRectPaddingInPixels : undefined;
        slabHeaterTextboxHeightInPixels = ratio ? slabHeaterTextSizeInPixels + slabHeaterTypeRectPaddingInPixels : undefined;

        pop();
    }

}