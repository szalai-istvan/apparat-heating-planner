/**
 * Megállapítja, hogy a kurzor benne van-e a paraméterül kapott födémfűtő elem szövegdobozában
 * 
 * @param {SlabHeater} slabHeater födémfűtő elem 
 * @returns {boolean}
 */
function mouseCursorIsInsideSlabHeatersTextbox(slabHeater) {
    if (!slabHeater.centerPosition) {
        return false;
    }

    const group = getSlabHeaterGroupById(slabHeater.groupId);

    if (!group) {
        return false;
    }

    if (slabHeater.cursorIsInsideCache === null) {
        if (group.alignment % 2 === 1) {
            slabHeater.cursorIsInsideCache = pointIsInside(
                getMousePositionAbsolute(),
                slabHeater.centerPosition,
                slabHeater.rectHeight,
                slabHeater.rectWidth
            );
        } else {
            slabHeater.cursorIsInsideCache = pointIsInside(
                getMousePositionAbsolute(),
                slabHeater.centerPosition,
                slabHeater.rectWidth,
                slabHeater.rectHeight
            );
        }
    }

    return slabHeater.cursorIsInsideCache;
}