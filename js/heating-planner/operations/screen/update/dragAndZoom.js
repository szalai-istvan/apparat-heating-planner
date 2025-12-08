let screenDraggingInProgress;
let screenDragStartPosition;
let screenZoom = 1;

function startDragging() {
    screenDragStartPosition = getMousePosition();
    screenDraggingInProgress = true;
}

function stopDragging() {
    updateScreenSumDrag();
    screenDraggingInProgress = false;
}

function zoomIn() {
    screenZoom = Math.min(MAXIMUM_ZOOM, screenZoom * ZOOM_STEP);
}

function zoomOut() {
    screenZoom = Math.max(MINIMUM_ZOOM, screenZoom / ZOOM_STEP);
}