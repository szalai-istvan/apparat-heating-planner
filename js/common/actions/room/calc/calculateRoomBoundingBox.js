/**
 * Kiszámítja és visszaadja a szoba befoglaló téglalapját.
 * 
 * @param {Room} room 
 * @returns {Rectangle}
 */
function calculateRoomBoundingBox(room) {
    return createRectangleByMiddlePoint(room.middlePoint, room.width, room.height, room.angleRad);
}

/**
 * Kiszámítja és visszaadja a szoba befoglaló téglalapját.
 * 
 * @param {Room} room 
 * @returns {Rectangle}
 */
function calculateRoomTextBox(room) {
    push();

    textSize(roomTextSize);
    const width = textWidth(room.name);
    const rectangle = createRectangleByMiddlePoint(room.textCenterCoordinates, width, roomTextSize, room.angleRad);

    pop();
    return rectangle;
}