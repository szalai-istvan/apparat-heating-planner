/**
 * Kiszámítja, hogy a szoba alapvonalától milyen távolságra van az egérmutató.
 * 
 * @param {Room} room 
 * @returns {Number}, a kurzor távolsága a szoba alapvonalától
 */
function calculateHeightToMouseCursor(room) {
    checkClass(room, CLASS_ROOM);

    const angle = room.angleRad;
    const firstPoint = room.firstPoint;
    const mousePosition = getClosestGridPointToCursorsCorrectedPosition();
    const deltaX = mousePosition.x - firstPoint.x;
    const deltaY = mousePosition.y - firstPoint.y;

    return deltaY * Math.cos(angle) - deltaX * Math.sin(angle);
}