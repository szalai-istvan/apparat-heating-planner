/**
 * Felrajzolja a szoba nevét a képernyőre
 * 
 * @param {Room} room 
 * @returns {undefined}
 */
function drawRoomName(room) {
    checkClass(room, CLASS_ROOM);

    const firstPoint = room.firstPoint;
    let width = room.width;
    let height = room.height;
    let angle = toDegrees(room.angleRad || 0);

    if (!roomIsConfigured(room)) {
        return;
    }
    
    push();

    translate(firstPoint.x, firstPoint.y);
    rotate(angle);


    if (roomIsConfigured(room)) {
        push();
        updateSettingsToText(room);
        const textCenterCoordinates = room.textCenterCoordinates;
        if (room.isSelected) {
            calculateTextCenterPositionOfRoom(room);
        }
        text(room.name, room.textCenterCoordinatesRelative.x, room.textCenterCoordinatesRelative.y);
        pop();
    }

    pop();
}


function updateSettingsToText(room) {
    textAlign(CENTER, CENTER);
    stroke(BLACK);
    strokeWeight(roomNameOutlineWidth);

    if (mouseCursorIsInsideRoomName(room)) {
        fill(SELECTED_TEXT_COLOR);
        textSize(roomTextSize * ROOM_TEXT_POP_FACTOR);
    } else {
        fill(ROOM_DEFAULT_TEXT_COLOR);
        textSize(roomTextSize);
    }
}