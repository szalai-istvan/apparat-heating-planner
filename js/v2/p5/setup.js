function setup() {
    disableContextMenu();
    const docSize = getDocumentDimensions();
    const canvas = createCanvas(docSize.vw, window.innerHeight);
    canvas.parent("body");
    screenContext.setCanvas(canvas);
    
    angleMode(DEGREES);
    createButtons();
}

function getDocumentDimensions() {
    return {
        vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
}