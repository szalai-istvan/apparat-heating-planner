/**
 * Felrajzolja a rajzlapra a debug információkat
 * 
 * @returns {undefined}
 */
function drawDebugInfo() {
    if (!debugEnabled) {
        return;
    }

    push();
    drawAxis();
    drawCursorDebugInfo();
    pop();
}

function drawAxis() {
    if (!debugEnabled) {
        return;
    }

    push();
    textSize(12);
    for (let i = -10_000; i < 10_000; i += 50) {
        strokeWeight(1);
        stroke(BLACK);
        line(i, -5, i, 5);
        line(-5, i, 5, i);
        if (i !== 0) {
            noStroke();
            fill(BLACK);
            textAlign(CENTER, CENTER);
            text(i, i, 15);
            textAlign(LEFT, CENTER);
            text(i, 15, i);
        }
    }

    stroke(1);
    stroke(BLACK);
    line(0, 10_000, 0, -10_000);
    line(-10_000, 0, 10_000, 0);
    pop();

}

function drawCursorDebugInfo() {
    if (!debugEnabled) {
        return;
    }

    push();
    const mouse = getMousePositionAbsolute();
    textAlign(LEFT, TOP);
    textSize(12);
    text(`x: ${roundNumber(mouse.x, 1)}\ny: ${roundNumber(mouse.y, 1)}\nzoom: ${roundNumber(screenZoom, 1)}\nfps: ${roundNumber(frameRate(), 1)}`, mouseX + 20, mouseY + 20);
    pop();
}