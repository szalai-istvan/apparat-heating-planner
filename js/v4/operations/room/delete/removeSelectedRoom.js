/**
 * Törli a kiválasztott szobát és a benne található fűtőelem csoportokat.
 * 
 * @returns {undefined}
 */
function removeSelectedRoom() {
    const room = selectedRoom;
    if (room) {
        elementStore.remove(room);
        selectedRoom = null;
    }

    removePanelGroupsFromDeletedRoom(room);

    deselectObject();
    if (elementStore.rooms.length === 0) {
        removeGridSeed();
    }
}

/** @param {Room} room */
function removePanelGroupsFromDeletedRoom(room) {
    const panelGroupsToDelete = elementStore.panelGroups.filter(pg => pg.roomId === room.id);
    panelGroupsToDelete.forEach(pg => removePanelGroup(pg));
}