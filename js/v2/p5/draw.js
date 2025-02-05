function draw() {
    roomContext.clearSelectionCache();
    panelContext.clearSelectionCache();
    
    background(255);

    push();
    screenContext.translate();
    renderer.renderTranslatedObjects();
    drawAxis();
    pop();

    drawCursorDebugInfo();
    drawUiBackground();
    roomContext.checkForSelection();
    panelContext.checkForSelection();
    renderer.renderAbsolutePositionObjects();
}

function drawUiBackground() {
    push();
    fill('lightgrey');
    noStroke();
    rect(0, 0, docSize.vw, 60);
    rect(0, 60, 100, docSize.vh - 60);
    stroke(3);
    line(100, 60, docSize.vw, 60);
    line(100, 60, 100, docSize.vh);

    line(450, 0, 450, 60);

    if (selectionContext.isAnyThingSelected()) {
        line(0, 370, 100, 370);
    }
    
    pop();
}

function roundNumber(number, decimals) {
    const x = 10**decimals;
    return Math.round(number * x) / x;
}