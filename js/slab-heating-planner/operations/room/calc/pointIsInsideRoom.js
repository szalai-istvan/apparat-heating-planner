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

    if (room.points.length === 0) {
        return false;
    }

    const minX = room.points.map(p => p.x).reduce(minimumFunction);
    const maxX = room.points.map(p => p.x).reduce(maximumFunction);

    const minY = room.points.map(p => p.y).reduce(minimumFunction);
    const maxY = room.points.map(p => p.y).reduce(maximumFunction);

    return x > minX && x < maxX && y > minY && y < maxY;
}

function mousePointerIsInsideRoom(room) {
    return pointIsInsideRoom(room, getMousePositionAbsolute());
}