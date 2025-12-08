/**
 * Megállapítja, hogy a kurzor a paraméterül kapott szoba nevének szövegdobozában található-e.
 * 
 * @param {Room} room szoba paraméter
 * @returns {boolean} a kurzor a szövegdobozban van-e
 */
function mouseCursorIsInsideRoomName(room) {
    checkClass(room, CLASS_ROOM);

    if (!roomIsConfigured(room)) {
        return false;
    }

    if (room.cursorIsInsideCache === null) {
        if (room.points.length < 2) {
            room.cursorIsInsideCache = false;
        }

        room.cursorIsInsideCache = pointIsInside(
            getMousePositionAbsolute(),
            room.textCenterCoordinates,
            textWidth(room.name),
            room.textSize
        );
    }

    return room.cursorIsInsideCache;
}