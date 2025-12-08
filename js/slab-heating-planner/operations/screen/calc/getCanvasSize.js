let screenCanvas = null;

/**
 * Visszaadja a canvas méretét
 * 
 * @returns {Point} a canvas mérete
 */
function getCanvasSize() {
    const canvas = screenCanvas;
    if (!canvas) {
        return createPoint(0, 0);
    }

    return createPoint(canvas.width, canvas.height);
}