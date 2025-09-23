/**
 * Ellenőrzi, hogy a paraméterül kapott szoba összeállítása befejeződött-e
 * 
 * @param {Room} room
 * @returns {boolean} a szoba befejezettsége
 */
function roomIsConfigured(room) {
    checkClass(room, CLASS_ROOM, true);

    if (!room) {
        return false;
    }

    return room.width && room.height && room.textCenterCoordinates;
}