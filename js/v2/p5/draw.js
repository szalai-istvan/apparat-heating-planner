function draw() {
    background(255);

    //drawCursorDebugInfo();
    push();
    screenContext.translate();
    renderer.render();

    //drawAxis();
    pop();
    drawUiBackground();    
}

function drawCursorDebugInfo() {
    const mouse = screenContext.getMousePositionAbsolute();
    textAlign(LEFT, TOP);
    text(`x: ${roundNumber(mouse.x, 1)}\ny: ${roundNumber(mouse.y, 1)}\nzoom: ${roundNumber(screenContext.zoom, 1)}\nfps: ${roundNumber(frameRate(), 1)}`, mouseX + 20, mouseY + 20);
}

function drawAxis() {
    for (let i = -10_000; i < 10_000; i+=50) {
        line(i, -5, i, 5);
        line(-5, i, 5, i);

        if (i !== 0) {
            textAlign(CENTER, CENTER);
            text(i, i, 15);
            textAlign(LEFT, CENTER);
            text(i, 15, i);
        }
    }
    line(0, 10_000, 0, -10_000);
    line(-10_000, 0, 10_000, 0);
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

    if (selectionContext.isAnyThingSelected()) {
        line(0, 370, 100, 370);
    }
    
    pop();
}

function roundNumber(number, decimals) {
    const x = 10**decimals;
    return Math.round(number * x) / x;
}