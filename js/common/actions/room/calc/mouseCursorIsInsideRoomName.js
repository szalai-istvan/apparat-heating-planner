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
        if (!room.height) {
            room.cursorIsInsideCache = false;
        }

        room.cursorIsInsideCache = pointIsInsideRectangle(getMousePositionAbsolute(), room.textBox);
    }

    return room.cursorIsInsideCache;
}