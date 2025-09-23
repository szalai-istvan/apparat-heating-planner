/**
 * Megvizsgálja, hogy a paraméterül kapott pont benne van-e a paraméterül kapott szobában
 * 
 * @param {Room} room 
 * @param {Point} point 
 * @returns {boolean} a pont szobában léte
 */
function pointIsInsideRoom(room, point) {
    checkClass(room, CLASS_ROOM);
    checkClass(point, CLASS_POINT);

    const x = point.x;
    const y = point.y;

    if (!room.firstPoint) {
        return false;
    }

    return true; // TODO
}

function mousePointerIsInsideRoom(room) {
    return pointIsInsideRoom(room, getMousePositionAbsolute());
}