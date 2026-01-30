/**
 * Kiszámolja és visszaadja a tervrajz befoglaló téglalapját.
 * 
 * @param {Blueprint} blueprint 
 * @returns {Rectangle}
 */
function createBlueprintBoundingBox(blueprint) {
    if (!blueprint) {
        return undefined;
    }

    return createRectangleByMiddlePoint(
        blueprint.centerPosition,
        blueprint.data.width,
        blueprint.data.height,
        toRadians(blueprint.angleDeg)
    );
}