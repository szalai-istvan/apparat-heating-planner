/**
 * Kiszámolja a paraméterül kapott pont képernyőn lévő pozícióját.
 * 
 * @param {Point} point 
 */
function calculateScreenPositionOfPoint(point) {
    const currentDragValue = getCurrentDragValue();
    const sumDrag = screenSumDrag;
    const canvasSize = getCanvasSize();

    return createPoint(
        (point.x + sumDrag.x) * screenZoom + canvasSize.x / 2 + currentDragValue.x,
        (point.y + sumDrag.y) * screenZoom + canvasSize.y / 2 + currentDragValue.y
    );
}