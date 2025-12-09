/**
 * Szobák törlése utáni műveletek
 * 
 * @returns {undefined}
 */
function onRoomsCleared() {
    elementStore.structureElements = [];
    elementStore.structureElementsById = {};

    clearPanelGroups();
}