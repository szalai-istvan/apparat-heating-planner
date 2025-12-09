/**
 * Törli az összes létrehozott szobát
 * 
 * @returns {undefined}
 */
function clearRooms() {
    elementStore.rooms = [];
    elementStore.roomsById = {};

    clearRoomAttachedElements && clearRoomAttachedElements();

    deselectRoom();
    clearPanelGroups();
}