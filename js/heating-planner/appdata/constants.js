// Szoba szerkezeti elem konstansok
const BEAM_COLOR = "lightgrey";
const BEAM_WIDTH_METER = 0.06;
const UD30_WIDTH_METER = 0.03;
const METERS_BETWEEN_BEAMS = 1;
const BEAM_MINIMUM_OFFSET_METERS = 0.1;
const BEAM_TEXT_SIZE_METER = 0.05;
const CD_30_60_BEAM_TYPE = "CD30/60 profil";
const UD_30_BEAM_TYPE = "UD30 profil";

// Panel konstansok
const PANEL_TEXT_SIZE_IN_METERS = 0.18;
const PANEL_TEXT_POP_FACTOR = 0.1;
const PANEL_SELECTION_MULTIPLIER = 0.8;
const PANEL_FILL_COLOR = 'white';
const PANEL_CONTOUR_LINE_THICKNESS = 0.02;
const PANEL_LINE_THICKNESS = 0.01;
const PANEL_ELLIPSE_RADIUS = 0.24;
const PANEL_TUBE_EXTRA_LENGTH_PER_SIDE = 0.3;
const PANEL_TUBE_EXTRA_LENGTH_STEP = 0.03;
const PANEL_TEXT_RECT_SIZE_MUL = 1.4;

// UI konstansok
const MODALS = [rotateBlueprintDialog, errorDialog, fileUploadDialogConfirm, scalingDialogConfirm, scalingDialog, addRoomDialog, pdfUploadDialog, summaryTableDialog, transportDialog];
const ENTERABLE_BUTTONS = [rotateBlueprintDialogOkButton, errorMessageOkButton, fileUploadDialogConfirmButton, scalingDialogConfirmButton, scalingDialogCloseButton, addRoomButton, pdfUploadDialogCloseButton, transportDialogOkButton];
const HALF_WIDTH_BUTTON_SIZE = { x: 50, y: 30 };
const TALL_SMALL_BUTTON_SIZE = { x: 100, y: 45 };

const SELECT_DRAG_THRESHOLD = 10;

// ID-k
const ROOM_PREFILL_RADIO_SET = 'roomPrefillRadioSet';
const ROOM_PREFILL = 'roomPrefill';

// Resource útvonalak
const CICIS_NENI = 'img/cicis_neni.png';

// Debug konstansok
const RECTANGLE_COLOR = 'red';
const RECTANGLE_STROKE_WEIGHT = 1;

// stringek
const F100 = 'F100';

// Osztálynevek
const CLASS_PANEL = 'Panel';
const CLASS_PANEL_GROUP = 'PanelGroup';
const CLASS_STRUCTURE_ELEMENTS = 'StructureElements';

// Validáció konstansok
const TEST_POINT_COORDINATE = 20_000_000;

// Geometria konstansok
const PARALLELITY_TRESHOLD = 0.0001;
const MAXIMUM_LINE_INTERSECTION_ROUNDING_ERROR = 0.0001;
const INFINITE_LINE_LENGTH = 20_000_000;
const DELTA_X_VERTICALITY_THRESHOLD = 0.00001;