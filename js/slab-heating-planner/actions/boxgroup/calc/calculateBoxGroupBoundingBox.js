/**
 * Kiszámítja a paraméterül kapott dobozcsoport határoló téglalapját és visszaadja.
 * 
 * @param {BoxGroup} boxGroup 
 * @returns {Rectangle}
 */
function calculateBoxGroupBoundingBox(boxGroup) {
    checkClass(boxGroup, CLASS_BOX_GROUP);
    const boxes = getBoxesByIdList(boxGroup.boxIds);

    const firstBox = boxes[0];
    const lastBox = boxes[boxes.length - 1];

    const centerPoint = createPoint(
        (firstBox.centerPosition.x + lastBox.centerPosition.x) / 2,
        (firstBox.centerPosition.y + lastBox.centerPosition.y) / 2
    );

    return createRectangleByMiddlePoint(
        centerPoint,
        boxWidthInPixels * boxes.length,
        boxLengthInPixels,
        boxGroup.alignment * HALF_PI
    );
}