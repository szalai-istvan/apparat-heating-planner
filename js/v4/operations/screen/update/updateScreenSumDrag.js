/** @type {Point}, kumulált képernyő offset érték. */
let screenSumDrag = null;

/**
 * Frissíti a húzás szummázó objektum értékeit
 * 
 * @returns {undefined}
 */
function updateScreenSumDrag() {
    if (screenDraggingInProgress) {
        const currentDragValue = getCurrentDragValue();
        screenSumDrag.x += (currentDragValue.x / screenZoom);
        screenSumDrag.y += (currentDragValue.y / screenZoom);
    }
}