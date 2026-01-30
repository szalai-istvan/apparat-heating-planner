/**
 * Kiválasztott szoba törlése utáni műveletek
 * 
 * @param {Room} room, eltávolított szoba
 * @returns {undefined}
 */
function onSelectedRoomRemovedHeatingPlanner(room) {
    const structureElements = getStructureElementsById(room.structureElementsId);
    elementStore.remove(structureElements);

    const panelGroupsToDelete = elementStore.panelGroups.filter(pg => pg.roomId === room.id);
    panelGroupsToDelete.forEach(pg => removePanelGroup(pg));
}