/**
 * Megállapítja a paraméterül kapott szoba középső pontját
 * 
 * @param {Room} room szoba paraméter
 * @param {Point[]} points pontlista (opcionális)
 * @returns {Point} Középső pont
 */
function getRoomMiddlePoint(room, points = undefined) {
    points = points || getPointsToDrawRoom(room);
    const length = points.length;
    if (length === 0) {
        return undefined;
    }

    const x = points.map(p => p.x).reduce(sumFunction) / length;
    const y = points.map(p => p.y).reduce(sumFunction) / length;
    return createPoint(x, y);
}