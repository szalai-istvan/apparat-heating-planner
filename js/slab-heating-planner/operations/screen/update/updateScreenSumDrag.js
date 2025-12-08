let screenSumDrag = null;

/**
 * Frissíti a húzás szummázó objektum értékeit
 * 
 * @returns {undefined}
 */
function updateScreenSumDrag() { // formerly screenContext.updateSumDrag()
    if (screenDraggingInProgress) {
        const currentDragValue = getCurrentDragValue();
        screenSumDrag.x += (currentDragValue.x / screenZoom);
        screenSumDrag.y += (currentDragValue.y / screenZoom);
    }
}