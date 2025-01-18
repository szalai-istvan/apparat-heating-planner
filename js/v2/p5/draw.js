function draw() {
    background(255);

    drawCoordinates();
    
    screenContext.translate();
    renderer.render();

    drawAxis();
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

function drawCoordinates() {
    const mouse = screenContext.getMousePositionAbsolute();
    textAlign(LEFT, TOP);
    text(`x: ${roundNumber(mouse.x, 1)}\ny: ${roundNumber(mouse.y, 1)}\nzoom: ${roundNumber(screenContext.zoom, 1)}\nfps: ${roundNumber(frameRate(), 1)}`, mouseX + 20, mouseY + 20);
}

function roundNumber(number, decimals) {
    const x = 10**decimals;
    return Math.round(number * x) / x;
}