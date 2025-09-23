/**
 * Kiszámolja két pont között a távolságot.
 * 
 * @param {Point} p1 Egyik pont
 * @param {Point} p2 Másik pont
 * @returns {number}, a két pont közötti távolság
 */
function calculateDistance(p1, p2) {
  checkClass(p1, CLASS_POINT);
  checkClass(p2, CLASS_POINT);

  const deltaX = p2.x - p1.x;
  const deltaY = p2.y - p1.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}