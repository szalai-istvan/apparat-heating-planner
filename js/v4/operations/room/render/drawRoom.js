/**
 * Felrajzolja a kijelzőre a paraméterül kapott szobát.
 * 
 * @param {Room} room szoba
 * @returns {undefined}
 */
function drawRoom(room) {
    checkClass(room, CLASS_ROOM);

    const firstPoint = room.firstPoint;
    const tilted = room.tilted;
    const angle = room.angleRad || 0;

    if (!firstPoint) {
        return;
    }

    push();

    if (tilted) {
        drawTiltedRoom(room);
    } else {
        drawStraightRoom(room);
    }

    pop();
}

/**
 * Felrajzol egy egyenes szobát a képernyőre
 * 
 * @param {Room} room 
 */
function drawStraightRoom(room) {
    const firstPoint = room.firstPoint;
    let width = room.width;
    let height = room.height;
    let angle = toDegrees(room.angleRad || 0);

    updateSettingsToDraw(room);

    if (!width) {
        const mousePosition = getClosestGridPointToCursorsCorrectedPosition();
        width = mousePosition.x - firstPoint.x;
        height = mousePosition.y - firstPoint.y;
    }

    translate(firstPoint.x, firstPoint.y);
    rotate(angle);
    rect(0, 0, width, height);

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

    drawRoomSize(room, width, height);
}

/**
 * Felrajzol egy ferde szobát a képernyőre
 * 
 * @param {Room} room 
 */
function drawTiltedRoom(room) {
    const firstPoint = room.firstPoint;
    let width = room.width;
    let height = room.height;
    let angle = toDegrees(room.angleRad || 0);

    updateSettingsToDraw(room);

    if (!width) {
        const mousePosition = getClosestGridPointToCursorsCorrectedPosition();
        line(firstPoint.x, firstPoint.y, mousePosition.x, mousePosition.y);
        width = calculateDistance(firstPoint, mousePosition) * (mousePosition.x < firstPoint.x ? -1 : 1);
        translate(firstPoint.x, firstPoint.y);
        angle = toDegrees(createLine(firstPoint, mousePosition).angleRad);
        rotate(angle);
        drawRoomSize(room, width, height);
        return;
    }

    if (!height) {
        const mousePosition = getClosestGridPointToCursorsCorrectedPosition();
        height = calculateHeightToMouseCursor(room);
    }

    translate(firstPoint.x, firstPoint.y);
    rotate(angle);
    rect(0, 0, width, height);

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

    drawRoomSize(room, width, height);
}

function updateSettingsToText(room) {
    textAlign(CENTER, CENTER);
    noStroke();

    if (mouseCursorIsInsideRoomName(room)) {
        fill(SELECTED_TEXT_COLOR);
        textSize(roomTextSize * ROOM_TEXT_POP_FACTOR);
    } else {
        fill(ROOM_DEFAULT_TEXT_COLOR);
        textSize(roomTextSize);
    }
}

function updateSettingsToDraw(room) {
    if (room.isSelected) {
        stroke(SELECTED_TEXT_COLOR);
        strokeWeight(roomLineWeight * 1.2);
    } else {
        stroke(ROOM_DEFAULT_TEXT_COLOR);
        strokeWeight(roomLineWeight);
    }

    fill(ROOM_FILL_COLOR);
}

function drawRoomSize(room, roomWidth, roomHeight) {
    textSize(roomTextSize);
    if (room.isSelected) {
        fill(SELECTED_TEXT_COLOR);
    } else {
        fill(ROOM_DEFAULT_TEXT_COLOR);
    }

    if (roomWidth) {
        const width = `${roundNumber(Math.abs(roomWidth / pixelsPerMetersRatio), 1)} m`;
        textAlign(CENTER, BOTTOM);
        text(width, roomWidth / 2, (Math.min(roomHeight, 0) || 0) - 5);
    }

    if (roomHeight) {
        const height = `${roundNumber(Math.abs(roomHeight / pixelsPerMetersRatio), 1)} m`;
        textAlign(LEFT, CENTER);
        text(height, Math.max(roomWidth, 0) + 5, roomHeight / 2);
    }
}