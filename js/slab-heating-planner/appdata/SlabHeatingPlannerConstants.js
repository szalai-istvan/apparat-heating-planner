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
        PIPE_DRIVER_DEFAULT_FILL_COLOR: 'white',
        PIPE_DRIVER_SELECTABLE_FILL_COLOR: 'lightgray',
        PIPE_DRIVER_SELECTED_COLOR: 'gray',
        PIPE_DRIVER_OUTLINE_COLOR: 'black',
        pipeDriverDiameterInMeters: 0.1,
        pipeDriverThicknessInMeters: 0.02,
        DIRECTION_X: 'x',
        DIRECTION_Y: 'y',
        pipeLengthFirstSegmentMinimumLengthInMeters: 0.2,
        pipeDriverDistanceBetweenPipesInMeters: 0.05,
        PIPE_DRIVER_MAX_LENGTH_METERS: 20,
        pipeDriverPipeThicknessInMeters: 0.01,
        PIPE_DRIVER_PIPE_COLOR: 'black',
        pipeDriverAdditionalOffsetShgInMeters: 0.15,
        pipeDriverAdditionalOffsetBgInMeters: 0.0,
        tubeDistanceInMeters: 0.1,
    },

    slabHeater: {
        slabHeaterLineWeightInMeters: 0.02,
        slabHeaterTextSizeInMeters: 0.15,
        slabHeaterTypeRectPaddingInMeters: 0.1,
        SLAB_HEATER_TEXT_POP_FACTOR: 0.05,
        SLAB_HEATER_CORRECTION_OFFSET: 10,
        slabHeaterTypes: {
            width: ['0.8', '1'],
            length: {
                m: ['1', '2', '3', '4', '5'],
                cm: ['0', '20', '40', '60', '80']
            }
        },
        slabHeaterStopDrawingThresholdInMeters: 0.05,
        SLAB_HEATER_COLORS: ['black', 'darkgrey', 'blue', 'darkgreen', 'teal', 'darkred', 'purple'],
    },

    box: {
        boxWidthInMeters: 0.1,
        boxLengthInMeters: 0.35,
        BOX_CORRECTION_OFFSET: 10,
        boxLineWeightInMeters: 0.015
    }
};