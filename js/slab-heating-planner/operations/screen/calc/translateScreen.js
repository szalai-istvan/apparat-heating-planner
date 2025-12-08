/**
 * Elvégzi a dragging értékek szerinti transzlációt a renderelés előkészítéséhez
 * 
 * @returns {undefined}
 */
function translateScreen() { // formerly screenContext.translate()
        const canvasSize = getCanvasSize();
        const sumDrag = screenSumDrag;
        
        translate(0.5 * canvasSize.x, 0.5 * canvasSize.y);
        scale(screenZoom);
        translate(sumDrag.x, sumDrag.y);

        if (screenDraggingInProgress) {
            const currentDragValue = getCurrentDragValue();
            translate(
                currentDragValue.x / screenZoom, 
                currentDragValue.y / screenZoom
            );
        }
    }