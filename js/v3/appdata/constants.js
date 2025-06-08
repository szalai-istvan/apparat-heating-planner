// UI constants
const REGULAR_BUTTON_SIZE = { x: 100, y: 40 };
const SMALL_BUTTON_SIZE = { x: 80, y: 30 };
const HALF_WIDTH_BUTTON_SIZE = { x: 40, y: 30 };
const TALL_SMALL_BUTTON_SIZE = { x: 80, y: 45 };
const BUTTON_GAP_X = 10;
const BUTTON_GAP_Y = 5;
const DELIMITER_POSITIONS = [];
const TOP_RIBBON_HEIGHT = 60;
const LEFT_RIBBON_WIDTH = 100;

// Panel constants
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

// Room constants
const ROOM_TEXT_SIZE_IN_METERS = 0.25;
const ROOM_TEXT_POP_FACTOR = 1.1;
const ROOM_LINE_WEIGHT_IN_METERS = 0.017;
const ROOM_DEFAULT_TEXT_COLOR = "green";
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

// Text constants
const DEFAULT_TEXT_COLOR = "black";
const SELECTED_TEXT_COLOR = "red";

// File constants
const IMAGE_CONTENT_TYPES = ["image/jpeg", "image/png"];
const PDF_CONTENT_TYPE = "application/pdf";

// Beams constants
const BEAM_COLOR = "lightgrey";
const BEAM_WIDTH_METER = 0.06;
const UD30_WIDTH_METER = 0.03;
const METERS_BETWEEN_BEAMS = 1;
const BEAM_MINIMUM_OFFSET_METERS = 0.1;
const BEAM_TEXT_SIZE_METER = 0.04;
const CD_30_60_BEAM_TYPE = "CD30/60 profil";
const UD_30_BEAM_TYPE = "UD30 profil";

// Debug setting, auto-saving to local storage
const SAVE_TO_LOCAL_STORAGE_ENABLED = false;
const LOCAL_STORAGE_DATA_KEY = 'rajzolator-project-save';

// panel offsetting
const PANEL_CORRECTION_OFFSET_PIPE = 20;
const PANEL_CORRECTION_OFFSET_NO_PIPE = 2;

// grid settings
const GRID_RESOLUTION_METER = 0.05;