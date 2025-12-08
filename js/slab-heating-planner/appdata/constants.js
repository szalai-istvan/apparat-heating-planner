// UI constants
const BACKGROUND_COLOR = 255;
const REGULAR_BUTTON_SIZE = { x: 100, y: 40 };
const SMALL_BUTTON_SIZE = { x: 100, y: 30 };
const HALF_WIDTH_BUTTON_SIZE = { x: 50, y: 30 };
const TALL_SMALL_BUTTON_SIZE = { x: 100, y: 45 };
const BUTTON_GAP_X = 10;
const BUTTON_GAP_Y = 5;
const DELIMITER_POSITIONS = [];
const UI_TEXTS = [];
const TOP_RIBBON_HEIGHT = 60;
const LEFT_RIBBON_WIDTH = 120;
const UI_COLOR = 'lightgrey';
const UI_TEXT_SIZE = 12;

// Room constants
const ROOM_TEXT_SIZE_IN_METERS = 0.25;
const ROOM_TEXT_POP_FACTOR = 1.1;
const ROOM_LINE_WEIGHT_IN_METERS = 0.017;
const ROOM_DEFAULT_TEXT_COLOR = 'green';
const PREFILL_ROOM_NAMES = [
  'Szoba 1',
  'Nappali',
  'Szoba 2',
  'Hálószoba 1',
  'Szoba 3',
  'Hálószoba 2',
  'Folyosó',
  'Gyerekszoba 1',
  'Dolgozószoba',
  'Gyerekszoba 2',
  'Gardrób',
  'Konyha',
  'Fürdőszoba',
  'Előszoba'
];

// Text constants
const DEFAULT_TEXT_COLOR = 'black';
const SELECTED_TEXT_COLOR = 'red';

// File constants
const IMAGE_CONTENT_TYPES = ['image/jpeg', 'image/png'];
const PDF_CONTENT_TYPE = 'application/pdf';

// Debug setting, auto-saving to local storage
const SAVE_TO_LOCAL_STORAGE_ENABLED = true;
const LOCAL_STORAGE_DATA_KEY = 'rajzolator-project-save';

// grid settings
const GRID_RESOLUTION_METER = 0.05;

// class name constants
const CLASS_SLAB_HEATER = 'SlabHeater';
const CLASS_SLAB_HEATER_GROUP = 'SlabHeaterGroup';
const CLASS_BLUEPRINT = 'Blueprint';
const CLASS_ROOM = 'Room';
const CLASS_SCALE_CONTEXT = 'ScaleContext';
const CLASS_BUTTON_WRAPPER = 'ButtonWrapper';
const CLASS_TOOLTIP = 'Tooltip';
const CLASS_MENU_LINE = 'MenuLine';
const CLASS_BOX = 'Box';
const CLASS_BOX_GROUP = 'BoxGroup';
const CLASS_OPTIONS_BAR = 'OptionsBar';
const CLASS_PIPE_DRIVER = 'PipeDriver';
const CLASS_NUMBER = 'number';
const CLASS_STRING = 'string';
const CLASS_POINT = 'Point';
const CLASS_ARRAY = 'Array';

// components
const MODALS = [messageDialog, fileUploadDialogConfirm, scalingDialogConfirm, scalingDialog, addRoomDialog, pdfUploadDialog, transportDialog];
const ENTERABLE_BUTTONS = [messageOkButton, fileUploadDialogConfirmButton, scalingDialogConfirmButton, scalingDialogCloseButton, addRoomButton, pdfUploadDialogCloseButton, transportDialogOkButton];

// strings and misc constants
const CLICK = 'click';
const DISABLED = 'disabled';
const KEYUP = 'keyup';
const CHANGE = 'change';
const BACKGROUND = 'background';
const RED = 'red';
const BLUE = 'blue';
const BLACK = 'black';
const WHITE = 'white';

// OptionsBar constants
const OPTIONS_BAR_TEXT_SIZE = 14;

// screen constants
const MINIMUM_ZOOM = 0.01;
const MAXIMUM_ZOOM = 1_000;
const ZOOM_STEP = 1.05;

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

const PIPE_DRIVER_PIPE_THICKNESS_IN_METERS = 0.01;
const PIPE_DRIVER_PIPE_COLOR = 'black';

const PIPE_DRIVER_ADDITIONAL_OFFSET_METERS = 0.15;

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