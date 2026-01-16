/**
 * Validálja a szoba pozícióját
 * 
 * @param {Room} room 
 * @returns {boolean} true, ha a szoba pozíciója érvénytelen.
 */
function roomPositionIsInvalid(room) {
    if (!room || !room.width || !room.height) {
        return false;
    }

    const otherRooms = elementStore.rooms.filter(r => r !== room);
    
    for (let otherRoom of otherRooms) {
        if (rectanglesOverlap(otherRoom.boundingBox, room.boundingBox)) {
            return true;
        }
    }

    return false;
}