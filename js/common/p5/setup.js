var docSize;
var canvas;

function setup() {
    setupWindow();
    
    docSize = getDocumentDimensions();
    canvas = createCanvas(docSize.vw, window.innerHeight);
    canvas.parent(BODY);
    screenCanvas = canvas;
    
    angleMode(DEGREES);
    
    if (SAVE_TO_LOCAL_STORAGE_ENABLED) {
        loadProject();        
    }

    dispatchCustomEvent(SETUP, {});
}

function setupWindow() {
    initializeComponents();
    disableContextMenu();
    disableEscapeButton();
    handleWindowResize();
    enableEnterForConfirm();
    handleDeleteButton();
    createRoomPrefillRadioButtons();
}

function initializeComponents() {
    screenSumDrag = createPoint(0, 0);
    testPoint = createPoint(TEST_POINT_COORDINATE, TEST_POINT_COORDINATE);
    pointOrigin = createPoint(0, 0);

    apparatLogo = loadImage(APPARAT_LOGO);
    cicisNeni = loadImage(CICIS_NENI);
}