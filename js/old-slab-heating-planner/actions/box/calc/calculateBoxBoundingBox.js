/**
 * Kiszámolja a paraméterül kapott doboz határoló téglalapját és visszaadja.
 * 
 * @param {Box} box 
 * @returns {Rectangle}
 */
function calculateBoxBoundingBox(box) {
    checkClass(box, CLASS_BOX);
    const group = getBoxGroupById(box.groupId);

    return createRectangleByMiddlePoint(
        box.centerPosition,
        boxWidthInPixels,
        boxLengthInPixels,
        group.alignment * HALF_PI
    );    
}