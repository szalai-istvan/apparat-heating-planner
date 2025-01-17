function draw() {
    background(255);
    screenContext.translate(1);
    
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

    const mouse = screenContext.getMousePositionAbsolute();
    text(`x: ${mouse.x}\ny: ${mouse.y}\nzoom: ${screenContext.zoom}`, 50, 50);
}