/**
 * Törli az összes létrehozott szobát
 * 
 * @returns {undefined}
 */
function clearRooms() {
    elementStore.rooms = [];
    elementStore.roomsById = {};
    elementStore.structureElements = [];
    elementStore.structureElementsById = {};

    deselectRoom();
    clearPanelGroups();
}