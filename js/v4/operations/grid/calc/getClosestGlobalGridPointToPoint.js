/**
 * Visszaadja a paraméterül kapott ponthoz legközelebbi globális grid pontot
 * 
 * @param {Point} point paraméter
 * @returns {Point} A legközelebbi grid pont
 */
function getClosestGlobalGridPoint(point) {
    if (!gridSeed) {
        return point;
    }

    const x = gridSeed.x + Math.round((point.x - gridSeed.x) / gridResolutionPixel) * gridResolutionPixel;
    const y = gridSeed.y + Math.round((point.y - gridSeed.y) / gridResolutionPixel) * gridResolutionPixel;

    return createPoint(x, y);
}

/**
 * Visszaadja a kurzorhoz legközelebbi globális grid pontot
 * 
 * @returns {Point} A legközelebbi grid pont
 */
function getClosestGlobalGridPointToCursor() {
    return getClosestGlobalGridPoint(getMousePositionAbsolute());
}

/**
 * Visszaadja a kurzorhoz legközelebbi globális grid pontot, korrigálva, ha UI alatt van a kurzor
 * 
 * @returns {Point} A legközelebbi grid pont
 */
function getClosestGlobalGridPointToCursorsCorrectedPosition() {
    return getClosestGlobalGridPoint(getCorrectedMousePositionAbsolute());
}