/**
 * Kiszámítja és visszaadja a szoba kerületét méter mértékegységben
 * 
 * @param {Room} room 
 * @returns {Number}
 */
function calculateRoomCircumference(room) {
    const circ = calculateRectangleCircumference(room.boundingBox);
    return circ / pixelsPerMetersRatio;
}