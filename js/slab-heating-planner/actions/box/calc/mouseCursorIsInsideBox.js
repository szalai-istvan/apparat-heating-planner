/**
 * Megállapítja, hogy a kurzor a paraméterül kapott elosztódoboz belsejében található-e.
 * 
 * @param {Box} box doboz paraméter
 * @returns {boolean} true, ha a kurzor a dobozban van, false ha nem.
 */
function mouseCursorIsInsideBox(box) {
    checkClass(box, CLASS_BOX);

    if (box.cursorIsInsideCache === null) {
        if (!box.boundingBox) {
            box.boundingBox = calculateBoxBoundingBox(box);
        }
        box.cursorIsInsideCache = pointIsInsideRectangle(getMousePositionAbsolute(), box.boundingBox);
    }

    return box.cursorIsInsideCache;
}