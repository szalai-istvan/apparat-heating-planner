/**
 * Törli a kiválasztott szobát és a benne található fűtőelem csoportokat.
 * 
 * @returns {undefined}
 */
function removeSelectedRoom() {
    const room = selectedRoom;
    if (!room) {
        return;
    }

    elementStore.remove(room);
    selectedRoom = null;

    deselectObject();
    if (elementStore.rooms.length === 0) {
        removeGridSeed();
    }

    dispatchCustomEvent(SELECTED_ROOM_REMOVED, {room: room});
}