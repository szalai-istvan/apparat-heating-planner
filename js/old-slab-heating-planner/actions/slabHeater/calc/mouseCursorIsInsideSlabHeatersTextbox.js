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
        slabHeater.cursorIsInsideCache = pointIsInsideRectangle(getMousePositionAbsolute(), slabHeater.textBox);
    }

    return slabHeater.cursorIsInsideCache;
}