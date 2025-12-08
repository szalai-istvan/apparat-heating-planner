/**
 * Megállapítja, hogy a kurzor a paraméterül kapott elosztódoboz belsejében található-e.
 * 
 * @param {Box} box doboz paraméter
 * @returns {boolean} true, ha a kurzor a dobozban van, false ha nem.
 */
function mouseCursorIsInsideBox(box) {
    checkClass(box, CLASS_BOX);

    if (box.cursorIsInsideCache === null) {
        const centerPosition = box.centerPosition;
        if (!centerPosition) {
            return false;
        }
        const width = BOX_WIDTH_IN_METERS * pixelsPerMetersRatio;
        const length = BOX_LENGTH_IN_METERS * pixelsPerMetersRatio;

        if (boxGroupIsHorizontal(getBoxGroupById(box.groupId))) {
            box.cursorIsInsideCache = pointIsInside(
                getMousePositionAbsolute(),
                centerPosition,
                length,
                width
            );

        } else {
            box.cursorIsInsideCache = pointIsInside(
                getMousePositionAbsolute(),
                centerPosition,
                width,
                length
            );
        }
    }

    return box.cursorIsInsideCache;
}