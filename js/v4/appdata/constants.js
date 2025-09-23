// tooltip konstansok
const CURSOR_TOOLTIP_DURATION = 15_000;

// Szoba konstansok
const PREFILL_ROOM_NAMES = [
  "Szoba 1",
  "Nappali",
  "Szoba 2",
  "Hálószoba 1",
  "Szoba 3",
  "Hálószoba 2",
  "Folyosó",
  "Gyerekszoba 1",
  "Dolgozószoba",
  "Gyerekszoba 2",
  "Gardrób",

  "Konyha",
  "Fürdőszoba",
  "Előszoba"
];
const ROOM_TEXT_SIZE_IN_METERS = 0.25;
const ROOM_TEXT_POP_FACTOR = 1.1;
const ROOM_LINE_WEIGHT_IN_METERS = 0.017;
const ROOM_DEFAULT_TEXT_COLOR = "green";
const ROOM_FILL_COLOR = '#FFFFFFA0';

// Panel konstansok
const PANEL_TEXT_SIZE_IN_METERS = 0.18;
const PANEL_TEXT_POP_FACTOR = 0.1;
const PANEL_SELECTION_MULTIPLIER = 0.8;
const PANEL_FILL_COLOR = "white";
const PANEL_CONTOUR_LINE_THICKNESS = 0.02;
const PANEL_LINE_THICKNESS = 0.01;
const PANEL_ELLIPSE_RADIUS = 0.24;
const PANEL_TUBE_EXTRA_LENGTH_PER_SIDE = 0.3;
const PANEL_TUBE_EXTRA_LENGTH_STEP = 0.03;
const PANEL_TEXT_RECT_SIZE_MUL = 1.4;

// UI konstansek
const MODALS = [errorDialog, fileUploadDialogConfirm, scalingDialogConfirm, scalingDialog, addRoomDialog, pdfUploadDialog, summaryTableDialog, transportDialog];
const ENTERABLE_BUTTONS = [errorMessageOkButton, fileUploadDialogConfirmButton, scalingDialogConfirmButton, scalingDialogCloseButton, addRoomButton, pdfUploadDialogCloseButton, transportDialogOkButton];
const TOP_RIBBON_HEIGHT = 60;
const LEFT_RIBBON_WIDTH = 100;
const UI_COLOR = 'lightgrey';
const DELIMITER_POSITIONS = [];
const UI_TEXT_SIZE = 12;
const DEFAULT_TEXT_COLOR = 'black';
const SELECTED_TEXT_COLOR = 'red';
const UI_TEXTS = [];
const REGULAR_BUTTON_SIZE = { x: 100, y: 40 };
const SMALL_BUTTON_SIZE = { x: 80, y: 30 };
const HALF_WIDTH_BUTTON_SIZE = { x: 40, y: 30 };
const TALL_SMALL_BUTTON_SIZE = { x: 80, y: 45 };
const BUTTON_GAP_X = 10;
const BUTTON_GAP_Y = 5;

// ID-k
const ROOM_PREFILL_RADIO_SET = 'roomPrefillRadioSet';
const ROOM_PREFILL = 'roomPrefill';

// Resource útvonalak
const APPARAT_LOGO = 'img/APPARAT_transparent.PNG';
const CICIS_NENI = 'img/cicis_neni.png';

// Debug konstansok
const SAVE_TO_LOCAL_STORAGE_ENABLED = true;
const PROJECT_STATE_LOGGING_ENABLED = false;
const LOCAL_STORAGE_DATA_KEY = 'rajzolator-project-save';
const RECTANGLE_COLOR = 'red';
const RECTANGLE_STROKE_WEIGHT = 10;

// Színek
const WHITE = 'white';
const BLACK = 'black';

// stringek
const F100 = 'F100';
const CLICK = 'click';
const BODY = 'body';
const CONTEXTMENU = 'contextmenu';
const DIALOG = 'dialog';
const KEYDOWN = 'keydown';
const ESCAPE = 'Escape';
const DELETE = 'Delete';
const RESIZE = 'resize';
const KEYPRESS = 'keypress';
const ENTER = 'Enter';
const INPUT = 'input';
const TYPE = 'type';
const RADIO = 'radio';
const ID = 'id';
const NAME = 'name';
const VALUE = 'value';
const LABEL = 'label';
const FOR = 'for';
const RADIO_LABEL = 'radio-label';
const SPAN = 'span';
const CHANGE = 'change';
const LEFT = 'left';
const RIGHT = 'right';
const DISABLED = 'disabled';

// Osztálynevek
const CLASS_BLUEPRINT = 'Blueprint';
const CLASS_ROOM = 'Room';
const CLASS_PANEL = 'Panel';
const CLASS_PANEL_GROUP = 'PanelGroup';
const CLASS_BUTTON_WRAPPER = 'ButtonWrapper';
const CLASS_NUMBER = 'number';
const CLASS_STRING = 'string';
const CLASS_POINT = 'Point';
const CLASS_ARRAY = 'Array';
const CLASS_LINE = 'Line';
const CLASS_RECTANGLE = 'Rectangle';

// File constants
const IMAGE_CONTENT_TYPES = ["image/jpeg", "image/png"];
const PDF_CONTENT_TYPE = "application/pdf";

// grid konstansok
const GRID_RESOLUTION_METER = 0.05;

// Képernyő konstansok
const MINIMUM_ZOOM = 0.01;
const MAXIMUM_ZOOM = 1_000;
const ZOOM_STEP = 1.05;

// Validáció konstansok
const TEST_POINT_COORDINATE = 20_000_000;

// Geometria konstansok
const PARALLELITY_TRESHOLD = 0.0001;
const MAXIMUM_LINE_INTERSECTION_ROUNDING_ERROR = 0.0001;