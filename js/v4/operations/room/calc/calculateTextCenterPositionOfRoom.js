/**
 * Név pozíció kiszámítása szoba koordinátarendszerben
 * 
 * @param {Room} room 
 * @param {Point} point
 * @returns {undefined}
 */
function calculateTextCenterPositionOfRoom(room, point = undefined) {
    point = point || getMousePositionAbsolute();
    
    room.textCenterCoordinates = point;
    
    const deltaX = point.x - room.firstPoint.x;
    const deltaY = point.y - room.firstPoint.y;
    room.textCenterCoordinatesRelative = createPoint(
        deltaY * Math.sin(room.angleRad) + deltaX * Math.cos(room.angleRad),
        deltaY * Math.cos(room.angleRad) - deltaX * Math.sin(room.angleRad)
    );
    room.textBox = calculateRoomTextBox(room);
}