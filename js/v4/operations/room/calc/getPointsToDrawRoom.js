/**
 * Visszaadja a megadott szoba sarokpontjait
 * 
 * @param {*} room szoba
 * @returns {Point[]} a pontokat tartalmazó array
 */
function getPointsToDrawRoom(room) {
    const points = room.points;

    const p0 = points[0];
    if (!p0) {
        return [];
    }

    const p1 = points.length >= 2 ? points[1] : getClosestGlobalGridPointToCursorsCorrectedPosition();

    const pointsToDraw = [];
    pointsToDraw.push({ x: p0.x, y: p0.y });
    pointsToDraw.push({ x: p0.x, y: p1.y });
    pointsToDraw.push({ x: p1.x, y: p1.y });
    pointsToDraw.push({ x: p1.x, y: p0.y });

    return pointsToDraw;
}