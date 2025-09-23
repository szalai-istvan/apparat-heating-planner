/**
 * Kiszámolja a szoba középpontjának koordinátáit
 * 
 * @param {Room} room, Szoba paraméter.
 * @returns {Point}, a szoba középpontja.
 */
function calculateMiddlePointOfRoom(room) {
    return createPoint(
        room.firstPoint.x + (room.width * Math.cos(room.angleRad) - room.height * Math.sin(room.angleRad)) / 2,
        room.firstPoint.y + (room.width * Math.sin(room.angleRad) + room.height * Math.cos(room.angleRad)) / 2
    );
}