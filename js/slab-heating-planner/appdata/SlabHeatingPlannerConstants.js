/**
 * Projekt specifikus konstansok
 */
export const SlabHeatingPlannerConstants = {
    classNames: {
        slabHeater: 'SlabHeater',
        slabHeaterGroup: 'SlabHeaterGroup',
        box: 'Box',
        boxGroup: 'BoxGroup',
        pipeDriver: 'PipeDriver'
    },

    pipeDriver: {
        pipeDriverDiameterInMeters: 0.078,
        pipeDriverThicknessInMeters: 0.02,
        pipeLengthFirstSegmentMinimumLengthInMeters: 0.2,
        pipeDriverDistanceBetweenPipesInMeters: 0.05,
        PIPE_DRIVER_MAX_LENGTH_METERS: 20,
        pipeDriverPipeThicknessInMeters: 0.01,
        pipeDriverAdditionalOffsetShgInMeters: 0.15,
        pipeDriverAdditionalOffsetBgInMeters: 0.0,
        tubeDistanceInMeters: 0.1,
        gridResolutionInMeters: 0.04,
        minimumSegmentLengthInMeters: 0.1,
        pipeDistanceFromMiddleLineInMeters: 0.015,
        pipeLineWeightInMeters: 0.01,
        pipeRadiusInMeters: 0.15
    },

    slabHeater: {
        slabHeaterLineWeightInMeters: 0.02,
        slabHeaterTextSizeInMeters: 0.15,
        slabHeaterTypeRectPaddingInMeters: 0.1,
        slabHeaterTextPopFactor: 0.05,
        SLAB_HEATER_CORRECTION_OFFSET: 10,
        slabHeaterTypes: {
            width: ['0.8', '1'],
            length: {
                m: ['1', '2', '3', '4', '5'],
                cm: ['0', '20', '40', '60', '80']
            }
        },
        slabHeaterStopDrawingThresholdInMeters: 0.05,
        slabHeaterColors: [
            '#FFB3BA', // Light Red / Pink
            '#FFE0BA', // sand
            '#BAE0FF', // sky blue
            '#00FFFF', // cyan
            '#BAE1FF', // Light blue
            '#008000', // green
            '#E6BAFF', // Light purple
            '#A95C68', // puce
            '#FF00FF', // magenta
            '#FFC0CB',  // pink
            '#008080', // teal
            '#E3BAFF', // levander
            '#FFA500' // orange
        ],
        rowNumberBubbleDistanceFromLabelInMeter: 0.1,
        rowNumberBubbleDiameterInMeters: 0.3
    },

    box: {
        boxWidthInMeters: 0.08,
        boxLengthInMeters: 0.35,
        BOX_CORRECTION_OFFSET: 10,
        boxLineWeightInMeters: 0.015
    }
};