/**
 * Megállapítja a két pont közötti irányt
 * 
 * @param {Point} p1 
 * @param {Point} p2
 * @returns {string} (x, vagy y) 
 */
function getDirectionBetweenTwoPoints(p1, p2) {
    const x1 = roundNumber(p1.x, 2);
    const x2 = roundNumber(p2.x, 2);
    const y1 = roundNumber(p1.y, 2);
    const y2 = roundNumber(p2.y, 2);

    if (x1 === x2) {
        return DIRECTION_Y;
    } else if (y1 === y2) {
        return DIRECTION_X;
    }
}