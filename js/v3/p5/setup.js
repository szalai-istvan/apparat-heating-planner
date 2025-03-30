var docSize;
var canvas;

function setup() {
    disableContextMenu();
    disableEscapeButton();
    handleWindowResize();
    enableEnterForConfirm();
    handleDeleteButton();
    createRoomPrefillRadioButtons();
    
    docSize = getDocumentDimensions();
    canvas = createCanvas(docSize.vw, window.innerHeight);
    canvas.parent("body");
    screenContext.setCanvas(canvas);
    apparatLogo = loadImage('img/APPARAT_transparent.PNG');
    cicisNeni = loadImage('img/cicis_neni.png');
    
    angleMode(DEGREES);
    createButtons();
    
    tooltip.applicationStarted();

    loadProject();
}

function getDocumentDimensions() {
    return {
        vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
}