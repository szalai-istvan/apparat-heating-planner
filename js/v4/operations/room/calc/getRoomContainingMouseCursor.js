/**
 * Visszaadja azt a szobát, amelyben benne van a kurzor.
 * 
 * @returns {Room}
 */
function getRoomContainingMouseCursor() {
    const rooms = elementStore.rooms.filter(r => pointIsInsideRectangle(getMousePositionAbsolute(), r.boundingBox));
    return rooms.length ? rooms[0] : undefined;
}