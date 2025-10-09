/** @type {Room} */
let selectedRoom = null;
/** @type {Room} */
let cachedSelectableRoom = null;

/**
 * Megkeresi a kiválasztható szobát és visszaadja
 * 
 * @param {Room} room Opcionális paraméter, specifikálható a kiválasztandó szoba.
 * @returns {Room} a kiválasztott szoba.
 */
function selectRoom(room = undefined) {
    checkClass(room, CLASS_ROOM, true);

    room = room || checkForSelectableRoom();
    if (!room) {
        return undefined;
    }

    if (!selectedRoomIsConfiguredOrNoRoomIsSelected()) {
        return selectedRoom;
    }

    if (deselectObject()) {
        room.isSelected = true;
        room.originalTextCenterCoordinates = room.textCenterCoordinates;
        selectedRoom = room;
        return room;
    }
    return undefined;
}

function checkForSelectableRoom() {
    if (cachedSelectableRoom) {
        return cachedSelectableRoom;
    }

    const selection = elementStore.rooms.filter(r => mouseCursorIsInsideRoomName(r));
    const room = selection[0];
    if (room) {
        cachedSelectableRoom = room;
        return room;
    }
    return undefined;
}