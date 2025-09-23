/**
 * Felrajzolja a képernyőre a méretarány beállító eszközt
 * 
 * @returns {undefined}
 */
function drawScaler() {
    if (!scalingInProgress) {
        return;
    }

    const firstPoint = scalingFirstPoint;
    if (!firstPoint) {
        return;
    }

    const secondPoint = scalingSecondPoint || getCorrectedMousePositionAbsolute();

    push();

    line(firstPoint.x, firstPoint.y, secondPoint.x, secondPoint.y);

    pop();
}