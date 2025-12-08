/**
 * Visszaajda a pillanatnyilag folyamatban lévő képernyő húzás értékét
 * 
 * @returns {Point} pillanatnyi húzás értéke
 */
function getCurrentDragValue() {
    if (screenDraggingInProgress) {
        const startPosition = screenDragStartPosition;
        return createPoint(mouseX - startPosition.x, mouseY - startPosition.y);
    }
    return createPoint(0, 0);
}