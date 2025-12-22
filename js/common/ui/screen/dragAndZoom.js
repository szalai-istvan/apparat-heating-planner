/** @type {boolean} */
let screenDraggingInProgress;
/** @type {Point} */
let screenDragStartPosition;
/** @type {number} */
let screenZoom = 1;

/**
 * Elindítja a képernyő mozgatását.
 * 
 * @returns {undefined}
 */
function startDragging() {
    screenDragStartPosition = getMousePosition();
    screenDraggingInProgress = true;
}

/**
 * Leállítja a képernyő mozgatását.
 * 
 * @returns {undefined}
 */
function stopDragging() {
    updateScreenSumDrag();
    screenDraggingInProgress = false;
}

/**
 * Képernyő felfelé zoomolás.
 * 
 * @returns {undefined}
 */
function zoomIn() {
    screenZoom = Math.min(MAXIMUM_ZOOM, screenZoom * ZOOM_STEP);
}

/**
 * Képernyő lefelé zoomolás.
 * 
 * @returns {undefined}
 */
function zoomOut() {
    screenZoom = Math.max(MINIMUM_ZOOM, screenZoom / ZOOM_STEP);
}