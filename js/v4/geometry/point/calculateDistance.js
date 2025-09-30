/** Origó @type {Point} */
let pointOrigin;

/**
 * Kiszámolja két pont között a távolságot.
 * 
 * @param {Point} p1 Egyik pont
 * @param {Point} p2 Másik pont
 * @returns {number}, a két pont közötti távolság
 */
function calculateDistance(p1, p2) {
    const deltaX = p2.x - p1.x;
    const deltaY = p2.y - p1.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

/**
 * Kiszámolja a megadott pont és az origó közötti távolságot.
 * 
 * @param {Point} p Egyik pont
 * @returns {number}, a két pont közötti távolság
 */
function calculateDistanceFromOrigin(p) {
    return calculateDistance(pointOrigin, p);
}