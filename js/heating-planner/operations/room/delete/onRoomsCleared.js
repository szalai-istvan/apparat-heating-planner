//Project-specific

/**
 * Szobák törlése utáni műveletek
 * 
 * @returns {undefined}
 */
function onRoomsCleared() { //Project-specific
    elementStore.structureElements = [];
    elementStore.structureElementsById = {};

    clearPanelGroups();
}