/**
 * Felrajzolja a kijelzőre a paraméterül kapott szobát.
 * 
 * @param {Room} room szoba
 * @returns {undefined}
 */
function drawRoom(room) {
    checkClass(room, CLASS_ROOM);

    const points = getPointsToDrawRoom(room);
    const length = points.length;

    if (length < 2) {
        return;
    }

    push();
    updateSettingsToDraw(room);

    for (let index = 0; index < length; index++) {
        const p1 = points[index];
        const p2 = points[(index + 1) % length];

        line(p1.x, p1.y, p2.x, p2.y);
    }

    const p1 = points[0];
    const p2 = points[2];
    noStroke();
    fill('#FFFFFFA0');
    rect(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y), Math.abs(p2.x - p1.x), Math.abs(p2.y - p1.y));

    pop();
    const textCenterCoordinates = room.isSelected ? getMousePositionAbsolute() : room.textCenterCoordinates;
    if (roomIsConfigured(room)) {
        push();
        updateSettingsToText(room);
        text(room.name, textCenterCoordinates.x, textCenterCoordinates.y);
        pop();
    }

    drawRoomSize(room, points);
}


function updateSettingsToText(room) {
    textAlign(CENTER, CENTER);
    if (mouseCursorIsInsideRoomName(room)) {
        fill(SELECTED_TEXT_COLOR);
        textSize(room.textSize * ROOM_TEXT_POP_FACTOR);
    } else {
        fill(ROOM_DEFAULT_TEXT_COLOR);
        textSize(room.textSize);
    }
}

function updateSettingsToDraw(room) {
    if (room.isSelected) {
        stroke(SELECTED_TEXT_COLOR);
        strokeWeight(room.lineWeight * 2);
    } else {
        stroke(ROOM_DEFAULT_TEXT_COLOR);
        strokeWeight(room.lineWeight);
    }
}

function drawRoomSize(room, points) {
    const topY = points.map(p => p.y).reduce(minimumFunction);
    const rightX = points.map(p => p.x).reduce(maximumFunction);
    const middlePoint = getRoomMiddlePoint(room);

    const width = `${roundNumber(getWidthInMeters(room, points), 1)} m`;
    const height = `${roundNumber(getHeightInMeters(room, points), 1)} m`;

    textSize(room.textSize);
    if (room.isSelected) {
        fill(SELECTED_TEXT_COLOR);
    } else {
        fill(ROOM_DEFAULT_TEXT_COLOR);
    }

    textAlign(CENTER, BOTTOM);
    text(width, middlePoint.x, topY - 5);
    textAlign(LEFT, CENTER);
    text(height, rightX + 5, middlePoint.y);
}

function getWidthInMeters(room, points = undefined) {
    points = points || room.points;

    const maxX = points.map(p => p.x).reduce(maximumFunction);
    const minX = points.map(p => p.x).reduce(minimumFunction);

    return (maxX - minX) / pixelsPerMetersRatio;
}

function getHeightInMeters(room, points = undefined) {
    points = points || room.points;

    const maxY = points.map(p => p.y).reduce(maximumFunction);
    const minY = points.map(p => p.y).reduce(minimumFunction);

    return (maxY - minY) / pixelsPerMetersRatio;
}