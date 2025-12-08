/**
 * Ellenőrzi, hogy a paraméterül kapott szoba összeállítása befejeződött-e
 * 
 * @param {Room} room
 * @returns {boolean} a szoba befejezettsége
 */
function roomIsConfigured(room) {
    return room.points.length === 2;
}