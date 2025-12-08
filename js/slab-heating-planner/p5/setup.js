var docSize;
var canvas;

function setup() {
    setupWindow();

    docSize = getDocumentDimensions();
    canvas = createCanvas(docSize.vw, window.innerHeight);
    canvas.parent("body");
    screenCanvas = canvas;

    angleMode(DEGREES);

    if (SAVE_TO_LOCAL_STORAGE_ENABLED) {
        loadProject();
    }
}

function getDocumentDimensions() {
    return {
        vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
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
    apparatLogo = loadImage('img/APPARAT_transparent.PNG');
    createButtons();
}