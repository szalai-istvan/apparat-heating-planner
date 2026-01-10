//Project-specific

/**
 * Kiválasztott szoba törlése utáni műveletek
 * 
 * @returns {undefined}
 */
function onSelectedRoomRemoved() { //Project-specific
    const structureElements = getStructureElementsById(room.structureElementsId);
    elementStore.remove(structureElements);

    removePanelGroupsFromDeletedRoom(room);
}

/** @param {Room} room */
function removePanelGroupsFromDeletedRoom(room) {
    const panelGroupsToDelete = elementStore.panelGroups.filter(pg => pg.roomId === room.id);
    panelGroupsToDelete.forEach(pg => removePanelGroup(pg));
}