var docSize;
var canvas;

function setup() {
    disableContextMenu();
    disableEscapeButton();
    handleWindowResize();
    
    docSize = getDocumentDimensions();
    canvas = createCanvas(docSize.vw, window.innerHeight);
    canvas.parent("body");
    screenContext.setCanvas(canvas);
    
    angleMode(DEGREES);
    createButtons();
    
    tooltip.applicationStarted();
}

function getDocumentDimensions() {
    return {
        vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
}