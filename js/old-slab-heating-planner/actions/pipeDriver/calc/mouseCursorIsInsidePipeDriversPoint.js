/**
 * Megállapítja, hogy az egérkurzor a paraméterül kapott csővezető valamelyik pontjára mutat-e
 * 
 * @param {PipeDriver} pipeDriver 
 * @returns {boolean}
 */
function mouseCursorIsInsidePipeDriversPoint(pipeDriver) {
    if (pipeDriver.cursorIsInsidePointIndexCache === null) {
        const mousePosition = getMousePositionAbsolute();
        const maxDistance = pipeDriverDiameterInPixels / 2;
        
        const selectablePoints = pipeDriver.points.filter(p => calculateDistance(p, mousePosition) < maxDistance);
        pipeDriver.cursorIsInsidePointIndexCache = selectablePoints.length > 0;
        if (selectablePoints.length > 0) {
            pipeDriver.selectedPointIndexCache = pipeDriver.points.indexOf(selectablePoints[0]);
        }
    }
    return pipeDriver.cursorIsInsidePointIndexCache;
}