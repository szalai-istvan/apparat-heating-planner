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
        PIPE_DRIVER_DIAMETER_IN_METERS: 0.1,
        PIPE_DRIVER_THICKNESS_IN_METERS: 0.02,
        DIRECTION_X: 'x',
        DIRECTION_Y: 'y',
        PIPE_LENGTH_FIRST_SEGMENT_MINIMUM_LENGTH_IN_METERS: 0.2,
        PIPE_DRIVER_DISTANCE_BETWEEN_PIPES_IN_METERS: 0.05,
        PIPE_DRIVER_MAX_LENGTH_METERS: 20,
        PIPE_DRIVER_PIPE_THICKNESS_IN_METERS: 0.01,
        PIPE_DRIVER_PIPE_COLOR: 'black',
        PIPE_DRIVER_ADDITIONAL_OFFSET_SHG_METERS: 0.15,
        PIPE_DRIVER_ADDITIONAL_OFFSET_BG_METERS: 0.0
    },

    slabHeater: {
        TUBE_DISTANCE_IN_METER: 0.1,
        SLAB_HEATER_LINE_WEIGHT_IN_METER: 0.02,
        SLAB_HEATER_TEXT_SIZE_IN_METER: 0.15,
        SLAB_HEATER_TYPE_RECT_PADDING_IN_METER: 0.1,
        SLAB_HEATER_TEXT_POP_FACTOR: 0.05,
        SLAB_HEATER_CORRECTION_OFFSET: 10,
        slabHeaterTypes: {
            width: ['0.8', '1'],
            length: {
                m: ['1', '2', '3', '4', '5'],
                cm: ['0', '20', '40', '60', '80']
            }
        },
        SLAB_HEATER_STOP_DRAWING_THRESHOLD_IN_METERS: 0.05,
        SLAB_HEATER_COLORS: ['black', 'darkgrey', 'blue', 'darkgreen', 'teal', 'darkred', 'purple'],
    },

    box: {
        BOX_WIDTH_IN_METERS: 0.1,
        BOX_LENGTH_IN_METERS: 0.35,
        BOX_CORRECTION_OFFSET: 10,
        BOX_LINE_WEIGHT_IN_METERS: 0.015
    }
};