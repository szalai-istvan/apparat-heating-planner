class DebugInfoRenderer {

    static drawAxis() {
        if (!debugEnabled) return;
        
        textSize(12);
        for (let i = -10_000; i < 10_000; i+=50) {
            strokeWeight(1);
            stroke('black');
            line(i, -5, i, 5);
            line(-5, i, 5, i);
            if (i !== 0) {
                noStroke();
                fill('black');
                textAlign(CENTER, CENTER);
                text(i, i, 15);
                textAlign(LEFT, CENTER);
                text(i, 15, i);
            }
        }
    
        stroke(1);
        stroke('black');
        line(0, 10_000, 0, -10_000);
        line(-10_000, 0, 10_000, 0);
    }

    static drawCursorDebugInfo() {
        if (!debugEnabled) return;
        const mouse = screenContext.getMousePositionAbsolute();
        textAlign(LEFT, TOP);
        text(`x: ${roundNumber(mouse.x, 1)}\ny: ${roundNumber(mouse.y, 1)}\nzoom: ${roundNumber(screenZoom, 1)}\nfps: ${roundNumber(frameRate(), 1)}`, mouseX + 20, mouseY + 20);
    }
}