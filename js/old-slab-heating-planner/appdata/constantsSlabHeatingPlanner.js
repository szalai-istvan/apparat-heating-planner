// UI constants
const HALF_WIDTH_BUTTON_SIZE = { x: 50, y: 30 };
const TALL_SMALL_BUTTON_SIZE = { x: 100, y: 45 };

// Debug setting, auto-saving to local storage

// class name constants
const CLASS_SLAB_HEATER = 'SlabHeater';
const CLASS_SLAB_HEATER_GROUP = 'SlabHeaterGroup';
const CLASS_BOX = 'Box';
const CLASS_BOX_GROUP = 'BoxGroup';
const CLASS_PIPE_DRIVER = 'PipeDriver';

// components
const MODALS = [messageDialog, fileUploadDialogConfirm, scalingDialogConfirm, scalingDialog, addRoomDialog, pdfUploadDialog, transportDialog];
const ENTERABLE_BUTTONS = [messageOkButton, fileUploadDialogConfirmButton, scalingDialogConfirmButton, scalingDialogCloseButton, addRoomButton, pdfUploadDialogCloseButton, transportDialogOkButton];

// strings and misc constants

// PipeDriver constants
const PIPE_DRIVER_DEFAULT_FILL_COLOR = 'white';
const PIPE_DRIVER_SELECTABLE_FILL_COLOR = 'lightgray';
const PIPE_DRIVER_SELECTED_COLOR = 'gray';
const PIPE_DRIVER_OUTLINE_COLOR = 'black';
const PIPE_DRIVER_DIAMETER_IN_METERS = 0.1;
const PIPE_DRIVER_THICKNESS_IN_METERS = 0.02;
const DIRECTION_X = 'x';
const DIRECTION_Y = 'y';
const PIPE_LENGTH_FIRST_SEGMENT_MINIMUM_LENGTH_IN_METERS = 0.2;
const PIPE_DRIVER_DISTANCE_BETWEEN_PIPES_IN_METERS = 0.05;
const PIPE_DRIVER_MAX_LENGTH_METERS = 20;

const PIPE_DRIVER_PIPE_THICKNESS_IN_METERS = 0.01;
const PIPE_DRIVER_PIPE_COLOR = 'black';

const PIPE_DRIVER_ADDITIONAL_OFFSET_SHG_METERS = 0.15;
const PIPE_DRIVER_ADDITIONAL_OFFSET_BG_METERS = 0.0;

// SlabHeater constants
const TUBE_DISTANCE_IN_METER = 0.1;
const SLAB_HEATER_LINE_WEIGHT_IN_METER = 0.02;
const SLAB_HEATER_TEXT_SIZE_IN_METER = 0.15;
const SLAB_HEATER_TYPE_RECT_PADDING_IN_METER = 0.1;
const SLAB_HEATER_TEXT_POP_FACTOR = 0.05;
const SLAB_HEATER_CORRECTION_OFFSET = 10;
const SLAB_HEATER_TYPES = {
    width: ['0.8', '1'],
    length: {
        m: ['1', '2', '3', '4', '5'],
        cm: ['0', '20', '40', '60', '80']
    }
};
const SLAB_HEATER_STOP_DRAWING_THRESHOLD_IN_METERS = 0.05;
const SLAB_HEATER_COLORS = ['black', 'darkgrey', 'blue', 'darkgreen', 'teal', 'darkred', 'purple'];
let SLAB_HEATER_COLORS_AVAILABLE = [...SLAB_HEATER_COLORS];

// Box constants
const BOX_WIDTH_IN_METERS = 0.1;
const BOX_LENGTH_IN_METERS = 0.35;
const BOX_CORRECTION_OFFSET = 10;
const BOX_LINE_WEIGHT_IN_METERS = 0.015;

// translations
const TRANSLATIONS = {};