/**
 * Visszaadja a paraméterül kapott pontot tartalmazó szobát.
 * 
 * @param {Point} point paraméter
 * @returns {Room} A pontot tartalmazó szoba
 */
function getRoomContainingPoint(point) {
    checkClass(point, CLASS_POINT);

    const room = elementStore.rooms.filter(r => pointIsInsideRoom(r, point))[0];
    if (room) {
        return room;
    }
    return null;
}