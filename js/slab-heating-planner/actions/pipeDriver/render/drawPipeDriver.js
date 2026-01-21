/**
 * Felrajzolja a képernyőre a paraméterül kapott csővezetőt
 * 
 * @param {PipeDriver} pipeDriver csővezető paraméter
 * @returns {undefined}
 */
function drawPipeDriver(pipeDriver) {
    checkClass(pipeDriver, CLASS_PIPE_DRIVER);

    const isSelected = pipeDriver.isSelected;
    const mouseCursorIsInsidePoint = mouseCursorIsInsidePipeDriversPoint(pipeDriver);
    const lineThickness = pipeDriverPipeThicknessInPixels;
    const diameter = pipeDriverDiameterInPixels * (1 + mouseCursorIsInsidePoint * 0.2);
    const ellipseThickness = pipeDriverThicknessInPixels;
    const points = getPointsToDrawPipeDriver(pipeDriver);
    const color = getSlabHeaterGroupById(pipeDriver.slabHeaterGroupId).color;
    updateSelectedPointOfPipeDriver(pipeDriver);

    push();

    stroke(PIPE_DRIVER_PIPE_COLOR);
    strokeWeight(lineThickness);

    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        line(p1.x, p1.y, p2.x, p2.y);
    }

    fill(mouseCursorIsInsidePoint ? PIPE_DRIVER_SELECTABLE_FILL_COLOR : PIPE_DRIVER_DEFAULT_FILL_COLOR);
    stroke(mouseCursorIsInsidePoint || isSelected ? RED : PIPE_DRIVER_OUTLINE_COLOR);
    strokeWeight(ellipseThickness);
    ellipseMode(CENTER);

    for (let i = 0; i < points.length; i++) {
        const p = points[i];
        ellipse(p.x, p.y, diameter, diameter);
    }

    for (let pointArray of pipeDriver.pipes) {
        for (let i = 0; i < pointArray.length - 1; i++) {
            stroke(color);
            const p1 = pointArray[i];
            const p2 = pointArray[i + 1];
            line(p1.x, p1.y, p2.x, p2.y);
        }
    }

    pop();
}

function getPointsToDrawPipeDriver(pipeDriver) {
    const points = pipeDriver.points;

    if (!pipeDriver.isSelected) {
        return points;
    }

    if (selectedPipeDriverIsFullyConfigured()) {
        return points;
    }

    const nextPoint = getNextPointToAddToPipeDriver(pipeDriver);

    return [...points, nextPoint];
}