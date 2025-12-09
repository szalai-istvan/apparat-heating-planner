/**
 * Hozzáadja a kurzor pillanatnyi abszolút koordinátáit a kijelölt szoba sarkaihoz
 * 
 * @returns {undefined}
 */
function addPointToSelectedRoom() {
    if (!selectedRoom) {
        return;
    }

    if (roomIsConfigured(selectedRoom)) {
        return;
    }

    if (!pointCanBeAddedToSelectedRoom()) {
        displayMessage('A pont felvétele átfedést okozna a szobák között. Válasszon másik pontot.');
        return;
    }

    if (elementStore.rooms.length === 1 && !selectedRoom.width) {
        setGridSeed(getMousePositionAbsolute());
    }
    addPointToRoom(selectedRoom);
}

function pointCanBeAddedToSelectedRoom() {
    const interferingRooms = elementStore.rooms
        .filter(r => r !== selectedRoom)
        .filter(r => mousePointerIsInsideRoom(r))
        .filter(r => !r.isSelected);
    if (interferingRooms.length > 0) {
        return false;
    }

    return true;
}

/**
 * Hozzáadja a szobához a kurzor pozícióját.
 * 
 * @param {Room} room 
 * @returns {undefined}
 */
function addPointToRoom(room) {

    if (roomIsConfigured(room)) {
        return;
    }

    const mousePosition = getClosestGlobalGridPointToCursorsCorrectedPosition();
    const firstPoint = room.firstPoint;

    if (!firstPoint) {
        room.firstPoint = mousePosition;
        return;
    }

    if (room.tilted) {
        if (!room.width) {
            room.width = calculateDistance(firstPoint, mousePosition);
            if (mousePosition.x < firstPoint.x) {
                room.width *= -1;
            }
            room.angleRad = Math.atan((mousePosition.y - firstPoint.y) / (mousePosition.x - firstPoint.x));
            return;
        }

        if (!room.height) {
            room.height = calculateHeightToMouseCursor(room);
            finalizeRoom(room);
        }
    } else {
        room.width = mousePosition.x - firstPoint.x;
        room.height = mousePosition.y - firstPoint.y;
        finalizeRoom(room);
    }
}

/** @param {Room} room */
function finalizeRoom(room) {
    room.middlePoint = calculateMiddlePointOfRoom(room);
    calculateTextCenterPositionOfRoom(room, room.middlePoint);
    room.isSelected = false;

    room.boundingBox = calculateRoomBoundingBox(room);
    room.textBox = calculateRoomTextBox(room);

    if (roomPositionIsInvalid(room)) {
        displayMessage('A szoba pozíciója érvénytelen, átfedést okoz szobák között!');
        elementStore.remove(room);
        return;
    }

    room.roomGridDefinition = new GridDefinition();
    room.roomGridDefinition.angleRad = room.angleRad;
    room.roomGridDefinition.referencePoint = room.firstPoint;
    room.roomGridDefinition.cosAlpha = Math.cos(room.angleRad);
    room.roomGridDefinition.sinAlpha = Math.sin(room.angleRad);
}