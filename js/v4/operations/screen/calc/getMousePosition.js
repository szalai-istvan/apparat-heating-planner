/**
 * Visszaadja a kurzor pozícióját a képernyőn
 * 
 * @returns {Point} a kurzor pozíciója
 */
function getMousePosition() {
    return { x: mouseX, y: mouseY };
}

/**
 * Visszaadja a kurzor abszolút pozícióját
 * 
 * @returns {Point} a kurzor pozíciója
 */
function getMousePositionAbsolute() {
    const currentDragValue = getCurrentDragValue();
    const sumDrag = screenSumDrag;
    const canvasSize = getCanvasSize();

    const x = (mouseX - currentDragValue.x - sumDrag.x * screenZoom - canvasSize.x / 2) / screenZoom;
    const y = (mouseY - currentDragValue.y - sumDrag.y * screenZoom - canvasSize.y / 2) / screenZoom;
    return createPoint(x, y);
}

/**
 * Visszaadja a kurzor abszolút pozícióját, korrigálva hogyha a kurzor a UI alatt van.
 * 
 * @returns {Point} a kurzor pozíciója korrekcióval
 */
function getCorrectedMousePositionAbsolute() {
    const mousePosition = getMousePosition();
    const mousePositionAbsolute = getMousePositionAbsolute();

    const xCorrector = calculateCorrector(LEFT_RIBBON_WIDTH + 10, mousePosition.x);
    const yCorrector = calculateCorrector(TOP_RIBBON_HEIGHT + 10, mousePosition.y);

    return createPoint(mousePositionAbsolute.x + (xCorrector || 0), mousePositionAbsolute.y + (yCorrector || 0));
}