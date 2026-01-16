/**
 * Megállapítja, hogy az egér kurzor a tervrajzon belül van-e.
 * 
 * @param {Blueprint} blueprint 
 * @returns {boolean}
 */
function mouseCursorIsInsideBlueprint(blueprint) {
    if (!blueprint) {
        return false;
    }

    const center = blueprint.centerPosition;
    const width = blueprint.data.width;
    const height = blueprint.data.height;
    const angleRad = toRadians(blueprint.angleDeg);

    if (!center) {
        return false;
    }

    return pointIsInsideRectangle(
        getMousePositionAbsolute(),
        createRectangleByMiddlePoint(center, width, height, angleRad)
    );
}